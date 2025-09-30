import { useState, useMemo } from 'react';
import { ArrowLeft, Plus, Settings, Target, TrendingUp, Calendar, DollarSign, Eye, EyeOff, MoreHorizontal, Edit3 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface GoalsScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

interface Goal {
  id: string;
  name: string;
  icon: string;
  targetAmount: number;
  currentAmount: number;
  monthlyContribution: number;
  targetDate: Date;
  priority: number;
  linkedAccounts: string[];
  status: 'on-track' | 'behind' | 'ahead';
  isActive: boolean;
}

// Mock goals data
const mockGoals: Goal[] = [
  {
    id: '1',
    name: 'Dream Home Down Payment',
    icon: '🏡',
    targetAmount: 50000,
    currentAmount: 35000,
    monthlyContribution: 1200,
    targetDate: new Date('2026-12-01'),
    priority: 1,
    linkedAccounts: ['Chase Savings', 'High Yield Savings'],
    status: 'on-track',
    isActive: true
  },
  {
    id: '2',
    name: 'Emergency Fund',
    icon: '🛡️',
    targetAmount: 15000,
    currentAmount: 12500,
    monthlyContribution: 500,
    targetDate: new Date('2025-08-01'),
    priority: 2,
    linkedAccounts: ['High Yield Savings'],
    status: 'ahead',
    isActive: true
  },
  {
    id: '3',
    name: 'New Car',
    icon: '🚗',
    targetAmount: 25000,
    currentAmount: 8000,
    monthlyContribution: 600,
    targetDate: new Date('2026-06-01'),
    priority: 3,
    linkedAccounts: ['Chase Savings'],
    status: 'behind',
    isActive: true
  },
  {
    id: '4',
    name: 'Vacation Fund',
    icon: '✈️',
    targetAmount: 5000,
    currentAmount: 2800,
    monthlyContribution: 300,
    targetDate: new Date('2025-07-01'),
    priority: 4,
    linkedAccounts: ['Chase Checking'],
    status: 'on-track',
    isActive: true
  }
];

export default function GoalsScreen({ onBack, onNavigate }: GoalsScreenProps) {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [showAmounts, setShowAmounts] = useState(true);

  // Calculate overall statistics
  const totalSaved = useMemo(() => 
    goals.reduce((sum, goal) => sum + goal.currentAmount, 0), [goals]
  );

  const totalTarget = useMemo(() => 
    goals.reduce((sum, goal) => sum + goal.targetAmount, 0), [goals]
  );

  const totalRemaining = totalTarget - totalSaved;
  const overallProgress = (totalSaved / totalTarget) * 100;

  const formatCurrency = (amount: number) => {
    if (!showAmounts) return '••••••';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead': return 'text-green-600 bg-green-100';
      case 'behind': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ahead': return 'Ahead of Schedule';
      case 'behind': return 'Falling Behind';
      default: return 'On Track';
    }
  };

  const handleGoalClick = (goal: Goal) => {
    onNavigate?.('goal-details', { goal });
  };

  const handleQuickContribution = (goalId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate?.('add-contribution', { goalId });
  };

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
          <Button variant="ghost" size="icon" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <h1 className="text-xl font-semibold text-foreground">Goals</h1>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onNavigate?.('goal-settings')}
              className="p-2"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button 
              size="icon" 
              onClick={() => onNavigate?.('create-goal')}
              className="p-2"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Goal Progress Summary */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Overall Progress</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAmounts(!showAmounts)}
                className="p-2"
              >
                {showAmounts ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </div>

            {/* Progress Ring/Bar */}
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  {/* Background circle */}
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="45"
                      stroke="hsl(var(--muted))"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="45"
                      stroke="hsl(var(--primary))"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - overallProgress / 100)}`}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-foreground">
                      {Math.round(overallProgress)}%
                    </span>
                    <span className="text-xs text-muted-foreground">Complete</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Saved</p>
                  <p className="text-xl font-bold text-green-600">{formatCurrency(totalSaved)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className="text-xl font-bold text-foreground">{formatCurrency(totalRemaining)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goals List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">My Goals</h3>
            <Badge variant="secondary">{goals.length} active</Badge>
          </div>

          <div className="space-y-3">
            {goals.map((goal) => {
              const progress = (goal.currentAmount / goal.targetAmount) * 100;
              const monthsToTarget = Math.ceil(
                (goal.targetAmount - goal.currentAmount) / goal.monthlyContribution
              );

              return (
                <Card 
                  key={goal.id} 
                  className="hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => handleGoalClick(goal)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Goal Icon */}
                      <div className="text-3xl">{goal.icon}</div>
                      
                      <div className="flex-1 space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-foreground">{goal.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>Target: {formatCurrency(goal.targetAmount)}</span>
                              <span>•</span>
                              <span>Est. {formatDate(goal.targetDate)}</span>
                            </div>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="p-1 h-auto w-auto"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                onNavigate?.('edit-goal', { goal });
                              }}>
                                <Edit3 className="h-4 w-4 mr-2" />
                                Edit Goal
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => handleQuickContribution(goal.id, e)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Contribution
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Progress */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {formatCurrency(goal.currentAmount)} saved
                            </span>
                            <span className="font-semibold text-foreground">
                              {Math.round(progress)}%
                            </span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>

                        {/* Details */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {formatCurrency(goal.monthlyContribution)}/month
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {monthsToTarget} months left
                              </span>
                            </div>
                          </div>
                          
                          <Badge className={`text-xs ${getStatusColor(goal.status)}`}>
                            {getStatusText(goal.status)}
                          </Badge>
                        </div>

                        {/* Linked Accounts */}
                        {goal.linkedAccounts.length > 0 && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>Linked:</span>
                            <div className="flex gap-1">
                              {goal.linkedAccounts.slice(0, 2).map((account) => (
                                <Badge key={account} variant="outline" className="text-xs">
                                  {account}
                                </Badge>
                              ))}
                              {goal.linkedAccounts.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{goal.linkedAccounts.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* AI Insights */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <TrendingUp className="h-5 w-5" />
              Smart Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-800 space-y-2">
            <p>• You're saving 15% faster than planned across all goals! Consider increasing your Dream Home target.</p>
            <p>• Your Emergency Fund is ahead of schedule. You could redirect $200/month to your Car Fund to catch up.</p>
            <p>• Increasing your monthly contributions by just $150 would help you reach all goals 3 months earlier.</p>
          </CardContent>
        </Card>

        {/* Empty State (if no goals) */}
        {goals.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Goals Yet</h3>
              <p className="text-muted-foreground mb-6">
                Start your financial journey by creating your first savings goal.
              </p>
              <Button onClick={() => onNavigate?.('create-goal')}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Goal
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}