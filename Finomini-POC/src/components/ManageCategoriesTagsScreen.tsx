import { useState } from 'react';
import { ArrowLeft, Settings, Plus, Search, Filter, Heart, Menu, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface ManageCategoriesTagsScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

// Mock categories data
const mockCategories = [
  {
    id: '1',
    name: 'Groceries',
    icon: '🛒',
    color: '#22C55E',
    group: 'Food & Dining',
    type: 'expense' as const,
    spent: 450,
    budget: 600,
    status: 'on-track' as const,
    usageCount: 45,
    isSystemDefault: true,
    isArchived: false,
    isFavorite: true
  },
  {
    id: '2',
    name: 'Restaurants',
    icon: '🍽️',
    color: '#EF4444',
    group: 'Food & Dining',
    type: 'expense' as const,
    spent: 320,
    budget: 400,
    status: 'on-track' as const,
    usageCount: 28,
    isSystemDefault: true,
    isArchived: false,
    isFavorite: false
  },
  {
    id: '3',
    name: 'Gas',
    icon: '⛽',
    color: '#F59E0B',
    group: 'Transportation',
    type: 'expense' as const,
    spent: 280,
    budget: 300,
    status: 'warning' as const,
    usageCount: 20,
    isSystemDefault: true,
    isArchived: false,
    isFavorite: true
  },
  {
    id: '4',
    name: 'Utilities',
    icon: '💡',
    color: '#8B5CF6',
    group: 'Housing',
    type: 'expense' as const,
    spent: 180,
    budget: 200,
    status: 'on-track' as const,
    usageCount: 12,
    isSystemDefault: true,
    isArchived: false,
    isFavorite: false
  },
  {
    id: '5',
    name: 'Salary',
    icon: '💰',
    color: '#10B981',
    group: 'Income',
    type: 'income' as const,
    spent: 5000,
    budget: 5000,
    status: 'on-track' as const,
    usageCount: 2,
    isSystemDefault: true,
    isArchived: false,
    isFavorite: false
  }
];

// Mock tags data
const mockTags = [
  { id: '1', name: 'Travel', color: '#3B82F6', usageCount: 15, isArchived: false },
  { id: '2', name: 'Work Expense', color: '#8B5CF6', usageCount: 22, isArchived: false },
  { id: '3', name: 'Gift', color: '#EC4899', usageCount: 8, isArchived: false },
  { id: '4', name: 'Emergency', color: '#EF4444', usageCount: 3, isArchived: false },
  { id: '5', name: 'Subscription', color: '#F59E0B', usageCount: 12, isArchived: false }
];

// Spending distribution data for chart
const spendingData = [
  { name: 'Food & Dining', value: 770, color: '#22C55E' },
  { name: 'Transportation', value: 280, color: '#F59E0B' },
  { name: 'Housing', value: 180, color: '#8B5CF6' },
  { name: 'Other', value: 120, color: '#6B7280' }
];

const categoryGroups = [
  { name: 'Income', categories: mockCategories.filter(c => c.group === 'Income') },
  { name: 'Food & Dining', categories: mockCategories.filter(c => c.group === 'Food & Dining') },
  { name: 'Transportation', categories: mockCategories.filter(c => c.group === 'Transportation') },
  { name: 'Housing', categories: mockCategories.filter(c => c.group === 'Housing') }
];

export default function ManageCategoriesTagsScreen({ onBack, onNavigate }: ManageCategoriesTagsScreenProps) {
  const [activeTab, setActiveTab] = useState('categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAmounts, setShowAmounts] = useState(true);
  const [timePeriod, setTimePeriod] = useState('Month');
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['Food & Dining', 'Transportation']);

  const totalIncome = 5000;
  const totalExpense = 1350;

  const formatCurrency = (amount: number) => {
    if (!showAmounts) return '••••••';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'over-budget': return 'text-red-600 bg-red-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'warning': return 'Over Budget';
      case 'over-budget': return 'Over Budget';
      default: return 'On Track';
    }
  };

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupName) 
        ? prev.filter(g => g !== groupName)
        : [...prev, groupName]
    );
  };

  const handleAddNew = () => {
    // Show menu for Add New Category or Add New Tag
    if (activeTab === 'categories') {
      onNavigate?.('create-category');
    } else {
      onNavigate?.('create-tag');
    }
  };

  const filteredCategories = mockCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.group.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTags = mockTags.filter(tag =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          
          <h1 className="text-lg font-semibold text-foreground">Categories & Tags</h1>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleAddNew} className="p-2">
              <Plus className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onNavigate?.('categories-tags-settings')}
              className="p-2"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Spending Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Spending Overview</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAmounts(!showAmounts)}
                className="p-1"
              >
                {showAmounts ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Income/Expense Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Income</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalIncome)}
                  <span className="text-muted-foreground">.00</span>
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Expense</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(totalExpense)}
                  <span className="text-muted-foreground">.00</span>
                </p>
              </div>
            </div>

            {/* Spending Distribution Chart */}
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {spendingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Time Period Selector */}
            <div className="flex justify-center">
              <div className="flex bg-muted rounded-lg p-1">
                {['Month', 'Quarter', 'Year', 'Custom'].map((period) => (
                  <Button
                    key={period}
                    variant={timePeriod === period ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setTimePeriod(period)}
                    className="px-3 py-1 text-xs"
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabbed Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
          </TabsList>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            {/* Search and Filter */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon" onClick={() => onNavigate?.('filter-categories')}>
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            {/* Category Groups */}
            <div className="space-y-3">
              {categoryGroups.map((group) => (
                <Card key={group.name} className="overflow-hidden">
                  <CardHeader
                    className="pb-2 cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => toggleGroup(group.name)}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{group.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {group.categories.length}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Menu className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  {expandedGroups.includes(group.name) && (
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {group.categories
                          .filter(category => 
                            category.name.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((category) => (
                          <div
                            key={category.id}
                            className="p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                            onClick={() => onNavigate?.('category-detail-screen', { category })}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div 
                                  className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
                                  style={{ backgroundColor: category.color + '20' }}
                                >
                                  {category.icon}
                                </div>
                                <div>
                                  <h4 className="font-medium text-foreground">{category.name}</h4>
                                  <p className="text-xs text-muted-foreground">
                                    Used in {category.usageCount} transactions
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Heart 
                                  className={`h-4 w-4 ${category.isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
                                />
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <Menu className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            {category.budget && (
                              <>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs text-muted-foreground">
                                    {formatCurrency(category.spent)} of {formatCurrency(category.budget)}
                                  </span>
                                  <Badge className={`text-xs ${getStatusColor(category.status)}`}>
                                    {getStatusText(category.status)}
                                  </Badge>
                                </div>
                                <Progress 
                                  value={(category.spent / category.budget) * 100} 
                                  className="h-2"
                                />
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tags Tab */}
          <TabsContent value="tags" className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Tags List */}
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {filteredTags.map((tag) => (
                    <div
                      key={tag.id}
                      className="p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={() => onNavigate?.('edit-tag', { tag })}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: tag.color }}
                          />
                          <div>
                            <h4 className="font-medium text-foreground">#{tag.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              Used in {tag.usageCount} transactions
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Menu className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}