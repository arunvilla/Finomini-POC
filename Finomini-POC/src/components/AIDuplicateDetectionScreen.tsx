import { useState } from 'react';
import { ArrowLeft, Copy, AlertTriangle, CheckCircle2, Eye, Trash2, Merge, X, Calendar, DollarSign, MapPin, Clock, Filter, Search, Zap, Shield, AlertCircle, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Checkbox } from './ui/checkbox';

interface AIDuplicateDetectionScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface DuplicateGroup {
  id: string;
  confidence: number;
  status: 'pending' | 'resolved' | 'ignored';
  potentialSavings: number;
  transactions: DuplicateTransaction[];
  detectionReason: string;
  lastDetected: Date;
}

interface DuplicateTransaction {
  id: string;
  date: Date;
  description: string;
  merchant: string;
  amount: number;
  account: string;
  category: string;
  status: 'posted' | 'pending';
  isOriginal?: boolean;
  similarity: number;
}

export default function AIDuplicateDetectionScreen({ onBack, onNavigate }: AIDuplicateDetectionScreenProps) {
  const [activeTab, setActiveTab] = useState('detection');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDuplicates, setSelectedDuplicates] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const duplicateGroups: DuplicateGroup[] = [
    {
      id: '1',
      confidence: 98,
      status: 'pending',
      potentialSavings: 89.99,
      detectionReason: 'Identical amount, merchant, and close dates',
      lastDetected: new Date('2024-03-15'),
      transactions: [
        {
          id: 't1',
          date: new Date('2024-03-10'),
          description: 'Amazon Purchase',
          merchant: 'Amazon.com',
          amount: -89.99,
          account: 'Chase Checking',
          category: 'Shopping',
          status: 'posted',
          isOriginal: true,
          similarity: 100
        },
        {
          id: 't2',
          date: new Date('2024-03-11'),
          description: 'Amazon.com Purchase',
          merchant: 'Amazon',
          amount: -89.99,
          account: 'Chase Checking',
          category: 'Shopping',
          status: 'posted',
          similarity: 98
        }
      ]
    },
    {
      id: '2',
      confidence: 94,
      status: 'pending',
      potentialSavings: 12.50,
      detectionReason: 'Similar merchant name and amount',
      lastDetected: new Date('2024-03-14'),
      transactions: [
        {
          id: 't3',
          date: new Date('2024-03-08'),
          description: 'Starbucks Coffee',
          merchant: 'Starbucks',
          amount: -12.50,
          account: 'Credit Card',
          category: 'Food & Drink',
          status: 'posted',
          isOriginal: true,
          similarity: 100
        },
        {
          id: 't4',
          date: new Date('2024-03-08'),
          description: 'Starbucks Store #1234',
          merchant: 'Starbucks',
          amount: -12.50,
          account: 'Credit Card',
          category: 'Food & Drink',
          status: 'posted',
          similarity: 94
        }
      ]
    },
    {
      id: '3',
      confidence: 89,
      status: 'resolved',
      potentialSavings: 0,
      detectionReason: 'Potential duplicate payment',
      lastDetected: new Date('2024-03-12'),
      transactions: [
        {
          id: 't5',
          date: new Date('2024-03-05'),
          description: 'Electric Bill Payment',
          merchant: 'PG&E',
          amount: -156.78,
          account: 'Checking',
          category: 'Utilities',
          status: 'posted',
          isOriginal: true,
          similarity: 100
        },
        {
          id: 't6',
          date: new Date('2024-03-06'),
          description: 'PG&E Bill Pay',
          merchant: 'Pacific Gas Electric',
          amount: -156.78,
          account: 'Checking',
          category: 'Utilities',
          status: 'posted',
          similarity: 89
        }
      ]
    }
  ];

  const handleScanForDuplicates = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 8;
      });
    }, 200);
  };

  const handleResolveDuplicate = (groupId: string, action: 'merge' | 'ignore' | 'delete') => {
    console.log(`Resolving duplicate group ${groupId} with action: ${action}`);
    // Implementation would handle the resolution
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-[#fff4e6] text-[#904204] border-[#fad2b2]';
      case 'resolved': return 'bg-[#eef8ee] text-[#0b733c] border-[#c8e9c8]';
      case 'ignored': return 'bg-[#f6f7f9] text-[#545e75] border-[#d6dbe6]';
      default: return 'bg-[#f6f7f9] text-[#545e75] border-[#d6dbe6]';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return 'text-[#0b733c]';
    if (confidence >= 85) return 'text-[#f06e06]';
    return 'text-[#d31b2b]';
  };

  const filteredGroups = duplicateGroups.filter(group => {
    const matchesSearch = group.transactions.some(t => 
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.merchant.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesFilter = selectedFilter === 'all' || group.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const totalPotentialSavings = duplicateGroups
    .filter(g => g.status === 'pending')
    .reduce((sum, g) => sum + g.potentialSavings, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fcf7] via-[#fafdfa] to-[#eef8ee]">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-[#eef8ee] z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBack}
              className="hover:bg-[#f7fcf7] rounded-xl"
            >
              <ArrowLeft className="w-5 h-5 text-[#18312d]" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0f9950] via-[#18312d] to-[#0b733c] flex items-center justify-center shadow-lg">
                <Copy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#18312d]">Duplicate Detection</h1>
                <p className="text-sm text-[#788c78] font-medium">AI-powered duplicate finder</p>
              </div>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-[#eef8ee] to-[#dbf0e5] text-[#0b733c] border-[#c8e9c8] px-3 py-1 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-[#0f9950] rounded-full mr-2 animate-pulse"></div>
            <span className="font-semibold">Live</span>
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/60 backdrop-blur-sm border border-[#eef8ee] rounded-2xl p-1 shadow-lg">
            <TabsTrigger 
              value="detection" 
              className="text-sm font-semibold rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0f9950] data-[state=active]:to-[#18312d] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              🔍 Detection
            </TabsTrigger>
            <TabsTrigger 
              value="duplicates" 
              className="text-sm font-semibold rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0f9950] data-[state=active]:to-[#18312d] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              📋 Duplicates
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="text-sm font-semibold rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0f9950] data-[state=active]:to-[#18312d] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              ⚙️ Settings
            </TabsTrigger>
          </TabsList>

          {/* Detection Tab */}
          <TabsContent value="detection" className="space-y-4">
            {/* Quick Scan */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/70 backdrop-blur-sm rounded-3xl">
              <CardContent className="p-6">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-[#0f9950] to-[#18312d] flex items-center justify-center shadow-xl">
                    <Target className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#18312d] mb-2">Scan for Duplicates</h3>
                    <p className="text-sm text-[#788c78] leading-relaxed">
                      AI will analyze your transactions to find potential duplicates and save you money
                    </p>
                  </div>
                  
                  {isScanning ? (
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[#0f9950] to-[#18312d] flex items-center justify-center animate-pulse">
                        <Copy className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#18312d] mb-2">Scanning Transactions...</p>
                        <Progress value={scanProgress} className="w-full h-3 [&>div]:bg-gradient-to-r [&>div]:from-[#0f9950] [&>div]:to-[#18312d] rounded-xl" />
                        <p className="text-xs text-[#788c78] mt-2">Analyzed {Math.floor(scanProgress * 15 / 100)} of 1,547 transactions</p>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      onClick={handleScanForDuplicates}
                      className="bg-gradient-to-r from-[#0f9950] to-[#18312d] hover:from-[#0e8a48] hover:to-[#1a3430] text-white font-semibold py-3 px-8 rounded-xl shadow-lg"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      🚀 Start Smart Scan
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Detection Summary */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/70 backdrop-blur-sm rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#af75aa] to-[#8c4a86] flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold">📊 Detection Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#fbe8ea] rounded-xl border border-[#f1b8bd]">
                    <div className="text-2xl font-bold text-[#d31b2b]">{duplicateGroups.filter(g => g.status === 'pending').length}</div>
                    <div className="text-sm text-[#788c78]">Pending Duplicates</div>
                  </div>
                  <div className="p-4 bg-[#eef8ee] rounded-xl border border-[#c8e9c8]">
                    <div className="text-2xl font-bold text-[#0b733c]">${totalPotentialSavings.toFixed(2)}</div>
                    <div className="text-sm text-[#788c78]">Potential Savings</div>
                  </div>
                </div>
                
                <div className="p-4 bg-[#e6f1fc] rounded-xl border border-[#b0d4f7]">
                  <div className="text-lg font-bold text-[#0056ac] mb-1">Last Scan: Today 2:30 PM</div>
                  <div className="text-sm text-[#788c78]">1,547 transactions analyzed • 3 duplicates found</div>
                </div>
              </CardContent>
            </Card>

            {/* Detection Criteria */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/70 backdrop-blur-sm rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0056ac] to-[#004589] flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold">🎯 Detection Criteria</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { criterion: 'Identical Amounts', description: 'Exact same transaction amounts' },
                  { criterion: 'Similar Merchants', description: 'Same or similar merchant names' },
                  { criterion: 'Close Dates', description: 'Transactions within 7 days' },
                  { criterion: 'Duplicate Descriptions', description: 'Nearly identical descriptions' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border border-[#eef8ee] rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-[#f7fcf7] flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-[#0f9950]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#18312d] text-sm">{item.criterion}</p>
                      <p className="text-xs text-[#788c78]">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Duplicates Tab */}
          <TabsContent value="duplicates" className="space-y-4">
            {/* Search and Filter */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/70 backdrop-blur-sm rounded-3xl">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#788c78]" />
                    <Input
                      placeholder="Search duplicates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-[#eef8ee] focus:border-[#0f9950] rounded-xl"
                    />
                  </div>
                  <Button variant="outline" size="icon" className="border-[#eef8ee] hover:border-[#0f9950] rounded-xl">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Duplicate Groups */}
            <div className="space-y-4">
              {filteredGroups.map((group) => (
                <Card key={group.id} className="border-[#eef8ee] shadow-xl bg-white/70 backdrop-blur-sm rounded-3xl">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#fbe8ea] flex items-center justify-center">
                          <Copy className="w-5 h-5 text-[#d31b2b]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-[#18312d]">Potential Duplicate</h4>
                            <span className={`text-sm font-bold ${getConfidenceColor(group.confidence)}`}>
                              {group.confidence}% match
                            </span>
                          </div>
                          <p className="text-xs text-[#788c78] mb-2">{group.detectionReason}</p>
                          <Badge className={getStatusColor(group.status)}>
                            {group.status === 'pending' && <AlertTriangle className="w-3 h-3 mr-1" />}
                            {group.status === 'resolved' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                            {group.status}
                          </Badge>
                        </div>
                      </div>
                      {group.status === 'pending' && (
                        <div className="text-right">
                          <div className="text-lg font-bold text-[#0b733c]">${group.potentialSavings.toFixed(2)}</div>
                          <div className="text-xs text-[#788c78]">potential savings</div>
                        </div>
                      )}
                    </div>

                    {/* Transaction Comparison */}
                    <div className="space-y-3">
                      {group.transactions.map((transaction, index) => (
                        <div key={transaction.id} className={`p-3 rounded-xl border ${transaction.isOriginal ? 'border-[#c8e9c8] bg-[#f7fcf7]' : 'border-[#f1b8bd] bg-[#fef9fa]'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant={transaction.isOriginal ? 'default' : 'destructive'} className="text-xs">
                                {transaction.isOriginal ? 'Original' : 'Duplicate'}
                              </Badge>
                              <span className="text-xs text-[#788c78]">{transaction.similarity}% similar</span>
                            </div>
                            <span className="font-semibold text-[#18312d]">${Math.abs(transaction.amount).toFixed(2)}</span>
                          </div>
                          <div className="text-sm">
                            <p className="font-medium text-[#18312d]">{transaction.description}</p>
                            <p className="text-xs text-[#788c78]">
                              {transaction.merchant} • {transaction.account} • {transaction.date.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {group.status === 'pending' && (
                      <div className="flex gap-2 mt-4">
                        <Button 
                          size="sm" 
                          onClick={() => handleResolveDuplicate(group.id, 'delete')}
                          className="flex-1 bg-[#d31b2b] hover:bg-[#b91c3c] text-white rounded-xl"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete Duplicate
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleResolveDuplicate(group.id, 'ignore')}
                          className="flex-1 border-[#c8e9c8] hover:bg-[#f7fcf7] rounded-xl"
                        >
                          <X className="w-3 h-3 mr-1" />
                          Ignore
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            {/* Detection Settings */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/70 backdrop-blur-sm rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0056ac] to-[#004589] flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold">⚙️ Detection Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { setting: 'Auto-scan new transactions', description: 'Automatically check for duplicates', enabled: true },
                  { setting: 'Email notifications', description: 'Get notified when duplicates are found', enabled: true },
                  { setting: 'Strict matching', description: 'Higher confidence threshold for detection', enabled: false },
                  { setting: 'Cross-account detection', description: 'Find duplicates across different accounts', enabled: true }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-[#eef8ee] rounded-xl">
                    <div className="flex-1">
                      <p className="font-semibold text-[#18312d] text-sm">{item.setting}</p>
                      <p className="text-xs text-[#788c78]">{item.description}</p>
                    </div>
                    <div className="w-12 h-6 bg-[#c8e9c8] rounded-full flex items-center px-1">
                      <div className={`w-4 h-4 rounded-full transition-transform ${item.enabled ? 'translate-x-6 bg-[#0f9950]' : 'translate-x-0 bg-white'}`}></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Exclusion Rules */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/70 backdrop-blur-sm rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#af75aa] to-[#8c4a86] flex items-center justify-center">
                    <X className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold">🚫 Exclusion Rules</span>
                </CardTitle>
                <CardDescription className="text-[#788c78] font-medium">
                  Merchants and categories to exclude from duplicate detection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { type: 'Merchant', value: 'ATM Withdrawals', reason: 'Common legitimate duplicates' },
                  { type: 'Category', value: 'Transfers', reason: 'Internal account transfers' },
                  { type: 'Amount', value: 'Under $5.00', reason: 'Small transactions often recurring' }
                ].map((rule, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-[#eef8ee] rounded-xl">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">{rule.type}</Badge>
                      <div>
                        <p className="font-medium text-[#18312d] text-sm">{rule.value}</p>
                        <p className="text-xs text-[#788c78]">{rule.reason}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 text-[#d31b2b]" />
                    </Button>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950] rounded-xl">
                  + Add Exclusion Rule
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}