import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import svgPaths from "../imports/svg-qll5vuxvpj";

interface LinkedAccountsProps {
  onBack: () => void;
}

interface BankAccount {
  id: string;
  bankName: string;
  accountType: string;
  lastFour: string;
  status: 'connected' | 'needs-attention' | 'syncing';
  balance?: string;
  logo?: string;
}

export default function LinkedAccounts({ onBack }: LinkedAccountsProps) {
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      bankName: 'Chase Bank',
      accountType: 'Checking',
      lastFour: '4532',
      status: 'connected',
      balance: '$2,847.56'
    },
    {
      id: '2',
      bankName: 'Bank of America',
      accountType: 'Savings',
      lastFour: '7891',
      status: 'connected',
      balance: '$15,230.44'
    },
    {
      id: '3',
      bankName: 'Capital One',
      accountType: 'Credit Card',
      lastFour: '2468',
      status: 'needs-attention',
      balance: '$1,245.67'
    }
  ]);

  const handleAddAccount = () => {
    // This would typically launch Plaid Link
    console.log('Launching Plaid Link...');
    alert('This would open Plaid Link to connect a new bank account');
  };

  const handleRefreshAccount = (accountId: string) => {
    setAccounts(prev => 
      prev.map(acc => 
        acc.id === accountId 
          ? { ...acc, status: 'syncing' as const }
          : acc
      )
    );
    
    // Simulate refresh
    setTimeout(() => {
      setAccounts(prev => 
        prev.map(acc => 
          acc.id === accountId 
            ? { ...acc, status: 'connected' as const }
            : acc
        )
      );
    }, 2000);
  };

  const handleUnlinkAccount = (accountId: string) => {
    if (confirm('Are you sure you want to unlink this account?')) {
      setAccounts(prev => prev.filter(acc => acc.id !== accountId));
    }
  };

  const getStatusBadge = (status: BankAccount['status']) => {
    switch (status) {
      case 'connected':
        return <Badge variant="default" className="bg-green-100 text-green-800 border-green-300">Connected</Badge>;
      case 'needs-attention':
        return <Badge variant="destructive">Needs Attention</Badge>;
      case 'syncing':
        return <Badge variant="secondary">Syncing...</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="relative size-full bg-white">
      {/* Status Bar */}
      <div className="bg-white flex flex-row items-center justify-between px-4 pt-[21px] pb-0 h-[50px]">
        <div className="font-semibold text-[17px] text-black">9:41</div>
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
      <div className="bg-white relative w-full">
        <div className="flex flex-row items-center p-4">
          <button onClick={onBack} className="w-[72px] flex items-center">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path d={svgPaths.p1c45f500} fill="#353945" />
            </svg>
          </button>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="font-semibold text-[18px] text-[#18312d]">Linked Accounts</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6 overflow-y-auto" style={{ height: 'calc(100vh - 106px)' }}>
        <div className="space-y-6">
          {/* Add New Account */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#18312d] mb-1">Connect Your Bank</h3>
                <p className="text-sm text-[#18312d] opacity-70">
                  Securely link your accounts to track all your finances in one place
                </p>
              </div>
              <Button onClick={handleAddAccount} size="sm">
                Add Account
              </Button>
            </div>
          </div>

          {/* Connected Accounts */}
          <div>
            <h3 className="font-semibold text-[18px] text-[#18312d] mb-4">Your Accounts</h3>
            <div className="space-y-3">
              {accounts.map((account) => (
                <div key={account.id} className="bg-[#f6f7f9] rounded-2xl p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {account.bankName.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-[#18312d]">{account.bankName}</h4>
                        {getStatusBadge(account.status)}
                      </div>
                      <p className="text-sm text-[#18312d] opacity-70">
                        {account.accountType} ••••{account.lastFour}
                      </p>
                      {account.balance && (
                        <p className="text-sm font-semibold text-[#18312d] mt-1">
                          {account.balance}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Account Actions */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRefreshAccount(account.id)}
                      disabled={account.status === 'syncing'}
                    >
                      {account.status === 'syncing' ? 'Syncing...' : 'Refresh'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => console.log('Hide account:', account.id)}
                    >
                      Hide
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleUnlinkAccount(account.id)}
                    >
                      Unlink
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Security Notice */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-medium text-green-800 mb-1">Bank-Level Security</h3>
                <p className="text-sm text-green-700">
                  We use Plaid's industry-leading security and never store your banking credentials. Your data is encrypted and read-only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}