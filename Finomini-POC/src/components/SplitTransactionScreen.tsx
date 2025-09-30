import { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';

interface SplitTransactionScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
  transaction?: any;
}

interface SplitItem {
  id: string;
  amount: string;
  category: string;
  notes: string;
}

const categories = [
  { id: '1', name: 'Food & Dining', icon: '🍽️' },
  { id: '2', name: 'Transportation', icon: '🚗' },
  { id: '3', name: 'Shopping', icon: '🛍️' },
  { id: '4', name: 'Entertainment', icon: '🎬' },
  { id: '5', name: 'Gas', icon: '⛽' },
  { id: '6', name: 'Grocery', icon: '🛒' },
  { id: '7', name: 'Bills & Utilities', icon: '📄' }
];

export default function SplitTransactionScreen({ onBack, onNavigate, transaction }: SplitTransactionScreenProps) {
  const originalAmount = Math.abs(transaction?.amount || 89.99);
  const originalMerchant = transaction?.merchant || 'Target';

  const [splitItems, setSplitItems] = useState<SplitItem[]>([
    { id: '1', amount: '', category: '', notes: '' },
    { id: '2', amount: '', category: '', notes: '' }
  ]);

  const totalSplitAmount = splitItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  const remainingAmount = originalAmount - totalSplitAmount;

  const addSplitItem = () => {
    const newItem: SplitItem = {
      id: Date.now().toString(),
      amount: remainingAmount > 0 ? remainingAmount.toFixed(2) : '',
      category: '',
      notes: ''
    };
    setSplitItems([...splitItems, newItem]);
  };

  const removeSplitItem = (id: string) => {
    if (splitItems.length > 2) {
      setSplitItems(splitItems.filter(item => item.id !== id));
    }
  };

  const updateSplitItem = (id: string, field: keyof SplitItem, value: string) => {
    setSplitItems(splitItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSave = () => {
    // Validate that all amounts and categories are filled
    const invalidItems = splitItems.filter(item => !item.amount || !item.category);
    if (invalidItems.length > 0) {
      alert('Please fill in amount and category for all split items');
      return;
    }

    // Validate that total equals original amount
    if (Math.abs(totalSplitAmount - originalAmount) > 0.01) {
      alert('Split amounts must equal the original transaction amount');
      return;
    }

    console.log('Saving split transaction:', splitItems);
    onBack();
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || '';
  };

  const getCategoryIcon = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.icon || '';
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
          
          <h1 className="text-xl font-semibold text-foreground">Split Transaction</h1>
          
          <Button onClick={handleSave} className="px-4">
            Save
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Original Transaction Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Original Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">{originalMerchant}</p>
                <p className="text-sm text-muted-foreground">Total Amount</p>
              </div>
              <p className="text-xl font-bold text-foreground">
                ${originalAmount.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Remaining Amount Indicator */}
        <Alert className={remainingAmount === 0 ? 'border-green-500 bg-green-50' : remainingAmount > 0 ? 'border-orange-500 bg-orange-50' : 'border-red-500 bg-red-50'}>
          <AlertDescription>
            <div className="flex items-center justify-between">
              <span>Remaining to Split:</span>
              <span className={`font-bold ${remainingAmount === 0 ? 'text-green-600' : remainingAmount > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                ${Math.abs(remainingAmount).toFixed(2)}
                {remainingAmount < 0 && ' (Over)'}
              </span>
            </div>
          </AlertDescription>
        </Alert>

        {/* Split Items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Split Items</h2>
            <Button onClick={addSplitItem} size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Split
            </Button>
          </div>

          {splitItems.map((item, index) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Split {index + 1}</CardTitle>
                  {splitItems.length > 2 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSplitItem(item.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Amount */}
                <div>
                  <Label htmlFor={`amount-${item.id}`}>Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id={`amount-${item.id}`}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={item.amount}
                      onChange={(e) => updateSplitItem(item.id, 'amount', e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor={`category-${item.id}`}>Category</Label>
                  <Select value={item.category} onValueChange={(value) => updateSplitItem(item.id, 'category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category">
                        {item.category && (
                          <div className="flex items-center gap-2">
                            <span>{getCategoryIcon(item.category)}</span>
                            <span>{getCategoryName(item.category)}</span>
                          </div>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
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

                {/* Notes */}
                <div>
                  <Label htmlFor={`notes-${item.id}`}>Notes (Optional)</Label>
                  <Input
                    id={`notes-${item.id}`}
                    placeholder="Add a note..."
                    value={item.notes}
                    onChange={(e) => updateSplitItem(item.id, 'notes', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Split Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {splitItems.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span>Split {index + 1}: {getCategoryName(item.category) || 'Uncategorized'}</span>
                  <span>${(parseFloat(item.amount) || 0).toFixed(2)}</span>
                </div>
              ))}
              <Separator className="my-2" />
              <div className="flex items-center justify-between font-semibold">
                <span>Total Split:</span>
                <span>${totalSplitAmount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Original Amount:</span>
                <span>${originalAmount.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}