import { useState, useEffect } from 'react';
import { ArrowLeft, Edit3, Save, X, Calendar, DollarSign, Building2, Tag, FileText, Eye, TrendingUp, Trash2, Camera, Upload, Image as ImageIcon, Brain, ThumbsUp, ThumbsDown, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { useQuickFeedback } from '../hooks/useAIFeedback';
import { toast } from 'sonner';

interface TransactionDetailsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
  transaction: any;
  onSave?: (updatedTransaction: any) => void;
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

const availableTags = [
  'Work', 'Personal', 'Emergency', 'Subscription', 'One-time', 'Recurring', 'Travel', 'Medical'
];

const accounts = [
  { id: '1', name: 'Chase Checking ••••1234', type: 'Checking' },
  { id: '2', name: 'Chase Freedom ••••4526', type: 'Credit Card' },
  { id: '3', name: 'High Yield Savings ••••9876', type: 'Savings' }
];

export default function TransactionDetailsScreen({ onBack, onNavigate, transaction, onSave }: TransactionDetailsScreenProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTransaction, setEditedTransaction] = useState(() => {
    if (!transaction) return null;
    return {
      ...transaction,
      date: transaction.date instanceof Date ? transaction.date : new Date(transaction.date || Date.now())
    };
  });
  const [selectedTags, setSelectedTags] = useState<string[]>(transaction?.tags || []);
  const [showReceiptUpload, setShowReceiptUpload] = useState(false);
  const [showFeedbackPrompt, setShowFeedbackPrompt] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  // AI feedback hooks
  const { correctSuggestion } = useQuickFeedback();

  useEffect(() => {
    if (transaction) {
      // Ensure date is always a Date object
      const normalizedTransaction = {
        ...transaction,
        date: transaction.date instanceof Date ? transaction.date : new Date(transaction.date || Date.now())
      };
      setEditedTransaction(normalizedTransaction);
    }
    setSelectedTags(transaction?.tags || []);
  }, [transaction]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  const formatDate = (date: any) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date';
    }
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: any) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) {
      return 'Invalid Time';
    }
    return dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleSave = async () => {
    const updatedTransaction = {
      ...editedTransaction,
      tags: selectedTags
    };

    // Check if category was changed and prompt for feedback
    if (transaction.category !== updatedTransaction.category && !feedbackGiven) {
      setShowFeedbackPrompt(true);
      return;
    }

    if (onSave) {
      onSave(updatedTransaction);
    }

    setIsEditMode(false);
  };

  // Handle category change feedback
  const handleCategoryFeedback = async (wasAICorrect: boolean) => {
    if (!transaction || !editedTransaction) return;

    try {
      if (wasAICorrect) {
        // User is correcting a wrong AI suggestion
        await correctSuggestion(
          transaction.id,
          transaction.category, // original AI suggestion
          0.7, // estimated confidence
          editedTransaction.category, // user's correction
          'User corrected category in transaction details',
          transaction.merchant,
          Math.abs(transaction.amount),
          transaction.description || transaction.merchant
        );
      } else {
        // User is just updating category (not correcting AI)
        // No feedback needed in this case
      }

      setFeedbackGiven(true);
      setShowFeedbackPrompt(false);

      // Now save the transaction
      if (onSave) {
        onSave({
          ...editedTransaction,
          tags: selectedTags
        });
      }

      setIsEditMode(false);
    } catch (error) {
      console.warn('Failed to record feedback:', error);
      // Continue with save even if feedback fails
      if (onSave) {
        onSave({
          ...editedTransaction,
          tags: selectedTags
        });
      }
      setIsEditMode(false);
    }
  };

  const handleCancel = () => {
    setEditedTransaction(transaction);
    setSelectedTags(transaction?.tags || []);
    setIsEditMode(false);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleReceiptUpload = (_method: 'camera' | 'gallery') => {
    // In a real app, this would use device camera or file picker
    // For demo purposes, we'll simulate receipt upload
    const mockReceiptUrl = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=`;

    setEditedTransaction((prev: any) => ({
      ...prev,
      receipt: mockReceiptUrl
    }));
    setShowReceiptUpload(false);
  };

  const handleReceiptRemove = () => {
    setEditedTransaction((prev: any) => ({
      ...prev,
      receipt: undefined
    }));
  };

  const getSelectedCategory = () => {
    return categories.find(cat => cat.name === editedTransaction?.category);
  };

  const getSelectedAccount = () => {
    return accounts.find(acc => editedTransaction?.account?.includes(acc.name?.slice(-4)));
  };

  if (!transaction || !editedTransaction) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Alert>
          <AlertDescription>Transaction not found</AlertDescription>
        </Alert>
      </div>
    );
  }

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
            {isEditMode ? 'Edit Transaction' : 'Transaction Details'}
          </h1>

          <div className="flex items-center gap-2">
            {isEditMode ? (
              <>
                <Button variant="ghost" size="icon" onClick={handleCancel} className="p-2">
                  <X className="h-5 w-5" />
                </Button>
                <Button size="icon" onClick={handleSave} className="p-2">
                  <Save className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsEditMode(true)} className="p-2">
                <Edit3 className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Amount and Status */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <div className={`text-3xl font-bold ${editedTransaction.amount > 0 ? 'text-green-600' : 'text-foreground'
                }`}>
                {editedTransaction.amount > 0 ? '+' : ''}{formatCurrency(editedTransaction.amount)}
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-muted-foreground">{formatDate(editedTransaction.date)}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{formatTime(editedTransaction.date)}</span>
                {editedTransaction.status === 'pending' && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <Badge variant="outline">Pending</Badge>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Merchant/Description */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Merchant
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {isEditMode ? (
              <div className="space-y-2">
                <Label htmlFor="merchant">Merchant Name</Label>
                <Input
                  id="merchant"
                  value={editedTransaction.merchant}
                  onChange={(e) => setEditedTransaction((prev: any) => ({ ...prev, merchant: e.target.value }))}
                  placeholder="Enter merchant name"
                />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{editedTransaction.merchant}</p>
                  <p className="text-sm text-muted-foreground">Primary merchant</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('merchant-trend', { merchant: editedTransaction.merchant })}
                  className="flex items-center gap-2"
                >
                  <TrendingUp className="h-4 w-4" />
                  View Trend
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {isEditMode ? (
              <div className="space-y-2">
                <Label htmlFor="account">Account</Label>
                <Select
                  value={getSelectedAccount()?.id || ''}
                  onValueChange={(value: string) => {
                    const account = accounts.find(acc => acc.id === value);
                    setEditedTransaction((prev: any) => ({ ...prev, account: account?.name || '' }));
                  }}
                >
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
              </div>
            ) : (
              <div>
                <p className="font-semibold text-foreground">{editedTransaction.account}</p>
                <p className="text-sm text-muted-foreground">{getSelectedAccount()?.type || 'Account'}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Category */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <span className="text-lg">{getSelectedCategory()?.icon || '📂'}</span>
              Category
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {isEditMode ? (
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={getSelectedCategory()?.id || ''}
                  onValueChange={(value: string) => {
                    const category = categories.find(cat => cat.id === value);
                    setEditedTransaction((prev: any) => ({ ...prev, category: category?.name || '' }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
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
            ) : (
              <div>
                <p className="font-semibold text-foreground">{editedTransaction.category}</p>
                <p className="text-sm text-muted-foreground">Transaction category</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Date & Time */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Date & Time
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {isEditMode ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={editedTransaction.date instanceof Date ? editedTransaction.date.toISOString().split('T')[0] : new Date(editedTransaction.date).toISOString().split('T')[0]}
                    onChange={(e) => {
                      const currentDate = editedTransaction.date instanceof Date ? editedTransaction.date : new Date(editedTransaction.date);
                      const newDate = new Date(e.target.value + 'T' + (currentDate.toTimeString ? currentDate.toTimeString().slice(0, 5) : '00:00'));
                      setEditedTransaction((prev: any) => ({ ...prev, date: newDate }));
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={editedTransaction.date instanceof Date ? editedTransaction.date.toTimeString().slice(0, 5) : new Date(editedTransaction.date).toTimeString().slice(0, 5)}
                    onChange={(e) => {
                      const currentDate = editedTransaction.date instanceof Date ? editedTransaction.date : new Date(editedTransaction.date);
                      const newDate = new Date(currentDate.toDateString() + ' ' + e.target.value);
                      setEditedTransaction((prev: any) => ({ ...prev, date: newDate }));
                    }}
                  />
                </div>
              </div>
            ) : (
              <div>
                <p className="font-semibold text-foreground">{formatDate(editedTransaction.date)}</p>
                <p className="text-sm text-muted-foreground">{formatTime(editedTransaction.date)}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" />
              Tags
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {isEditMode ? (
              <div className="space-y-3">
                <Label>Select Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
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
                    <p className="text-sm text-muted-foreground mb-2">Selected:</p>
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
            ) : (
              <div>
                {selectedTags.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {selectedTags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No tags added</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {isEditMode ? (
              <div className="space-y-2">
                <Label htmlFor="notes">Transaction Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add notes about this transaction..."
                  value={editedTransaction.notes || ''}
                  onChange={(e) => setEditedTransaction((prev: any) => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                />
              </div>
            ) : (
              <div>
                {editedTransaction.notes ? (
                  <p className="text-foreground">{editedTransaction.notes}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No notes added</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Receipt */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              Receipt
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {editedTransaction.receipt ? (
              <div className="space-y-4">
                <div className="relative bg-muted rounded-lg p-4">
                  <img
                    src={editedTransaction.receipt}
                    alt="Receipt"
                    className="w-full h-48 object-contain rounded"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Receipt attached
                  </Badge>
                  {isEditMode && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReceiptRemove}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">No receipt attached</p>

                  {!showReceiptUpload ? (
                    <Button
                      variant="outline"
                      onClick={() => setShowReceiptUpload(true)}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Receipt
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleReceiptUpload('camera')}
                          className="flex items-center gap-2"
                        >
                          <Camera className="h-4 w-4" />
                          Take Photo
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleReceiptUpload('gallery')}
                          className="flex items-center gap-2"
                        >
                          <Upload className="h-4 w-4" />
                          Choose from Gallery
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowReceiptUpload(false)}
                        className="text-muted-foreground"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Feedback Section */}
        {!isEditMode && transaction.confidence_score && (
          <Card className="border-blue-100">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Brain className="h-5 w-5" />
                AI Categorization Info
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Confidence:</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        transaction.confidence_score >= 0.8 ? 'bg-green-500' : 
                        transaction.confidence_score >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${transaction.confidence_score * 100}%` }}
                    />
                  </div>
                  <Badge 
                    variant={transaction.confidence_score >= 0.8 ? "default" : transaction.confidence_score >= 0.6 ? "secondary" : "destructive"}
                    className="text-xs"
                  >
                    {Math.round(transaction.confidence_score * 100)}%
                  </Badge>
                </div>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800 mb-2">
                  <strong>Was this categorization helpful?</strong>
                </p>
                <p className="text-xs text-blue-600 mb-3">
                  Your feedback helps improve AI suggestions for similar transactions.
                </p>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      try {
                        // Record positive feedback
                        await correctSuggestion(
                          transaction.id,
                          transaction.category,
                          transaction.confidence_score || 0.7,
                          transaction.category,
                          'User confirmed category was correct',
                          transaction.merchant,
                          Math.abs(transaction.amount),
                          transaction.description || transaction.merchant
                        );
                        toast.success('Thanks for the feedback!');
                      } catch (error) {
                        toast.error('Failed to record feedback');
                      }
                    }}
                    className="flex items-center gap-2"
                  >
                    <ThumbsUp className="h-3 w-3" />
                    Yes, correct
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditMode(true)}
                    className="flex items-center gap-2"
                  >
                    <Edit3 className="h-3 w-3" />
                    Needs correction
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Transaction Settings */}
        {isEditMode && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Transaction Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Hide from Reports</Label>
                  <p className="text-sm text-muted-foreground">Hide this transaction from spending analysis</p>
                </div>
                <Switch
                  checked={editedTransaction.isHidden || false}
                  onCheckedChange={(checked: boolean) => setEditedTransaction((prev: any) => ({ ...prev, isHidden: checked }))}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Category Change Feedback Prompt */}
        {showFeedbackPrompt && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Brain className="h-5 w-5" />
                Help Improve AI Learning
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-3">
                    <p>
                      You changed the category from <strong>{transaction.category}</strong> to <strong>{editedTransaction?.category}</strong>.
                    </p>
                    
                    <div className="bg-white/50 p-3 rounded">
                      <p className="text-sm font-medium mb-2">Help us understand:</p>
                      <p className="text-sm">
                        Was "{transaction.category}" an AI suggestion that was incorrect, 
                        or are you just updating the category for other reasons?
                      </p>
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                      Your feedback helps the AI learn and provide better suggestions for similar transactions.
                    </p>
                  </div>
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleCategoryFeedback(true)}
                  className="w-full flex items-center gap-2"
                >
                  <ThumbsDown className="h-4 w-4" />
                  Yes, AI suggestion was incorrect
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCategoryFeedback(false)}
                  className="w-full flex items-center gap-2"
                >
                  <ThumbsUp className="h-4 w-4" />
                  No, just updating for other reasons
                </Button>
                
                <div className="pt-2 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFeedbackPrompt(false)}
                    className="w-full text-xs"
                  >
                    Skip feedback (save anyway)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        {!isEditMode && (
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={() => onNavigate('split-transaction', { transaction: editedTransaction })}
              className="w-full flex items-center gap-2"
            >
              Split Transaction
            </Button>

            <Button
              variant="outline"
              onClick={() => onNavigate('create-rule', { merchant: editedTransaction.merchant })}
              className="w-full flex items-center gap-2"
            >
              Create Rule for {editedTransaction.merchant}
            </Button>

            <Separator />

            <Button
              variant="destructive"
              className="w-full flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete Transaction
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}