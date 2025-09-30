import { ArrowLeft, TrendingUp, RotateCcw, Target, PieChart, AlertCircle, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useState } from 'react';

interface AIPortfolioRebalancingScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export default function AIPortfolioRebalancingScreen({ onBack, onNavigate }: AIPortfolioRebalancingScreenProps) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const portfolioAnalysis = {
    totalValue: 45750,
    needsRebalancing: true,
    riskLevel: 'Moderate',
    lastRebalanced: '3 months ago',
    deviation: 12.5,
    potentialGains: 1850
  };

  const currentAllocation = [
    { asset: 'US Stocks', current: 68, target: 60, difference: +8, color: 'bg-blue-500' },
    { asset: 'International', current: 15, target: 20, difference: -5, color: 'bg-green-500' },
    { asset: 'Bonds', current: 12, target: 15, difference: -3, color: 'bg-yellow-500' },
    { asset: 'Cash', current: 5, target: 5, difference: 0, color: 'bg-gray-500' }
  ];

  const rebalancingActions = [
    {
      id: '1',
      action: 'Sell',
      asset: 'VTSAX (US Stocks)',
      amount: 3650,
      shares: 42,
      reason: 'Reduce overweight US allocation by 8%',
      impact: 'Lower concentration risk'
    },
    {
      id: '2',
      action: 'Buy',
      asset: 'VTIAX (International)',
      amount: 2290,
      shares: 85,
      reason: 'Increase international exposure by 5%',
      impact: 'Better diversification'
    },
    {
      id: '3',
      action: 'Buy',
      asset: 'VBTLX (Bonds)',
      amount: 1360,
      shares: 128,
      reason: 'Increase bond allocation by 3%',
      impact: 'Improved stability'
    }
  ];

  const marketInsights = [
    {
      title: 'Market Volatility',
      description: 'Recent market fluctuations have skewed your allocation',
      impact: 'High',
      color: 'text-red-600'
    },
    {
      title: 'Opportunity Window',
      description: 'International markets are currently undervalued',
      impact: 'Medium',
      color: 'text-yellow-600'
    },
    {
      title: 'Tax Efficiency',
      description: 'Rebalancing can be done with minimal tax impact',
      impact: 'Low',
      color: 'text-green-600'
    }
  ];

  const handleExecuteRebalancing = () => {
    // Implementation for executing rebalancing
    alert('Rebalancing initiated! This would connect to your brokerage account.');
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
            <h1 className="font-medium">Smart Portfolio Rebalancing</h1>
            <p className="text-sm text-muted-foreground">AI-powered portfolio optimization</p>
          </div>
          <Badge variant={portfolioAnalysis.needsRebalancing ? "destructive" : "secondary"}>
            {portfolioAnalysis.needsRebalancing ? 'Action Needed' : 'Balanced'}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Portfolio Overview */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              <span className="font-medium">Portfolio Overview</span>
            </div>
            <div className="text-right">
              <div className="font-medium">${portfolioAnalysis.totalValue.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Value</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="font-medium text-lg text-red-600">{portfolioAnalysis.deviation}%</div>
              <div className="text-sm text-muted-foreground">Deviation from Target</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="font-medium text-lg text-green-600">+${portfolioAnalysis.potentialGains}</div>
              <div className="text-sm text-muted-foreground">Potential Gains</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Risk Level: {portfolioAnalysis.riskLevel}</span>
            <span>Last Rebalanced: {portfolioAnalysis.lastRebalanced}</span>
          </div>
        </Card>

        {/* Current vs Target Allocation */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Asset Allocation Analysis</h3>
          <div className="space-y-4">
            {currentAllocation.map((asset, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{asset.asset}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {asset.current}% / {asset.target}%
                    </span>
                    <Badge 
                      variant={asset.difference === 0 ? "secondary" : asset.difference > 0 ? "destructive" : "default"}
                      className="text-xs"
                    >
                      {asset.difference > 0 ? '+' : ''}{asset.difference}%
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2 relative">
                    <div 
                      className={`${asset.color} h-2 rounded-full`}
                      style={{ width: `${asset.current}%` }}
                    />
                    <div 
                      className="absolute top-0 w-0.5 h-2 bg-primary"
                      style={{ left: `${asset.target}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recommended Actions */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Recommended Actions</h3>
            <Badge variant="outline">3 Actions</Badge>
          </div>
          <div className="space-y-3">
            {rebalancingActions.map((action) => (
              <div key={action.id} className="p-3 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={action.action === 'Sell' ? "destructive" : "default"}>
                      {action.action}
                    </Badge>
                    <span className="font-medium">{action.asset}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${action.amount.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{action.shares} shares</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{action.reason}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">{action.impact}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onNavigate('ai-portfolio-review')}
                  >
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Market Insights */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Market Insights</h3>
          <div className="space-y-3">
            {marketInsights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-medium text-sm">{insight.title}</div>
                  <div className="text-sm text-muted-foreground">{insight.description}</div>
                </div>
                <Badge variant="outline" className={insight.color}>
                  {insight.impact}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Execution Options */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Execution Options</h3>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <div className="font-medium">Auto-Rebalance</div>
                <div className="text-sm text-muted-foreground">Execute all recommendations immediately</div>
              </div>
              <Button onClick={handleExecuteRebalancing}>
                Execute Now
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <div className="font-medium">Scheduled Rebalancing</div>
                <div className="text-sm text-muted-foreground">Set up automatic monthly rebalancing</div>
              </div>
              <Button variant="outline">
                Schedule
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <div className="font-medium">Manual Review</div>
                <div className="text-sm text-muted-foreground">Review each transaction individually</div>
              </div>
              <Button variant="outline" onClick={() => onNavigate('ai-portfolio-review')}>
                Review
              </Button>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <div className="font-medium text-yellow-800">Tax Consideration</div>
                <div className="text-yellow-700">
                  Selling positions may trigger taxable events. Consider tax-loss harvesting opportunities.
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Performance Projection */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Performance Projection</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="font-medium text-green-800">Expected Return</div>
              <div className="text-sm text-green-600">+2.3% annually</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="font-medium text-blue-800">Risk Reduction</div>
              <div className="text-sm text-blue-600">-15% volatility</div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" onClick={() => onNavigate('ai-portfolio-review')}>
              Detailed Review
            </Button>
            <Button variant="outline" size="sm" onClick={() => onNavigate('ai-credit-card-optimizer')}>
              Card Optimizer
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}