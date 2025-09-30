import { useState } from 'react';
import { ArrowLeft, Check, Trash2, Plus, DollarSign, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

interface CreateEditBudgetScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
  category?: any;
  subcategory?: any;
  isEditing?: boolean;
}

const mockCategories = [
  { 
    id: '1', 
    name: 'Groceries', 
    icon: '🛒', 
    color: 'bg-green-100',
    subCategories: [
      { id: '1a', name: 'Fresh Produce', icon: '🥬', budgeted: 250 },
      { id: '1b', name: 'Dairy & Eggs', icon: '🥛', budgeted: 100 },
      { id: '1c', name: 'Meat & Seafood', icon: '🥩', budgeted: 200 },
      { id: '1d', name: 'Pantry Items', icon: '🥫', budgeted: 50 }
    ]
  },
  { 
    id: '2', 
    name: 'Transportation', 
    icon: '🚗', 
    color: 'bg-blue-100',
    subCategories: [
      { id: '2a', name: 'Gas', icon: '⛽', budgeted: 150 },
      { id: '2b', name: 'Public Transit', icon: '🚌', budgeted: 100 },
      { id: '2c', name: 'Car Maintenance', icon: '🔧', budgeted: 50 }
    ]
  },
  { 
    id: '3', 
    name: 'Dining Out', 
    icon: '🍽️', 
    color: 'bg-orange-100',
    subCategories: [
      { id: '3a', name: 'Restaurants', icon: '🏪', budgeted: 0 },
      { id: '3b', name: 'Fast Food', icon: '🍔', budgeted: 0 },
      { id: '3c', name: 'Coffee Shops', icon: '☕', budgeted: 0 }
    ]
  }
];

const budgetTypes = [
  { value: 'fixed', label: 'Fixed Monthly', description: 'Budget resets each month' },
  { value: 'rollover', label: 'Rollover', description: 'Unused budget carries over' },
  { value: 'flexible', label: 'Flexible', description: 'Part of a flexible spending group' },
  { value: 'annual', label: 'Annual Target', description: 'Spread annual expense monthly' }
];

const commonIcons = ['🛒', '🥬', '🥛', '🥩', '🥫', '🍞', '🧀', '🍎', '⛽', '🚌', '🔧', '🏪', '🍔', '☕'];

export default function CreateEditBudgetScreen({ 
  onBack, 
  onNavigate, 
  category, 
  subcategory, 
  isEditing = false 
}: CreateEditBudgetScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState(category?.id || '');
  const [selectedSubCategory, setSelectedSubCategory] = useState(subcategory?.id || '');
  const [budgetAmount, setBudgetAmount] = useState(subcategory?.budgeted?.toString() || '');
  const [budgetType, setBudgetType] = useState('fixed');
  const [linkedGoal, setLinkedGoal] = useState('');
  const [includeInTotal, setIncludeInTotal] = useState(true);
  const [rolloverStartDate, setRolloverStartDate] = useState('');
  const [annualTarget, setAnnualTarget] = useState('');
  const [paymentDueDate, setPaymentDueDate] = useState('');
  const [isCreatingSubCategory, setIsCreatingSubCategory] = useState(false);
  const [newSubCategoryName, setNewSubCategoryName] = useState('');
  const [newSubCategoryIcon, setNewSubCategoryIcon] = useState('📦');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount);
    if (isNaN(num)) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const selectedCategoryData = mockCategories.find(cat => cat.id === selectedCategory);
  const availableSubCategories = selectedCategoryData?.subCategories || [];
  const selectedSubCategoryData = availableSubCategories.find(sub => sub.id === selectedSubCategory);

  const handleSave = () => {
    // Validate required fields
    if (!selectedCategory || !selectedSubCategory || !budgetAmount) {
      alert('Please select a category, sub-category, and enter a budget amount');
      return;
    }

    // Save the sub-category budget
    const budgetData = {
      categoryId: selectedCategory,
      subCategoryId: selectedSubCategory,
      amount: parseFloat(budgetAmount),
      type: budgetType,
      linkedGoal,
      includeInTotal,
      rolloverStartDate: budgetType === 'rollover' ? rolloverStartDate : null,
      annualTarget: budgetType === 'annual' ? parseFloat(annualTarget) : null,
      paymentDueDate: budgetType === 'annual' ? paymentDueDate : null
    };

    console.log('Saving sub-category budget:', budgetData);
    
    // Navigate back to category detail screen
    onNavigate?.('budget-category-detail', { category: selectedCategoryData });
  };

  const handleDelete = () => {
    console.log('Deleting sub-category budget:', selectedSubCategory);
    setShowDeleteDialog(false);
    onNavigate?.('budget-category-detail', { category: selectedCategoryData });
  };

  const createSubCategory = () => {
    if (!newSubCategoryName.trim() || !selectedCategory) return;
    
    console.log('Creating sub-category:', {
      name: newSubCategoryName,
      icon: newSubCategoryIcon,
      categoryId: selectedCategory
    });
    
    // In a real app, you'd create the sub-category and then select it
    setIsCreatingSubCategory(false);
    setNewSubCategoryName('');
    setNewSubCategoryIcon('📦');
  };

  const getEstimatedMonthlyFromAnnual = () => {
    if (!annualTarget) return 0;
    return Math.round(parseFloat(annualTarget) / 12);
  };

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
          <h1 className="text-[18px] font-semibold text-gray-900">
            {isEditing ? `Edit Budget` : 'New Sub-Category Budget'}
          </h1>
          <Button 
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <Check className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <div className="px-4 pb-6">
        <div className="space-y-6 mt-6">
          {/* Info Card */}
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">Sub-Category Budgeting</span>
              </div>
              <p className="text-sm text-blue-700">
                Set budgets for specific sub-categories. All sub-category budgets within a category will be combined to show the total category budget.
              </p>
            </CardContent>
          </Card>

          {/* 1. Choose Category & Sub-Category */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Choose Category & Sub-Category</h3>
              
              {/* Category Selection */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          <div className="flex items-center gap-2">
                            <span>{cat.icon}</span>
                            <span>{cat.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sub-Category Selection */}
                {selectedCategory && (
                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="subcategory">Sub-Category</Label>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsCreatingSubCategory(true)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add New
                      </Button>
                    </div>
                    
                    {availableSubCategories.length > 0 ? (
                      <Select value={selectedSubCategory} onValueChange={setSelectedSubCategory}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select a sub-category" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableSubCategories.map((sub) => (
                            <SelectItem key={sub.id} value={sub.id}>
                              <div className="flex items-center gap-2">
                                <span>{sub.icon}</span>
                                <span>{sub.name}</span>
                                {sub.budgeted > 0 && (
                                  <Badge variant="secondary" className="ml-2">
                                    {formatCurrency(sub.budgeted.toString())}
                                  </Badge>
                                )}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="mt-2 p-3 bg-gray-50 rounded-lg text-center">
                        <p className="text-sm text-gray-500">No sub-categories available</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => setIsCreatingSubCategory(true)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Create First Sub-Category
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Selected Preview */}
              {selectedCategoryData && selectedSubCategoryData && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{selectedCategoryData.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {selectedCategoryData.name} → {selectedSubCategoryData.name}
                      </h4>
                      <p className="text-sm text-gray-500">Selected for budgeting</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 2. Set Budget Amount */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Set Budget Amount</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="budgetAmount">Monthly Budget</Label>
                  <div className="relative mt-2">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="budgetAmount"
                      type="number"
                      value={budgetAmount}
                      onChange={(e) => setBudgetAmount(e.target.value)}
                      placeholder="150"
                      className="pl-10 h-12 text-lg"
                    />
                  </div>
                  {budgetAmount && (
                    <p className="text-sm text-gray-500 mt-1">
                      Monthly budget: {formatCurrency(budgetAmount)}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. Budget Type */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Budget Type</h3>
              
              <div className="space-y-3">
                {budgetTypes.map((type) => (
                  <div
                    key={type.value}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      budgetType === type.value 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setBudgetType(type.value)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{type.label}</h4>
                        <p className="text-sm text-gray-500">{type.description}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        budgetType === type.value ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                      }`}>
                        {budgetType === type.value && (
                          <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Conditional Settings */}
              {budgetType === 'rollover' && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <Label htmlFor="rolloverDate">Start Rollover From</Label>
                  <Input
                    id="rolloverDate"
                    type="date"
                    value={rolloverStartDate}
                    onChange={(e) => setRolloverStartDate(e.target.value)}
                    className="mt-2"
                  />
                </div>
              )}
              
              {budgetType === 'annual' && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg space-y-3">
                  <div>
                    <Label htmlFor="annualTarget">Annual Target Amount</Label>
                    <div className="relative mt-2">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="annualTarget"
                        type="number"
                        value={annualTarget}
                        onChange={(e) => setAnnualTarget(e.target.value)}
                        placeholder="1800"
                        className="pl-10"
                      />
                    </div>
                    {annualTarget && (
                      <p className="text-sm text-blue-700 mt-1">
                        Monthly allocation: {formatCurrency(getEstimatedMonthlyFromAnnual().toString())}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="paymentDue">Payment Due Date</Label>
                    <Input
                      id="paymentDue"
                      type="date"
                      value={paymentDueDate}
                      onChange={(e) => setPaymentDueDate(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 4. Advanced Options */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Advanced Options</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="includeInTotal">Include in Category Total</Label>
                    <p className="text-sm text-gray-500">Include this budget in the parent category's total</p>
                  </div>
                  <Switch
                    id="includeInTotal"
                    checked={includeInTotal}
                    onCheckedChange={setIncludeInTotal}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delete Budget Button (only for editing) */}
          {isEditing && (
            <Card>
              <CardContent className="p-6">
                <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Sub-Category Budget
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Sub-Category Budget</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete the budget for "{selectedSubCategoryData?.name}"? This will remove the budget but keep the sub-category.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                        Delete Budget
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Create Sub-Category Modal */}
      <AlertDialog open={isCreatingSubCategory} onOpenChange={setIsCreatingSubCategory}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Sub-Category</AlertDialogTitle>
            <AlertDialogDescription>
              Add a new sub-category to {selectedCategoryData?.name}
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="newSubCategoryName">Sub-Category Name</Label>
              <Input
                id="newSubCategoryName"
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
  );
}