import { ArrowLeft, PiggyBank, TrendingUp, Zap, Target, Calendar, DollarSign, Settings, CheckCircle, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useState } from 'react';

interface AIAutoSaveScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export default function AIAutoSaveScreen({ onBack, onNavigate }: AIAutoSaveScreenProps) {
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  const autoSaveEvent = {
    amount: 25.50,
    trigger: 'Round-up savings',
    date: 'Dec 26, 2024',
    time: '2:34 PM',
    fromAccount: 'Chase Checking',
    toAccount: 'High-Yield Savings',
    transactionTrigger: 'Coffee purchase at Starbucks ($4.50)',
    roundUpAmount: 0.50,
    bonusMultiplier: 50 // 50x round-up
  };

  const savingsStats = {
    totalSavedThisMonth: 185.75,
    savingsGoal: 500,
    averagePerWeek: 46.44,
    streakDays: 12,
    nextMilestone: 200
  };

  const recentAutoSaves = [
    {
      id: '1',
      amount: 25.50,
      trigger: 'Round-up (50x)',
      transaction: 'Starbucks Coffee',
      date: 'Today, 2:34 PM',
      status: 'completed'
    },
    {
      id: '2',
      amount: 15.25,
      trigger: 'Surplus detection',
      transaction: 'Weekly analysis',
      date: 'Yesterday, 6:00 AM',
      status: 'completed'
    },
    {
      id: '3',
      amount: 12.75,
      trigger: 'Round-up (25x)',
      transaction: 'Grocery shopping',
      date: 'Dec 24, 4:22 PM',
      status: 'completed'
    },
    {
      id: '4',
      amount: 8.00,
      trigger: 'Cashback boost',
      transaction: 'Gas station',
      date: 'Dec 23, 11:15 AM',
      status: 'pending'
    }
  ];

  const savingsTriggers = [
    {
      id: '1',
      name: 'Smart Round-ups',
      description: 'Round up purchases with AI-optimized multipliers',
      isEnabled: true,
      savings: 125.50,
      frequency: '15-20 times/week'
    },
    {
      id: '2',
      name: 'Surplus Detection',
      description: 'Save unexpected money left over each week',
      isEnabled: true,
      savings: 45.25,
      frequency: '1-2 times/week'
    },
    {
      id: '3',
      name: 'Cashback Boosts',
      description: 'Automatically save earned cashback rewards',
      isEnabled: true,
      savings: 15.00,
      frequency: '3-5 times/week'
    },
    {
      id: '4',
      name: 'Goal Accelerator',
      description: 'Extra saves when you\'re close to milestones',
      isEnabled: false,
      savings: 0,
      frequency: 'As needed'
    }
  ];

  const handleToggleAutoSave = () => {
    setAutoSaveEnabled(!autoSaveEnabled);
  };

  const handleConfigureTrigger = (triggerId: string) => {
    // Implementation for configuring specific triggers
    alert(`Configuring trigger: ${triggerId}`);
  };

  const progressPercentage = (savingsStats.totalSavedThisMonth / savingsStats.savingsGoal) * 100;

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
            <h1 className="font-medium">Auto-Save Triggered</h1>
            <p className="text-sm text-muted-foreground">AI-powered automatic savings</p>
          </div>
          <Badge variant={autoSaveEnabled ? "default" : "secondary"}>
            {autoSaveEnabled ? 'Active' : 'Paused'}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Latest Auto-Save Event */}
        <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <PiggyBank className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="font-medium text-green-800">Auto-Save Completed!</h2>
                <p className="text-sm text-green-600">{autoSaveEvent.trigger}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-2xl text-green-800">+${autoSaveEvent.amount}</div>
              <div className="text-sm text-green-600">{autoSaveEvent.date}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-700">Transaction:</span>
              <span className="text-green-800 font-medium">{autoSaveEvent.transactionTrigger}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-700">Round-up:</span>
              <span className="text-green-800 font-medium">${autoSaveEvent.roundUpAmount} × {autoSaveEvent.bonusMultiplier}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-700">From:</span>
              <span className="text-green-800 font-medium">{autoSaveEvent.fromAccount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-700">To:</span>
              <span className="text-green-800 font-medium">{autoSaveEvent.toAccount}</span>
            </div>
          </div>
        </Card>

        {/* Monthly Progress */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <span className="font-medium">Monthly Savings Progress</span>
            </div>
            <div className="text-right">
              <div className="font-medium">${savingsStats.totalSavedThisMonth}</div>
              <div className="text-sm text-muted-foreground">of ${savingsStats.savingsGoal}</div>
            </div>
          </div>

          <Progress value={progressPercentage} className="mb-4" />

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-2 bg-muted rounded-lg">
              <div className="font-medium">${savingsStats.averagePerWeek}</div>
              <div className="text-xs text-muted-foreground">Avg/Week</div>
            </div>
            <div className="text-center p-2 bg-muted rounded-lg">
              <div className="font-medium">{savingsStats.streakDays}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
            <div className="text-center p-2 bg-muted rounded-lg">
              <div className="font-medium">${savingsStats.nextMilestone - savingsStats.totalSavedThisMonth}</div>
              <div className="text-xs text-muted-foreground">To Next Goal</div>
            </div>
          </div>
        </Card>

        {/* Recent Auto-Saves */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Recent Auto-Saves</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {recentAutoSaves.map((save) => (
              <div key={save.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-1 rounded-full ${save.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                    {save.status === 'completed' ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{save.trigger}</div>
                    <div className="text-xs text-muted-foreground">{save.transaction}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-green-600">+${save.amount}</div>
                  <div className="text-xs text-muted-foreground">{save.date}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Savings Triggers */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Auto-Save Triggers</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleToggleAutoSave}
            >
              <Settings className="w-4 h-4 mr-2" />
              {autoSaveEnabled ? 'Pause All' : 'Enable All'}
            </Button>
          </div>
          <div className="space-y-3">
            {savingsTriggers.map((trigger) => (
              <div key={trigger.id} className="p-3 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className={`w-4 h-4 ${trigger.isEnabled ? 'text-green-500' : 'text-gray-400'}`} />
                    <span className="font-medium">{trigger.name}</span>
                    <Badge variant={trigger.isEnabled ? "default" : "secondary"}>
                      {trigger.isEnabled ? 'On' : 'Off'}
                    </Badge>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleConfigureTrigger(trigger.id)}
                  >
                    Configure
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{trigger.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Saved this month: <span className="font-medium text-green-600">${trigger.savings}</span></span>
                  <span className="text-muted-foreground">{trigger.frequency}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Insights */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">AI Savings Insights</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-blue-800">Optimal Timing Detected</div>
                  <div className="text-blue-700">
                    Your round-up multiplier has been increased to 50x due to recent surplus cash flow.
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-start gap-2">
                <PiggyBank className="w-4 h-4 text-green-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-green-800">Savings Momentum</div>
                  <div className="text-green-700">
                    You're on track to exceed your monthly goal by 15%. Consider increasing your target!
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-yellow-800">Upcoming Opportunity</div>
                  <div className="text-yellow-700">
                    Based on your spending patterns, we'll trigger extra savings around New Year's purchases.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Manual Save
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
}