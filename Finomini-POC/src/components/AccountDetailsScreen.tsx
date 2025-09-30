import { useState, useMemo } from 'react';
import { ArrowLeft, MoreHorizontal, Eye, EyeOff, Plus, Search, Filter, TrendingUp, TrendingDown, Wifi, WifiOff, AlertCircle, RefreshCw, Edit, Trash2, EyeIcon, Upload, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart } from 'recharts';
import type { AccountTransaction, Holding } from '../App';

interface AccountDetailsScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
  account: any;
}

// Mock transaction data
const mockTransactions: AccountTransaction[] = [
  {
    id: '1',
    date: new Date(2025, 6, 27, 8, 30),
    description: 'Starbucks Coffee',
    merchant: 'Starbucks',
    amount: -5.47,
    category: 'Food & Drink',
    categoryIcon: '☕',
    status: 'posted'
  },
  {
    id: '2',
    date: new Date(2025, 6, 27, 14, 15),
    description: 'Amazon Purchase',
    merchant: 'Amazon.com',
    amount: -89.99,
    category: 'Shopping',
    categoryIcon: '🛒',
    status: 'posted'
  },
  {
    id: '3',
    date: new Date(2025, 6, 26, 16, 45),
    description: 'Salary Deposit',
    merchant: 'Acme Corp',
    amount: 3500.00,
    category: 'Income',
    categoryIcon: '💰',
    status: 'posted'
  },
  {
    id: '4',
    date: new Date(2025, 6, 26, 9, 20),
    description: 'Gas Station',
    merchant: 'Shell',
    amount: -45.32,
    category: 'Transportation',
    categoryIcon: '⛽',
    status: 'posted'
  },
  {
    id: '5',
    date: new Date(2025, 6, 25, 19, 30),
    description: 'Netflix Subscription',
    merchant: 'Netflix',
    amount: -15.99,
    category: 'Entertainment',
    categoryIcon: '🎬',
    status: 'pending'
  }
];

// Mock holdings data for investment accounts
const mockHoldings: Holding[] = [
  {
    id: '1',
    name: 'Apple Inc.',
    ticker: 'AAPL',
    type: 'stock',
    quantity: 25,
    currentPrice: 180.50,
    totalValue: 4512.50,
    dailyChange: 125.00,
    dailyChangePercent: 2.85,
    totalGainLoss: 512.50,
    totalGainLossPercent: 12.8,
    averageCostBasis: 160.00,
    icon: '🍎'
  },
  {
    id: '2',
    name: 'Bitcoin',
    ticker: 'BTC',
    type: 'crypto',
    quantity: 0.5,
    currentPrice: 65000.00,
    totalValue: 32500.00,
    dailyChange: -1500.00,
    dailyChangePercent: -4.41,
    totalGainLoss: 7500.00,
    totalGainLossPercent: 30.0,
    averageCostBasis: 50000.00,
    icon: '₿'
  },
  {
    id: '3',
    name: 'S&P 500 ETF',
    ticker: 'SPY',
    type: 'etf',
    quantity: 15,
    currentPrice: 450.25,
    totalValue: 6753.75,
    dailyChange: 67.50,
    dailyChangePercent: 1.01,
    totalGainLoss: 253.75,
    totalGainLossPercent: 3.9,
    averageCostBasis: 433.33,
    icon: '📈'
  }
];

// Mock balance history data
const mockBalanceHistory = [
  { period: 'Jan', balance: 4200 },
  { period: 'Feb', balance: 4650 },
  { period: 'Mar', balance: 4100 },
  { period: 'Apr', balance: 4800 },
  { period: 'May', balance: 5200 },
  { period: 'Jun', balance: 5584 }
];

// Mock portfolio performance data
const mockPortfolioHistory = [
  { period: 'Jan', value: 42000 },
  { period: 'Feb', value: 44200 },
  { period: 'Mar', value: 41800 },
  { period: 'Apr', value: 46500 },
  { period: 'May', value: 48200 },
  { period: 'Jun', value: 45679 }
];

const COLORS = ['#4ade80', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export default function AccountDetailsScreen({ onBack, onNavigate, account }: AccountDetailsScreenProps) {
  const [showBalance, setShowBalance] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [timePeriod, setTimePeriod] = useState('month');
  const [transactionFilter, setTransactionFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!account) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Account Not Found</h2>
          <p className="text-gray-600 mb-4">The account details could not be loaded.</p>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  const isInvestmentAccount = ['investment', '401k', 'brokerage', 'ira'].includes(account.subtype?.toLowerCase() || account.type?.toLowerCase());
  
  const formatCurrency = (amount: number) => {
    if (!showBalance) return '••••••';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <Wifi className="h-3 w-3 text-green-500" />;
      case 'needs_attention':
        return <AlertCircle className="h-3 w-3 text-orange-500" />;
      case 'disconnected':
        return <WifiOff className="h-3 w-3 text-red-500" />;
      case 'manual':
        return <div className="h-3 w-3 rounded-full bg-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'needs_attention':
        return 'Needs Attention';
      case 'disconnected':
        return 'Disconnected';
      case 'manual':
        return 'Manual';
      default:
        return 'Unknown';
    }
  };

  const getLastSyncText = () => {
    if (!account.lastSync) return 'Never synced';
    
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - account.lastSync.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  // Filter transactions based on search and filter criteria
  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter(transaction => {
      const matchesSearch = searchTerm === '' || 
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = transactionFilter === 'all' ||
        (transactionFilter === 'income' && transaction.amount > 0) ||
        (transactionFilter === 'expense' && transaction.amount < 0) ||
        (transactionFilter === 'pending' && transaction.status === 'pending');
      
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, transactionFilter]);

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    const groups: Record<string, AccountTransaction[]> = {};
    
    filteredTransactions.forEach(transaction => {
      const dateKey = formatDate(transaction.date);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(transaction);
    });
    
    return groups;
  }, [filteredTransactions]);

  // Holdings breakdown for pie chart
  const holdingsBreakdown = useMemo(() => {
    return mockHoldings.map((holding, index) => ({
      name: holding.name,
      value: holding.totalValue,
      percentage: (holding.totalValue / mockHoldings.reduce((sum, h) => sum + h.totalValue, 0)) * 100,
      color: COLORS[index % COLORS.length]
    }));
  }, []);

  const handleRefresh = async () => {
    if (account.status === 'manual') return; // Can't refresh manual accounts
    
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const handleTransactionClick = (transaction: AccountTransaction) => {
    onNavigate?.('transaction-details-screen', { transaction });
  };

  const handleHoldingClick = (holding: Holding) => {
    onNavigate?.('holding-details', { holding });
  };

  const renderMoreOptionsMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="p-2">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => onNavigate?.('edit-account', { account })}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Account Details
        </DropdownMenuItem>
        
        {account.status !== 'manual' && (
          <DropdownMenuItem onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Account
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem>
          <EyeIcon className="h-4 w-4 mr-2" />
          {account.isHidden ? 'Show Account' : 'Hide Account'}
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          <EyeOff className="h-4 w-4 mr-2" />
          {account.isBalanceHidden ? 'Show Balance' : 'Hide Balance'}
        </DropdownMenuItem>
        
        {account.status === 'manual' && (
          <DropdownMenuItem>
            <Upload className="h-4 w-4 mr-2" />
            Upload History
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem>
          <Bell className="h-4 w-4 mr-2" />
          Account Notifications
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="text-red-600">
          <Trash2 className="h-4 w-4 mr-2" />
          {account.status === 'manual' ? 'Delete Account' : 'Unlink Account'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const renderAccountSummary = () => (
    <Card className="mx-4 mt-4">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="text-3xl">{account.institutionLogo}</div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-semibold text-gray-900">{account.name}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBalance(!showBalance)}
                className="p-1"
              >
                {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="text-sm text-gray-600 mb-1">
              {account.institution} • {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              {getStatusIcon(account.status)}
              <span>{getStatusText(account.status)}</span>
              <span>•</span>
              <span>Last updated: {getLastSyncText()}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="text-sm text-gray-500 mb-1">
            {isInvestmentAccount ? 'Portfolio Value' : 'Current Balance'}
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {formatCurrency(account.balance)}
          </div>
          
          {account.type === 'credit' && account.availableCredit && (
            <div className="text-sm text-gray-600 mt-1">
              Available Credit: {formatCurrency(account.availableCredit)}
            </div>
          )}
          
          {isInvestmentAccount && (
            <div className="flex items-center gap-2 mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-green-600 font-medium">+$1,234.56 (+2.8%)</span>
              <span className="text-gray-500">today</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderTransactionView = () => (
    <div className="space-y-4">
      {/* Balance Over Time Graph */}
      <Card className="mx-4">
        <CardHeader>
          <CardTitle className="text-base">Balance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mockBalanceHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="period" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis axisLine={false} tickLine={false} className="text-xs" tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Balance']} />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stroke="#4ade80" 
                fill="#4ade80" 
                fillOpacity={0.2} 
              />
            </AreaChart>
          </ResponsiveContainer>
          
          {/* Time Period Selector */}
          <div className="flex justify-center mt-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {['Week', 'Month', '3M', 'Year'].map((period) => (
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
        </CardContent>
      </Card>

      {/* Transaction Filters */}
      <div className="px-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={transactionFilter} onValueChange={setTransactionFilter}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expenses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Transaction List */}
      <div className="px-4">
        <Card>
          <CardContent className="p-0">
            {Object.entries(groupedTransactions).map(([dateGroup, transactions], groupIndex) => (
              <div key={dateGroup}>
                {groupIndex > 0 && <Separator />}
                
                <div className="p-4 bg-gray-50">
                  <h3 className="text-sm font-medium text-gray-700">{dateGroup}</h3>
                </div>
                
                <div className="divide-y">
                  {transactions.map((transaction, index) => (
                    <div
                      key={transaction.id}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleTransactionClick(transaction)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{transaction.categoryIcon}</div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                            {transaction.status === 'pending' && (
                              <Badge variant="secondary" className="text-xs">Pending</Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">{transaction.merchant}</div>
                          <div className="text-xs text-gray-500">{formatTime(transaction.date)}</div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`font-semibold ${
                            transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'
                          }`}>
                            {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                          </div>
                          <div className="text-xs text-gray-500">{transaction.category}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {filteredTransactions.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No transactions found
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Transaction FAB */}
      <div className="fixed bottom-6 right-6">
        <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );

  const renderInvestmentView = () => (
    <div className="space-y-4">
      {/* Portfolio Performance */}
      <Card className="mx-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Portfolio Performance</CardTitle>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-green-600 font-medium">+2.8%</span>
              <span className="text-gray-500">today</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mockPortfolioHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="period" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis axisLine={false} tickLine={false} className="text-xs" tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Value']} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.2} 
              />
            </AreaChart>
          </ResponsiveContainer>
          
          {/* Time Period Selector */}
          <div className="flex justify-center mt-4">
            <div className="flex bg-gray-100 rounded-lg p-1 text-xs">
              {['1D', '1W', '1M', '3M', 'YTD', '1Y', '5Y'].map((period) => (
                <button
                  key={period}
                  className={`px-2 py-1 rounded-md transition-colors ${
                    period === '1M' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Holdings Breakdown */}
      <Card className="mx-4">
        <CardHeader>
          <CardTitle className="text-base">Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <ResponsiveContainer width="50%" height={150}>
              <PieChart>
                <Pie
                  data={holdingsBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {holdingsBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="flex-1 space-y-2">
              {holdingsBreakdown.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="flex-1 text-gray-600">{item.name}</span>
                  <span className="font-medium">{item.percentage.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Holdings List */}
      <div className="px-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Holdings</h3>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {mockHoldings.map((holding) => (
                <div
                  key={holding.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleHoldingClick(holding)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{holding.icon}</div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">{holding.name}</h4>
                        {holding.ticker && (
                          <Badge variant="secondary" className="text-xs">{holding.ticker}</Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        {holding.quantity} {holding.type === 'stock' ? 'shares' : holding.type === 'crypto' ? holding.ticker : 'units'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatCurrency(holding.currentPrice)}/share
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {formatCurrency(holding.totalValue)}
                      </div>
                      <div className={`text-sm font-medium ${
                        holding.dailyChange >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {holding.dailyChange >= 0 ? '+' : ''}{formatCurrency(holding.dailyChange)} ({holding.dailyChangePercent.toFixed(2)}%)
                      </div>
                      <div className="text-xs text-gray-500">
                        Total: {holding.totalGainLoss >= 0 ? '+' : ''}{formatCurrency(holding.totalGainLoss)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
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
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-center flex-1">{account.name}</h1>
          {renderMoreOptionsMenu()}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-6">
        {renderAccountSummary()}
        
        <div className="mt-6">
          {isInvestmentAccount ? renderInvestmentView() : renderTransactionView()}
        </div>
      </div>
    </div>
  );
}