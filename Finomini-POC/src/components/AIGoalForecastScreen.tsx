import { ArrowLeft, Target, TrendingUp, Calendar, BarChart3, AlertTriangle, CheckCircle, Zap, DollarSign, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useState } from 'react';

interface AIGoalForecastScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export default function AIGoalForecastScreen({ onBack, onNavigate }: AIGoalForecastScreenProps) {
  const [selectedGoal, setSelectedGoal] = useState('vacation');

  const goalForecasts = [
    {
      id: 'vacation',
      name: 'Dream Vacation to Japan',
      targetAmount: 5000,
      currentAmount: 2350,
      originalDeadline: '2025-06-15',
      forecastedCompletion: '2025-05-28',
      confidence: 94,
      status: 'ahead',
      monthlyContribution: 425,
      recommendedContribution: 385,
      daysAhead: 18,
      icon: '✈️',
      insights: [
        'Your current savings rate puts you 18 days ahead of schedule',
        'Consider reducing monthly contributions by $40 to free up cash flow',
        'Recent auto-save boosts are accelerating your progress'
      ]
    },
    {
      id: 'emergency',
      name: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 6800,
      originalDeadline: '2025-12-31',
      forecastedCompletion: '2025-10-15',
      confidence: 87,
      status: 'ahead',
      monthlyContribution: 650,
      recommendedContribution: 650,
      daysAhead: 77,
      icon: '🛡️',
      insights: [
        'You\'re significantly ahead of pace for this goal',
        'Consider this your highest priority - emergency funds are crucial',
        'Your discipline on this goal is excellent'
      ]
    },
    {
      id: 'house',
      name: 'House Down Payment',
      targetAmount: 50000,
      currentAmount: 12500,
      originalDeadline: '2026-08-01',
      forecastedCompletion: '2026-09-12',
      confidence: 78,
      status: 'at_risk',
      monthlyContribution: 1200,
      recommendedContribution: 1350,
      daysBehind: 42,
      icon: '🏠',
      insights: [
        'Current pace puts you 6 weeks behind target',
        'Consider increasing monthly contributions by $150',
        'Look for additional income sources or reduce expenses'
      ]
    },
    {
      id: 'car',
      name: 'New Car Fund',
      targetAmount: 25000,
      currentAmount: 8750,
      originalDeadline: '2025-09-01',
      forecastedCompletion: '2025-08-20',
      confidence: 91,
      status: 'on_track',
      monthlyContribution: 800,
      recommendedContribution: 800,
      daysAhead: 12,
      icon: '🚗',
      insights: [
        'You\'re slightly ahead of schedule',
        'Current contribution rate is optimal',
        'Market conditions favor car purchases in late summer'
      ]
    }
  ];

  const selectedGoalData = goalForecasts.find(goal => goal.id === selectedGoal) || goalForecasts[0];
  const progressPercentage = (selectedGoalData.currentAmount / selectedGoalData.targetAmount) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead':
        return 'bg-green-100 text-green-800';
      case 'on_track':
        return 'bg-blue-100 text-blue-800';
      case 'at_risk':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ahead':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'on_track':
        return <Target className="w-4 h-4 text-blue-600" />;
      case 'at_risk':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleOptimizeContribution = () => {
    alert('Opening contribution optimizer...');
  };

  const handleBoostSavings = () => {
    alert('Activating savings boost for this goal...');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-0 h-8 w-8"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-medium">Goal Achievement Forecast</h1>
            <p className="text-sm text-muted-foreground">AI-powered goal predictions</p>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            AI Analysis
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Goal Selector */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Select Goal to Analyze</h3>
          <div className="grid grid-cols-2 gap-2">
            {goalForecasts.map((goal) => (
              <Button
                key={goal.id}
                variant={selectedGoal === goal.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGoal(goal.id)}
                className="flex items-center gap-2 h-auto p-3"
              >
                <span className="text-lg">{goal.icon}</span>
                <div className="text-left flex-1">
                  <div className="font-medium text-xs">{goal.name}</div>
                  <div className="text-xs opacity-70">
                    ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </Card>

        {/* Selected Goal Forecast */}
        <Card className="p-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{selectedGoalData.icon}</div>
              <div>
                <h2 className="font-medium">{selectedGoalData.name}</h2>
                <p className="text-sm text-muted-foreground">
                  ${selectedGoalData.currentAmount.toLocaleString()} of ${selectedGoalData.targetAmount.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <Badge className={getStatusColor(selectedGoalData.status)} variant="secondary">
                <div className="flex items-center gap-1">
                  {getStatusIcon(selectedGoalData.status)}
                  {selectedGoalData.status === 'ahead' ? `${selectedGoalData.daysAhead} days ahead` :
                   selectedGoalData.status === 'at_risk' ? `${selectedGoalData.daysBehind} days behind` :
                   'On Track'}
                </div>
              </Badge>
              <div className="text-sm text-muted-foreground mt-1">
                {selectedGoalData.confidence}% confidence
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Progress</span>
                <span className="text-sm font-medium">{progressPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={progressPercentage} className="mb-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Target Date</span>
                </div>
                <div className="text-sm text-muted-foreground">{selectedGoalData.originalDeadline}</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Forecast Date</span>
                </div>
                <div className="text-sm text-muted-foreground">{selectedGoalData.forecastedCompletion}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Insights */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">AI Insights & Recommendations</h3>
          <div className="space-y-3">
            {selectedGoalData.insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <Zap className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm">{insight}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Contribution Analysis */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Contribution Analysis</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Current Monthly</div>
                <div className="text-sm text-muted-foreground">Your current contribution</div>
              </div>
              <div className="text-right">
                <div className="font-medium">${selectedGoalData.monthlyContribution}</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">AI Recommended</div>
                <div className="text-sm text-muted-foreground">Optimized for your goals</div>
              </div>
              <div className="text-right">
                <div className="font-medium">${selectedGoalData.recommendedContribution}</div>
                <div className={`text-sm ${
                  selectedGoalData.recommendedContribution > selectedGoalData.monthlyContribution 
                    ? 'text-red-600' 
                    : selectedGoalData.recommendedContribution < selectedGoalData.monthlyContribution
                    ? 'text-green-600'
                    : 'text-muted-foreground'
                }`}>
                  {selectedGoalData.recommendedContribution > selectedGoalData.monthlyContribution 
                    ? `+$${selectedGoalData.recommendedContribution - selectedGoalData.monthlyContribution} increase` 
                    : selectedGoalData.recommendedContribution < selectedGoalData.monthlyContribution
                    ? `-$${selectedGoalData.monthlyContribution - selectedGoalData.recommendedContribution} decrease`
                    : 'Current is optimal'}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={handleOptimizeContribution} className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Optimize
                </Button>
                <Button variant="outline" onClick={handleBoostSavings} className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Boost Savings
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Goal Summary Stats */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">All Goals Summary</h3>
          <div className="space-y-3">
            {goalForecasts.map((goal) => (
              <div key={goal.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{goal.icon}</span>
                  <div>
                    <div className="font-medium text-sm">{goal.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {((goal.currentAmount / goal.targetAmount) * 100).toFixed(0)}% complete
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(goal.status)} variant="secondary">
                    {goal.status === 'ahead' ? 'Ahead' :
                     goal.status === 'at_risk' ? 'At Risk' :
                     'On Track'}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    {goal.forecastedCompletion}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Add Funds
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Adjust Goals
          </Button>
        </div>
      </div>
    </div>
  );
}