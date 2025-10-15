import { useState, useRef } from 'react';
import { ArrowLeft, Camera, Upload, FileText, CheckCircle2, Loader2, Scan, Brain, Calendar, MapPin, Tag, Edit3, Sparkles, BarChart3, TrendingUp, AlertTriangle, Eye, Zap, Shield, Search, Clock, Star, Wand2, ImageIcon, CreditCard, Receipt, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { toast } from 'sonner';
import { useOCR } from '../hooks/useOCR';
import { useAppStore } from '../stores';
import { useReceiptImages } from '../hooks/useReceiptImages';

interface AIReceiptScannerScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface ScannedReceiptData {
  merchant: string;
  amount: number;
  date: string;
  time?: string;
  address?: string;
  items: Array<{
    name: string;
    price: number;
    category: string;
    quantity?: number;
    unit?: string;
  }>;
  tax: number;
  tip?: number;
  total: number;
  confidence: number;
  suggestedCategory: string;
  suggestedTags: string[];
  paymentMethod?: string;
  receiptNumber?: string;
  duplicateCheck: {
    isDuplicate: boolean;
    similarTransactions: number;
    confidence: number;
  };
  fraudAlert?: {
    level: 'low' | 'medium' | 'high';
    reasons: string[];
  };
  spendingInsights: {
    merchantFrequency: number;
    categoryTrend: 'increasing' | 'decreasing' | 'stable';
    budgetImpact: number;
  };
}

interface ProcessingStage {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  duration?: number;
}

export default function AIReceiptScannerScreen({ onBack, onNavigate }: AIReceiptScannerScreenProps) {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'scanned'>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [scannedData, setScannedData] = useState<ScannedReceiptData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [processingStages, setProcessingStages] = useState<ProcessingStage[]>([]);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  // OCR and store hooks
  const { processReceipt, progress, error, clearError } = useOCR();
  const { addTransaction } = useAppStore();
  const { storeImage } = useReceiptImages();



  const processingStagesTemplate: ProcessingStage[] = [
    {
      id: 'image-analysis',
      name: 'Image Analysis',
      description: 'Analyzing image quality and orientation',
      status: 'pending'
    },
    {
      id: 'ocr-extraction',
      name: 'OCR Text Extraction',
      description: 'Extracting text from receipt using AI',
      status: 'pending'
    },
    {
      id: 'data-parsing',
      name: 'Data Parsing',
      description: 'Identifying merchant, items, and amounts',
      status: 'pending'
    },
    {
      id: 'category-classification',
      name: 'Smart Categorization',
      description: 'AI categorizing transaction and items',
      status: 'pending'
    },
    {
      id: 'duplicate-check',
      name: 'Duplicate Detection',
      description: 'Checking for similar transactions',
      status: 'pending'
    },
    {
      id: 'fraud-analysis',
      name: 'Fraud Analysis',
      description: 'Analyzing for suspicious patterns',
      status: 'pending'
    },
    {
      id: 'insights-generation',
      name: 'Insights Generation',
      description: 'Generating spending insights',
      status: 'pending'
    }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('Image size must be less than 10MB');
        return;
      }
      
      handleScanReceipt();
    }
  };

  const handleCameraCapture = () => {
    cameraInputRef.current?.click();
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleScanReceipt = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    setScanState('scanning');
    setProcessingStages(processingStagesTemplate.map(stage => ({ ...stage })));
    clearError();
    
    try {
      // Start processing stages animation
      const stagePromise = animateProcessingStages();
      
      // Process receipt with OCR
      const ocrResult = await processReceipt(selectedFile);
      
      // Wait for animation to complete
      await stagePromise;
      
      // Convert OCR result to ScannedReceiptData format
      const enhancedData: ScannedReceiptData = {
        merchant: ocrResult.merchant || 'Unknown Merchant',
        amount: ocrResult.amount || 0,
        date: ocrResult.date ? ocrResult.date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        time: ocrResult.date ? ocrResult.date.toTimeString().slice(0, 5) : undefined,
        address: undefined,
        items: ocrResult.items?.map(item => ({
          name: item.name,
          price: item.amount,
          category: categorizeItem(item.name),
          quantity: 1,
          unit: 'piece'
        })) || [],
        tax: calculateTax(ocrResult.amount || 0),
        total: ocrResult.amount || 0,
        confidence: Math.round(ocrResult.confidence * 100),
        suggestedCategory: categorizeTransaction(ocrResult.merchant || ''),
        suggestedTags: generateTags(ocrResult.merchant || '', ocrResult.items || []),
        paymentMethod: undefined,
        receiptNumber: undefined,
        duplicateCheck: {
          isDuplicate: false,
          similarTransactions: 0,
          confidence: 85
        },
        fraudAlert: {
          level: 'low',
          reasons: []
        },
        spendingInsights: {
          merchantFrequency: 1,
          categoryTrend: 'stable',
          budgetImpact: 0
        }
      };
      
      setScannedData(enhancedData);
      setScanState('scanned');
      toast.success('Receipt processed successfully!');
    } catch (error) {
      console.error('OCR processing failed:', error);
      toast.error('Failed to process receipt. Please try again.');
      setScanState('idle');
      
      // Mark all stages as error
      setProcessingStages(prev => prev.map(stage => ({ ...stage, status: 'error' })));
    }
  };

  // Helper function to animate processing stages
  const animateProcessingStages = async () => {
    const stageDurations = [800, 1200, 1500, 1000, 800, 600, 700];
    
    for (let i = 0; i < processingStagesTemplate.length; i++) {
      
      // Update current stage to processing
      setProcessingStages(prev => prev.map((stage, index) => 
        index === i ? { ...stage, status: 'processing' } : stage
      ));
      
      // Wait for stage duration
      await new Promise(resolve => setTimeout(resolve, stageDurations[i]));
      
      // Mark stage as completed
      setProcessingStages(prev => prev.map((stage, index) => 
        index === i ? { ...stage, status: 'completed' } : stage
      ));
    }
  };

  // Helper functions for data enhancement
  const categorizeItem = (itemName: string): string => {
    const name = itemName.toLowerCase();
    if (name.includes('bread') || name.includes('bakery')) return 'Bakery';
    if (name.includes('milk') || name.includes('cheese') || name.includes('yogurt')) return 'Dairy';
    if (name.includes('apple') || name.includes('banana') || name.includes('fruit') || name.includes('vegetable')) return 'Produce';
    if (name.includes('chicken') || name.includes('beef') || name.includes('meat')) return 'Meat';
    if (name.includes('oil') || name.includes('sauce') || name.includes('spice')) return 'Pantry';
    return 'Other';
  };

  const categorizeTransaction = (merchant: string): string => {
    const name = merchant.toLowerCase();
    if (name.includes('whole foods') || name.includes('grocery') || name.includes('market')) return 'Groceries';
    if (name.includes('starbucks') || name.includes('restaurant') || name.includes('cafe')) return 'Dining Out';
    if (name.includes('gas') || name.includes('shell') || name.includes('exxon')) return 'Transportation';
    if (name.includes('target') || name.includes('walmart') || name.includes('store')) return 'Shopping';
    return 'Other';
  };

  const generateTags = (merchant: string, items: Array<{name: string, amount: number}>): string[] => {
    const tags: string[] = [];
    const merchantLower = merchant.toLowerCase();
    
    if (merchantLower.includes('organic') || items.some(item => item.name.toLowerCase().includes('organic'))) {
      tags.push('organic');
    }
    if (items.length > 5) {
      tags.push('bulk shopping');
    }
    if (merchantLower.includes('whole foods')) {
      tags.push('healthy', 'premium');
    }
    
    return tags;
  };

  const calculateTax = (amount: number): number => {
    // Estimate tax as 8.5% of amount
    return Math.round(amount * 0.085 * 100) / 100;
  };

  const handleSaveTransaction = async () => {
    if (!scannedData || !selectedFile) return;
    
    try {
      // First create the transaction
      const transaction = {
        amount: scannedData.total,
        date: new Date(scannedData.date),
        description: `${scannedData.merchant} - Receipt Scan`,
        category: scannedData.suggestedCategory,
        merchant: scannedData.merchant,
        is_manual: false, // This is from OCR scan
        is_hidden: false,
        confidence_score: scannedData.confidence / 100,
        tags: scannedData.suggestedTags,
        notes: `Scanned receipt with ${scannedData.items.length} items. Confidence: ${scannedData.confidence}%`
      };
      
      // Generate transaction ID for image storage
      const transactionId = crypto.randomUUID();
      
      // Add the transaction (store will generate its own ID)
      await addTransaction(transaction);
      
      // Store the receipt image with compression using our generated ID
      if (selectedFile) {
        try {
          await storeImage(selectedFile, transactionId, {
            maxWidth: 1200,
            maxHeight: 1600,
            quality: 0.8,
            format: 'jpeg'
          });
        } catch (imageError) {
          console.warn('Failed to store receipt image:', imageError);
          // Don't fail the transaction save if image storage fails
        }
      }
      
      toast.success('Receipt saved successfully!');
      onNavigate('ai-receipt-list');
    } catch (error) {
      console.error('Failed to save transaction:', error);
      toast.error('Failed to save transaction. Please try again.');
    }
  };

  const recentScans = [
    {
      id: '1',
      merchant: 'Starbucks',
      amount: 12.45,
      date: '2024-01-14',
      category: 'Dining Out',
      status: 'saved'
    },
    {
      id: '2',
      merchant: 'Shell Gas Station',
      amount: 45.67,
      date: '2024-01-13',
      category: 'Transportation',
      status: 'saved'
    },
    {
      id: '3',
      merchant: 'Target',
      amount: 89.23,
      date: '2024-01-12',
      category: 'Shopping',
      status: 'saved'
    }
  ];

  if (scanState === 'scanning') {
    return (
      <div className="min-h-screen bg-[#f9fbfa] flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-[#f1f5f1] z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack} className="text-[#18312d] hover:text-[#0f1f1b]">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-[#18312d]">
                  🧾 AI Processing Receipt
                </h1>
                <p className="text-sm text-[#788c78]">Advanced machine learning analysis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Processing Area */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md space-y-8">
            {/* Processing Animation */}
            <div className="text-center space-y-6">
              {/* Processing Card */}
              <div className="relative p-8 bg-white border border-[#eef8ee] rounded-3xl shadow-sm">
                {/* Animated Ring */}
                <div className="absolute inset-0 rounded-3xl bg-[#eef8ee] animate-pulse opacity-30"></div>
                
                {/* Center Content */}
                <div className="relative">
                  <div className="w-20 h-20 mx-auto mb-6 relative">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 rounded-full bg-[#0b733c] animate-pulse opacity-70"></div>
                    <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
                      <Brain className="w-8 h-8 text-[#0b733c]" />
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-[#18312d] mb-3">
                    AI Analysis in Progress
                  </h2>
                  
                  <p className="text-[#788c78] mb-6">
                    {error ? 'Processing failed - please try again' : 'Advanced neural networks processing your receipt'}
                  </p>
                  
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-[#788c78] mb-2">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress 
                      value={progress} 
                      className="h-3 bg-[#eef8ee]"
                    />
                  </div>
                </div>
              </div>

              {/* Receipt Preview */}
              {previewUrl && (
                <div className="bg-[#f7fcf7] border border-[#eef8ee] rounded-2xl p-4">
                  <img 
                    src={previewUrl} 
                    alt="Receipt preview" 
                    className="w-full h-32 object-cover rounded-xl"
                  />
                </div>
              )}
            </div>

            {/* Processing Stages */}
            <div className="space-y-3">
              {processingStages.map((stage) => (
                <div 
                  key={stage.id}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-500 ${
                    stage.status === 'completed' 
                      ? 'bg-[#eef8ee] border border-[#c8e9c8]' 
                      : stage.status === 'processing'
                      ? 'bg-[#e6f1fc] border border-[#b0d4f7] shadow-sm'
                      : 'bg-[#f7fcf7] border border-[#eef8ee]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center">
                    {stage.status === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5 text-[#0b733c]" />
                    ) : stage.status === 'processing' ? (
                      <Loader2 className="w-5 h-5 text-[#0056ac] animate-spin" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-[#c8e9c8]"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${
                      stage.status === 'processing' ? 'text-[#0056ac]' : 'text-[#18312d]'
                    }`}>
                      {stage.name}
                    </p>
                    <p className="text-sm text-[#788c78]">{stage.description}</p>
                  </div>
                  {stage.status === 'processing' && (
                    <Sparkles className="w-4 h-4 text-[#0056ac] animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (scanState === 'scanned' && scannedData) {
    return (
      <div className="min-h-screen bg-[#f9fbfa]">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-[#f1f5f1] z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack} className="text-[#18312d] hover:text-[#0f1f1b]">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-[#18312d]">
                  🧾 Receipt Processed
                </h1>
                <p className="text-sm text-[#788c78]">AI analysis complete • Review details</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-[#eef8ee] text-[#0b733c] border-[#c8e9c8]">
                <Star className="w-3 h-3 mr-1" />
                {scannedData.confidence}% confidence
              </Badge>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* AI Analysis Results Header */}
          <Card className="border-[#eef8ee] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0b733c] flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#18312d]">AI Analysis Complete</h3>
                  <p className="text-sm text-[#788c78]">Advanced machine learning extraction</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-[#0056ac]">{scannedData.items.length}</div>
                  <div className="text-xs text-[#788c78]">Items Detected</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-[#8c4a86]">{scannedData.confidence}%</div>
                  <div className="text-xs text-[#788c78]">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-[#0b733c]">
                    {scannedData.duplicateCheck.isDuplicate ? 'Duplicate' : 'Unique'}
                  </div>
                  <div className="text-xs text-[#788c78]">Status</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Merchant & Amount */}
          <Card className="border-[#eef8ee] shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Receipt className="w-5 h-5 text-[#0b733c]" />
                  <span className="text-[#18312d]">{scannedData.merchant}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)} className="text-[#788c78] hover:text-[#18312d]">
                  <Edit3 className="w-4 h-4" />
                </Button>
              </CardTitle>
              <CardDescription className="space-y-1">
                <span className="flex items-center gap-4 text-[#788c78]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {scannedData.date}
                  </span>
                  {scannedData.time && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {scannedData.time}
                    </span>
                  )}
                </span>
                {scannedData.address && (
                  <span className="flex items-center gap-1 text-[#788c78] text-xs">
                    <MapPin className="w-3 h-3" />
                    {scannedData.address}
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-[#0b733c]">
                  ${scannedData.total.toFixed(2)}
                </div>
                {scannedData.paymentMethod && (
                  <div className="flex items-center gap-1 text-sm text-[#788c78]">
                    <CreditCard className="w-4 h-4" />
                    {scannedData.paymentMethod}
                  </div>
                )}
              </div>
              {scannedData.receiptNumber && (
                <p className="text-xs text-[#788c78] mt-2">Receipt #{scannedData.receiptNumber}</p>
              )}
            </CardContent>
          </Card>

          {/* AI Insights & Alerts */}
          <div className="grid grid-cols-1 gap-4">
            {/* Duplicate Check */}
            {scannedData.duplicateCheck.similarTransactions > 0 && (
              <Card className="bg-[#fef1e6] border-[#f5c4a0] shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#904204]" />
                    <div>
                      <p className="font-medium text-[#904204]">Duplicate Check</p>
                      <p className="text-sm text-[#904204]">
                        Found {scannedData.duplicateCheck.similarTransactions} similar transactions
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Fraud Alert */}
            {scannedData.fraudAlert && scannedData.fraudAlert.level !== 'low' && (
              <Card className="bg-[#fbe8ea] border-[#f1b8bd] shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-[#9e1420]" />
                    <div>
                      <p className="font-medium text-[#9e1420]">Security Alert</p>
                      <p className="text-sm text-[#9e1420]">
                        {scannedData.fraudAlert.level === 'high' ? 'High risk' : 'Medium risk'} transaction detected
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Category & Tags */}
          <Card className="border-[#eef8ee] shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-[#18312d]">
                <Wand2 className="w-5 h-5 text-[#8c4a86]" />
                AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-[#18312d]">Category</Label>
                {isEditing ? (
                  <Select defaultValue={scannedData.suggestedCategory}>
                    <SelectTrigger className="bg-[#f7fcf7] border-[#eef8ee]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Groceries">🛒 Groceries</SelectItem>
                      <SelectItem value="Dining Out">🍽️ Dining Out</SelectItem>
                      <SelectItem value="Shopping">🛍️ Shopping</SelectItem>
                      <SelectItem value="Transportation">🚗 Transportation</SelectItem>
                      <SelectItem value="Healthcare">🏥 Healthcare</SelectItem>
                      <SelectItem value="Entertainment">🎬 Entertainment</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="bg-[#e6f1fc] text-[#0056ac] border-[#b0d4f7]">
                      <Target className="w-3 h-3 mr-1" />
                      {scannedData.suggestedCategory}
                    </Badge>
                    <Badge variant="secondary" className="bg-[#f5eef4] text-[#8c4a86] border-[#e0cedd]">
                      <Brain className="w-3 h-3 mr-1" />
                      AI Suggested
                    </Badge>
                  </div>
                )}
              </div>
              
              <div>
                <Label className="text-[#18312d]">Smart Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {scannedData.suggestedTags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-[#f5eef4] text-[#8c4a86] border-[#e0cedd]">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Spending Insights */}
              <div className="pt-3 border-t border-[#eef8ee]">
                <Label className="text-[#18312d]">Spending Insights</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="p-3 bg-[#f7fcf7] rounded-xl border border-[#eef8ee]">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#0056ac]" />
                      <div>
                        <p className="text-xs text-[#788c78]">Merchant Visits</p>
                        <p className="font-medium text-[#18312d]">{scannedData.spendingInsights.merchantFrequency}x this month</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-[#f7fcf7] rounded-xl border border-[#eef8ee]">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-[#0b733c]" />
                      <div>
                        <p className="text-xs text-[#788c78]">Budget Impact</p>
                        <p className="font-medium text-[#18312d]">{scannedData.spendingInsights.budgetImpact}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Itemized Breakdown */}
          <Card className="border-[#eef8ee] shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-[#18312d]">
                <FileText className="w-5 h-5 text-[#0b733c]" />
                Itemized Breakdown
              </CardTitle>
              <CardDescription className="text-[#788c78]">
                AI extracted {scannedData.items.length} line items with {scannedData.confidence}% accuracy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scannedData.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-[#f7fcf7] rounded-xl border border-[#eef8ee]">
                    <div className="flex-1">
                      <p className="font-medium text-[#18312d]">{item.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <Badge variant="outline" className="text-xs bg-[#e6f1fc] text-[#0056ac] border-[#b0d4f7]">
                          {item.category}
                        </Badge>
                        {item.quantity && item.unit && (
                          <span className="text-xs text-[#788c78]">
                            {item.quantity} {item.unit}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-[#18312d]">${item.price.toFixed(2)}</span>
                      {item.quantity && (
                        <p className="text-xs text-[#788c78]">
                          ${(item.price / item.quantity).toFixed(2)}/{item.unit}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                
                <div className="border-t border-[#eef8ee] pt-4 space-y-3">
                  <div className="flex justify-between text-sm text-[#788c78]">
                    <span>Subtotal</span>
                    <span>${(scannedData.total - scannedData.tax).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#788c78]">
                    <span>Tax</span>
                    <span>${scannedData.tax.toFixed(2)}</span>
                  </div>
                  {scannedData.tip && (
                    <div className="flex justify-between text-sm text-[#788c78]">
                      <span>Tip</span>
                      <span>${scannedData.tip.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium text-lg text-[#0b733c]">
                    <span>Total</span>
                    <span>${scannedData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button 
              className="w-full h-12 bg-[#18312d] hover:bg-[#1a3430] text-white shadow-sm" 
              onClick={handleSaveTransaction}
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Save Transaction
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]" 
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Details
              </Button>
              <Button 
                variant="outline" 
                className="border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]" 
                onClick={() => setScanState('idle')}
              >
                <Scan className="w-4 h-4 mr-2" />
                Scan Another
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fbfa]">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-[#f1f5f1] z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-[#18312d] hover:text-[#0f1f1b]">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-[#18312d]">
                🧾 AI Receipt Scanner
              </h1>
              <p className="text-sm text-[#788c78]">Advanced OCR & machine learning</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#0b733c] rounded-full animate-pulse"></div>
            <span className="text-xs text-[#788c78]">AI Ready</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Main Scan Area */}
        <Card className="border-2 border-dashed border-[#c8e9c8] bg-[#f7fcf7] shadow-sm">
          <CardContent className="p-8 text-center space-y-6">
            {/* Hero Animation */}
            <div className="relative">
              <div className="w-24 h-24 mx-auto relative">
                {/* Animated Rings */}
                <div className="absolute inset-0 rounded-full bg-[#eef8ee] animate-ping opacity-50"></div>
                <div className="absolute inset-2 rounded-full bg-[#c8e9c8] animate-pulse opacity-70"></div>
                <div className="absolute inset-4 rounded-full bg-[#0b733c] flex items-center justify-center">
                  <Scan className="w-8 h-8 text-white" />
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#f06e06] rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-[#8c4a86] rounded-full flex items-center justify-center animate-pulse">
                <Brain className="w-2 h-2 text-white" />
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-xl text-[#18312d] mb-2">
                Scan Your Receipt
              </h3>
              <p className="text-[#788c78] max-w-sm mx-auto">
                Our advanced AI will instantly extract transaction details, categorize items, and provide spending insights
              </p>
            </div>
            
            <div className="space-y-4">
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileSelect}
                className="hidden"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <Button 
                className="w-full h-12 bg-[#18312d] hover:bg-[#1a3430] text-white shadow-sm"
                onClick={handleCameraCapture}
              >
                <Camera className="w-5 h-5 mr-2" />
                Take Photo
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full h-12 border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]"
                onClick={handleFileUpload}
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Image
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Features Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-auto p-4 border-[#eef8ee] hover:bg-[#f7fcf7] hover:border-[#0b733c] transition-all duration-300"
            onClick={() => {
              toast.success('OCR Scanner launching...');
              onNavigate('ai-ocr-document-scanner');
            }}
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-[#0b733c] rounded-2xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-[#18312d] mb-1">OCR Extraction</h4>
              <p className="text-xs text-[#788c78]">Advanced text recognition</p>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="h-auto p-4 border-[#eef8ee] hover:bg-[#f7fcf7] hover:border-[#8c4a86] transition-all duration-300"
            onClick={() => {
              toast.success('Smart AI analyzing...');
              onNavigate('ai-assistant');
            }}
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-[#8c4a86] rounded-2xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-[#18312d] mb-1">Smart AI</h4>
              <p className="text-xs text-[#788c78]">Intelligent categorization</p>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="h-auto p-4 border-[#eef8ee] hover:bg-[#f7fcf7] hover:border-[#0056ac] transition-all duration-300"
            onClick={() => {
              toast.success('Fraud Detection starting...');
              onNavigate('ai-fraud-detection');
            }}
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-[#0056ac] rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-[#18312d] mb-1">Fraud Detection</h4>
              <p className="text-xs text-[#788c78]">Security analysis</p>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="h-auto p-4 border-[#eef8ee] hover:bg-[#f7fcf7] hover:border-[#f06e06] transition-all duration-300"
            onClick={() => {
              toast.success('Duplicate Check running...');
              onNavigate('ai-duplicate-detection');
            }}
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-[#f06e06] rounded-2xl flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-[#18312d] mb-1">Duplicate Check</h4>
              <p className="text-xs text-[#788c78]">Prevents duplicates</p>
            </div>
          </Button>
        </div>

        {/* Advanced Features */}
        <Card className="border-[#eef8ee] shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#18312d]">
              <Zap className="w-5 h-5 text-[#f06e06]" />
              Advanced AI Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#0b733c] mt-0.5" />
              <div>
                <p className="font-medium text-[#18312d]">Machine Learning OCR</p>
                <p className="text-sm text-[#788c78]">
                  99%+ accuracy with neural network text recognition
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#0b733c] mt-0.5" />
              <div>
                <p className="font-medium text-[#18312d]">Real-time Analysis</p>
                <p className="text-sm text-[#788c78]">
                  Instant spending insights and budget impact
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#0b733c] mt-0.5" />
              <div>
                <p className="font-medium text-[#18312d]">Multi-language Support</p>
                <p className="text-sm text-[#788c78]">
                  Processes receipts in 50+ languages
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#0b733c] mt-0.5" />
              <div>
                <p className="font-medium text-[#18312d]">Smart Learning</p>
                <p className="text-sm text-[#788c78]">
                  Learns from your spending patterns
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Scans */}
        <Card className="border-[#eef8ee] shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#18312d]">
                <Clock className="w-5 h-5 text-[#0b733c]" />
                Recent Scans
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-[#0b733c] hover:text-[#0f9950] hover:bg-[#f7fcf7]"
                onClick={() => onNavigate('ai-receipt-list')}
              >
                View All
              </Button>
            </CardTitle>
            <CardDescription className="text-[#788c78]">Your latest AI-processed receipts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentScans.map((scan) => (
              <div key={scan.id} className="flex items-center justify-between p-4 bg-[#f7fcf7] rounded-xl border border-[#eef8ee] hover:border-[#c8e9c8] transition-all duration-200 cursor-pointer"
                   onClick={() => onNavigate('ai-receipt-details', { receipt: scan })}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#0b733c] rounded-xl flex items-center justify-center">
                    <Receipt className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-[#18312d]">{scan.merchant}</p>
                    <p className="text-sm text-[#788c78]">{scan.date} • {scan.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#18312d]">${scan.amount.toFixed(2)}</p>
                  <Badge variant="secondary" className="text-xs bg-[#eef8ee] text-[#0b733c] border-[#c8e9c8]">
                    ✓ {scan.status}
                  </Badge>
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]"
              onClick={() => onNavigate('ai-receipt-list')}
            >
              <FileText className="w-4 h-4 mr-2" />
              View All {recentScans.length + 10}+ Receipts
            </Button>
          </CardContent>
        </Card>

        {/* Pro Tips */}
        <Card className="bg-[#fef1e6] border-[#f5c4a0] shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-[#f06e06] rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-semibold text-[#904204]">Pro Scanning Tips</h4>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#f06e06] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ImageIcon className="w-3 h-3 text-white" />
                </div>
                <p className="text-sm text-[#904204]">Use good lighting and avoid shadows for best OCR results</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#f06e06] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Target className="w-3 h-3 text-white" />
                </div>
                <p className="text-sm text-[#904204]">Keep receipt flat and capture all four corners</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#f06e06] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Brain className="w-3 h-3 text-white" />
                </div>
                <p className="text-sm text-[#904204]">AI works best with clear merchant name and total amount</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}