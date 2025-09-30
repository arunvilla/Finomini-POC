import { useState } from 'react';
import { ArrowLeft, ChevronRight, Calendar, DollarSign, Target, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';

interface CreateGoalScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

const goalTypes = [
  { id: 'emergency', name: 'Emergency Fund', icon: '🛡️', description: 'Build financial security' },
  { id: 'home', name: 'Home Down Payment', icon: '🏡', description: 'Save for your dream home' },
  { id: 'car', name: 'New Car', icon: '🚗', description: 'Transportation upgrade' },
  { id: 'vacation', name: 'Vacation', icon: '✈️', description: 'Travel and experiences' },
  { id: 'education', name: 'Education', icon: '🎓', description: 'Learning and growth' },
  { id: 'retirement', name: 'Retirement', icon: '🏖️', description: 'Long-term security' },
  { id: 'debt', name: 'Debt Payoff', icon: '💳', description: 'Become debt-free' },
  { id: 'wedding', name: 'Wedding', icon: '💍', description: 'Special celebration' },
  { id: 'investment', name: 'Investment', icon: '📈', description: 'Grow your wealth' },
  { id: 'other', name: 'Other', icon: '🎯', description: 'Custom savings goal' }
];

const availableAccounts = [
  { id: '1', name: 'Chase Checking ••••1234', type: 'Checking', balance: 5584.32 },
  { id: '2', name: 'Chase Freedom ••••4526', type: 'Credit Card', balance: -1250.00 },
  { id: '3', name: 'High Yield Savings ••••9876', type: 'Savings', balance: 12450.00 }
];

export default function CreateGoalScreen({ onBack, onNavigate }: CreateGoalScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [goalData, setGoalData] = useState({
    name: '',
    type: '',
    icon: '',
    targetAmount: '',
    targetDate: '',
    initialContribution: '',
    monthlyContribution: '',
    linkedAccounts: [] as string[],
    priority: 1,
    description: ''
  });

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateSuggestedContribution = () => {
    if (!goalData.targetAmount || !goalData.targetDate) return 0;
    
    const target = parseFloat(goalData.targetAmount);
    const initial = parseFloat(goalData.initialContribution) || 0;
    const remaining = target - initial;
    
    const targetDate = new Date(goalData.targetDate);
    const today = new Date();
    const monthsToTarget = Math.max(1, Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30)));
    
    return Math.ceil(remaining / monthsToTarget);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGoalTypeSelect = (type: any) => {
    setGoalData({
      ...goalData,
      type: type.id,
      icon: type.icon,
      name: goalData.name || type.name
    });
  };

  const toggleAccount = (accountId: string) => {
    setGoalData({
      ...goalData,
      linkedAccounts: goalData.linkedAccounts.includes(accountId)
        ? goalData.linkedAccounts.filter(id => id !== accountId)
        : [...goalData.linkedAccounts, accountId]
    });
  };

  const handleCreateGoal = () => {
    // Here you would typically save the goal
    console.log('Creating goal:', goalData);
    onNavigate?.('goals');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return goalData.name.trim() !== '' && goalData.type !== '';
      case 2:
        return goalData.targetAmount !== '';
      case 3:
        return goalData.monthlyContribution !== '';
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">What are you saving for?</h2>
        <p className="text-muted-foreground">Choose a goal type and give it a name</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="goalName">Goal Name</Label>
          <Input
            id="goalName"
            placeholder="e.g., Dream Home Down Payment"
            value={goalData.name}
            onChange={(e) => setGoalData({ ...goalData, name: e.target.value })}
          />
        </div>

        <div>
          <Label>Goal Type</Label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {goalTypes.map((type) => (
              <Card
                key={type.id}
                className={`cursor-pointer transition-all ${
                  goalData.type === type.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:bg-accent'
                }`}
                onClick={() => handleGoalTypeSelect(type)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <h3 className="font-medium text-sm">{type.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">How much do you need?</h2>
        <p className="text-muted-foreground">Set your target amount and timeline</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="targetAmount">Target Amount</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="targetAmount"
              type="number"
              placeholder="50000"
              className="pl-10"
              value={goalData.targetAmount}
              onChange={(e) => setGoalData({ ...goalData, targetAmount: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="targetDate">Target Date (Optional)</Label>
          <Input
            id="targetDate"
            type="date"
            value={goalData.targetDate}
            onChange={(e) => setGoalData({ ...goalData, targetDate: e.target.value })}
          />
          <p className="text-xs text-muted-foreground mt-1">
            This helps us calculate suggested monthly contributions
          </p>
        </div>

        <div>
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Tell us more about this goal..."
            value={goalData.description}
            onChange={(e) => setGoalData({ ...goalData, description: e.target.value })}
            rows={3}
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => {
    const suggestedAmount = calculateSuggestedContribution();
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">How will you fund it?</h2>
          <p className="text-muted-foreground">Set up your contribution plan</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="initialContribution">Initial Contribution (Optional)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="initialContribution"
                type="number"
                placeholder="0"
                className="pl-10"
                value={goalData.initialContribution}
                onChange={(e) => setGoalData({ ...goalData, initialContribution: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="monthlyContribution"
                type="number"
                placeholder="500"
                className="pl-10"
                value={goalData.monthlyContribution}
                onChange={(e) => setGoalData({ ...goalData, monthlyContribution: e.target.value })}
              />
            </div>
            {suggestedAmount > 0 && (
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">
                  Suggested: {formatCurrency(suggestedAmount)}/month to reach goal by target date
                </Badge>
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 h-auto ml-2 text-xs"
                  onClick={() => setGoalData({ ...goalData, monthlyContribution: suggestedAmount.toString() })}
                >
                  Use suggested amount
                </Button>
              </div>
            )}
          </div>

          <div>
            <Label>Linked Accounts</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Select accounts to track contributions for this goal
            </p>
            <div className="space-y-2">
              {availableAccounts.map((account) => (
                <Card
                  key={account.id}
                  className={`cursor-pointer transition-all ${
                    goalData.linkedAccounts.includes(account.id)
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:bg-accent'
                  }`}
                  onClick={() => toggleAccount(account.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{account.name}</p>
                        <p className="text-xs text-muted-foreground">{account.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {formatCurrency(account.balance)}
                        </p>
                        {goalData.linkedAccounts.includes(account.id) && (
                          <CheckCircle className="h-4 w-4 text-green-600 ml-auto mt-1" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">Review & Create</h2>
        <p className="text-muted-foreground">Confirm your goal details</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">{goalData.icon}</span>
            {goalData.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">Target Amount</Label>
              <p className="font-semibold">{formatCurrency(parseFloat(goalData.targetAmount) || 0)}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Monthly Contribution</Label>
              <p className="font-semibold">{formatCurrency(parseFloat(goalData.monthlyContribution) || 0)}</p>
            </div>
          </div>

          {goalData.targetDate && (
            <div>
              <Label className="text-sm text-muted-foreground">Target Date</Label>
              <p className="font-semibold">
                {new Date(goalData.targetDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>
          )}

          {goalData.initialContribution && (
            <div>
              <Label className="text-sm text-muted-foreground">Initial Contribution</Label>
              <p className="font-semibold">{formatCurrency(parseFloat(goalData.initialContribution))}</p>
            </div>
          )}

          {goalData.linkedAccounts.length > 0 && (
            <div>
              <Label className="text-sm text-muted-foreground">Linked Accounts</Label>
              <div className="flex flex-wrap gap-1 mt-1">
                {goalData.linkedAccounts.map((accountId) => {
                  const account = availableAccounts.find(a => a.id === accountId);
                  return (
                    <Badge key={accountId} variant="secondary" className="text-xs">
                      {account?.name}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {goalData.description && (
            <div>
              <Label className="text-sm text-muted-foreground">Description</Label>
              <p className="text-sm">{goalData.description}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Status Bar */}
      <div className="bg-card flex flex-row items-center justify-between px-4 pt-[21px] pb-0 h-[50px]">
        <div className="text-[17px] text-foreground font-semibold">9:41</div>
        <div className="h-2.5 w-[124px]" />
        <div className="flex items-center gap-[7px]">
          <div className="w-[19.2px] h-[12.226px] bg-foreground rounded-sm" />
          <div className="w-[17.142px] h-[12.328px] bg-foreground rounded-sm" />
          <div className="w-[27.328px] h-[13px] border border-foreground rounded-[3.8px] relative">
            <div className="w-[21px] h-[9px] bg-foreground rounded-[2.5px] absolute left-[2px] top-[2px]" />
            <div className="w-[1.328px] h-[5px] bg-foreground rounded-r absolute right-0 top-[4px]" />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={currentStep === 1 ? onBack : handlePrevious} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="text-center">
            <h1 className="text-xl font-semibold text-foreground">New Goal</h1>
            <p className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</p>
          </div>
          
          <div className="w-10" />
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </div>

      {/* Footer Actions */}
      <div className="bg-card border-t border-border p-4">
        <div className="flex gap-3">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handlePrevious} className="flex-1">
              Previous
            </Button>
          )}
          <Button 
            onClick={currentStep === totalSteps ? handleCreateGoal : handleNext}
            disabled={!isStepValid()}
            className="flex-1"
          >
            {currentStep === totalSteps ? 'Create Goal' : 'Next'}
            {currentStep < totalSteps && <ChevronRight className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
}