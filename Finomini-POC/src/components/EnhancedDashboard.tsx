import { useState, useMemo, useCallback } from 'react';
import { Calendar, Settings, Bell, User, Eye, EyeOff, TrendingUp, TrendingDown, RefreshCw, ChevronRight, Plus, Filter, Grip, X, Check, GripVertical, Move, Target, Brain, Flame, Trophy, Lightbulb, Star, AlertTriangle, DollarSign, Bot, Gamepad2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AIGameModal from './AIGameModal';

interface EnhancedDashboardProps {
  onNavigate: (screen: string, data?: any) => void;
}

// Mock account data for the dashboard
const mockAccounts = [
  {
    id: '1',
    name: 'Chase Checking',
    institution: 'Chase Bank',
    logo: '🏦',
    balance: 5584.00,
    type: 'checking',
    category: 'liquid',
    status: 'connected',
    lastSync: new Date(Date.now() - 5 * 60 * 1000)
  },
  {
    id: '2',
    name: 'High Yield Savings',
    institution: 'Marcus',
    logo: '💰',
    balance: 15420.75,
    type: 'savings',
    category: 'liquid',
    status: 'connected',
    lastSync: new Date(Date.now() - 2 * 60 * 1000)
  },
  {
    id: '3',
    name: 'Fidelity 401(k)',
    institution: 'Fidelity',
    logo: '📈',
    balance: 45678.90,
    type: 'investment',
    category: 'investment',
    status: 'connected',
    lastSync: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    id: '4',
    name: 'Freedom Unlimited',
    institution: 'Chase',
    logo: '💳',
    balance: -1378.00,
    type: 'credit',
    category: 'debt',
    status: 'needs_attention',
    lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '5',
    name: 'Emergency Fund',
    institution: 'Manual',
    logo: '💵',
    balance: 568.00,
    type: 'cash',
    category: 'manual',
    status: 'manual',
    lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000)
  },
  {
    id: '6',
    name: 'Wells Fargo Mortgage',
    institution: 'Wells Fargo',
    logo: '🏠',
    balance: -285450.00,
    type: 'mortgage',
    category: 'debt',
    status: 'connected',
    lastSync: new Date(Date.now() - 60 * 60 * 1000)
  }
];

// Mock notifications data
const mockNotifications = [
  { id: '1', type: 'low_balance', title: 'Low Balance Alert', message: 'Your checking account is below $1,000', unread: true },
  { id: '2', type: 'bill_due', title: 'Bill Due Soon', message: 'Netflix payment due in 2 days', unread: true },
  { id: '3', type: 'connection', title: 'Account Needs Attention', message: 'Chase Freedom Unlimited requires login update', unread: false }
];

// Mock spending data by category
const spendingData = [
  { category: 'Food & Dining', amount: 450, budget: 600, color: 'bg-blue-500' },
  { category: 'Transportation', amount: 320, budget: 400, color: 'bg-green-500' },
  { category: 'Shopping', amount: 180, budget: 300, color: 'bg-yellow-500' },
  { category: 'Entertainment', amount: 120, budget: 200, color: 'bg-purple-500' }
];

// Mock vendor spending data
const vendorSpendingData = [
  { vendor: 'Amazon', amount: 234, logo: '📦', color: 'bg-orange-500', category: 'Shopping' },
  { vendor: 'Starbucks', amount: 127, logo: '☕', color: 'bg-green-600', category: 'Food & Dining' },
  { vendor: 'Uber', amount: 89, logo: '🚗', color: 'bg-black', category: 'Transportation' },
  { vendor: 'Netflix', amount: 65, logo: '🎬', color: 'bg-red-500', category: 'Entertainment' },
  { vendor: 'Target', amount: 156, logo: '🎯', color: 'bg-red-600', category: 'Shopping' }
];

// Mock recent transactions
const recentTransactions = [
  { id: '1', merchant: 'Starbucks', amount: -5.47, category: 'Food & Dining', icon: '☕', date: new Date() },
  { id: '2', merchant: 'Amazon', amount: -89.99, category: 'Shopping', icon: '📦', date: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  { id: '3', merchant: 'Salary Deposit', amount: 3500.00, category: 'Income', icon: '💰', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) }
];

// Mock upcoming payments
const upcomingPayments = [
  { id: '1', name: 'Netflix', amount: 15.99, dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), icon: '🎬', color: 'bg-red-500' },
  { id: '2', name: 'Spotify', amount: 9.99, dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), icon: '🎵', color: 'bg-green-500' },
  { id: '3', name: 'Internet', amount: 79.99, dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), icon: '🌐', color: 'bg-blue-500' }
];

// Mock goals data for dashboard
const mockGoals = [
  {
    id: '1',
    name: 'Dream Home Down Payment',
    icon: '🏡',
    targetAmount: 50000,
    currentAmount: 35000,
    status: 'on-track'
  },
  {
    id: '2', 
    name: 'Emergency Fund',
    icon: '🛡️',
    targetAmount: 15000,
    currentAmount: 12500,
    status: 'ahead'
  },
  {
    id: '3',
    name: 'New Car',
    icon: '🚗',
    targetAmount: 25000,
    currentAmount: 8000,
    status: 'behind'
  }
];

// Mock categories data for dashboard
const mockCategories = [
  {
    id: '1',
    name: 'Grocery',
    icon: '🍎',
    spent: 450,
    budget: 600,
    progress: 75,
    status: 'on-track'
  },
  {
    id: '2',
    name: 'Transportation',
    icon: '🚗',
    spent: 320,
    budget: 400,
    progress: 80,
    status: 'warning'
  },
  {
    id: '3',
    name: 'Utilities',
    icon: '💡',
    spent: 180,
    budget: 300,
    progress: 60,
    status: 'on-track'
  }
];

// Mock insights data for dashboard
const mockInsights = [
  {
    id: '1',
    type: 'spending',
    headline: "You're Crushing Your Groceries Budget!",
    keyDataPoint: "$50 Under Budget",
    description: "You spent 15% less on groceries this month compared to your average.",
    icon: '🛒',
    color: '#22C55E',
    priority: 'medium',
    isNew: true
  },
  {
    id: '2',
    type: 'security',
    headline: "Spotting an Unusual Expense?",
    keyDataPoint: "$127 Coffee Shop",
    description: "You spent $127 at 'Downtown Coffee' yesterday - that's 5x your usual amount.",
    icon: '⚠️',
    color: '#EF4444',
    priority: 'high',
    isNew: true
  },
  {
    id: '3',
    type: 'saving',
    headline: "Time to Boost Your Emergency Fund!",
    keyDataPoint: "+$250 Available",
    description: "You're $250 under budget this month. Consider adding to your emergency fund.",
    icon: '🏦',
    color: '#3B82F6',
    priority: 'medium',
    isNew: false
  }
];

// Mock achievements data for dashboard
const mockAchievements = [
  {
    id: '1',
    title: 'Budget Master',
    description: 'Stayed under budget for 3 consecutive months',
    icon: '👑',
    badge: '🏆',
    rarity: 'rare',
    points: 250,
    dateAchieved: '2025-01-25'
  },
  {
    id: '2',
    title: 'Hot Streak',
    description: 'Daily insight streak of 7 days',
    icon: '🔥',
    badge: '🔥',
    rarity: 'common',
    points: 150,
    dateAchieved: '2025-01-27'
  }
];

// Gamification stats
const gamificationStats = {
  dailyStreak: 5,
  totalPoints: 1250,
  nextRewardIn: 3,
  wellnessScore: 78
};

// Dashboard sections configuration
interface DashboardSection {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const dashboardSections: DashboardSection[] = [
  { id: 'insights', title: 'Your Coach', description: 'Personalized financial insights and achievements', icon: '🧠' },
  { id: 'ai-features', title: 'AI-Powered Features', description: 'Smart financial tools and receipt scanning', icon: '🤖' },
  { id: 'accounts', title: 'My Accounts', description: 'View account balances and summaries', icon: '💼' },
  { id: 'categories', title: 'Categories', description: 'Track spending by category', icon: '📂' },
  { id: 'goals', title: 'Financial Goals', description: 'Track your savings progress', icon: '🎯' },
  { id: 'payments', title: 'Upcoming Payments', description: 'See bills and subscriptions due', icon: '📅' },
  { id: 'transactions', title: 'Recent Transactions', description: 'Latest financial activity', icon: '��' },
  { id: 'budgets', title: 'Budget Overview', description: 'Budget tracking and spending analysis', icon: '💰' }
];

// Draggable Section Item Component
interface DraggableSectionProps {
  section: DashboardSection;
  index: number;
  isVisible: boolean;
  onToggle: (id: string) => void;
  moveSection: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableSection = ({ section, index, isVisible, onToggle, moveSection }: DraggableSectionProps) => {
  const [{ isDragging }, drag, preview] = useDrag({
    type: 'section',
    item: { index, id: section.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'section',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveSection(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-100 hover:border-blue-200 transition-all duration-200 cursor-move ${
        isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      }`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="flex items-center gap-3">
        <div className="text-gray-400 hover:text-gray-600 transition-colors">
          <GripVertical className="h-5 w-5" />
        </div>
        <div className="text-2xl">{section.icon}</div>
        <div className="flex-1">
          <div className="font-semibold text-gray-900">{section.title}</div>
          <div className="text-sm text-gray-500">{section.description}</div>
        </div>
      </div>
      <Switch
        checked={isVisible}
        onCheckedChange={() => onToggle(section.id)}
        className="data-[state=checked]:bg-blue-600"
      />
    </div>
  );
};

export default function EnhancedDashboard({ onNavigate }: EnhancedDashboardProps) {
  const [showBalances, setShowBalances] = useState(true);
  const [timePeriod, setTimePeriod] = useState('month');
  const [isRefreshingAccounts, setIsRefreshingAccounts] = useState(false);
  const [customizeMode, setCustomizeMode] = useState(false);
  const [hiddenSections, setHiddenSections] = useState<string[]>([]);
  const [budgetViewMode, setBudgetViewMode] = useState<'categories' | 'vendors'>('categories');
  const [sectionOrder, setSectionOrder] = useState<string[]>(['insights', 'ai-features', 'accounts', 'categories', 'goals', 'payments', 'transactions', 'budgets']);
  const [showGameModal, setShowGameModal] = useState(false);

  // Calculate financial summaries
  const totalAssets = useMemo(() => {
    return mockAccounts
      .filter(acc => acc.balance > 0)
      .reduce((sum, acc) => sum + acc.balance, 0);
  }, []);

  const totalLiabilities = useMemo(() => {
    return Math.abs(mockAccounts
      .filter(acc => acc.balance < 0)
      .reduce((sum, acc) => sum + acc.balance, 0));
  }, []);

  const netWorth = totalAssets - totalLiabilities;

  // Calculate account summaries
  const accountSummaries = useMemo(() => {
    const liquid = mockAccounts
      .filter(acc => acc.category === 'liquid')
      .reduce((sum, acc) => sum + acc.balance, 0);
    
    const investments = mockAccounts
      .filter(acc => acc.category === 'investment')
      .reduce((sum, acc) => sum + acc.balance, 0);
    
    const debt = Math.abs(mockAccounts
      .filter(acc => acc.category === 'debt')
      .reduce((sum, acc) => sum + acc.balance, 0));
    
    const manual = mockAccounts
      .filter(acc => acc.category === 'manual')
      .reduce((sum, acc) => sum + acc.balance, 0);

    return { liquid, investments, debt, manual };
  }, []);

  const formatCurrency = (amount: number) => {
    if (!showBalances) return '••••••';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Math.abs(amount));
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 1) return `${diffDays} days`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'needs_attention':
        return '⚠️';
      case 'disconnected':
        return '❌';
      default:
        return null;
    }
  };

  const handleRefreshAccounts = async () => {
    setIsRefreshingAccounts(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshingAccounts(false);
  };

  const handleAccountClick = (account: any) => {
    onNavigate('account-details', { account });
  };

  const unreadNotifications = mockNotifications.filter(n => n.unread).length;

  const topAccounts = mockAccounts
    .filter(acc => acc.status !== 'disconnected')
    .sort((a, b) => Math.abs(b.balance) - Math.abs(a.balance))
    .slice(0, 4);

  const toggleSection = (sectionId: string) => {
    setHiddenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleCustomizeToggle = () => {
    setCustomizeMode(!customizeMode);
  };

  const moveSection = useCallback((dragIndex: number, hoverIndex: number) => {
    setSectionOrder(prev => {
      const newOrder = [...prev];
      const draggedItem = newOrder[dragIndex];
      newOrder.splice(dragIndex, 1);
      newOrder.splice(hoverIndex, 0, draggedItem);
      return newOrder;
    });
  }, []);

  // Sort vendors by spending amount for better visualization
  const sortedVendorData = [...vendorSpendingData].sort((a, b) => b.amount - a.amount);

  // Get ordered sections for display
  const orderedSections = sectionOrder.map(id => dashboardSections.find(s => s.id === id)).filter(Boolean) as DashboardSection[];

  const renderSection = (sectionId: string) => {
    if (hiddenSections.includes(sectionId)) return null;

    switch (sectionId) {
      case 'insights':
        return (
          <div key="insights" className="bg-white mx-4 mt-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between p-4 pb-3">
              <h3 className="text-lg font-semibold text-gray-900">Your Coach</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('insights')}
                className="text-blue-600 hover:text-blue-700"
              >
                See all
              </Button>
            </div>

            {/* Gamification Overview */}
            <div className="px-4 pb-3">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-900">Your Progress</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-bold text-orange-600">{gamificationStats.dailyStreak}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-bold text-purple-900">{gamificationStats.totalPoints.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-purple-700">
                  <span>Wellness Score: {gamificationStats.wellnessScore}%</span>
                  <span>Next reward in {gamificationStats.nextRewardIn} insights</span>
                </div>
                <Progress value={gamificationStats.wellnessScore} className="h-1.5 mt-2" />
              </div>
            </div>

            {/* Latest Insights Preview */}
            <div className="px-4 pb-3">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Latest Insights</h4>
              <div className="space-y-3">
                {mockInsights.slice(0, 2).map((insight) => {
                  const getPriorityColor = (priority: string) => {
                    switch (priority) {
                      case 'high': return 'bg-red-50 border-red-200';
                      case 'medium': return 'bg-yellow-50 border-yellow-200';
                      default: return 'bg-blue-50 border-blue-200';
                    }
                  };

                  const getTypeIcon = (type: string) => {
                    switch (type) {
                      case 'spending': return <TrendingDown className="h-3 w-3 text-green-600" />;
                      case 'security': return <AlertTriangle className="h-3 w-3 text-red-600" />;
                      case 'saving': return <DollarSign className="h-3 w-3 text-blue-600" />;
                      default: return <Lightbulb className="h-3 w-3 text-purple-600" />;
                    }
                  };

                  return (
                    <div 
                      key={insight.id}
                      className={`p-3 rounded-lg border-2 ${getPriorityColor(insight.priority)} hover:shadow-md transition-all duration-200 cursor-pointer`}
                      onClick={() => onNavigate('insight-details', { insight })}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="text-lg">{insight.icon}</div>
                          <div className="flex items-center gap-1">
                            {getTypeIcon(insight.type)}
                            {insight.isNew && (
                              <Badge className="text-xs bg-green-100 text-green-700 px-1 py-0">
                                NEW
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div 
                          className="text-sm font-bold"
                          style={{ color: insight.color }}
                        >
                          {insight.keyDataPoint}
                        </div>
                      </div>
                      <div className="mb-2">
                        <h5 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
                          {insight.headline}
                        </h5>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {insight.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="px-4 pb-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-700">Recent Achievements</h4>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onNavigate('achievements')}
                  className="text-xs text-blue-600 hover:text-blue-700 p-1"
                >
                  <Trophy className="h-3 w-3 mr-1" />
                  View All
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {mockAchievements.slice(0, 2).map((achievement) => {
                  const getRarityColor = (rarity: string) => {
                    switch (rarity) {
                      case 'rare': return 'bg-purple-50 border-purple-200';
                      case 'epic': return 'bg-orange-50 border-orange-200';
                      case 'legendary': return 'bg-yellow-50 border-yellow-200';
                      default: return 'bg-gray-50 border-gray-200';
                    }
                  };

                  return (
                    <div 
                      key={achievement.id}
                      className={`p-3 rounded-lg border ${getRarityColor(achievement.rarity)} hover:shadow-sm transition-all duration-200 cursor-pointer`}
                      onClick={() => onNavigate('achievements')}
                    >
                      <div className="text-center">
                        <div className="relative mb-2">
                          <div className="text-xl">{achievement.icon}</div>
                          <div className="absolute -top-1 -right-1 text-sm">
                            {achievement.badge}
                          </div>
                        </div>
                        <h5 className="font-semibold text-xs text-gray-900 mb-1 leading-tight">
                          {achievement.title}
                        </h5>
                        <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                          <span>+{achievement.points}</span>
                          <Star className="h-3 w-3 text-yellow-500" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-4 pb-4 border-t border-gray-100 pt-3">
              <div className="grid grid-cols-2 gap-2 mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate('ai-assistant')}
                  className="text-xs h-8 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200"
                >
                  <Bot className="h-3 w-3 mr-1" />
                  AI Pro
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowGameModal(true)}
                  className="text-xs h-8 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border-purple-200"
                >
                  <Gamepad2 className="h-3 w-3 mr-1" />
                  AI Game
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate('insights')}
                  className="text-xs h-8 bg-gradient-to-r from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 border-green-200"
                >
                  <Brain className="h-3 w-3 mr-1" />
                  Insights
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate('insights-settings')}
                  className="text-xs h-8 bg-gradient-to-r from-gray-50 to-slate-50 hover:from-gray-100 hover:to-slate-100"
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        );

      case 'ai-features':
        return (
          <div key="ai-features" className="bg-white mx-4 mt-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between p-4 pb-3">
              <h3 className="text-lg font-semibold text-gray-900">AI-Powered Features</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('ai-assistant')}
                className="text-blue-600 hover:text-blue-700"
              >
                See all
              </Button>
            </div>

            {/* Receipt Scanner Feature */}
            <div className="px-4 pb-3">
              <div className="bg-[#f7fcf7] border border-[#eef8ee] rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#0b733c] rounded-2xl flex items-center justify-center">
                      <span className="text-white text-lg">📄</span>
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
                  size="sm"
                  className="w-full bg-[#18312d] hover:bg-[#1a3430] text-white"
                >
                  📱 Scan Receipt Now
                </Button>
              </div>
            </div>

            {/* AI Features Grid */}
            <div className="px-4 pb-4">
              <h4 className="text-sm font-semibold text-[#18312d] mb-3">Smart Features</h4>
              <div className="grid grid-cols-2 gap-3">
                <div 
                  className="p-3 bg-[#e6f1fc] border border-[#b0d4f7] rounded-xl cursor-pointer hover:border-[#0056ac] transition-colors shadow-sm"
                  onClick={() => onNavigate('ai-fraud-detection')}
                >
                  <div className="text-center">
                    <div className="text-xl mb-1">🛡️</div>
                    <div className="text-xs font-semibold text-[#0056ac]">Fraud Detection</div>
                  </div>
                </div>
                <div 
                  className="p-3 bg-[#f5eef4] border border-[#e0cedd] rounded-xl cursor-pointer hover:border-[#8c4a86] transition-colors shadow-sm"
                  onClick={() => onNavigate('ai-what-if-scenarios')}
                >
                  <div className="text-center">
                    <div className="text-xl mb-1">📊</div>
                    <div className="text-xs font-semibold text-[#8c4a86]">What-If Scenarios</div>
                  </div>
                </div>
                <div 
                  className="p-3 bg-[#fef1e6] border border-[#f5c4a0] rounded-xl cursor-pointer hover:border-[#904204] transition-colors shadow-sm"
                  onClick={() => onNavigate('ai-smart-savings')}
                >
                  <div className="text-center">
                    <div className="text-xl mb-1">💰</div>
                    <div className="text-xs font-semibold text-[#904204]">Smart Savings</div>
                  </div>
                </div>
                <div 
                  className="p-3 bg-[#eef8ee] border border-[#c8e9c8] rounded-xl cursor-pointer hover:border-[#0b733c] transition-colors shadow-sm"
                  onClick={() => onNavigate('ai-investment-advisor')}
                >
                  <div className="text-center">
                    <div className="text-xl mb-1">📈</div>
                    <div className="text-xs font-semibold text-[#0b733c]">Investment Advisor</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'accounts':
        return (
          <div key="accounts" className="bg-white mx-4 mt-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between p-4 pb-3">
              <h3 className="text-lg font-semibold text-gray-900">My Accounts</h3>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="p-2"
                  onClick={handleRefreshAccounts}
                  disabled={isRefreshingAccounts}
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshingAccounts ? 'animate-spin' : ''}`} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onNavigate('accounts')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  See all
                </Button>
              </div>
            </div>

            {/* Account Summary Cards */}
            <div className="px-4 pb-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="text-xs text-blue-600 font-medium mb-1">Total Liquid</div>
                  <div className="text-lg font-bold text-blue-900">
                    {formatCurrency(accountSummaries.liquid)}
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="text-xs text-green-600 font-medium mb-1">Investments</div>
                  <div className="text-lg font-bold text-green-900">
                    {formatCurrency(accountSummaries.investments)}
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="text-xs text-red-600 font-medium mb-1">Total Debt</div>
                  <div className="text-lg font-bold text-red-900">
                    {formatCurrency(accountSummaries.debt)}
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="text-xs text-gray-600 font-medium mb-1">Manual Assets</div>
                  <div className="text-lg font-bold text-gray-900">
                    {formatCurrency(accountSummaries.manual)}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Accounts List */}
            <div className="px-4 pb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Key Accounts</h4>
              <div className="space-y-2">
                {topAccounts.map((account) => (
                  <div 
                    key={account.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    onClick={() => handleAccountClick(account)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-xl">{account.logo}</div>
                      <div>
                        <div className="font-medium text-gray-900 flex items-center gap-1">
                          {account.name}
                          {getStatusIcon(account.status)}
                        </div>
                        <div className="text-xs text-gray-500">{account.institution}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${
                        account.balance < 0 ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {formatCurrency(account.balance)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div key="payments" className="bg-white mx-4 mt-4 rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Payments</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('upcoming-payments')}
                className="text-blue-600 hover:text-blue-700"
              >
                See all
              </Button>
            </div>
            <div className="space-y-3">
              {upcomingPayments.slice(0, 3).map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${payment.color} rounded-lg flex items-center justify-center`}>
                      <span className="text-sm">{payment.icon}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{payment.name}</div>
                      <div className="text-sm text-gray-500">Due {formatDate(payment.dueDate)}</div>
                    </div>
                  </div>
                  <div className="font-semibold text-gray-900">
                    {formatCurrency(payment.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'transactions':
        return (
          <div key="transactions" className="bg-white mx-4 mt-4 rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('transactions')}
                className="text-blue-600 hover:text-blue-700"
              >
                See all
              </Button>
            </div>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-xl">{transaction.icon}</div>
                    <div>
                      <div className="font-medium text-gray-900">{transaction.merchant}</div>
                      <div className="text-sm text-gray-500">{transaction.category}</div>
                    </div>
                  </div>
                  <div className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'categories':
        return (
          <div key="categories" className="bg-white mx-4 mt-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between p-4 pb-3">
              <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('categories')}
                className="text-blue-600 hover:text-blue-700"
              >
                See all
              </Button>
            </div>

            {/* Categories Overview */}
            <div className="px-4 pb-3">
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="text-lg">📂</div>
                    <span className="text-sm font-medium text-emerald-900">Category Spending</span>
                  </div>
                  <span className="text-lg font-bold text-emerald-900">
                    {formatCurrency(mockCategories.reduce((sum, cat) => sum + cat.spent, 0))}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-emerald-700">
                  <span>
                    {mockCategories.filter(cat => cat.status === 'on-track').length} on track
                  </span>
                  <span>
                    {mockCategories.filter(cat => cat.status === 'warning').length} need attention
                  </span>
                </div>
              </div>
            </div>

            {/* Top Categories */}
            <div className="px-4 pb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Top Categories</h4>
              <div className="space-y-3">
                {mockCategories.slice(0, 3).map((category) => {
                  const getStatusColor = (status: string) => {
                    switch (status) {
                      case 'warning': return 'text-yellow-600 bg-yellow-100';
                      case 'over-budget': return 'text-red-600 bg-red-100';
                      default: return 'text-green-600 bg-green-100';
                    }
                  };
                  const getStatusText = (status: string) => {
                    switch (status) {
                      case 'warning': return 'Near Limit';
                      case 'over-budget': return 'Over Budget';
                      default: return 'On Track';
                    }
                  };
                  
                  return (
                    <div 
                      key={category.id}
                      className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                      onClick={() => onNavigate('category-detail-screen', { category })}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{category.icon}</span>
                          <span className="font-medium text-gray-900 text-sm">{category.name}</span>
                        </div>
                        <Badge className={`text-xs ${getStatusColor(category.status)}`}>
                          {getStatusText(category.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">
                          {formatCurrency(category.spent)} / {formatCurrency(category.budget)}
                        </span>
                        <span className="text-xs font-medium text-gray-900">
                          {Math.round(category.progress)}%
                        </span>
                      </div>
                      <Progress value={category.progress} className="h-1.5" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'goals':
        return (
          <div key="goals" className="bg-white mx-4 mt-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between p-4 pb-3">
              <h3 className="text-lg font-semibold text-gray-900">Financial Goals</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('goals')}
                className="text-blue-600 hover:text-blue-700"
              >
                See all
              </Button>
            </div>

            {/* Goals Progress Overview */}
            <div className="px-4 pb-3">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Overall Progress</span>
                  </div>
                  <span className="text-lg font-bold text-blue-900">
                    {Math.round((mockGoals.reduce((sum, goal) => sum + goal.currentAmount, 0) / 
                                mockGoals.reduce((sum, goal) => sum + goal.targetAmount, 0)) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between text-xs text-blue-700">
                  <span>
                    {formatCurrency(mockGoals.reduce((sum, goal) => sum + goal.currentAmount, 0))} saved
                  </span>
                  <span>
                    {formatCurrency(mockGoals.reduce((sum, goal) => sum + goal.targetAmount, 0))} target
                  </span>
                </div>
              </div>
            </div>

            {/* Top Goals */}
            <div className="px-4 pb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Active Goals</h4>
              <div className="space-y-3">
                {mockGoals.slice(0, 3).map((goal) => {
                  const progress = (goal.currentAmount / goal.targetAmount) * 100;
                  const getStatusColor = (status: string) => {
                    switch (status) {
                      case 'ahead': return 'text-green-600 bg-green-100';
                      case 'behind': return 'text-red-600 bg-red-100';
                      default: return 'text-blue-600 bg-blue-100';
                    }
                  };
                  const getStatusText = (status: string) => {
                    switch (status) {
                      case 'ahead': return 'Ahead';
                      case 'behind': return 'Behind';
                      default: return 'On Track';
                    }
                  };
                  
                  return (
                    <div 
                      key={goal.id}
                      className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                      onClick={() => onNavigate('goal-details', { goal })}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{goal.icon}</span>
                          <span className="font-medium text-gray-900 text-sm">{goal.name}</span>
                        </div>
                        <Badge className={`text-xs ${getStatusColor(goal.status)}`}>
                          {getStatusText(goal.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">
                          {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                        </span>
                        <span className="text-xs font-medium text-gray-900">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <Progress value={progress} className="h-1.5" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'budgets':
        return (
          <div key="budgets" className="bg-white mx-4 mt-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between p-4 pb-3">
              <h3 className="text-lg font-semibold text-gray-900">Budget Overview</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('budgets')}
                className="text-blue-600 hover:text-blue-700"
              >
                See all
              </Button>
            </div>

            {/* Budget Summary */}
            <div className="px-4 pb-3">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">70%</span>
                    </div>
                    <span className="text-sm font-medium text-green-900">Budget Progress</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-700">
                      $1,800 of $2,500 spent
                    </div>
                    <div className="text-xs text-green-600">
                      $700 remaining this month
                    </div>
                  </div>
                </div>
                <Progress value={70} className="h-2" />
              </div>
            </div>

            {/* Top Budget Categories */}
            <div className="px-4 pb-3">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Top Categories</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 cursor-pointer hover:shadow-sm transition-shadow"
                     onClick={() => onNavigate('budgets')}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🍊</span>
                    <span className="text-sm font-medium text-gray-900">Grocery</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">$100 of $150</div>
                  <Progress value={67} className="h-1.5" />
                  <div className="text-xs text-gray-500 mt-1">67% used</div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-3 cursor-pointer hover:shadow-sm transition-shadow"
                     onClick={() => onNavigate('budgets')}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">💡</span>
                    <span className="text-sm font-medium text-gray-900">Utilities</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">$100 of $150</div>
                  <Progress value={67} className="h-1.5" />
                  <div className="text-xs text-gray-500 mt-1">67% used</div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 cursor-pointer hover:shadow-sm transition-shadow"
                     onClick={() => onNavigate('budgets')}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🎭</span>
                    <span className="text-sm font-medium text-gray-900">Entertainment</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">$100 of $150</div>
                  <Progress value={67} className="h-1.5" />
                  <div className="text-xs text-gray-500 mt-1">67% used</div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 cursor-pointer hover:shadow-sm transition-shadow"
                     onClick={() => onNavigate('budgets')}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🚗</span>
                    <span className="text-sm font-medium text-gray-900">Transportation</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">$100 of $150</div>
                  <Progress value={67} className="h-1.5" />
                  <div className="text-xs text-gray-500 mt-1">67% used</div>
                </div>
              </div>
            </div>

            {/* Budget Actions */}
            <div className="px-4 pb-4 border-t border-gray-100 pt-3">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate('budgets')}
                  className="text-xs h-8 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-green-200"
                >
                  <DollarSign className="h-3 w-3 mr-1" />
                  View Budgets
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate('budgets')}
                  className="text-xs h-8 bg-gradient-to-r from-gray-50 to-slate-50 hover:from-gray-100 hover:to-slate-100"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Set Budget
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Status Bar */}
        <div className="bg-white flex flex-row items-center justify-between px-4 pt-[21px] pb-0 h-[50px]">
          <div className="text-[17px] text-black font-semibold">9:41</div>
          <div className="h-2.5 w-[124px]" />
          <div className="flex items-center gap-[7px]">
            <div className="w-[19.2px] h-[12.226px] bg-black rounded-sm" />
            <div className="w-[17.142px] h-[12.328px] bg-black rounded-sm" />
            <div className="w-[27.328px] h-[13px] border border-black rounded-[3.8px] relative">
              <div className="w-[21px] h-[9px] bg-black rounded-[2.5px] absolute left-[2px] top-[2px]" />
              <div className="w-[1.328px] h-[5px] bg-black rounded-r absolute right-0 top-[4px]" />
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FM</span>
              </div>
              <span className="font-semibold text-gray-900">FinanceManager</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="p-2 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                onClick={handleCustomizeToggle}
              >
                <Grip className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative p-2"
                onClick={() => onNavigate('notifications')}
              >
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">{unreadNotifications}</span>
                  </div>
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="p-2"
                onClick={() => onNavigate('profile')}
              >
                <Settings className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="p-2"
                onClick={() => onNavigate('profile')}
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">T</span>
                </div>
              </Button>
            </div>
          </div>
          
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Welcome, Taylor!</h1>
            <p className="text-gray-600">Here's your financial overview</p>
          </div>
        </div>

        {/* Modern Customize Modal */}
        <Dialog open={customizeMode} onOpenChange={setCustomizeMode}>
          <DialogContent className="max-w-md mx-auto rounded-2xl border-0 shadow-2xl">
            <DialogHeader className="text-center pb-4">
              <DialogTitle className="text-xl font-semibold text-gray-900">Customize Dashboard</DialogTitle>
              <DialogDescription className="text-sm text-gray-500 mt-2">
                Drag sections to reorder them and toggle visibility
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {orderedSections.map((section, index) => (
                <DraggableSection
                  key={section.id}
                  section={section}
                  index={index}
                  isVisible={!hiddenSections.includes(section.id)}
                  onToggle={toggleSection}
                  moveSection={moveSection}
                />
              ))}
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setCustomizeMode(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setCustomizeMode(false)}
              >
                Done
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Net Worth Summary */}
        <div 
          className="bg-white mx-4 mt-4 rounded-lg p-6 shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onNavigate('net-worth')}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Net Worth</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowBalances(!showBalances)}
              className="p-1"
            >
              {showBalances ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {showBalances ? `$${netWorth.toLocaleString()}` : '••••••••'}
          </div>
          
          <div className="flex items-center gap-2 text-sm mb-4">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-green-600 font-medium">6.1% (+$10,116.05)</span>
            <span className="text-gray-500">last {timePeriod}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500 mb-1">Assets</div>
              <div className="font-semibold text-green-600">
                {showBalances ? `$${totalAssets.toLocaleString()}` : '••••••'}
              </div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Liabilities</div>
              <div className="font-semibold text-red-600">
                {showBalances ? `$${totalLiabilities.toLocaleString()}` : '••••••'}
              </div>
            </div>
          </div>

          {/* Time Period Selector */}
          <div className="flex justify-center mt-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {['Week', 'Month', '3M', 'Year', 'All'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimePeriod(period.toLowerCase())}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    timePeriod === period.toLowerCase() 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Ordered Sections */}
        <div className="flex-1 overflow-y-auto pb-6">
          {sectionOrder.map(sectionId => renderSection(sectionId))}
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-around">
            <button 
              className="flex flex-col items-center"
              onClick={() => onNavigate('dashboard')}
            >
              <div className="w-6 h-6 mb-1 text-blue-600">🏠</div>
              <span className="text-xs font-medium text-blue-600">Home</span>
            </button>
            <button 
              className="flex flex-col items-center hover:opacity-80 transition-opacity"
              onClick={() => onNavigate('transactions')}
            >
              <div className="w-6 h-6 mb-1">🔄</div>
              <span className="text-xs">Transactions</span>
            </button>
            <button className="flex flex-col items-center">
              <div className="w-11 h-11 bg-green-100 rounded-full flex items-center justify-center mb-1 hover:bg-green-200 transition-colors">
                <Plus className="h-6 w-6 text-green-700" />
              </div>
            </button>
            <button 
              className="flex flex-col items-center hover:opacity-80 transition-opacity"
              onClick={() => onNavigate('accounts')}
            >
              <div className="w-6 h-6 mb-1">💼</div>
              <span className="text-xs">Accounts</span>
            </button>
            <button 
              className="flex flex-col items-center hover:opacity-80 transition-opacity"
              onClick={() => onNavigate('more')}
            >
              <div className="w-6 h-6 mb-1">⚙️</div>
              <span className="text-xs">More</span>
            </button>
          </div>
          
          {/* Home Indicator */}
          <div className="flex justify-center mt-2">
            <div className="w-36 h-1 bg-black rounded-full" />
          </div>
        </div>

        {/* AI Game Modal */}
        <AIGameModal 
          isOpen={showGameModal}
          onClose={() => setShowGameModal(false)}
          onNavigate={onNavigate}
        />
      </div>
    </DndProvider>
  );
}