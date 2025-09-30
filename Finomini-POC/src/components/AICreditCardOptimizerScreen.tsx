import React, { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, TrendingUp, Star, Zap, DollarSign, Calendar, Target, AlertTriangle, Brain, Sparkles, BarChart3, LineChart, PieChart, RefreshCw, Settings, Download, Bell, Filter, ChevronRight, ChevronDown, ArrowUp, ArrowDown, Percent, Shield, Eye, Lightbulb, CheckCircle2, Award, Gift, Users, Package, ArrowRight, Calculator } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { LineChart as RechartsLineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner@2.0.3';

interface AICreditCardOptimizerScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface CreditCard {
  id: string;
  name: string;
  network: 'Visa' | 'Mastercard' | 'Amex' | 'Discover';
  currentUsage: number;
  optimalUsage: number;
  cashbackRate: number;
  annualFee: number;
  creditLimit: number;
  currentBalance: number;
  categoryBonuses: string[];
  strengths: string[];
  weaknesses: string[];
  recommendedAction: string;
  rewardsEarned: number;
  potentialRewards: number;
  utilizationRate: number;
  color: string;
  icon: string;
}

interface OptimizationStrategy {
  id: string;
  name: string;
  description: string;
  potentialEarnings: number;
  currentEarnings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeframe: string;
  savingsBreakdown: {
    category: string;
    current: number;
    optimized: number;
    savings: number;
  }[];
  confidence: number;
}

interface SpendingOptimization {
  category: string;
  currentCard: string;
  recommendedCard: string;
  currentRate: string;
  optimizedRate: string;
  monthlySpending: number;
  additionalEarnings: number;
  reasoning: string;
  urgency: 'high' | 'medium' | 'low';
  icon: string;
}

interface CardRecommendation {
  id: string;
  name: string;
  type: 'Add to wallet' | 'Consider for future' | 'Replace existing';
  annualFee: number;
  signUpBonus: string;
  keyBenefits: string[];
  fitScore: number;
  reasoning: string;
  action: string;
  network: string;
  creditScore: number;
  approvalOdds: number;
  color: string;
}

export default function AICreditCardOptimizerScreen({ onBack, onNavigate }: AICreditCardOptimizerScreenProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStrategy, setSelectedStrategy] = useState('cashback');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [showConfidenceScore, setShowConfidenceScore] = useState(true);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1year');

  // Enhanced mock data
  const currentCards: CreditCard[] = [
    {
      id: '1',
      name: 'Chase Freedom Unlimited',
      network: 'Visa',
      currentUsage: 65,
      optimalUsage: 40,
      cashbackRate: 1.5,
      annualFee: 0,
      creditLimit: 8500,
      currentBalance: 1200,
      categoryBonuses: ['All purchases: 1.5%'],
      strengths: ['No annual fee', 'Flat cashback rate', 'Good for everyday spending'],
      weaknesses: ['Low rate compared to category cards', 'No sign-up bonus'],
      recommendedAction: 'Reduce usage for specific categories',
      rewardsEarned: 285,
      potentialRewards: 420,
      utilizationRate: 14,
      color: '#0056ac',
      icon: '💳'
    },
    {
      id: '2',
      name: 'Chase Sapphire Preferred',
      network: 'Visa',
      currentUsage: 25,
      optimalUsage: 45,
      cashbackRate: 2.0,
      annualFee: 95,
      creditLimit: 12000,
      currentBalance: 800,
      categoryBonuses: ['Travel: 2x', 'Dining: 2x'],
      strengths: ['Travel/dining bonus', 'Transfer partners', 'Premium perks'],
      weaknesses: ['Annual fee', 'Limited categories', 'Foreign transaction fees'],
      recommendedAction: 'Increase usage for dining and travel',
      rewardsEarned: 180,
      potentialRewards: 340,
      utilizationRate: 7,
      color: '#0b733c',
      icon: '🏆'
    },
    {
      id: '3',
      name: 'Citi Double Cash',
      network: 'Mastercard',
      currentUsage: 10,
      optimalUsage: 15,
      cashbackRate: 2.0,
      annualFee: 0,
      creditLimit: 6000,
      currentBalance: 450,
      categoryBonuses: ['All purchases: 2%'],
      strengths: ['High flat rate', 'No annual fee', 'Simple rewards structure'],
      weaknesses: ['No category bonuses', 'No sign-up bonus', 'Lower credit limit'],
      recommendedAction: 'Use for non-bonus category spending',
      rewardsEarned: 95,
      potentialRewards: 145,
      utilizationRate: 8,
      color: '#904204',
      icon: '💰'
    }
  ];

  const optimizationStrategies: OptimizationStrategy[] = [
    {
      id: 'cashback',
      name: 'Maximize Cashback',
      description: 'Optimize card usage to maximize cashback rewards across all categories',
      potentialEarnings: 485,
      currentEarnings: 320,
      difficulty: 'Easy',
      timeframe: 'Immediate',
      confidence: 92,
      savingsBreakdown: [
        { category: 'Groceries', current: 45, optimized: 78, savings: 33 },
        { category: 'Dining', current: 58, optimized: 96, savings: 38 },
        { category: 'Gas', current: 32, optimized: 48, savings: 16 },
        { category: 'Online Shopping', current: 41, optimized: 62, savings: 21 }
      ]
    },
    {
      id: 'points',
      name: 'Points Optimization',
      description: 'Focus on maximizing transferable points for travel and premium redemptions',
      potentialEarnings: 620,
      currentEarnings: 350,
      difficulty: 'Medium',
      timeframe: '1-2 months',
      confidence: 87,
      savingsBreakdown: [
        { category: 'Travel', current: 85, optimized: 165, savings: 80 },
        { category: 'Dining', current: 58, optimized: 116, savings: 58 },
        { category: 'Hotels', current: 42, optimized: 84, savings: 42 },
        { category: 'Airlines', current: 35, optimized: 75, savings: 40 }
      ]
    },
    {
      id: 'fees',
      name: 'Fee Optimization',
      description: 'Minimize annual fees while maintaining or improving rewards',
      potentialEarnings: 380,
      currentEarnings: 320,
      difficulty: 'Hard',
      timeframe: '3-6 months',
      confidence: 74,
      savingsBreakdown: [
        { category: 'Annual Fees', current: 190, optimized: 95, savings: 95 },
        { category: 'Foreign Transaction', current: 25, optimized: 0, savings: 25 },
        { category: 'Balance Transfer', current: 45, optimized: 0, savings: 45 },
        { category: 'Cash Advance', current: 15, optimized: 0, savings: 15 }
      ]
    }
  ];

  const spendingOptimizations: SpendingOptimization[] = [
    {
      category: 'Groceries',
      currentCard: 'Chase Freedom Unlimited',
      recommendedCard: 'Chase Freedom Flex (Q1 2025)',
      currentRate: '1.5%',
      optimizedRate: '5%',
      monthlySpending: 350,
      additionalEarnings: 12.25,
      reasoning: 'Q1 bonus category offers 5% on groceries up to $1,500 quarterly limit',
      urgency: 'high',
      icon: '🛒'
    },
    {
      category: 'Dining',
      currentCard: 'Chase Freedom Unlimited',
      recommendedCard: 'Chase Sapphire Preferred',
      currentRate: '1.5%',
      optimizedRate: '2x points',
      monthlySpending: 280,
      additionalEarnings: 8.40,
      reasoning: 'Sapphire offers 2x points on dining with valuable transfer partners',
      urgency: 'high',
      icon: '🍽️'
    },
    {
      category: 'Gas',
      currentCard: 'Chase Freedom Unlimited',
      recommendedCard: 'Citi Double Cash',
      currentRate: '1.5%',
      optimizedRate: '2%',
      monthlySpending: 180,
      additionalEarnings: 0.90,
      reasoning: 'Double Cash offers higher flat rate for non-bonus categories',
      urgency: 'medium',
      icon: '⛽'
    },
    {
      category: 'Online Shopping',
      currentCard: 'Citi Double Cash',
      recommendedCard: 'Chase Freedom Unlimited + Portal',
      currentRate: '2%',
      optimizedRate: '3-6%',
      monthlySpending: 220,
      additionalEarnings: 6.60,
      reasoning: 'Use Chase Ultimate Rewards portal for additional earnings on top of base rate',
      urgency: 'medium',
      icon: '🛍️'
    },
    {
      category: 'Travel',
      currentCard: 'Chase Freedom Unlimited',
      recommendedCard: 'Chase Sapphire Preferred',
      currentRate: '1.5%',
      optimizedRate: '2x points',
      monthlySpending: 420,
      additionalEarnings: 10.50,
      reasoning: 'Earn 2x points on travel with premium redemption options',
      urgency: 'high',
      icon: '✈️'
    }
  ];

  const cardRecommendations: CardRecommendation[] = [
    {
      id: '1',
      name: 'Chase Freedom Flex',
      type: 'Add to wallet',
      annualFee: 0,
      signUpBonus: '$200 after $500 spend',
      keyBenefits: ['5% rotating categories', 'No annual fee', 'PayPal/grocery bonuses'],
      fitScore: 95,
      reasoning: 'Perfect complement to your existing Chase cards for quarterly bonuses',
      action: 'Apply now for Q1 2025 gas bonus',
      network: 'Mastercard',
      creditScore: 720,
      approvalOdds: 92,
      color: '#0b733c'
    },
    {
      id: '2',
      name: 'Capital One Savor',
      type: 'Consider for future',
      annualFee: 95,
      signUpBonus: '$300 after $3,000 spend',
      keyBenefits: ['4% dining', '4% entertainment', '2% groceries'],
      fitScore: 78,
      reasoning: 'Could replace Sapphire for dining if you value simplicity over transfer partners',
      action: 'Monitor for better sign-up bonus',
      network: 'Mastercard',
      creditScore: 720,
      approvalOdds: 85,
      color: '#904204'
    },
    {
      id: '3',
      name: 'American Express Gold',
      type: 'Replace existing',
      annualFee: 250,
      signUpBonus: '60,000 points after $4,000 spend',
      keyBenefits: ['4x dining', '4x groceries', 'Dining credits'],
      fitScore: 88,
      reasoning: 'Superior dining and grocery rewards with valuable Amex ecosystem',
      action: 'Consider if you can utilize credits',
      network: 'Amex',
      creditScore: 740,
      approvalOdds: 78,
      color: '#f06e06'
    }
  ];

  // Analytics data for charts
  const rewardsData = currentCards.map(card => ({
    name: card.name.split(' ')[0],
    current: card.rewardsEarned,
    potential: card.potentialRewards,
    optimization: card.potentialRewards - card.rewardsEarned
  }));

  const utilizationData = currentCards.map(card => ({
    name: card.name.split(' ')[0],
    utilization: card.utilizationRate,
    limit: card.creditLimit,
    balance: card.currentBalance
  }));

  const categorySpending = [
    { name: 'Groceries', value: 350, color: '#0f9950', optimization: 12.25 },
    { name: 'Dining', value: 280, color: '#0056ac', optimization: 8.40 },
    { name: 'Travel', value: 420, color: '#f06e06', optimization: 10.50 },
    { name: 'Gas', value: 180, color: '#8c4a86', optimization: 0.90 },
    { name: 'Shopping', value: 220, color: '#904204', optimization: 6.60 },
    { name: 'Other', value: 150, color: '#0b733c', optimization: 2.35 }
  ];

  const confidenceMetrics = {
    overall: 89,
    rewards: 92,
    fees: 87,
    approval: 85
  };

  useEffect(() => {
    // Simulate AI analysis
    setIsAnalyzing(true);
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
      toast.success('🎯 Credit card optimization complete!');
    }, 2500);
    return () => clearTimeout(timer);
  }, [selectedStrategy]);

  const runOptimizationAnalysis = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsAnalyzing(false);
    toast.success('✨ Updated optimization recommendations generated!');
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-amber-100 text-amber-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const selectedStrategyData = optimizationStrategies.find(s => s.id === selectedStrategy);

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
              onClick={runOptimizationAnalysis}
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
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">💳 Credit Card Optimizer</h1>
          <p className="text-white/80 text-sm">
            AI-powered rewards maximization with {confidenceMetrics.overall}% accuracy
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
                <h3 className="font-bold text-[#18312d] mb-2">🔍 Analyzing Credit Cards</h3>
                <p className="text-sm text-[#788c78] mb-4">
                  AI is optimizing your credit card strategy for maximum rewards...
                </p>
                <Progress value={78} className="w-full" />
                <p className="text-xs text-[#788c78] mt-2">Analyzing spending patterns and reward structures</p>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-[#c8e9c8] h-12">
            <TabsTrigger value="overview" className="text-sm font-medium px-2">Overview</TabsTrigger>
            <TabsTrigger value="cards" className="text-sm font-medium px-2">My Cards</TabsTrigger>
            <TabsTrigger value="optimize" className="text-sm font-medium px-2">Optimize</TabsTrigger>
            <TabsTrigger value="recommendations" className="text-sm font-medium px-2">New Cards</TabsTrigger>
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
                    <Badge className="bg-green-100 text-green-800">+52%</Badge>
                  </div>
                  <div className="text-2xl font-bold text-[#0b733c]">
                    {formatCurrency(selectedStrategyData?.potentialEarnings || 485)}
                  </div>
                  <p className="text-sm text-[#788c78]">Annual Potential</p>
                </CardContent>
              </Card>

              <Card className="border-[#eef8ee] shadow-xl bg-gradient-to-br from-white to-[#f7fcf7]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-[#904204] flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Current</Badge>
                  </div>
                  <div className="text-2xl font-bold text-[#904204]">
                    {formatCurrency(selectedStrategyData?.currentEarnings || 320)}
                  </div>
                  <p className="text-sm text-[#788c78]">Annual Earnings</p>
                </CardContent>
              </Card>
            </div>

            {/* Rewards Optimization Chart */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0b733c] to-[#18312d] flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  📊 Rewards Optimization Potential
                </CardTitle>
                <CardDescription>Current vs optimized rewards by card</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rewardsData}>
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
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="current" fill="#904204" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="potential" fill="#0b733c" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#904204] rounded"></div>
                    <span className="text-sm text-[#788c78]">Current Rewards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#0b733c] rounded"></div>
                    <span className="text-sm text-[#788c78]">Potential Rewards</span>
                  </div>
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
                    <p className="text-white/80">Overall Optimization Accuracy</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Rewards Analysis</span>
                      <div className="flex items-center gap-2">
                        <Progress value={confidenceMetrics.rewards} className="w-20 h-2" />
                        <span className="text-sm font-medium">{confidenceMetrics.rewards}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Fee Optimization</span>
                      <div className="flex items-center gap-2">
                        <Progress value={confidenceMetrics.fees} className="w-20 h-2" />
                        <span className="text-sm font-medium">{confidenceMetrics.fees}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Approval Probability</span>
                      <div className="flex items-center gap-2">
                        <Progress value={confidenceMetrics.approval} className="w-20 h-2" />
                        <span className="text-sm font-medium">{confidenceMetrics.approval}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI-Detected Features & Opportunities */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#18312d]">🔍 AI-Detected Opportunities</h3>
              
              {/* Subscription Optimization Detected */}
              <Card className="border-[#eef8ee] shadow-xl bg-gradient-to-br from-[#f7fcf7] to-[#eef8ee] border-l-4 border-l-[#0b733c]">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0b733c] flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-[#18312d]">💳 Subscription Optimization Detected</h4>
                        <Badge className="bg-green-100 text-green-800">+$47/month</Badge>
                      </div>
                      <p className="text-sm text-[#788c78] mb-3">
                        AI found 3 subscriptions you can optimize by switching payment methods to higher-reward cards
                      </p>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#788c78]">Netflix → Sapphire Preferred</span>
                          <span className="text-[#0b733c] font-medium">+$0.35/month</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#788c78]">Spotify → Freedom Unlimited</span>
                          <span className="text-[#0b733c] font-medium">+$0.15/month</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#788c78]">Amazon Prime → Freedom Flex</span>
                          <span className="text-[#0b733c] font-medium">+$1.42/month</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-[#0b733c] hover:bg-[#0f9950] text-white"
                          onClick={() => onNavigate('ai-subscription-optimizer')}
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          Optimize Now
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-[#c8e9c8] hover:bg-[#f7fcf7]"
                          onClick={() => toast.info('Reminder set for subscription optimization')}
                        >
                          <Bell className="w-3 h-3 mr-1" />
                          Remind Later
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Credit Score Impact Alert */}
              <Card className="border-[#eef8ee] shadow-xl bg-gradient-to-br from-[#f7fcf7] to-[#eef8ee] border-l-4 border-l-[#f06e06]">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f06e06] flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-[#18312d]">📊 Credit Score Impact Detected</h4>
                        <Badge className="bg-orange-100 text-orange-800">Monitor</Badge>
                      </div>
                      <p className="text-sm text-[#788c78] mb-3">
                        Your current credit utilization is healthy at 11%, but applying for new cards could temporarily impact your score
                      </p>
                      <div className="bg-gradient-to-br from-[#eef8ee] to-[#dbf0e5] p-3 rounded-xl border border-[#c8e9c8] mb-3">
                        <div className="text-sm">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[#788c78]">Current Score Range:</span>
                            <span className="font-medium text-[#18312d]">740-760</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#788c78]">Projected Impact:</span>
                            <span className="font-medium text-[#f06e06]">-5 to -15 points</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-[#f06e06] hover:bg-[#e55a02] text-white"
                          onClick={() => toast.info('Credit monitoring enabled')}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Monitor Score
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-[#c8e9c8] hover:bg-[#f7fcf7]"
                          onClick={() => toast.success('Credit tips exported')}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Get Tips
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rewards Milestone Achievement */}
              <Card className="border-[#eef8ee] shadow-xl bg-gradient-to-br from-[#f7fcf7] to-[#eef8ee] border-l-4 border-l-[#8c4a86]">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#8c4a86] flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-[#18312d]">🏆 Rewards Milestone Approaching</h4>
                        <Badge className="bg-purple-100 text-purple-800">87% Complete</Badge>
                      </div>
                      <p className="text-sm text-[#788c78] mb-3">
                        You're $47 away from earning your Chase Sapphire Preferred sign-up bonus worth $750
                      </p>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#788c78]">Progress to $4,000 spend</span>
                          <span className="text-sm font-medium text-[#18312d]">$3,953 / $4,000</span>
                        </div>
                        <Progress value={87} className="h-2" />
                        <div className="text-xs text-[#788c78] text-center">
                          Estimated completion: 3 days at current spending rate
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-[#8c4a86] hover:bg-[#7a4076] text-white"
                          onClick={() => toast.success('Tracking rewards progress')}
                        >
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Track Progress
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-[#c8e9c8] hover:bg-[#f7fcf7]"
                          onClick={() => toast.info('Spending suggestions sent')}
                        >
                          <Lightbulb className="w-3 h-3 mr-1" />
                          Get Suggestions
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Category Bonus Rotation Alert */}
              <Card className="border-[#eef8ee] shadow-xl bg-gradient-to-br from-[#f7fcf7] to-[#eef8ee] border-l-4 border-l-[#0056ac]">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0056ac] flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-[#18312d]">🔄 Q1 2025 Bonus Categories Active</h4>
                        <Badge className="bg-blue-100 text-blue-800">New</Badge>
                      </div>
                      <p className="text-sm text-[#788c78] mb-3">
                        Chase Freedom Flex Q1 categories are now active: Gas stations, EV charging, and select streaming services earn 5%
                      </p>
                      <div className="bg-gradient-to-br from-[#eef8ee] to-[#dbf0e5] p-3 rounded-xl border border-[#c8e9c8] mb-3">
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-[#788c78]">⛽ Gas Stations:</span>
                            <span className="font-medium text-[#0b733c]">5% (up to $1,500)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#788c78]">🔌 EV Charging:</span>
                            <span className="font-medium text-[#0b733c]">5% (up to $1,500)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#788c78]">📺 Select Streaming:</span>
                            <span className="font-medium text-[#0b733c]">5% (up to $1,500)</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-[#0056ac] hover:bg-[#004589] text-white"
                          onClick={() => toast.success('Bonus categories activated!')}
                        >
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Activate Now
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-[#c8e9c8] hover:bg-[#f7fcf7]"
                          onClick={() => toast.info('Calendar reminder set')}
                        >
                          <Calendar className="w-3 h-3 mr-1" />
                          Set Reminder
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* My Cards Tab */}
          <TabsContent value="cards" className="space-y-4">
            {/* Credit Utilization Chart */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8c4a86] to-[#af75aa] flex items-center justify-center">
                    <PieChart className="w-5 h-5 text-white" />
                  </div>
                  📈 Credit Utilization Overview
                </CardTitle>
                <CardDescription>Monitor your credit utilization across all cards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={utilizationData}>
                      <defs>
                        <linearGradient id="utilizationGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0b733c" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0b733c" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
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
                          `${value}%`, 
                          name === 'utilization' ? 'Utilization Rate' : name
                        ]}
                      />
                      <Area
                        type="monotone"
                        dataKey="utilization"
                        stroke="#0b733c"
                        strokeWidth={3}
                        fill="url(#utilizationGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Individual Card Analysis */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#18312d]">💳 Individual Card Performance</h3>
              {currentCards.map((card) => (
                <Card key={card.id} className="border-[#eef8ee] shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                          style={{ backgroundColor: card.color + '20' }}
                        >
                          {card.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-[#18312d]">{card.name}</div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{card.network}</Badge>
                            <span className="text-sm text-[#788c78]">
                              {card.utilizationRate}% utilization
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#0b733c] hover:bg-[#f7fcf7]"
                        onClick={() => setExpandedCard(
                          expandedCard === card.id ? null : card.id
                        )}
                      >
                        {expandedCard === card.id ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-sm text-[#788c78]">Rewards Earned</div>
                        <div className="font-semibold text-[#0b733c]">
                          {formatCurrency(card.rewardsEarned)}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-[#788c78]">Annual Fee</div>
                        <div className="font-semibold text-[#18312d]">
                          {formatCurrency(card.annualFee)}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-[#788c78]">Cashback Rate</div>
                        <div className="font-semibold text-[#18312d]">
                          {card.cashbackRate}%
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#788c78]">Usage Optimization</span>
                        <span className="text-sm font-medium">
                          {card.currentUsage}% → {card.optimalUsage}%
                        </span>
                      </div>
                      <Progress value={card.currentUsage} className="mb-2" />
                      <div className="text-xs text-[#788c78]">
                        💡 {card.recommendedAction}
                      </div>
                    </div>

                    {expandedCard === card.id && (
                      <div className="mt-4 pt-4 border-t border-[#eef8ee] space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-medium text-[#18312d] mb-2">✅ Strengths</div>
                            {card.strengths.map((strength, index) => (
                              <div key={index} className="text-sm text-[#0b733c] mb-1">
                                • {strength}
                              </div>
                            ))}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-[#18312d] mb-2">⚠️ Weaknesses</div>
                            {card.weaknesses.map((weakness, index) => (
                              <div key={index} className="text-sm text-[#904204] mb-1">
                                • {weakness}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-[#f7fcf7] to-[#eef8ee] p-3 rounded-xl border border-[#c8e9c8]">
                          <div className="text-sm font-medium text-[#18312d] mb-1">🏆 Category Bonuses</div>
                          <div className="text-sm text-[#788c78]">
                            {card.categoryBonuses.join(' • ')}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Optimize Tab */}
          <TabsContent value="optimize" className="space-y-6">
            {/* Strategy Selector */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0b733c] to-[#18312d] flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  🎯 Optimization Strategy
                </CardTitle>
                <CardDescription>Choose your optimization approach</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {optimizationStrategies.map((strategy) => (
                  <Button
                    key={strategy.id}
                    variant={selectedStrategy === strategy.id ? "default" : "outline"}
                    size="lg"
                    onClick={() => setSelectedStrategy(strategy.id)}
                    className={`w-full justify-start h-auto p-4 ${
                      selectedStrategy === strategy.id 
                        ? 'bg-[#0b733c] hover:bg-[#0f9950] text-white' 
                        : 'border-[#c8e9c8] hover:bg-[#f7fcf7]'
                    }`}
                  >
                    <div className="text-left flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-semibold">{strategy.name}</div>
                        <div className="flex items-center gap-2">
                          <Badge className={getDifficultyColor(strategy.difficulty)}>
                            {strategy.difficulty}
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-800">
                            {strategy.confidence}% confidence
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm opacity-80 mb-2">{strategy.description}</div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">
                          +{formatCurrency(strategy.potentialEarnings - strategy.currentEarnings)}/year
                        </span>
                        <span className="text-xs opacity-70">{strategy.timeframe}</span>
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Category Spending Pie Chart */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8c4a86] to-[#af75aa] flex items-center justify-center">
                    <PieChart className="w-5 h-5 text-white" />
                  </div>
                  🥧 Spending Categories
                </CardTitle>
                <CardDescription>Monthly spending breakdown with optimization potential</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={categorySpending}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {categorySpending.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any, name: string) => [
                          formatCurrency(value as number), 
                          name === 'value' ? 'Monthly Spending' : name
                        ]}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {categorySpending.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-sm" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm text-[#788c78]">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-[#18312d]">
                          {formatCurrency(item.value)}
                        </div>
                        <div className="text-xs text-[#0b733c]">
                          +{formatCurrency(item.optimization)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Spending Optimizations */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-[#18312d]">💰 Smart Optimization Recommendations</h3>
                  <p className="text-sm text-[#788c78]">AI-powered suggestions to maximize your rewards</p>
                </div>
                <Badge className="bg-[#0b733c] text-white">
                  {spendingOptimizations.filter(opt => opt.urgency === 'high').length} High Priority
                </Badge>
              </div>

              {spendingOptimizations.map((optimization, index) => (
                <Card key={index} className="border-[#eef8ee] shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-0">
                    {/* Header Section */}
                    <div className="p-4 bg-gradient-to-r from-[#f7fcf7] via-white to-[#eef8ee]">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white to-[#f7fcf7] border-2 border-[#c8e9c8] flex items-center justify-center text-2xl shadow-sm">
                            {optimization.icon}
                          </div>
                          <div>
                            <div className="font-bold text-[#18312d] text-lg">{optimization.category}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={`text-xs ${getUrgencyColor(optimization.urgency)}`}>
                                {optimization.urgency} priority
                              </Badge>
                              <span className="text-xs text-[#788c78]">
                                {formatCurrency(optimization.monthlySpending)}/month spending
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#0b733c]">
                            +{formatCurrency(optimization.additionalEarnings)}
                          </div>
                          <div className="text-sm text-[#788c78]">extra monthly</div>
                          <div className="text-xs text-[#0b733c] font-medium">
                            +{formatCurrency(optimization.additionalEarnings * 12)} annually
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 space-y-4">
                      {/* Current vs Recommended Comparison */}
                      <div className="grid grid-cols-1 gap-3">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-[#f7fcf7] to-[#eef8ee] rounded-xl opacity-50"></div>
                          <div className="relative p-4 rounded-xl border border-[#c8e9c8]">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="text-sm text-[#788c78] mb-1">📉 Current Setup</div>
                                <div className="font-semibold text-[#18312d] mb-1">{optimization.currentCard}</div>
                                <div className="text-sm text-[#904204] font-medium">{optimization.currentRate}</div>
                              </div>
                              <div className="mx-4">
                                <ArrowRight className="w-6 h-6 text-[#788c78]" />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm text-[#788c78] mb-1">📈 Recommended</div>
                                <div className="font-semibold text-[#18312d] mb-1">{optimization.recommendedCard}</div>
                                <div className="text-sm text-[#0b733c] font-bold">{optimization.optimizedRate}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Impact Visualization */}
                      <div className="bg-gradient-to-br from-[#eef8ee] to-[#dbf0e5] p-4 rounded-xl border border-[#c8e9c8]">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Calculator className="w-4 h-4 text-[#0b733c]" />
                            <span className="font-semibold text-[#18312d]">Impact Analysis</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            {Math.round((optimization.additionalEarnings / (optimization.monthlySpending * (parseFloat(optimization.currentRate.replace('%', '')) / 100))) * 100)}% improvement
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div>
                            <div className="text-lg font-bold text-[#904204]">
                              {formatCurrency(optimization.monthlySpending * (parseFloat(optimization.currentRate.replace('%', '')) / 100))}
                            </div>
                            <div className="text-xs text-[#788c78]">Current Rewards</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-[#0b733c]">
                              {formatCurrency(optimization.monthlySpending * (parseFloat(optimization.currentRate.replace('%', '')) / 100) + optimization.additionalEarnings)}
                            </div>
                            <div className="text-xs text-[#788c78]">Optimized Rewards</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-[#0b733c]">
                              +{Math.round((optimization.additionalEarnings / (optimization.monthlySpending * (parseFloat(optimization.currentRate.replace('%', '')) / 100))) * 100)}%
                            </div>
                            <div className="text-xs text-[#788c78]">Increase</div>
                          </div>
                        </div>
                      </div>

                      {/* AI Insight */}
                      <div className="bg-gradient-to-br from-[#f7fcf7] to-[#eef8ee] p-4 rounded-xl border border-[#c8e9c8]">
                        <div className="flex items-center gap-2 mb-3">
                          <Brain className="w-5 h-5 text-[#0b733c]" />
                          <span className="font-semibold text-[#18312d]">🤖 AI Recommendation</span>
                        </div>
                        <p className="text-sm text-[#788c78] mb-3">{optimization.reasoning}</p>
                        
                        {/* Action Steps */}
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-[#18312d]">📋 Implementation Steps:</div>
                          <div className="space-y-1">
                            {optimization.category === 'Groceries' && (
                              <>
                                <div className="flex items-center gap-2 text-sm text-[#788c78]">
                                  <CheckCircle2 className="w-3 h-3 text-[#0b733c]" />
                                  Apply for Chase Freedom Flex before Q1 2025
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#788c78]">
                                  <CheckCircle2 className="w-3 h-3 text-[#0b733c]" />
                                  Activate 5% grocery category in January
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#788c78]">
                                  <CheckCircle2 className="w-3 h-3 text-[#0b733c]" />
                                  Set spending reminders at $1,500 quarterly limit
                                </div>
                              </>
                            )}
                            {optimization.category === 'Dining' && (
                              <>
                                <div className="flex items-center gap-2 text-sm text-[#788c78]">
                                  <CheckCircle2 className="w-3 h-3 text-[#0b733c]" />
                                  Switch dining purchases to Sapphire Preferred
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#788c78]">
                                  <CheckCircle2 className="w-3 h-3 text-[#0b733c]" />
                                  Link card to dining apps for easy use
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#788c78]">
                                  <CheckCircle2 className="w-3 h-3 text-[#0b733c]" />
                                  Consider point transfer opportunities
                                </div>
                              </>
                            )}
                            {optimization.category === 'Online Shopping' && (
                              <>
                                <div className="flex items-center gap-2 text-sm text-[#788c78]">
                                  <CheckCircle2 className="w-3 h-3 text-[#0b733c]" />
                                  Access Chase Ultimate Rewards portal
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#788c78]">
                                  <CheckCircle2 className="w-3 h-3 text-[#0b733c]" />
                                  Check for merchant bonus rates
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#788c78]">
                                  <CheckCircle2 className="w-3 h-3 text-[#0b733c]" />
                                  Use Freedom Unlimited for purchases
                                </div>
                              </>
                            )}
                            {(optimization.category === 'Gas' || optimization.category === 'Travel') && (
                              <>
                                <div className="flex items-center gap-2 text-sm text-[#788c78]">
                                  <CheckCircle2 className="w-3 h-3 text-[#0b733c]" />
                                  Update automatic payment methods
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#788c78]">
                                  <CheckCircle2 className="w-3 h-3 text-[#0b733c]" />
                                  Set up spending notifications
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#788c78]">
                                  <CheckCircle2 className="w-3 h-3 text-[#0b733c]" />
                                  Monitor monthly progress
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <Button 
                          className="bg-[#0b733c] hover:bg-[#0f9950] text-white"
                          onClick={() => toast.success(`Implementing ${optimization.category} optimization...`)}
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          Implement Now
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-[#c8e9c8] hover:bg-[#f7fcf7]"
                          onClick={() => toast.info(`Setting reminder for ${optimization.category}...`)}
                        >
                          <Bell className="w-4 h-4 mr-2" />
                          Remind Me
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Summary Card */}
              <Card className="border-[#eef8ee] shadow-xl bg-gradient-to-r from-[#0b733c] to-[#18312d] text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <TrendingUp className="w-6 h-6" />
                    💎 Total Optimization Potential
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">
                      +{formatCurrency(spendingOptimizations.reduce((sum, opt) => sum + opt.additionalEarnings, 0))}
                    </div>
                    <p className="text-white/80">Additional Monthly Rewards</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        +{formatCurrency(spendingOptimizations.reduce((sum, opt) => sum + (opt.additionalEarnings * 12), 0))}
                      </div>
                      <div className="text-sm text-white/80">Annual Impact</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {Math.round(spendingOptimizations.reduce((sum, opt) => sum + opt.additionalEarnings, 0) / spendingOptimizations.reduce((sum, opt) => sum + (opt.monthlySpending * (parseFloat(opt.currentRate.replace('%', '')) / 100)), 0) * 100)}%
                      </div>
                      <div className="text-sm text-white/80">Avg. Improvement</div>
                    </div>
                  </div>

                  <div className="bg-white/10 p-3 rounded-xl">
                    <div className="text-sm font-medium mb-2">🎯 Quick Implementation Priority</div>
                    <div className="space-y-1">
                      {spendingOptimizations
                        .filter(opt => opt.urgency === 'high')
                        .slice(0, 3)
                        .map((opt, index) => (
                          <div key={index} className="text-sm text-white/90">
                            {index + 1}. {opt.category} (+{formatCurrency(opt.additionalEarnings)}/month)
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[#18312d]">🃏 New Card Recommendations</h3>
                <p className="text-sm text-[#788c78]">AI-curated cards based on your spending</p>
              </div>
              <Badge className="bg-[#0b733c] text-white">
                {cardRecommendations.filter(c => c.type === 'Add to wallet').length} High Priority
              </Badge>
            </div>

            <div className="space-y-4">
              {cardRecommendations.map((card) => (
                <Card key={card.id} className="border-[#eef8ee] shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: card.color }}
                        >
                          {card.name[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-[#18312d]">{card.name}</div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={card.type === 'Add to wallet' ? "default" : "outline"}
                              className={card.type === 'Add to wallet' ? 'bg-[#0b733c] text-white' : ''}
                            >
                              {card.type}
                            </Badge>
                            <Badge variant="outline">{card.network}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-bold text-[#18312d]">{card.fitScore}%</span>
                        </div>
                        <div className="text-xs text-[#788c78]">Fit Score</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gradient-to-br from-[#f7fcf7] to-[#eef8ee] p-3 rounded-xl">
                        <div className="text-sm text-[#788c78] mb-1">Annual Fee</div>
                        <div className="font-semibold text-[#18312d]">{formatCurrency(card.annualFee)}</div>
                      </div>
                      <div className="bg-gradient-to-br from-[#f7fcf7] to-[#eef8ee] p-3 rounded-xl">
                        <div className="text-sm text-[#788c78] mb-1">Sign-up Bonus</div>
                        <div className="font-semibold text-[#18312d]">{card.signUpBonus}</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-medium text-[#18312d] mb-2">Key Benefits</div>
                      <div className="flex flex-wrap gap-2">
                        {card.keyBenefits.map((benefit, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-[#c8e9c8]">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#eef8ee] to-[#dbf0e5] p-3 rounded-xl border border-[#c8e9c8] mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-[#0b733c]" />
                        <span className="font-medium text-[#18312d]">Why it fits</span>
                      </div>
                      <p className="text-sm text-[#788c78]">{card.reasoning}</p>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <span className="text-[#788c78]">Credit Score Needed: </span>
                          <span className="font-medium text-[#18312d]">{card.creditScore}+</span>
                        </div>
                        <div>
                          <span className="text-[#788c78]">Approval Odds: </span>
                          <span className="font-medium text-[#0b733c]">{card.approvalOdds}%</span>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className={`w-full ${
                        card.type === 'Add to wallet' 
                          ? 'bg-[#0b733c] hover:bg-[#0f9950] text-white' 
                          : 'border-[#c8e9c8] hover:bg-[#f7fcf7]'
                      }`}
                      variant={card.type === 'Add to wallet' ? "default" : "outline"}
                      onClick={() => toast.success(`${card.action} for ${card.name}`)}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {card.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Implementation Summary */}
            <Card className="border-[#eef8ee] shadow-xl bg-gradient-to-r from-[#8c4a86] to-[#af75aa] text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  ✨ Implementation Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-green-300 mt-0.5" />
                  <div>
                    <div className="font-medium text-white">Annual Earnings Boost</div>
                    <p className="text-sm text-white/90">
                      Implementing these optimizations could increase annual rewards by {formatCurrency(165)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-blue-300 mt-0.5" />
                  <div>
                    <div className="font-medium text-white">Next Steps</div>
                    <p className="text-sm text-white/90">
                      1. Apply for recommended cards • 2. Optimize spending categories • 3. Monitor rewards progress
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-300 mt-0.5" />
                  <div>
                    <div className="font-medium text-white">Important Notes</div>
                    <p className="text-sm text-white/90">
                      Monitor credit utilization and maintain good payment history for optimal credit health
                    </p>
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