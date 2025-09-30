import { useState } from 'react';
import { ArrowLeft, TrendingUp, Brain, DollarSign, Target, BarChart3, PieChart, AlertTriangle, CheckCircle2, Eye, Zap, Settings, LineChart, TrendingDown, Shield, Star, Calculator } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';

interface AIInvestmentAdvisorScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface PortfolioAnalysis {
  id: string;
  type: 'drift' | 'fee_alert' | 'rebalance' | 'diversification' | 'tax_optimization';
  title: string;
  description: string;
  impact: string;
  recommendation: string;
  urgency: 'high' | 'medium' | 'low';
  confidence: number;
  potentialSavings?: number;
}

interface InvestmentOpportunity {
  id: string;
  title: string;
  description: string;
  type: 'etf' | 'stock' | 'bond' | 'reit' | 'crypto';
  expectedReturn: number;
  riskLevel: 'low' | 'medium' | 'high';
  minInvestment: number;
  aiScore: number;
  reasoning: string[];
}

interface MarketInsight {
  id: string;
  title: string;
  description: string;
  type: 'trend' | 'opportunity' | 'warning' | 'news';
  relevance: number;
  timeframe: string;
  impact: 'positive' | 'negative' | 'neutral';
}

export default function AIInvestmentAdvisorScreen({ onBack, onNavigate }: AIInvestmentAdvisorScreenProps) {
  const [activeTab, setActiveTab] = useState('analysis');
  const [riskTolerance, setRiskTolerance] = useState('moderate');
  const [autoRebalancing, setAutoRebalancing] = useState(false);

  // Portfolio Analysis Data
  const portfolioAnalyses: PortfolioAnalysis[] = [
    {
      id: '1',
      type: 'drift',
      title: 'Portfolio Drift Detected',
      description: 'Your asset allocation has drifted 12% from target due to strong tech stock performance',
      impact: 'Risk level higher than intended',
      recommendation: 'Rebalance by selling 8% of tech holdings and buying bonds',
      urgency: 'medium',
      confidence: 87,
      potentialSavings: 0
    },
    {
      id: '2',
      type: 'fee_alert',
      title: 'High Expense Ratio Alert',
      description: 'Your REIT fund (VNQI) has a 0.32% expense ratio vs market average of 0.18%',
      impact: 'Costing $240/year in extra fees',
      recommendation: 'Switch to Vanguard Global ex-U.S. Real Estate ETF (VXUS)',
      urgency: 'low',
      confidence: 95,
      potentialSavings: 240
    },
    {
      id: '3',
      type: 'tax_optimization',
      title: 'Tax Loss Harvesting Opportunity',
      description: 'You have $3,200 in unrealized losses that could offset capital gains',
      impact: 'Potential $800 tax savings',
      recommendation: 'Harvest losses before year-end and reinvest in similar assets',
      urgency: 'high',
      confidence: 92,
      potentialSavings: 800
    },
    {
      id: '4',
      type: 'diversification',
      title: 'Sector Concentration Risk',
      description: 'Technology sector represents 45% of your portfolio vs recommended 25%',
      impact: 'High correlation risk during tech downturns',
      recommendation: 'Diversify into healthcare, financials, and international markets',
      urgency: 'medium',
      confidence: 89
    }
  ];

  // AI Investment Recommendations
  const investmentOpportunities: InvestmentOpportunity[] = [
    {
      id: '1',
      title: 'Vanguard Total Stock Market ETF (VTI)',
      description: 'Broad market exposure with ultra-low fees',
      type: 'etf',
      expectedReturn: 7.2,
      riskLevel: 'medium',
      minInvestment: 100,
      aiScore: 92,
      reasoning: [
        'Aligns with your moderate risk tolerance',
        'Extremely low 0.03% expense ratio',
        'Provides instant diversification across 4,000+ stocks',
        'Strong historical performance over 10+ years'
      ]
    },
    {
      id: '2',
      title: 'iShares Core MSCI International ETF (IEFA)',
      description: 'International developed market exposure',
      type: 'etf',
      expectedReturn: 6.8,
      riskLevel: 'medium',
      minInvestment: 75,
      aiScore: 88,
      reasoning: [
        'Reduces US market concentration risk',
        'Currently undervalued vs US markets',
        'Provides currency diversification',
        'Low 0.07% expense ratio'
      ]
    },
    {
      id: '3',
      title: 'Treasury Inflation-Protected Securities (TIPS)',
      description: 'Inflation-protected government bonds',
      type: 'bond',
      expectedReturn: 4.5,
      riskLevel: 'low',
      minInvestment: 500,
      aiScore: 85,
      reasoning: [
        'Perfect hedge against current inflation concerns',
        'Government backing provides safety',
        'Adjusts principal with inflation',
        'Balances portfolio risk'
      ]
    }
  ];

  // Market Insights
  const marketInsights: MarketInsight[] = [
    {
      id: '1',
      title: 'Fed Rate Cut Expectations',
      description: 'Market pricing in 75% chance of rate cut in next 6 months',
      type: 'opportunity',
      relevance: 85,
      timeframe: '3-6 months',
      impact: 'positive'
    },
    {
      id: '2',
      title: 'Tech Earnings Season Strong',
      description: '78% of tech companies beat earnings expectations this quarter',
      type: 'trend',
      relevance: 92,
      timeframe: 'Current',
      impact: 'positive'
    },
    {
      id: '3',
      title: 'Emerging Markets Undervalued',
      description: 'EM equities trading at 30% discount to developed markets',
      type: 'opportunity',
      relevance: 76,
      timeframe: '6-12 months',
      impact: 'positive'
    }
  ];

  const totalPortfolioValue = 45680;
  const unrealizedGains = 8420;
  const gainPercent = (unrealizedGains / (totalPortfolioValue - unrealizedGains)) * 100;

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'drift': return <TrendingUp className="w-4 h-4" />;
      case 'fee_alert': return <DollarSign className="w-4 h-4" />;
      case 'rebalance': return <BarChart3 className="w-4 h-4" />;
      case 'diversification': return <PieChart className="w-4 h-4" />;
      case 'tax_optimization': return <Calculator className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'etf': return <BarChart3 className="w-4 h-4" />;
      case 'stock': return <TrendingUp className="w-4 h-4" />;
      case 'bond': return <Shield className="w-4 h-4" />;
      case 'reit': return <Target className="w-4 h-4" />;
      case 'crypto': return <Zap className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">AI Investment Advisor</h1>
              <p className="text-sm text-muted-foreground">Personalized portfolio optimization</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Brain className="w-3 h-3 mr-1" />
            AI Active
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="analysis" className="text-xs">Analysis</TabsTrigger>
            <TabsTrigger value="opportunities" className="text-xs">Opportunities</TabsTrigger>
            <TabsTrigger value="insights" className="text-xs">Insights</TabsTrigger>
            <TabsTrigger value="settings" className="text-xs">Settings</TabsTrigger>
          </TabsList>

          {/* Portfolio Analysis Tab */}
          <TabsContent value="analysis" className="space-y-4">
            {/* Portfolio Summary */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Portfolio Overview</span>
                  </div>
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-blue-800">
                      ${totalPortfolioValue.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-600">Total Value</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-800">
                      +{gainPercent.toFixed(1)}%
                    </div>
                    <div className="text-sm text-green-600">Unrealized Gains</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Analysis Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  AI Portfolio Analysis
                </CardTitle>
                <CardDescription>Personalized insights based on your portfolio data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {portfolioAnalyses.map((analysis) => (
                  <div key={analysis.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                          {getTypeIcon(analysis.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{analysis.title}</h4>
                            <Badge variant="outline" className={getUrgencyColor(analysis.urgency)}>
                              {analysis.urgency} priority
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{analysis.description}</p>
                          <p className="text-sm font-medium text-blue-600">{analysis.impact}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Confidence</div>
                        <div className="text-sm font-medium">{analysis.confidence}%</div>
                        {analysis.potentialSavings && analysis.potentialSavings > 0 && (
                          <div className="text-sm text-green-600 font-medium">
                            Save ${analysis.potentialSavings}/year
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-sm font-medium text-green-800 mb-1">AI Recommendation</div>
                      <p className="text-sm text-green-700">{analysis.recommendation}</p>
                    </div>

                    <Button 
                      size="sm" 
                      className="w-full"
                      variant={analysis.urgency === 'high' ? 'default' : 'outline'}
                    >
                      {analysis.urgency === 'high' ? 'Take Action Now' : 'Review Recommendation'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Asset Allocation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-green-500" />
                  Current vs Target Allocation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">US Stocks</span>
                    <div className="flex items-center gap-2">
                      <Progress value={65} className="w-20 h-2" />
                      <span className="text-sm">65% (60% target)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">International</span>
                    <div className="flex items-center gap-2">
                      <Progress value={15} className="w-20 h-2" />
                      <span className="text-sm">15% (25% target)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bonds</span>
                    <div className="flex items-center gap-2">
                      <Progress value={20} className="w-20 h-2" />
                      <span className="text-sm">20% (15% target)</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Rebalance Portfolio
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Investment Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  AI Investment Recommendations
                </CardTitle>
                <CardDescription>Personalized investment opportunities based on your profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {investmentOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-green-100 text-green-600">
                          {getAssetIcon(opportunity.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{opportunity.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{opportunity.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary">{opportunity.type.toUpperCase()}</Badge>
                            <Badge variant="outline" className={getRiskColor(opportunity.riskLevel)}>
                              {opportunity.riskLevel} risk
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {opportunity.expectedReturn}%
                        </div>
                        <div className="text-xs text-muted-foreground">Expected return</div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs font-medium">{opportunity.aiScore}/100</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-sm font-medium text-blue-800 mb-2">AI Analysis</div>
                      <ul className="text-sm text-blue-700 space-y-1">
                        {opportunity.reasoning.map((reason, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Min investment: ${opportunity.minInvestment}
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Learn More</Button>
                        <Button size="sm">Invest Now</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Market Insights Tab */}
          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-orange-500" />
                  AI Market Intelligence
                </CardTitle>
                <CardDescription>Real-time insights relevant to your portfolio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {marketInsights.map((insight) => (
                  <div key={insight.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{insight.title}</h4>
                          <Badge variant={insight.impact === 'positive' ? 'default' : insight.impact === 'negative' ? 'destructive' : 'secondary'}>
                            {insight.impact}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{insight.relevance}%</div>
                        <div className="text-xs text-muted-foreground">Relevance</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Timeframe: {insight.timeframe}</span>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Performance Tracking */}
            <Card>
              <CardHeader>
                <CardTitle>AI Performance Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-green-800">AI Recommendations Followed</span>
                    <span className="text-sm text-green-600">12/15</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-blue-800">Outperformance vs S&P 500</span>
                    <span className="text-sm text-blue-600">+2.3%</span>
                  </div>
                  <div className="text-sm text-blue-600">Based on AI recommendations</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-gray-500" />
                  AI Investment Settings
                </CardTitle>
                <CardDescription>Configure your investment preferences and AI behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium">Risk Tolerance</label>
                  <div className="space-y-2">
                    <Button 
                      variant={riskTolerance === 'conservative' ? 'default' : 'outline'} 
                      className="w-full justify-start"
                      onClick={() => setRiskTolerance('conservative')}
                    >
                      Conservative - Prioritize capital preservation
                    </Button>
                    <Button 
                      variant={riskTolerance === 'moderate' ? 'default' : 'outline'} 
                      className="w-full justify-start"
                      onClick={() => setRiskTolerance('moderate')}
                    >
                      Moderate - Balanced growth and stability
                    </Button>
                    <Button 
                      variant={riskTolerance === 'aggressive' ? 'default' : 'outline'} 
                      className="w-full justify-start"
                      onClick={() => setRiskTolerance('aggressive')}
                    >
                      Aggressive - Maximize growth potential
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-Rebalancing</h4>
                    <p className="text-sm text-muted-foreground">Let AI automatically rebalance when allocation drifts &gt;5%</p>
                  </div>
                  <Switch checked={autoRebalancing} onCheckedChange={setAutoRebalancing} />
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Notification Preferences</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Portfolio alerts</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Investment opportunities</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Market insights</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Rebalancing suggestions</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Button className="w-full" onClick={() => onNavigate('accounts')}>
                  <Target className="w-4 h-4 mr-2" />
                  Connect Investment Accounts
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}