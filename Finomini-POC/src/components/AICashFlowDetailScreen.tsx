import { ArrowLeft, TrendingUp, TrendingDown, Calendar, DollarSign, AlertTriangle, BarChart3, Target, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useState } from 'react';

interface AICashFlowDetailScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export default function AICashFlowDetailScreen({ onBack, onNavigate }: AICashFlowDetailScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');

  const cashFlowForecast = {
    currentBalance: 2850,
    projectedBalance: 1950,
    confidenceLevel: 87,
    forecastPeriod: 7,
    riskLevel: 'Medium',
    lastUpdated: '2 minutes ago'
  };

  const dailyForecast = [
    {
      date: 'Dec 27',
      startBalance: 2850,
      endBalance: 2820,
      transactions: [
        { name: 'Salary Direct Deposit', amount: 3200, time: '12:00 AM', type: 'income' },
        { name: 'Rent Payment', amount: -1200, time: '9:00 AM', type: 'expense' },
        { name: 'Utility Bill', amount: -150, time: '2:00 PM', type: 'expense' }
      ],
      netChange: -30,
      confidence: 95
    },
    {
      date: 'Dec 28',
      startBalance: 2820,
      endBalance: 2310,
      transactions: [
        { name: 'Grocery Shopping', amount: -180, time: '10:00 AM', type: 'expense' },
        { name: 'Gas Station', amount: -65, time: '3:00 PM', type: 'expense' },
        { name: 'Spotify Subscription', amount: -9.99, time: '6:00 PM', type: 'expense' },
        { name: 'Freelance Payment', amount: 250, time: '8:00 PM', type: 'income' }
      ],
      netChange: -510,
      confidence: 88
    },
    {
      date: 'Dec 29',
      startBalance: 2310,
      endBalance: 2180,
      transactions: [
        { name: 'Coffee Purchase', amount: -4.50, time: '8:30 AM', type: 'expense' },
        { name: 'Lunch', amount: -12, time: '12:30 PM', type: 'expense' },
        { name: 'Phone Bill', amount: -85, time: '4:00 PM', type: 'expense' },
        { name: 'Cashback Reward', amount: 15, time: '7:00 PM', type: 'income' }
      ],
      netChange: -130,
      confidence: 92
    }
  ];

  const riskFactors = [
    {
      factor: 'Large Upcoming Payment',
      impact: 'High',
      description: 'Rent payment will significantly reduce available balance',
      mitigation: 'Consider setting up automatic transfer from savings',
      probability: 'Certain'
    },
    {
      factor: 'Variable Income',
      impact: 'Medium',
      description: 'Freelance payments can vary by ±30%',
      mitigation: 'Build buffer or diversify income sources',
      probability: 'Likely'
    },
    {
      factor: 'Seasonal Spending',
      impact: 'Low',
      description: 'Holiday season may increase discretionary spending',
      mitigation: 'Set spending alerts for entertainment category',
      probability: 'Possible'
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleOptimizeCashFlow = () => {
    onNavigate('ai-cash-flow-optimizer');
  };

  const handleSetupAlerts = () => {
    onNavigate('ai-cash-flow-alert-settings');
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
            <h1 className="font-medium">Cash Flow Details</h1>
            <p className="text-sm text-muted-foreground">7-day forecast analysis</p>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {cashFlowForecast.confidenceLevel}% Confidence
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Period Selector */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Forecast Period</h3>
          <div className="grid grid-cols-3 gap-2">
            {['7days', '14days', '30days'].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className="text-xs"
              >
                {period === '7days' ? '7 Days' : period === '14days' ? '14 Days' : '30 Days'}
              </Button>
            ))}
          </div>
        </Card>

        {/* Overview Summary */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span className="font-medium">Forecast Summary</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Updated {cashFlowForecast.lastUpdated}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Current Balance</div>
              <div className="font-medium text-lg">${cashFlowForecast.currentBalance.toLocaleString()}</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Projected Balance</div>
              <div className={`font-medium text-lg ${cashFlowForecast.projectedBalance < 1000 ? 'text-red-600' : 'text-green-600'}`}>
                ${cashFlowForecast.projectedBalance.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-sm">Risk Level:</div>
              <Badge className={getImpactColor(cashFlowForecast.riskLevel)} variant="secondary">
                {cashFlowForecast.riskLevel}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {cashFlowForecast.forecastPeriod} day outlook
            </div>
          </div>
        </Card>

        {/* Daily Breakdown */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Daily Breakdown</h3>
          <div className="space-y-4">
            {dailyForecast.map((day, index) => (
              <div key={index} className="border border-border rounded-lg p-3">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">{day.date}</div>
                    <div className="text-sm text-muted-foreground">{day.confidence}% confidence</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Net Change</div>
                    <div className={`font-medium ${day.netChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {day.netChange >= 0 ? '+' : ''}${day.netChange.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3 text-sm">
                  <span>Start: ${day.startBalance.toLocaleString()}</span>
                  <span>End: ${day.endBalance.toLocaleString()}</span>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-medium mb-2">Expected Transactions:</div>
                  {day.transactions.map((transaction, txIndex) => (
                    <div key={txIndex} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {transaction.type === 'income' ? (
                          <TrendingUp className="w-3 h-3 text-green-500" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-500" />
                        )}
                        <span>{transaction.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{transaction.time}</span>
                        <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                          {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Risk Analysis */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Risk Analysis</h3>
          <div className="space-y-3">
            {riskFactors.map((risk, index) => (
              <div key={index} className="p-3 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{risk.factor}</div>
                  <Badge className={getImpactColor(risk.impact)} variant="secondary">
                    {risk.impact} Impact
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-2">{risk.description}</div>
                <div className="text-sm">
                  <span className="font-medium">Mitigation: </span>
                  {risk.mitigation}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Probability: {risk.probability}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">AI Recommendations</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <Target className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-blue-800">Optimize Payment Timing</div>
                  <div className="text-blue-700">
                    Delay non-essential payments by 2-3 days to maintain better cash flow balance.
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-start gap-2">
                <DollarSign className="w-4 h-4 text-green-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-green-800">Emergency Buffer</div>
                  <div className="text-green-700">
                    Consider transferring $500 from savings as a temporary buffer during this period.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-yellow-800">Income Acceleration</div>
                  <div className="text-yellow-700">
                    Follow up on pending freelance payments to improve cash flow timing.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={handleOptimizeCashFlow} className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Optimize Flow
          </Button>
          <Button variant="outline" onClick={handleSetupAlerts} className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Setup Alerts
          </Button>
        </div>
      </div>
    </div>
  );
}