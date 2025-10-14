// Plaid Account Manager component for managing connected bank accounts

import React, { useState } from 'react';
import { usePlaidLinkHook } from '../hooks/usePlaidLink';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  RefreshCw, 
  Trash2, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Building2,
  CreditCard,
  Loader2
} from 'lucide-react';
import { formatDateTime } from '../utils';
import PlaidLinkButton from './PlaidLinkButton';

interface PlaidAccountManagerProps {
  onAccountConnected?: () => void;
  onAccountDisconnected?: () => void;
  onSyncComplete?: () => void;
  className?: string;
}

export const PlaidAccountManager: React.FC<PlaidAccountManagerProps> = ({
  onAccountConnected,
  onAccountDisconnected,
  onSyncComplete,
  className,
}) => {
  const {
    error,
    isLoading,
    isConnected,
    connectedInstitutions,
    syncData,
    disconnectAccount,
  } = usePlaidLinkHook();

  const [syncingTokens, setSyncingTokens] = useState<Set<string>>(new Set());
  const [disconnectingTokens, setDisconnectingTokens] = useState<Set<string>>(new Set());

  // Handle sync for a specific account
  const handleSync = async (accessToken: string) => {
    try {
      setSyncingTokens(prev => new Set(prev).add(accessToken));
      await syncData(accessToken);
      onSyncComplete?.();
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setSyncingTokens(prev => {
        const newSet = new Set(prev);
        newSet.delete(accessToken);
        return newSet;
      });
    }
  };

  // Handle sync for all accounts
  const handleSyncAll = async () => {
    try {
      await syncData();
      onSyncComplete?.();
    } catch (error) {
      console.error('Sync all failed:', error);
    }
  };

  // Handle account disconnection
  const handleDisconnect = async (accessToken: string) => {
    if (!confirm('Are you sure you want to disconnect this account? This will remove all associated data.')) {
      return;
    }

    try {
      setDisconnectingTokens(prev => new Set(prev).add(accessToken));
      await disconnectAccount(accessToken);
      onAccountDisconnected?.();
    } catch (error) {
      console.error('Disconnect failed:', error);
    } finally {
      setDisconnectingTokens(prev => {
        const newSet = new Set(prev);
        newSet.delete(accessToken);
        return newSet;
      });
    }
  };

  const getConnectionStatus = (lastSynced?: Date) => {
    if (!lastSynced) {
      return { status: 'never', color: 'secondary', text: 'Never synced' };
    }

    const now = new Date();
    const diffHours = (now.getTime() - lastSynced.getTime()) / (1000 * 60 * 60);

    if (diffHours < 1) {
      return { status: 'recent', color: 'default', text: 'Recently synced' };
    } else if (diffHours < 24) {
      return { status: 'today', color: 'secondary', text: 'Synced today' };
    } else if (diffHours < 168) { // 7 days
      return { status: 'week', color: 'outline', text: 'Synced this week' };
    } else {
      return { status: 'old', color: 'destructive', text: 'Needs sync' };
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Connected Accounts</h2>
          <p className="text-gray-600">
            Manage your connected bank accounts and sync financial data
          </p>
        </div>
        
        {isConnected && (
          <Button
            onClick={handleSyncAll}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Sync All
          </Button>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error.message}
            {error.recoverable && (
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Connect New Account */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Add Bank Account
          </CardTitle>
          <CardDescription>
            Connect your bank account to automatically sync transactions and account balances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PlaidLinkButton
            onSuccess={onAccountConnected}
            variant="default"
            size="lg"
          />
        </CardContent>
      </Card>

      {/* Connected Accounts List */}
      {isConnected && connectedInstitutions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Connected Institutions ({connectedInstitutions.length})
          </h3>
          
          <div className="grid gap-4">
            {connectedInstitutions.map((institution) => {
              const connectionStatus = getConnectionStatus(institution.lastSynced);
              const isSyncing = syncingTokens.has(institution.accessToken);
              const isDisconnecting = disconnectingTokens.has(institution.accessToken);
              
              return (
                <Card key={institution.accessToken} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Building2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {institution.institutionName}
                          </CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Clock className="mr-1 h-3 w-3" />
                            {institution.lastSynced 
                              ? `Last synced: ${formatDateTime(institution.lastSynced)}`
                              : 'Never synced'
                            }
                          </CardDescription>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant={connectionStatus.color as any}>
                          {connectionStatus.status === 'recent' && <CheckCircle className="mr-1 h-3 w-3" />}
                          {connectionStatus.status === 'old' && <AlertCircle className="mr-1 h-3 w-3" />}
                          {connectionStatus.text}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Token: {institution.accessToken.slice(-8)}...
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleSync(institution.accessToken)}
                          disabled={isSyncing || isDisconnecting}
                          variant="outline"
                          size="sm"
                        >
                          {isSyncing ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <RefreshCw className="mr-2 h-4 w-4" />
                          )}
                          Sync
                        </Button>
                        
                        <Button
                          onClick={() => handleDisconnect(institution.accessToken)}
                          disabled={isSyncing || isDisconnecting}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          {isDisconnecting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="mr-2 h-4 w-4" />
                          )}
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* No Accounts Connected */}
      {!isConnected && (
        <Card className="text-center py-8">
          <CardContent>
            <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Accounts Connected</h3>
            <p className="text-gray-600 mb-4">
              Connect your first bank account to start tracking your finances automatically
            </p>
            <PlaidLinkButton
              onSuccess={onAccountConnected}
              variant="default"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PlaidAccountManager;