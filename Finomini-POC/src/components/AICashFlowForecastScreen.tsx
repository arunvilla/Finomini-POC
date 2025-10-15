import React, { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, AlertTriangle, DollarSign, CheckCircle2, Eye, Target, Brain, Sparkles, BarChart3, LineChart, PieChart, Zap, RefreshCw, Settings, Download, Bell, Filter, ChevronRight, ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
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
import { toast } from 'sonner';
import { useAppStore } from '../stores';
import { useAI } from '../hooks/useAI';

interface AICashFlowForecastScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface CashFlowPrediction {
  date: Date;
  startingBalance: number;
  income: number;
  expenses: number;
  endingBalance: number;
  riskLevel: 'low' | 'medium' | 'high';
  events: string[];
  netFlow: number;
  month: string;
}

interface CashFlowAlert {
  id: string;
  type: 'warning' | 'critical' | 'opportunity';
  date: Date;
  title: string;
  description: string;
  suggestedAction: string;
  impact: number;
  priority: 'high' | 'medium' | 'low';
}

interface UpcomingExpense {
  id: string;
  name: string;
  amount: number;
  date: Date;
  category: string;
  confidence: number;
  isRecurring: boolean;
  icon: string;
}

export default function AICashFlowForecastScreen({ onBack, onNavigate }: AICashFlowForecastScreenProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [showConfidenceScore, setShowConfidenceScore] = useState(true);
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  
  // Store and AI hooks
  const { 
    transactions, 
    accounts,
    generateCashFlowForecast,
    cashFlowPredictions: storePredictions,
    cashFlowAlerts: storeAlerts
  } = useAppStore();
  const { isProcessing: aiProcessing, error: aiError } = useAI();

  // Generate forecasts on component mount
  useEffect(() => {
    if (transactions.length > 0 && storePredictions.length === 0) {
      handleGenerateForecast();
    }
  }, [transactions.length]);

  const handleGenerateForecast = async () => {
    if (transactions.length === 0) {
      toast.error('No transaction data available for forecasting');
      return;
    }
    
    setIsAnalyzing(true);
    try {
      await generateCashFlowForecast();
      toast.success('Cash flow forecast generated successfully!');
    } catch (error) {
      console.error('Failed to generate forecast:', error);
      toast.error('Failed to generate forecast. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Mock data for fallback
  const mockCashFlowPredictions: CashFlowPrediction[] = [
    {
      date: new Date(2024, 1, 1),
      startingBalance: 5584,
      income: 4500,
      expenses: 3890,
      endingBalance: 6194,
      netFlow: 610,
      riskLevel: 'low',
      month: 'Feb',
      events: ['💰 Salary deposit', '🏠 Regular monthly expenses']
    },
    {
      date: new Date(2024, 2, 1),
      startingBalance: 6194,
      income: 4500,
      expenses: 4120,
      endingBalance: 6574,
      netFlow: 380,
      riskLevel: 'low',
      month: 'Mar',
      events: ['💰 Salary deposit', '⚡ Higher utilities']
    },
    {
      date: new Date(2024, 3, 1),
      startingBalance: 6574,
      income: 4500,
      expenses: 4890,
      endingBalance: 6184,
      netFlow: -390,
      riskLevel: 'medium',
      month: 'Apr',
      events: ['💰 Salary deposit', '🚗 Car insurance', '🎂 Birthday expenses']
    },
    {
      date: new Date(2024, 4, 1),
      startingBalance: 6184,
      income: 4500,
      expenses: 3950,
      endingBalance: 6734,
      netFlow: 550,
      riskLevel: 'low',
      month: 'May',
      events: ['💰 Salary deposit', '📉 Lower spending']
    },
    {
      date: new Date(2024, 5, 1),
      startingBalance: 6734,
      income: 4500,
      expenses: 5200,
      endingBalance: 6034,
      netFlow: -700,
      riskLevel: 'high',
      month: 'Jun',
      events: ['💰 Salary deposit', '✈️ Vacation', '📱 Annual subscriptions']
    },
    {
      date: new Date(2024, 6, 1),
      startingBalance: 6034,
      income: 4500,
      expenses: 3780,
      endingBalance: 6754,
      netFlow: 720,
      riskLevel: 'low',
      month: 'Jul',
      events: ['💰 Salary deposit', '❄️ Lower summer utilities']
    }
  ];

  // Use real predictions from store or fallback to mock data
  const cashFlowPredictions: CashFlowPrediction[] = storePredictions.length > 0 
    ? storePredictions.map((pred: any) => ({
        date: new Date(pred.date),
        startingBalance: pred.starting_balance,
        income: pred.predicted_income,
        expenses: pred.predicted_expenses,
        endingBalance: pred.ending_balance,
        netFlow: pred.predicted_income - pred.predicted_expenses,
        riskLevel: pred.risk_level as 'low' | 'medium' | 'high',
        month: new Date(pred.date).toLocaleDateString('en-US', { month: 'short' }),
        events: pred.predicted_events || []
      }))
    : mockCashFlowPredictions;

  const mockCashFlowAlerts: CashFlowAlert[] = [
    {
      id: '1',
      type: 'critical',
      date: new Date(2024, 4, 23),
      title: 'Potential Overdraft Risk',
      description: 'Multiple large expenses on May 23rd could cause balance to go negative',
      suggestedAction: 'Transfer $300 from emergency fund or reschedule one payment',
      impact: -234,
      priority: 'high'
    },
    {
      id: '2',
      type: 'warning',
      date: new Date(2024, 4, 15),
      title: 'Low Balance Alert',
      description: 'Account balance will drop to $1,890 around May 15th due to vacation expenses',
      suggestedAction: 'Consider moving $500 from savings or delaying non-essential purchases',
      impact: -1890,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'opportunity',
      date: new Date(2024, 6, 10),
      title: 'Surplus Opportunity',
      description: 'Projected $1,200 surplus in July - great time to boost emergency fund',
      suggestedAction: 'Transfer excess to high-yield savings or investment account',
      impact: 1200,
      priority: 'medium'
    }
  ];

  const cashFlowAlerts: CashFlowAlert[] = storeAlerts.length > 0
    ? storeAlerts.map((alert: any) => ({
        id: alert.id,
        type: alert.type as 'warning' | 'critical' | 'opportunity',
        date: new Date(alert.date),
        title: alert.title,
        description: alert.description,
        suggestedAction: alert.suggested_action,
        impact: alert.impact_amount,
        priority: alert.priority as 'high' | 'medium' | 'low'
      }))
    : mockCashFlowAlerts;

  const upcomingExpenses: UpcomingExpense[] = [
    {
      id: '1',
      name: 'Car Insurance Renewal',
      amount: 420,
      date: new Date(2024, 3, 15),
      category: 'Insurance',
      confidence: 95,
      isRecurring: true,
      icon: '🚗'
    },
    {
      id: '2',
      name: 'Vacation Trip',
      amount: 1200,
      date: new Date(2024, 4, 20),
      category: 'Travel',
      confidence: 90,
      isRecurring: false,
      icon: '✈️'
    },
    {
      id: '3',
      name: 'Annual Subscriptions',
      amount: 380,
      date: new Date(2024, 4, 1),
      category: 'Software',
      confidence: 85,
      isRecurring: true,
      icon: '📱'
    },
    {
      id: '4',
      name: 'Property Tax',
      amount: 850,
      date: new Date(2024, 5, 30),
      category: 'Taxes',
      confidence: 100,
      isRecurring: true,
      icon: '🏠'
    }
  ];

  // Analytics data for charts
  const expenseBreakdown = [
    { name: 'Housing', value: 1450, color: '#0f9950' },
    { name: 'Food', value: 680, color: '#0056ac' },
    { name: 'Transportation', value: 520, color: '#f06e06' },
    { name: 'Entertainment', value: 340, color: '#8c4a86' },
    { name: 'Utilities', value: 280, color: '#904204' },
    { name: 'Other', value: 230, color: '#0b733c' }
  ];

  const confidenceMetrics = {
    overall: 87,
    income: 95,
    expenses: 82,
    events: 74
  };

  useEffect(() => {
    if (storePredictions.length > 0) {
      // Re-generate forecast when timeframe changes
      handleGenerateForecast();
    }
  }, [selectedTimeframe]);

  const runForecastAnalysis = async () => {
    await handleGenerateForecast();
  };

  const getBalanceColor = (balance: number) => {
    if (balance < 1000) return 'text-red-600';
    if (balance < 3000) return 'text-amber-600';
    return 'text-green-600';
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning': return <Eye className="w-5 h-5 text-amber-500" />;
      case 'opportunity': return <Target className="w-5 h-5 text-green-500" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-amber-50 border-amber-200';
      case 'opportunity': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
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
              <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={runForecastAnalysis}
              disabled={isAnalyzing || aiProcessing}
            >
              {(isAnalyzing || aiProcessing) ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Zap className="w-4 h-4 mr-2" />
              )}
              {(isAnalyzing || aiProcessing) ? 'Analyzing...' : 'Refresh'}
            </Button>
          </div>
        </div>

        <div className="text-center pb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-3xl flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">💰 Cash Flow Forecast</h1>
          <p className="text-white/80 text-sm">
            AI-powered financial predictions with {confidenceMetrics.overall}% accuracy
          </p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Error Display */}
        {aiError && (
          <Alert className="bg-red-50 border-red-200 shadow-lg">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <AlertDescription className="text-red-800">
              <strong>AI Service Error:</strong> {aiError}
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleGenerateForecast}
                className="ml-2"
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Empty State */}
        {transactions.length === 0 && !isAnalyzing && !aiProcessing && (
          <Card className="border-gray-200 bg-gray-50">
            <CardContent className="p-8 text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">No Transaction Data</h3>
              <p className="text-sm text-gray-600 mb-4">
                Add some transactions to get AI-powered cash flow forecasts
              </p>
              <Button onClick={() => onNavigate('transactions')}>
                Add Transactions
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Critical Alert Banner */}
        {cashFlowAlerts.some(alert => alert.type === 'critical') && (
          <Alert className="bg-red-50 border-red-200 shadow-lg">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <AlertDescription className="text-red-800">
              <strong>⚠️ Critical Alert:</strong> Potential overdraft risk detected in May. 
              Review recommended actions below.
            </AlertDescription>
          </Alert>
        )}

        {/* Analysis Loading State */}
        {(isAnalyzing || aiProcessing) && (
          <Card className="border-[#eef8ee] shadow-xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#0b733c] rounded-3xl flex items-center justify-center animate-pulse">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#18312d] mb-2">🔍 Analyzing Cash Flow</h3>
                <p className="text-sm text-[#788c78] mb-4">
                  AI is processing your financial data and predicting future trends...
                </p>
                <Progress value={75} className="w-full" />
                <p className="text-xs text-[#788c78] mt-2">Analyzing income patterns and expense forecasts</p>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-[#c8e9c8]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
                    <Badge className="bg-green-100 text-green-800">+21%</Badge>
                  </div>
                  <div className="text-2xl font-bold text-[#0b733c]">
                    {formatCurrency(cashFlowPredictions[cashFlowPredictions.length - 1].endingBalance)}
                  </div>
                  <p className="text-sm text-[#788c78]">Projected Balance</p>
                </CardContent>
              </Card>

              <Card className="border-[#eef8ee] shadow-xl bg-gradient-to-br from-white to-[#f7fcf7]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-[#904204] flex items-center justify-center">
                      <TrendingDown className="w-5 h-5 text-white" />
                    </div>
                    <Badge className="bg-red-100 text-red-800">Risk</Badge>
                  </div>
                  <div className="text-2xl font-bold text-[#904204]">
                    {formatCurrency(Math.min(...cashFlowPredictions.map(p => p.endingBalance)))}
                  </div>
                  <p className="text-sm text-[#788c78]">Lowest Point</p>
                </CardContent>
              </Card>
            </div>

            {/* Cash Flow Chart */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0b733c] to-[#18312d] flex items-center justify-center">
                    <LineChart className="w-5 h-5 text-white" />
                  </div>
                  📈 Balance Trend
                </CardTitle>
                <CardDescription>6-month cash flow projection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cashFlowPredictions}>
                      <defs>
                        <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0b733c" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0b733c" stopOpacity={0}/>
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
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="endingBalance"
                        stroke="#0b733c"
                        strokeWidth={3}
                        fill="url(#balanceGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
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
                    <p className="text-white/80">Overall Prediction Accuracy</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Income Predictions</span>
                      <div className="flex items-center gap-2">
                        <Progress value={confidenceMetrics.income} className="w-20 h-2" />
                        <span className="text-sm font-medium">{confidenceMetrics.income}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Expense Forecasts</span>
                      <div className="flex items-center gap-2">
                        <Progress value={confidenceMetrics.expenses} className="w-20 h-2" />
                        <span className="text-sm font-medium">{confidenceMetrics.expenses}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Event Detection</span>
                      <div className="flex items-center gap-2">
                        <Progress value={confidenceMetrics.events} className="w-20 h-2" />
                        <span className="text-sm font-medium">{confidenceMetrics.events}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

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
                  onClick={() => onNavigate('ai-cash-flow-alert-settings')}
                >
                  <Bell className="w-4 h-4 mr-3" />
                  Setup Smart Alerts
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[#c8e9c8] hover:bg-[#f7fcf7]"
                  onClick={() => onNavigate('ai-cash-flow-optimizer')}
                >
                  <Target className="w-4 h-4 mr-3" />
                  Optimize Cash Flow
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[#c8e9c8] hover:bg-[#f7fcf7]"
                  onClick={() => toast.success('Exporting forecast...')}
                >
                  <Download className="w-4 h-4 mr-3" />
                  Export Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forecast Tab */}
          <TabsContent value="forecast" className="space-y-4">
            {/* Income vs Expenses Chart */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0056ac] to-[#004589] flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  📊 Income vs Expenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cashFlowPredictions}>
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
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="income" fill="#0b733c" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expenses" fill="#904204" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#0b733c] rounded"></div>
                    <span className="text-sm text-[#788c78]">Income</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#904204] rounded"></div>
                    <span className="text-sm text-[#788c78]">Expenses</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Breakdown */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#18312d]">💰 Monthly Cash Flow Breakdown</h3>
              {cashFlowPredictions.map((prediction, index) => (
                <Card key={index} className="border-[#eef8ee] shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <div className="font-semibold text-[#18312d]">
                            {prediction.date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </div>
                          <Badge className={`text-xs ${getRiskColor(prediction.riskLevel)}`}>
                            {prediction.riskLevel} risk
                          </Badge>
                        </div>
                        <Separator orientation="vertical" className="h-8" />
                        <div className="grid grid-cols-3 gap-4 flex-1">
                          <div className="text-center">
                            <div className="text-sm text-[#788c78]">Income</div>
                            <div className="font-semibold text-[#0b733c] flex items-center justify-center gap-1">
                              <ArrowUp className="w-3 h-3" />
                              {formatCurrency(prediction.income)}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-[#788c78]">Expenses</div>
                            <div className="font-semibold text-[#904204] flex items-center justify-center gap-1">
                              <ArrowDown className="w-3 h-3" />
                              {formatCurrency(prediction.expenses)}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-[#788c78]">Net Flow</div>
                            <div className={`font-semibold flex items-center justify-center gap-1 ${
                              prediction.netFlow >= 0 ? 'text-[#0b733c]' : 'text-[#904204]'
                            }`}>
                              {prediction.netFlow >= 0 ? (
                                <ArrowUp className="w-3 h-3" />
                              ) : (
                                <ArrowDown className="w-3 h-3" />
                              )}
                              {formatCurrency(Math.abs(prediction.netFlow))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-[#788c78]">Ending Balance</div>
                        <div className={`text-lg font-bold ${getBalanceColor(prediction.endingBalance)}`}>
                          {formatCurrency(prediction.endingBalance)}
                        </div>
                      </div>
                    </div>
                    
                    {prediction.events.length > 0 && (
                      <div className="bg-gradient-to-br from-[#f7fcf7] to-[#eef8ee] p-3 rounded-xl border border-[#c8e9c8]">
                        <div className="text-sm text-[#788c78] mb-1">📅 Expected Events:</div>
                        <div className="text-sm text-[#18312d]">
                          {prediction.events.join(' • ')}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[#18312d]">🚨 Cash Flow Alerts</h3>
                <p className="text-sm text-[#788c78]">AI-detected risks and opportunities</p>
              </div>
              <Badge className="bg-[#904204] text-white">
                {cashFlowAlerts.filter(a => a.type === 'critical').length} Critical
              </Badge>
            </div>

            <div className="space-y-3">
              {cashFlowAlerts.map((alert) => (
                <Card key={alert.id} className={`${getAlertColor(alert.type)} border-2 shadow-lg`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-[#18312d]">{alert.title}</h4>
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(alert.priority)}`}></div>
                          </div>
                          <p className="text-sm text-[#788c78] mb-2">
                            {alert.description}
                          </p>
                          
                          {/* Expandable recommendation */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[#0b733c] hover:bg-[#f7fcf7] p-0 h-auto"
                            onClick={() => setExpandedAlert(
                              expandedAlert === alert.id ? null : alert.id
                            )}
                          >
                            {expandedAlert === alert.id ? (
                              <ChevronDown className="w-4 h-4 mr-1" />
                            ) : (
                              <ChevronRight className="w-4 h-4 mr-1" />
                            )}
                            AI Recommendation
                          </Button>

                          {expandedAlert === alert.id && (
                            <div className="mt-3 p-3 bg-white/70 rounded-xl border border-[#c8e9c8]">
                              <div className="flex items-center gap-2 mb-2">
                                <Brain className="w-4 h-4 text-[#0b733c]" />
                                <span className="font-medium text-[#18312d]">Suggested Action</span>
                              </div>
                              <p className="text-sm text-[#788c78]">{alert.suggestedAction}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-[#788c78]">Impact</div>
                        <div className={`font-bold text-lg ${
                          alert.impact > 0 ? 'text-[#0b733c]' : 'text-[#904204]'
                        }`}>
                          {alert.impact > 0 ? '+' : ''}{formatCurrency(alert.impact)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-[#788c78]">
                        <Calendar className="w-4 h-4" />
                        {alert.date.toLocaleDateString()}
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-[#0b733c] hover:bg-[#0f9950] text-white"
                        onClick={() => toast.success(`Taking action on: ${alert.title}`)}
                      >
                        Take Action
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Expense Breakdown Pie Chart */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8c4a86] to-[#af75aa] flex items-center justify-center">
                    <PieChart className="w-5 h-5 text-white" />
                  </div>
                  🥧 Expense Breakdown
                </CardTitle>
                <CardDescription>Average monthly spending by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={expenseBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {expenseBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [formatCurrency(value as number), 'Amount']}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {expenseBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-sm" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-[#788c78]">{item.name}</span>
                      <span className="text-sm font-medium text-[#18312d] ml-auto">
                        {formatCurrency(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Expenses */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#f06e06] to-[#904204] flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  📅 Upcoming Large Expenses
                </CardTitle>
                <CardDescription>AI-detected bills and expenses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingExpenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 bg-gradient-to-br from-[#f7fcf7] to-[#eef8ee] rounded-xl border border-[#c8e9c8]">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{expense.icon}</div>
                      <div>
                        <h4 className="font-medium text-[#18312d]">{expense.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-[#788c78]">
                          <span>{expense.date.toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{expense.category}</span>
                          {expense.isRecurring && (
                            <>
                              <span>•</span>
                              <Badge variant="outline" className="text-xs">Recurring</Badge>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#904204]">
                        {formatCurrency(expense.amount)}
                      </div>
                      <div className="text-xs text-[#788c78]">
                        {expense.confidence}% confidence
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="border-[#eef8ee] shadow-xl bg-gradient-to-r from-[#8c4a86] to-[#af75aa] text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  ✨ AI Financial Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-300 mt-0.5" />
                  <p className="text-sm text-white/90">
                    Your cash flow shows healthy patterns with consistent income stability
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-300 mt-0.5" />
                  <p className="text-sm text-white/90">
                    June vacation spending requires careful planning to avoid cash flow stress
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-300 mt-0.5" />
                  <p className="text-sm text-white/90">
                    Summer months show strong surplus potential for emergency fund growth
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-purple-300 mt-0.5" />
                  <p className="text-sm text-white/90">
                    Consider automating savings transfers during high-surplus periods
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}