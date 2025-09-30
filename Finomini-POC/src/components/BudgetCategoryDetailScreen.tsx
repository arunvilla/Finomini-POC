import { useState } from 'react';
import { ArrowLeft, Heart, Edit3, Plus, Search, Filter, Settings, Check, X, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

interface BudgetCategoryDetailScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
  category: any;
  createMode?: boolean;
}

const mockSpendingTrend = [
  { period: 'Jan', amount: 420 },
  { period: 'Feb', amount: 480 },
  { period: 'Mar', amount: 380 },
  { period: 'Apr', amount: 520 },
  { period: 'May', amount: 450 },
  { period: 'Jun', amount: 380 },
  { period: 'Jul', amount: 450 }
];

const mockTransactions = [
  {
    id: '1',
    merchant: 'Whole Foods',
    amount: -85.43,
    date: '2025-07-28',
    subcategory: 'Fresh Produce',
    icon: '🥬',
    status: 'posted'
  },
  {
    id: '2',
    merchant: 'Safeway',
    amount: -52.18,
    date: '2025-07-27',
    subcategory: 'Dairy & Eggs',
    icon: '🥛',
    status: 'posted'
  },
  {
    id: '3',
    merchant: 'Costco',
    amount: -127.95,
    date: '2025-07-26',
    subcategory: 'Meat & Seafood',
    icon: '🥩',
    status: 'posted'
  },
  {
    id: '4',
    merchant: 'Trader Joes',
    amount: -64.32,
    date: '2025-07-25',
    subcategory: 'Pantry Items',
    icon: '🥫',
    status: 'posted'
  }
];

export default function BudgetCategoryDetailScreen({ 
  onBack, 
  onNavigate, 
  category, 
  createMode = false 
}: BudgetCategoryDetailScreenProps) {
  const [isFavorite, setIsFavorite] = useState(category?.isFavorite || false);
  const [editingBudgets, setEditingBudgets] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateSubCategory, setShowCreateSubCategory] = useState(false);
  const [newSubCategoryName, setNewSubCategoryName] = useState('');
  const [newSubCategoryIcon, setNewSubCategoryIcon] = useState('📦');
  
  // Local state for sub-category budgets
  const [subCategoryBudgets, setSubCategoryBudgets] = useState(() => {
    const budgets: { [key: string]: string } = {};
    category?.subCategories?.forEach((sub: any) => {
      budgets[sub.id] = sub.budgeted?.toString() || '0';
    });
    return budgets;
  });

  if (!category) {
    return <div>Category not found</div>;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Math.abs(amount));
  };

  const getCategoryTotals = () => {
    if (!category.subCategories) return { spent: 0, budgeted: 0 };
    
    const spent = category.subCategories.reduce((total: number, sub: any) => total + sub.spent, 0);
    const budgeted = category.subCategories.reduce((total: number, sub: any) => total + sub.budgeted, 0);
    return { spent, budgeted };
  };

  const { spent: totalSpent, budgeted: totalBudgeted } = getCategoryTotals();
  const overallProgress = totalBudgeted > 0 ? Math.round((totalSpent / totalBudgeted) * 100) : 0;
  const remaining = totalBudgeted - totalSpent;

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleSubCategoryClick = (subcategory: any) => {
    onNavigate?.('budget-subcategory-detail', { 
      subcategory, 
      parentCategory: category 
    });
  };

  const updateSubCategoryBudget = (subId: string, value: string) => {
    setSubCategoryBudgets(prev => ({
      ...prev,
      [subId]: value
    }));
  };

  const saveBudgets = () => {
    // In a real app, this would save to backend
    console.log('Saving budgets:', subCategoryBudgets);
    setEditingBudgets(false);
  };

  const cancelBudgetEditing = () => {
    // Reset to original values
    const originalBudgets: { [key: string]: string } = {};
    category.subCategories?.forEach((sub: any) => {
      originalBudgets[sub.id] = sub.budgeted?.toString() || '0';
    });
    setSubCategoryBudgets(originalBudgets);
    setEditingBudgets(false);
  };

  const createSubCategory = () => {
    if (!newSubCategoryName.trim()) return;
    
    // In a real app, this would create the sub-category
    console.log('Creating sub-category:', {
      name: newSubCategoryName,
      icon: newSubCategoryIcon,
      categoryId: category.id
    });
    
    setNewSubCategoryName('');
    setNewSubCategoryIcon('📦');
    setShowCreateSubCategory(false);
  };

  const filteredTransactions = mockTransactions.filter(transaction => {
    return transaction.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
           transaction.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getStatusColor = (spent: number, budgeted: number) => {
    if (budgeted === 0) return 'bg-gray-100 text-gray-800 border-gray-200';
    const progress = spent / budgeted;
    if (progress > 1) return 'bg-red-100 text-red-800 border-red-200';
    if (progress > 0.8) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getStatusText = (spent: number, budgeted: number) => {
    if (budgeted === 0) return 'No Budget';
    const progress = spent / budgeted;
    if (progress > 1) return 'Over Budget';
    if (progress > 0.8) return 'Near Limit';
    return 'On Track';
  };

  const commonIcons = ['🛒', '🥬', '🥛', '🥩', '🥫', '🍞', '🧀', '🍎', '🥕', '🐟', '🍖', '🥤'];

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
          <h1 className="text-[18px] font-semibold text-gray-900">{category.category}</h1>
          <div className="flex items-center gap-2">
            {editingBudgets ? (
              <>
                <Button variant="ghost" size="icon" onClick={cancelBudgetEditing} className="p-2">
                  <X className="h-5 w-5 text-gray-600" />
                </Button>
                <Button variant="ghost" size="icon" onClick={saveBudgets} className="p-2">
                  <Check className="h-5 w-5 text-green-600" />
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setEditingBudgets(true)}
                  className="p-2"
                >
                  <Edit3 className="h-5 w-5 text-gray-600" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleFavorite}
                  className="p-2"
                >
                  <Heart 
                    className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                  />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pb-6">
        {/* Category Summary */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 mt-4">
          <div className="flex items-center justify-center mb-4">
            <div className="text-6xl">{category.icon}</div>
          </div>
          
          <div className="text-center space-y-2 mb-4">
            <h2 className="text-xl font-semibold text-gray-900">{category.category}</h2>
            <p className="text-sm text-gray-500">{category.group}</p>
          </div>

          {totalBudgeted > 0 ? (
            <div className="flex items-center justify-between">
              {/* Progress Chart */}
              <div className="relative">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                  <circle
                    cx="50" cy="50" r="40"
                    stroke={remaining >= 0 ? "#10b981" : "#ef4444"}
                    strokeWidth="8" fill="none"
                    strokeDasharray={`${overallProgress * 2.51} 251`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-gray-900">{overallProgress}%</span>
                  <span className="text-xs text-gray-500">Used</span>
                </div>
              </div>

              {/* Budget Details */}
              <div className="flex-1 ml-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Spent</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(totalSpent)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Budgeted</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(totalBudgeted)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {remaining >= 0 ? 'Remaining' : 'Over Budget'}
                  </span>
                  <span className={`font-semibold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(Math.abs(remaining))}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-2">
                No budgets set for sub-categories yet
              </p>
              <p className="text-xs text-gray-400">
                Add sub-categories and set their budgets below
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {editingBudgets && (
          <div className="mb-6 p-4 bg-blue-50 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Edit3 className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Budget Editing Mode</span>
            </div>
            <p className="text-xs text-blue-700">
              Adjust the budget amounts for each sub-category. Tap ✓ to save or ✕ to cancel.
            </p>
          </div>
        )}

        {/* Sub-Categories */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Sub-Categories</h3>
            <AlertDialog open={showCreateSubCategory} onOpenChange={setShowCreateSubCategory}>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Create Sub-Category</AlertDialogTitle>
                  <AlertDialogDescription>
                    Add a new sub-category to {category.category}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="subcategoryName">Sub-Category Name</Label>
                    <Input
                      id="subcategoryName"
                      value={newSubCategoryName}
                      onChange={(e) => setNewSubCategoryName(e.target.value)}
                      placeholder="e.g., Fresh Produce"
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label>Choose Icon</Label>
                    <div className="grid grid-cols-6 gap-2 mt-2">
                      {commonIcons.map((icon) => (
                        <button
                          key={icon}
                          onClick={() => setNewSubCategoryIcon(icon)}
                          className={`p-2 text-xl border rounded-lg hover:bg-gray-50 ${
                            newSubCategoryIcon === icon ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={createSubCategory}>
                    Create Sub-Category
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          
          {category.subCategories && category.subCategories.length > 0 ? (
            <div className="space-y-3">
              {category.subCategories.map((subcategory: any) => {
                const progress = subcategory.budgeted > 0 ? Math.round((subcategory.spent / subcategory.budgeted) * 100) : 0;
                const budgetValue = subCategoryBudgets[subcategory.id] || '0';
                
                return (
                  <Card 
                    key={subcategory.id}
                    className={`${subcategory.color || 'bg-gray-50'} border-2 hover:shadow-sm transition-all duration-200 ${!editingBudgets ? 'cursor-pointer' : ''}`}
                    onClick={editingBudgets ? undefined : () => handleSubCategoryClick(subcategory)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{subcategory.icon}</span>
                          <div>
                            <h4 className="font-medium text-gray-900">{subcategory.name}</h4>
                            <Badge className={`text-xs border ${getStatusColor(subcategory.spent, subcategory.budgeted)} mt-1`}>
                              {getStatusText(subcategory.spent, subcategory.budgeted)}
                            </Badge>
                          </div>
                        </div>
                        
                        {editingBudgets ? (
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                            <Input
                              type="number"
                              value={budgetValue}
                              onChange={(e) => updateSubCategoryBudget(subcategory.id, e.target.value)}
                              className="w-20 h-8 text-sm"
                              placeholder="0"
                            />
                          </div>
                        ) : (
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">
                              {formatCurrency(subcategory.spent)}
                            </div>
                            <div className="text-sm text-gray-500">
                              of {formatCurrency(subcategory.budgeted)}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {!editingBudgets && subcategory.budgeted > 0 && (
                        <div className="space-y-2">
                          <Progress value={Math.min(progress, 100)} className="h-2" />
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">
                              {subcategory.budgeted - subcategory.spent >= 0 ? (
                                `${formatCurrency(subcategory.budgeted - subcategory.spent)} remaining`
                              ) : (
                                `Over by ${formatCurrency(subcategory.spent - subcategory.budgeted)}`
                              )}
                            </span>
                            <span className="text-gray-600">{progress}%</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <div className="text-4xl mb-3">📦</div>
              <h4 className="font-medium text-gray-900 mb-2">No Sub-Categories Yet</h4>
              <p className="text-sm text-gray-500 mb-4">
                Create sub-categories to organize your {category.category} spending and set specific budgets.
              </p>
              <Button 
                onClick={() => setShowCreateSubCategory(true)}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Sub-Category
              </Button>
            </div>
          )}
        </div>

        {/* Quick Budget Setup */}
        {!editingBudgets && category.subCategories && category.subCategories.length > 0 && (
          <div className="mb-6">
            <Card className="border-2 border-dashed border-blue-200 bg-blue-50">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Edit3 className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Quick Budget Setup</span>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  Set budgets for all sub-categories at once
                </p>
                <Button 
                  onClick={() => setEditingBudgets(true)}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Edit All Budgets
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Transactions */}
        {!editingBudgets && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-50"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              {filteredTransactions.map((transaction) => (
                <Card 
                  key={transaction.id}
                  className="border border-gray-200 cursor-pointer hover:shadow-sm transition-shadow"
                  onClick={() => onNavigate?.('transaction-details-screen', { transaction })}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-xl">{transaction.icon}</div>
                        <div>
                          <h4 className="font-medium text-gray-900">{transaction.merchant}</h4>
                          <p className="text-sm text-gray-500">{transaction.subcategory}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          {formatCurrency(transaction.amount)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}