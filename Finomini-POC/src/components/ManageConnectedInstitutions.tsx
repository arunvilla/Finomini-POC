import { useState } from 'react';
import { ArrowLeft, Plus, RefreshCw, Wifi, WifiOff, AlertCircle, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import type { Institution } from '../types';

interface ManageConnectedInstitutionsProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

// Mock connected institutions data
const mockInstitutions: Institution[] = [
  {
    id: '1',
    name: 'Chase Bank',
    logo: '🏦',
    status: 'connected',
    lastSync: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    accountCount: 2,
    accounts: ['Chase Checking', 'Chase Freedom Unlimited']
  },
  {
    id: '2',
    name: 'Marcus by Goldman Sachs',
    logo: '💰',
    status: 'connected',
    lastSync: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    accountCount: 1,
    accounts: ['High Yield Savings']
  },
  {
    id: '3',
    name: 'Fidelity',
    logo: '📈',
    status: 'connected',
    lastSync: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    accountCount: 1,
    accounts: ['Fidelity 401(k)']
  },
  {
    id: '4',
    name: 'Wells Fargo',
    logo: '🏠',
    status: 'needs_attention',
    lastSync: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    accountCount: 1,
    accounts: ['Mortgage']
  },
  {
    id: '5',
    name: 'Capital One',
    logo: '💳',
    status: 'disconnected',
    lastSync: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    accountCount: 0,
    accounts: []
  }
];

export default function ManageConnectedInstitutions({ onBack, onNavigate }: ManageConnectedInstitutionsProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const formatLastSync = (date: Date) => {
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
        return <Wifi className="h-4 w-4 text-green-500" />;
      case 'needs_attention':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'disconnected':
        return <WifiOff className="h-4 w-4 text-red-500" />;
      default:
        return null;
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

  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const handleInstitutionClick = (institution: Institution) => {
    onNavigate?.('manage-institution', { institution });
  };

  const handleAddInstitution = () => {
    onNavigate?.('add-account');
  };

  const connectedCount = mockInstitutions.filter(inst => inst.status === 'connected').length;
  const needsAttentionCount = mockInstitutions.filter(inst => inst.status === 'needs_attention').length;

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
          <h1 className="text-lg font-semibold text-center flex-1">Connected Institutions</h1>
          <Button variant="ghost" size="icon" onClick={handleAddInstitution} className="p-2">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Summary Cards */}
        <div className="p-4 grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{connectedCount}</div>
                <div className="text-sm text-gray-600">Connected</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{needsAttentionCount}</div>
                <div className="text-sm text-gray-600">Need Attention</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Institutions List Header */}
        <div className="px-4 pb-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Institutions</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleRefreshAll}
              disabled={isRefreshing}
              className="text-sm"
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh All
            </Button>
          </div>
        </div>

        {/* Institutions List */}
        <div className="px-4 space-y-3">
          {mockInstitutions.map((institution) => (
            <Card 
              key={institution.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleInstitutionClick(institution)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{institution.logo}</div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{institution.name}</h3>
                      {getStatusIcon(institution.status)}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Badge variant="secondary" className={getStatusColor(institution.status)}>
                        {getStatusText(institution.status)}
                      </Badge>
                      <span>•</span>
                      <span>{institution.accountCount} account{institution.accountCount !== 1 ? 's' : ''}</span>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Last synced: {formatLastSync(institution.lastSync)}
                    </div>
                  </div>
                  
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
                
                {/* Account List Preview */}
                {institution.accounts.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Connected Accounts:</div>
                    <div className="flex flex-wrap gap-1">
                      {institution.accounts.map((accountName, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {accountName}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Add Institution Card */}
          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow border-dashed border-2 border-gray-300"
            onClick={handleAddInstitution}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-3 text-gray-500">
                <Plus className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Add Institution</div>
                  <div className="text-sm">Connect a new bank or financial institution</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}