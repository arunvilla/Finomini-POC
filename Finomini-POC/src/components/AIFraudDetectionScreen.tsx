import { useState } from 'react';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle2, Eye, MapPin, Clock, CreditCard, Smartphone, Brain, TrendingUp, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';

interface AIFraudDetectionScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface SecurityAlert {
  id: string;
  type: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  timestamp: Date;
  transaction?: {
    merchant: string;
    amount: number;
    location: string;
  };
  status: 'active' | 'resolved' | 'investigating';
  confidence: number;
}

interface SecurityPattern {
  id: string;
  type: string;
  description: string;
  riskLevel: 'high' | 'medium' | 'low';
  frequency: string;
  lastDetected: Date;
}

export default function AIFraudDetectionScreen({ onBack, onNavigate }: AIFraudDetectionScreenProps) {
  const [activeTab, setActiveTab] = useState('alerts');

  const securityAlerts: SecurityAlert[] = [
    {
      id: '1',
      type: 'medium',
      title: 'Unusual Location Activity',
      description: 'Credit card transaction detected 200+ miles from your usual spending area',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      transaction: {
        merchant: 'Shell Gas Station',
        amount: 45.67,
        location: 'Miami, FL'
      },
      status: 'active',
      confidence: 78
    },
    {
      id: '2',
      type: 'low',
      title: 'Off-Hours Spending',
      description: 'Transaction occurred outside your typical spending hours',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      transaction: {
        merchant: 'CVS Pharmacy',
        amount: 23.45,
        location: 'Downtown'
      },
      status: 'investigating',
      confidence: 65
    },
    {
      id: '3',
      type: 'high',
      title: 'Rapid Sequential Transactions',
      description: 'Multiple transactions within 5 minutes at different merchants',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      transaction: {
        merchant: 'Multiple Locations',
        amount: 287.92,
        location: 'Various'
      },
      status: 'resolved',
      confidence: 92
    }
  ];

  const securityPatterns: SecurityPattern[] = [
    {
      id: '1',
      type: 'Geographic Anomaly',
      description: 'Transactions in unusual locations compared to your spending patterns',
      riskLevel: 'medium',
      frequency: '2-3 times/month',
      lastDetected: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      type: 'Amount Deviation',
      description: 'Unusually large transactions compared to your typical spending',
      riskLevel: 'low',
      frequency: '1-2 times/month',
      lastDetected: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      type: 'Merchant Category Risk',
      description: 'High-risk merchant categories with elevated fraud rates',
      riskLevel: 'high',
      frequency: 'Weekly monitoring',
      lastDetected: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    }
  ];

  const protectionFeatures = [
    {
      title: 'Real-time Monitoring',
      description: 'AI analyzes every transaction as it happens',
      icon: <Activity className="w-5 h-5" />,
      status: 'active',
      coverage: '100%'
    },
    {
      title: 'Location Intelligence',
      description: 'Detects transactions in unusual geographic areas',
      icon: <MapPin className="w-5 h-5" />,
      status: 'active',
      coverage: '95%'
    },
    {
      title: 'Behavioral Analysis',
      description: 'Learns your spending patterns to detect anomalies',
      icon: <Brain className="w-5 h-5" />,
      status: 'active',
      coverage: '92%'
    },
    {
      title: 'Device Fingerprinting',
      description: 'Monitors transactions from unknown devices',
      icon: <Smartphone className="w-5 h-5" />,
      status: 'active',
      coverage: '88%'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'high': return <AlertTriangle className="w-5 h-5 text-[#9e1420]" />;
      case 'medium': return <Eye className="w-5 h-5 text-[#f06e06]" />;
      case 'low': return <CheckCircle2 className="w-5 h-5 text-[#0056ac]" />;
      default: return <Shield className="w-5 h-5 text-[#0b733c]" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'high': return 'bg-[#fbe8ea] border-[#f1b8bd]';
      case 'medium': return 'bg-[#fef1e6] border-[#f5c4a0]';
      case 'low': return 'bg-[#e6f1fc] border-[#b0d4f7]';
      default: return 'bg-[#f7fcf7] border-[#eef8ee]';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-[#9e1420] bg-[#fbe8ea] border-[#f1b8bd]';
      case 'medium': return 'text-[#904204] bg-[#fef1e6] border-[#f5c4a0]';
      case 'low': return 'text-[#0b733c] bg-[#eef8ee] border-[#c8e9c8]';
      default: return 'text-[#788c78] bg-[#f7fcf7] border-[#eef8ee]';
    }
  };

  const handleResolveAlert = (alertId: string) => {
    // Handle alert resolution
    console.log('Resolving alert:', alertId);
  };

  const handleFalsePositive = (alertId: string) => {
    // Mark as false positive
    console.log('Marking as false positive:', alertId);
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
                🛡️ AI Fraud Detection
              </h1>
              <p className="text-sm text-[#788c78]">Advanced security monitoring</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
            Protected
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Security Status */}
        <Card className="border-[#eef8ee] shadow-sm bg-[#f7fcf7]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#0b733c] rounded-2xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#18312d]">Security Status</h3>
                  <p className="text-sm text-[#788c78]">Real-time protection active</p>
                </div>
              </div>
              <Badge className="bg-[#0b733c] text-white hover:bg-[#0f9950]">Excellent</Badge>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#788c78]">Protection Level</span>
                <span className="font-medium text-[#18312d]">94%</span>
              </div>
              <Progress value={94} className="h-3 bg-[#eef8ee]" />
              <p className="text-xs text-[#0b733c]">
                ✓ All security features active • Last scan: 2 minutes ago
              </p>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#f7fcf7]">
            <TabsTrigger value="alerts" className="text-xs">Alerts</TabsTrigger>
            <TabsTrigger value="patterns" className="text-xs">Patterns</TabsTrigger>
            <TabsTrigger value="protection" className="text-xs">Protection</TabsTrigger>
          </TabsList>

          {/* Security Alerts Tab */}
          <TabsContent value="alerts" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#18312d]">Recent Security Alerts</h3>
              <Badge variant="outline" className="bg-[#fef1e6] text-[#904204] border-[#f5c4a0]">
                {securityAlerts.filter(a => a.status === 'active').length} active
              </Badge>
            </div>

            <div className="space-y-3">
              {securityAlerts.map((alert) => (
                <Card key={alert.id} className={`${getAlertColor(alert.type)} shadow-sm`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <h4 className="font-medium">{alert.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {alert.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground mb-1">Confidence</div>
                        <div className="text-sm font-medium">{alert.confidence}%</div>
                      </div>
                    </div>

                    {alert.transaction && (
                      <div className="bg-white/50 rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{alert.transaction.merchant}</span>
                          </div>
                          <span className="font-medium">${alert.transaction.amount.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {alert.transaction.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {alert.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={alert.status === 'active' ? 'destructive' : 
                                alert.status === 'investigating' ? 'secondary' : 'default'}
                        className="text-xs"
                      >
                        {alert.status}
                      </Badge>
                      
                      {alert.status === 'active' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]"
                            onClick={() => handleFalsePositive(alert.id)}
                          >
                            False Positive
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-[#18312d] hover:bg-[#1a3430] text-white"
                            onClick={() => handleResolveAlert(alert.id)}
                          >
                            Resolve
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Security Patterns Tab */}
          <TabsContent value="patterns" className="space-y-4 mt-4">
            <div>
              <h3 className="font-semibold text-[#18312d] mb-3">AI-Detected Patterns</h3>
              <p className="text-sm text-[#788c78] mb-4">
                Behavioral patterns and risk factors identified by our AI
              </p>
            </div>

            <div className="space-y-3">
              {securityPatterns.map((pattern) => (
                <Card key={pattern.id} className="border-[#eef8ee] shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-[#18312d]">{pattern.type}</h4>
                        <p className="text-sm text-[#788c78] mt-1">
                          {pattern.description}
                        </p>
                      </div>
                      <Badge className={getRiskColor(pattern.riskLevel)}>
                        {pattern.riskLevel} risk
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-[#788c78]">Frequency:</span>
                        <p className="font-medium text-[#18312d]">{pattern.frequency}</p>
                      </div>
                      <div>
                        <span className="text-[#788c78]">Last Detected:</span>
                        <p className="font-medium text-[#18312d]">
                          {pattern.lastDetected.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Protection Features Tab */}
          <TabsContent value="protection" className="space-y-4 mt-4">
            <div>
              <h3 className="font-semibold text-[#18312d] mb-3">Active Protection Features</h3>
              <p className="text-sm text-[#788c78] mb-4">
                AI-powered security systems protecting your accounts
              </p>
            </div>

            <div className="space-y-3">
              {protectionFeatures.map((feature, index) => (
                <Card key={index} className="border-[#eef8ee] shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-[#e6f1fc] rounded-xl text-[#0056ac]">
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#18312d]">{feature.title}</h4>
                          <p className="text-sm text-[#788c78] mt-1">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-2 bg-[#eef8ee] text-[#0b733c] border-[#c8e9c8]">
                          {feature.status}
                        </Badge>
                        <p className="text-sm font-medium text-[#0b733c]">
                          {feature.coverage}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Security Recommendations */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Security Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <p className="text-sm">Enable transaction alerts for amounts over $100</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <p className="text-sm">Set up location-based transaction blocking</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <p className="text-sm">Review and update spending patterns monthly</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}