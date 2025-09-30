import { useState } from 'react';
import { ArrowLeft, Wifi, WifiOff, AlertCircle, RefreshCw, Settings, ExternalLink, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';

interface ManageConnectionsScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

const mockConnections = [
  {
    id: '1',
    institutionName: 'Chase Bank',
    institutionLogo: '🏦',
    status: 'connected',
    lastSync: new Date(Date.now() - 5 * 60 * 1000),
    accountCount: 2,
    accounts: ['Chase Checking', 'Chase Freedom Unlimited'],
    error: null
  },
  {
    id: '2',
    institutionName: 'Marcus by Goldman Sachs',
    institutionLogo: '💰',
    status: 'connected',
    lastSync: new Date(Date.now() - 2 * 60 * 1000),
    accountCount: 1,
    accounts: ['High Yield Savings'],
    error: null
  },
  {
    id: '3',
    institutionName: 'Fidelity',
    institutionLogo: '📈',
    status: 'needs_attention',
    lastSync: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    accountCount: 1,
    accounts: ['Fidelity 401(k)'],
    error: 'Login credentials expired'
  },
  {
    id: '4',
    institutionName: 'Wells Fargo',
    institutionLogo: '🏠',
    status: 'disconnected',
    lastSync: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    accountCount: 1,
    accounts: ['Mortgage'],
    error: 'Institution temporarily unavailable'
  }
];

export default function ManageConnectionsScreen({ onBack, onNavigate }: ManageConnectionsScreenProps) {
  const [isRefreshing, setIsRefreshing] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'needs_attention':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'disconnected':
        return <WifiOff className="h-4 w-4 text-red-500" />;
      default:
        return <Wifi className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'needs_attention':
        return 'Needs Attention';
      case 'disconnected':
        return 'Disconnected';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'needs_attention':
        return 'bg-orange-100 text-orange-800';
      case 'disconnected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRelink = async (connectionId: string) => {
    setIsRefreshing(connectionId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(null);
    // In a real app, this would initiate the Plaid Link flow
    onNavigate?.('plaid-link', { reconnection: true, connectionId });
  };

  const handleViewAccounts = (connection: any) => {
    // Navigate to a filtered view of accounts for this institution
    onNavigate?.('accounts', { institutionFilter: connection.institutionName });
  };

  const handleRemoveInstitution = (connectionId: string) => {
    // Show confirmation dialog and remove connection
    console.log('Remove connection:', connectionId);
  };

  const handlePlaidPortal = () => {
    // Open Plaid Portal in new tab
    window.open('https://my.plaid.com', '_blank');
  };

  const connectedCount = mockConnections.filter(conn => conn.status === 'connected').length;
  const needsAttentionCount = mockConnections.filter(conn => conn.status === 'needs_attention').length;
  const disconnectedCount = mockConnections.filter(conn => conn.status === 'disconnected').length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Status Bar */}
      <div className="bg-white flex flex-row items-center justify-between px-4 pt-[21px] pb-0 h-[50px]">
        <div className="text-[17px] text-black font-semibold">9:41</div>
        <div className="h-2.5 w-[124px]" />
        <div className="flex items-center gap-[7px]">
          <div className="w-[19.2px] h-[12.226px] bg-black rounded-sm" />
          <div className="w-[17.142px] h-[12.328px] bg-black rounded-sm" />
          <div className="w-[27.328px] h-[13px] border border-black rounded-[3.8px] relative">
            <div className="w-[21px] h-[9px] bg-black rounded-[2.5px] absolute left-[2px] top-[2px]" />
            <div className="w-[1.328px] h-[5px] bg-black rounded-r absolute right-0 top-[4px]" />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-center">Manage Connections</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Connection Status Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Connection Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{connectedCount}</div>
                <div className="text-sm text-gray-500">Connected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{needsAttentionCount}</div>
                <div className="text-sm text-gray-500">Need Attention</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{disconnectedCount}</div>
                <div className="text-sm text-gray-500">Disconnected</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alert for issues */}
        {(needsAttentionCount > 0 || disconnectedCount > 0) && (
          <Alert className="border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              {needsAttentionCount + disconnectedCount} connection{needsAttentionCount + disconnectedCount > 1 ? 's need' : ' needs'} your attention to keep your financial data up to date.
            </AlertDescription>
          </Alert>
        )}

        {/* Connected Institutions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Institutions</h3>
          <div className="space-y-3">
            {mockConnections.map((connection) => (
              <Card key={connection.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{connection.institutionLogo}</div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900 truncate">
                          {connection.institutionName}
                        </h4>
                        <Badge className={`text-xs ${getStatusColor(connection.status)}`}>
                          {getStatusIcon(connection.status)}
                          <span className="ml-1">{getStatusText(connection.status)}</span>
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        {connection.accountCount} account{connection.accountCount > 1 ? 's' : ''} connected
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Last sync: {formatDate(connection.lastSync)}
                      </div>
                      
                      {connection.error && (
                        <div className="text-xs text-red-600 mt-1">
                          {connection.error}
                        </div>
                      )}
                      
                      <div className="text-xs text-gray-400 mt-1">
                        Accounts: {connection.accounts.join(', ')}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-3" />

                  <div className="flex gap-2 flex-wrap">
                    {connection.status === 'needs_attention' || connection.status === 'disconnected' ? (
                      <Button 
                        size="sm" 
                        onClick={() => handleRelink(connection.id)}
                        disabled={isRefreshing === connection.id}
                        className="flex-1 min-w-0"
                      >
                        {isRefreshing === connection.id ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Reconnecting...
                          </>
                        ) : (
                          <>
                            <Wifi className="h-4 w-4 mr-2" />
                            Re-link Account
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleRelink(connection.id)}
                        disabled={isRefreshing === connection.id}
                      >
                        {isRefreshing === connection.id ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewAccounts(connection)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      View Accounts
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleRemoveInstitution(connection.id)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Plaid Portal */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Data Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Plaid Portal</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Manage your data sharing preferences directly with Plaid, including viewing connected apps and revoking access.
                </p>
                <Button 
                  variant="outline" 
                  onClick={handlePlaidPortal}
                  className="w-full"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Plaid Portal
                </Button>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Troubleshooting</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Check if your bank credentials have changed</div>
                  <div>• Ensure your accounts are still active</div>
                  <div>• Contact support if issues persist</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onNavigate?.('add-account')}
              >
                <Wifi className="h-4 w-4 mr-2" />
                Add New Account
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onNavigate?.('help-support')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}