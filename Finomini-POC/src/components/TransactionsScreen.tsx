import { useState, useMemo } from 'react';
import { ArrowLeft, Eye, EyeOff, Filter, Search, Calendar, Settings, Plus, ArrowUpDown, MoreHorizontal, Edit3, RefreshCw, Receipt, CheckSquare, Square, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
// Removed TransactionEditModal import as we now use TransactionDetailsScreen

interface TransactionsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

// Enhanced mock transaction data with more variety and realistic dates
// Note: Adding missing fields to match AccountTransaction interface
const mockTransactions = [
  {
    id: '1',
    merchant: 'Starbucks Coffee',
    description: 'Starbucks Coffee Purchase',
    account: 'Chase Freedom ••••4526',
    amount: -5.47,
    date: new Date('2024-12-27'),
    category: 'Food & Dining',
    categoryIcon: '🍽️',
    subcategory: 'Coffee Shops',
    logo: '☕',
    logoColor: 'bg-amber-500',
    status: 'posted' as const,
    notes: 'Morning coffee',
    tags: ['Work'],
    isHidden: false,
    receipt: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
  },
  {
    id: '2',
    merchant: 'Amazon',
    description: 'Amazon Purchase',
    account: 'Chase Freedom ••••4526',
    amount: -89.99,
    date: new Date('2024-12-27'),
    category: 'Shopping',
    categoryIcon: '🛍️',
    subcategory: 'Online Shopping',
    logo: '📦',
    logoColor: 'bg-orange-500',
    status: 'posted' as const,
    notes: 'Christmas gifts',
    tags: ['Personal'],
    isHidden: false
  },
  {
    id: '3',
    merchant: 'Target',
    description: 'Target Purchase',
    account: 'Chase Freedom ••••4526',
    amount: -67.23,
    date: new Date('2024-12-26'),
    category: 'Shopping',
    categoryIcon: '🛍️',
    subcategory: 'Groceries',
    logo: '🎯',
    logoColor: 'bg-red-600',
    status: 'posted' as const,
    notes: 'Groceries',
    tags: [],
    isHidden: false,
    receipt: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
  },
  {
    id: '4',
    merchant: 'Salary Deposit',
    description: 'Bi-weekly Salary Deposit',
    account: 'Chase Checking ••••1234',
    amount: 3500.00,
    date: new Date('2024-12-25'),
    category: 'Income',
    categoryIcon: '💰',
    subcategory: 'Salary',
    logo: '💰',
    logoColor: 'bg-green-500',
    status: 'posted' as const,
    notes: 'Bi-weekly paycheck',
    tags: ['Work'],
    isHidden: false
  },
  {
    id: '5',
    merchant: 'Uber',
    description: 'Uber Ride',
    account: 'Chase Freedom ••••4526',
    amount: -24.50,
    date: new Date('2024-12-24'),
    category: 'Transportation',
    categoryIcon: '🚗',
    subcategory: 'Uber/Lyft',
    logo: '🚗',
    logoColor: 'bg-gray-900',
    status: 'posted' as const,
    notes: 'Airport ride',
    tags: ['Work'],
    isHidden: false
  },
  {
    id: '6',
    merchant: 'Netflix',
    description: 'Netflix Subscription',
    account: 'Chase Freedom ••••4526',
    amount: -15.99,
    date: new Date('2024-12-23'),
    category: 'Entertainment',
    categoryIcon: '🎬',
    subcategory: 'Streaming Services',
    logo: '🎬',
    logoColor: 'bg-red-500',
    status: 'pending' as const,
    notes: '',
    tags: ['Subscription'],
    isHidden: false
  },
  {
    id: '7',
    merchant: 'Shell Gas Station',
    description: 'Gas Purchase',
    account: 'Chase Freedom ••••4526',
    amount: -45.20,
    date: new Date('2024-12-23'),
    category: 'Transportation',
    categoryIcon: '🚗',
    subcategory: 'Gas',
    logo: '⛽',
    logoColor: 'bg-yellow-500',
    status: 'posted' as const,
    notes: '',
    tags: [],
    isHidden: false
  },
  {
    id: '8',
    merchant: 'Venmo Transfer',
    description: 'Venmo Payment',
    account: 'Chase Checking ••••1234',
    amount: -50.00,
    date: new Date('2024-12-22'),
    category: 'Transfer',
    categoryIcon: '💸',
    subcategory: 'P2P Transfer',
    logo: '💸',
    logoColor: 'bg-blue-500',
    status: 'posted' as const,
    notes: 'Split dinner bill',
    tags: ['Personal'],
    isHidden: false
  },
  {
    id: '9',
    merchant: 'Whole Foods',
    description: 'Whole Foods Purchase',
    account: 'Chase Freedom ••••4526',
    amount: -124.67,
    date: new Date('2024-12-22'),
    category: 'Food & Dining',
    categoryIcon: '🍽️',
    subcategory: 'Groceries',
    logo: '🛒',
    logoColor: 'bg-green-600',
    status: 'posted' as const,
    notes: 'Weekly groceries',
    tags: [],
    isHidden: false
  },
  {
    id: '10',
    merchant: 'Apple Store',
    description: 'Apple Store Purchase',
    account: 'Chase Freedom ••••4526',
    amount: -999.00,
    date: new Date('2024-12-21'),
    category: 'Shopping',
    categoryIcon: '🛍️',
    subcategory: 'Electronics',
    logo: '🍎',
    logoColor: 'bg-gray-800',
    status: 'posted' as const,
    notes: 'New iPhone',
    tags: ['Personal'],
    isHidden: false
  }
];

// Mock account data
const mockAccounts = [
  { id: '1', name: 'Chase Freedom ••••4526', balance: 2847.50, type: 'Credit Card' },
  { id: '2', name: 'Chase Checking ••••1234', balance: 5584.00, type: 'Checking' },
  { id: '3', name: 'High Yield Savings ••••9876', balance: 15420.75, type: 'Savings' },
  { id: '4', name: 'All Accounts', balance: 23852.25, type: 'Combined' }
];

export default function TransactionsScreen({ onBack, onNavigate }: TransactionsScreenProps) {
  const [selectedAccount, setSelectedAccount] = useState('4');
  const [showBalances, setShowBalances] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState(mockTransactions);
  // Removed edit modal state as we now use TransactionDetailsScreen
  const [sortOrder, setSortOrder] = useState('date-desc');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState('all');
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);

  const selectedAccountData = mockAccounts.find(acc => acc.id === selectedAccount);
  
  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions.filter(transaction => {
      const matchesSearch = transaction.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           transaction.notes.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = selectedFilter === 'all' || 
                           (selectedFilter === 'income' && transaction.amount > 0) ||
                           (selectedFilter === 'expenses' && transaction.amount < 0) ||
                           (selectedFilter === 'pending' && transaction.status === 'pending');
      
      const matchesAccount = selectedAccount === '4' || transaction.account.includes(selectedAccountData?.name?.slice(-4) || '');
      
      return matchesSearch && matchesFilter && matchesAccount && !transaction.isHidden;
    });

    // Sort transactions
    filtered.sort((a, b) => {
      switch (sortOrder) {
        case 'date-desc':
          return b.date.getTime() - a.date.getTime();
        case 'date-asc':
          return a.date.getTime() - b.date.getTime();
        case 'amount-desc':
          return Math.abs(b.amount) - Math.abs(a.amount);
        case 'amount-asc':
          return Math.abs(a.amount) - Math.abs(b.amount);
        case 'merchant-asc':
          return a.merchant.localeCompare(b.merchant);
        case 'category-asc':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [transactions, searchQuery, selectedFilter, selectedAccount, selectedAccountData, sortOrder]);

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    const groups: { [key: string]: typeof filteredAndSortedTransactions } = {};
    
    filteredAndSortedTransactions.forEach(transaction => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      let dateKey: string;
      if (transaction.date.toDateString() === today.toDateString()) {
        dateKey = 'Today';
      } else if (transaction.date.toDateString() === yesterday.toDateString()) {
        dateKey = 'Yesterday';
      } else {
        dateKey = transaction.date.toLocaleDateString('en-US', { 
          weekday: 'long',
          month: 'long', 
          day: 'numeric',
          year: transaction.date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
        });
      }
      
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(transaction);
    });
    
    return groups;
  }, [filteredAndSortedTransactions]);

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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
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

  const handleBulkEditSave = (updatedTransactions: any[]) => {
    // Create a map of updated transactions for easy lookup
    const updatedTransactionMap = new Map(updatedTransactions.map(t => [t.id, t]));
    
    // Update the transactions state with the bulk edited transactions
    setTransactions(prevTransactions => 
      prevTransactions.map(transaction => 
        updatedTransactionMap.has(transaction.id) 
          ? updatedTransactionMap.get(transaction.id)! 
          : transaction
      )
    );
    
    // Reset selection mode
    setIsSelectionMode(false);
    setSelectedTransactions([]);
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
              {mockAccounts.map((account) => (
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
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedFilter === option.value
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
      {isRefreshing && (
        <div className="flex items-center justify-center py-4">
          <RefreshCw className="h-4 w-4 animate-spin mr-2" />
          <span className="text-sm text-muted-foreground">Refreshing transactions...</span>
        </div>
      )}

      {/* Transactions List */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <div className="space-y-4 mt-4">
          {Object.keys(groupedTransactions).length === 0 ? (
            <Card className="border-border">
              <CardContent className="py-8 text-center">
                <div className="text-muted-foreground">
                  <p>No transactions found</p>
                  <p className="text-sm mt-1">Try adjusting your search or filters</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            Object.entries(groupedTransactions).map(([dateGroup, transactions]) => (
              <div key={dateGroup} className="space-y-2">
                {/* Date Header */}
                <div className="flex items-center justify-between px-2 py-1">
                  <h3 className="font-semibold text-foreground">{dateGroup}</h3>
                  <span className="text-sm text-muted-foreground">
                    {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                {/* Transactions for this date */}
                <div className="space-y-2">
                  {transactions.map((transaction) => (
                    <Card 
                      key={transaction.id} 
                      className={`border-border hover:bg-accent/50 transition-colors ${
                        isSelectionMode && selectedTransactions.includes(transaction.id) ? 'ring-2 ring-primary' : ''
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          {/* Selection Checkbox */}
                          {isSelectionMode && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleTransactionSelection(transaction.id)}
                              className="h-8 w-8 p-0"
                            >
                              {selectedTransactions.includes(transaction.id) ? (
                                <CheckSquare className="h-5 w-5 text-primary" />
                              ) : (
                                <Square className="h-5 w-5" />
                              )}
                            </Button>
                          )}

                          {/* Transaction Icon */}
                          <div className={`w-12 h-12 rounded-full ${transaction.logoColor} flex items-center justify-center text-white text-lg flex-shrink-0`}>
                            {transaction.logo}
                          </div>

                          {/* Transaction Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 
                                className="font-semibold text-foreground truncate cursor-pointer hover:text-primary"
                                onClick={() => onNavigate('transaction-details-screen', { transaction })}
                              >
                                {transaction.merchant}
                              </h3>
                              <div className="flex items-center gap-2">
                                {transaction.status === 'pending' && (
                                  <Badge variant="outline" className="text-xs">
                                    Pending
                                  </Badge>
                                )}
                                {transaction.receipt && (
                                  <Receipt className="h-4 w-4 text-muted-foreground" />
                                )}
                                <span className={`font-semibold ${
                                  transaction.amount > 0 ? 'text-green-600' : 'text-foreground'
                                }`}>
                                  {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mt-1 text-sm text-muted-foreground">
                              <span className="truncate">{transaction.category} • {transaction.account}</span>
                              <span className="flex-shrink-0">
                                {transaction.date.toLocaleTimeString('en-US', { 
                                  hour: 'numeric', 
                                  minute: '2-digit',
                                  hour12: true 
                                })}
                              </span>
                            </div>

                            {/* Tags */}
                            {transaction.tags && transaction.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {transaction.tags.map((tag: string) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            {/* Notes */}
                            {transaction.notes && (
                              <div className="mt-1 text-xs text-muted-foreground italic">
                                {transaction.notes}
                              </div>
                            )}
                          </div>

                          {/* Action Menu - Only show if not in selection mode */}
                          {!isSelectionMode && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                  <DropdownMenuItem 
                                  onClick={() => onNavigate('transaction-details-screen', { transaction })}
                                  className="flex items-center gap-2"
                                >
                                  <Edit3 className="h-4 w-4" />
                                  Edit Transaction
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => onNavigate('split-transaction', { transaction })}
                                  className="flex items-center gap-2"
                                >
                                  Split Transaction
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => onNavigate('create-rule', { merchant: transaction.merchant })}
                                  className="flex items-center gap-2"
                                >
                                  Create Rule for {transaction.merchant}
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => onNavigate('merchant-trend', { merchant: transaction.merchant })}
                                  className="flex items-center gap-2"
                                >
                                  View Merchant Trend
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => onNavigate('transaction-details-screen', { transaction })}
                                  className="flex items-center gap-2"
                                >
                                  View Details
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          )}
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