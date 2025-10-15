import { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Eye, EyeOff, Filter, Search, Settings, Plus, ArrowUpDown, RefreshCw, CheckSquare, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { OptimizedTransactionList } from './OptimizedTransactionList';
import {
  useAppStore,
  useTransactions,
  useAccounts,
  useLoadingStates,
  useErrorStates,
  useIsInitialized
} from '../stores';

interface TransactionsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}



export default function TransactionsScreen({ onBack, onNavigate }: TransactionsScreenProps) {
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [showBalances, setShowBalances] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('date-desc');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState('all');
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);

  // Store data
  const transactions = useTransactions();
  const accounts = useAccounts();
  const loadingStates = useLoadingStates();
  const errorStates = useErrorStates();
  const isInitialized = useIsInitialized();

  // Store actions
  const {
    initializeStore,
    syncPlaidData,
    updateTransaction,
    syncStatus
  } = useAppStore();

  // Initialize store on mount
  useEffect(() => {
    if (!isInitialized) {
      initializeStore();
    }
  }, [isInitialized, initializeStore]);

  // Show loading state while initializing
  if (!isInitialized || loadingStates.transactions.isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading transactions...</p>
        </div>
      </div>
    );
  }

  // Show error state if there are critical errors
  if (errorStates.transactions.hasError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Unable to Load Transactions</h3>
          <p className="text-muted-foreground mb-4">{errorStates.transactions.message || 'There was an error loading your transactions.'}</p>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Create account options including "All Accounts"
  const accountOptions = useMemo(() => {
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
    return [
      { id: 'all', name: 'All Accounts', balance: totalBalance, type: 'Combined' },
      ...accounts.map(acc => ({
        id: acc.id,
        name: `${acc.name} ••••${acc.id.slice(-4)}`,
        balance: acc.balance,
        type: acc.type.charAt(0).toUpperCase() + acc.type.slice(1)
      }))
    ];
  }, [accounts]);





  const getAccountDisplayName = (accountId?: string) => {
    if (!accountId) return 'Manual Entry';
    const account = accounts.find(acc => acc.id === accountId);
    return account ? `${account.name} ••••${account.id.slice(-4)}` : 'Unknown Account';
  };

  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions.filter(transaction => {
      const searchTerm = searchQuery.toLowerCase();
      const matchesSearch =
        (transaction.merchant?.toLowerCase().includes(searchTerm) || false) ||
        transaction.description.toLowerCase().includes(searchTerm) ||
        transaction.category.toLowerCase().includes(searchTerm) ||
        (transaction.notes?.toLowerCase().includes(searchTerm) || false);

      const matchesFilter = selectedFilter === 'all' ||
        (selectedFilter === 'income' && transaction.amount > 0) ||
        (selectedFilter === 'expenses' && transaction.amount < 0) ||
        (selectedFilter === 'pending' && transaction.status === 'pending');

      const matchesAccount = selectedAccount === 'all' || transaction.account_id === selectedAccount;

      return matchesSearch && matchesFilter && matchesAccount && !transaction.is_hidden;
    });

    // Sort transactions
    filtered.sort((a, b) => {
      switch (sortOrder) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'amount-desc':
          return Math.abs(b.amount) - Math.abs(a.amount);
        case 'amount-asc':
          return Math.abs(a.amount) - Math.abs(b.amount);
        case 'merchant-asc':
          return (a.merchant || a.description).localeCompare(b.merchant || b.description);
        case 'category-asc':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [transactions, searchQuery, selectedFilter, selectedAccount, sortOrder]);



  // Calculate summary data
  const summaryData = useMemo(() => {
    const income = filteredAndSortedTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const expenses = Math.abs(filteredAndSortedTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
    const netFlow = income - expenses;

    return { income, expenses, netFlow };
  }, [filteredAndSortedTransactions]);

  const formatCurrency = (amount: number, hideDecimals = false) => {
    if (!showBalances) return '••••••';
    const options: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: hideDecimals ? 0 : 2,
      maximumFractionDigits: hideDecimals ? 0 : 2
    };
    return new Intl.NumberFormat('en-US', options).format(Math.abs(amount));
  };

  // Removed modal handlers as we now use TransactionDetailsScreen

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await syncPlaidData();
    } catch (error) {
      console.error('Failed to sync transactions:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedTransactions([]);
  };

  const toggleTransactionSelection = (transactionId: string) => {
    setSelectedTransactions(prev =>
      prev.includes(transactionId)
        ? prev.filter(id => id !== transactionId)
        : [...prev, transactionId]
    );
  };

  const selectAllTransactions = () => {
    const allTransactionIds = filteredAndSortedTransactions.map(t => t.id);
    setSelectedTransactions(
      selectedTransactions.length === allTransactionIds.length ? [] : allTransactionIds
    );
  };

  const handleBulkEdit = () => {
    const selectedTransactionObjects = filteredAndSortedTransactions.filter(t =>
      selectedTransactions.includes(t.id)
    );

    onNavigate('bulk-edit-transactions', {
      transactions: selectedTransactionObjects,
      onSave: handleBulkEditSave
    });
  };

  const handleBulkEditSave = async (updatedTransactions: any[]) => {
    try {
      // Update each transaction in the store
      for (const transaction of updatedTransactions) {
        await updateTransaction(transaction.id, transaction);
      }

      // Reset selection mode
      setIsSelectionMode(false);
      setSelectedTransactions([]);
    } catch (error) {
      console.error('Failed to save bulk edits:', error);
    }
  };

  const sortOptions = [
    { value: 'date-desc', label: 'Date (Newest First)' },
    { value: 'date-asc', label: 'Date (Oldest First)' },
    { value: 'amount-desc', label: 'Amount (High to Low)' },
    { value: 'amount-asc', label: 'Amount (Low to High)' },
    { value: 'merchant-asc', label: 'Merchant Name (A-Z)' },
    { value: 'category-asc', label: 'Category (A-Z)' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All', count: filteredAndSortedTransactions.length },
    { value: 'income', label: 'Income', count: filteredAndSortedTransactions.filter(t => t.amount > 0).length },
    { value: 'expenses', label: 'Expenses', count: filteredAndSortedTransactions.filter(t => t.amount < 0).length },
    { value: 'pending', label: 'Pending', count: filteredAndSortedTransactions.filter(t => t.status === 'pending').length }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Status Bar */}
      <div className="bg-card flex flex-row items-center justify-between px-4 pt-[21px] pb-0 h-[50px]">
        <div className="text-[17px] text-foreground font-semibold">9:41</div>
        <div className="h-2.5 w-[124px]" />
        <div className="flex items-center gap-[7px]">
          <div className="w-[19.2px] h-[12.226px] bg-foreground rounded-sm" />
          <div className="w-[17.142px] h-[12.328px] bg-foreground rounded-sm" />
          <div className="w-[27.328px] h-[13px] border border-foreground rounded-[3.8px] relative">
            <div className="w-[21px] h-[9px] bg-foreground rounded-[2.5px] absolute left-[2px] top-[2px]" />
            <div className="w-[1.328px] h-[5px] bg-foreground rounded-r absolute right-0 top-[4px]" />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <h1 className="text-xl font-semibold text-foreground">
            {isSelectionMode ? `${selectedTransactions.length} selected` : 'Transactions'}
          </h1>

          <div className="flex items-center gap-2">
            {isSelectionMode ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={selectAllTransactions}
                  className="text-xs"
                >
                  {selectedTransactions.length === filteredAndSortedTransactions.length ? 'None' : 'All'}
                </Button>
                <Button
                  size="sm"
                  onClick={handleBulkEdit}
                  disabled={selectedTransactions.length === 0}
                  className="flex items-center gap-1"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSelectionMode}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRefresh}
                  disabled={isRefreshing || syncStatus.isActive}
                  className="p-2"
                >
                  <RefreshCw className={`h-5 w-5 ${(isRefreshing || syncStatus.isActive) ? 'animate-spin' : ''}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSelectionMode}
                  className="p-2"
                >
                  <CheckSquare className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onNavigate('transaction-settings')}
                  className="p-2"
                >
                  <Settings className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onNavigate('add-manual-transaction')}
                  className="p-2"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Account Selector */}
        <div className="space-y-3">
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger className="w-full bg-input-background border border-border">
              <SelectValue placeholder="Select Account" />
            </SelectTrigger>
            <SelectContent>
              {accountOptions.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{account.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{account.type}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Selection Mode Banner */}
      {isSelectionMode && (
        <div className="bg-primary/10 border border-primary/20 mx-4 mt-4 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Selection Mode Active
              </span>
            </div>
            <span className="text-xs text-primary/70">
              Tap transactions to select them
            </span>
          </div>
        </div>
      )}

      {/* Summary Bar */}
      <Card className="mx-4 mt-4 border-border">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Spent</p>
                <p className="font-semibold text-red-600">
                  {formatCurrency(summaryData.expenses)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Income</p>
                <p className="font-semibold text-green-600">
                  {formatCurrency(summaryData.income)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Net</p>
                <p className={`font-semibold ${summaryData.netFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {summaryData.netFlow >= 0 ? '+' : ''}{formatCurrency(summaryData.netFlow)}
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowBalances(!showBalances)}
              className="p-2"
            >
              {showBalances ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search & Filter Bar */}
      <div className="px-4 mt-4 space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input-background border-border"
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-border">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-h-[80vh]">
              <SheetHeader>
                <SheetTitle>Filter Transactions</SheetTitle>
                <SheetDescription>
                  Apply filters to refine your transaction view by date range and other criteria.
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Date Range</label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="this-month">This Month</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="this-quarter">This Quarter</SelectItem>
                      <SelectItem value="this-year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1">Clear All</Button>
                  <Button className="flex-1">Apply Filters</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="border-border">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setSortOrder(option.value)}
                  className={sortOrder === option.value ? 'bg-accent' : ''}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedFilter(option.value)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedFilter === option.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
            >
              {option.label}
              {option.count > 0 && (
                <Badge
                  variant={selectedFilter === option.value ? "secondary" : "outline"}
                  className="h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {option.count}
                </Badge>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Pull to Refresh Indicator */}
      {(isRefreshing || syncStatus.isActive) && (
        <div className="flex items-center justify-center py-4">
          <RefreshCw className="h-4 w-4 animate-spin mr-2" />
          <span className="text-sm text-muted-foreground">
            {syncStatus.isActive ? 'Syncing with bank accounts...' : 'Refreshing transactions...'}
          </span>
        </div>
      )}

      {/* Sync Status */}
      {syncStatus.lastSync && (
        <div className="px-4 pb-2">
          <p className="text-xs text-muted-foreground text-center">
            Last synced: {syncStatus.lastSync.toLocaleString()}
          </p>
        </div>
      )}

      {/* Transactions List */}
      <div className="flex-1 px-4 pb-6">
        <div className="mt-4">
          <OptimizedTransactionList
            transactions={filteredAndSortedTransactions}
            onTransactionClick={(transaction) => onNavigate('transaction-details-screen', { transaction })}
            onNavigate={onNavigate}
            isSelectionMode={isSelectionMode}
            selectedTransactions={selectedTransactions}
            onToggleSelection={toggleTransactionSelection}
            formatCurrency={formatCurrency}
            getAccountDisplayName={getAccountDisplayName}
            enableVirtualScrolling={filteredAndSortedTransactions.length > 100}
            enableInfiniteScroll={filteredAndSortedTransactions.length > 200}
            pageSize={50}
            containerHeight={500}
            itemHeight={120}
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <button
            className="flex flex-col items-center hover:opacity-80 transition-opacity"
            onClick={() => onNavigate('dashboard')}
          >
            <div className="w-6 h-6 mb-1">🏠</div>
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1">🔄</div>
            <span className="text-xs font-medium text-blue-600">Transactions</span>
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
    </div>
  );
}