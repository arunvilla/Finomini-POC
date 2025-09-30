import { useState } from 'react';
import { ArrowLeft, RefreshCw, Wifi, WifiOff, AlertCircle, Link, Unlink, Settings, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import type { Institution } from '../App';

interface ManageInstitutionProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
  institution: Institution | null;
}

// Mock accounts data for the institution
const mockInstitutionAccounts = [
  {
    id: '1',
    name: 'Chase Checking',
    type: 'checking',
    accountNumber: '****1234',
    balance: 5584.00,
    status: 'connected'
  },
  {
    id: '3',
    name: 'Chase Freedom Unlimited',
    type: 'credit',
    accountNumber: '****9012',
    balance: -1378.00,
    status: 'connected'
  }
];

export default function ManageInstitution({ onBack, onNavigate, institution }: ManageInstitutionProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isUpdatingLogin, setIsUpdatingLogin] = useState(false);

  if (!institution) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Institution Not Found</h2>
          <p className="text-gray-600 mb-4">The institution details could not be loaded.</p>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  const formatLastSync = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <Wifi className="h-5 w-5 text-green-500" />;
      case 'needs_attention':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case 'disconnected':
        return <WifiOff className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Connected and syncing normally';
      case 'needs_attention':
        return 'Authentication required - please update login';
      case 'disconnected':
        return 'Disconnected - no longer syncing';
      default:
        return 'Unknown status';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'needs_attention':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'disconnected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleUpdateLogin = async () => {
    setIsUpdatingLogin(true);
    // Simulate Plaid Link flow
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUpdatingLogin(false);
    // In a real app, this would update the institution status
  };

  const handleRefreshAccounts = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const handleDisconnectAll = () => {
    // In a real app, this would disconnect all accounts from this institution
    console.log('Disconnecting all accounts from:', institution.name);
    onBack(); // Navigate back after disconnection
  };

  const handleAccountClick = (account: any) => {
    onNavigate?.('account-details', { account });
  };

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
          <h1 className="text-lg font-semibold text-center flex-1">{institution.name}</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Institution Summary */}
        <Card className="mx-4 mt-4">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{institution.logo}</div>
              
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{institution.name}</h2>
                
                <div className="flex items-center gap-2 mb-3">
                  {getStatusIcon(institution.status)}
                  <Badge className={getStatusColor(institution.status)}>
                    {institution.status === 'connected' ? 'Connected' : 
                     institution.status === 'needs_attention' ? 'Needs Attention' : 'Disconnected'}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  {getStatusText(institution.status)}
                </p>
                
                <div className="text-sm text-gray-500">
                  <div>Last synced: {formatLastSync(institution.lastSync)}</div>
                  <div>Connected accounts: {institution.accountCount}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card className="mx-4 mt-4">
          <CardContent className="p-4">
            <div className="space-y-3">
              {institution.status !== 'disconnected' && (
                <>
                  <Button 
                    onClick={handleUpdateLogin}
                    disabled={isUpdatingLogin}
                    className="w-full justify-start"
                    variant={institution.status === 'needs_attention' ? 'default' : 'outline'}
                  >
                    <Link className="h-4 w-4 mr-2" />
                    {isUpdatingLogin ? 'Updating...' : 'Update Login Settings'}
                  </Button>
                  
                  <Button 
                    onClick={handleRefreshAccounts}
                    disabled={isRefreshing}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Refresh All Accounts from {institution.name}
                  </Button>
                </>
              )}
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full justify-start">
                    <Unlink className="h-4 w-4 mr-2" />
                    Disconnect All Accounts from {institution.name}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Disconnect {institution.name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will disconnect all {institution.accountCount} account{institution.accountCount !== 1 ? 's' : ''} from {institution.name}. 
                      You can reconnect them later if needed. This action will stop automatic syncing of transactions and balances.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDisconnectAll} className="bg-red-600 hover:bg-red-700">
                      Disconnect All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>

        {/* Linked Accounts */}
        <Card className="mx-4 mt-4 mb-6">
          <CardHeader>
            <CardTitle className="text-base">Linked Accounts</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {mockInstitutionAccounts.map((account, index) => (
                <div key={account.id}>
                  {index > 0 && <Separator />}
                  <div 
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    onClick={() => handleAccountClick(account)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{account.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">{account.accountNumber}</div>
                    </div>
                    
                    <div className="text-right mr-2">
                      <div className={`font-semibold ${
                        account.balance < 0 ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {formatCurrency(account.balance)}
                      </div>
                      <div className="text-xs text-gray-500">Current Balance</div>
                    </div>
                    
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))}
              
              {mockInstitutionAccounts.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <p>No accounts connected from this institution</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}