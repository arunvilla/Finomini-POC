// AI Service Test Component - Use this to verify AI features are working

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Brain, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { AIService } from '../services/ai/AIService';
import { useAIFeedback } from '../hooks/useAIFeedback';
import { toast } from 'sonner';

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error';
  message: string;
  data?: any;
}

export default function AITestComponent() {
  const [tests, setTests] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [serviceStatus, setServiceStatus] = useState<any>(null);
  
  const { getImprovedSuggestion, recordFeedback, getLearningAnalytics } = useAIFeedback();

  useEffect(() => {
    // Initialize and get service status
    initializeService();
  }, []);

  const initializeService = async () => {
    try {
      const aiService = AIService.getInstance();
      await aiService.initialize();
      const status = aiService.getStatus();
      setServiceStatus(status);
    } catch (error) {
      console.error('Failed to initialize AI service:', error);
    }
  };

  const updateTest = (name: string, status: 'pending' | 'success' | 'error', message: string, data?: any) => {
    setTests(prev => {
      const existing = prev.find(t => t.name === name);
      const newTest = { name, status, message, data };
      
      if (existing) {
        return prev.map(t => t.name === name ? newTest : t);
      } else {
        return [...prev, newTest];
      }
    });
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTests([]);

    // Test 1: Service Initialization
    updateTest('Service Initialization', 'pending', 'Checking AI service status...');
    try {
      const aiService = AIService.getInstance();
      const status = aiService.getStatus();
      
      if (status.isInitialized && status.hasAPIKey) {
        updateTest('Service Initialization', 'success', `Initialized with ${status.preferredProvider} provider`, status);
      } else {
        updateTest('Service Initialization', 'error', 'Service not properly configured');
      }
    } catch (error) {
      updateTest('Service Initialization', 'error', `Initialization failed: ${error}`);
    }

    // Test 2: Basic Categorization
    updateTest('Basic Categorization', 'pending', 'Testing transaction categorization...');
    try {
      const aiService = AIService.getInstance();
      const result = await aiService.categorizeTransaction(
        "Starbucks Coffee Shop",
        15.50,
        undefined,
        "Starbucks"
      );
      
      if (result.category && result.confidence > 0) {
        updateTest('Basic Categorization', 'success', 
          `Categorized as "${result.category}" with ${Math.round(result.confidence * 100)}% confidence`, 
          result
        );
      } else {
        updateTest('Basic Categorization', 'error', 'Invalid categorization result');
      }
    } catch (error) {
      updateTest('Basic Categorization', 'error', `Categorization failed: ${error}`);
    }

    // Test 3: Learning System
    updateTest('Learning System', 'pending', 'Testing feedback and learning...');
    try {
      const suggestion = await getImprovedSuggestion(
        "McDonald's Restaurant",
        "McDonald's",
        12.99
      );
      
      if (suggestion.category) {
        updateTest('Learning System', 'success', 
          `Learning suggestion: "${suggestion.category}" (${suggestion.source})`, 
          suggestion
        );
      } else {
        updateTest('Learning System', 'error', 'No learning suggestion received');
      }
    } catch (error) {
      updateTest('Learning System', 'error', `Learning system failed: ${error}`);
    }

    // Test 4: Feedback Recording
    updateTest('Feedback Recording', 'pending', 'Testing feedback recording...');
    try {
      await recordFeedback({
        transaction_id: `test-${Date.now()}`,
        suggested_category: "Dining Out",
        suggested_confidence: 0.85,
        user_selected_category: "Dining Out",
        feedback_type: "accepted",
        merchant: "Test Merchant",
        amount: 15.50,
        description: "Test transaction"
      });
      
      updateTest('Feedback Recording', 'success', 'Feedback recorded successfully');
    } catch (error) {
      updateTest('Feedback Recording', 'error', `Feedback recording failed: ${error}`);
    }

    // Test 5: Analytics
    updateTest('Analytics', 'pending', 'Testing learning analytics...');
    try {
      const analytics = await getLearningAnalytics();
      
      updateTest('Analytics', 'success', 
        `Analytics loaded: ${analytics.total_suggestions} total suggestions, ${Math.round(analytics.accuracy_rate * 100)}% accuracy`,
        analytics
      );
    } catch (error) {
      updateTest('Analytics', 'error', `Analytics failed: ${error}`);
    }

    setIsRunning(false);
    toast.success('AI tests completed!');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'border-green-200 bg-green-50';
      case 'error': return 'border-red-200 bg-red-50';
      case 'pending': return 'border-yellow-200 bg-yellow-50';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-blue-600" />
              AI Service Test Suite
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Use this component to test and verify that all AI features are working correctly.
            </p>
            
            <Button 
              onClick={runAllTests} 
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              {isRunning ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Running Tests...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4" />
                  Run All Tests
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Service Status */}
        {serviceStatus && (
          <Card>
            <CardHeader>
              <CardTitle>Service Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Provider</p>
                  <Badge variant="outline">{serviceStatus.preferredProvider}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium">Initialized</p>
                  <Badge variant={serviceStatus.isInitialized ? "default" : "destructive"}>
                    {serviceStatus.isInitialized ? "Yes" : "No"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium">Has API Key</p>
                  <Badge variant={serviceStatus.hasAPIKey ? "default" : "destructive"}>
                    {serviceStatus.hasAPIKey ? "Yes" : "No"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium">Model</p>
                  <Badge variant="outline">
                    {serviceStatus.preferredProvider === 'anthropic' 
                      ? serviceStatus.anthropicModel 
                      : serviceStatus.openaiModel
                    }
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Test Results */}
        {tests.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tests.map((test, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${getStatusColor(test.status)}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(test.status)}
                      <h3 className="font-semibold">{test.name}</h3>
                      <Badge variant="outline" className="ml-auto">
                        {test.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {test.message}
                    </p>
                    
                    {test.data && (
                      <details className="mt-2">
                        <summary className="text-xs text-muted-foreground cursor-pointer">
                          View Details
                        </summary>
                        <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                          {JSON.stringify(test.data, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Setup Instructions:</strong>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Create a <code>.env</code> file with your Anthropic API key</li>
              <li>Add: <code>VITE_ANTHROPIC_API_KEY=your_api_key_here</code></li>
              <li>Restart your development server</li>
              <li>Click "Run All Tests" to verify everything works</li>
            </ol>
          </AlertDescription>
        </Alert>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant="outline" 
              onClick={() => window.open('/bulk-categorization', '_blank')}
              className="w-full"
            >
              Open Bulk Categorization Screen
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.open('/ai-learning-analytics', '_blank')}
              className="w-full"
            >
              Open Learning Analytics Dashboard
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.open('/add-manual-transaction', '_blank')}
              className="w-full"
            >
              Test AI in Transaction Form
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}