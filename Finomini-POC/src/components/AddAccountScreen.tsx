import { useState } from 'react';
import { ArrowLeft, Search, Shield, Plus, Building, CreditCard, Landmark, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import PlaidLinkButton from './PlaidLinkButton';
import PlaidAccountManager from './PlaidAccountManager';

interface AddAccountScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

const popularInstitutions = [
  { id: 'chase', name: 'Chase', logo: '🏦', type: 'Bank' },
  { id: 'bofa', name: 'Bank of America', logo: '🏛️', type: 'Bank' },
  { id: 'wells_fargo', name: 'Wells Fargo', logo: '🏪', type: 'Bank' },
  { id: 'citi', name: 'Citibank', logo: '🏢', type: 'Bank' },
  { id: 'amex', name: 'American Express', logo: '💳', type: 'Credit Card' },
  { id: 'discover', name: 'Discover', logo: '💎', type: 'Credit Card' },
  { id: 'fidelity', name: 'Fidelity', logo: '📈', type: 'Investment' },
  { id: 'schwab', name: 'Charles Schwab', logo: '📊', type: 'Investment' },
  { id: 'vanguard', name: 'Vanguard', logo: '📋', type: 'Investment' },
  { id: 'usaa', name: 'USAA', logo: '⭐', type: 'Bank' },
  { id: 'capital_one', name: 'Capital One', logo: '🎯', type: 'Bank' },
  { id: 'ally', name: 'Ally Bank', logo: '🤝', type: 'Bank' }
];

const accountTypes = [
  { id: 'bank', name: 'Bank Account', icon: <Landmark className="h-5 w-5" />, description: 'Checking, Savings, Money Market' },
  { id: 'credit', name: 'Credit Card', icon: <CreditCard className="h-5 w-5" />, description: 'Credit Cards, Lines of Credit' },
  { id: 'investment', name: 'Investment', icon: <Building className="h-5 w-5" />, description: '401k, IRA, Brokerage, Crypto' },
  { id: 'loan', name: 'Loan', icon: <DollarSign className="h-5 w-5" />, description: 'Mortgage, Auto, Student, Personal' }
];

export default function AddAccountScreen({ onBack, onNavigate }: AddAccountScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredInstitutions = popularInstitutions.filter(institution =>
    institution.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedType === null || institution.type.toLowerCase().includes(selectedType))
  );

  const handleInstitutionSelect = (institution: any) => {
    // The PlaidLinkButton will handle the connection process
    // We can show a message or trigger the Plaid Link directly
    console.log('Selected institution:', institution);
  };

  const handleManualAccount = () => {
    onNavigate?.('add-manual-account');
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(selectedType === type ? null : type);
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
          <h1 className="text-lg font-semibold text-center">Add New Account</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Plaid Security Info & Connection */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3 mb-4">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900">Secure Connection with Plaid</h3>
                <p className="text-sm text-blue-700 mt-1">
                  We use bank-level security to safely connect your accounts. Your login credentials are never stored.
                </p>
              </div>
            </div>
            <PlaidLinkButton
              onSuccess={() => {
                console.log('Account connected successfully');
                // Optionally navigate back or show success message
              }}
              onError={(error) => {
                console.error('Connection failed:', error);
              }}
              variant="default"
              size="lg"
              className="w-full"
            />
          </CardContent>
        </Card>

        {/* Search Bar */}
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search for your bank or institution"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Account Type Filters */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Filter by Account Type</h3>
          <div className="grid grid-cols-2 gap-2">
            {accountTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "default" : "outline"}
                className="h-auto p-3 justify-start"
                onClick={() => handleTypeFilter(type.id)}
              >
                <div className="flex items-center gap-2">
                  {type.icon}
                  <div className="text-left">
                    <div className="text-sm font-medium">{type.name}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Popular Institutions */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">
            {searchQuery || selectedType ? 'Search Results' : 'Popular Institutions'}
          </h3>
          <div className="space-y-2">
            {filteredInstitutions.map((institution) => (
              <Card 
                key={institution.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleInstitutionSelect(institution)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{institution.logo}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{institution.name}</div>
                      <div className="text-sm text-gray-500">{institution.type}</div>
                    </div>
                    <Badge variant="secondary">{institution.type}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredInstitutions.length === 0 && (searchQuery || selectedType) && (
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="p-8 text-center">
                <div className="text-gray-500">
                  <Search className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-medium">No institutions found</div>
                  <div className="text-sm">Try adjusting your search or add a manual account</div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Manual Account Option */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow border-dashed border-2 border-gray-300"
          onClick={handleManualAccount}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Plus className="h-6 w-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">Add Manual Account</div>
                <div className="text-sm text-gray-500">
                  Cash, real estate, or institutions not supported by Plaid
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Transparency */}
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <h4 className="font-medium text-gray-900 mb-2">What data do we access?</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Account balances and basic account information</li>
              <li>• Transaction history to categorize your spending</li>
              <li>• Account and routing numbers for account identification</li>
            </ul>
            <p className="text-xs text-gray-500 mt-3">
              We never store your login credentials and use read-only access to your accounts.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}