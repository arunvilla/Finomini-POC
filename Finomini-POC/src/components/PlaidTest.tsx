// Simple test component for Plaid integration
import React from 'react';
import { usePlaidLinkHook } from '../hooks/usePlaidLink';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export const PlaidTest: React.FC = () => {
  const {
    open,
    ready,
    error,
    isLoading,
    isConnected,
    connectedInstitutions,
  } = usePlaidLinkHook();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🏦 Plaid Integration Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status Display */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Ready:</span>
              {ready ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              <span className="text-sm">{ready ? 'Yes' : 'Loading...'}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Connected:</span>
              {isConnected ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-gray-400" />
              )}
              <span className="text-sm">{isConnected ? 'Yes' : 'No'}</span>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                <span className="text-sm text-red-800">{error.message}</span>
              </div>
            </div>
          )}

          {/* Connect Button */}
          <Button
            onClick={open}
            disabled={!ready || isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="mr-2 h-4 w-4" />
            )}
            {isConnected ? 'Add Another Account' : 'Connect Bank Account'}
          </Button>

          {/* Connected Accounts */}
          {connectedInstitutions.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Connected Accounts:</h3>
              {connectedInstitutions.map((institution, index) => (
                <div
                  key={index}
                  className="p-2 bg-green-50 border border-green-200 rounded-md"
                >
                  <div className="text-sm font-medium">{institution.institutionName}</div>
                  {institution.lastSynced && (
                    <div className="text-xs text-gray-600">
                      Last synced: {institution.lastSynced.toLocaleString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Debug Info */}
          <details className="text-xs">
            <summary className="cursor-pointer text-gray-600">Debug Info</summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
              {JSON.stringify({
                ready,
                isLoading,
                isConnected,
                hasError: !!error,
                connectedCount: connectedInstitutions.length,
                apiBaseUrl: process.env.REACT_APP_API_BASE_URL,
                plaidEnv: process.env.REACT_APP_PLAID_ENV,
              }, null, 2)}
            </pre>
          </details>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaidTest;