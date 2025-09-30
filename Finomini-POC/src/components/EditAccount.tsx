import { useState } from 'react';
import { ArrowLeft, Save, Eye, EyeOff, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

interface EditAccountProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
  account: any;
}

export default function EditAccount({ onBack, onNavigate, account }: EditAccountProps) {
  const [accountName, setAccountName] = useState(account?.name || '');
  const [accountType, setAccountType] = useState(account?.type || '');
  const [isHidden, setIsHidden] = useState(account?.isHidden || false);
  const [isBalanceHidden, setIsBalanceHidden] = useState(account?.isBalanceHidden || false);
  const [currentBalance, setCurrentBalance] = useState(account?.balance?.toString() || '');
  const [hasChanges, setHasChanges] = useState(false);

  if (!account) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Account Not Found</h2>
          <p className="text-gray-600 mb-4">The account could not be loaded.</p>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setHasChanges(true);
    
    switch (field) {
      case 'name':
        setAccountName(value as string);
        break;
      case 'type':
        setAccountType(value as string);
        break;
      case 'hidden':
        setIsHidden(value as boolean);
        break;
      case 'balanceHidden':
        setIsBalanceHidden(value as boolean);
        break;
      case 'balance':
        setCurrentBalance(value as string);
        break;
    }
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving account changes:', {
      name: accountName,
      type: accountType,
      isHidden,
      isBalanceHidden,
      balance: parseFloat(currentBalance)
    });
    setHasChanges(false);
    onBack();
  };

  const handleDeleteAccount = () => {
    // In a real app, this would delete from backend
    console.log('Deleting account:', account.id);
    // Navigate back to accounts list
    onNavigate?.('accounts');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
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
          <h1 className="text-lg font-semibold text-center flex-1">Edit Account</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Account Information */}
        <Card className="mx-4 mt-4">
          <CardHeader>
            <CardTitle className="text-base">Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-3xl">{account.institutionLogo}</div>
              <div>
                <div className="font-medium text-gray-900">{account.institution}</div>
                <div className="text-sm text-gray-600">{account.accountNumber}</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="accountName">Account Name</Label>
                <Input
                  id="accountName"
                  value={accountName}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter account name"
                />
              </div>
              
              <div>
                <Label htmlFor="accountType">Account Type</Label>
                <Select value={accountType} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="credit">Credit Card</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                    <SelectItem value="loan">Loan</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {account.status === 'manual' && (
                <div>
                  <Label htmlFor="currentBalance">Current Balance</Label>
                  <Input
                    id="currentBalance"
                    type="number"
                    step="0.01"
                    value={currentBalance}
                    onChange={(e) => handleInputChange('balance', e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="mx-4 mt-4">
          <CardHeader>
            <CardTitle className="text-base">Privacy Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Hide Account</div>
                <div className="text-sm text-gray-600">Hide this account from account lists</div>
              </div>
              <Switch
                checked={isHidden}
                onCheckedChange={(checked) => handleInputChange('hidden', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Hide Balance</div>
                <div className="text-sm text-gray-600">Hide balance amounts for privacy</div>
              </div>
              <Switch
                checked={isBalanceHidden}
                onCheckedChange={(checked) => handleInputChange('balanceHidden', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Status */}
        {account.status !== 'manual' && (
          <Card className="mx-4 mt-4">
            <CardHeader>
              <CardTitle className="text-base">Connection Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Status</div>
                    <div className="text-sm text-gray-600">
                      {account.status === 'connected' ? 'Connected and syncing' : 
                       account.status === 'needs_attention' ? 'Needs attention' : 'Disconnected'}
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    account.status === 'connected' ? 'bg-green-100 text-green-800' :
                    account.status === 'needs_attention' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {account.status === 'connected' ? 'Connected' :
                     account.status === 'needs_attention' ? 'Attention Needed' : 'Disconnected'}
                  </div>
                </div>
                
                {account.status === 'needs_attention' && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <div className="text-sm text-orange-800">
                      This account needs to be reconnected. Please update your login credentials.
                    </div>
                    <Button size="sm" className="mt-2">
                      Reconnect Account
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Danger Zone */}
        <Card className="mx-4 mt-4 mb-6 border-red-200">
          <CardHeader>
            <CardTitle className="text-base text-red-600">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="font-medium text-red-900">
                  {account.status === 'manual' ? 'Delete Account' : 'Unlink Account'}
                </div>
                <div className="text-sm text-red-600 mb-3">
                  {account.status === 'manual' 
                    ? 'Permanently delete this account and all its data. This action cannot be undone.'
                    : 'Remove this account from your dashboard. You can reconnect it later.'}
                </div>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      {account.status === 'manual' ? 'Delete Account' : 'Unlink Account'}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {account.status === 'manual' ? 'Delete Account?' : 'Unlink Account?'}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {account.status === 'manual' 
                          ? `Are you sure you want to delete "${account.name}"? This will permanently remove all account data and cannot be undone.`
                          : `Are you sure you want to unlink "${account.name}"? You can reconnect it later if needed.`}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                        {account.status === 'manual' ? 'Delete' : 'Unlink'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Changes Button */}
      {hasChanges && (
        <div className="bg-white border-t px-4 py-3">
          <Button onClick={handleSave} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}