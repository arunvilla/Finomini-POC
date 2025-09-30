import { useState } from 'react';
import { ArrowLeft, Receipt, Calendar, DollarSign, Tag, Edit3, Share, Download, MapPin, CreditCard, Clock, CheckCircle2, AlertTriangle, Brain, Eye, FileText, Camera, Scan, Wand2, Target, Shield, Star, TrendingUp, BarChart3, Copy, Trash2, Archive } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';

interface AIReceiptDetailsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
  receipt: any;
}

interface ReceiptItem {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  unit?: string;
  category: string;
}

interface ScannedReceiptDetails {
  id: string;
  merchant: string;
  total: number;
  subtotal: number;
  tax: number;
  tip?: number;
  date: string;
  time: string;
  category: string;
  confidence: number;
  status: 'processed' | 'pending' | 'error';
  location?: string;
  address?: string;
  paymentMethod?: string;
  receiptNumber?: string;
  tags: string[];
  notes?: string;
  items: ReceiptItem[];
  fraudAlert?: {
    level: 'low' | 'medium' | 'high';
    reason: string;
    details: string;
  };
  duplicateCheck: {
    isDuplicate: boolean;
    similarTransactions: number;
    confidence: number;
  };
  spendingInsights: {
    merchantFrequency: number;
    budgetImpact: number;
    categoryAverage: number;
    unusualAmount: boolean;
  };
  aiAnalysis: {
    extractionAccuracy: number;
    processingTime: number;
    ocrConfidence: number;
    itemsDetected: number;
  };
  previewUrl?: string;
}

export default function AIReceiptDetailsScreen({ onBack, onNavigate, receipt }: AIReceiptDetailsScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  // Enhanced mock data based on the receipt prop
  const receiptDetails: ScannedReceiptDetails = {
    id: receipt?.id || '1',
    merchant: receipt?.merchant || 'Whole Foods Market',
    total: receipt?.total || 127.43,
    subtotal: 115.84,
    tax: 11.59,
    tip: 0,
    date: receipt?.date || '2024-01-15',
    time: receipt?.time || '14:32',
    category: receipt?.category || 'Groceries',
    confidence: receipt?.confidence || 98,
    status: receipt?.status || 'processed',
    location: receipt?.location || '123 Main St, NYC',
    address: '123 Main Street, New York, NY 10001',
    paymentMethod: receipt?.paymentMethod || 'Credit Card ***4532',
    receiptNumber: receipt?.receiptNumber || 'WF20240115143201',
    tags: receipt?.tags || ['organic', 'weekly-shopping'],
    notes: 'Weekly grocery shopping with organic produce',
    items: [
      { id: '1', name: 'Organic Bananas', price: 3.99, quantity: 2, unit: 'lbs', category: 'Produce' },
      { id: '2', name: 'Whole Milk (Organic)', price: 5.49, quantity: 1, unit: 'gallon', category: 'Dairy' },
      { id: '3', name: 'Free Range Eggs', price: 7.99, quantity: 1, unit: 'dozen', category: 'Dairy' },
      { id: '4', name: 'Organic Spinach', price: 4.99, quantity: 1, unit: 'bag', category: 'Produce' },
      { id: '5', name: 'Sourdough Bread', price: 6.99, quantity: 1, unit: 'loaf', category: 'Bakery' },
      { id: '6', name: 'Almond Butter', price: 12.99, quantity: 1, unit: 'jar', category: 'Pantry' },
      { id: '7', name: 'Greek Yogurt', price: 8.99, quantity: 2, unit: 'containers', category: 'Dairy' },
      { id: '8', name: 'Organic Apples', price: 6.49, quantity: 3, unit: 'lbs', category: 'Produce' }
    ],
    duplicateCheck: {
      isDuplicate: false,
      similarTransactions: 2,
      confidence: 87
    },
    spendingInsights: {
      merchantFrequency: 4,
      budgetImpact: 15,
      categoryAverage: 95.20,
      unusualAmount: false
    },
    aiAnalysis: {
      extractionAccuracy: 98,
      processingTime: 2.3,
      ocrConfidence: 96,
      itemsDetected: 8
    },
    previewUrl: '/api/receipts/1/preview'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'bg-[#eef8ee] text-[#0b733c] border-[#c8e9c8]';
      case 'pending': return 'bg-[#fef1e6] text-[#904204] border-[#f5c4a0]';
      case 'error': return 'bg-[#fbe8ea] text-[#9e1420] border-[#f1b8bd]';
      default: return 'bg-[#f7fcf7] text-[#18312d] border-[#eef8ee]';
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleDelete = () => {
    // Delete confirmation and logic
    console.log('Delete receipt:', receiptDetails.id);
  };

  const handleShare = () => {
    // Share functionality
    console.log('Share receipt:', receiptDetails.id);
  };

  const handleDownload = () => {
    // Download functionality
    console.log('Download receipt:', receiptDetails.id);
  };

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
                🧾 Receipt Details
              </h1>
              <p className="text-sm text-[#788c78]">{receiptDetails.merchant} • {receiptDetails.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={`text-xs ${getStatusColor(receiptDetails.status)}`}>
              <CheckCircle2 className="w-3 h-3 mr-1" />
              {receiptDetails.confidence}% confidence
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Receipt Header Card */}
        <Card className="border-[#eef8ee] shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0b733c] flex items-center justify-center">
                <Receipt className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#18312d]">{receiptDetails.merchant}</h3>
                <p className="text-sm text-[#788c78]">{receiptDetails.address}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleEdit} className="text-[#788c78] hover:text-[#18312d]">
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label className="text-xs text-[#788c78]">Date & Time</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-[#0b733c]" />
                  <span className="text-sm text-[#18312d]">{receiptDetails.date} at {receiptDetails.time}</span>
                </div>
              </div>
              <div>
                <Label className="text-xs text-[#788c78]">Payment Method</Label>
                <div className="flex items-center gap-2 mt-1">
                  <CreditCard className="w-4 h-4 text-[#0b733c]" />
                  <span className="text-sm text-[#18312d]">{receiptDetails.paymentMethod}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-[#0b733c]">
                ${receiptDetails.total.toFixed(2)}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-[#e6f1fc] text-[#0056ac] border-[#b0d4f7]">
                  {receiptDetails.category}
                </Badge>
                <Badge variant="secondary" className="bg-[#f5eef4] text-[#8c4a86] border-[#e0cedd]">
                  <Brain className="w-3 h-3 mr-1" />
                  AI Processed
                </Badge>
              </div>
            </div>

            {receiptDetails.receiptNumber && (
              <p className="text-xs text-[#788c78] mt-2">Receipt #{receiptDetails.receiptNumber}</p>
            )}
          </CardContent>
        </Card>

        {/* Tabs for different views */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[#f7fcf7]">
            <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
            <TabsTrigger value="items" className="text-xs">Items</TabsTrigger>
            <TabsTrigger value="insights" className="text-xs">Insights</TabsTrigger>
            <TabsTrigger value="analysis" className="text-xs">AI Analysis</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-4 mt-4">
            {/* Receipt Breakdown */}
            <Card className="border-[#eef8ee] shadow-sm">
              <CardHeader>
                <CardTitle className="text-base text-[#18312d]">Receipt Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#788c78]">Subtotal</span>
                  <span className="text-[#18312d]">${receiptDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#788c78]">Tax</span>
                  <span className="text-[#18312d]">${receiptDetails.tax.toFixed(2)}</span>
                </div>
                {receiptDetails.tip && receiptDetails.tip > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#788c78]">Tip</span>
                    <span className="text-[#18312d]">${receiptDetails.tip.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-medium text-lg text-[#0b733c]">
                  <span>Total</span>
                  <span>${receiptDetails.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Tags and Category */}
            <Card className="border-[#eef8ee] shadow-sm">
              <CardHeader>
                <CardTitle className="text-base text-[#18312d]">Tags & Category</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-[#18312d]">Category</Label>
                  {isEditing ? (
                    <Select defaultValue={receiptDetails.category}>
                      <SelectTrigger className="mt-2 bg-[#f7fcf7] border-[#eef8ee]">
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
                        {receiptDetails.category}
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div>
                  <Label className="text-[#18312d]">Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {receiptDetails.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-[#f5eef4] text-[#8c4a86] border-[#e0cedd]">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {receiptDetails.notes && (
                  <div>
                    <Label className="text-[#18312d]">Notes</Label>
                    {isEditing ? (
                      <Textarea 
                        defaultValue={receiptDetails.notes}
                        className="mt-2 bg-[#f7fcf7] border-[#eef8ee]"
                        placeholder="Add notes about this receipt..."
                      />
                    ) : (
                      <p className="text-sm text-[#788c78] mt-2">{receiptDetails.notes}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Duplicate Check & Alerts */}
            {(receiptDetails.duplicateCheck.isDuplicate || receiptDetails.fraudAlert) && (
              <div className="space-y-3">
                {receiptDetails.duplicateCheck.isDuplicate && (
                  <Card className="bg-[#fef1e6] border-[#f5c4a0] shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-[#904204]" />
                        <div>
                          <p className="font-medium text-[#904204]">Potential Duplicate</p>
                          <p className="text-sm text-[#904204]">
                            Found {receiptDetails.duplicateCheck.similarTransactions} similar transactions
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {receiptDetails.fraudAlert && (
                  <Card className="bg-[#fbe8ea] border-[#f1b8bd] shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-[#9e1420]" />
                        <div>
                          <p className="font-medium text-[#9e1420]">Security Alert</p>
                          <p className="text-sm text-[#9e1420]">{receiptDetails.fraudAlert.reason}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>

          {/* Items Tab */}
          <TabsContent value="items" className="space-y-4 mt-4">
            <Card className="border-[#eef8ee] shadow-sm">
              <CardHeader>
                <CardTitle className="text-base text-[#18312d]">
                  Itemized List ({receiptDetails.items.length} items)
                </CardTitle>
                <CardDescription className="text-[#788c78]">
                  AI extracted items with {receiptDetails.confidence}% accuracy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {receiptDetails.items.map((item, index) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-[#f7fcf7] rounded-xl border border-[#eef8ee]">
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-4 mt-4">
            <Card className="border-[#eef8ee] shadow-sm">
              <CardHeader>
                <CardTitle className="text-base text-[#18312d]">Spending Insights</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-[#f7fcf7] rounded-xl border border-[#eef8ee]">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#0056ac]" />
                    <div>
                      <p className="text-xs text-[#788c78]">Merchant Visits</p>
                      <p className="font-medium text-[#18312d]">{receiptDetails.spendingInsights.merchantFrequency}x this month</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-[#f7fcf7] rounded-xl border border-[#eef8ee]">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#0b733c]" />
                    <div>
                      <p className="text-xs text-[#788c78]">Budget Impact</p>
                      <p className="font-medium text-[#18312d]">{receiptDetails.spendingInsights.budgetImpact}%</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-[#f7fcf7] rounded-xl border border-[#eef8ee]">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[#8c4a86]" />
                    <div>
                      <p className="text-xs text-[#788c78]">Category Average</p>
                      <p className="font-medium text-[#18312d]">${receiptDetails.spendingInsights.categoryAverage.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-[#f7fcf7] rounded-xl border border-[#eef8ee]">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[#f06e06]" />
                    <div>
                      <p className="text-xs text-[#788c78]">Amount Status</p>
                      <p className="font-medium text-[#18312d]">
                        {receiptDetails.spendingInsights.unusualAmount ? 'Unusual' : 'Normal'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Analysis Tab */}
          <TabsContent value="analysis" className="space-y-4 mt-4">
            <Card className="border-[#eef8ee] shadow-sm">
              <CardHeader>
                <CardTitle className="text-base text-[#18312d]">AI Processing Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-[#f7fcf7] rounded-xl border border-[#eef8ee]">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-[#8c4a86]" />
                      <div>
                        <p className="text-xs text-[#788c78]">Extraction Accuracy</p>
                        <p className="font-medium text-[#18312d]">{receiptDetails.aiAnalysis.extractionAccuracy}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-[#f7fcf7] rounded-xl border border-[#eef8ee]">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#0056ac]" />
                      <div>
                        <p className="text-xs text-[#788c78]">Processing Time</p>
                        <p className="font-medium text-[#18312d]">{receiptDetails.aiAnalysis.processingTime}s</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-[#f7fcf7] rounded-xl border border-[#eef8ee]">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-[#0b733c]" />
                      <div>
                        <p className="text-xs text-[#788c78]">OCR Confidence</p>
                        <p className="font-medium text-[#18312d]">{receiptDetails.aiAnalysis.ocrConfidence}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-[#f7fcf7] rounded-xl border border-[#eef8ee]">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#f06e06]" />
                      <div>
                        <p className="text-xs text-[#788c78]">Items Detected</p>
                        <p className="font-medium text-[#18312d]">{receiptDetails.aiAnalysis.itemsDetected}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="space-y-4">
          {isEditing ? (
            <div className="grid grid-cols-2 gap-3">
              <Button 
                className="bg-[#18312d] hover:bg-[#1a3430] text-white"
                onClick={handleSave}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button 
                variant="outline"
                className="border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline"
                className="border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]"
                onClick={handleShare}
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button 
                variant="outline"
                className="border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}