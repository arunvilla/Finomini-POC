import { useState, useRef } from 'react';
import { ArrowLeft, Camera, Upload, FileText, CheckCircle2, Loader2, Scan, Brain, DollarSign, Calendar, MapPin, Tag, Edit3, Sparkles, BarChart3, TrendingUp, AlertTriangle, Eye, Zap, Shield, Search, Clock, AlertCircle, Star, Wand2, ImageIcon, CreditCard, Receipt, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';

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
  const [currentStage, setCurrentStage] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Enhanced mock scanned receipt data with AI insights
  const mockScanResult: ScannedReceiptData = {
    merchant: "Whole Foods Market",
    amount: 87.45,
    date: "2024-01-15",
    time: "14:32",
    address: "2025 Market St, San Francisco, CA",
    items: [
      { name: "Organic Bananas", price: 3.99, category: "Produce", quantity: 2, unit: "lbs" },
      { name: "Greek Yogurt", price: 5.49, category: "Dairy", quantity: 1, unit: "container" },
      { name: "Chicken Breast", price: 12.99, category: "Meat", quantity: 1.2, unit: "lbs" },
      { name: "Olive Oil", price: 8.99, category: "Pantry", quantity: 1, unit: "bottle" },
      { name: "Avocados", price: 4.99, category: "Produce", quantity: 3, unit: "pieces" },
      { name: "Sourdough Bread", price: 3.49, category: "Bakery", quantity: 1, unit: "loaf" }
    ],
    tax: 7.86,
    total: 87.45,
    confidence: 96,
    suggestedCategory: "Groceries",
    suggestedTags: ["healthy", "organic", "weekly shopping", "whole foods"],
    paymentMethod: "Credit Card ending in 4242",
    receiptNumber: "RC-2024-0115-4532",
    duplicateCheck: {
      isDuplicate: false,
      similarTransactions: 2,
      confidence: 85
    },
    fraudAlert: {
      level: 'low',
      reasons: []
    },
    spendingInsights: {
      merchantFrequency: 8,
      categoryTrend: 'increasing',
      budgetImpact: 12.5
    }
  };

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
    setScanState('scanning');
    setScanProgress(0);
    setProcessingStages(processingStagesTemplate.map(stage => ({ ...stage })));
    
    // Simulate advanced AI processing with realistic timing
    const stageDurations = [800, 1200, 1500, 1000, 800, 600, 700];
    let totalProgress = 0;
    
    for (let i = 0; i < processingStagesTemplate.length; i++) {
      setCurrentStage(i);
      
      // Update current stage to processing
      setProcessingStages(prev => prev.map((stage, index) => 
        index === i ? { ...stage, status: 'processing' } : stage
      ));
      
      // Simulate processing time with progress updates
      const duration = stageDurations[i];
      const steps = 20;
      const stepDuration = duration / steps;
      
      for (let step = 0; step < steps; step++) {
        await new Promise(resolve => setTimeout(resolve, stepDuration));
        totalProgress = ((i * steps + step + 1) / (processingStagesTemplate.length * steps)) * 100;
        setScanProgress(totalProgress);
      }
      
      // Mark stage as completed
      setProcessingStages(prev => prev.map((stage, index) => 
        index === i ? { ...stage, status: 'completed' } : stage
      ));
    }
    
    // Complete scanning
    setScannedData(mockScanResult);
    setScanState('scanned');
    toast.success('Receipt processed successfully!');
  };

  const handleSaveTransaction = () => {
    // Save the transaction and navigate to receipt list
    console.log('Saving transaction:', scannedData);
    toast.success('Receipt saved successfully!');
    onNavigate('ai-receipt-list');
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
                    Advanced neural networks processing your receipt
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-[#788c78] mb-2">
                      <span>Progress</span>
                      <span>{Math.round(scanProgress)}%</span>
                    </div>
                    <Progress 
                      value={scanProgress} 
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
              {processingStages.map((stage, index) => (
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