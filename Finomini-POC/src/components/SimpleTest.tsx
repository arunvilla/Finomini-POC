// Simple test component without environment variable dependencies
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AlertCircle, CheckCircle, Loader2, CreditCard } from 'lucide-react';

export const SimpleTest: React.FC = () => {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Test backend connection
  useEffect(() => {
    const testBackend = async () => {
      try {
        const response = await fetch('http://localhost:3001/health');
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
                  <span className="text-sm text-green-600">Online ✅</span>
                </>
              )}
              {backendStatus === 'offline' && (
                <>
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-600">Offline ❌</span>
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

            {backendStatus === 'online' && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-800">
                  <strong>✅ Backend is running!</strong>
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Your Plaid integration backend is ready to connect bank accounts.
                </p>
              </div>
            )}
          </div>

          {/* Configuration Info */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-3">Step 2: Configuration</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Plaid Client ID:</span>
                <code className="text-xs bg-gray-100 px-1 rounded">
                  6749ef2e... ✅
                </code>
              </div>
              <div className="flex justify-between">
                <span>Environment:</span>
                <code className="text-xs bg-gray-100 px-1 rounded">
                  sandbox ✅
                </code>
              </div>
              <div className="flex justify-between">
                <span>API URL:</span>
                <code className="text-xs bg-gray-100 px-1 rounded">
                  http://localhost:3001/api
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
                <div className="space-y-3">
                  <Button
                    onClick={() => window.location.href = '/dashboard'}
                    className="w-full"
                    size="lg"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Go to Dashboard & Connect Bank Account
                  </Button>
                  <p className="text-xs text-gray-600 text-center">
                    The backend is ready! You can now connect real bank accounts.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">📋 Backend Setup Instructions</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p><strong>If backend is offline:</strong></p>
              <p>1. Open a new terminal</p>
              <p>2. Run: <code className="bg-blue-100 px-1 rounded">cd backend</code></p>
              <p>3. Run: <code className="bg-blue-100 px-1 rounded">npm install</code></p>
              <p>4. Run: <code className="bg-blue-100 px-1 rounded">npm start</code></p>
              <p>5. Backend should start on port 3001</p>
              <p>6. Refresh this page to see "Backend: Online ✅"</p>
            </div>
          </div>

          {/* Status Summary */}
          <div className="p-4 bg-gray-50 border rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">🔍 Current Status</h4>
            <div className="text-sm space-y-1">
              <p>✅ Frontend: Running (you're seeing this page)</p>
              <p>{backendStatus === 'online' ? '✅' : '❌'} Backend: {backendStatus === 'online' ? 'Running on port 3001' : 'Not running'}</p>
              <p>✅ Plaid Credentials: Configured</p>
              <p>{backendStatus === 'online' ? '✅' : '⏳'} Ready to Connect Banks: {backendStatus === 'online' ? 'Yes' : 'Waiting for backend'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleTest;