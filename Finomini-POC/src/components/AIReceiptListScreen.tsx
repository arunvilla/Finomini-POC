import { useState } from 'react';
import { ArrowLeft, Receipt, Calendar, DollarSign, Tag, Search, Filter, Plus, Eye, Edit, Trash2, Download, Share, Camera, Clock, CheckCircle2, AlertTriangle, MapPin, FileText, Brain, Star, TrendingUp, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';

interface AIReceiptListScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface ScannedReceipt {
  id: string;
  merchant: string;
  total: number;
  date: string;
  time: string;
  category: string;
  confidence: number;
  itemCount: number;
  status: 'processed' | 'pending' | 'error';
  location?: string;
  paymentMethod?: string;
  receiptNumber?: string;
  tags: string[];
  fraudAlert?: {
    level: 'low' | 'medium' | 'high';
    reason: string;
  };
  isDuplicate?: boolean;
  previewUrl?: string;
}

export default function AIReceiptListScreen({ onBack, onNavigate }: AIReceiptListScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedReceipts, setSelectedReceipts] = useState<string[]>([]);

  // Mock data for scanned receipts
  const scannedReceipts: ScannedReceipt[] = [
    {
      id: '1',
      merchant: 'Whole Foods Market',
      total: 127.43,
      date: '2024-01-15',
      time: '14:32',
      category: 'Groceries',
      confidence: 98,
      itemCount: 15,
      status: 'processed',
      location: '123 Main St, NYC',
      paymentMethod: 'Credit Card ***4532',
      receiptNumber: 'WF20240115143201',
      tags: ['organic', 'weekly-shopping'],
      previewUrl: '/api/receipts/1/preview'
    },
    {
      id: '2',
      merchant: 'Starbucks Coffee',
      total: 8.47,
      date: '2024-01-14',
      time: '09:15',
      category: 'Dining Out',
      confidence: 95,
      itemCount: 2,
      status: 'processed',
      location: 'Times Square, NYC',
      paymentMethod: 'Mobile Payment',
      receiptNumber: 'SB202401140915',
      tags: ['coffee', 'morning'],
      previewUrl: '/api/receipts/2/preview'
    },
    {
      id: '3',
      merchant: 'Target',
      total: 234.56,
      date: '2024-01-13',
      time: '16:45',
      category: 'Shopping',
      confidence: 97,
      itemCount: 8,
      status: 'processed',
      location: 'Brooklyn, NY',
      paymentMethod: 'Debit Card ***7890',
      receiptNumber: 'TG20240113164501',
      tags: ['household', 'bulk'],
      fraudAlert: {
        level: 'medium',
        reason: 'Unusual spending pattern detected'
      },
      previewUrl: '/api/receipts/3/preview'
    },
    {
      id: '4',
      merchant: 'Shell Gas Station',
      total: 45.00,
      date: '2024-01-12',
      time: '18:20',
      category: 'Transportation',
      confidence: 92,
      itemCount: 1,
      status: 'processed',
      location: 'Highway 95, NJ',
      paymentMethod: 'Credit Card ***4532',
      receiptNumber: 'SH20240112182001',
      tags: ['fuel', 'travel'],
      previewUrl: '/api/receipts/4/preview'
    },
    {
      id: '5',
      merchant: 'CVS Pharmacy',
      total: 23.98,
      date: '2024-01-11',
      time: '11:30',
      category: 'Healthcare',
      confidence: 89,
      itemCount: 3,
      status: 'pending',
      location: 'Broadway, NYC',
      paymentMethod: 'Cash',
      receiptNumber: 'CVS20240111113001',
      tags: ['pharmacy', 'health'],
      previewUrl: '/api/receipts/5/preview'
    },
    {
      id: '6',
      merchant: 'Best Buy',
      total: 899.99,
      date: '2024-01-10',
      time: '15:10',
      category: 'Electronics',
      confidence: 94,
      itemCount: 2,
      status: 'processed',
      location: 'Manhattan, NYC',
      paymentMethod: 'Credit Card ***4532',
      receiptNumber: 'BB20240110151001',
      tags: ['electronics', 'expensive'],
      fraudAlert: {
        level: 'high',
        reason: 'High-value transaction flagged'
      },
      isDuplicate: true,
      previewUrl: '/api/receipts/6/preview'
    }
  ];

  const filteredReceipts = scannedReceipts.filter(receipt => {
    const matchesSearch = receipt.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         receipt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         receipt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'processed' && receipt.status === 'processed') ||
                         (activeFilter === 'pending' && receipt.status === 'pending') ||
                         (activeFilter === 'alerts' && (receipt.fraudAlert || receipt.isDuplicate));
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'bg-[#eef8ee] text-[#0b733c] border-[#c8e9c8]';
      case 'pending': return 'bg-[#fef1e6] text-[#904204] border-[#f5c4a0]';
      case 'error': return 'bg-[#fbe8ea] text-[#9e1420] border-[#f1b8bd]';
      default: return 'bg-[#f7fcf7] text-[#18312d] border-[#eef8ee]';
    }
  };

  const handleReceiptClick = (receipt: ScannedReceipt) => {
    onNavigate('ai-receipt-details', { receipt });
  };

  const handleScanNewReceipt = () => {
    onNavigate('ai-receipt-scanner');
  };

  const toggleReceiptSelection = (receiptId: string) => {
    setSelectedReceipts(prev => 
      prev.includes(receiptId) 
        ? prev.filter(id => id !== receiptId)
        : [...prev, receiptId]
    );
  };

  const totalSpending = filteredReceipts.reduce((sum, receipt) => sum + receipt.total, 0);
  const thisMonthReceipts = filteredReceipts.filter(receipt => 
    new Date(receipt.date).getMonth() === new Date().getMonth()
  ).length;

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
                🧾 Scanned Receipts
              </h1>
              <p className="text-sm text-[#788c78]">{filteredReceipts.length} receipts • AI processed</p>
            </div>
          </div>
          <Button 
            size="sm" 
            className="bg-[#18312d] hover:bg-[#1a3430] text-white"
            onClick={handleScanNewReceipt}
          >
            <Camera className="w-4 h-4 mr-2" />
            Scan New
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-[#eef8ee] shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#0b733c] mb-1">{filteredReceipts.length}</div>
              <div className="text-xs text-[#788c78]">Total Receipts</div>
            </CardContent>
          </Card>
          <Card className="border-[#eef8ee] shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#0056ac] mb-1">${totalSpending.toFixed(0)}</div>
              <div className="text-xs text-[#788c78]">Total Spending</div>
            </CardContent>
          </Card>
          <Card className="border-[#eef8ee] shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#8c4a86] mb-1">{thisMonthReceipts}</div>
              <div className="text-xs text-[#788c78]">This Month</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border-[#eef8ee] shadow-sm">
          <CardContent className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#788c78]" />
              <Input
                placeholder="Search by merchant, category, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#eef8ee] focus:border-[#c8e9c8]"
              />
            </div>

            <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-[#f7fcf7]">
                <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                <TabsTrigger value="processed" className="text-xs">Processed</TabsTrigger>
                <TabsTrigger value="pending" className="text-xs">Pending</TabsTrigger>
                <TabsTrigger value="alerts" className="text-xs">Alerts</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Receipts List */}
        <div className="space-y-3">
          {filteredReceipts.length === 0 ? (
            <Card className="border-[#eef8ee] shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#f7fcf7] rounded-2xl flex items-center justify-center">
                  <Receipt className="w-8 h-8 text-[#788c78]" />
                </div>
                <h3 className="font-semibold text-[#18312d] mb-2">No receipts found</h3>
                <p className="text-sm text-[#788c78] mb-4">
                  {searchQuery ? 'Try adjusting your search terms' : 'Start by scanning your first receipt'}
                </p>
                <Button 
                  className="bg-[#18312d] hover:bg-[#1a3430] text-white"
                  onClick={handleScanNewReceipt}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Scan Receipt
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredReceipts.map((receipt) => (
              <Card 
                key={receipt.id} 
                className="border-[#eef8ee] shadow-sm hover:border-[#c8e9c8] transition-colors cursor-pointer"
                onClick={() => handleReceiptClick(receipt)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 bg-[#0b733c] rounded-xl flex items-center justify-center">
                        <Receipt className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#18312d] truncate">{receipt.merchant}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-[#788c78]">{receipt.date}</span>
                          {receipt.location && (
                            <span className="text-xs text-[#788c78] flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {receipt.location.split(',')[0]}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#18312d]">${receipt.total.toFixed(2)}</div>
                      <Badge variant="secondary" className={`text-xs ${getStatusColor(receipt.status)}`}>
                        {receipt.status === 'processed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {receipt.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                        {receipt.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs bg-[#e6f1fc] text-[#0056ac] border-[#b0d4f7]">
                        {receipt.category}
                      </Badge>
                      <span className="text-xs text-[#788c78]">{receipt.itemCount} items</span>
                      <div className="flex items-center gap-1">
                        <Brain className="w-3 h-3 text-[#8c4a86]" />
                        <span className="text-xs text-[#8c4a86]">{receipt.confidence}%</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {receipt.fraudAlert && (
                        <Badge variant="destructive" className="text-xs bg-[#fbe8ea] text-[#9e1420] border-[#f1b8bd]">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {receipt.fraudAlert.level}
                        </Badge>
                      )}
                      {receipt.isDuplicate && (
                        <Badge variant="secondary" className="text-xs bg-[#fef1e6] text-[#904204] border-[#f5c4a0]">
                          Duplicate
                        </Badge>
                      )}
                    </div>
                  </div>

                  {receipt.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {receipt.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-[#f7fcf7] text-[#788c78] border-[#eef8ee]">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                      {receipt.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-[#f7fcf7] text-[#788c78] border-[#eef8ee]">
                          +{receipt.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Quick Actions */}
        {filteredReceipts.length > 0 && (
          <Card className="border-[#eef8ee] shadow-sm">
            <CardHeader>
              <CardTitle className="text-base text-[#18312d]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]"
                onClick={() => onNavigate('ai-receipt-analytics')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]"
                onClick={() => onNavigate('ai-receipt-export')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Receipts
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]"
                onClick={() => onNavigate('ai-receipt-settings')}
              >
                <FileText className="w-4 h-4 mr-2" />
                Scanner Settings
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}