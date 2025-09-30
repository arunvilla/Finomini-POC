import { useState } from 'react';
import { ArrowLeft, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';

interface AddManualAccountScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

const accountTypes = [
  { value: 'cash', label: 'Cash', icon: '💵' },
  { value: 'checking', label: 'Checking Account', icon: '🏦' },
  { value: 'savings', label: 'Savings Account', icon: '💰' },
  { value: 'credit_card', label: 'Credit Card', icon: '💳' },
  { value: 'investment', label: 'Investment Account', icon: '📈' },
  { value: 'real_estate', label: 'Real Estate', icon: '🏠' },
  { value: 'vehicle', label: 'Vehicle', icon: '🚗' },
  { value: 'loan', label: 'Loan', icon: '📋' },
  { value: 'other_asset', label: 'Other Asset', icon: '💎' },
  { value: 'other_liability', label: 'Other Liability', icon: '📊' }
];

const currencies = [
  { value: 'USD', label: 'USD - US Dollar', symbol: '$' },
  { value: 'EUR', label: 'EUR - Euro', symbol: '€' },
  { value: 'GBP', label: 'GBP - British Pound', symbol: '£' },
  { value: 'CAD', label: 'CAD - Canadian Dollar', symbol: 'C$' },
  { value: 'JPY', label: 'JPY - Japanese Yen', symbol: '¥' }
];

export default function AddManualAccountScreen({ onBack, onNavigate }: AddManualAccountScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    balance: '',
    currency: 'USD',
    institution: '',
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Account name is required';
    }

    if (!formData.type) {
      newErrors.type = 'Account type is required';
    }

    if (!formData.balance.trim()) {
      newErrors.balance = 'Initial balance is required';
    } else if (isNaN(Number(formData.balance))) {
      newErrors.balance = 'Please enter a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success - navigate back to accounts with success message
      onNavigate?.('accounts', { 
        success: true, 
        message: `${formData.name} has been added successfully!` 
      });
    } catch (error) {
      setErrors({ submit: 'Failed to add account. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const selectedAccountType = accountTypes.find(type => type.value === formData.type);
  const selectedCurrency = currencies.find(curr => curr.value === formData.currency);

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
          <h1 className="text-lg font-semibold text-center">Add Manual Account</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Info Card */}
          <Alert>
            <DollarSign className="h-4 w-4" />
            <AlertDescription>
              Manually added accounts won't sync automatically. You'll need to update balances and transactions yourself.
            </AlertDescription>
          </Alert>

          {/* Account Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Account Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Account Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Cash Wallet, Emergency Fund, Rental Property"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Account Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Account Type *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select account type">
                      {selectedAccountType && (
                        <div className="flex items-center gap-2">
                          <span>{selectedAccountType.icon}</span>
                          <span>{selectedAccountType.label}</span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {accountTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <span>{type.icon}</span>
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-600">{errors.type}</p>
                )}
              </div>

              {/* Initial Balance */}
              <div className="space-y-2">
                <Label htmlFor="balance">Current Balance/Value *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {selectedCurrency?.symbol}
                  </span>
                  <Input
                    id="balance"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.balance}
                    onChange={(e) => handleInputChange('balance', e.target.value)}
                    className={`pl-8 ${errors.balance ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.balance && (
                  <p className="text-sm text-red-600">{errors.balance}</p>
                )}
                <p className="text-sm text-gray-500">
                  For debts and liabilities, enter as negative values (e.g., -5000)
                </p>
              </div>

              {/* Currency */}
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                  <SelectTrigger>
                    <SelectValue>
                      {selectedCurrency && (
                        <div className="flex items-center gap-2">
                          <span>{selectedCurrency.symbol}</span>
                          <span>{selectedCurrency.label}</span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        <div className="flex items-center gap-2">
                          <span>{currency.symbol}</span>
                          <span>{currency.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Institution (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="institution">Institution (Optional)</Label>
                <Input
                  id="institution"
                  placeholder="e.g., Local Credit Union, Property Management Co."
                  value={formData.institution}
                  onChange={(e) => handleInputChange('institution', e.target.value)}
                />
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional details about this account..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Error */}
          {errors.submit && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {errors.submit}
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pb-6">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding Account...' : 'Add Account'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={onBack}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}