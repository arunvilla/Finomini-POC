import { useState } from 'react';
import { ArrowLeft, PiggyBank, Brain, DollarSign, TrendingUp, Calendar, Target, Zap, Settings, CheckCircle2, Play, Pause, Eye, BarChart3, Lightbulb, Coins, TrendingDown, Clock, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface AISmartSavingsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface SavingsRule {
  id: string;
  name: string;
  description: string;
  type: 'round_up' | 'income_based' | 'spending_based' | 'goal_based' | 'ai_automatic' | 'cashback' | 'subscription';
  isActive: boolean;
  currentAmount: number;
  projectedMonthly: number;
  confidence: number;
  potentialSavings: number;
  impact: string;
}

interface SavingsOpportunity {
  id: string;
  title: string;
  description: string;
  type: 'spending_reduction' | 'cashback_optimization' | 'account_switching' | 'subscription_audit';
  potentialSavings: number;
  timeframe: string;
  confidence: number;
  effort: 'low' | 'medium' | 'high';
  status: 'new' | 'in_progress' | 'completed';
}

interface AutoSaveRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  isEnabled: boolean;
  frequency: string;
  lastTriggered?: Date;
  totalSaved: number;
}

export default function AISmartSavingsScreen({ onBack, onNavigate }: AISmartSavingsScreenProps) {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [isSmartSavingsEnabled, setIsSmartSavingsEnabled] = useState(true);
  const [aggressivenessLevel, setAggressivenessLevel] = useState([7]);
  const [selectedGoal, setSelectedGoal] = useState<string>('emergency');

  // Enhanced Savings Opportunities
  const savingsOpportunities: SavingsOpportunity[] = [
    {
      id: '1',
      title: 'High-Yield Savings Account',
      description: 'Switch to Marcus by Goldman Sachs - earn 4.5% APY vs your current 0.1%',
      type: 'account_switching',
      potentialSavings: 1260,
      timeframe: 'per year',
      confidence: 95,
      effort: 'low',
      status: 'new'
    },
    {
      id: '2',
      title: 'Coffee Shop Optimization',
      description: 'You spend $127/month on coffee. Making coffee at home 3 days/week saves $65/month',
      type: 'spending_reduction',
      potentialSavings: 780,
      timeframe: 'per year',
      confidence: 88,
      effort: 'medium',
      status: 'new'
    },
    {
      id: '3',
      title: 'Cashback Credit Card',
      description: 'Using Chase Freedom Unlimited for groceries could earn you 3% back vs 1%',
      type: 'cashback_optimization',
      potentialSavings: 240,
      timeframe: 'per year',
      confidence: 92,
      effort: 'low',
      status: 'in_progress'
    },
    {
      id: '4',
      title: 'Streaming Service Audit',
      description: 'Cancel Netflix Premium and use Standard plan, plus remove Hulu (unused for 90 days)',
      type: 'subscription_audit',
      potentialSavings: 156,
      timeframe: 'per year',
      confidence: 90,
      effort: 'low',
      status: 'new'
    }
  ];

  // Smart Auto-Save Rules
  const autoSaveRules: AutoSaveRule[] = [
    {
      id: '1',
      name: 'Spare Change Round-Up',
      trigger: 'Every purchase',
      action: 'Round up to nearest dollar',
      isEnabled: true,
      frequency: 'Real-time',
      lastTriggered: new Date(Date.now() - 2 * 60 * 60 * 1000),
      totalSaved: 47.23
    },
    {
      id: '2',
      name: 'Payday Surplus',
      trigger: 'Income > $3,000',
      action: 'Save 10% of excess',
      isEnabled: true,
      frequency: 'Bi-weekly',
      lastTriggered: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      totalSaved: 125.00
    },
    {
      id: '3',
      name: 'Spending Under Budget',
      trigger: 'Monthly budget surplus',
      action: 'Save 50% of leftover',
      isEnabled: false,
      frequency: 'Monthly',
      totalSaved: 89.50
    },
    {
      id: '4',
      name: 'Tax Refund Boost',
      trigger: 'Tax refund received',
      action: 'Save 80% automatically',
      isEnabled: true,
      frequency: 'Annual',
      totalSaved: 1200.00
    }
  ];

  const totalPotentialSavings = savingsOpportunities.reduce((sum, opp) => sum + opp.potentialSavings, 0);
  const totalAutoSaved = autoSaveRules.reduce((sum, rule) => sum + rule.totalSaved, 0);

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'spending_reduction': return <TrendingDown className="w-4 h-4" />;
      case 'cashback_optimization': return <Coins className="w-4 h-4" />;
      case 'account_switching': return <Target className="w-4 h-4" />;
      case 'subscription_audit': return <Eye className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
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
              <h1 className="text-lg font-semibold">AI Smart Savings</h1>
              <p className="text-sm text-muted-foreground">Personalized savings optimization</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <PiggyBank className="w-3 h-3 mr-1" />
            ${totalAutoSaved.toFixed(2)} saved
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Savings Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-4">
            {/* Summary Card */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">AI Analysis Complete</span>
                  </div>
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-green-800">${totalPotentialSavings.toLocaleString()}</div>
                    <div className="text-sm text-green-600">Potential annual savings</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-800">{savingsOpportunities.filter(o => o.effort === 'low').length}</div>
                    <div className="text-sm text-green-600">Low-effort opportunities</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Savings Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Personalized Opportunities
                </CardTitle>
                <CardDescription>AI-identified ways to optimize your savings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {savingsOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                          {getTypeIcon(opportunity.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{opportunity.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{opportunity.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant={opportunity.status === 'new' ? 'default' : opportunity.status === 'in_progress' ? 'secondary' : 'outline'}>
                              {opportunity.status.replace('_', ' ')}
                            </Badge>
                            <Badge variant="outline" className={getEffortColor(opportunity.effort)}>
                              {opportunity.effort} effort
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          ${opportunity.potentialSavings.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">{opportunity.timeframe}</div>
                        <div className="text-xs text-muted-foreground">{opportunity.confidence}% confidence</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        variant={opportunity.status === 'completed' ? 'outline' : 'default'}
                      >
                        {opportunity.status === 'new' ? 'Get Started' : 
                         opportunity.status === 'in_progress' ? 'Continue' : 'View Details'}
                      </Button>
                      <Button size="sm" variant="outline">
                        Learn More
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Win Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-500" />
                  Quick Wins (5 min or less)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Enable round-up savings</span>
                    <span className="text-sm text-green-600">+$15/month</span>
                  </div>
                  <Button size="sm" className="w-full">Enable Now</Button>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Switch to high-yield savings</span>
                    <span className="text-sm text-green-600">+$105/month</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">Compare Rates</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Automation Tab */}
          <TabsContent value="automation" className="space-y-4">
            {/* Auto-Save Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  Smart Auto-Save Rules
                </CardTitle>
                <CardDescription>AI-powered automatic savings based on your behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="text-lg font-semibold text-blue-800">${totalAutoSaved.toFixed(2)}</div>
                    <div className="text-sm text-blue-600">Total auto-saved</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-blue-800">{autoSaveRules.filter(r => r.isEnabled).length}</div>
                    <div className="text-sm text-blue-600">Active rules</div>
                  </div>
                </div>

                {autoSaveRules.map((rule) => (
                  <div key={rule.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium">{rule.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{rule.trigger} → {rule.action}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="text-muted-foreground">Frequency: {rule.frequency}</span>
                          <span className="text-green-600 font-medium">Saved: ${rule.totalSaved.toFixed(2)}</span>
                          {rule.lastTriggered && (
                            <span className="text-muted-foreground">
                              Last: {rule.lastTriggered.toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <Switch checked={rule.isEnabled} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Savings Goals Integration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-500" />
                  Goal-Based Auto-Savings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Emergency Fund</span>
                    <span className="text-sm text-blue-600">Auto-save enabled</span>
                  </div>
                  <Progress value={65} className="h-2 mb-2" />
                  <div className="text-sm text-muted-foreground">$1,950 of $3,000 goal • +$125/month</div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Vacation Fund</span>
                    <span className="text-sm text-gray-600">Auto-save disabled</span>
                  </div>
                  <Progress value={25} className="h-2 mb-2" />
                  <div className="text-sm text-muted-foreground">$500 of $2,000 goal</div>
                  <Button size="sm" variant="outline" className="w-full mt-2">Enable Auto-Save</Button>
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
                  Smart Savings Settings
                </CardTitle>
                <CardDescription>Customize how AI optimizes your savings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Smart Savings Engine</h4>
                    <p className="text-sm text-muted-foreground">AI-powered savings optimization</p>
                  </div>
                  <Switch checked={isSmartSavingsEnabled} onCheckedChange={setIsSmartSavingsEnabled} />
                </div>

                <div className="space-y-3">
                  <Label>Aggressiveness Level: {aggressivenessLevel[0]}/10</Label>
                  <Slider
                    value={aggressivenessLevel}
                    onValueChange={setAggressivenessLevel}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Conservative</span>
                    <span>Aggressive</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Primary Savings Goal</Label>
                  <Select value={selectedGoal} onValueChange={setSelectedGoal}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emergency">Emergency Fund</SelectItem>
                      <SelectItem value="vacation">Vacation</SelectItem>
                      <SelectItem value="retirement">Retirement</SelectItem>
                      <SelectItem value="house">House Down Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Notification Preferences</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Savings opportunities</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto-save confirmations</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Goal progress updates</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Button className="w-full" onClick={() => onNavigate('goals')}>
                  <Target className="w-4 h-4 mr-2" />
                  Manage Savings Goals
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}