import React, { useState, useEffect } from 'react';
import { ArrowLeft, TrendingDown, DollarSign, AlertTriangle, CheckCircle2, Zap, Calendar, CreditCard, Target, Sparkles, BarChart3, PieChart, Clock, Star, Award, Shield, Lightbulb, RefreshCw, Eye, Search, Filter, ChevronRight, ChevronDown, Percent, Package, Users, Crown, Gift, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { toast } from 'sonner@2.0.3';

interface AISubscriptionOptimizerScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface OptimizationInsight {
  id: string;
  type: 'duplicate' | 'unused' | 'alternative' | 'billing' | 'bundle' | 'seasonal';
  title: string;
  description: string;
  savings: number;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  subscription: {
    name: string;
    currentCost: number;
    icon: string;
    color: string;
  };
  recommendation: {
    action: string;
    newCost?: number;
    provider?: string;
    details: string;
  };
  implementation: {
    difficulty: 'easy' | 'medium' | 'hard';
    timeRequired: string;
    steps: string[];
  };
}

interface SubscriptionAnalysis {
  totalMonthlySpend: number;
  totalAnnualSpend: number;
  potentialMonthlySavings: number;
  potentialAnnualSavings: number;
  unusedSubscriptions: number;
  duplicateServices: number;
  optimizationScore: number;
  categories: {
    name: string;
    spend: number;
    count: number;
    savings: number;
  }[];
}

export default function AISubscriptionOptimizerScreen({ onBack, onNavigate }: AISubscriptionOptimizerScreenProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [autoOptimize, setAutoOptimize] = useState(false);
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

  // Mock data - in real app would come from API
  const [subscriptionAnalysis] = useState<SubscriptionAnalysis>({
    totalMonthlySpend: 247.86,
    totalAnnualSpend: 2974.32,
    potentialMonthlySavings: 73.24,
    potentialAnnualSavings: 878.88,
    unusedSubscriptions: 4,
    duplicateServices: 2,
    optimizationScore: 73,
    categories: [
      { name: 'Entertainment', spend: 89.97, count: 5, savings: 24.98 },
      { name: 'Productivity', spend: 67.94, count: 4, savings: 23.47 },
      { name: 'Cloud Storage', spend: 39.98, count: 3, savings: 15.99 },
      { name: 'News & Media', spend: 29.97, count: 2, savings: 8.80 },
      { name: 'Fitness', spend: 19.99, count: 1, savings: 0 }
    ]
  });

  const [optimizationInsights] = useState<OptimizationInsight[]>([
    {
      id: '1',
      type: 'duplicate',
      title: 'Duplicate Cloud Storage Services',
      description: 'You have both Dropbox and Google Drive paid plans with similar storage amounts.',
      savings: 15.99,
      confidence: 95,
      priority: 'high',
      subscription: {
        name: 'Dropbox Plus',
        currentCost: 15.99,
        icon: '📦',
        color: 'bg-blue-500'
      },
      recommendation: {
        action: 'Cancel Dropbox, use Google Drive only',
        newCost: 0,
        provider: 'Google Drive',
        details: 'Consolidate to Google Drive which offers 2TB for $9.99/month vs Dropbox at $15.99/month'
      },
      implementation: {
        difficulty: 'easy',
        timeRequired: '10 minutes',
        steps: [
          'Transfer files from Dropbox to Google Drive',
          'Update shared folder links',
          'Cancel Dropbox subscription'
        ]
      }
    },
    {
      id: '2',
      type: 'billing',
      title: 'Switch to Annual Billing',
      description: 'Save 20% on Adobe Creative Cloud by switching from monthly to annual billing.',
      savings: 23.98,
      confidence: 100,
      priority: 'high',
      subscription: {
        name: 'Adobe Creative Cloud',
        currentCost: 52.99,
        icon: '🎨',
        color: 'bg-red-500'
      },
      recommendation: {
        action: 'Switch to annual billing',
        newCost: 41.59,
        provider: 'Adobe',
        details: 'Annual plan costs $499.88/year vs $635.88 for monthly billing'
      },
      implementation: {
        difficulty: 'easy',
        timeRequired: '5 minutes',
        steps: [
          'Log into Adobe account',
          'Navigate to billing settings',
          'Switch to annual plan'
        ]
      }
    },
    {
      id: '3',
      type: 'unused',
      title: 'Unused Fitness Subscription',
      description: 'MyFitnessPal Premium hasn\'t been used in the last 3 months.',
      savings: 19.99,
      confidence: 85,
      priority: 'medium',
      subscription: {
        name: 'MyFitnessPal Premium',
        currentCost: 19.99,
        icon: '💪',
        color: 'bg-green-500'
      },
      recommendation: {
        action: 'Cancel subscription',
        newCost: 0,
        details: 'Consider using free version or alternative free fitness apps'
      },
      implementation: {
        difficulty: 'easy',
        timeRequired: '3 minutes',
        steps: [
          'Open MyFitnessPal app',
          'Go to account settings',
          'Cancel premium subscription'
        ]
      }
    },
    {
      id: '4',
      type: 'alternative',
      title: 'Cheaper Music Streaming Option',
      description: 'Spotify Family plan costs more than Apple One family bundle with more features.',
      savings: 7.95,
      confidence: 80,
      priority: 'medium',
      subscription: {
        name: 'Spotify Family',
        currentCost: 15.99,
        icon: '🎵',
        color: 'bg-green-500'
      },
      recommendation: {
        action: 'Switch to Apple One Family',
        newCost: 22.95,
        provider: 'Apple',
        details: 'Get music, TV+, iCloud+, and Arcade for just $6.96 more total vs current separate costs'
      },
      implementation: {
        difficulty: 'medium',
        timeRequired: '15 minutes',
        steps: [
          'Export Spotify playlists',
          'Subscribe to Apple One Family',
          'Import playlists to Apple Music',
          'Cancel Spotify subscription'
        ]
      }
    },
    {
      id: '5',
      type: 'bundle',
      title: 'Disney Bundle Opportunity',
      description: 'Combine Disney+, Hulu, and ESPN+ for significant savings.',
      savings: 13.47,
      confidence: 90,
      priority: 'high',
      subscription: {
        name: 'Individual Streaming Services',
        currentCost: 32.97,
        icon: '📺',
        color: 'bg-purple-500'
      },
      recommendation: {
        action: 'Switch to Disney Bundle',
        newCost: 19.99,
        provider: 'Disney',
        details: 'Get all three services for $19.99/month vs $32.97 separately'
      },
      implementation: {
        difficulty: 'easy',
        timeRequired: '8 minutes',
        steps: [
          'Sign up for Disney Bundle',
          'Link existing accounts if available',
          'Cancel individual subscriptions'
        ]
      }
    }
  ]);

  useEffect(() => {
    // Simulate AI analysis on component mount
    setIsAnalyzing(true);
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      toast.success('✨ Subscription optimization analysis complete!');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const runOptimization = async () => {
    setIsAnalyzing(true);
    // Simulate AI optimization process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
    toast.success('🎯 New optimization opportunities found!');
  };

  const implementRecommendation = async (insight: OptimizationInsight) => {
    toast.success(`🚀 Implementing ${insight.title}...`);
    // Would implement actual recommendation logic here
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'duplicate': return <Users className="w-5 h-5" />;
      case 'unused': return <Clock className="w-5 h-5" />;
      case 'alternative': return <RefreshCw className="w-5 h-5" />;
      case 'billing': return <Calendar className="w-5 h-5" />;
      case 'bundle': return <Package className="w-5 h-5" />;
      case 'seasonal': return <Gift className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  const filteredInsights = optimizationInsights.filter(insight => 
    selectedCategory === 'all' || insight.type === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fcf7] via-white to-[#eef8ee]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0b733c] to-[#18312d] text-white p-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="text-white hover:bg-white/20 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={runOptimization}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Zap className="w-4 h-4 mr-2" />
              )}
              {isAnalyzing ? 'Analyzing...' : 'Re-analyze'}
            </Button>
          </div>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-3xl flex items-center justify-center">
            <TrendingDown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">🎯 Subscription Optimizer</h1>
          <p className="text-white/80 text-sm">
            AI-powered analysis to reduce your subscription costs
          </p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {isAnalyzing ? (
          /* Analysis Loading State */
          <Card className="border-[#eef8ee] shadow-xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#0b733c] rounded-3xl flex items-center justify-center animate-pulse">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#18312d] mb-2">🔍 Analyzing Subscriptions</h3>
                <p className="text-sm text-[#788c78] mb-4">
                  AI is examining your subscriptions for optimization opportunities...
                </p>
                <Progress value={66} className="w-full" />
                <p className="text-xs text-[#788c78] mt-2">Analyzing billing patterns and usage data</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Optimization Summary */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0b733c] to-[#18312d] flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  💰 Optimization Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-[#f7fcf7] to-[#eef8ee] p-4 rounded-2xl border border-[#c8e9c8]">
                    <div className="text-2xl font-bold text-[#0b733c]">
                      ${subscriptionAnalysis.potentialMonthlySavings.toFixed(2)}
                    </div>
                    <div className="text-sm text-[#788c78]">Monthly Savings</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#f7fcf7] to-[#eef8ee] p-4 rounded-2xl border border-[#c8e9c8]">
                    <div className="text-2xl font-bold text-[#0b733c]">
                      {subscriptionAnalysis.optimizationScore}%
                    </div>
                    <div className="text-sm text-[#788c78]">Optimization Score</div>
                  </div>
                </div>

                {/* Annual Savings Projection */}
                <div className="bg-gradient-to-r from-[#0b733c] to-[#18312d] p-4 rounded-2xl text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold">Annual Savings Potential</div>
                      <div className="text-3xl font-bold">${subscriptionAnalysis.potentialAnnualSavings.toFixed(2)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white/80 text-sm">Current Annual Spend</div>
                      <div className="text-xl font-semibold">${subscriptionAnalysis.totalAnnualSpend.toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-[#0056ac]">{subscriptionAnalysis.unusedSubscriptions}</div>
                    <div className="text-xs text-[#788c78]">Unused Services</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-[#904204]">{subscriptionAnalysis.duplicateServices}</div>
                    <div className="text-xs text-[#788c78]">Duplicate Services</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-[#0b733c]">{optimizationInsights.length}</div>
                    <div className="text-xs text-[#788c78]">Opportunities</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Controls */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="duplicate">Duplicates</SelectItem>
                        <SelectItem value="unused">Unused</SelectItem>
                        <SelectItem value="alternative">Alternatives</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="bundle">Bundles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={autoOptimize} 
                      onCheckedChange={setAutoOptimize}
                    />
                    <span className="text-sm text-[#788c78]">Auto-optimize</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Optimization Insights */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#18312d]">🎯 Optimization Opportunities</h2>
                <Badge className="bg-[#0b733c] text-white">
                  {filteredInsights.length} found
                </Badge>
              </div>

              {filteredInsights.map((insight) => (
                <Card key={insight.id} className="border-[#eef8ee] shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#f7fcf7] flex items-center justify-center border border-[#c8e9c8]">
                          {getTypeIcon(insight.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-[#18312d]">{insight.title}</h3>
                            <Badge className={`text-xs ${getPriorityColor(insight.priority)}`}>
                              {insight.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-[#788c78] mb-2">{insight.description}</p>
                          
                          {/* Subscription Info */}
                          <div className="flex items-center gap-2 mb-2">
                            <div className="text-lg">{insight.subscription.icon}</div>
                            <span className="text-sm font-medium text-[#18312d]">
                              {insight.subscription.name}
                            </span>
                            <span className="text-sm text-[#788c78]">
                              ${insight.subscription.currentCost}/month
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Savings */}
                      <div className="text-right">
                        <div className="text-lg font-bold text-[#0b733c]">
                          ${insight.savings.toFixed(2)}
                        </div>
                        <div className="text-xs text-[#788c78]">monthly savings</div>
                        <div className="text-xs text-[#0b733c]">
                          {insight.confidence}% confidence
                        </div>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className="bg-gradient-to-br from-[#f7fcf7] to-[#eef8ee] p-3 rounded-xl border border-[#c8e9c8] mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-[#0b733c]" />
                        <span className="font-medium text-[#18312d]">Recommendation</span>
                      </div>
                      <p className="text-sm text-[#788c78] mb-2">{insight.recommendation.action}</p>
                      {insight.recommendation.newCost !== undefined && (
                        <div className="text-sm text-[#0b733c]">
                          New cost: ${insight.recommendation.newCost}/month
                        </div>
                      )}
                      <p className="text-xs text-[#788c78] mt-1">{insight.recommendation.details}</p>
                    </div>

                    {/* Implementation Details */}
                    <div className="mb-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#0b733c] hover:bg-[#f7fcf7] p-0"
                        onClick={() => setExpandedInsight(
                          expandedInsight === insight.id ? null : insight.id
                        )}
                      >
                        {expandedInsight === insight.id ? (
                          <ChevronDown className="w-4 h-4 mr-1" />
                        ) : (
                          <ChevronRight className="w-4 h-4 mr-1" />
                        )}
                        Implementation Details
                      </Button>

                      {expandedInsight === insight.id && (
                        <div className="mt-3 pl-4 border-l-2 border-[#c8e9c8] space-y-2">
                          <div className="flex items-center gap-4 text-sm text-[#788c78]">
                            <span>⏱️ {insight.implementation.timeRequired}</span>
                            <span>📊 {insight.implementation.difficulty} difficulty</span>
                          </div>
                          
                          <div>
                            <div className="font-medium text-[#18312d] text-sm mb-1">Steps:</div>
                            <ol className="text-xs text-[#788c78] space-y-1">
                              {insight.implementation.steps.map((step, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="bg-[#0b733c] text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold mt-0.5">
                                    {index + 1}
                                  </span>
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-[#0b733c] hover:bg-[#0f9950] text-white"
                        onClick={() => implementRecommendation(insight)}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Implement
                      </Button>
                      <Button variant="outline" className="border-[#c8e9c8] hover:bg-[#f7fcf7]">
                        <Eye className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Category Breakdown */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8c4a86] to-[#af75aa] flex items-center justify-center">
                    <PieChart className="w-5 h-5 text-white" />
                  </div>
                  📊 Category Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {subscriptionAnalysis.categories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#18312d]">{category.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {category.count} services
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-[#18312d]">
                          ${category.spend.toFixed(2)}/month
                        </div>
                        {category.savings > 0 && (
                          <div className="text-sm text-[#0b733c]">
                            Save ${category.savings.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                    <Progress 
                      value={(category.spend / subscriptionAnalysis.totalMonthlySpend) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#f06e06] to-[#904204] flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  ⚡ Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[#c8e9c8] hover:bg-[#f7fcf7]"
                  onClick={() => onNavigate('ai-subscription-audit')}
                >
                  <Search className="w-4 h-4 mr-3" />
                  Run Full Subscription Audit
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[#c8e9c8] hover:bg-[#f7fcf7]"
                  onClick={() => toast.success('Setting up automation...')}
                >
                  <Bell className="w-4 h-4 mr-3" />
                  Set Optimization Alerts
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[#c8e9c8] hover:bg-[#f7fcf7]"
                  onClick={() => toast.success('Exporting report...')}
                >
                  <BarChart3 className="w-4 h-4 mr-3" />
                  Export Optimization Report
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}