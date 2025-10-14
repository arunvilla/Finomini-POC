import { useState } from 'react';
import { ArrowLeft, Edit, Tag, FileText, Camera, Split, Zap, Trash2, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { LegacyTransaction } from '../types';

interface AccountTransactionDetailsProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
  transaction: LegacyTransaction | null;
}

const mockCategories = [
  { id: '1', name: 'Food & Drink', icon: '☕' },
  { id: '2', name: 'Shopping', icon: '🛒' },
  { id: '3', name: 'Transportation', icon: '⛽' },
  { id: '4', name: 'Entertainment', icon: '🎬' },
  { id: '5', name: 'Bills & Utilities', icon: '📄' },
  { id: '6', name: 'Income', icon: '💰' }
];

const mockTags = [
  { id: '1', name: 'Work Expense', color: 'bg-blue-100 text-blue-800' },
  { id: '2', name: 'Recurring', color: 'bg-green-100 text-green-800' },
  { id: '3', name: 'Tax Deductible', color: 'bg-purple-100 text-purple-800' },
  { id: '4', name: 'Business', color: 'bg-orange-100 text-orange-800' }
];

export default function AccountTransactionDetails({ onBack, onNavigate, transaction }: AccountTransactionDetailsProps) {
  const [selectedCategory, setSelectedCategory] = useState(transaction?.category || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(transaction?.tags || []);
  const [notes, setNotes] = useState(transaction?.notes || '');
  const [hasChanges, setHasChanges] = useState(false);

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Transaction Not Found</h2>
          <p className="text-gray-600 mb-4">The transaction details could not be loaded.</p>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setHasChanges(true);
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => {
      const newTags = prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId];
      setHasChanges(true);
      return newTags;
    });
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
    setHasChanges(true);
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving transaction changes:', {
      category: selectedCategory,
      tags: selectedTags,
      notes
    });
    setHasChanges(false);
  };

  const handleSplitTransaction = () => {
    // Navigate to split transaction screen (would be implemented)
    console.log('Split transaction');
  };

  const handleCreateRule = () => {
    // Navigate to create rule screen
    console.log('Create rule for merchant:', transaction.merchant);
  };

  const handleDeleteTransaction = () => {
    // Show confirmation dialog and delete
    console.log('Delete transaction');
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
          <h1 className="text-lg font-semibold text-center flex-1">Transaction Details</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Transaction Summary */}
        <Card className="mx-4 mt-4">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-4xl mb-2">{transaction.categoryIcon}</div>
              <div className={`text-3xl font-bold mb-2 ${
                transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'
              }`}>
                {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">{transaction.description}</h2>
              <p className="text-gray-600">{transaction.merchant}</p>
              {transaction.status === 'pending' && (
                <Badge variant="secondary" className="mt-2">Pending</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Transaction Details */}
        <Card className="mx-4 mt-4">
          <CardHeader>
            <CardTitle className="text-base">Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500 mb-1">Date & Time</div>
                <div className="font-medium">{formatDateTime(transaction.date)}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Status</div>
                <div className="font-medium">{transaction.status === 'posted' ? 'Posted' : 'Pending'}</div>
              </div>
            </div>
            
            {transaction.account && (
              <div>
                <div className="text-gray-500 text-sm mb-1">Account</div>
                <div className="font-medium">{transaction.account}</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Category */}
        <Card className="mx-4 mt-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Category</CardTitle>
              <Edit className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {mockCategories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    <div className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card className="mx-4 mt-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Tags</CardTitle>
              <Tag className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockTags.map((tag) => (
                <label key={tag.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag.id)}
                    onChange={() => handleTagToggle(tag.id)}
                    className="rounded border-gray-300"
                  />
                  <Badge variant="secondary" className={tag.color}>
                    {tag.name}
                  </Badge>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="mx-4 mt-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Notes</CardTitle>
              <FileText className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Add notes about this transaction..."
              value={notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Attachments */}
        <Card className="mx-4 mt-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Attachments</CardTitle>
              <Camera className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Camera className="h-4 w-4 mr-2" />
              Add Receipt Photo
            </Button>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card className="mx-4 mt-4 mb-6">
          <CardContent className="p-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={handleSplitTransaction}>
                <Split className="h-4 w-4 mr-2" />
                Split Transaction
              </Button>
              
              <Button variant="outline" className="w-full justify-start" onClick={handleCreateRule}>
                <Zap className="h-4 w-4 mr-2" />
                Create Rule for "{transaction.merchant}"
              </Button>
              
              <Separator />
              
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700" onClick={handleDeleteTransaction}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Transaction
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Changes Button */}
      {hasChanges && (
        <div className="bg-white border-t px-4 py-3">
          <Button onClick={handleSave} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}