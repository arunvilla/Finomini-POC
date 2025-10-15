import { useState, useRef } from 'react';
import { ArrowLeft, Calendar, Camera, Upload, Scan } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Badge } from './ui/badge';
import { useOCR } from '../hooks/useOCR';
import { useAI } from '../hooks/useAI';
import { toast } from 'sonner';

interface AddManualTransactionScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

const categories = [
  { id: '1', name: 'Food & Dining', icon: '🍽️' },
  { id: '2', name: 'Transportation', icon: '🚗' },
  { id: '3', name: 'Shopping', icon: '🛍️' },
  { id: '4', name: 'Entertainment', icon: '🎬' },
  { id: '5', name: 'Gas', icon: '⛽' },
  { id: '6', name: 'Grocery', icon: '🛒' },
  { id: '7', name: 'Income', icon: '💰' },
  { id: '8', name: 'Bills & Utilities', icon: '📄' },
  { id: '9', name: 'Transfer', icon: '↔️' }
];

const tags = [
  'Work', 'Personal', 'Emergency', 'Subscription', 'One-time', 'Recurring', 'Travel', 'Medical'
];

const accounts = [
  { id: '1', name: 'Chase Checking ••••1234', type: 'Checking' },
  { id: '2', name: 'Chase Freedom ••••4526', type: 'Credit Card' },
  { id: '3', name: 'High Yield Savings ••••9876', type: 'Savings' },
  { id: '4', name: 'Cash', type: 'Manual' }
];

export default function AddManualTransactionScreen({ onBack, onNavigate }: AddManualTransactionScreenProps) {
  const [transactionType, setTransactionType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));
  const [notes, setNotes] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [hasReceipt, setHasReceipt] = useState(false);
  
  // OCR and AI functionality
  const { processReceipt, isProcessing } = useOCR();
  const { categorizeTransaction, isProcessing: aiProcessing } = useAI();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSave = () => {
    // Validate required fields
    if (!amount || !merchant || !category || !account) {
      alert('Please fill in all required fields');
      return;
    }

    // Create transaction object
    const transaction = {
      id: Date.now().toString(),
      amount: transactionType === 'expense' ? -parseFloat(amount) : parseFloat(amount),
      merchant,
      category,
      account,
      date: new Date(`${date}T${time}`),
      notes,
      tags: selectedTags,
      status: 'posted',
      isManual: true
    };

    console.log('Saving transaction:', transaction);
    onBack();
  };

  // OCR functionality to pre-fill form
  const handleReceiptScan = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      toast.loading('Scanning receipt...', { id: 'ocr-scan' });
      
      const result = await processReceipt(file);
      
      // Pre-fill form with OCR results
      if (result.merchant) {
        setMerchant(result.merchant);
      }
      
      if (result.amount) {
        setAmount(result.amount.toString());
      }
      
      if (result.date) {
        const dateStr = result.date.toISOString().split('T')[0];
        const timeStr = result.date.toTimeString().slice(0, 5);
        setDate(dateStr);
        setTime(timeStr);
      }
      
      // Auto-categorize based on merchant
      const suggestedCategory = categorizeMerchant(result.merchant || '');
      if (suggestedCategory) {
        setCategory(suggestedCategory);
      }
      
      // Add OCR confidence to notes
      const ocrNotes = `Scanned from receipt (${Math.round(result.confidence * 100)}% confidence)`;
      setNotes(prev => prev ? `${prev}\n${ocrNotes}` : ocrNotes);
      
      setHasReceipt(true);
      toast.success('Receipt scanned successfully!', { id: 'ocr-scan' });
      
    } catch (error) {
      console.error('OCR scan failed:', error);
      toast.error('Failed to scan receipt. Please try again.', { id: 'ocr-scan' });
    }
  };

  const categorizeMerchant = (merchant: string): string => {
    const name = merchant.toLowerCase();
    if (name.includes('grocery') || name.includes('market') || name.includes('whole foods')) return '6'; // Grocery
    if (name.includes('restaurant') || name.includes('cafe') || name.includes('starbucks')) return '1'; // Food & Dining
    if (name.includes('gas') || name.includes('shell') || name.includes('exxon')) return '5'; // Gas
    if (name.includes('target') || name.includes('walmart') || name.includes('store')) return '3'; // Shopping
    return '';
  };

  const handleScanClick = () => {
    fileInputRef.current?.click();
  };

  // AI categorization when merchant or amount changes
  const handleMerchantChange = async (value: string) => {
    setMerchant(value);
    
    // Auto-categorize with AI if we have enough info
    if (value.length > 3 && amount && !category) {
      try {
        const result = await categorizeTransaction(value, parseFloat(amount));
        const suggestedCategoryId = categories.find(cat => 
          cat.name.toLowerCase().includes(result.category.toLowerCase())
        )?.id;
        
        if (suggestedCategoryId && result.confidence > 0.6) {
          setCategory(suggestedCategoryId);
          toast.success(`Auto-categorized as ${result.category} (${Math.round(result.confidence * 100)}% confidence)`);
        }
      } catch (error) {
        // Silently fail - AI categorization is optional
        console.log('AI categorization failed:', error);
      }
    }
  };

  const selectedCategory = categories.find(cat => cat.id === category);

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
          
          <h1 className="text-xl font-semibold text-foreground">Add Transaction</h1>
          
          <Button onClick={handleSave} className="px-4">
            Save
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Transaction Type */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Type</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={transactionType} onValueChange={setTransactionType} className="flex gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="expense" id="expense" />
                <Label htmlFor="expense">Expense</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="income" id="income" />
                <Label htmlFor="income">Income</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="transfer" id="transfer" />
                <Label htmlFor="transfer">Transfer</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Amount */}
        <Card>
          <CardHeader>
            <CardTitle>Amount *</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 text-xl font-semibold"
              />
            </div>
          </CardContent>
        </Card>

        {/* Receipt Scanner */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Fill from Receipt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handleScanClick}
                disabled={isProcessing}
                className="flex-1"
              >
                <Scan className="w-4 h-4 mr-2" />
                {isProcessing ? 'Scanning...' : 'Scan Receipt'}
              </Button>
              <Button variant="outline" onClick={() => onNavigate('ai-receipt-scanner')}>
                <Camera className="w-4 h-4 mr-2" />
                Advanced Scan
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleReceiptScan}
              className="hidden"
            />
            {hasReceipt && (
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">
                  Receipt data loaded
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Merchant/Description */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Merchant/Description *
              {aiProcessing && (
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Enter merchant or description"
              value={merchant}
              onChange={(e) => handleMerchantChange(e.target.value)}
            />
            {aiProcessing && (
              <p className="text-xs text-muted-foreground mt-1">
                AI is analyzing for smart categorization...
              </p>
            )}
          </CardContent>
        </Card>

        {/* Date & Time */}
        <Card>
          <CardHeader>
            <CardTitle>Date & Time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account */}
        <Card>
          <CardHeader>
            <CardTitle>Account *</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={account} onValueChange={setAccount}>
              <SelectTrigger>
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((acc) => (
                  <SelectItem key={acc.id} value={acc.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{acc.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{acc.type}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Category */}
        <Card>
          <CardHeader>
            <CardTitle>Category *</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category">
                  {selectedCategory && (
                    <div className="flex items-center gap-2">
                      <span>{selectedCategory.icon}</span>
                      <span>{selectedCategory.name}</span>
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
            <Button 
              variant="link" 
              className="p-0 h-auto mt-2"
              onClick={() => onNavigate('categories-tags')}
            >
              Manage Categories
            </Button>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleTag(tag)}
                    className="text-xs"
                  >
                    #{tag}
                  </Button>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-2">Selected tags:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedTags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Add any additional notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Receipt */}
        <Card>
          <CardHeader>
            <CardTitle>Receipt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Take Photo
                </Button>
                <Button variant="outline" className="flex-1 flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
              </div>
              {hasReceipt && (
                <div className="p-3 bg-secondary rounded-lg">
                  <p className="text-sm text-secondary-foreground">Receipt attached</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}