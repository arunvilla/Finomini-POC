import { useState, useRef } from 'react';
import { ArrowLeft, Camera, Upload, Scan, ThumbsUp, ThumbsDown, AlertCircle, CheckCircle, Brain } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { useOCR } from '../hooks/useOCR';
import { useAI } from '../hooks/useAI';
import { useAIFeedback, useQuickFeedback } from '../hooks/useAIFeedback';
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
  
  // AI categorization state
  const [aiSuggestion, setAiSuggestion] = useState<{
    category: string;
    confidence: number;
    reasoning?: string;
    source?: string;
  } | null>(null);
  const [showAISuggestion, setShowAISuggestion] = useState(false);
  const [userOverrodeAI, setUserOverrodeAI] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  
  // OCR and AI functionality
  const { processReceipt, isProcessing } = useOCR();
  const { isProcessing: aiProcessing } = useAI();
  const { getImprovedSuggestion } = useAIFeedback();
  const { acceptSuggestion, correctSuggestion, rejectSuggestion } = useQuickFeedback();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSave = async () => {
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

    // Record AI feedback if there was a suggestion
    if (aiSuggestion && !feedbackGiven) {
      try {
        const selectedCategoryName = categories.find(cat => cat.id === category)?.name || category;
        const suggestedCategoryName = aiSuggestion.category;

        if (selectedCategoryName === suggestedCategoryName) {
          // User accepted the AI suggestion
          await acceptSuggestion(
            transaction.id,
            suggestedCategoryName,
            aiSuggestion.confidence,
            merchant,
            parseFloat(amount),
            merchant
          );
        } else {
          // User corrected the AI suggestion
          await correctSuggestion(
            transaction.id,
            suggestedCategoryName,
            aiSuggestion.confidence,
            selectedCategoryName,
            'User selected different category',
            merchant,
            parseFloat(amount),
            merchant
          );
        }
      } catch (error) {
        console.warn('Failed to record AI feedback:', error);
        // Don't block transaction saving if feedback fails
      }
    }

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
    if (value.length > 3 && amount) {
      try {
        const result = await getImprovedSuggestion(
          value,
          value, // merchant
          parseFloat(amount)
        );
        
        const suggestedCategoryId = categories.find(cat => 
          cat.name.toLowerCase().includes(result.category.toLowerCase())
        )?.id;
        
        if (suggestedCategoryId && result.confidence > 0.6) {
          setAiSuggestion({
            category: result.category,
            confidence: result.confidence,
            reasoning: result.reasoning,
            source: result.source
          });
          setShowAISuggestion(true);
          
          // Auto-apply if confidence is very high and no category is set
          if (result.confidence > 0.8 && !category) {
            setCategory(suggestedCategoryId);
            toast.success(`Auto-categorized as ${result.category} (${Math.round(result.confidence * 100)}% confidence)`);
          }
        }
      } catch (error) {
        // Silently fail - AI categorization is optional
        console.log('AI categorization failed:', error);
      }
    }
  };

  // Handle AI suggestion feedback
  const handleAISuggestionFeedback = async (accepted: boolean) => {
    if (!aiSuggestion) return;

    try {
      const transactionId = Date.now().toString(); // Temporary ID
      const suggestedCategoryName = aiSuggestion.category;
      
      if (accepted) {
        const suggestedCategoryId = categories.find(cat => 
          cat.name.toLowerCase().includes(suggestedCategoryName.toLowerCase())
        )?.id;
        
        if (suggestedCategoryId) {
          setCategory(suggestedCategoryId);
          await acceptSuggestion(
            transactionId,
            suggestedCategoryName,
            aiSuggestion.confidence,
            merchant,
            parseFloat(amount || '0'),
            merchant
          );
          toast.success('AI suggestion accepted!');
        }
      } else {
        await rejectSuggestion(
          transactionId,
          suggestedCategoryName,
          aiSuggestion.confidence,
          category || 'Other',
          'User rejected suggestion',
          merchant,
          parseFloat(amount || '0'),
          merchant
        );
        toast.info('AI suggestion rejected. Thanks for the feedback!');
      }
      
      setFeedbackGiven(true);
      setShowAISuggestion(false);
    } catch (error) {
      console.warn('Failed to record AI feedback:', error);
      toast.error('Failed to record feedback');
    }
  };

  // Handle manual category change (detect if user overrode AI)
  const handleCategoryChange = (value: string) => {
    if (aiSuggestion && !userOverrodeAI) {
      const selectedCategoryName = categories.find(cat => cat.id === value)?.name;
      if (selectedCategoryName !== aiSuggestion.category) {
        setUserOverrodeAI(true);
      }
    }
    setCategory(value);
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

        {/* Enhanced AI Suggestion with Confidence Scoring */}
        {showAISuggestion && aiSuggestion && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Brain className="h-5 w-5" />
                AI Category Suggestion
                <Badge 
                  variant={aiSuggestion.confidence >= 0.8 ? "default" : aiSuggestion.confidence >= 0.6 ? "secondary" : "destructive"}
                  className="ml-2"
                >
                  {Math.round(aiSuggestion.confidence * 100)}% confidence
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Alert className="mb-4">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p>
                        <strong>Suggested Category:</strong> {aiSuggestion.category}
                      </p>
                      <div className="flex items-center gap-1">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              aiSuggestion.confidence >= 0.8 ? 'bg-green-500' : 
                              aiSuggestion.confidence >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${aiSuggestion.confidence * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {aiSuggestion.reasoning && (
                      <div className="bg-white/50 p-2 rounded text-sm">
                        <strong>Why this category?</strong> {aiSuggestion.reasoning}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {aiSuggestion.source && (
                        <Badge variant="outline" className="text-xs">
                          {aiSuggestion.source === 'history' ? '📚 From History' : 
                           aiSuggestion.source === 'ai' ? '🤖 AI Analysis' : '📋 Rules'}
                        </Badge>
                      )}
                      <span>•</span>
                      <span>Help improve AI by providing feedback</span>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
              
              <div className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleAISuggestionFeedback(true)}
                  className="flex items-center gap-2"
                >
                  <ThumbsUp className="h-4 w-4" />
                  Accept & Learn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAISuggestionFeedback(false)}
                  className="flex items-center gap-2"
                >
                  <ThumbsDown className="h-4 w-4" />
                  Reject & Teach
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAISuggestion(false)}
                >
                  Dismiss
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Category Selection with AI Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Category *
              {aiSuggestion && userOverrodeAI && (
                <Badge variant="secondary" className="text-xs">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  AI Override
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select category">
                  {selectedCategory && (
                    <div className="flex items-center gap-2">
                      <span>{selectedCategory.icon}</span>
                      <span>{selectedCategory.name}</span>
                      {aiSuggestion && selectedCategory.name === aiSuggestion.category && (
                        <Badge variant="outline" className="text-xs ml-auto">
                          AI: {Math.round(aiSuggestion.confidence * 100)}%
                        </Badge>
                      )}
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </div>
                      {aiSuggestion && cat.name === aiSuggestion.category && (
                        <div className="flex items-center gap-1 ml-2">
                          <Brain className="h-3 w-3 text-blue-500" />
                          <span className="text-xs text-blue-600">
                            {Math.round(aiSuggestion.confidence * 100)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex items-center justify-between mt-2">
              <Button 
                variant="link" 
                className="p-0 h-auto"
                onClick={() => onNavigate('categories-tags')}
              >
                Manage Categories
              </Button>
              
              {aiSuggestion && (
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-xs"
                  onClick={() => onNavigate('ai-learning-analytics')}
                >
                  View AI Performance
                </Button>
              )}
            </div>
            
            {/* Enhanced confidence indicator with feedback collection */}
            {aiSuggestion && category && (
              <div className="mt-3 p-3 bg-muted rounded-lg">
                {(() => {
                  const selectedCategoryName = categories.find(cat => cat.id === category)?.name;
                  if (selectedCategoryName === aiSuggestion.category) {
                    return (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            Matches AI suggestion ({Math.round(aiSuggestion.confidence * 100)}% confidence)
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Great! This helps train the AI for similar transactions.
                        </p>
                      </div>
                    );
                  } else {
                    return (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-orange-600">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            Different from AI suggestion
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          AI suggested "{aiSuggestion.category}" but you chose "{selectedCategoryName}". 
                          This feedback will improve future suggestions.
                        </p>
                      </div>
                    );
                  }
                })()}
              </div>
            )}
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