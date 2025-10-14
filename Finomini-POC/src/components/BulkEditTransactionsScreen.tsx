import { useState, useEffect } from 'react';
import { ArrowLeft, Save, X, Check, Tag as TagIcon, FolderOpen, FileText, AlertCircle, Plus, Minus, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';
import { Alert, AlertDescription } from './ui/alert';
import { LegacyTransaction, Category, Subcategory, Tag } from '../types';

interface BulkEditTransactionsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
  transactions: LegacyTransaction[];
  onSave?: (updatedTransactions: LegacyTransaction[]) => void;
}

// Mock data for categories and subcategories
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Food & Dining',
    icon: '🍽️',
    color: 'bg-red-500',
    group: 'Lifestyle',
    type: 'expense',
    isSystemDefault: true,
    usageCount: 45,
    isArchived: false,
    subcategories: [
      { id: '1-1', name: 'Restaurants', categoryId: '1', usageCount: 25, isArchived: false },
      { id: '1-2', name: 'Fast Food', categoryId: '1', usageCount: 15, isArchived: false },
      { id: '1-3', name: 'Coffee Shops', categoryId: '1', usageCount: 12, isArchived: false },
      { id: '1-4', name: 'Groceries', categoryId: '1', usageCount: 8, isArchived: false }
    ]
  },
  {
    id: '2',
    name: 'Transportation',
    icon: '🚗',
    color: 'bg-blue-500',
    group: 'Transportation',
    type: 'expense',
    isSystemDefault: true,
    usageCount: 32,
    isArchived: false,
    subcategories: [
      { id: '2-1', name: 'Gas', categoryId: '2', usageCount: 18, isArchived: false },
      { id: '2-2', name: 'Uber/Lyft', categoryId: '2', usageCount: 8, isArchived: false },
      { id: '2-3', name: 'Public Transit', categoryId: '2', usageCount: 6, isArchived: false }
    ]
  },
  {
    id: '3',
    name: 'Shopping',
    icon: '🛍️',
    color: 'bg-purple-500',
    group: 'Lifestyle',
    type: 'expense',
    isSystemDefault: true,
    usageCount: 28,
    isArchived: false,
    subcategories: [
      { id: '3-1', name: 'Clothing', categoryId: '3', usageCount: 12, isArchived: false },
      { id: '3-2', name: 'Electronics', categoryId: '3', usageCount: 8, isArchived: false },
      { id: '3-3', name: 'Home & Garden', categoryId: '3', usageCount: 5, isArchived: false },
      { id: '3-4', name: 'Personal Care', categoryId: '3', usageCount: 3, isArchived: false }
    ]
  },
  {
    id: '4',
    name: 'Entertainment',
    icon: '🎬',
    color: 'bg-green-500',
    group: 'Lifestyle',
    type: 'expense',
    isSystemDefault: true,
    usageCount: 22,
    isArchived: false,
    subcategories: [
      { id: '4-1', name: 'Streaming Services', categoryId: '4', usageCount: 10, isArchived: false },
      { id: '4-2', name: 'Movies & Events', categoryId: '4', usageCount: 8, isArchived: false },
      { id: '4-3', name: 'Gaming', categoryId: '4', usageCount: 4, isArchived: false }
    ]
  },
  {
    id: '5',
    name: 'Income',
    icon: '💰',
    color: 'bg-green-600',
    group: 'Income',
    type: 'income',
    isSystemDefault: true,
    usageCount: 15,
    isArchived: false,
    subcategories: [
      { id: '5-1', name: 'Salary', categoryId: '5', usageCount: 12, isArchived: false },
      { id: '5-2', name: 'Freelance', categoryId: '5', usageCount: 2, isArchived: false },
      { id: '5-3', name: 'Investment Returns', categoryId: '5', usageCount: 1, isArchived: false }
    ]
  }
];

const mockTags: Tag[] = [
  { id: '1', name: 'Work', color: 'bg-blue-500', usageCount: 45, isArchived: false },
  { id: '2', name: 'Personal', color: 'bg-green-500', usageCount: 32, isArchived: false },
  { id: '3', name: 'Emergency', color: 'bg-red-500', usageCount: 8, isArchived: false },
  { id: '4', name: 'Subscription', color: 'bg-purple-500', usageCount: 15, isArchived: false },
  { id: '5', name: 'One-time', color: 'bg-yellow-500', usageCount: 22, isArchived: false },
  { id: '6', name: 'Recurring', color: 'bg-indigo-500', usageCount: 18, isArchived: false },
  { id: '7', name: 'Travel', color: 'bg-pink-500', usageCount: 12, isArchived: false },
  { id: '8', name: 'Medical', color: 'bg-orange-500', usageCount: 6, isArchived: false }
];

type BulkEditAction = 'set' | 'add' | 'remove' | 'append';

interface BulkEditChanges {
  category?: {
    action: 'set';
    categoryId: string;
    subcategoryId?: string;
  };
  tags?: {
    action: BulkEditAction;
    tagIds: string[];
  };
  notes?: {
    action: 'set' | 'append';
    value: string;
  };
}

export default function BulkEditTransactionsScreen({ 
  onBack, 
  onNavigate, 
  transactions, 
  onSave 
}: BulkEditTransactionsScreenProps) {
  const [changes, setChanges] = useState<BulkEditChanges>({});
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagAction, setTagAction] = useState<BulkEditAction>('add');
  const [notesValue, setNotesValue] = useState<string>('');
  const [notesAction, setNotesAction] = useState<'set' | 'append'>('append');
  const [previewChanges, setPreviewChanges] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);



  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  const getSelectedCategory = () => {
    return mockCategories.find(cat => cat.id === selectedCategoryId);
  };

  const getSelectedSubcategory = () => {
    const category = getSelectedCategory();
    return category?.subcategories?.find(sub => sub.id === selectedSubcategoryId);
  };

  const getAvailableSubcategories = () => {
    const category = getSelectedCategory();
    return category?.subcategories || [];
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedSubcategoryId(''); // Reset subcategory when category changes
    
    if (categoryId) {
      setChanges(prev => ({
        ...prev,
        category: {
          action: 'set',
          categoryId,
          subcategoryId: undefined
        }
      }));
    } else {
      const newChanges = { ...changes };
      delete newChanges.category;
      setChanges(newChanges);
    }
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    setSelectedSubcategoryId(subcategoryId);
    
    if (selectedCategoryId) {
      setChanges(prev => ({
        ...prev,
        category: {
          action: 'set',
          categoryId: selectedCategoryId,
          subcategoryId: subcategoryId || undefined
        }
      }));
    }
  };

  const handleTagToggle = (tagId: string) => {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter(id => id !== tagId)
      : [...selectedTags, tagId];
    
    setSelectedTags(newSelectedTags);
    
    if (newSelectedTags.length > 0) {
      setChanges(prev => ({
        ...prev,
        tags: {
          action: tagAction,
          tagIds: newSelectedTags
        }
      }));
    } else {
      const newChanges = { ...changes };
      delete newChanges.tags;
      setChanges(newChanges);
    }
  };

  const handleTagActionChange = (action: BulkEditAction) => {
    setTagAction(action);
    
    if (selectedTags.length > 0) {
      setChanges(prev => ({
        ...prev,
        tags: {
          action,
          tagIds: selectedTags
        }
      }));
    }
  };

  const handleNotesChange = (value: string) => {
    setNotesValue(value);
    
    if (value.trim()) {
      setChanges(prev => ({
        ...prev,
        notes: {
          action: notesAction,
          value: value.trim()
        }
      }));
    } else {
      const newChanges = { ...changes };
      delete newChanges.notes;
      setChanges(newChanges);
    }
  };

  const handleNotesActionChange = (action: 'set' | 'append') => {
    setNotesAction(action);
    
    if (notesValue.trim()) {
      setChanges(prev => ({
        ...prev,
        notes: {
          action,
          value: notesValue.trim()
        }
      }));
    }
  };

  const applyChangesToTransaction = (transaction: LegacyTransaction): LegacyTransaction => {
    let updatedTransaction = { ...transaction };

    // Apply category changes
    if (changes.category) {
      const category = mockCategories.find(cat => cat.id === changes.category!.categoryId);
      if (category) {
        updatedTransaction.category = category.name;
        updatedTransaction.categoryIcon = category.icon;
        
        const subcategory = category.subcategories?.find(sub => sub.id === changes.category!.subcategoryId);
        updatedTransaction.subcategory = subcategory?.name;
      }
    }

    // Apply tag changes
    if (changes.tags) {
      const selectedTagNames = mockTags
        .filter(tag => changes.tags!.tagIds.includes(tag.id))
        .map(tag => tag.name);

      const currentTags = updatedTransaction.tags || [];

      switch (changes.tags.action) {
        case 'set':
          updatedTransaction.tags = selectedTagNames;
          break;
        case 'add':
          const newTags = [...currentTags];
          selectedTagNames.forEach(tag => {
            if (!newTags.includes(tag)) {
              newTags.push(tag);
            }
          });
          updatedTransaction.tags = newTags;
          break;
        case 'remove':
          updatedTransaction.tags = currentTags.filter(tag => !selectedTagNames.includes(tag));
          break;
      }
    }

    // Apply notes changes
    if (changes.notes) {
      switch (changes.notes.action) {
        case 'set':
          updatedTransaction.notes = changes.notes.value;
          break;
        case 'append':
          const currentNotes = updatedTransaction.notes || '';
          updatedTransaction.notes = currentNotes 
            ? `${currentNotes}\n${changes.notes.value}`
            : changes.notes.value;
          break;
      }
    }

    return updatedTransaction;
  };

  const getPreviewTransactions = () => {
    return transactions.map(transaction => applyChangesToTransaction(transaction));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const updatedTransactions = getPreviewTransactions();
      
      // Simulate async save operation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (onSave) {
        onSave(updatedTransactions);
      }
      
      setSaveSuccess(true);
      
      // Show success feedback briefly, then navigate back
      setTimeout(() => {
        onBack();
      }, 1000);
    } catch (error) {
      console.error('Failed to save bulk edit changes:', error);
      setIsSaving(false);
    }
  };

  const hasChanges = Object.keys(changes).length > 0;
  const totalChanges = Object.keys(changes).length;

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
          
          <h1 className="text-xl font-semibold text-foreground">
            Bulk Edit ({transactions.length})
          </h1>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewChanges(!previewChanges)}
              className="text-primary"
            >
              {previewChanges ? 'Hide' : 'Preview'}
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={!hasChanges || isSaving || saveSuccess}
              className="flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : saveSuccess ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto p-4 space-y-6 ${isSaving ? 'opacity-50 pointer-events-none' : ''}`}>
        {/* Success Message */}
        {saveSuccess && (
          <Alert className="border-green-200 bg-green-50 text-green-800">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Successfully updated {transactions.length} transactions with your changes. Returning to transactions list...
            </AlertDescription>
          </Alert>
        )}

        {/* Summary */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">
                  {transactions.length} transactions selected
                </p>
                <p className="text-sm text-muted-foreground">
                  Total value: {formatCurrency(transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0))}
                </p>
              </div>
              {hasChanges && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  {totalChanges} change{totalChanges !== 1 ? 's' : ''}
                </Badge>
              )}
            </div>
            
            {/* Changes Summary */}
            {hasChanges && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm font-medium text-foreground mb-2">Changes to apply:</p>
                <div className="space-y-1">
                  {changes.category && (
                    <div className="flex items-center gap-2 text-sm">
                      <FolderOpen className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Category:</span>
                      <span className="font-medium">{getSelectedCategory()?.name}</span>
                      {getSelectedSubcategory() && (
                        <span className="text-muted-foreground">→ {getSelectedSubcategory()?.name}</span>
                      )}
                    </div>
                  )}
                  {changes.tags && (
                    <div className="flex items-center gap-2 text-sm">
                      <TagIcon className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Tags:</span>
                      <span className="font-medium">
                        {tagAction === 'add' ? 'Add' : tagAction === 'set' ? 'Set to' : 'Remove'} {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                  {changes.notes && (
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Notes:</span>
                      <span className="font-medium">
                        {notesAction === 'append' ? 'Append' : 'Replace'} notes
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Category Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-primary" />
              Category & Subcategory
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={selectedCategoryId} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category to apply to all transactions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No change</SelectItem>
                  {mockCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCategoryId && (
              <div>
                <Label htmlFor="subcategory">Subcategory</Label>
                <Select value={selectedSubcategoryId} onValueChange={handleSubcategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subcategory (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No subcategory</SelectItem>
                    {getAvailableSubcategories().map((subcategory) => (
                      <SelectItem key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {changes.category && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Will set category to "{getSelectedCategory()?.name}"
                  {getSelectedSubcategory() && ` → "${getSelectedSubcategory()?.name}"`}
                  {" "}for all selected transactions.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Tags Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <TagIcon className="h-5 w-5 text-primary" />
              Tags
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div>
              <Label>Tag Action</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  variant={tagAction === 'add' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTagActionChange('add')}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-3 w-3" />
                  Add
                </Button>
                <Button
                  variant={tagAction === 'set' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTagActionChange('set')}
                >
                  Replace
                </Button>
                <Button
                  variant={tagAction === 'remove' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTagActionChange('remove')}
                  className="flex items-center gap-1"
                >
                  <Minus className="h-3 w-3" />
                  Remove
                </Button>
              </div>
            </div>

            <div>
              <Label>Select Tags</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {mockTags.map((tag) => (
                  <Button
                    key={tag.id}
                    variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTagToggle(tag.id)}
                    className="text-xs"
                  >
                    #{tag.name}
                  </Button>
                ))}
              </div>
            </div>

            {changes.tags && selectedTags.length > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Will {tagAction === 'add' ? 'add' : tagAction === 'set' ? 'replace with' : 'remove'} tags: {selectedTags.map(id => mockTags.find(t => t.id === id)?.name).join(', ')}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div>
              <Label>Notes Action</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  variant={notesAction === 'append' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleNotesActionChange('append')}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-3 w-3" />
                  Append
                </Button>
                <Button
                  variant={notesAction === 'set' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleNotesActionChange('set')}
                >
                  Replace
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes Text</Label>
              <Textarea
                id="notes"
                placeholder={notesAction === 'append' ? 'Add notes to existing notes...' : 'Replace all notes with...'}
                value={notesValue}
                onChange={(e) => handleNotesChange(e.target.value)}
                rows={3}
              />
            </div>

            {changes.notes && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Will {notesAction === 'append' ? 'append to existing notes' : 'replace all notes'}: "{changes.notes.value}"
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Preview Section */}
        {previewChanges && hasChanges && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Preview Changes</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {getPreviewTransactions().slice(0, 5).map((transaction, index) => (
                  <div key={transaction.id} className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm">{transaction.merchant}</p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.category}
                          {transaction.subcategory && ` → ${transaction.subcategory}`}
                        </p>
                        {transaction.tags && transaction.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {transaction.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        {transaction.notes && (
                          <p className="text-xs text-muted-foreground mt-1 italic">
                            "{transaction.notes.length > 50 ? transaction.notes.substring(0, 50) + '...' : transaction.notes}"
                          </p>
                        )}
                      </div>
                      <span className="font-semibold">
                        {formatCurrency(transaction.amount)}
                      </span>
                    </div>
                  </div>
                ))}
                {transactions.length > 5 && (
                  <p className="text-center text-sm text-muted-foreground">
                    ... and {transactions.length - 5} more transactions
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pb-6">
          <Button
            onClick={handleSave}
            disabled={!hasChanges || isSaving || saveSuccess}
            className="w-full flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving Changes...
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle className="h-4 w-4" />
                Changes Saved Successfully!
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Apply Changes to {transactions.length} Transactions
              </>
            )}
          </Button>
          
          {!saveSuccess && (
            <Button
              variant="outline"
              onClick={onBack}
              disabled={isSaving}
              className="w-full"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}