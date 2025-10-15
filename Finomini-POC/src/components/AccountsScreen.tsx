import { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Settings, Plus, Eye, EyeOff, TrendingUp, RefreshCw, Wifi, WifiOff, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart } from 'recharts';
import {
  useAppStore,
  useAccounts,
  useLoadingStates,
  useErrorStates,
  useSyncStatus,
  useIsInitialized
} from '../stores';

interface AccountsScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}



// Mock historical data for graphs
const mockNetWorthData = [
  { period: '2021', assets: 120000, liabilities: 280000, netWorth: -160000 },
  { period: '2022', assets: 135000, liabilities: 275000, netWorth: -140000 },
  { period: '2023', assets: 150000, liabilities: 265000, netWorth: -115000 },
  { period: '2024', assets: 165000, liabilities: 255000, netWorth: -90000 },
  { period: '2025', assets: 180000, liabilities: 245000, netWorth: -65000 }
];

const mockIncomeExpenseData = [
  { month: 'Jan', income: 5500, expenses: 4200, net: 1300 },
  { month: 'Feb', income: 5500, expenses: 3800, net: 1700 },
  { month: 'Mar', income: 5500, expenses: 4500, net: 1000 },
  { month: 'Apr', income: 5500, expenses: 4100, net: 1400 },
  { month: 'May', income: 5500, expenses: 4600, net: 900 },
  { month: 'Jun', income: 5500, expenses: 4000, net: 1500 }
];

const COLORS = ['#4ade80', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function AccountsScreen({ onBack, onNavigate }: AccountsScreenProps) {
  const [showBalances, setShowBalances] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    bank: true,
    credit: true,
    investment: true,
    loan: true,
    manual: true
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedGraphType, setSelectedGraphType] = useState('net-worth');
  const [accountTypeFilter, setAccountTypeFilter] = useState('all');
  const [timePeriod, setTimePeriod] = useState('year');

  // Store data
  const accounts = useAccounts();
  const loadingStates = useLoadingStates();
  const errorStates = useErrorStates();
  const syncStatus = useSyncStatus();
  const isInitialized = useIsInitialized();

  // Store actions
  const {
    initializeStore,
    syncPlaidData
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading accounts...</p>
        </div>
      </div>
    );
  }

  // Show error state if there are critical errors
  if (errorStates.accounts.hasError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Unable to Load Accounts</h3>
          <p className="text-muted-foreground mb-4">{errorStates.accounts.message || 'There was an error loading your accounts.'}</p>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Helper functions to transform real account data
  const getAccountCategory = (type: string) => {
    switch (type) {
      case 'checking':
      case 'savings':
        return 'bank';
      case 'credit':
        return 'credit';
      case 'investment':
        return 'investment';
      default:
        return 'manual';
    }
  };

  const getAccountStatus = (account: any) => {
    if (!account.plaid_account_id) return 'manual';
    if (!account.last_synced) return 'needs_attention';

    const hoursSinceSync = (Date.now() - new Date(account.last_synced).getTime()) / (1000 * 60 * 60);
    if (hoursSinceSync > 24) return 'needs_attention';

    return 'connected';
  };

  const getInstitutionLogo = (institutionName?: string) => {
    if (!institutionName) return '💵';
    const name = institutionName.toLowerCase();
    if (name.includes('chase')) return '🏦';
    if (name.includes('wells')) return '🏦';
    if (name.includes('bank')) return '🏦';
    if (name.includes('fidelity')) return '📈';
    if (name.includes('marcus')) return '💰';
    return '🏦';
  };

  // Transform real accounts to UI format
  const transformedAccounts = useMemo(() => {
    return accounts.map(account => ({
      id: account.id,
      name: account.name,
      type: account.type,
      subtype: account.type,
      balance: account.balance,
      accountNumber: `****${account.id.slice(-4)}`,
      institution: account.institution_name || 'Manual Account',
      institutionLogo: getInstitutionLogo(account.institution_name),
      status: getAccountStatus(account),
      lastSync: account.last_synced ? new Date(account.last_synced) : new Date(),
      isHidden: false,
      isBalanceHidden: false,
      category: getAccountCategory(account.type)
    }));
  }, [accounts]);

  // Organize accounts by category - memoized to prevent re-creation on every render
  const organizedAccounts = useMemo(() => {
    const accountGroups = {
      bank: { title: 'Bank Accounts', accounts: [] as any[] },
      credit: { title: 'Credit Accounts', accounts: [] as any[] },
      investment: { title: 'Investment Accounts', accounts: [] as any[] },
      loan: { title: 'Loan Accounts', accounts: [] as any[] },
      manual: { title: 'Manual Accounts', accounts: [] as any[] }
    };

    transformedAccounts.forEach(account => {
      if (!account.isHidden) {
        accountGroups[account.category as keyof typeof accountGroups].accounts.push(account);
      }
    });

    return accountGroups;
  }, [transformedAccounts]);

  // Calculate account breakdown data based on filter
  const accountBreakdownData = useMemo(() => {
    let filteredAccounts = transformedAccounts.filter(account => !account.isHidden);

    if (accountTypeFilter !== 'all') {
      filteredAccounts = filteredAccounts.filter(account => account.category === accountTypeFilter);
    }

    const breakdown = filteredAccounts.reduce((acc, account) => {
      const key = account.category;
      if (!acc[key]) {
        acc[key] = { name: key, value: 0, count: 0 };
      }
      acc[key].value += Math.abs(account.balance);
      acc[key].count += 1;
      return acc;
    }, {} as Record<string, { name: string; value: number; count: number }>);

    return Object.values(breakdown).map((item, index) => ({
      ...item,
      name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      color: COLORS[index % COLORS.length]
    }));
  }, [transformedAccounts, accountTypeFilter]);

  const formatCurrency = (amount: number) => {
    if (!showBalances) return '••••••';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getTotalAssets = () => {
    return accounts
      .filter(account => account.balance > 0 && account.is_active)
      .reduce((total, account) => total + account.balance, 0);
  };

  const getTotalDebt = () => {
    return Math.abs(accounts
      .filter(account => account.balance < 0 && account.is_active)
      .reduce((total, account) => total + account.balance, 0));
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

  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    try {
      await syncPlaidData();
    } catch (error) {
      console.error('Failed to sync accounts:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleAccountClick = (account: any) => {
    onNavigate?.('account-details', { account });
  };

  const handleAddAccount = () => {
    onNavigate?.('add-account');
  };

  const handleManageConnections = () => {
    onNavigate?.('manage-connections');
  };

  const handleAccountsSettings = () => {
    onNavigate?.('accounts-settings');
  };

  const accountsNeedingAttention = accounts.filter(account => {
    // Check if account needs attention (e.g., not synced recently)
    const lastSyncTime = account.last_synced?.getTime() || 0;
    const hoursAgo = (Date.now() - lastSyncTime) / (1000 * 60 * 60);
    return hoursAgo > 24; // Needs attention if not synced in 24 hours
  }).length;

  const renderGraph = () => {
    switch (selectedGraphType) {
      case 'net-worth':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mockNetWorthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="period" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis axisLine={false} tickLine={false} className="text-xs" tickFormatter={(value) => `$${value / 1000}k`} />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
              <Area
                type="monotone"
                dataKey="assets"
                stackId="1"
                stroke="#4ade80"
                fill="#4ade80"
                fillOpacity={0.6}
                name="Assets"
              />
              <Area
                type="monotone"
                dataKey="liabilities"
                stackId="2"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.6}
                name="Liabilities"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'income-expense':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockIncomeExpenseData} barGap={10}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis axisLine={false} tickLine={false} className="text-xs" tickFormatter={(value) => `$${value / 1000}k`} />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
              <Bar dataKey="income" fill="#4ade80" name="Income" radius={[2, 2, 0, 0]} />
              <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'account-breakdown':
        return (
          <div className="flex items-center justify-center h-[200px]">
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie
                  data={accountBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {accountBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="ml-4 space-y-2">
              {accountBreakdownData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-gray-600">{entry.name}</span>
                  <span className="font-medium">{formatCurrency(entry.value)}</span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
          <h1 className="text-lg font-semibold text-center">Accounts</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate?.('plaid-connections')}
              className="text-xs"
            >
              Bank Connections
            </Button>
            <Button variant="ghost" size="icon" onClick={handleAccountsSettings} className="p-2">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleAddAccount} className="p-2">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Connection Status Alert */}
        {accountsNeedingAttention > 0 && (
          <div className="p-4 pb-0">
            <Alert className="border-orange-200 bg-orange-50">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                {accountsNeedingAttention} account{accountsNeedingAttention > 1 ? 's need' : ' needs'} attention.
                <Button
                  variant="link"
                  className="h-auto p-0 ml-1 text-orange-600 underline"
                  onClick={handleManageConnections}
                >
                  Manage connections
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Financial Summary */}
        <div className="bg-white mx-4 mt-4 rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-500">Total Net Worth</div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowBalances(!showBalances)}
              className="p-1"
            >
              {showBalances ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </div>

          <div className="text-2xl font-bold text-gray-900 mb-2">
            {formatCurrency(getTotalAssets() - getTotalDebt())}
          </div>

          <div className="flex items-center gap-2 text-sm mb-4">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-green-600 font-medium">6.1% (+$84.05)</span>
            <span className="text-gray-500">last {timePeriod}</span>
          </div>

          {/* Account Type Filter */}
          <div className="mb-4">
            <Select value={accountTypeFilter} onValueChange={setAccountTypeFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter accounts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                <SelectItem value="bank">Bank Accounts</SelectItem>
                <SelectItem value="credit">Credit Accounts</SelectItem>
                <SelectItem value="investment">Investment Accounts</SelectItem>
                <SelectItem value="loan">Loan Accounts</SelectItem>
                <SelectItem value="manual">Manual Accounts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Graph Section */}
        <div className="bg-white mx-4 mt-4 rounded-lg p-4 shadow-sm border">
          {/* Graph Type Selector */}
          <Tabs value={selectedGraphType} onValueChange={setSelectedGraphType} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="net-worth" className="text-xs">Net Worth</TabsTrigger>
              <TabsTrigger value="income-expense" className="text-xs">Cash Flow</TabsTrigger>
              <TabsTrigger value="account-breakdown" className="text-xs">Breakdown</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedGraphType} className="mt-0">
              {renderGraph()}
            </TabsContent>
          </Tabs>

          {/* Time Period Selector */}
          <div className="flex justify-center mt-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {['Week', 'Month', '3M', 'Year', 'All'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimePeriod(period.toLowerCase())}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${timePeriod === period.toLowerCase()
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

        {/* Account List Header */}
        <div className="px-4 pt-6 pb-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Accounts</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {syncStatus.lastSync ? (
                <span>Last synced: {new Date(syncStatus.lastSync).toLocaleTimeString()}</span>
              ) : (
                <span>Not synced yet</span>
              )}
              {syncStatus.isActive && <span className="text-blue-600">Syncing...</span>}
              <Button
                variant="ghost"
                size="icon"
                className="p-2"
                onClick={handleRefreshAll}
                disabled={isRefreshing || syncStatus.isActive}
              >
                <RefreshCw className={`h-4 w-4 ${(isRefreshing || syncStatus.isActive) ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </div>

        {/* Account Categories */}
        <div className="p-4 pt-0 space-y-4">
          {transformedAccounts.length === 0 ? (
            <Card className="border-border">
              <CardContent className="py-8 text-center">
                <div className="text-muted-foreground">
                  <div className="text-4xl mb-4">🏦</div>
                  <p className="text-lg font-medium mb-2">No accounts connected</p>
                  <p className="text-sm mb-4">Connect your bank accounts to start tracking your finances</p>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={() => onNavigate?.('plaid-link')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Connect Account
                    </Button>
                    <Button variant="outline" onClick={() => onNavigate?.('add-manual-account')}>
                      Add Manual Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            Object.entries(organizedAccounts).map(([categoryKey, category]) => {
              if (category.accounts.length === 0) return null;

              const isExpanded = expandedCategories[categoryKey];
              const categoryTotal = category.accounts.reduce((sum, account) => sum + Math.abs(account.balance), 0);

              return (
                <Card key={categoryKey} className="overflow-hidden">
                  <CardHeader
                    className="pb-3 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleCategory(categoryKey)}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        {category.title}
                        <Badge variant="secondary" className="text-xs">
                          {category.accounts.length}
                        </Badge>
                      </CardTitle>
                      <div className="text-sm font-medium text-gray-600">
                        {formatCurrency(categoryTotal)}
                      </div>
                    </div>
                  </CardHeader>

                  {isExpanded && (
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {category.accounts.map((account, accountIndex) => (
                          <div key={`${categoryKey}-${account.id}`}>
                            <div
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                              onClick={() => handleAccountClick(account)}
                            >
                              <div className="text-2xl">{account.institutionLogo}</div>

                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium text-gray-900">{account.name}</h3>
                                  {getStatusIcon(account.status)}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <span>{account.institution}</span>
                                  {account.accountNumber !== 'N/A' && (
                                    <>
                                      <span>•</span>
                                      <span>{account.accountNumber}</span>
                                    </>
                                  )}
                                </div>
                                <div className="text-xs text-gray-400">
                                  Last sync: {formatDate(account.lastSync)}
                                </div>
                              </div>

                              <div className="text-right">
                                <div className={`font-semibold ${account.balance < 0 ? 'text-red-600' : 'text-gray-900'
                                  }`}>
                                  {account.isBalanceHidden ? '••••••' : formatCurrency(account.balance)}
                                </div>
                                {account.type === 'credit' && account.availableCredit && (
                                  <div className="text-xs text-gray-500">
                                    {formatCurrency(account.availableCredit)} available
                                  </div>
                                )}
                                <div className="text-xs text-gray-400">
                                  {getStatusText(account.status)}
                                </div>
                              </div>
                            </div>

                            {accountIndex !== category.accounts.length - 1 && (
                              <Separator className="ml-14" />
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })
          )}

          {/* Add Account Card */}
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow border-dashed border-2 border-gray-300"
            onClick={handleAddAccount}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-3 text-gray-500">
                <Plus className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Add Account</div>
                  <div className="text-sm">Connect bank, credit card, or add manually</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-auto p-4 justify-start"
                  onClick={handleManageConnections}
                >
                  <div className="text-left">
                    <Settings className="h-5 w-5 mb-2" />
                    <div className="text-sm font-medium">Manage Connections</div>
                    <div className="text-xs text-gray-500">Fix connection issues</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 justify-start"
                  onClick={() => onNavigate?.('plaid-connections')}
                >
                  <div className="text-left">
                    <Wifi className="h-5 w-5 mb-2" />
                    <div className="text-sm font-medium">Bank Connections</div>
                    <div className="text-xs text-gray-500">Manage Plaid accounts</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <button
            className="flex flex-col items-center hover:opacity-80 transition-opacity"
            onClick={() => onNavigate?.('dashboard')}
          >
            <div className="w-6 h-6 mb-1">🏠</div>
            <span className="text-xs">Home</span>
          </button>
          <button
            className="flex flex-col items-center hover:opacity-80 transition-opacity"
            onClick={() => onNavigate?.('transactions')}
          >
            <div className="w-6 h-6 mb-1">🔄</div>
            <span className="text-xs">Transactions</span>
          </button>
          <button className="flex flex-col items-center">
            <div className="w-11 h-11 bg-green-100 rounded-full flex items-center justify-center mb-1 hover:bg-green-200 transition-colors">
              <Plus className="h-6 w-6 text-green-700" />
            </div>
          </button>
          <button className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1">💼</div>
            <span className="text-xs font-medium text-blue-600">Accounts</span>
          </button>
          <button
            className="flex flex-col items-center hover:opacity-80 transition-opacity"
            onClick={() => onNavigate?.('more')}
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
    </div>
  );
}