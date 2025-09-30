import { useState, useMemo } from 'react';
import { ArrowLeft, Settings, Plus, Search, Filter, TrendingUp, TrendingDown, MoreHorizontal, Heart, Move, Eye, EyeOff, Edit3 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

interface BudgetsScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

// Mock data with sub-category budgets
const mockCategories = [
  {
    id: '1',
    category: 'Groceries',
    icon: '🛒',
    color: 'bg-green-100',
    borderColor: 'border-green-200',
    group: 'Food & Dining',
    type: 'fixed',
    isFavorite: true,
    status: 'on-track',
    trend: 'down',
    trendPercent: 5,
    subCategories: [
      { id: '1a', name: 'Fresh Produce', spent: 180, budgeted: 250, icon: '🥬' },
      { id: '1b', name: 'Dairy & Eggs', spent: 85, budgeted: 100, icon: '🥛' },
      { id: '1c', name: 'Meat & Seafood', spent: 160, budgeted: 200, icon: '🥩' },
      { id: '1d', name: 'Pantry Items', spent: 25, budgeted: 50, icon: '🥫' }
    ]
  },
  {
    id: '2',
    category: 'Transportation',
    icon: '🚗',
    color: 'bg-blue-100',
    borderColor: 'border-blue-200',
    group: 'Transportation',
    type: 'rollover',
    isFavorite: true,
    status: 'near-limit',
    trend: 'up',
    trendPercent: 8,
    subCategories: [
      { id: '2a', name: 'Gas', spent: 120, budgeted: 150, icon: '⛽' },
      { id: '2b', name: 'Public Transit', spent: 80, budgeted: 100, icon: '🚌' },
      { id: '2c', name: 'Car Maintenance', spent: 80, budgeted: 50, icon: '🔧' }
    ]
  },
  {
    id: '3',
    category: 'Dining Out',
    icon: '🍽️',
    color: 'bg-orange-100',
    borderColor: 'border-orange-200',
    group: 'Food & Dining',
    type: 'flex',
    isFavorite: false,
    status: 'on-track',
    trend: 'up',
    trendPercent: 12,
    subCategories: [
      { id: '3a', name: 'Restaurants', spent: 200, budgeted: 250, icon: '🏪' },
      { id: '3b', name: 'Fast Food', spent: 80, budgeted: 100, icon: '🍔' },
      { id: '3c', name: 'Coffee Shops', spent: 40, budgeted: 50, icon: '☕' }
    ]
  },
  {
    id: '4',
    category: 'Entertainment',
    icon: '🎬',
    color: 'bg-purple-100',
    borderColor: 'border-purple-200',
    group: 'Lifestyle',
    type: 'fixed',
    isFavorite: false,
    status: 'over-budget',
    trend: 'up',
    trendPercent: 30,
    subCategories: [
      { id: '4a', name: 'Streaming Services', spent: 45, budgeted: 40, icon: '📺' },
      { id: '4b', name: 'Movies & Shows', spent: 60, budgeted: 50, icon: '🎭' },
      { id: '4c', name: 'Games', spent: 75, budgeted: 60, icon: '🎮' }
    ]
  },
  {
    id: '5',
    category: 'Shopping',
    icon: '🛍️',
    color: 'bg-red-100',
    borderColor: 'border-red-200',
    group: 'Lifestyle',
    type: 'fixed',
    isFavorite: false,
    status: 'no-budget',
    trend: 'up',
    trendPercent: 0,
    subCategories: []
  }
];

export default function BudgetsScreen({ onBack, onNavigate }: BudgetsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('categories');
  const [timePeriod, setTimePeriod] = useState('this-month');
  const [sortBy, setSortBy] = useState('progress-low-high');
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate totals from sub-categories
  const getCategoryTotals = (category: any) => {
    const spent = category.subCategories.reduce((total: number, sub: any) => total + sub.spent, 0);
    const budgeted = category.subCategories.reduce((total: number, sub: any) => total + sub.budgeted, 0);
    return { spent, budgeted };
  };

  const getTotalSpent = () => {
    return mockCategories.reduce((total, category) => {
      const { spent } = getCategoryTotals(category);
      return total + spent;
    }, 0);
  };

  const getTotalBudgeted = () => {
    return mockCategories.reduce((total, category) => {
      const { budgeted } = getCategoryTotals(category);
      return total + budgeted;
    }, 0);
  };

  const getOverallProgress = () => {
    const total = getTotalBudgeted();
    const spent = getTotalSpent();
    return total > 0 ? Math.round((spent / total) * 100) : 0;
  };

  const getRemainingAmount = () => {
    return getTotalBudgeted() - getTotalSpent();
  };

  const getTimePeriodLabel = () => {
    switch (timePeriod) {
      case 'this-month': return 'July 2025 Budget';
      case 'last-month': return 'June 2025 Budget';
      case 'next-month': return 'August 2025 Budget';
      default: return 'July 2025 Budget';
    }
  };

  const getCategoryStatus = (category: any) => {
    const { spent, budgeted } = getCategoryTotals(category);
    if (budgeted === 0) return 'no-budget';
    const progress = spent / budgeted;
    if (progress > 1) return 'over-budget';
    if (progress > 0.8) return 'near-limit';
    return 'on-track';
  };

  const filteredCategories = useMemo(() => {
    let filtered = mockCategories.map(category => ({
      ...category,
      ...getCategoryTotals(category),
      status: getCategoryStatus(category)
    }));

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(category =>
        category.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.subCategories.some((sub: any) => 
          sub.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Filter by selected groups
    if (selectedGroups.length > 0) {
      filtered = filtered.filter(category => selectedGroups.includes(category.group));
    }

    // Filter by selected statuses
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(category => selectedStatuses.includes(category.status));
    }

    // Filter by tab
    switch (activeTab) {
      case 'groups':
        // Group by category groups
        break;
      case 'flex':
        filtered = filtered.filter(category => category.type === 'flex');
        break;
      case 'rollover':
        filtered = filtered.filter(category => category.type === 'rollover');
        break;
      case 'favorites':
        filtered = filtered.filter(category => category.isFavorite);
        break;
      case 'no-budget':
        filtered = filtered.filter(category => category.status === 'no-budget');
        break;
      default:
        // categories - show all
        break;
    }

    // Sort
    switch (sortBy) {
      case 'progress-low-high':
        filtered.sort((a, b) => {
          const aProgress = a.budgeted > 0 ? a.spent / a.budgeted : 0;
          const bProgress = b.budgeted > 0 ? b.spent / b.budgeted : 0;
          return aProgress - bProgress;
        });
        break;
      case 'progress-high-low':
        filtered.sort((a, b) => {
          const aProgress = a.budgeted > 0 ? a.spent / a.budgeted : 0;
          const bProgress = b.budgeted > 0 ? b.spent / b.budgeted : 0;
          return bProgress - aProgress;
        });
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'amount-high-low':
        filtered.sort((a, b) => b.budgeted - a.budgeted);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedGroups, selectedStatuses, activeTab, sortBy]);

  const handleCategoryClick = (category: any) => {
    onNavigate?.('budget-category-detail', { category });
  };

  const handleCreateBudget = () => {
    onNavigate?.('budget-category-detail', { 
      category: mockCategories.find(c => c.subCategories.length === 0) || mockCategories[0],
      createMode: true 
    });
  };

  const toggleFavorite = (categoryId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Toggle favorite for:', categoryId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'over-budget': return 'bg-red-100 text-red-800 border-red-200';
      case 'near-limit': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'on-track': return 'bg-green-100 text-green-800 border-green-200';
      case 'no-budget': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'over-budget': return 'Over Budget';
      case 'near-limit': return 'Near Limit';
      case 'on-track': return 'On Track';
      case 'no-budget': return 'No Budget';
      default: return 'No Budget';
    }
  };

  const uniqueGroups = [...new Set(mockCategories.map(c => c.group))];
  const possibleStatuses = ['on-track', 'near-limit', 'over-budget', 'no-budget'];

  return (
    <div className="min-h-screen bg-white">
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
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Button>
          <h1 className="text-[18px] font-semibold text-gray-900">Budgets</h1>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onNavigate?.('budget-settings')}
              className="p-2"
            >
              <Settings className="h-5 w-5 text-gray-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleCreateBudget}
              className="p-2"
            >
              <Plus className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 pb-6">
        {/* Overall Budget Summary */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 mt-4">
          <div className="text-center mb-4">
            <h2 className="text-sm text-gray-500 mb-1">{getTimePeriodLabel()}</h2>
          </div>
          
          <div className="flex items-center justify-between">
            {/* Ring Chart */}
            <div className="relative">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                {/* Background circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  stroke="#f3f4f6"
                  strokeWidth="10"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  stroke={getRemainingAmount() >= 0 ? "#10b981" : "#ef4444"}
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${getOverallProgress() * 2.83} 283`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{getOverallProgress()}%</span>
                <span className="text-xs text-gray-500">of total Budgeted</span>
              </div>
            </div>

            {/* Budget Stats */}
            <div className="flex-1 ml-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Budgeted</span>
                <span className="font-semibold text-gray-900">{formatCurrency(getTotalBudgeted())}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Spent</span>
                <span className="font-semibold text-gray-900">{formatCurrency(getTotalSpent())}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {getRemainingAmount() >= 0 ? 'Remaining' : 'Over Budget'}
                </span>
                <span className={`font-semibold ${getRemainingAmount() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(Math.abs(getRemainingAmount()))}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Edit3 className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-800">
                Budgets are set per sub-category. Tap categories to manage sub-category budgets.
              </span>
            </div>
          </div>
        </div>

        {/* Time Period Selector */}
        <div className="mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['this-month', 'last-month', 'next-month', 'custom'].map((period) => (
              <button
                key={period}
                onClick={() => setTimePeriod(period)}
                className={`flex-1 px-3 py-2 text-sm rounded-md transition-colors ${
                  timePeriod === period 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period === 'this-month' && 'This Month'}
                {period === 'last-month' && 'Last Month'}
                {period === 'next-month' && 'Next Month'}
                {period === 'custom' && 'Custom'}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search categories or sub-categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl"
            />
          </div>
          
          <Sheet open={showFilterSheet} onOpenChange={setShowFilterSheet}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Filter Categories</SheetTitle>
                <SheetDescription>
                  Customize which categories are shown
                </SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6 mt-6">
                {/* Groups Filter */}
                <div>
                  <h3 className="font-medium mb-3">Groups</h3>
                  <div className="space-y-2">
                    {uniqueGroups.map(group => (
                      <div key={group} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={group}
                          checked={selectedGroups.includes(group)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedGroups([...selectedGroups, group]);
                            } else {
                              setSelectedGroups(selectedGroups.filter(g => g !== group));
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor={group} className="text-sm">{group}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <h3 className="font-medium mb-3">Status</h3>
                  <div className="space-y-2">
                    {possibleStatuses.map(status => (
                      <div key={status} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={status}
                          checked={selectedStatuses.includes(status)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedStatuses([...selectedStatuses, status]);
                            } else {
                              setSelectedStatuses(selectedStatuses.filter(s => s !== status));
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor={status} className="text-sm">{getStatusText(status)}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={() => {
                    setSelectedGroups([]);
                    setSelectedStatuses([]);
                    setShowFilterSheet(false);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32 h-12 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="progress-low-high">Progress ↑</SelectItem>
              <SelectItem value="progress-high-low">Progress ↓</SelectItem>
              <SelectItem value="alphabetical">A-Z</SelectItem>
              <SelectItem value="amount-high-low">Amount ↓</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Budget View Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-100 rounded-xl p-1 h-12">
            <TabsTrigger 
              value="categories" 
              className="rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="no-budget" 
              className="rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              No Budget
            </TabsTrigger>
            <TabsTrigger 
              value="flex" 
              className="rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Flex
            </TabsTrigger>
            <TabsTrigger 
              value="rollover" 
              className="rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Rollover
            </TabsTrigger>
            <TabsTrigger 
              value="favorites" 
              className="rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Favorites
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Category Cards */}
        <div className="space-y-4">
          {filteredCategories.map((category) => {
            const percentageUsed = category.budgeted > 0 ? Math.round((category.spent / category.budgeted) * 100) : 0;
            const remaining = category.budgeted - category.spent;
            const subCategoryCount = category.subCategories.length;
            const budgetedSubCategories = category.subCategories.filter((sub: any) => sub.budgeted > 0).length;
            
            return (
              <Card 
                key={category.id}
                className={`${category.color} ${category.borderColor} border-2 cursor-pointer hover:shadow-lg transition-all duration-200`}
                onClick={() => handleCategoryClick(category)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{category.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{category.category}</h3>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-500">{category.group}</p>
                          <span className="text-xs text-gray-400">•</span>
                          <p className="text-sm text-gray-500">
                            {budgetedSubCategories}/{subCategoryCount} budgeted
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs border ${getStatusColor(category.status)}`}>
                        {getStatusText(category.status)}
                      </Badge>
                      <button
                        onClick={(e) => toggleFavorite(category.id, e)}
                        className="p-1"
                      >
                        <Heart 
                          className={`h-4 w-4 ${category.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                        />
                      </button>
                    </div>
                  </div>

                  {category.budgeted > 0 ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {formatCurrency(category.spent)} of {formatCurrency(category.budgeted)}
                        </span>
                        <span className="text-sm font-medium text-gray-900">{percentageUsed}%</span>
                      </div>
                      
                      <Progress 
                        value={Math.min(percentageUsed, 100)} 
                        className="h-2"
                      />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {remaining >= 0 ? (
                            `${formatCurrency(remaining)} Remaining`
                          ) : (
                            `Over by ${formatCurrency(Math.abs(remaining))}`
                          )}
                        </span>
                        <div className="flex items-center gap-1">
                          {category.trend === 'up' ? (
                            <TrendingUp className="h-3 w-3 text-red-500" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-green-500" />
                          )}
                          <span className={`text-xs ${category.trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
                            {category.trendPercent}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <span className="text-sm text-gray-500">
                          Tap to set budgets for sub-categories
                        </span>
                      </div>
                      {subCategoryCount > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {category.subCategories.slice(0, 3).map((sub: any) => (
                            <span key={sub.id} className="text-xs bg-white px-2 py-1 rounded">
                              {sub.icon} {sub.name}
                            </span>
                          ))}
                          {subCategoryCount > 3 && (
                            <span className="text-xs bg-white px-2 py-1 rounded text-gray-500">
                              +{subCategoryCount - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}