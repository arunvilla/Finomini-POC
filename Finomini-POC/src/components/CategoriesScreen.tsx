import { useState } from 'react';
import { ArrowLeft, Search, Eye, EyeOff, Plus, Filter, TrendingUp, TrendingDown, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface CategoriesScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

// Enhanced mock categories data with more realistic values
const mockCategories = [
  {
    id: '1',
    name: 'Groceries',
    icon: '🛒',
    spent: 1247,
    budget: 1500,
    progress: 83,
    trend: 'up',
    trendPercent: 12,
    color: '#22C55E',
    transactions: 45,
    avgPerTransaction: 28,
    lastTransaction: '2 days ago',
    isFavorite: true,
    type: 'expense' as const,
    subcategories: ['Food', 'Household Items', 'Pet Food']
  },
  {
    id: '2', 
    name: 'Utilities',
    icon: '💡',
    spent: 342,
    budget: 400,
    progress: 86,
    trend: 'down',
    trendPercent: 5,
    color: '#F59E0B',
    transactions: 8,
    avgPerTransaction: 43,
    lastTransaction: '1 week ago',
    isFavorite: false,
    type: 'expense' as const,
    subcategories: ['Electric', 'Water', 'Internet']
  },
  {
    id: '3',
    name: 'Entertainment', 
    icon: '🎬',
    spent: 285,
    budget: 300,
    progress: 95,
    trend: 'up',
    trendPercent: 18,
    color: '#8B5CF6',
    transactions: 12,
    avgPerTransaction: 24,
    lastTransaction: '3 days ago',
    isFavorite: false,
    type: 'expense' as const,
    subcategories: ['Movies', 'Streaming', 'Events']
  },
  {
    id: '4',
    name: 'Transportation',
    icon: '🚗',
    spent: 756,
    budget: 800,
    progress: 95,
    trend: 'up',
    trendPercent: 8,
    color: '#EF4444',
    transactions: 28,
    avgPerTransaction: 27,
    lastTransaction: '1 day ago',
    isFavorite: true,
    type: 'expense' as const,
    subcategories: ['Gas', 'Public Transit', 'Maintenance']
  },
  {
    id: '5',
    name: 'Salary',
    icon: '💰',
    spent: 5200,
    budget: 5200,
    progress: 100,
    trend: 'neutral',
    trendPercent: 0,
    color: '#10B981',
    transactions: 2,
    avgPerTransaction: 2600,
    lastTransaction: '2 weeks ago',
    isFavorite: false,
    type: 'income' as const,
    subcategories: ['Base Salary', 'Overtime', 'Bonus']
  },
  {
    id: '6',
    name: 'Dining Out',
    icon: '🍽️',
    spent: 423,
    budget: 600,
    progress: 71,
    trend: 'down',
    trendPercent: 15,
    color: '#F97316',
    transactions: 18,
    avgPerTransaction: 24,
    lastTransaction: '1 day ago',
    isFavorite: false,
    type: 'expense' as const,
    subcategories: ['Restaurants', 'Fast Food', 'Coffee']
  }
];

// Data for the pie chart
const chartData = [
  { name: 'Groceries', value: 1247, color: '#22C55E' },
  { name: 'Transportation', value: 756, color: '#EF4444' },
  { name: 'Dining Out', value: 423, color: '#F97316' },
  { name: 'Utilities', value: 342, color: '#F59E0B' },
  { name: 'Entertainment', value: 285, color: '#8B5CF6' },
  { name: 'Other', value: 184, color: '#6B7280' }
];

export default function CategoriesScreen({ onBack, onNavigate }: CategoriesScreenProps) {
  const [showAmounts, setShowAmounts] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const formatCurrency = (amount: number) => {
    if (!showAmounts) return '••••••';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const totalIncome = mockCategories
    .filter(cat => cat.type === 'income')
    .reduce((sum, cat) => sum + cat.spent, 0);
  
  const totalExpense = mockCategories
    .filter(cat => cat.type === 'expense')
    .reduce((sum, cat) => sum + cat.spent, 0);

  const handleCategoryClick = (category: any) => {
    onNavigate?.('category-detail-screen', { category });
  };

  const getFilteredCategories = () => {
    let filtered = mockCategories;

    // Apply tab filter
    switch (activeTab) {
      case 'favorites':
        filtered = filtered.filter(cat => cat.isFavorite);
        break;
      case 'expenses':
        filtered = filtered.filter(cat => cat.type === 'expense');
        break;
      case 'income':
        filtered = filtered.filter(cat => cat.type === 'income');
        break;
      case 'over-budget':
        filtered = filtered.filter(cat => cat.progress >= 90);
        break;
      default:
        // 'all' - no additional filtering
        break;
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(cat => 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const getStatusColor = (progress: number) => {
    if (progress >= 95) return 'text-red-600';
    if (progress >= 80) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusText = (progress: number) => {
    if (progress >= 95) return 'Over Budget';
    if (progress >= 80) return 'Warning';
    return 'On Track';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-red-500" />;
      case 'down':
        return <TrendingDown className="h-3 w-3 text-green-500" />;
      default:
        return null;
    }
  };

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
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <h1 className="text-lg font-semibold text-foreground">Categories</h1>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="p-2">
              <Plus className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAmounts(!showAmounts)}
              className="p-2"
            >
              {showAmounts ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Overview Section */}
        <div className="p-4 space-y-6">
          {/* Income/Expense Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-green-700">Income</span>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-900">
                  {formatCurrency(totalIncome)}
                </div>
                <div className="text-xs text-green-600 mt-1">
                  +2.3% vs last month
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-red-700">Expenses</span>
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-red-900">
                  {formatCurrency(totalExpense)}
                </div>
                <div className="text-xs text-red-600 mt-1">
                  -5.2% vs last month
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Spending Distribution Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Spending Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend 
                      formatter={(value, entry) => (
                        <span className="text-xs">
                          {value}: {formatCurrency(entry.payload.value)}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="expenses" className="text-xs">Expenses</TabsTrigger>
              <TabsTrigger value="income" className="text-xs">Income</TabsTrigger>
              <TabsTrigger value="favorites" className="text-xs">
                <Star className="h-3 w-3" />
              </TabsTrigger>
              <TabsTrigger value="over-budget" className="text-xs">Alert</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              <div className="space-y-3">
                {getFilteredCategories().map((category) => (
                  <Card 
                    key={category.id}
                    className="hover:shadow-md transition-all duration-200 cursor-pointer border-l-4"
                    style={{ borderLeftColor: category.color }}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Header Row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                              style={{ backgroundColor: category.color + '20' }}
                            >
                              {category.icon}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-foreground">{category.name}</h3>
                                {category.isFavorite && (
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{category.transactions} transactions</span>
                                <span>•</span>
                                <span>Avg {formatCurrency(category.avgPerTransaction)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <span className="font-semibold text-foreground">
                                {formatCurrency(category.spent)}
                              </span>
                              {getTrendIcon(category.trend)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              of {formatCurrency(category.budget)}
                            </div>
                          </div>
                        </div>

                        {/* Progress Section */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${getStatusColor(category.progress)}`}
                            >
                              {getStatusText(category.progress)}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <span>{category.progress}%</span>
                              {category.trend !== 'neutral' && (
                                <span className={category.trend === 'up' ? 'text-red-500' : 'text-green-500'}>
                                  ({category.trend === 'up' ? '+' : '-'}{category.trendPercent}%)
                                </span>
                              )}
                            </div>
                          </div>
                          <Progress 
                            value={category.progress} 
                            className="h-2"
                          />
                        </div>

                        {/* Subcategories Preview */}
                        {category.subcategories && category.subcategories.length > 0 && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span>Subcategories:</span>
                            <div className="flex gap-1">
                              {category.subcategories.slice(0, 2).map((sub, index) => (
                                <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                                  {sub}
                                </Badge>
                              ))}
                              {category.subcategories.length > 2 && (
                                <Badge variant="outline" className="text-xs px-1 py-0">
                                  +{category.subcategories.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Last Transaction */}
                        <div className="text-xs text-muted-foreground">
                          Last transaction: {category.lastTransaction}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Empty State */}
          {getFilteredCategories().length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {searchQuery ? 'No Categories Found' : 'No Categories in This Filter'}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? `No categories match "${searchQuery}". Try a different search term.`
                  : 'Try selecting a different filter or create a new category.'
                }
              </p>
              {searchQuery && (
                <Button 
                  variant="outline" 
                  onClick={() => setSearchQuery('')}
                  className="mt-4"
                >
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}