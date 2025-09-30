import { useState } from 'react';
import { ArrowLeft, ChevronRight, Building2, Database, Eye, Bell, Trash2, Settings, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface AccountsSettingsProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export default function AccountsSettings({ onBack, onNavigate }: AccountsSettingsProps) {
  const [showHiddenAccounts, setShowHiddenAccounts] = useState(false);
  const [connectionAlerts, setConnectionAlerts] = useState(true);
  const [newAccountAlerts, setNewAccountAlerts] = useState(true);
  const [defaultView, setDefaultView] = useState('all');

  const handleManageInstitutions = () => {
    onNavigate?.('manage-connected-institutions');
  };

  const handleDeleteHistoricalData = () => {
    onNavigate?.('delete-historical-data');
  };

  const handlePlaidPortal = () => {
    // In a real app, this would open the Plaid Portal
    console.log('Opening Plaid Portal...');
    // For now, we'll just show an alert
    alert('This would open the Plaid Portal in a real implementation');
  };

  const handleMergeDuplicates = () => {
    // Navigate to merge duplicates screen (would be implemented)
    console.log('Navigate to merge duplicates');
    alert('Merge Duplicates feature would be implemented here');
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
          <h1 className="text-lg font-semibold text-center flex-1">Accounts Settings</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Account Connections */}
        <Card className="mx-4 mt-4">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="h-5 w-5 text-gray-600" />
              Account Connections
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div 
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                onClick={handleManageInstitutions}
              >
                <div>
                  <div className="font-medium text-gray-900">Manage Connected Institutions</div>
                  <div className="text-sm text-gray-600">View and manage bank connections</div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              
              <Separator />
              
              <div 
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                onClick={handlePlaidPortal}
              >
                <div>
                  <div className="font-medium text-gray-900">Plaid Portal</div>
                  <div className="text-sm text-gray-600">Manage data sharing permissions</div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="mx-4 mt-4">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Database className="h-5 w-5 text-gray-600" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div 
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                onClick={handleDeleteHistoricalData}
              >
                <div>
                  <div className="font-medium text-gray-900">Delete Historical Data</div>
                  <div className="text-sm text-gray-600">Remove old transactions and balances</div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              
              <Separator />
              
              <div 
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                onClick={handleMergeDuplicates}
              >
                <div>
                  <div className="font-medium text-gray-900">Merge Duplicate Accounts</div>
                  <div className="text-sm text-gray-600">Identify and merge duplicate accounts</div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Display Preferences */}
        <Card className="mx-4 mt-4">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Eye className="h-5 w-5 text-gray-600" />
              Display Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-900 mb-2">Default Account View</div>
                <Select value={defaultView} onValueChange={setDefaultView}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select default view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Accounts</SelectItem>
                    <SelectItem value="bank">Bank Accounts Only</SelectItem>
                    <SelectItem value="networth">Net Worth Summary</SelectItem>
                    <SelectItem value="recently-used">Recently Used</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-xs text-gray-500 mt-1">
                  Choose what you see first when opening Accounts
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Show Hidden Accounts</div>
                  <div className="text-sm text-gray-600">Temporarily reveal hidden accounts</div>
                </div>
                <Switch
                  checked={showHiddenAccounts}
                  onCheckedChange={setShowHiddenAccounts}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="mx-4 mt-4 mb-6">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-5 w-5 text-gray-600" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Connection Status Alerts</div>
                  <div className="text-sm text-gray-600">Notify about sync issues and reconnection needs</div>
                </div>
                <Switch
                  checked={connectionAlerts}
                  onCheckedChange={setConnectionAlerts}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">New Account Added Alerts</div>
                  <div className="text-sm text-gray-600">Notify when new accounts are detected</div>
                </div>
                <Switch
                  checked={newAccountAlerts}
                  onCheckedChange={setNewAccountAlerts}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}