import { useState, useEffect } from 'react';
import { ArrowLeft, Camera, Bell, TrendingUp, Target, Sparkles, DollarSign, AlertTriangle, Calendar, Brain, MessageCircle, CheckCircle2, Upload, Eye, BarChart3, Lightbulb, Bot, Zap, Shield, Mic, MicOff, Settings, Wallet, CreditCard, PiggyBank, TrendingDown, Users, Search, Filter, Clock, ChevronRight, Play, Pause, Volume2, Star, Crown, Award, Flame, Heart, Coffee, Calculator, LineChart, MapPin, ShoppingCart, Gamepad2, Trophy, Gift, Tag, PieChart, FileText, Scan, Copy } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

interface AIAssistantScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface AIInsight {
  id: string;
  type: 'warning' | 'opportunity' | 'success' | 'info' | 'prediction' | 'recommendation';
  title: string;
  description: string;
  action?: string;
  actionText?: string;
  impact?: string;
  confidence: number;
  category: 'coach' | 'prediction' | 'transaction' | 'investment' | 'automation' | 'personalization';
  priority: 'high' | 'medium' | 'low';
  timeframe?: string;
  potentialSavings?: number;
}

interface Conversation {
  id: string;
  type: 'user' | 'ai';
  message: string;
  timestamp: Date;
  suggestions?: string[];
  isVoice?: boolean;
  context?: string;
}

interface PredictiveInsight {
  id: string;
  title: string;
  description: string;
  type: 'cash_flow' | 'bill_forecast' | 'net_worth' | 'goal_prediction' | 'market_trend';
  prediction: string;
  confidence: number;
  timeframe: string;
  action?: string;
  impact?: string;
}

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  type: 'savings' | 'budgeting' | 'bill_pay' | 'categorization' | 'investment';
  enabled: boolean;
  frequency: string;
  lastTriggered?: Date;
  totalSaved?: number;
}

interface PersonalizationProfile {
  userType: 'conservative' | 'balanced' | 'growth' | 'impulsive' | 'conscious_saver';
  spendingPersonality: string;
  riskTolerance: 'low' | 'medium' | 'high';
  primaryGoals: string[];
  communicationStyle: 'formal' | 'casual' | 'motivational' | 'data_driven';
  lifeStage: string;
}

export default function AIAssistantScreen({ onBack, onNavigate }: AIAssistantScreenProps) {
  const [activeTab, setActiveTab] = useState('coach');
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      type: 'ai',
      message: "Hi! I'm your AI Financial Assistant. I've analyzed your spending patterns and found some opportunities to save money. How can I help you today?",
      timestamp: new Date(),
      suggestions: ['Show me savings opportunities', 'Analyze my spending', 'Help me budget', 'What-if scenarios']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [userProfile, setUserProfile] = useState<PersonalizationProfile>({
    userType: 'balanced',
    spendingPersonality: 'Conscious Spender',
    riskTolerance: 'medium',
    primaryGoals: ['Emergency Fund', 'Vacation', 'Retirement'],
    communicationStyle: 'casual',
    lifeStage: 'Young Professional'
  });

  // Enhanced AI Insights with new categories
  const aiInsights: AIInsight[] = [
    {
      id: '1',
      type: 'opportunity',
      title: 'Subscription Optimization Detected',
      description: 'You have 3 streaming services with similar content. You could save $25/month by consolidating.',
      action: 'subscription-audit',
      actionText: 'View Details',
      impact: 'Save $300/year',
      confidence: 92,
      category: 'coach',
      priority: 'medium',
      timeframe: 'This month',
      potentialSavings: 300
    },
    {
      id: '2',
      type: 'warning',
      title: 'Cash Flow Alert',
      description: 'Based on your spending patterns, you might run low on funds around the 23rd. Consider adjusting your budget.',
      action: 'cash-flow-forecast',
      actionText: 'View Forecast',
      impact: 'Avoid overdraft fees',
      confidence: 87,
      category: 'prediction',
      priority: 'high',
      timeframe: 'Next 2 weeks'
    },
    {
      id: '3',
      type: 'recommendation',
      title: 'Smart Portfolio Rebalancing',
      description: 'Your portfolio is 15% overweight in tech stocks. Consider diversifying to reduce risk.',
      action: 'portfolio-analysis',
      actionText: 'Review Portfolio',
      impact: 'Reduce risk by 22%',
      confidence: 88,
      category: 'investment',
      priority: 'medium',
      timeframe: 'This quarter'
    },
    {
      id: '4',
      type: 'success',
      title: 'Merchant Cashback Opportunity',
      description: 'You spent $342 at Target this month. Using the Target RedCard could save you 5% ($17/month).',
      action: 'card-optimization',
      actionText: 'Optimize Cards',
      impact: 'Save $204/year',
      confidence: 95,
      category: 'transaction',
      priority: 'low',
      potentialSavings: 204
    },
    {
      id: '5',
      type: 'info',
      title: 'Auto-Save Triggered',
      description: 'I automatically saved $47 to your emergency fund when you had extra cash from last paycheck.',
      action: 'view-savings',
      actionText: 'View Details',
      impact: 'Emergency fund +3.2%',
      confidence: 100,
      category: 'automation',
      priority: 'low',
      timeframe: 'Last week'
    },
    {
      id: '6',
      type: 'prediction',
      title: 'Goal Achievement Forecast',
      description: 'At your current savings rate, you\'ll reach your vacation goal 6 weeks early. Consider increasing your target!',
      action: 'adjust-goal',
      actionText: 'Adjust Goal',
      impact: 'Reach goal faster',
      confidence: 91,
      category: 'coach',
      priority: 'medium',
      timeframe: 'Next 3 months'
    }
  ];

  const predictiveInsights = [
    {
      title: 'Cash Flow Forecast',
      description: 'Based on your spending patterns, you might run low on funds around the 23rd',
      icon: <TrendingUp className="w-5 h-5" />,
      status: 'warning',
      action: 'View Forecast'
    },
    {
      title: 'Goal Achievement Prediction',
      description: 'You\'re on track to reach your vacation savings goal 2 months early',
      icon: <Target className="w-5 h-5" />,
      status: 'success',
      action: 'Optimize Further'
    },
    {
      title: 'Budget Optimization',
      description: 'I can reallocate $89 from underused categories to boost your emergency fund',
      icon: <BarChart3 className="w-5 h-5" />,
      status: 'opportunity',
      action: 'Apply Changes'
    }
  ];

  // Advanced Predictive Insights
  const enhancedPredictiveInsights: PredictiveInsight[] = [
    {
      id: '1',
      title: 'Cash Flow Forecast',
      description: 'Based on your spending patterns, you might run low on funds around the 23rd',
      type: 'cash_flow',
      prediction: 'Account balance may drop below $200 on March 23rd',
      confidence: 87,
      timeframe: '2 weeks',
      action: 'View detailed forecast',
      impact: 'Avoid overdraft fees ($35 saved)'
    },
    {
      id: '2',
      title: 'Bill Increase Prediction',
      description: 'Your electricity usage suggests a 15% higher bill next month due to recent weather patterns',
      type: 'bill_forecast',
      prediction: 'Electric bill: $142 (up from $123)',
      confidence: 78,
      timeframe: 'Next month',
      action: 'Energy saving tips',
      impact: 'Potential $19 savings'
    },
    {
      id: '3',
      title: 'Net Worth Trajectory',
      description: 'At current savings rate, your net worth will grow 18% this year',
      type: 'net_worth',
      prediction: 'Net worth: $89,500 by December 2025',
      confidence: 82,
      timeframe: '12 months',
      action: 'Optimize growth',
      impact: 'Beat target by $4,500'
    },
    {
      id: '4',
      title: 'Emergency Fund Goal',
      description: 'You\'ll reach your 6-month emergency fund target 3 months ahead of schedule',
      type: 'goal_prediction',
      prediction: 'Goal completion: September 2025',
      confidence: 91,
      timeframe: '6 months',
      action: 'Adjust target',
      impact: 'Consider increasing goal'
    }
  ];

  // Smart Automation Rules
  const automationRules: AutomationRule[] = [
    {
      id: '1',
      name: 'Smart Savings Sweeps',
      description: 'Automatically save spare change and extra income',
      type: 'savings',
      enabled: true,
      frequency: 'Daily',
      lastTriggered: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      totalSaved: 247
    },
    {
      id: '2',
      name: 'Budget Rebalancing',
      description: 'Reallocate unused budget to priority categories',
      type: 'budgeting',
      enabled: false,
      frequency: 'Weekly',
      totalSaved: 150
    },
    {
      id: '3',
      name: 'Bill Payment Optimization',
      description: 'Pay bills on optimal dates to maximize cash flow',
      type: 'bill_pay',
      enabled: true,
      frequency: 'As needed',
      lastTriggered: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: '4',
      name: 'Transaction Categorization',
      description: 'AI-powered smart categorization of transactions',
      type: 'categorization',
      enabled: true,
      frequency: 'Real-time',
      lastTriggered: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: '5',
      name: 'Investment Rebalancing',
      description: 'Automatically rebalance portfolio monthly',
      type: 'investment',
      enabled: false,
      frequency: 'Monthly'
    }
  ];

  const recentActions = [
    {
      id: '1',
      title: 'Receipt Scanned',
      description: 'Grocery receipt for $87.45 added to "Food & Dining"',
      timestamp: '2 minutes ago',
      icon: <Camera className="w-4 h-4" />
    },
    {
      id: '2',
      title: 'Bill Alert',
      description: 'Netflix subscription renewed - $15.99',
      timestamp: '1 hour ago',
      icon: <Bell className="w-4 h-4" />
    },
    {
      id: '3',
      title: 'Smart Save',
      description: 'Automatically saved $23.50 to Emergency Fund',
      timestamp: '2 hours ago',
      icon: <DollarSign className="w-4 h-4" />
    }
  ];

  // Transaction Intelligence Data
  const transactionInsights = [
    {
      id: '1',
      title: 'Unusual Merchant Spending',
      description: 'You spent 300% more than usual at coffee shops this month',
      merchant: 'Starbucks',
      amount: 127,
      category: 'Food & Dining',
      recommendation: 'Consider setting a monthly coffee budget limit',
      confidence: 88
    },
    {
      id: '2',
      title: 'Potential Duplicate Charge',
      description: 'Two similar charges from Netflix detected',
      merchant: 'Netflix',
      amount: 15.99,
      category: 'Entertainment',
      recommendation: 'Check for duplicate subscriptions',
      confidence: 91
    },
    {
      id: '3',
      title: 'Cashback Opportunity Missed',
      description: 'You could have earned 2% cashback using your Discover card at grocery stores',
      merchant: 'Whole Foods',
      amount: 89,
      category: 'Groceries',
      recommendation: 'Use Discover card for grocery purchases',
      confidence: 95
    }
  ];

  // Investment Intelligence Data
  const investmentInsights = [
    {
      id: '1',
      title: 'Portfolio Drift Detection',
      description: 'Your asset allocation has drifted 8% from target',
      impact: 'Higher risk than intended',
      recommendation: 'Rebalance to target allocation',
      urgency: 'medium'
    },
    {
      id: '2',
      title: 'High Fee Alert',
      description: 'Your REIT fund has a 1.2% expense ratio - consider lower-cost alternatives',
      impact: 'Costing $240/year in extra fees',
      recommendation: 'Switch to Vanguard REIT (0.12% ER)',
      urgency: 'low'
    },
    {
      id: '3',
      title: 'Tax Loss Harvesting Opportunity',
      description: 'You have unrealized losses that could offset gains for tax benefits',
      impact: 'Potential $500 tax savings',
      recommendation: 'Harvest losses before year-end',
      urgency: 'high'
    }
  ];

  // Voice Recognition Simulation
  const handleVoiceToggle = () => {
    setIsVoiceMode(!isVoiceMode);
    if (!isVoiceMode) {
      setIsListening(true);
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false);
        const voiceMessage = "Show me my spending trends for this month";
        setInputMessage(voiceMessage);
        handleSendMessage(voiceMessage, true);
      }, 3000);
    } else {
      setIsListening(false);
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'warning': return 'text-[#904204] bg-[#fef1e6]';
      case 'opportunity': return 'text-[#0056ac] bg-[#e6f1fc]';
      case 'success': return 'text-[#0b733c] bg-[#eef8ee]';
      case 'info': return 'text-[#8c4a86] bg-[#f5eef4]';
      case 'prediction': return 'text-[#0b733c] bg-[#eef8ee]';
      case 'recommendation': return 'text-[#0056ac] bg-[#e6f1fc]';
      default: return 'text-[#545e75] bg-[#f6f7f9]';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'opportunity': return <Lightbulb className="w-5 h-5" />;
      case 'success': return <CheckCircle2 className="w-5 h-5" />;
      case 'info': return <Eye className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  const handleSendMessage = (message?: string, isVoice?: boolean) => {
    const messageToSend = message || inputMessage;
    if (!messageToSend.trim()) return;

    const userMessage: Conversation = {
      id: Date.now().toString(),
      type: 'user',
      message: messageToSend,
      timestamp: new Date(),
      isVoice: isVoice || false
    };

    // Enhanced AI response with context
    const aiResponse: Conversation = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      message: getEnhancedAIResponse(messageToSend),
      timestamp: new Date(),
      suggestions: getContextualSuggestions(messageToSend),
      context: getMessageContext(messageToSend)
    };

    setConversations(prev => [...prev, userMessage, aiResponse]);
    setInputMessage('');
  };

  const getEnhancedAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('save') || lowerMessage.includes('saving')) {
      return `Based on your ${userProfile.spendingPersonality} profile, I've identified several saving opportunities! Your biggest potential is in subscription optimization - you could save $300/year. I can also set up automatic savings sweeps that have already saved you $247 this month. Would you like me to show you a detailed breakdown?`;
    } else if (lowerMessage.includes('budget')) {
      return `Given your ${userProfile.userType} approach to finances, I recommend adjusting your dining budget by $150 and reallocating it to your emergency fund. Based on your spending patterns, this won't impact your lifestyle but will boost your financial security by 12%. Shall I apply these changes automatically?`;
    } else if (lowerMessage.includes('spend') || lowerMessage.includes('analysis') || lowerMessage.includes('trends')) {
      return "Your spending analysis shows you're 15% over in entertainment this month, but 20% under in transportation. I've also detected unusual activity at coffee shops ($127 vs usual $42). My AI categorization has processed 47 transactions this week with 96% accuracy. Would you like me to investigate the coffee shop spending?";
    } else if (lowerMessage.includes('goal')) {
      return "Excellent progress! Your vacation savings goal is 3 weeks ahead of schedule. My prediction model shows you'll reach your target by September 15th instead of October 6th. At this rate, you could either reach your goal early or increase it by 25% for a more luxurious trip. I can also optimize your goal allocations automatically.";
    } else if (lowerMessage.includes('invest') || lowerMessage.includes('portfolio')) {
      return `Your portfolio health score is 82/100. I've detected a 15% drift from your target allocation, with tech stocks being overweight. Based on your ${userProfile.riskTolerance} risk tolerance, I recommend rebalancing. I can also identify a tax loss harvesting opportunity worth $500. Should I prepare a rebalancing plan?`;
    } else if (lowerMessage.includes('cash') || lowerMessage.includes('flow')) {
      return "My cash flow prediction shows potential low balance ($200) around March 23rd based on your spending patterns. However, I can automatically optimize your bill payment schedule to prevent this. I've already helped you avoid $35 in overdraft fees this quarter through smart timing.";
    } else if (lowerMessage.includes('automat') || lowerMessage.includes('smart')) {
      return "I'm currently running 4 automation rules for you: Smart Savings Sweeps (saved $247), Transaction Categorization (96% accuracy), and Bill Payment Optimization. I can enable Budget Rebalancing and Investment Rebalancing as well. Which automations interest you most?";
    } else {
      return `As your AI Financial Coach, I'm here to provide personalized guidance for your ${userProfile.lifeStage} situation. I can analyze spending patterns, predict cash flow, optimize investments, automate savings, and help you reach your goals faster. My AI learns from your behavior to provide increasingly personalized advice. What would you like to explore?`;
    }
  };

  const getContextualSuggestions = (message: string): string[] => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('save') || lowerMessage.includes('saving')) {
      return ['Show me the breakdown', 'Enable auto-savings', 'Find more opportunities', 'Set savings goal'];
    } else if (lowerMessage.includes('budget')) {
      return ['Apply changes', 'Show budget details', 'Optimize categories', 'Set budget alerts'];
    } else if (lowerMessage.includes('spend') || lowerMessage.includes('analysis')) {
      return ['Investigate coffee spending', 'Show merchant trends', 'Set spending alerts', 'Optimize cashback'];
    } else if (lowerMessage.includes('invest') || lowerMessage.includes('portfolio')) {
      return ['Rebalance portfolio', 'Tax loss harvesting', 'Investment analysis', 'Risk assessment'];
    } else {
      return ['Analyze my finances', 'Show predictions', 'Optimize savings', 'Investment advice'];
    }
  };

  const getMessageContext = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('save')) return 'savings_optimization';
    if (lowerMessage.includes('budget')) return 'budget_management';
    if (lowerMessage.includes('spend')) return 'spending_analysis';
    if (lowerMessage.includes('invest')) return 'investment_advice';
    if (lowerMessage.includes('goal')) return 'goal_tracking';
    return 'general_assistance';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fcf7] via-[#fafdfa] to-[#eef8ee]">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-[#eef8ee] z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBack}
              className="hover:bg-[#f7fcf7] rounded-xl"
            >
              <ArrowLeft className="w-5 h-5 text-[#18312d]" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0f9950] via-[#18312d] to-[#0b733c] flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#18312d]">AI Financial Guru ✨</h1>
                <p className="text-sm text-[#788c78] font-medium">Your smart money companion</p>
              </div>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-[#eef8ee] to-[#dbf0e5] text-[#0b733c] border-[#c8e9c8] px-3 py-1 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-[#0f9950] rounded-full mr-2 animate-pulse"></div>
            <span className="font-semibold">Live</span>
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-white/60 backdrop-blur-sm border border-[#eef8ee] rounded-2xl p-1 shadow-lg">
            <TabsTrigger 
              value="coach" 
              className="text-sm font-semibold rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0f9950] data-[state=active]:to-[#18312d] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              🧠 Coach
            </TabsTrigger>
            <TabsTrigger 
              value="predict" 
              className="text-sm font-semibold rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0f9950] data-[state=active]:to-[#18312d] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              🔮 Predict
            </TabsTrigger>
            <TabsTrigger 
              value="automate" 
              className="text-sm font-semibold rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0f9950] data-[state=active]:to-[#18312d] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              ⚡ Auto
            </TabsTrigger>
            <TabsTrigger 
              value="chat" 
              className="text-sm font-semibold rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0f9950] data-[state=active]:to-[#18312d] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              💬 Chat
            </TabsTrigger>
          </TabsList>

          {/* Smart Financial Coach Tab */}
          <TabsContent value="coach" className="space-y-4">
            {/* Receipt Scanner Feature - Standalone */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/70 backdrop-blur-sm rounded-3xl">
              <CardContent className="p-6">
                <div className="bg-[#f7fcf7] border border-[#eef8ee] rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#0b733c] rounded-2xl flex items-center justify-center">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#18312d]">Receipt Scanner Detected</h4>
                        <p className="text-xs text-[#788c78]">AI-powered receipt processing available</p>
                      </div>
                    </div>
                    <Badge className="bg-[#0b733c] text-white hover:bg-[#0f9950]">New!</Badge>
                  </div>
                  <div className="mb-3">
                    <p className="text-xs text-[#788c78]">
                      ✨ Scan receipts with AI for instant categorization and expense tracking
                    </p>
                  </div>
                  <Button 
                    onClick={() => onNavigate('ai-receipt-scanner')}
                    className="w-full bg-[#18312d] hover:bg-[#1a3430] text-white rounded-xl"
                  >
                    📱 Scan Receipt Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/70 backdrop-blur-sm rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0f9950] to-[#18312d] flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold">Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center gap-3 border-[#c8e9c8] hover:bg-gradient-to-br hover:from-[#f7fcf7] hover:to-[#eef8ee] hover:border-[#0f9950] rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105"
                    onClick={() => onNavigate('ai-smart-savings')}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#f7fcf7] flex items-center justify-center">
                      <PiggyBank className="w-6 h-6 text-[#18312d]" />
                    </div>
                    <span className="text-sm font-semibold text-[#18312d]">🐷 Smart Savings</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center gap-3 border-[#c8e9c8] hover:bg-gradient-to-br hover:from-[#f7fcf7] hover:to-[#eef8ee] hover:border-[#0f9950] rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105"
                    onClick={() => onNavigate('ai-cash-flow-detail')}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#f7fcf7] flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-[#18312d]" />
                    </div>
                    <span className="text-sm font-semibold text-[#18312d]">📈 Investment AI</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center gap-3 border-[#c8e9c8] hover:bg-gradient-to-br hover:from-[#f7fcf7] hover:to-[#eef8ee] hover:border-[#0f9950] rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105"
                    onClick={() => onNavigate('ai-debt-management')}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#f7fcf7] flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-[#18312d]" />
                    </div>
                    <span className="text-sm font-semibold text-[#18312d]">💳 Debt Manager</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center gap-3 border-[#c8e9c8] hover:bg-gradient-to-br hover:from-[#f7fcf7] hover:to-[#eef8ee] hover:border-[#0f9950] rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105"
                    onClick={() => onNavigate('ai-bill-analysis')}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#f7fcf7] flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-[#18312d]" />
                    </div>
                    <span className="text-sm font-semibold text-[#18312d]">📊 Bill Analysis</span>
                  </Button>
                </div>
              </CardContent>
            </Card>


            {/* AI Insights */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/70 backdrop-blur-sm rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#af75aa] to-[#8c4a86] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold">✨ Smart Insights</span>
                </CardTitle>
                <CardDescription className="text-[#788c78] font-medium">AI-powered recommendations based on your financial data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {aiInsights.map((insight) => (
                  <div key={insight.id} className="border border-[#eef8ee] rounded-2xl p-5 space-y-4 hover:border-[#c8e9c8] transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-white/50 to-[#f7fcf7]/30">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-2xl ${getInsightColor(insight.type)} shadow-sm`}>
                          {getInsightIcon(insight.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[#18312d] mb-2">{insight.title}</h4>
                          <p className="text-sm text-[#788c78] leading-relaxed">{insight.description}</p>
                          {insight.impact && (
                            <div className="mt-3 px-3 py-2 bg-gradient-to-r from-[#eef8ee] to-[#dbf0e5] rounded-xl border border-[#c8e9c8]">
                              <p className="text-sm font-bold text-[#0b733c]">💰 {insight.impact}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-[#788c78] mb-1 font-medium">Confidence</div>
                        <div className="text-lg font-bold text-[#18312d]">{insight.confidence}%</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex-1 mr-4">
                        <Progress value={insight.confidence} className="w-full h-3 [&>div]:bg-gradient-to-r [&>div]:from-[#0f9950] [&>div]:to-[#18312d] rounded-xl" />
                      </div>
                      {insight.actionText && (
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-[#0f9950] to-[#18312d] hover:from-[#0e8a48] hover:to-[#1a3430] text-white font-semibold px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                          onClick={() => {
                            if (insight.action === 'subscription-audit') {
                              onNavigate('ai-subscription-audit');
                            } else if (insight.action === 'cash-flow-forecast') {
                              onNavigate('ai-cash-flow-forecast');
                            } else if (insight.action === 'portfolio-analysis') {
                              onNavigate('ai-investment-advisor');
                            } else if (insight.action === 'card-optimization') {
                              onNavigate('ai-credit-card-optimizer');
                            } else if (insight.action === 'view-savings') {
                              onNavigate('ai-smart-savings');
                            } else if (insight.action === 'adjust-goal') {
                              onNavigate('ai-goal-forecast');
                            } else if (insight.action === 'budget-adjustment') {
                              onNavigate('ai-budget-optimizer');
                            } else if (insight.action === 'auto-save') {
                              onNavigate('ai-smart-savings');
                            }
                          }}
                        >
                          {insight.actionText}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent AI Actions */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/70 backdrop-blur-sm rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0b733c] to-[#18312d] flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold">🕒 Recent AI Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActions.map((action) => (
                  <div key={action.id} className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#fafdfa] to-[#f7fcf7] rounded-2xl border border-[#eef8ee] hover:border-[#c8e9c8] transition-all duration-300 hover:shadow-md">
                    <div className="p-2 bg-white rounded-xl border border-[#c8e9c8] shadow-sm">
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-[#18312d]">{action.title}</h4>
                      <p className="text-xs text-[#788c78] font-medium mt-1">{action.description}</p>
                    </div>
                    <span className="text-xs text-[#a0baa0] font-semibold bg-[#eef8ee] px-2 py-1 rounded-lg">{action.timestamp}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Predictive Intelligence Tab */}
          <TabsContent value="predict" className="space-y-4">
            {/* Enhanced Predictive Insights */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/70 backdrop-blur-sm rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#af75aa] to-[#8c4a86] flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold">🔮 Predictive Intelligence</span>
                </CardTitle>
                <CardDescription className="text-[#788c78] font-medium">AI-powered forecasting and future planning</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {enhancedPredictiveInsights.map((insight) => (
                  <div key={insight.id} className="border border-[#eef8ee] rounded-lg p-4 space-y-3 hover:border-[#c8e9c8] transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{insight.title}</h4>
                          <Badge variant="outline" className="text-xs border-[#c8e9c8] text-[#18312d]">
                            {insight.confidence}% confidence
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                        <div className="bg-[#e6f1fc] p-3 rounded-lg mb-3 border border-[#b0d4f7]">
                          <p className="text-sm font-medium text-[#0056ac]">{insight.prediction}</p>
                        </div>
                        {insight.impact && (
                          <p className="text-sm text-[#0b733c] font-medium">{insight.impact}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{insight.timeframe}</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]"
                        onClick={() => {
                          if (insight.type === 'cash_flow') onNavigate('ai-cash-flow-detail');
                          else if (insight.type === 'bill_forecast') onNavigate('ai-bill-analysis');
                          else if (insight.type === 'net_worth') onNavigate('ai-portfolio-review');
                          else if (insight.type === 'goal_prediction') onNavigate('ai-goal-forecast');
                        }}
                      >
                        {insight.action}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Transaction Intelligence */}
            <Card className="border-[#eef8ee] shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#f06e06]" />
                  Transaction Intelligence
                </CardTitle>
                <CardDescription>AI-driven transaction insights and patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {transactionInsights.map((insight) => (
                  <div key={insight.id} className="border border-[#eef8ee] rounded-lg p-4 hover:border-[#c8e9c8] transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-medium">{insight.merchant}</span>
                          <span className="text-[#0b733c] font-medium">${insight.amount}</span>
                          <Badge variant="secondary" className="bg-[#f7fcf7] text-[#18312d] border-[#c8e9c8]">{insight.category}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Confidence</div>
                        <div className="text-sm font-medium">{insight.confidence}%</div>
                      </div>
                    </div>
                    <div className="bg-[#e6f1fc] p-3 rounded-lg mb-3 border border-[#b0d4f7]">
                      <p className="text-sm text-[#0056ac]">{insight.recommendation}</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]"
                    >
                      View Details
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Investment & Wealth AI */}
            <Card className="border-[#eef8ee] shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#0b733c]" />
                  Investment Intelligence
                </CardTitle>
                <CardDescription>AI-powered investment insights and optimization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {investmentInsights.map((insight) => (
                  <div key={insight.id} className="border border-[#eef8ee] rounded-lg p-4 hover:border-[#c8e9c8] transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{insight.title}</h4>
                          <Badge variant={
                            insight.urgency === 'high' ? 'destructive' : 
                            insight.urgency === 'medium' ? 'default' : 
                            'secondary'
                          } className={
                            insight.urgency === 'high' ? 'bg-[#fbe8ea] text-[#9e1420] border-[#f1b8bd]' :
                            insight.urgency === 'medium' ? 'bg-[#e6f1fc] text-[#0056ac] border-[#b0d4f7]' :
                            'bg-[#f7fcf7] text-[#18312d] border-[#c8e9c8]'
                          }>
                            {insight.urgency} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                        <p className="text-sm font-medium text-[#0056ac]">{insight.impact}</p>
                      </div>
                    </div>
                    <div className="bg-[#eef8ee] p-3 rounded-lg mb-3 border border-[#c8e9c8]">
                      <p className="text-sm text-[#0b733c]">{insight.recommendation}</p>
                    </div>
                    <Button 
                      size="sm" 
                      className={insight.urgency === 'high' ? 'bg-[#18312d] hover:bg-[#1a3430] text-white w-full' : 'w-full border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]'}
                      variant={insight.urgency === 'high' ? 'default' : 'outline'}
                    >
                      Take Action
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* What-If Scenarios */}
            <Card className="border-[#eef8ee] shadow-sm">
              <CardHeader>
                <CardTitle>"What-If" Scenarios</CardTitle>
                <CardDescription>Explore different financial scenarios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]"
                  onClick={() => onNavigate('ai-what-if-scenarios')}
                >
                  What if I increase my 401k contribution by 2%?
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]"
                  onClick={() => onNavigate('ai-what-if-scenarios')}
                >
                  What if I get a $5,000 raise?
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]"
                  onClick={() => onNavigate('ai-what-if-scenarios')}
                >
                  What if I pay off my credit card early?
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]"
                  onClick={() => onNavigate('ai-what-if-scenarios')}
                >
                  What if I move to a cheaper apartment?
                </Button>
              </CardContent>
            </Card>

            {/* Budget Forecasting */}
            <Card className="border-[#eef8ee] shadow-sm">
              <CardHeader>
                <CardTitle>Smart Budget Adjustments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-[#e6f1fc] rounded-lg border border-[#b0d4f7]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Dining Out</span>
                    <span className="text-sm text-[#0056ac] font-medium">-$75</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Reduce to avoid overspending</div>
                </div>
                <div className="p-3 bg-[#eef8ee] rounded-lg border border-[#c8e9c8]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Emergency Fund</span>
                    <span className="text-sm text-[#0b733c] font-medium">+$75</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Boost your safety net</div>
                </div>
                <Button 
                  className="w-full bg-[#18312d] hover:bg-[#1a3430] text-white"
                  onClick={() => onNavigate('ai-budget-optimizer')}
                >
                  Apply AI Recommendations
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations & Automations Tab */}
          <TabsContent value="automate" className="space-y-4">
            {/* Smart Automation Rules */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/70 backdrop-blur-sm rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#f06e06] to-[#d86305] flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold">⚡ Smart Automation Rules</span>
                </CardTitle>
                <CardDescription className="text-[#788c78] font-medium">AI-powered automation to optimize your finances</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {automationRules.map((rule) => (
                  <div key={rule.id} className="border border-[#eef8ee] rounded-lg p-4 hover:border-[#c8e9c8] transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          rule.type === 'savings' ? 'bg-[#eef8ee] text-[#0b733c]' :
                          rule.type === 'budgeting' ? 'bg-[#e6f1fc] text-[#0056ac]' :
                          rule.type === 'bill_pay' ? 'bg-[#f5eef4] text-[#8c4a86]' :
                          rule.type === 'categorization' ? 'bg-[#fef1e6] text-[#904204]' :
                          'bg-[#e6f1fc] text-[#0056ac]'
                        }`}>
                          {rule.type === 'savings' && <PiggyBank className="w-4 h-4" />}
                          {rule.type === 'budgeting' && <BarChart3 className="w-4 h-4" />}
                          {rule.type === 'bill_pay' && <Calendar className="w-4 h-4" />}
                          {rule.type === 'categorization' && <Tag className="w-4 h-4" />}
                          {rule.type === 'investment' && <TrendingUp className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{rule.name}</h4>
                          <p className="text-sm text-muted-foreground">{rule.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>Frequency: {rule.frequency}</span>
                            {rule.totalSaved && <span className="text-[#0b733c] font-medium">Saved: ${rule.totalSaved}</span>}
                            {rule.lastTriggered && (
                              <span>Last: {rule.lastTriggered.toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Switch 
                        checked={rule.enabled}
                        onCheckedChange={(checked) => {
                          // Handle automation toggle
                          console.log(`Toggle ${rule.name}: ${checked}`);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Hyper-Personalization Engine */}
            <Card className="border-[#eef8ee] shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#af75aa]" />
                  Personalization Profile
                </CardTitle>
                <CardDescription>AI learns your preferences for better recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-[#e6f1fc] rounded-lg border border-[#b0d4f7]">
                    <div className="text-sm font-medium text-[#0056ac] mb-1">User Type</div>
                    <div className="text-sm text-[#004589]">{userProfile.userType}</div>
                  </div>
                  <div className="p-3 bg-[#eef8ee] rounded-lg border border-[#c8e9c8]">
                    <div className="text-sm font-medium text-[#0b733c] mb-1">Risk Tolerance</div>
                    <div className="text-sm text-[#095c30]">{userProfile.riskTolerance}</div>
                  </div>
                  <div className="p-3 bg-[#f5eef4] rounded-lg border border-[#e0c9de]">
                    <div className="text-sm font-medium text-[#8c4a86] mb-1">Life Stage</div>
                    <div className="text-sm text-[#7c4277]">{userProfile.lifeStage}</div>
                  </div>
                  <div className="p-3 bg-[#fef1e6] rounded-lg border border-[#fad2b2]">
                    <div className="text-sm font-medium text-[#904204] mb-1">Communication</div>
                    <div className="text-sm text-[#6c3103]">{userProfile.communicationStyle}</div>
                  </div>
                </div>
                
                <div className="p-3 bg-[#f6f7f9] rounded-lg border border-[#d6dbe6]">
                  <div className="text-sm font-medium text-[#545e75] mb-2">Primary Goals</div>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.primaryGoals.map((goal, index) => (
                      <Badge key={index} variant="secondary" className="bg-[#f7fcf7] text-[#18312d] border-[#c8e9c8]">{goal}</Badge>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-[#e6f1fc] rounded-lg border border-[#b0d4f7]">
                  <div className="text-sm font-medium text-[#0056ac] mb-1">Spending Personality</div>
                  <div className="text-sm text-[#004589]">{userProfile.spendingPersonality}</div>
                </div>

                <Button variant="outline" className="w-full border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]">
                  <Settings className="w-4 h-4 mr-2" />
                  Update Preferences
                </Button>
              </CardContent>
            </Card>

            {/* Action-Oriented AI */}
            <Card className="border-[#eef8ee] shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#d31b2b]" />
                  Action Center
                </CardTitle>
                <CardDescription>AI-suggested actions for your financial goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border border-[#f1b8bd] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#d31b2b] rounded-full"></div>
                      <span className="font-medium text-sm">High Priority</span>
                    </div>
                    <Badge className="bg-[#fbe8ea] text-[#9e1420] border-[#f1b8bd]">Action Required</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Review your Netflix subscription - price increased 20%
                  </p>
                  <Button size="sm" className="w-full bg-[#18312d] hover:bg-[#1a3430] text-white">
                    Review Subscription
                  </Button>
                </div>

                <div className="p-3 border border-[#b0d4f7] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#f06e06] rounded-full"></div>
                      <span className="font-medium text-sm">Medium Priority</span>
                    </div>
                    <Badge className="bg-[#e6f1fc] text-[#0056ac] border-[#b0d4f7]">Opportunity</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Switch to high-yield savings account - earn $156 more per year
                  </p>
                  <Button size="sm" variant="outline" className="w-full border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]">
                    Explore Options
                  </Button>
                </div>

                <div className="p-3 border border-[#c8e9c8] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#0f9950] rounded-full"></div>
                      <span className="font-medium text-sm">Low Priority</span>
                    </div>
                    <Badge className="bg-[#f7fcf7] text-[#18312d] border-[#c8e9c8]">Suggestion</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Consider increasing emergency fund target to 6 months
                  </p>
                  <Button size="sm" variant="outline" className="w-full border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]">
                    Adjust Goal
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Goal Automation */}
            <Card className="border-[#eef8ee] shadow-sm">
              <CardHeader>
                <CardTitle>Goal-Based Automation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border border-[#eef8ee] rounded-lg hover:border-[#c8e9c8] transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Vacation Fund</span>
                    <span className="text-sm text-[#0056ac] font-medium">Auto-save $200/month</span>
                  </div>
                  <Progress value={68} className="h-2 [&>div]:bg-[#18312d]" />
                  <div className="text-sm text-muted-foreground mt-2">68% complete • 3 months ahead</div>
                </div>
                <div className="p-3 border border-[#eef8ee] rounded-lg hover:border-[#c8e9c8] transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Emergency Fund</span>
                    <span className="text-sm text-[#0b733c] font-medium">Auto-save $150/month</span>
                  </div>
                  <Progress value={45} className="h-2 [&>div]:bg-[#18312d]" />
                  <div className="text-sm text-muted-foreground mt-2">45% complete • On track</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Conversational Finance Assistant Tab */}
          <TabsContent value="chat" className="space-y-4">
            {/* Voice Controls */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/70 backdrop-blur-sm rounded-3xl">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl transition-all duration-300 ${isVoiceMode ? 'bg-gradient-to-tr from-[#0f9950] to-[#18312d] shadow-lg' : 'bg-[#f6f7f9]'}`}>
                      <Mic className={`w-6 h-6 ${isVoiceMode ? 'text-white' : 'text-[#545e75]'}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#18312d]">🎤 Voice Assistant</h4>
                      <p className="text-sm text-[#788c78] font-medium">
                        {isVoiceMode ? (isListening ? '🔴 Listening...' : '✅ Voice mode active') : 'Tap to enable voice'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={isVoiceMode ? 'default' : 'outline'}
                    size="sm"
                    className={isVoiceMode ? 'bg-gradient-to-r from-[#0f9950] to-[#18312d] hover:from-[#0e8a48] hover:to-[#1a3430] text-white font-semibold rounded-xl shadow-lg' : 'border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950] rounded-xl'}
                    onClick={handleVoiceToggle}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                </div>
                {isListening && (
                  <div className="mt-4 flex items-center gap-3 p-3 bg-gradient-to-r from-[#eef8ee] to-[#f7fcf7] rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-1 h-4 bg-gradient-to-t from-[#0f9950] to-[#18312d] rounded-full animate-pulse"></div>
                      <div className="w-1 h-6 bg-gradient-to-t from-[#0f9950] to-[#18312d] rounded-full animate-pulse delay-100"></div>
                      <div className="w-1 h-3 bg-gradient-to-t from-[#0f9950] to-[#18312d] rounded-full animate-pulse delay-200"></div>
                      <div className="w-1 h-5 bg-gradient-to-t from-[#0f9950] to-[#18312d] rounded-full animate-pulse delay-300"></div>
                    </div>
                    <span className="text-sm font-semibold text-[#18312d]">💬 Say something...</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="flex flex-col h-[500px] border-[#eef8ee] shadow-xl bg-white/70 backdrop-blur-sm rounded-3xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3 text-[#18312d]">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0056ac] to-[#004589] flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-lg font-bold">💬 AI Financial Coach</span>
                    </CardTitle>
                    <CardDescription className="text-[#788c78] font-medium">Your personal finance assistant with voice support</CardDescription>
                  </div>
                  <Badge className="bg-gradient-to-r from-[#eef8ee] to-[#dbf0e5] text-[#0b733c] border-[#c8e9c8] px-3 py-1 rounded-full shadow-sm">
                    <div className="w-2 h-2 bg-[#0f9950] rounded-full mr-2 animate-pulse"></div>
                    <span className="font-semibold">Online</span>
                  </Badge>
                </div>
              </CardHeader>
              
              {/* Chat Messages */}
              <ScrollArea className="flex-1 px-4">
                <div className="space-y-4">
                  {conversations.map((conv) => (
                    <div key={conv.id} className={`flex ${conv.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] ${conv.type === 'user' ? 'ml-4' : 'mr-4'}`}>
                        <div className="flex items-start gap-2 mb-1">
                          {conv.type === 'ai' && (
                            <Avatar className="w-8 h-8 flex-shrink-0">
                              <AvatarFallback className="bg-gradient-to-r from-[#0f9950] to-[#18312d] text-white text-xs">
                                <Bot className="w-5 h-5" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                          {conv.type === 'user' && conv.isVoice && (
                            <div className="flex items-center justify-end w-full mb-1">
                              <Mic className="w-4 h-4 text-blue-500 mr-2" />
                            </div>
                          )}
                          <div className={`p-4 rounded-2xl shadow-sm ${
                            conv.type === 'user' 
                              ? 'bg-gradient-to-r from-[#0f9950] to-[#18312d] text-white rounded-br-md' 
                              : 'bg-gradient-to-r from-white to-[#f7fcf7] border border-[#eef8ee] rounded-bl-md text-[#18312d]'
                          }`}>
                            <p className="text-sm leading-relaxed font-medium">{conv.message}</p>
                            {conv.context && (
                              <div className="mt-2 px-3 py-1 bg-black/10 rounded-lg text-xs opacity-70 font-medium">
                                Context: {conv.context.replace('_', ' ')}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {conv.suggestions && (
                          <div className="flex flex-wrap gap-2 mt-3 ml-10">
                            {conv.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs h-8 rounded-full border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950] font-semibold"
                                onClick={() => setInputMessage(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Quick Actions */}
              <div className="px-4 py-3 border-t border-[#eef8ee] bg-gradient-to-r from-[#fafdfa] to-[#f7fcf7]">
                <div className="flex gap-2 overflow-x-auto">
                  <Button variant="outline" size="sm" className="whitespace-nowrap border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950] rounded-xl font-semibold" onClick={() => setInputMessage("What's my spending this month?")}>
                    <BarChart3 className="w-3 h-3 mr-1" />
                    📊 Spending
                  </Button>
                  <Button variant="outline" size="sm" className="whitespace-nowrap border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950] rounded-xl font-semibold" onClick={() => setInputMessage("How are my goals progressing?")}>
                    <Target className="w-3 h-3 mr-1" />
                    🎯 Goals
                  </Button>
                  <Button variant="outline" size="sm" className="whitespace-nowrap border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950] rounded-xl font-semibold" onClick={() => setInputMessage("Find ways to save money")}>
                    <PiggyBank className="w-3 h-3 mr-1" />
                    💰 Save
                  </Button>
                  <Button variant="outline" size="sm" className="whitespace-nowrap border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950] rounded-xl font-semibold" onClick={() => setInputMessage("Analyze my investments")}>
                    <TrendingUp className="w-3 h-3 mr-1" />
                    📈 Invest
                  </Button>
                </div>
              </div>
              
              {/* Chat Input */}
              <div className="p-4 border-t border-[#eef8ee]">
                <div className="flex gap-3">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={isVoiceMode ? "🎤 Speak or type your question..." : "💬 Ask me about your finances..."}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 rounded-2xl border-[#c8e9c8] focus:border-[#0f9950] font-medium"
                  />
                  <Button 
                    variant="outline"
                    size="icon"
                    onClick={handleVoiceToggle}
                    className={`rounded-xl ${isVoiceMode ? 'bg-gradient-to-r from-[#eef8ee] to-[#dbf0e5] border-[#0f9950]' : 'border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]'}`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    size="icon"
                    className="bg-gradient-to-r from-[#0f9950] to-[#18312d] hover:from-[#0e8a48] hover:to-[#1a3430] text-white rounded-xl shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}