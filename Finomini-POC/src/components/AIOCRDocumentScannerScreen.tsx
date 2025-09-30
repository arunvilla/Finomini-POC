import { useState } from 'react';
import { ArrowLeft, Camera, FileText, Upload, Scan, CheckCircle2, AlertCircle, Clock, Eye, Download, Trash2, Search, Filter, Calendar, FileImage, FileCheck, Zap, Brain, Star, Shield, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';

interface AIOCRDocumentScannerScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface ScannedDocument {
  id: string;
  name: string;
  type: 'invoice' | 'statement' | 'contract' | 'tax_document' | 'receipt' | 'other';
  scanDate: Date;
  status: 'processing' | 'completed' | 'error';
  confidence: number;
  extractedData: {
    text: string;
    amounts?: number[];
    dates?: Date[];
    entities?: string[];
    tables?: any[];
  };
  originalImage: string;
  pages: number;
  size: string;
}

export default function AIOCRDocumentScannerScreen({ onBack, onNavigate }: AIOCRDocumentScannerScreenProps) {
  const [activeTab, setActiveTab] = useState('scanner');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const scannedDocuments: ScannedDocument[] = [
    {
      id: '1',
      name: 'Bank Statement - Chase March 2024',
      type: 'statement',
      scanDate: new Date('2024-03-15'),
      status: 'completed',
      confidence: 96,
      extractedData: {
        text: 'Chase Bank Statement for March 2024...',
        amounts: [2450.00, -1200.00, -350.00],
        dates: [new Date('2024-03-01'), new Date('2024-03-15')],
        entities: ['Chase Bank', 'Account #1234']
      },
      originalImage: 'statement1.jpg',
      pages: 3,
      size: '2.4 MB'
    },
    {
      id: '2',
      name: 'Tax Document - W2 Form',
      type: 'tax_document',
      scanDate: new Date('2024-03-10'),
      status: 'completed',
      confidence: 98,
      extractedData: {
        text: 'W-2 Wage and Tax Statement...',
        amounts: [65000.00, 8500.00],
        dates: [new Date('2023-12-31')],
        entities: ['Employer Inc.', 'EIN: 12-3456789']
      },
      originalImage: 'w2.jpg',
      pages: 1,
      size: '1.2 MB'
    },
    {
      id: '3',
      name: 'Utility Invoice - Electric Bill',
      type: 'invoice',
      scanDate: new Date('2024-03-12'),
      status: 'processing',
      confidence: 0,
      extractedData: {
        text: '',
        amounts: [],
        dates: [],
        entities: []
      },
      originalImage: 'electric.jpg',
      pages: 2,
      size: '1.8 MB'
    }
  ];

  const handleScanDocument = () => {
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
        return prev + 10;
      });
    }, 300);
  };

  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case 'invoice': return <FileText className="w-5 h-5" />;
      case 'statement': return <FileCheck className="w-5 h-5" />;
      case 'contract': return <FileText className="w-5 h-5" />;
      case 'tax_document': return <FileImage className="w-5 h-5" />;
      case 'receipt': return <FileText className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-[#eef8ee] text-[#0b733c] border-[#c8e9c8]';
      case 'processing': return 'bg-[#fff4e6] text-[#904204] border-[#fad2b2]';
      case 'error': return 'bg-[#fbe8ea] text-[#9e1420] border-[#f1b8bd]';
      default: return 'bg-[#f6f7f9] text-[#545e75] border-[#d6dbe6]';
    }
  };

  const filteredDocuments = scannedDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || doc.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

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
                <Scan className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#18312d]">AI Document Scanner</h1>
                <p className="text-sm text-[#788c78] font-medium">Smart OCR & data extraction</p>
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
              value="scanner" 
              className="text-sm font-semibold rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0f9950] data-[state=active]:to-[#18312d] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              📷 Scanner
            </TabsTrigger>
            <TabsTrigger 
              value="documents" 
              className="text-sm font-semibold rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0f9950] data-[state=active]:to-[#18312d] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              📄 Documents
            </TabsTrigger>
            <TabsTrigger 
              value="insights" 
              className="text-sm font-semibold rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0f9950] data-[state=active]:to-[#18312d] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              🔍 Insights
            </TabsTrigger>
          </TabsList>

          {/* Scanner Tab */}
          <TabsContent value="scanner" className="space-y-4">
            {/* Scan Action */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/70 backdrop-blur-sm rounded-3xl">
              <CardContent className="p-6">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-[#0f9950] to-[#18312d] flex items-center justify-center shadow-xl">
                    <Camera className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#18312d] mb-2">Scan Any Document</h3>
                    <p className="text-sm text-[#788c78] leading-relaxed">
                      Use AI-powered OCR to extract text, amounts, dates, and entities from any document
                    </p>
                  </div>
                  
                  {isScanning ? (
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[#0f9950] to-[#18312d] flex items-center justify-center animate-pulse">
                        <Scan className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#18312d] mb-2">Processing Document...</p>
                        <Progress value={scanProgress} className="w-full h-3 [&>div]:bg-gradient-to-r [&>div]:from-[#0f9950] [&>div]:to-[#18312d] rounded-xl" />
                        <p className="text-xs text-[#788c78] mt-2">{scanProgress}% complete</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        onClick={handleScanDocument}
                        className="bg-gradient-to-r from-[#0f9950] to-[#18312d] hover:from-[#0e8a48] hover:to-[#1a3430] text-white font-semibold py-3 rounded-xl shadow-lg"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        📷 Camera
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950] py-3 rounded-xl"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        📁 Upload
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Supported Document Types */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/70 backdrop-blur-sm rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#af75aa] to-[#8c4a86] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold">📋 Supported Documents</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { type: 'Bank Statements', icon: '🏦', accuracy: '98%' },
                    { type: 'Tax Documents', icon: '📊', accuracy: '96%' },
                    { type: 'Invoices', icon: '📄', accuracy: '94%' },
                    { type: 'Contracts', icon: '📝', accuracy: '92%' }
                  ].map((docType, index) => (
                    <div key={index} className="p-3 border border-[#eef8ee] rounded-xl hover:border-[#c8e9c8] transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl">{docType.icon}</span>
                        <Badge className="bg-[#eef8ee] text-[#0b733c] border-[#c8e9c8] text-xs">{docType.accuracy}</Badge>
                      </div>
                      <p className="text-sm font-semibold text-[#18312d]">{docType.type}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Features */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/70 backdrop-blur-sm rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0056ac] to-[#004589] flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold">🤖 AI Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { feature: 'Smart Text Extraction', description: 'Extract all text with high accuracy' },
                  { feature: 'Amount Detection', description: 'Automatically identify monetary values' },
                  { feature: 'Date Recognition', description: 'Parse and format dates intelligently' },
                  { feature: 'Entity Extraction', description: 'Identify companies, people, and accounts' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border border-[#eef8ee] rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-[#f7fcf7] flex items-center justify-center mt-0.5">
                      <Sparkles className="w-4 h-4 text-[#0f9950]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#18312d] text-sm">{item.feature}</p>
                      <p className="text-xs text-[#788c78]">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
            {/* Search and Filter */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/70 backdrop-blur-sm rounded-3xl">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#788c78]" />
                    <Input
                      placeholder="Search documents..."
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

            {/* Documents List */}
            <div className="space-y-3">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="border-[#eef8ee] shadow-xl bg-white/70 backdrop-blur-sm rounded-3xl">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#f7fcf7] flex items-center justify-center">
                          {getDocumentTypeIcon(doc.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#18312d] text-sm">{doc.name}</h4>
                          <p className="text-xs text-[#788c78]">{doc.scanDate.toLocaleDateString()} • {doc.pages} pages • {doc.size}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status === 'completed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {doc.status === 'processing' && <Clock className="w-3 h-3 mr-1" />}
                        {doc.status === 'error' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {doc.status}
                      </Badge>
                    </div>
                    
                    {doc.status === 'completed' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-[#788c78]">Extraction Confidence</span>
                          <span className="text-xs font-semibold text-[#0f9950]">{doc.confidence}%</span>
                        </div>
                        <Progress value={doc.confidence} className="w-full h-2 [&>div]:bg-gradient-to-r [&>div]:from-[#0f9950] [&>div]:to-[#18312d] rounded-xl" />
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 border-[#c8e9c8] hover:bg-[#f7fcf7] rounded-xl">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 border-[#c8e9c8] hover:bg-[#f7fcf7] rounded-xl">
                            <Download className="w-3 h-3 mr-1" />
                            Export
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {doc.status === 'processing' && (
                      <div className="mt-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-4 h-4 border-2 border-[#f06e06] border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-xs text-[#904204]">Processing document...</span>
                        </div>
                        <Progress value={65} className="w-full h-2 [&>div]:bg-gradient-to-r [&>div]:from-[#f06e06] [&>div]:to-[#904204] rounded-xl" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-4">
            {/* Extraction Statistics */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/70 backdrop-blur-sm rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#af75aa] to-[#8c4a86] flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold">📊 Extraction Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-[#eef8ee] rounded-xl border border-[#c8e9c8]">
                    <div className="text-2xl font-bold text-[#0b733c]">24</div>
                    <div className="text-sm text-[#788c78]">Documents Scanned</div>
                  </div>
                  <div className="p-3 bg-[#e6f1fc] rounded-xl border border-[#b0d4f7]">
                    <div className="text-2xl font-bold text-[#0056ac]">96%</div>
                    <div className="text-sm text-[#788c78]">Avg Accuracy</div>
                  </div>
                </div>
                
                <div className="p-3 bg-[#f5eef4] rounded-xl border border-[#e0c9de]">
                  <div className="text-lg font-bold text-[#8c4a86] mb-1">$45,280</div>
                  <div className="text-sm text-[#788c78]">Total Amounts Extracted</div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Extractions */}
            <Card className="border-[#eef8ee] shadow-xl bg-white/70 backdrop-blur-sm rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#18312d]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0b733c] to-[#18312d] flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold">🕒 Recent Extractions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { type: 'Bank Statement', amount: '$2,450.00', confidence: 98 },
                  { type: 'Tax Document', amount: '$65,000.00', confidence: 96 },
                  { type: 'Invoice', amount: '$1,250.00', confidence: 94 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-[#eef8ee] rounded-xl">
                    <div>
                      <p className="font-semibold text-[#18312d] text-sm">{item.type}</p>
                      <p className="text-xs text-[#788c78]">{item.amount} extracted</p>
                    </div>
                    <Badge className="bg-[#eef8ee] text-[#0b733c] border-[#c8e9c8]">{item.confidence}%</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}