import { useState } from 'react';
import { ArrowLeft, CreditCard, Brain, DollarSign, TrendingDown, Calculator, Target, AlertTriangle, CheckCircle2, Zap, Calendar, BarChart3, PieChart, Clock, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface AIDebtManagementScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface DebtAccount {
  id: string;
  name: string;
  type: 'credit_card' | 'student_loan' | 'auto_loan' | 'personal_loan' | 'mortgage';
  balance: number;
  interestRate: number;
  minimumPayment: number;
  dueDate: Date;
  priority: number;
  payoffMonths: number;
  totalInterest: number;
}

interface PayoffStrategy {
  id: string;
  name: string;
  description: string;
  type: 'avalanche' | 'snowball' | 'hybrid' | 'ai_optimized';
  totalInterestSaved: number;
  timeToPayoff: number;
  monthlyPayment: number;
  confidence: number;
  steps: PayoffStep[];
}

interface PayoffStep {
  month: number;
  account: string;
  payment: number;
  remainingBalance: number;
  action: string;
}

interface DebtInsight {
  id: string;
  title: string;
  description: string;
  type: 'opportunity' | 'warning' | 'optimization' | 'refinance';
  impact: string;
  potentialSavings: number;
  urgency: 'high' | 'medium' | 'low';
  confidence: number;
}

export default function AIDebtManagementScreen({ onBack, onNavigate }: AIDebtManagementScreenProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStrategy, setSelectedStrategy] = useState('ai_optimized');
  const [extraPayment, setExtraPayment] = useState(200);

  // Debt Accounts
  const debtAccounts: DebtAccount[] = [
    {
      id: '1',
      name: 'Chase Sapphire Credit Card',
      type: 'credit_card',
      balance: 8420,
      interestRate: 24.99,
      minimumPayment: 210,
      dueDate: new Date(2025, 2, 15),
      priority: 1,
      payoffMonths: 18,
      totalInterest: 2180
    },
    {
      id: '2',
      name: 'Capital One Venture Card',
      type: 'credit_card',
      balance: 3250,
      interestRate: 19.99,
      minimumPayment: 85,
      dueDate: new Date(2025, 2, 22),
      priority: 2,
      payoffMonths: 24,
      totalInterest: 890
    },
    {
      id: '3',
      name: 'Federal Student Loan',
      type: 'student_loan',
      balance: 15600,
      interestRate: 6.8,
      minimumPayment: 165,
      dueDate: new Date(2025, 2, 28),
      priority: 3,
      payoffMonths: 120,
      totalInterest: 4200
    },
    {
      id: '4',
      name: 'Honda Civic Auto Loan',
      type: 'auto_loan',
      balance: 12890,
      interestRate: 4.2,
      minimumPayment: 285,
      dueDate: new Date(2025, 2, 12),
      priority: 4,
      payoffMonths: 48,
      totalInterest: 1650
    }
  ];

  // Payoff Strategies
  const payoffStrategies: PayoffStrategy[] = [
    {
      id: '1',
      name: 'AI-Optimized Strategy',
      description: 'Custom strategy balancing psychology and mathematics',
      type: 'ai_optimized',
      totalInterestSaved: 1850,
      timeToPayoff: 42,
      monthlyPayment: 945,
      confidence: 95,
      steps: [
        { month: 1, account: 'Chase Sapphire', payment: 410, remainingBalance: 8010, action: 'Focus extra payment' },
        { month: 6, account: 'Chase Sapphire', payment: 410, remainingBalance: 6200, action: 'Continue focus' },
        { month: 12, account: 'Chase Sapphire', payment: 0, remainingBalance: 0, action: 'Paid off - redirect to Capital One' }
      ]
    },
    {
      id: '2',
      name: 'Debt Avalanche',
      description: 'Pay highest interest rate first (mathematically optimal)',
      type: 'avalanche',
      totalInterestSaved: 2100,
      timeToPayoff: 45,
      monthlyPayment: 945,
      confidence: 100,
      steps: []
    },
    {
      id: '3',
      name: 'Debt Snowball',
      description: 'Pay smallest balance first (psychological wins)',
      type: 'snowball',
      totalInterestSaved: 1200,
      timeToPayoff: 48,
      monthlyPayment: 945,
      confidence: 85,
      steps: []
    }
  ];

  // AI Debt Insights
  const debtInsights: DebtInsight[] = [
    {
      id: '1',
      title: 'Balance Transfer Opportunity',
      description: 'Transfer Chase Sapphire balance to 0% APR card for 18 months',
      type: 'refinance',
      impact: 'Save $1,680 in interest charges',
      potentialSavings: 1680,
      urgency: 'high',
      confidence: 92
    },
    {
      id: '2',
      title: 'Student Loan Refinancing',
      description: 'Refinance federal loan from 6.8% to 4.2% with private lender',
      type: 'refinance',
      impact: 'Save $2,340 over loan lifetime',
      potentialSavings: 2340,
      urgency: 'medium',
      confidence: 87
    },
    {
      id: '3',
      title: 'Payment Date Optimization',
      description: 'Align all due dates after payday to improve cash flow',
      type: 'optimization',
      impact: 'Reduce late payment risk and improve budgeting',
      potentialSavings: 0,
      urgency: 'low',
      confidence: 95
    },
    {
      id: '4',
      title: 'Emergency Fund Priority',
      description: 'Build $1,000 emergency fund before aggressive debt payoff',
      type: 'warning',
      impact: 'Prevent new debt from unexpected expenses',
      potentialSavings: 0,
      urgency: 'medium',
      confidence: 90
    }
  ];

  const totalDebt = debtAccounts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinimumPayments = debtAccounts.reduce((sum, debt) => sum + debt.minimumPayment, 0);
  const weightedInterestRate = debtAccounts.reduce((sum, debt) => 
    sum + (debt.interestRate * (debt.balance / totalDebt)), 0);

  const getDebtTypeIcon = (type: string) => {
    switch (type) {
      case 'credit_card': return <CreditCard className="w-4 h-4" />;
      case 'student_loan': return <Calculator className="w-4 h-4" />;
      case 'auto_loan': return <Target className="w-4 h-4" />;
      case 'personal_loan': return <DollarSign className="w-4 h-4" />;
      case 'mortgage': return <Target className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  const getDebtTypeColor = (type: string) => {
    switch (type) {
      case 'credit_card': return 'text-red-600 bg-red-50';
      case 'student_loan': return 'text-blue-600 bg-blue-50';
      case 'auto_loan': return 'text-green-600 bg-green-50';
      case 'personal_loan': return 'text-yellow-600 bg-yellow-50';
      case 'mortgage': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

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
      case 'opportunity': return <Star className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'optimization': return <Zap className="w-4 h-4" />;
      case 'refinance': return <TrendingDown className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
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
              <h1 className="text-lg font-semibold">AI Debt Management</h1>
              <p className="text-sm text-muted-foreground">Smart debt payoff optimization</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            <TrendingDown className="w-3 h-3 mr-1" />
            ${totalDebt.toLocaleString()} debt
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="strategy" className="text-xs">Strategy</TabsTrigger>
            <TabsTrigger value="insights" className="text-xs">Insights</TabsTrigger>
            <TabsTrigger value="calculator" className="text-xs">Calculator</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* Debt Summary */}
            <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-red-600" />
                    <span className="font-medium text-red-800">Total Debt Overview</span>
                  </div>
                  <Brain className="w-5 h-5 text-blue-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-red-800">
                      ${totalDebt.toLocaleString()}
                    </div>
                    <div className="text-sm text-red-600">Total Debt</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-800">
                      {weightedInterestRate.toFixed(1)}%
                    </div>
                    <div className="text-sm text-orange-600">Avg Interest Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Debt Accounts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-500" />
                  Debt Accounts
                </CardTitle>
                <CardDescription>Your current debt portfolio ranked by AI priority</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {debtAccounts
                  .sort((a, b) => a.priority - b.priority)
                  .map((debt) => (
                    <div key={debt.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${getDebtTypeColor(debt.type)}`}>
                            {getDebtTypeIcon(debt.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{debt.name}</h4>
                              <Badge variant="outline">Priority #{debt.priority}</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Balance: </span>
                                <span className="font-medium">${debt.balance.toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Rate: </span>
                                <span className="font-medium">{debt.interestRate}%</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Min Payment: </span>
                                <span className="font-medium">${debt.minimumPayment}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Due: </span>
                                <span className="font-medium">{debt.dueDate.toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Payoff Progress</span>
                          <span>{debt.payoffMonths} months at minimum</span>
                        </div>
                        <Progress value={(1 - debt.balance / (debt.balance + debt.totalInterest)) * 100} className="h-2" />
                        <div className="text-sm text-muted-foreground">
                          Total interest if minimum payments: ${debt.totalInterest.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Monthly Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Payment Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-blue-800">Total Minimum Payments</span>
                    <span className="text-lg font-bold text-blue-800">${totalMinimumPayments}</span>
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-green-800">Recommended Extra Payment</span>
                    <span className="text-lg font-bold text-green-800">$200</span>
                  </div>
                  <div className="text-sm text-green-600">Based on your budget analysis</div>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-purple-800">Total Monthly Payment</span>
                    <span className="text-lg font-bold text-purple-800">${totalMinimumPayments + 200}</span>
                  </div>
                  <div className="text-sm text-purple-600">Accelerated payoff plan</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Strategy Tab */}
          <TabsContent value="strategy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  AI Payoff Strategies
                </CardTitle>
                <CardDescription>Compare different debt elimination approaches</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {payoffStrategies.map((strategy) => (
                  <div 
                    key={strategy.id} 
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedStrategy === strategy.type ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedStrategy(strategy.type)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium">{strategy.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{strategy.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          ${strategy.totalInterestSaved.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Interest saved</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Time to debt freedom: </span>
                        <span className="font-medium">{strategy.timeToPayoff} months</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Monthly payment: </span>
                        <span className="font-medium">${strategy.monthlyPayment}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">AI confidence: </span>
                        <span className="font-medium">{strategy.confidence}%</span>
                      </div>
                    </div>

                    {selectedStrategy === strategy.type && strategy.steps.length > 0 && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm font-medium text-blue-800 mb-2">Payoff Timeline</div>
                        <div className="space-y-2">
                          {strategy.steps.map((step, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                              <span className="text-blue-700">Month {step.month}: {step.action}</span>
                              <span className="font-medium">${step.payment}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <Button className="w-full">
                  <Target className="w-4 h-4 mr-2" />
                  Start Selected Strategy
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  AI Debt Insights
                </CardTitle>
                <CardDescription>Personalized recommendations to optimize your debt payoff</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {debtInsights.map((insight) => (
                  <div key={insight.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                          {getTypeIcon(insight.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{insight.title}</h4>
                            <Badge variant="outline" className={getUrgencyColor(insight.urgency)}>
                              {insight.urgency} priority
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                          <p className="text-sm font-medium text-green-600">{insight.impact}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Confidence</div>
                        <div className="text-sm font-medium">{insight.confidence}%</div>
                        {insight.potentialSavings > 0 && (
                          <div className="text-sm text-green-600 font-medium">
                            ${insight.potentialSavings.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="w-full"
                      variant={insight.urgency === 'high' ? 'default' : 'outline'}
                    >
                      {insight.type === 'refinance' ? 'Explore Options' : 
                       insight.type === 'optimization' ? 'Optimize Now' : 'Learn More'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Debt Consolidation Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-green-500" />
                  Consolidation Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Personal Loan Consolidation</span>
                    <span className="text-sm text-green-600">12.9% APR</span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Combine all debts into single payment
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Monthly payment: $445</span>
                    <Button size="sm" variant="outline">Compare</Button>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Balance Transfer Card</span>
                    <span className="text-sm text-blue-600">0% APR 18mo</span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Transfer credit card balances only
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Save $1,680 in interest</span>
                    <Button size="sm" variant="outline">Apply</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-orange-500" />
                  Payoff Calculator
                </CardTitle>
                <CardDescription>See how extra payments accelerate your debt freedom</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <label className="text-sm font-medium">Extra Monthly Payment</label>
                  <Select value={extraPayment.toString()} onValueChange={(value) => setExtraPayment(Number(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">$0 (Minimum only)</SelectItem>
                      <SelectItem value="50">$50 extra</SelectItem>
                      <SelectItem value="100">$100 extra</SelectItem>
                      <SelectItem value="200">$200 extra</SelectItem>
                      <SelectItem value="300">$300 extra</SelectItem>
                      <SelectItem value="500">$500 extra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="text-sm text-red-600 mb-1">Minimum Payments</div>
                    <div className="text-lg font-bold text-red-800">67 months</div>
                    <div className="text-sm text-red-600">$8,920 interest</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-sm text-green-600 mb-1">With ${extraPayment} Extra</div>
                    <div className="text-lg font-bold text-green-800">
                      {extraPayment === 0 ? '67' : 
                       extraPayment === 50 ? '58' :
                       extraPayment === 100 ? '51' :
                       extraPayment === 200 ? '42' :
                       extraPayment === 300 ? '36' : '28'} months
                    </div>
                    <div className="text-sm text-green-600">
                      ${extraPayment === 0 ? '8,920' : 
                        extraPayment === 50 ? '7,680' :
                        extraPayment === 100 ? '6,590' :
                        extraPayment === 200 ? '5,070' :
                        extraPayment === 300 ? '4,120' : '2,850'} interest
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-blue-800">Interest Savings</span>
                    <span className="text-lg font-bold text-blue-800">
                      ${extraPayment === 0 ? '0' : 
                        extraPayment === 50 ? '1,240' :
                        extraPayment === 100 ? '2,330' :
                        extraPayment === 200 ? '3,850' :
                        extraPayment === 300 ? '4,800' : '6,070'}
                    </span>
                  </div>
                  <div className="text-sm text-blue-600">
                    Time saved: {extraPayment === 0 ? '0' : 
                      extraPayment === 50 ? '9' :
                      extraPayment === 100 ? '16' :
                      extraPayment === 200 ? '25' :
                      extraPayment === 300 ? '31' : '39'} months
                  </div>
                </div>

                <Button className="w-full">
                  <Target className="w-4 h-4 mr-2" />
                  Set Up Extra Payments
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}