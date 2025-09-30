import { useState } from 'react';
import { ArrowLeft, Edit3, MoreHorizontal, Plus, TrendingUp, Calendar, DollarSign, Target, Trash2, Pause, CheckCircle, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Separator } from './ui/separator';

interface GoalDetailsScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
  goal?: any;
}

// Mock contribution history
const mockContributions = [
  {
    id: '1',
    date: new Date('2024-12-27'),
    description: 'Monthly transfer',
    amount: 1200,
    type: 'automatic',
    account: 'Chase Savings'
  },
  {
    id: '2',
    date: new Date('2024-12-15'), 
    description: 'Bonus contribution',
    amount: 500,
    type: 'manual',
    account: 'High Yield Savings'
  },
  {
    id: '3',
    date: new Date('2024-11-27'),
    description: 'Monthly transfer',
    amount: 1200,
    type: 'automatic',
    account: 'Chase Savings'
  },
  {
    id: '4',
    date: new Date('2024-11-10'),
    description: 'Tax refund',
    amount: 2500,
    type: 'manual',
    account: 'High Yield Savings'
  },
  {
    id: '5',
    date: new Date('2024-10-27'),
    description: 'Monthly transfer',
    amount: 1200,
    type: 'automatic',
    account: 'Chase Savings'
  }
];

export default function GoalDetailsScreen({ onBack, onNavigate, goal }: GoalDetailsScreenProps) {
  // Mock goal data if none provided
  const mockGoal = {
    id: '1',
    name: 'Dream Home Down Payment',
    icon: '🏡',
    targetAmount: 50000,
    currentAmount: 35000,
    monthlyContribution: 1200,
    targetDate: new Date('2026-12-01'),
    priority: 1,
    linkedAccounts: ['Chase Savings ••••1234', 'High Yield Savings ••••9876'],
    status: 'on-track',
    isActive: true,
    description: 'Saving for a 20% down payment on our dream home in the suburbs.'
  };

  const currentGoal = goal || mockGoal;
  const progress = (currentGoal.currentAmount / currentGoal.targetAmount) * 100;
  const remainingAmount = currentGoal.targetAmount - currentGoal.currentAmount;
  
  // Calculate estimated completion
  const monthsRemaining = Math.ceil(remainingAmount / currentGoal.monthlyContribution);
  const estimatedCompletion = new Date();
  estimatedCompletion.setMonth(estimatedCompletion.getMonth() + monthsRemaining);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
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
          
          <div className="text-center flex-1 mx-4">
            <h1 className="text-lg font-semibold text-foreground truncate">{currentGoal.name}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onNavigate?.('edit-goal', { goal: currentGoal })}
              className="p-2"
            >
              <Edit3 className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="p-2">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => onNavigate?.('edit-goal', { goal: currentGoal })}>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Goal
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause Goal
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Achieved
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Goal
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Goal Progress Visualization */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-40 h-40">
                {/* Background circle */}
                <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    stroke="hsl(var(--muted))"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    stroke="hsl(var(--primary))"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 60}`}
                    strokeDashoffset={`${2 * Math.PI * 60 * (1 - progress / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl mb-1">{currentGoal.icon}</span>
                  <span className="text-2xl font-bold text-foreground">
                    {Math.round(progress)}%
                  </span>
                  <span className="text-xs text-muted-foreground">Complete</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Current Amount</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(currentGoal.currentAmount)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Target Amount</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(currentGoal.targetAmount)}</p>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(remainingAmount)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Monthly</span>
              </div>
              <p className="text-xl font-bold text-foreground">{formatCurrency(currentGoal.monthlyContribution)}</p>
              <p className="text-xs text-muted-foreground">per month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Timeline</span>
              </div>
              <p className="text-xl font-bold text-foreground">{monthsRemaining}</p>
              <p className="text-xs text-muted-foreground">months left</p>
            </CardContent>
          </Card>
        </div>

        {/* Status and Estimated Completion */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge className={`mt-1 ${getStatusColor(currentGoal.status)}`}>
                  {getStatusText(currentGoal.status)}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground">Est. Completion</p>
                <p className="font-semibold text-foreground">{formatDate(estimatedCompletion)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Linked Accounts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Linked Accounts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentGoal.linkedAccounts.map((account: string, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{account}</p>
                  <p className="text-xs text-muted-foreground">Contributing to this goal</p>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contribution History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Recent Contributions
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate?.('goal-contributions', { goal: currentGoal })}
              >
                See All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {mockContributions.slice(0, 5).map((contribution, index) => (
                <div key={contribution.id} className="p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-foreground">{contribution.description}</p>
                        <Badge 
                          variant={contribution.type === 'automatic' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {contribution.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{contribution.account}</span>
                        <span>•</span>
                        <span>{formatDate(contribution.date)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">
                        +{formatCurrency(contribution.amount)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={() => onNavigate?.('add-contribution', { goal: currentGoal })}
            className="w-full flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Contribution
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => onNavigate?.('edit-goal', { goal: currentGoal })}
            className="w-full flex items-center gap-2"
          >
            <Edit3 className="h-4 w-4" />
            Adjust Goal
          </Button>
        </div>

        {/* AI-Driven Insights */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <TrendingUp className="h-5 w-5" />
              Smart Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-800 space-y-2">
            <p>• You're saving 12% faster than planned! You could reach your goal 2 months early.</p>
            <p>• Consider increasing your target to $55,000 to account for potential price increases.</p>
            <p>• Your High Yield Savings account earns 4.5% APY - great choice for this goal!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}