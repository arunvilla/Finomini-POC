import { ArrowLeft, PieChart, TrendingUp, AlertCircle, CheckCircle, BarChart3, Target, Calendar, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useState } from 'react';

interface AIPortfolioReviewScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export default function AIPortfolioReviewScreen({ onBack, onNavigate }: AIPortfolioReviewScreenProps) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const portfolioReview = {
    totalValue: 45750,
    dayChange: 285,
    dayChangePercent: 0.63,
    overallRating: 'B+',
    lastRebalanced: '3 months ago',
    nextReviewDate: '2025-01-15'
  };

  const detailedAnalysis = [
    {
      id: '1',
      action: 'Sell VTSAX',
      currentValue: 31100,
      targetValue: 27450,
      difference: -3650,
      reasoning: 'US stocks are overweight by 8%. Market volatility suggests taking some profits.',
      riskLevel: 'Low',
      taxImplications: 'Long-term gains: ~$420 in taxes',
      marketTiming: 'Favorable - high valuations',
      priority: 'High',
      status: 'recommended'
    },
    {
      id: '2',
      action: 'Buy VTIAX',
      currentValue: 6862,
      targetValue: 9150,
      difference: 2288,
      reasoning: 'International exposure is underweight. Emerging markets showing value.',
      riskLevel: 'Medium',
      taxImplications: 'No tax impact (purchase)',
      marketTiming: 'Good entry point',
      priority: 'High',
      status: 'recommended'
    },
    {
      id: '3',
      action: 'Buy VBTLX',
      currentValue: 5488,
      targetValue: 6850,
      difference: 1362,
      reasoning: 'Bond allocation below target. Provides stability during market uncertainty.',
      riskLevel: 'Low',
      taxImplications: 'No tax impact (purchase)',
      marketTiming: 'Neutral',
      priority: 'Medium',
      status: 'optional'
    }
  ];

  const performanceMetrics = [
    {
      metric: 'Sharpe Ratio',
      current: 1.24,
      target: 1.35,
      status: 'needs_improvement',
      description: 'Risk-adjusted return efficiency'
    },
    {
      metric: 'Volatility',
      current: 15.8,
      target: 14.5,
      status: 'above_target',
      description: 'Annual portfolio volatility (%)'
    },
    {
      metric: 'Correlation',
      current: 0.78,
      target: 0.65,
      status: 'high',
      description: 'Asset correlation coefficient'
    },
    {
      metric: 'Expected Return',
      current: 8.2,
      target: 8.5,
      status: 'close',
      description: 'Projected annual return (%)'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'recommended':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'optional':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getMetricStatus = (status: string) => {
    switch (status) {
      case 'needs_improvement':
        return 'bg-red-100 text-red-800';
      case 'above_target':
        return 'bg-orange-100 text-orange-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'close':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApproveAction = (actionId: string) => {
    alert(`Approved action: ${actionId}`);
    // Implementation would approve specific rebalancing action
  };

  const handleRejectAction = (actionId: string) => {
    alert(`Rejected action: ${actionId}`);
    // Implementation would reject specific rebalancing action
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
            <h1 className="font-medium">Portfolio Review</h1>
            <p className="text-sm text-muted-foreground">Detailed rebalancing analysis</p>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Grade: {portfolioReview.overallRating}
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
              <div className="font-medium">${portfolioReview.totalValue.toLocaleString()}</div>
              <div className={`text-sm ${portfolioReview.dayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {portfolioReview.dayChange >= 0 ? '+' : ''}${Math.abs(portfolioReview.dayChange)} ({portfolioReview.dayChangePercent}%)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-2 bg-muted rounded-lg">
              <div className="font-medium">{portfolioReview.overallRating}</div>
              <div className="text-xs text-muted-foreground">Overall Grade</div>
            </div>
            <div className="text-center p-2 bg-muted rounded-lg">
              <div className="font-medium">3 months</div>
              <div className="text-xs text-muted-foreground">Since Rebalance</div>
            </div>
            <div className="text-center p-2 bg-muted rounded-lg">
              <div className="font-medium">Jan 15</div>
              <div className="text-xs text-muted-foreground">Next Review</div>
            </div>
          </div>
        </Card>

        {/* Performance Metrics */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Performance Metrics</h3>
          <div className="space-y-3">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <div className="font-medium">{metric.metric}</div>
                  <div className="text-sm text-muted-foreground">{metric.description}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{metric.current}</div>
                  <Badge className={getMetricStatus(metric.status)} variant="secondary">
                    Target: {metric.target}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Detailed Action Review */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Proposed Actions</h3>
          <div className="space-y-4">
            {detailedAnalysis.map((action) => (
              <div key={action.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(action.status)}
                    <span className="font-medium">{action.action}</span>
                    <Badge variant={action.priority === 'High' ? "destructive" : "secondary"}>
                      {action.priority}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${action.difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {action.difference >= 0 ? '+' : ''}${Math.abs(action.difference).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Current Value:</span>
                      <div className="font-medium">${action.currentValue.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Target Value:</span>
                      <div className="font-medium">${action.targetValue.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-800 text-sm mb-1">AI Reasoning</div>
                    <div className="text-blue-700 text-sm">{action.reasoning}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Risk Level:</span>
                      <Badge variant="outline" className="ml-1">{action.riskLevel}</Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Market Timing:</span>
                      <div className="font-medium">{action.marketTiming}</div>
                    </div>
                  </div>

                  <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
                    <div className="text-sm">
                      <span className="font-medium text-yellow-800">Tax Impact: </span>
                      <span className="text-yellow-700">{action.taxImplications}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleApproveAction(action.id)}
                      className="flex-1"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRejectAction(action.id)}
                      className="flex-1"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary & Next Steps */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Summary & Next Steps</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-green-800">Expected Improvement</div>
                  <div className="text-green-700">
                    Implementing these changes could improve your Sharpe ratio by 0.11 and reduce volatility by 1.3%.
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-blue-800">Timing Recommendation</div>
                  <div className="text-blue-700">
                    Execute transactions over 2-3 days to minimize market impact and optimize execution prices.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-start gap-2">
                <DollarSign className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-yellow-800">Cost Analysis</div>
                  <div className="text-yellow-700">
                    Total estimated costs: $45 in transaction fees + ~$420 in taxes = $465 total.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={() => onNavigate('ai-portfolio-rebalancing')} className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Execute All
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Modify Plan
          </Button>
        </div>
      </div>
    </div>
  );
}