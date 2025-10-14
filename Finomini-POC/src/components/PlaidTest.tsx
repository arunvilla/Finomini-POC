// Simple test component for Plaid integration
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AlertCircle, CheckCircle, Loader2, CreditCard } from 'lucide-react';

export const PlaidTest: React.FC = () => {
  const [testStep, setTestStep] = useState(0);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Test backend connection
  useEffect(() => {
    const testBackend = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL?.replace('/api', '')}/health`);
        if (response.ok) {
          setBackendStatus('online');
        } else {
          setBackendStatus('offline');
        }
      } catch (error) {
        setBackendStatus('offline');
      }
    };
    testBackend();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-6 w-6" />
            🏦 Plaid Integration Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Backend Status */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-3">Step 1: Backend Server Status</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Backend:</span>
              {backendStatus === 'checking' && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Checking...</span>
                </>
              )}
              {backendStatus === 'online' && (
                <>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">Online</span>
                </>
              )}
              {backendStatus === 'offline' && (
                <>
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-600">Offline</span>
                </>
              )}
            </div>
            
            {backendStatus === 'offline' && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800">
                  <strong>Backend server is not running!</strong>
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  You need to start the backend server for Plaid integration to work.
                </p>
                <div className="mt-2 text-xs">
                  <p><strong>Quick Start:</strong></p>
                  <code className="bg-yellow-100 px-1 rounded">cd backend && npm install && npm start</code>
                </div>
              </div>
            )}
          </div>

          {/* Environment Info */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-3">Step 2: Configuration</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Plaid Client ID:</span>
                <code className="text-xs bg-gray-100 px-1 rounded">
                  {process.env.REACT_APP_PLAID_CLIENT_ID?.slice(0, 8)}...
                </code>
              </div>
              <div className="flex justify-between">
                <span>Environment:</span>
                <code className="text-xs bg-gray-100 px-1 rounded">
                  {process.env.REACT_APP_PLAID_ENV}
                </code>
              </div>
              <div className="flex justify-between">
                <span>API URL:</span>
                <code className="text-xs bg-gray-100 px-1 rounded">
                  {process.env.REACT_APP_API_BASE_URL}
                </code>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-3">Step 3: Next Actions</h3>
            <div className="space-y-3">
              {backendStatus === 'offline' ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">To enable Plaid integration:</p>
                  <ol className="text-sm space-y-1 ml-4">
                    <li>1. Start the backend server (see instructions above)</li>
                    <li>2. Refresh this page</li>
                    <li>3. Click "Test Plaid Connection" when backend is online</li>
                  </ol>
                </div>
              ) : (
                <Button
                  onClick={() => setTestStep(testStep + 1)}
                  className="w-full"
                  size="lg"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Test Plaid Connection
                </Button>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">📋 Setup Instructions</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p><strong>Backend Setup:</strong></p>
              <p>1. Open a new terminal</p>
              <p>2. Run: <code className="bg-blue-100 px-1 rounded">cd backend</code></p>
              <p>3. Run: <code className="bg-blue-100 px-1 rounded">npm install</code></p>
              <p>4. Run: <code className="bg-blue-100 px-1 rounded">npm start</code></p>
              <p>5. Backend should start on port 3001</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaidTest;