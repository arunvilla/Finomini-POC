import { useState } from 'react';
import { ArrowLeft, AlertTriangle, Calendar, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Alert, AlertDescription } from './ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

interface DeleteHistoricalDataProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export default function DeleteHistoricalData({ onBack, onNavigate }: DeleteHistoricalDataProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [confirmationChecked, setConfirmationChecked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDateChange = (value: string) => {
    setSelectedDate(value);
    // Reset confirmation when date changes
    setConfirmationChecked(false);
  };

  const handleDeleteData = async () => {
    if (!selectedDate || !confirmationChecked) return;
    
    setIsDeleting(true);
    
    // Simulate API call to delete historical data
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsDeleting(false);
    
    // Show success message and navigate back
    alert('Historical data has been successfully deleted.');
    onBack();
  };

  const isValidDate = selectedDate && new Date(selectedDate) < new Date();
  const canDelete = selectedDate && confirmationChecked && isValidDate;

  // Calculate estimated data to be deleted (mock calculation)
  const getEstimatedDeletionStats = () => {
    if (!selectedDate) return null;
    
    const cutoffDate = new Date(selectedDate);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - cutoffDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Mock calculations
    const estimatedTransactions = Math.floor(daysDiff * 2.5); // ~2.5 transactions per day
    const estimatedAccounts = Math.min(Math.floor(daysDiff / 30), 10); // Up to 10 accounts
    
    return {
      transactions: estimatedTransactions,
      accounts: estimatedAccounts,
      days: daysDiff
    };
  };

  const deletionStats = getEstimatedDeletionStats();

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
          <h1 className="text-lg font-semibold text-center flex-1">Delete Historical Data</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Warning Alert */}
        <div className="p-4">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Warning:</strong> This action permanently deletes all transactions and account balances prior to the specified date. This action cannot be undone.
            </AlertDescription>
          </Alert>
        </div>

        {/* Date Selection */}
        <Card className="mx-4 mt-4">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-600" />
              Select Cutoff Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cutoffDate">Delete data before:</Label>
                <Input
                  id="cutoffDate"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  max={new Date().toISOString().split('T')[0]} // Prevent future dates
                  className="mt-1"
                />
                <p className="text-sm text-gray-600 mt-1">
                  All transactions and balances before this date will be permanently removed.
                </p>
              </div>

              {selectedDate && !isValidDate && (
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    Please select a date in the past.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Estimated Impact */}
        {deletionStats && isValidDate && (
          <Card className="mx-4 mt-4">
            <CardHeader>
              <CardTitle className="text-base">Estimated Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="text-red-800 font-semibold">~{deletionStats.transactions}</div>
                    <div className="text-red-600">Transactions</div>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="text-red-800 font-semibold">{deletionStats.days}</div>
                    <div className="text-red-600">Days of data</div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  This will affect transaction history across all your connected accounts.
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Confirmation */}
        {selectedDate && isValidDate && (
          <Card className="mx-4 mt-4">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="confirmation"
                  checked={confirmationChecked}
                  onCheckedChange={(checked) => setConfirmationChecked(checked as boolean)}
                />
                <label htmlFor="confirmation" className="text-sm text-gray-700 cursor-pointer">
                  I understand that this action is <strong>irreversible</strong> and will permanently delete all financial data before {new Date(selectedDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}.
                </label>
              </div>
            </CardContent>
          </Card>
        )}

        {/* What Gets Deleted */}
        <Card className="mx-4 mt-4 mb-6">
          <CardHeader>
            <CardTitle className="text-base">What Gets Deleted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>All transaction records before the selected date</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Historical account balance data</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Associated transaction categories and tags</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Historical spending and income reports</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-sm text-green-800">
                <strong>What stays:</strong> Current account balances, active accounts, and all data from the selected date forward will be preserved.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Button */}
      <div className="bg-white border-t px-4 py-3">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="destructive" 
              className="w-full"
              disabled={!canDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Historical Data
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-600">Final Confirmation</AlertDialogTitle>
              <AlertDialogDescription>
                You are about to permanently delete all financial data before{' '}
                <strong>
                  {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </strong>.
                <br /><br />
                This includes approximately <strong>{deletionStats?.transactions} transactions</strong> and will affect your historical reports and analytics.
                <br /><br />
                <strong>This action cannot be undone.</strong>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteData}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete Data'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}