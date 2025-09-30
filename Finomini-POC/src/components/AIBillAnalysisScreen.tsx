import { useState } from 'react';
import { ArrowLeft, TrendingUp, AlertTriangle, DollarSign, Calendar, Clock, Zap, FileText, Bell, CheckCircle2, XCircle, Eye, BarChart3, PieChart, Filter, Download, Share2, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';

interface AIBillAnalysisScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface BillAnalysis {
  id: string;
  billName: string;
  provider: string;
  currentAmount: number;
  previousAmount: number;
  changeAmount: number;
  changePercent: number;
  category: string;
  dueDate: Date;
  status: 'normal' | 'increased' | 'decreased' | 'overdue' | 'duplicate';
  confidence: number;
  insights: string[];
  recommendations: string[];
}

interface BillTrend {
  id: string;
  provider: string;
  category: string;
  avgMonthly: number;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
  last6Months: number[];
  projection: number;
}

export default function AIBillAnalysisScreen({ onBack, onNavigate }: AIBillAnalysisScreenProps) {
  const [activeTab, setActiveTab] = useState('analysis');
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [autoPayOptimization, setAutoPayOptimization] = useState(false);

  // AI Bill Analysis Data
  const billAnalyses: BillAnalysis[] = [
    {
      id: '1',
      billName: 'Electric Bill',
      provider: 'City Power & Light',
      currentAmount: 142.50,
      previousAmount: 123.00,
      changeAmount: 19.50,
      changePercent: 15.9,
      category: 'Utilities',
      dueDate: new Date(2025, 2, 15),
      status: 'increased',
      confidence: 92,
      insights: [
        'Usage increased by 18% due to recent cold weather',
        'Rate per kWh increased by 3% this month',
        'Peak hour usage was 25% higher than last month'
      ],
      recommendations: [
        'Consider adjusting thermostat by 2-3 degrees',
        'Schedule high-energy appliances during off-peak hours',
        'Check for energy-efficient upgrade rebates'
      ]
    },
    {
      id: '2',
      billName: 'Netflix Premium',
      provider: 'Netflix',
      currentAmount: 22.99,
      previousAmount: 15.99,
      changeAmount: 7.00,
      changePercent: 43.8,
      category: 'Entertainment',
      dueDate: new Date(2025, 2, 8),
      status: 'increased',
      confidence: 100,
      insights: [
        'Plan automatically upgraded to Premium',
        'Price increase went into effect last billing cycle',
        'You have 4 simultaneous streams vs previous 2'
      ],
      recommendations: [
        'Review if Premium features are being used',
        'Consider downgrading to Standard plan to save $7/month',
        'Share account with family members to maximize value'
      ]
    },
    {
      id: '3',
      billName: 'Internet Service',
      provider: 'Spectrum',
      currentAmount: 79.99,
      previousAmount: 79.99,
      changeAmount: 0,
      changePercent: 0,
      category: 'Utilities',
      dueDate: new Date(2025, 2, 12),
      status: 'normal',
      confidence: 98,
      insights: [
        'Stable pricing for 8 consecutive months',
        'Speed test shows consistent 200 Mbps performance',
        'No promotional pricing ending soon'
      ],
      recommendations: [
        'Consider negotiating for better rate after 12 months',
        'Monitor for competitor offers in your area',
        'Check if bundling services provides savings'
      ]
    },
    {
      id: '4',
      billName: 'Phone Bill (Duplicate)',
      provider: 'Verizon',
      currentAmount: 85.99,
      previousAmount: 85.99,
      changeAmount: 0,
      changePercent: 0,
      category: 'Utilities',
      dueDate: new Date(2025, 2, 10),
      status: 'duplicate',
      confidence: 87,
      insights: [
        'Detected potential duplicate charge',
        'Similar amount charged on March 3rd and March 10th',
        'May be related to billing cycle change'
      ],
      recommendations: [
        'Contact Verizon to verify billing cycle',
        'Review recent account changes or plan modifications',
        'Request refund if confirmed duplicate'
      ]
    }
  ];

  const billTrends: BillTrend[] = [
    {
      id: '1',
      provider: 'City Power & Light',
      category: 'Utilities',
      avgMonthly: 125.30,
      trend: 'up',
      trendPercent: 12.5,
      last6Months: [98, 105, 118, 132, 145, 142],
      projection: 155
    },
    {
      id: '2',
      provider: 'Water Department',
      category: 'Utilities',
      avgMonthly: 67.50,
      trend: 'stable',
      trendPercent: 2.1,
      last6Months: [65, 68, 69, 66, 67, 68],
      projection: 69
    },
    {
      id: '3',
      provider: 'Netflix',
      category: 'Entertainment',
      avgMonthly: 18.99,
      trend: 'up',
      trendPercent: 43.8,
      last6Months: [15.99, 15.99, 15.99, 15.99, 22.99, 22.99],
      projection: 22.99
    }
  ];

  const monthlyProjection = billTrends.reduce((sum, trend) => sum + trend.projection, 0);
  const previousMonthTotal = 285.50;
  const projectedIncrease = monthlyProjection - previousMonthTotal;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'increased': return 'text-red-600 bg-red-50';
      case 'decreased': return 'text-green-600 bg-green-50';
      case 'duplicate': return 'text-orange-600 bg-orange-50';
      case 'overdue': return 'text-red-600 bg-red-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'increased': return <TrendingUp className="w-4 h-4" />;
      case 'decreased': return <TrendingUp className="w-4 h-4 rotate-180" />;
      case 'duplicate': return <AlertTriangle className="w-4 h-4" />;
      case 'overdue': return <XCircle className="w-4 h-4" />;
      default: return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-green-500 rotate-180" />;
      default: return <BarChart3 className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">AI Bill Analysis</h1>
              <p className="text-sm text-muted-foreground">Smart bill monitoring and insights</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-4">
            {/* Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  Bill Analysis Summary
                </CardTitle>
                <CardDescription>AI-powered insights into your billing patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-600 mb-1">Bills Analyzed</div>
                    <div className="text-2xl font-semibold text-blue-800">{billAnalyses.length}</div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="text-sm text-red-600 mb-1">Alerts Found</div>
                    <div className="text-2xl font-semibold text-red-800">
                      {billAnalyses.filter(b => b.status !== 'normal').length}
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-600 mb-1">Next Month Projection</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold text-green-800">${monthlyProjection.toFixed(2)}</span>
                    <Badge variant={projectedIncrease > 0 ? 'destructive' : 'secondary'}>
                      {projectedIncrease > 0 ? '+' : ''}${projectedIncrease.toFixed(2)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bill Analysis Results */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bill Analysis</CardTitle>
                <CardDescription>AI insights for your latest bills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {billAnalyses.map((bill) => (
                  <div key={bill.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{bill.billName}</h4>
                          <Badge variant="outline" className={getStatusColor(bill.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(bill.status)}
                              <span className="capitalize">{bill.status}</span>
                            </div>
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{bill.provider}</p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-medium">${bill.currentAmount}</span>
                          {bill.changeAmount !== 0 && (
                            <span className={`${bill.changeAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                              {bill.changeAmount > 0 ? '+' : ''}${bill.changeAmount.toFixed(2)} 
                              ({bill.changeAmount > 0 ? '+' : ''}{bill.changePercent.toFixed(1)}%)
                            </span>
                          )}
                          <Badge variant="secondary">{bill.category}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Confidence</div>
                        <div className="text-sm font-medium">{bill.confidence}%</div>
                      </div>
                    </div>

                    {bill.insights.length > 0 && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-sm font-medium text-blue-800 mb-2">AI Insights</div>
                        <ul className="text-sm text-blue-700 space-y-1">
                          {bill.insights.map((insight, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Eye className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              <span>{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {bill.recommendations.length > 0 && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-sm font-medium text-green-800 mb-2">Recommendations</div>
                        <ul className="text-sm text-green-700 space-y-1">
                          {bill.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Zap className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {bill.dueDate.toLocaleDateString()}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-500" />
                  Bill Trends Analysis
                </CardTitle>
                <CardDescription>6-month trends and future projections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {billTrends.map((trend) => (
                  <div key={trend.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{trend.provider}</h4>
                          <Badge variant="secondary">{trend.category}</Badge>
                          <div className="flex items-center gap-1">
                            {getTrendIcon(trend.trend)}
                            <span className={`text-sm ${
                              trend.trend === 'up' ? 'text-red-600' : 
                              trend.trend === 'down' ? 'text-green-600' : 'text-blue-600'
                            }`}>
                              {trend.trend === 'up' ? '+' : trend.trend === 'down' ? '-' : ''}
                              {trend.trendPercent.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">6-Month Avg: </span>
                            <span className="font-medium">${trend.avgMonthly.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Next Month: </span>
                            <span className="font-medium">${trend.projection.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">6-Month History</div>
                      <div className="flex gap-1">
                        {trend.last6Months.map((amount, index) => {
                          const maxAmount = Math.max(...trend.last6Months);
                          const height = (amount / maxAmount) * 40;
                          return (
                            <div key={index} className="flex-1 flex flex-col items-center">
                              <div 
                                className="w-full bg-blue-200 rounded-t"
                                style={{ height: `${height}px` }}
                              ></div>
                              <div className="text-xs text-muted-foreground mt-1">
                                ${amount}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-gray-500" />
                  Bill Analysis Settings
                </CardTitle>
                <CardDescription>Configure how AI analyzes your bills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Smart Alerts</h4>
                    <p className="text-sm text-muted-foreground">Get notified of bill changes and anomalies</p>
                  </div>
                  <Switch checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-Pay Optimization</h4>
                    <p className="text-sm text-muted-foreground">Optimize payment dates for better cash flow</p>
                  </div>
                  <Switch checked={autoPayOptimization} onCheckedChange={setAutoPayOptimization} />
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Alert Thresholds</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="text-sm">Price increase alert</span>
                      <span className="text-sm font-medium">≥ 10%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="text-sm">Duplicate charge alert</span>
                      <span className="text-sm font-medium">≥ 85% confidence</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="text-sm">Usage anomaly alert</span>
                      <span className="text-sm font-medium">≥ 25% change</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Analysis Frequency</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Real-time (Recommended)
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Daily
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Weekly
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}