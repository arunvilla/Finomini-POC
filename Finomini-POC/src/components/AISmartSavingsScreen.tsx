import React, { useState, useEffect } from 'react';
import { ArrowLeft, PiggyBank, Brain, DollarSign, TrendingUp, Calendar, Target, Zap, Settings, CheckCircle2, Play, Pause, BarChart3, LineChart, PieChart, Sparkles, RefreshCw, Download, Bell, Filter, ChevronRight, ChevronDown, ArrowUp, ArrowDown, Percent, Shield, Eye, Lightbulb, Award, Gift, Users, Package, Calculator, Coins, Wallet, TrendingDown, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { LineChart as RechartsLineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner@2.0.3';

interface AISmartSavingsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface SavingsRule {
  id: string;
  name: string;
  description: string;
  type: 'round_up' | 'income_based' | 'spending_based' | 'goal_based' | 'ai_automatic' | 'challenge_based';
  isActive: boolean;
  currentAmount: number;
  projectedMonthly: number;
  confidence: number;
  category: string;
  icon: string;
  color: string;
  monthlySavings: number[];
}

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  priority: 'high' | 'medium' | 'low';
  autoContribute: boolean;
  category: string;
  icon: string;
  color: string;
  monthlyContribution: number;
  projectedCompletion: Date;
}

interface SavingsOpportunity {
  id: string;
  title: string;
  description: string;
  category: string;
  potentialSavings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  timeframe: string;
  confidence: number;
  action: string;
  icon: string;
  type: 'spending_reduction' | 'income_optimization' | 'automated_transfer' | 'investment_switch';
}

interface SavingsInsight {
  id: string;
  type: 'achievement' | 'warning' | 'opportunity' | 'milestone';
  title: string;
  description: string;
  value?: number;
  trend?: 'up' | 'down' | 'stable';
  icon: string;
  color: string;
}

export default function AISmartSavingsScreen({ onBack, onNavigate }: AISmartSavingsScreenProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSmartSavingsEnabled, setIsSmartSavingsEnabled] = useState(true);
  const [aggressivenessLevel, setAggressivenessLevel] = useState(6);
  const [selectedGoal, setSelectedGoal] = useState('emergency');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1year');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [showConfidenceScore, setShowConfidenceScore] = useState(true);
  const [expandedRule, setExpandedRule] = useState<string | null>(null);

  // Enhanced mock data
  const savingsRules: SavingsRule[] = [
    {
      id: '1',
      name: 'Round-Up Transactions',
      description: 'Round up purchases to the nearest dollar and save the difference',
      type: 'round_up',
      isActive: true,
      currentAmount: 23.47,
      projectedMonthly: 47,
      confidence: 98,
      category: 'Automated',
      icon: '💰',
      color: '#0b733c',
      monthlySavings: [32, 28, 45, 52, 38, 47]
    },
    {
      id: '2',
      name: 'Income Surplus Detection',
      description: 'Save extra money when income exceeds typical spending patterns',
      type: 'income_based',
      isActive: true,
      currentAmount: 127.50,
      projectedMonthly: 180,
      confidence: 85,
      category: 'Smart Analysis',
      icon: '📈',
      color: '#0056ac',
      monthlySavings: [120, 145, 165, 210, 195, 180]
    },
    {
      id: '3',
      name: 'Budget Underspend Capture',
      description: 'Save when you spend less than budgeted in categories',
      type: 'spending_based',
      isActive: true,
      currentAmount: 89.30,
      projectedMonthly: 95,
      confidence: 78,
      category: 'Budget Optimization',
      icon: '🎯',
      color: '#f06e06',
      monthlySavings: [75, 85, 110, 95, 82, 95]
    },
    {
      id: '4',
      name: 'AI Automatic Savings',
      description: 'AI determines optimal amounts to save based on cash flow',
      type: 'ai_automatic',
      isActive: true,
      currentAmount: 89.23,
      projectedMonthly: 320,
      confidence: 92,
      category: 'AI Powered',
      icon: '🤖',
      color: '#8c4a86',
      monthlySavings: [280, 295, 340, 355, 310, 320]
    },
    {
      id: '5',
      name: '52-Week Challenge',
      description: 'Gradually increase weekly savings throughout the year',
      type: 'challenge_based',
      isActive: false,
      currentAmount: 0,
      projectedMonthly: 86,
      confidence: 95,
      category: 'Challenge',
      icon: '🏆',
      color: '#904204',
      monthlySavings: [22, 43, 64, 86, 108, 129]
    },
    {
      id: '6',
      name: 'Subscription Optimization',
      description: 'Save money redirected from optimized subscriptions',
      type: 'spending_based',
      isActive: true,
      currentAmount: 45.99,
      projectedMonthly: 67,
      confidence: 88,
      category: 'Optimization',
      icon: '📱',
      color: '#0b733c',
      monthlySavings: [25, 45, 67, 67, 67, 67]
    }
  ];

  const savingsGoals: SavingsGoal[] = [
    {
      id: 'emergency',
      name: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 3850,
      deadline: new Date(2024, 11, 31),
      priority: 'high',
      autoContribute: true,
      category: 'Safety Net',
      icon: '🛡️',
      color: '#0b733c',
      monthlyContribution: 642,
      projectedCompletion: new Date(2024, 9, 15)
    },
    {
      id: 'vacation',
      name: 'Dream Vacation',
      targetAmount: 5000,
      currentAmount: 2240,
      deadline: new Date(2024, 6, 15),
      priority: 'medium',
      autoContribute: true,
      category: 'Lifestyle',
      icon: '✈️',
      color: '#0056ac',
      monthlyContribution: 275,
      projectedCompletion: new Date(2024, 8, 20)
    },
    {
      id: 'house',
      name: 'House Down Payment',
      targetAmount: 50000,
      currentAmount: 15750,
      deadline: new Date(2025, 5, 1),
      priority: 'high',
      autoContribute: true,
      category: 'Major Purchase',
      icon: '🏠',
      color: '#f06e06',
      monthlyContribution: 1200,
      projectedCompletion: new Date(2025, 3, 10)
    },
    {
      id: 'car',
      name: 'New Car Fund',
      targetAmount: 25000,
      currentAmount: 5680,
      deadline: new Date(2025, 2, 1),
      priority: 'medium',
      autoContribute: false,
      category: 'Transportation',
      icon: '🚗',
      color: '#8c4a86',
      monthlyContribution: 450,
      projectedCompletion: new Date(2025, 8, 15)
    }
  ];

  const savingsOpportunities: SavingsOpportunity[] = [
    {
      id: '1',
      title: 'High-Yield Savings Account',
      description: 'Switch to a high-yield savings account earning 4.5% APY vs your current 0.5%',
      category: 'Account Optimization',
      potentialSavings: 156,
      difficulty: 'easy',
      timeframe: '15 minutes',
      confidence: 95,
      action: 'Switch Account',
      icon: '🏦',
      type: 'investment_switch'
    },
    {
      id: '2',
      title: 'Subscription Audit',
      description: 'Cancel 3 unused subscriptions detected by AI analysis',
      category: 'Spending Reduction',
      potentialSavings: 47,
      difficulty: 'easy',
      timeframe: '10 minutes',
      confidence: 88,
      action: 'Cancel Subscriptions',
      icon: '📱',
      type: 'spending_reduction'
    },
    {
      id: '3',
      title: 'Grocery Cashback Optimization',
      description: 'Use cashback credit card for groceries to earn 3% back',
      category: 'Income Optimization',
      potentialSavings: 28,
      difficulty: 'easy',
      timeframe: 'Ongoing',
      confidence: 92,
      action: 'Switch Payment Method',
      icon: '🛒',
      type: 'income_optimization'
    },
    {
      id: '4',
      title: 'Automated Micro-Investing',
      description: 'Set up automatic investing of spare change in index funds',
      category: 'Investment',
      potentialSavings: 240,
      difficulty: 'medium',
      timeframe: '30 minutes',
      confidence: 78,
      action: 'Setup Investment',
      icon: '📊',
      type: 'automated_transfer'
    }
  ];

  const savingsInsights: SavingsInsight[] = [
    {
      id: '1',
      type: 'achievement',
      title: 'Savings Milestone Reached!',
      description: 'You\'ve saved $500 this month - your highest ever!',
      value: 500,
      trend: 'up',
      icon: '🎉',
      color: '#0b733c'
    },
    {
      id: '2',
      type: 'opportunity',
      title: 'Spending Pattern Change',
      description: 'Your dining expenses decreased 15% - save the difference!',
      value: 73,
      trend: 'down',
      icon: '🍽️',
      color: '#0056ac'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Goal Behind Schedule',
      description: 'Your vacation fund needs $50 more monthly to meet deadline',
      value: 50,
      trend: 'down',
      icon: '⚠️',
      color: '#f06e06'
    },
    {
      id: '4',
      type: 'milestone',
      title: '6-Month Streak!',
      description: 'You\'ve consistently saved for 6 months straight',
      icon: '🔥',
      color: '#8c4a86'
    }
  ];

  // Chart data
  const savingsProgressData = [
    { month: 'Jan', amount: 245, target: 300, cumulative: 245 },
    { month: 'Feb', amount: 320, target: 300, cumulative: 565 },
    { month: 'Mar', amount: 280, target: 300, cumulative: 845 },
    { month: 'Apr', amount: 410, target: 350, cumulative: 1255 },
    { month: 'May', amount: 385, target: 350, cumulative: 1640 },
    { month: 'Jun', amount: 465, target: 400, cumulative: 2105 }
  ];

  const goalProgressData = savingsGoals.map(goal => ({
    name: goal.name.split(' ')[0],
    current: goal.currentAmount,
    target: goal.targetAmount,
    progress: (goal.currentAmount / goal.targetAmount) * 100,
    color: goal.color
  }));

  const categoryBreakdown = [
    { name: 'Automated', value: 47 + 180, color: '#0b733c' },
    { name: 'AI Powered', value: 320, color: '#8c4a86' },
    { name: 'Budget Optimization', value: 95, color: '#f06e06' },
    { name: 'Subscriptions', value: 67, color: '#0056ac' },
    { name: 'Manual', value: 45, color: '#904204' }
  ];

  const confidenceMetrics = {
    overall: 91,
    automation: 94,
    goalTracking: 88,
    optimization: 85
  };

  const totalProjectedMonthlySavings = savingsRules
    .filter(rule => rule.isActive)
    .reduce((total, rule) => total + rule.projectedMonthly, 0);

  const totalCurrentMonthlySavings = savingsRules
    .filter(rule => rule.isActive)
    .reduce((total, rule) => total + rule.currentAmount, 0);

  useEffect(() => {
    // Simulate AI analysis
    setIsAnalyzing(true);
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
      toast.success('💰 Smart savings analysis complete!');
    }, 2500);
    return () => clearTimeout(timer);
  }, [aggressivenessLevel]);

  const runSavingsAnalysis = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsAnalyzing(false);
    toast.success('✨ Updated savings recommendations generated!');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'achievement': return <Award className="w-5 h-5" />;
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'opportunity': return <Target className="w-5 h-5" />;
      case 'milestone': return <Gift className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-[#eef8ee] rounded-xl shadow-lg">
          <p className="font-medium text-[#18312d]">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const toggleRule = (ruleId: string) => {
    toast.success(`Toggled savings rule`);
  };

  const implementOpportunity = (opportunity: SavingsOpportunity) => {
    toast.success(`Implementing: ${opportunity.title}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fcf7] via-white to-[#eef8ee]">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-[#0b733c] to-[#18312d] text-white shadow-xl">
        <div className="flex items-center justify-between p-4 mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="text-white hover:bg-white/20 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-28 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
                <SelectItem value="2years">2 Years</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={runSavingsAnalysis}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Zap className="w-4 h-4 mr-2" />
              )}
              {isAnalyzing ? 'Analyzing...' : 'Refresh'}
            </Button>
          </div>
        </div>

        <div className="text-center pb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-3xl flex items-center justify-center">
            <PiggyBank className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">💰 Smart Savings</h1>
          <p className="text-white/80 text-sm">
            AI-powered savings optimization with {confidenceMetrics.overall}% accuracy
          </p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Analysis Loading State */}
        {isAnalyzing && (
          <Card className="border-[#eef8ee] shadow-xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#0b733c] rounded-3xl flex items-center justify-center animate-pulse">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#18312d] mb-2">🔍 Analyzing Savings</h3>
                <p className="text-sm text-[#788c78] mb-4">
                  AI is optimizing your savings strategy for maximum growth...
                </p>
                <Progress value={82} className="w-full" />
                <p className="text-xs text-[#788c78] mt-2">Analyzing spending patterns and savings opportunities</p>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-[#c8e9c8]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="opportunities">Optimize</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-[#eef8ee] shadow-xl bg-gradient-to-br from-white to-[#f7fcf7]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-[#0b733c] flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      +{Math.round(((totalCurrentMonthlySavings / totalProjectedMonthlySavings) * 100))}%
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-[#0b733c]">
                    {formatCurrency(totalCurrentMonthlySavings)}
                  </div>
                  <p className="text-sm text-[#788c78]">Saved This Month</p>
                </CardContent>
              </Card>

              <Card className="border-[#eef8ee] shadow-xl bg-gradient-to-br from-white to-[#f7fcf7]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-[#904204] flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Target</Badge>
                  </div>
                  <div className="text-2xl font-bold text-[#904204]">
                    {formatCurrency(totalProjectedMonthlySavings)}
                  </div>
                  <p className="text-sm text-[#788c78]">Monthly Goal</p>
                </CardContent>
              </Card>
            </div>

            {/* Savings Progress Chart */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0b733c] to-[#18312d] flex items-center justify-center">
                    <LineChart className="w-5 h-5 text-white" />
                  </div>
                  📈 Savings Progress Trend
                </CardTitle>
                <CardDescription>Monthly savings vs targets over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={savingsProgressData}>
                      <defs>
                        <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0b733c" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0b733c" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#904204" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#904204" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#788c78' }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#788c78' }}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#0b733c"
                        strokeWidth={3}
                        fill="url(#savingsGradient)"
                        name="Actual Savings"
                      />
                      <Area
                        type="monotone"
                        dataKey="target"
                        stroke="#904204"
                        strokeWidth={2}
                        strokeDasharray="5,5"
                        fill="url(#targetGradient)"
                        name="Target"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#0b733c] rounded"></div>
                    <span className="text-sm text-[#788c78]">Actual Savings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#904204] rounded"></div>
                    <span className="text-sm text-[#788c78]">Target</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Settings Card */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[#18312d]">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8c4a86] to-[#af75aa] flex items-center justify-center">
                      <Settings className="w-5 h-5 text-white" />
                    </div>
                    ⚙️ AI Savings Settings
                  </div>
                  <Switch 
                    checked={isSmartSavingsEnabled} 
                    onCheckedChange={setIsSmartSavingsEnabled}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-[#18312d]">Savings Aggressiveness</Label>
                  <div className="mt-3 space-y-3">
                    <Slider
                      value={[aggressivenessLevel]}
                      onValueChange={(value) => setAggressivenessLevel(value[0])}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-[#788c78]">
                      <span>Conservative</span>
                      <span className="font-medium text-[#18312d]">Level {aggressivenessLevel}</span>
                      <span>Aggressive</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-[#18312d]">Primary Savings Goal</Label>
                  <Select value={selectedGoal} onValueChange={setSelectedGoal}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {savingsGoals.map((goal) => (
                        <SelectItem key={goal.id} value={goal.id}>
                          {goal.icon} {goal.name} - {formatCurrency(goal.currentAmount)}/{formatCurrency(goal.targetAmount)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Confidence Score */}
            {showConfidenceScore && (
              <Card className="border-[#eef8ee] shadow-xl bg-gradient-to-r from-[#0b733c] to-[#18312d] text-white">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-6 h-6" />
                      AI Confidence Score
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                      onClick={() => setShowConfidenceScore(false)}
                    >
                      ✕
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">{confidenceMetrics.overall}%</div>
                    <p className="text-white/80">Overall Savings Accuracy</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Automation Rules</span>
                      <div className="flex items-center gap-2">
                        <Progress value={confidenceMetrics.automation} className="w-20 h-2" />
                        <span className="text-sm font-medium">{confidenceMetrics.automation}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Goal Tracking</span>
                      <div className="flex items-center gap-2">
                        <Progress value={confidenceMetrics.goalTracking} className="w-20 h-2" />
                        <span className="text-sm font-medium">{confidenceMetrics.goalTracking}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Optimization</span>
                      <div className="flex items-center gap-2">
                        <Progress value={confidenceMetrics.optimization} className="w-20 h-2" />
                        <span className="text-sm font-medium">{confidenceMetrics.optimization}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI Insights */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#18312d]">✨ AI Insights</h3>
              {savingsInsights.map((insight) => (
                <Card key={insight.id} className="border-[#eef8ee] shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: insight.color + '20' }}
                      >
                        {getInsightIcon(insight.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-[#18312d]">{insight.title}</h4>
                          {insight.value && (
                            <div className="flex items-center gap-1">
                              {insight.trend === 'up' ? (
                                <ArrowUp className="w-4 h-4 text-green-600" />
                              ) : insight.trend === 'down' ? (
                                <ArrowDown className="w-4 h-4 text-red-600" />
                              ) : null}
                              <span className="font-bold" style={{ color: insight.color }}>
                                {formatCurrency(insight.value)}
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-[#788c78]">{insight.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Rules Tab */}
          <TabsContent value="rules" className="space-y-4">
            {/* Category Breakdown Chart */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8c4a86] to-[#af75aa] flex items-center justify-center">
                    <PieChart className="w-5 h-5 text-white" />
                  </div>
                  🥧 Savings by Category
                </CardTitle>
                <CardDescription>Monthly savings breakdown by rule type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={categoryBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {categoryBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => [formatCurrency(value as number), 'Monthly Savings']}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {categoryBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-sm" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm text-[#788c78]">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium text-[#18312d]">
                        {formatCurrency(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Savings Rules */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#18312d]">🔧 Active Savings Rules</h3>
              {savingsRules.map((rule) => (
                <Card key={rule.id} className="border-[#eef8ee] shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Switch 
                          checked={rule.isActive} 
                          onCheckedChange={() => toggleRule(rule.id)} 
                        />
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-lg"
                            style={{ backgroundColor: rule.color + '20' }}
                          >
                            {rule.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#18312d]">{rule.name}</h4>
                            <p className="text-sm text-[#788c78]">{rule.description}</p>
                            <Badge variant="outline" className="mt-1 text-xs">
                              {rule.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#0b733c] hover:bg-[#f7fcf7]"
                        onClick={() => setExpandedRule(
                          expandedRule === rule.id ? null : rule.id
                        )}
                      >
                        {expandedRule === rule.id ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    
                    {rule.isActive && (
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="text-center">
                          <div className="font-semibold text-[#0b733c]">
                            {formatCurrency(rule.currentAmount)}
                          </div>
                          <div className="text-xs text-[#788c78]">This Month</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-[#18312d]">
                            {formatCurrency(rule.projectedMonthly)}
                          </div>
                          <div className="text-xs text-[#788c78]">Projected</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-[#904204]">
                            {rule.confidence}%
                          </div>
                          <div className="text-xs text-[#788c78]">Confidence</div>
                        </div>
                      </div>
                    )}

                    {expandedRule === rule.id && rule.isActive && (
                      <div className="mt-4 pt-4 border-t border-[#eef8ee]">
                        <div className="text-sm font-medium text-[#18312d] mb-2">📊 6-Month Performance</div>
                        <div className="h-32">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={rule.monthlySavings.map((amount, index) => ({
                              month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index],
                              amount
                            }))}>
                              <defs>
                                <linearGradient id={`gradient-${rule.id}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor={rule.color} stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor={rule.color} stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <XAxis 
                                dataKey="month" 
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: '#788c78' }}
                              />
                              <YAxis hide />
                              <Tooltip 
                                formatter={(value: any) => [formatCurrency(value), 'Saved']}
                              />
                              <Area
                                type="monotone"
                                dataKey="amount"
                                stroke={rule.color}
                                strokeWidth={2}
                                fill={`url(#gradient-${rule.id})`}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-4">
            {/* Goals Progress Chart */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0056ac] to-[#004589] flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  📊 Goal Progress Overview
                </CardTitle>
                <CardDescription>Current progress toward all savings goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={goalProgressData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#788c78' }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#788c78' }}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip 
                        formatter={(value: any, name: string) => [
                          `${value.toFixed(1)}%`, 
                          name === 'progress' ? 'Progress' : name
                        ]}
                      />
                      <Bar 
                        dataKey="progress" 
                        radius={[4, 4, 0, 0]}
                        fill="#0b733c"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Individual Goal Cards */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#18312d]">🎯 Savings Goals</h3>
              {savingsGoals.map((goal) => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100;
                const remaining = goal.targetAmount - goal.currentAmount;
                const monthsToCompletion = Math.ceil(remaining / goal.monthlyContribution);
                
                return (
                  <Card key={goal.id} className="border-[#eef8ee] shadow-lg bg-white/90 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                            style={{ backgroundColor: goal.color + '20' }}
                          >
                            {goal.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#18312d]">{goal.name}</h4>
                            <p className="text-sm text-[#788c78]">{goal.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={`${getPriorityColor(goal.priority)} mb-1`}>
                            {goal.priority} priority
                          </Badge>
                          {goal.autoContribute && (
                            <Badge variant="outline" className="text-xs">
                              Auto-contributing
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-[#788c78]">Progress</span>
                            <span className="text-sm font-medium text-[#18312d]">
                              {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                            </span>
                          </div>
                          <Progress value={progress} className="h-3" />
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-[#788c78]">
                              {progress.toFixed(1)}% complete
                            </span>
                            <span className="text-xs text-[#788c78]">
                              {formatCurrency(remaining)} remaining
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center bg-gradient-to-br from-[#f7fcf7] to-[#eef8ee] p-3 rounded-xl">
                          <div>
                            <div className="font-semibold text-[#0b733c]">
                              {formatCurrency(goal.monthlyContribution)}
                            </div>
                            <div className="text-xs text-[#788c78]">Monthly</div>
                          </div>
                          <div>
                            <div className="font-semibold text-[#904204]">
                              {monthsToCompletion}
                            </div>
                            <div className="text-xs text-[#788c78]">Months Left</div>
                          </div>
                          <div>
                            <div className="font-semibold text-[#0056ac]">
                              {goal.projectedCompletion.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </div>
                            <div className="text-xs text-[#788c78]">Completion</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[#18312d]">💡 Savings Opportunities</h3>
                <p className="text-sm text-[#788c78]">AI-discovered ways to save more money</p>
              </div>
              <Badge className="bg-[#0b733c] text-white">
                {savingsOpportunities.length} found
              </Badge>
            </div>

            <div className="space-y-3">
              {savingsOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="border-[#eef8ee] shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{opportunity.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-[#18312d]">{opportunity.title}</h4>
                            <Badge className={`text-xs ${getDifficultyColor(opportunity.difficulty)}`}>
                              {opportunity.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-[#788c78] mb-2">{opportunity.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {opportunity.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#0b733c] text-lg">
                          +{formatCurrency(opportunity.potentialSavings)}
                        </div>
                        <div className="text-sm text-[#788c78]">monthly</div>
                        <div className="text-xs text-[#0b733c]">
                          {opportunity.confidence}% confidence
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#f7fcf7] to-[#eef8ee] p-3 rounded-xl border border-[#c8e9c8] mb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-[#18312d]">Implementation</div>
                          <div className="text-xs text-[#788c78]">{opportunity.timeframe}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-[#0b733c]">
                            Annual: {formatCurrency(opportunity.potentialSavings * 12)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-[#0b733c] hover:bg-[#0f9950] text-white"
                      onClick={() => implementOpportunity(opportunity)}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {opportunity.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Summary Card */}
            <Card className="border-[#eef8ee] shadow-xl bg-gradient-to-r from-[#8c4a86] to-[#af75aa] text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Calculator className="w-6 h-6" />
                  💰 Total Opportunity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    {formatCurrency(savingsOpportunities.reduce((sum, opp) => sum + opp.potentialSavings, 0))}
                  </div>
                  <p className="text-white/80">Additional Monthly Savings Potential</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold">
                      {formatCurrency(savingsOpportunities.reduce((sum, opp) => sum + (opp.potentialSavings * 12), 0))}
                    </div>
                    <div className="text-sm text-white/80">Annual Impact</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">
                      {Math.round(savingsOpportunities.reduce((sum, opp) => sum + opp.confidence, 0) / savingsOpportunities.length)}%
                    </div>
                    <div className="text-sm text-white/80">Avg. Confidence</div>
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