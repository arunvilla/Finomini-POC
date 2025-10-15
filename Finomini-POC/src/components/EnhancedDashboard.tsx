import { useState, useMemo, useCallback, useEffect } from 'react';
import { Settings, Bell, Eye, EyeOff, TrendingUp, TrendingDown, RefreshCw, Plus, Grip, GripVertical, Target, Brain, Flame, Trophy, Lightbulb, Star, AlertTriangle, DollarSign, Bot, Gamepad2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AIGameModal from './AIGameModal';
import { OptimizedChart } from './ui/optimized-chart';
import { sampleDataForCharts } from '../utils/pagination';
import { 
  useAppStore, 
  useAccounts, 
  useTransactions, 
  useBudgets, 
  useInsights, 
  useLoadingStates, 
  useErrorStates,
  useSyncStatus,
  useIsInitialized
} from '../stores';

interface EnhancedDashboardProps {
  onNavigate: (screen: string, data?: any) => void;
}

// Account type mapping for UI display
const getAccountCategory = (type: string) => {
  switch (type) {
    case 'checking':
    case 'savings':
      return 'liquid';
    case 'investment':
      return 'investment';
    case 'credit':
      return 'debt';
    default:
      return 'manual';
  }
};

const getAccountLogo = (type: string) => {
  switch (type) {
    case 'checking':
      return '🏦';
    case 'savings':
      return '💰';
    case 'investment':
      return '📈';
    case 'credit':
      return '💳';
    default:
      return '💵';
  }
};

const getAccountStatus = (account: any) => {
  if (!account.plaid_account_id) return 'manual';
  if (!account.last_synced) return 'needs_attention';
  
  const hoursSinceSync = (Date.now() - new Date(account.last_synced).getTime()) / (1000 * 60 * 60);
  if (hoursSinceSync > 24) return 'needs_attention';
  
  return 'connected';
};

// Generate notifications from real data
const generateNotifications = (accounts: any[]): Array<{id: string, type: string, title: string, message: string, unread: boolean}> => {
  const notifications: Array<{id: string, type: string, title: string, message: string, unread: boolean}> = [];
  
  // Low balance alerts
  accounts.forEach(account => {
    if (account.type === 'checking' && account.balance < 1000) {
      notifications.push({
        id: `low_balance_${account.id}`,
        type: 'low_balance',
        title: 'Low Balance Alert',
        message: `Your ${account.name} is below $1,000`,
        unread: true
      });
    }
  });
  
  // Account connection issues
  accounts.forEach(account => {
    if (getAccountStatus(account) === 'needs_attention') {
      notifications.push({
        id: `connection_${account.id}`,
        type: 'connection',
        title: 'Account Needs Attention',
        message: `${account.name} requires login update`,
        unread: true
      });
    }
  });
  
  return notifications;
};

// Generate spending data from transactions and budgets
const generateSpendingData = (transactions: any[], budgets: any[]): Array<{category: string, amount: number, budget: number, color: string}> => {
  const categorySpending = new Map<string, number>();
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500', 'bg-indigo-500'];
  
  // Calculate spending by category
  transactions.forEach(transaction => {
    if (transaction.amount < 0) { // Only expenses
      const category = transaction.category;
      const amount = Math.abs(transaction.amount);
      categorySpending.set(category, (categorySpending.get(category) || 0) + amount);
    }
  });
  
  // Match with budgets and create spending data
  const spendingData: Array<{category: string, amount: number, budget: number, color: string}> = [];
  let colorIndex = 0;
  
  budgets.forEach(budget => {
    const spent = categorySpending.get(budget.category) || 0;
    spendingData.push({
      category: budget.category,
      amount: spent,
      budget: budget.amount,
      color: colors[colorIndex % colors.length]
    });
    colorIndex++;
  });
  
  // Add categories with spending but no budget
  categorySpending.forEach((amount, category) => {
    if (!budgets.find((b: any) => b.category === category)) {
      spendingData.push({
        category,
        amount,
        budget: 0,
        color: colors[colorIndex % colors.length]
      });
      colorIndex++;
    }
  });
  
  return spendingData.slice(0, 4); // Top 4 categories
};



// Get recent transactions from store data
const getRecentTransactions = (transactions: any[]) => {
  return transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
    .map(transaction => ({
      id: transaction.id,
      merchant: transaction.merchant || transaction.description,
      amount: transaction.amount,
      category: transaction.category,
      icon: getCategoryIcon(transaction.category),
      date: new Date(transaction.date)
    }));
};

const getCategoryIcon = (category: string) => {
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('food') || categoryLower.includes('dining')) return '🍽️';
  if (categoryLower.includes('shopping') || categoryLower.includes('retail')) return '🛍️';
  if (categoryLower.includes('transport') || categoryLower.includes('gas')) return '🚗';
  if (categoryLower.includes('entertainment')) return '🎬';
  if (categoryLower.includes('income') || categoryLower.includes('salary')) return '💰';
  if (categoryLower.includes('grocery')) return '🛒';
  if (categoryLower.includes('utilities')) return '💡';
  return '💳';
};

// Generate upcoming payments from recurring transactions
const generateUpcomingPayments = () => {
  // For now, return mock data since we don't have recurring payment logic yet
  // This would be enhanced with actual recurring payment detection
  return [
    { id: '1', name: 'Netflix', amount: 15.99, dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), icon: '🎬', color: 'bg-red-500' },
    { id: '2', name: 'Spotify', amount: 9.99, dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), icon: '🎵', color: 'bg-green-500' },
    { id: '3', name: 'Internet', amount: 79.99, dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), icon: '🌐', color: 'bg-blue-500' }
  ];
};

// Generate chart data from transactions for performance optimization
const generateSpendingTrendData = (transactions: any[], timePeriod: string) => {
  const now = new Date();
  const data: Array<{date: string, income: number, expenses: number}> = [];
  
  // Determine date range based on time period
  let days = 30;
  if (timePeriod === 'week') days = 7;
  if (timePeriod === 'quarter') days = 90;
  if (timePeriod === 'year') days = 365;
  
  // Generate data points for the period
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const dayTransactions = transactions.filter(t => {
      const tDate = new Date(t.date).toISOString().split('T')[0];
      return tDate === dateStr;
    });
    
    const income = dayTransactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = Math.abs(dayTransactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0));
    
    data.push({
      date: timePeriod === 'year' ? date.toLocaleDateString('en-US', { month: 'short' }) : 
            timePeriod === 'quarter' ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) :
            date.toLocaleDateString('en-US', { weekday: 'short' }),
      income,
      expenses
    });
  }
  
  // Sample data if too many points for performance
  return sampleDataForCharts(data, 50);
};

// Generate category spending data for pie chart
const generateCategoryChartData = (transactions: any[]) => {
  const categoryTotals = new Map<string, number>();
  
  transactions
    .filter(t => t.amount < 0) // Only expenses
    .forEach(t => {
      const amount = Math.abs(t.amount);
      categoryTotals.set(t.category, (categoryTotals.get(t.category) || 0) + amount);
    });
  
  const data = Array.from(categoryTotals.entries())
    .map(([category, amount]) => ({
      name: category,
      value: amount
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8); // Top 8 categories for readability
  
  return data;
};

// Mock goals data for dashboard (TODO: Replace with real goals from store)
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

// Mock achievements data for dashboard (TODO: Replace with real achievements from store)
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
  { id: 'spending-trends', title: 'Spending Trends', description: 'Visual spending patterns over time', icon: '📈' },
  { id: 'category-breakdown', title: 'Category Breakdown', description: 'Spending distribution by category', icon: '🥧' },
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
  const [{ isDragging }, drag] = useDrag({
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
      ref={(node) => {
        drag(node);
        drop(node);
      }}
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

  const [sectionOrder, setSectionOrder] = useState<string[]>(['insights', 'ai-features', 'accounts', 'spending-trends', 'category-breakdown', 'categories', 'goals', 'payments', 'transactions', 'budgets']);
  const [showGameModal, setShowGameModal] = useState(false);

  // Store data
  const accounts = useAccounts();
  const transactions = useTransactions();
  const budgets = useBudgets();
  const insights = useInsights();
  const loadingStates = useLoadingStates();
  const errorStates = useErrorStates();
  const syncStatus = useSyncStatus();
  const isInitialized = useIsInitialized();
  
  // Store actions
  const { 
    initializeStore, 
    syncPlaidData, 
    generateInsights,
    getNetWorth
  } = useAppStore();

  // Initialize store on mount
  useEffect(() => {
    if (!isInitialized) {
      initializeStore();
    }
  }, [isInitialized, initializeStore]);

  // Show loading state while initializing
  if (!isInitialized || loadingStates.accounts.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your financial data...</p>
        </div>
      </div>
    );
  }

  // Show error state if there are critical errors
  if (errorStates.accounts.hasError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md">
          <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Data</h3>
          <p className="text-gray-600 mb-4">{errorStates.accounts.message || 'There was an error loading your financial data.'}</p>
          <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Calculate financial summaries from real data
  const totalAssets = useMemo(() => {
    return accounts
      .filter(acc => acc.balance > 0)
      .reduce((sum, acc) => sum + acc.balance, 0);
  }, [accounts]);

  const totalLiabilities = useMemo(() => {
    return Math.abs(accounts
      .filter(acc => acc.balance < 0)
      .reduce((sum, acc) => sum + acc.balance, 0));
  }, [accounts]);

  const netWorth = useMemo(() => getNetWorth(), [getNetWorth]);

  // Calculate account summaries from real data
  const accountSummaries = useMemo(() => {
    const liquid = accounts
      .filter(acc => getAccountCategory(acc.type) === 'liquid')
      .reduce((sum, acc) => sum + acc.balance, 0);
    
    const investments = accounts
      .filter(acc => getAccountCategory(acc.type) === 'investment')
      .reduce((sum, acc) => sum + acc.balance, 0);
    
    const debt = Math.abs(accounts
      .filter(acc => getAccountCategory(acc.type) === 'debt')
      .reduce((sum, acc) => sum + acc.balance, 0));
    
    const manual = accounts
      .filter(acc => getAccountCategory(acc.type) === 'manual')
      .reduce((sum, acc) => sum + acc.balance, 0);

    return { liquid, investments, debt, manual };
  }, [accounts]);

  // Generate dynamic data from store
  const notifications = useMemo(() => generateNotifications(accounts), [accounts]);
  const spendingData = useMemo(() => generateSpendingData(transactions, budgets), [transactions, budgets]);
  const recentTransactions = useMemo(() => getRecentTransactions(transactions), [transactions]);
  const upcomingPayments = useMemo(() => generateUpcomingPayments(), []);
  
  // Generate chart data with performance optimization
  const spendingTrendData = useMemo(() => generateSpendingTrendData(transactions, timePeriod), [transactions, timePeriod]);
  const categoryChartData = useMemo(() => generateCategoryChartData(transactions), [transactions]);

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
    try {
      await syncPlaidData();
    } catch (error) {
      console.error('Failed to sync accounts:', error);
    } finally {
      setIsRefreshingAccounts(false);
    }
  };

  const handleAccountClick = (account: any) => {
    onNavigate('account-details', { account });
  };

  const unreadNotifications = notifications.filter(n => n.unread).length;

  const topAccounts = useMemo(() => {
    return accounts
      .filter(acc => acc.is_active) // Use is_active instead of status check
      .map(acc => ({
        ...acc,
        logo: getAccountLogo(acc.type),
        institution: acc.institution_name || 'Manual',
        category: getAccountCategory(acc.type),
        status: getAccountStatus(acc),
        lastSync: acc.last_synced ? new Date(acc.last_synced) : new Date()
      }))
      .sort((a, b) => Math.abs(b.balance) - Math.abs(a.balance))
      .slice(0, 4);
  }, [accounts]);

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
              {insights.length > 0 ? (
                <div className="space-y-3">
                  {insights.slice(0, 2).map((insight) => {
                  const getPriorityColor = (confidence: number) => {
                    if (confidence > 0.8) return 'bg-green-50 border-green-200';
                    if (confidence > 0.6) return 'bg-yellow-50 border-yellow-200';
                    return 'bg-red-50 border-red-200';
                  };

                  const getTypeIcon = (type: string) => {
                    switch (type) {
                      case 'spending_pattern': return <TrendingDown className="h-3 w-3 text-green-600" />;
                      case 'anomaly': return <AlertTriangle className="h-3 w-3 text-red-600" />;
                      case 'recommendation': return <DollarSign className="h-3 w-3 text-blue-600" />;
                      case 'prediction': return <Lightbulb className="h-3 w-3 text-purple-600" />;
                      default: return <Lightbulb className="h-3 w-3 text-purple-600" />;
                    }
                  };

                  const getInsightIcon = (type: string) => {
                    switch (type) {
                      case 'spending_pattern': return '📊';
                      case 'anomaly': return '⚠️';
                      case 'recommendation': return '💡';
                      case 'prediction': return '🔮';
                      default: return '💡';
                    }
                  };



                  return (
                    <div 
                      key={insight.id}
                      className={`p-3 rounded-lg border-2 ${getPriorityColor(insight.confidence)} hover:shadow-md transition-all duration-200 cursor-pointer`}
                      onClick={() => onNavigate('insight-details', { insight })}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="text-lg">{getInsightIcon(insight.type)}</div>
                          <div className="flex items-center gap-1">
                            {getTypeIcon(insight.type)}
                            {!insight.is_read && (
                              <Badge className="text-xs bg-green-100 text-green-700 px-1 py-0">
                                NEW
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-sm font-bold text-blue-600">
                          {insight.amount ? `$${Math.abs(insight.amount).toFixed(0)}` : `${Math.round(insight.confidence * 100)}%`}
                        </div>
                      </div>
                      <div className="mb-2">
                        <h5 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
                          {insight.title}
                        </h5>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {insight.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="text-3xl mb-2">💡</div>
                  <p className="text-gray-500 text-sm mb-3">No insights available yet</p>
                  <Button 
                    size="sm" 
                    onClick={() => generateInsights()}
                    variant="outline"
                    disabled={loadingStates.insights.isLoading}
                  >
                    {loadingStates.insights.isLoading ? (
                      <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                    ) : (
                      <Brain className="h-4 w-4 mr-1" />
                    )}
                    Generate Insights
                  </Button>
                </div>
              )}
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
              <div>
                <h3 className="text-lg font-semibold text-gray-900">My Accounts</h3>
                {syncStatus.isActive && (
                  <p className="text-xs text-blue-600">Syncing data...</p>
                )}
                {syncStatus.lastSync && (
                  <p className="text-xs text-gray-500">
                    Last synced: {new Date(syncStatus.lastSync).toLocaleTimeString()}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="p-2"
                  onClick={handleRefreshAccounts}
                  disabled={isRefreshingAccounts || syncStatus.isActive}
                >
                  <RefreshCw className={`h-4 w-4 ${(isRefreshingAccounts || syncStatus.isActive) ? 'animate-spin' : ''}`} />
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
              {topAccounts.length > 0 ? (
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
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">🏦</div>
                  <p className="text-gray-500 text-sm mb-3">No accounts connected yet</p>
                  <Button 
                    size="sm" 
                    onClick={() => onNavigate('add-account')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Account
                  </Button>
                </div>
              )}
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
            {recentTransactions.length > 0 ? (
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
            ) : (
              <div className="text-center py-6">
                <div className="text-3xl mb-2">💳</div>
                <p className="text-gray-500 text-sm mb-3">No recent transactions</p>
                <Button 
                  size="sm" 
                  onClick={() => onNavigate('add-manual-transaction')}
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Transaction
                </Button>
              </div>
            )}
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
                    {formatCurrency(spendingData.reduce((sum, cat) => sum + cat.amount, 0))}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-emerald-700">
                  <span>
                    {spendingData.filter(cat => cat.amount <= cat.budget * 0.8).length} on track
                  </span>
                  <span>
                    {spendingData.filter(cat => cat.amount > cat.budget * 0.8).length} need attention
                  </span>
                </div>
              </div>
            </div>

            {/* Top Categories */}
            <div className="px-4 pb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Top Categories</h4>
              <div className="space-y-3">
                {spendingData.slice(0, 3).map((category, index) => {
                  const progress = category.budget > 0 ? (category.amount / category.budget) * 100 : 0;
                  const getStatusColor = (progress: number) => {
                    if (progress > 100) return 'text-red-600 bg-red-100';
                    if (progress > 80) return 'text-yellow-600 bg-yellow-100';
                    return 'text-green-600 bg-green-100';
                  };
                  const getStatusText = (progress: number) => {
                    if (progress > 100) return 'Over Budget';
                    if (progress > 80) return 'Near Limit';
                    return 'On Track';
                  };
                  
                  return (
                    <div 
                      key={`category-${index}`}
                      className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                      onClick={() => onNavigate('category-detail-screen', { category })}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getCategoryIcon(category.category)}</span>
                          <span className="font-medium text-gray-900 text-sm">{category.category}</span>
                        </div>
                        <Badge className={`text-xs ${getStatusColor(progress)}`}>
                          {getStatusText(progress)}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">
                          {formatCurrency(category.amount)} / {formatCurrency(category.budget)}
                        </span>
                        <span className="text-xs font-medium text-gray-900">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <Progress value={Math.min(progress, 100)} className="h-1.5" />
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

      case 'spending-trends':
        return (
          <div key="spending-trends" className="bg-white mx-4 mt-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between p-4 pb-3">
              <h3 className="text-lg font-semibold text-gray-900">Spending Trends</h3>
              <Select value={timePeriod} onValueChange={setTimePeriod}>
                <SelectTrigger className="w-24 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="quarter">Quarter</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="px-4 pb-4">
              <OptimizedChart
                data={spendingTrendData}
                type="line"
                height={200}
                maxDataPoints={50}
                config={{
                  xKey: 'date',
                  yKey: 'expenses',
                  showGrid: true,
                  showTooltip: true,
                  colors: ['#ef4444', '#10b981']
                }}
              />
            </div>
          </div>
        );

      case 'category-breakdown':
        return (
          <div key="category-breakdown" className="bg-white mx-4 mt-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between p-4 pb-3">
              <h3 className="text-lg font-semibold text-gray-900">Category Breakdown</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('categories')}
                className="text-blue-600 hover:text-blue-700"
              >
                See all
              </Button>
            </div>
            <div className="px-4 pb-4">
              <OptimizedChart
                data={categoryChartData}
                type="pie"
                height={250}
                maxDataPoints={8}
                config={{
                  valueKey: 'value',
                  nameKey: 'name',
                  showTooltip: true,
                  showLegend: true,
                  colors: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316']
                }}
              />
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