import { useState } from 'react';
import { ArrowLeft, Brain, DollarSign, AlertTriangle, CheckCircle2, TrendingUp, Calendar, Zap, X, Eye, Settings, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';

interface AISubscriptionAuditScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface Subscription {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'yearly' | 'quarterly';
  category: string;
  icon: string;
  status: 'active' | 'cancelled' | 'paused';
  lastCharged: Date;
  nextCharge: Date;
  provider: string;
  riskLevel: 'high' | 'medium' | 'low';
  suggestions: string[];
  duplicateOf?: string;
  priceChange?: {
    oldPrice: number;
    newPrice: number;
    changeDate: Date;
  };
}

interface AuditInsight {
  id: string;
  type: 'duplicate' | 'price_increase' | 'unused' | 'optimization' | 'cancellation';
  title: string;
  description: string;
  potential_savings: number;
  subscriptions: string[];
  confidence: number;
  action: string;
}

export default function AISubscriptionAuditScreen({ onBack, onNavigate }: AISubscriptionAuditScreenProps) {
  const [activeTab, setActiveTab] = useState('insights');
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>([]);

  const subscriptions: Subscription[] = [
    {
      id: '1',
      name: 'Netflix',
      amount: 15.99,
      frequency: 'monthly',
      category: 'Entertainment',
      icon: '🎬',
      status: 'active',
      lastCharged: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      nextCharge: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
      provider: 'Netflix Inc.',
      riskLevel: 'low',
      suggestions: ['Consider family plan', 'Check usage frequency']
    },
    {
      id: '2',
      name: 'Spotify Premium',
      amount: 9.99,
      frequency: 'monthly',
      category: 'Entertainment',
      icon: '🎵',
      status: 'active',
      lastCharged: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      nextCharge: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      provider: 'Spotify AB',
      riskLevel: 'low',
      suggestions: ['High usage detected', 'Good value for money']
    },
    {
      id: '3',
      name: 'Amazon Prime',
      amount: 14.99,
      frequency: 'monthly',
      category: 'Shopping',
      icon: '📦',
      status: 'active',
      lastCharged: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      nextCharge: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
      provider: 'Amazon.com',
      riskLevel: 'medium',
      suggestions: ['Switch to yearly plan', 'Save $40/year'],
      priceChange: {
        oldPrice: 12.99,
        newPrice: 14.99,
        changeDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }
    },
    {
      id: '4',
      name: 'Adobe Creative Cloud',
      amount: 52.99,
      frequency: 'monthly',
      category: 'Software',
      icon: '🎨',
      status: 'active',
      lastCharged: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      nextCharge: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      provider: 'Adobe Inc.',
      riskLevel: 'high',
      suggestions: ['Low usage detected', 'Consider alternatives', 'Pause subscription']
    },
    {
      id: '5',
      name: 'Hulu',
      amount: 12.99,
      frequency: 'monthly',
      category: 'Entertainment',
      icon: '📺',
      status: 'active',
      lastCharged: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      nextCharge: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000),
      provider: 'Hulu LLC',
      riskLevel: 'medium',
      suggestions: ['Bundle with Disney+', 'Similar content to Netflix'],
      duplicateOf: 'netflix'
    },
    {
      id: '6',
      name: 'Disney+',
      amount: 7.99,
      frequency: 'monthly',
      category: 'Entertainment',
      icon: '🏰',
      status: 'active',
      lastCharged: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      nextCharge: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
      provider: 'Disney',
      riskLevel: 'medium',
      suggestions: ['Bundle option available', 'Low usage detected']
    }
  ];

  const auditInsights: AuditInsight[] = [
    {
      id: '1',
      type: 'duplicate',
      title: 'Overlapping Streaming Services',
      description: 'Netflix and Hulu have 70% content overlap. You could save by choosing one.',
      potential_savings: 12.99,
      subscriptions: ['netflix', 'hulu'],
      confidence: 87,
      action: 'Choose one service'
    },
    {
      id: '2',
      type: 'price_increase',
      title: 'Amazon Prime Price Increase',
      description: 'Amazon Prime increased by $2/month. Consider switching to yearly plan to save.',
      potential_savings: 40,
      subscriptions: ['amazon-prime'],
      confidence: 100,
      action: 'Switch to yearly plan'
    },
    {
      id: '3',
      type: 'unused',
      title: 'Low Usage Detected',
      description: 'Adobe Creative Cloud shows minimal usage. Consider pausing or cancelling.',
      potential_savings: 52.99,
      subscriptions: ['adobe'],
      confidence: 78,
      action: 'Pause subscription'
    },
    {
      id: '4',
      type: 'optimization',
      title: 'Bundle Opportunity',
      description: 'Disney+ and Hulu bundle saves $5.99/month compared to separate subscriptions.',
      potential_savings: 5.99,
      subscriptions: ['disney', 'hulu'],
      confidence: 95,
      action: 'Switch to bundle'
    }
  ];

  const totalMonthlySpend = subscriptions
    .filter(sub => sub.status === 'active')
    .reduce((total, sub) => {
      const monthlyAmount = sub.frequency === 'yearly' ? sub.amount / 12 : 
                           sub.frequency === 'quarterly' ? sub.amount / 3 : sub.amount;
      return total + monthlyAmount;
    }, 0);

  const totalPotentialSavings = auditInsights.reduce((total, insight) => 
    total + insight.potential_savings, 0);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'duplicate': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'price_increase': return <TrendingUp className="w-5 h-5 text-red-500" />;
      case 'unused': return <Eye className="w-5 h-5 text-gray-500" />;
      case 'optimization': return <Zap className="w-5 h-5 text-blue-500" />;
      case 'cancellation': return <X className="w-5 h-5 text-red-500" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'duplicate': return 'bg-amber-50 border-amber-200';
      case 'price_increase': return 'bg-red-50 border-red-200';
      case 'unused': return 'bg-gray-50 border-gray-200';
      case 'optimization': return 'bg-blue-50 border-blue-200';
      case 'cancellation': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-amber-600 bg-amber-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const toggleSubscriptionSelection = (id: string) => {
    setSelectedSubscriptions(prev => 
      prev.includes(id) 
        ? prev.filter(subId => subId !== id)
        : [...prev, id]
    );
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Subscription Audit</h1>
                <p className="text-sm text-muted-foreground">AI-powered optimization</p>
              </div>
            </div>
          </div>
          <Badge variant="secondary">
            {subscriptions.filter(s => s.status === 'active').length} active
          </Badge>
        </div>
      </div>

      <div className="p-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                ${totalMonthlySpend.toFixed(2)}
              </div>
              <p className="text-sm text-muted-foreground">Monthly Spend</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                ${totalPotentialSavings.toFixed(2)}
              </div>
              <p className="text-sm text-muted-foreground">Potential Savings</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="subscriptions">All Subs</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">AI-Powered Insights</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Smart recommendations to optimize your subscriptions
              </p>
            </div>

            <div className="space-y-3">
              {auditInsights.map((insight) => (
                <Card key={insight.id} className={getInsightColor(insight.type)}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        {getInsightIcon(insight.type)}
                        <div className="flex-1">
                          <h4 className="font-medium">{insight.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {insight.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          ${insight.potential_savings.toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">savings</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Confidence:</span>
                        <div className="flex items-center gap-1">
                          <Progress value={insight.confidence} className="w-16 h-2" />
                          <span className="text-xs font-medium">{insight.confidence}%</span>
                        </div>
                      </div>
                      <Button size="sm">
                        {insight.action}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* All Subscriptions Tab */}
          <TabsContent value="subscriptions" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">All Subscriptions</h3>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Manage
              </Button>
            </div>

            <div className="space-y-3">
              {subscriptions.map((subscription) => (
                <Card key={subscription.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{subscription.icon}</div>
                        <div>
                          <h4 className="font-medium">{subscription.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>${subscription.amount}/{subscription.frequency}</span>
                            <span>•</span>
                            <span>{subscription.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getRiskColor(subscription.riskLevel)}>
                          {subscription.riskLevel} risk
                        </Badge>
                        {subscription.priceChange && (
                          <div className="text-xs text-red-600 mt-1">
                            Price increased
                          </div>
                        )}
                      </div>
                    </div>

                    {subscription.suggestions.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-muted-foreground mb-2">AI Suggestions:</p>
                        <div className="flex flex-wrap gap-1">
                          {subscription.suggestions.map((suggestion, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {suggestion}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Quick Actions Tab */}
          <TabsContent value="actions" className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Quick Actions</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Apply AI recommendations with one tap
              </p>
            </div>

            <div className="space-y-3">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-green-800">Optimize All</h4>
                      <p className="text-sm text-green-700">
                        Apply all AI recommendations automatically
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        ${totalPotentialSavings.toFixed(2)}
                      </div>
                      <div className="text-xs text-green-700">total savings</div>
                    </div>
                  </div>
                  <Button className="w-full">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Apply All Recommendations
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Individual Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <X className="w-4 h-4 mr-2" />
                      Cancel Adobe Creative Cloud (-$52.99/mo)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Zap className="w-4 h-4 mr-2" />
                      Switch to Disney+ Bundle (-$5.99/mo)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Switch Amazon Prime to Yearly (-$40/year)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Review Netflix vs Hulu overlap
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Alert>
                <Brain className="w-4 h-4" />
                <AlertDescription>
                  <strong>AI Notice:</strong> All recommendations are based on your usage patterns 
                  and spending behavior. You can always reverse changes if needed.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}