import { useState } from 'react';
import { ArrowLeft, Brain, TrendingUp, TrendingDown, Target, Zap, BarChart3, ArrowUpDown, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface AIBudgetOptimizerScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface BudgetOptimization {
  id: string;
  category: string;
  currentBudget: number;
  suggestedBudget: number;
  actualSpending: number;
  variance: number;
  confidence: number;
  reasoning: string;
  impact: 'positive' | 'neutral' | 'negative';
}

interface CategoryReallocation {
  from: string;
  to: string;
  amount: number;
  reason: string;
  impact: string;
}

export default function AIBudgetOptimizerScreen({ onBack, onNavigate }: AIBudgetOptimizerScreenProps) {
  const [activeTab, setActiveTab] = useState('optimizations');
  
  const budgetOptimizations: BudgetOptimization[] = [
    {
      id: '1',
      category: 'Dining Out',
      currentBudget: 400,
      suggestedBudget: 320,
      actualSpending: 285,
      variance: -28.75,
      confidence: 92,
      reasoning: 'Your actual spending is consistently 25% below budget. AI suggests reallocating excess to savings.',
      impact: 'positive'
    },
    {
      id: '2',
      category: 'Groceries',
      currentBudget: 350,
      suggestedBudget: 380,
      actualSpending: 395,
      variance: 12.86,
      confidence: 87,
      reasoning: 'Recent spending trends show consistent overages. Small increase recommended to reduce stress.',
      impact: 'neutral'
    },
    {
      id: '3',
      category: 'Transportation',
      currentBudget: 200,
      suggestedBudget: 150,
      actualSpending: 145,
      variance: -27.5,
      confidence: 78,
      reasoning: 'Remote work has reduced commuting costs. Budget can be safely reduced.',
      impact: 'positive'
    },
    {
      id: '4',
      category: 'Entertainment',
      currentBudget: 150,
      suggestedBudget: 200,
      actualSpending: 180,
      variance: 20,
      confidence: 65,
      reasoning: 'Social activities have increased. Consider moderate budget increase for better balance.',
      impact: 'neutral'
    }
  ];

  const reallocations: CategoryReallocation[] = [
    {
      from: 'Dining Out',
      to: 'Emergency Fund',
      amount: 80,
      reason: 'Consistent underspending in dining category',
      impact: 'Boost emergency fund by 8 months'
    },
    {
      from: 'Transportation',
      to: 'Vacation Savings',
      amount: 50,
      reason: 'Reduced commuting expenses',
      impact: 'Accelerate vacation goal by 3 months'
    },
    {
      from: 'Miscellaneous',
      to: 'Investment Account',
      amount: 100,
      reason: 'Optimize long-term wealth building',
      impact: 'Increase retirement savings by 12%'
    }
  ];

  const totalOptimizationSavings = budgetOptimizations
    .filter(opt => opt.variance < 0)
    .reduce((total, opt) => total + Math.abs(opt.variance), 0);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return 'text-red-600';
    if (variance < -15) return 'text-green-600';
    return 'text-amber-600';
  };

  const applyOptimization = (optimizationId: string) => {
    console.log('Applying optimization:', optimizationId);
  };

  const applyAllOptimizations = () => {
    console.log('Applying all optimizations');
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
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Budget Optimizer</h1>
                <p className="text-sm text-muted-foreground">AI-powered budget improvements</p>
              </div>
            </div>
          </div>
          <Badge variant="secondary">
            ${totalOptimizationSavings.toFixed(0)} savings found
          </Badge>
        </div>
      </div>

      <div className="p-4">
        {/* Summary Card */}
        <Card className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-800">AI Analysis Complete</span>
              </div>
              <Badge className="bg-purple-600">High Confidence</Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  ${totalOptimizationSavings.toFixed(0)}
                </div>
                <p className="text-sm text-purple-700">Monthly Savings</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {budgetOptimizations.length}
                </div>
                <p className="text-sm text-purple-700">Categories</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(budgetOptimizations.reduce((sum, opt) => sum + opt.confidence, 0) / budgetOptimizations.length)}%
                </div>
                <p className="text-sm text-purple-700">Avg Confidence</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="optimizations">Optimize</TabsTrigger>
            <TabsTrigger value="reallocate">Reallocate</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>

          {/* Budget Optimizations Tab */}
          <TabsContent value="optimizations" className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">AI Budget Recommendations</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your spending patterns over the last 6 months
              </p>
            </div>

            <div className="space-y-4">
              {budgetOptimizations.map((optimization) => (
                <Card key={optimization.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{optimization.category}</h4>
                          <Badge className={getImpactColor(optimization.impact)}>
                            {optimization.impact}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {optimization.reasoning}
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-xs text-muted-foreground">Confidence</div>
                        <div className="font-medium">{optimization.confidence}%</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Current Budget:</span>
                        <p className="font-medium">${optimization.currentBudget}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Suggested:</span>
                        <p className="font-medium">${optimization.suggestedBudget}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Avg Spending:</span>
                        <p className="font-medium">${optimization.actualSpending}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {optimization.variance < 0 ? (
                          <TrendingDown className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingUp className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`font-medium ${getVarianceColor(optimization.variance)}`}>
                          {optimization.variance > 0 ? '+' : ''}${optimization.variance.toFixed(0)} change
                        </span>
                      </div>
                      <Button size="sm" onClick={() => applyOptimization(optimization.id)}>
                        Apply Change
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reallocation Tab */}
          <TabsContent value="reallocate" className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Smart Reallocation</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Move money from underused categories to boost your goals
              </p>
            </div>

            <div className="space-y-4">
              {reallocations.map((reallocation, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <div className="text-sm font-medium">{reallocation.from}</div>
                          <ArrowUpDown className="w-4 h-4 text-muted-foreground mx-auto my-1" />
                          <div className="text-sm font-medium">{reallocation.to}</div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-1">
                            {reallocation.reason}
                          </p>
                          <p className="text-sm font-medium text-blue-600">
                            {reallocation.impact}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          ${reallocation.amount}
                        </div>
                        <div className="text-xs text-muted-foreground">per month</div>
                      </div>
                    </div>
                    
                    <Button size="sm" className="w-full">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Apply Reallocation
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Summary Tab */}
          <TabsContent value="summary" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  Optimization Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      ${totalOptimizationSavings + reallocations.reduce((sum, r) => sum + r.amount, 0)}
                    </div>
                    <p className="text-sm text-green-700">Total Monthly Impact</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {budgetOptimizations.length + reallocations.length}
                    </div>
                    <p className="text-sm text-blue-700">Total Changes</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Key Benefits:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Reduce budget stress in overspent categories</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Accelerate financial goals by 3-8 months</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Optimize spending based on actual patterns</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Increase savings rate without lifestyle changes</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full" onClick={applyAllOptimizations}>
                  <Zap className="w-4 h-4 mr-2" />
                  Apply All Optimizations
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800 mb-2">Important Notes</h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• All changes can be reversed if they don't work for you</li>
                      <li>• AI will continue learning and adjusting recommendations</li>
                      <li>• Review optimizations monthly for best results</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}