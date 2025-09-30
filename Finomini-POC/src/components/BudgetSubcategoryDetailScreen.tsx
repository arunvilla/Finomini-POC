import { useState } from 'react';
import { ArrowLeft, Heart, Settings, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface BudgetSubcategoryDetailScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
  subcategory: any;
  parentCategory: any;
}

const mockTransactions = [
  {
    id: '1',
    merchant: 'Gas',
    account: 'Account ••4526',
    amount: -50.00,
    date: 'Fri, 21 Feb 2025',
    icon: '⛽',
    color: 'bg-red-500',
    category: 'G',
    hasSplit: false
  },
  {
    id: '2',
    merchant: 'Gas',
    account: 'Account ••4526',
    amount: -50.00,
    date: 'Fri, 21 Feb 2025',
    icon: '⛽',
    color: 'bg-red-500',
    category: 'G',
    hasSplit: false
  },
  {
    id: '3',
    merchant: 'Gas',
    account: 'Account ••4526',
    amount: -50.00,
    date: 'Fri, 21 Feb 2025',
    icon: '⛽',
    color: 'bg-red-500',
    category: 'G',
    hasSplit: true
  },
  {
    id: '4',
    merchant: 'Gas',
    account: 'Account ••4526',
    amount: -50.00,
    date: 'Fri, 21 Feb 2025',
    icon: '⛽',
    color: 'bg-red-500',
    category: 'G',
    hasSplit: false
  }
];

export default function BudgetSubcategoryDetailScreen({ 
  onBack, 
  onNavigate, 
  subcategory, 
  parentCategory 
}: BudgetSubcategoryDetailScreenProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  if (!subcategory || !parentCategory) {
    return <div>Subcategory not found</div>;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Math.abs(amount));
  };

  const overallProgress = Math.round((subcategory.spent / subcategory.budgeted) * 100);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-white">
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
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Button>
          <h1 className="text-[18px] font-semibold text-gray-900">{subcategory.name}</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="p-2">
              <Settings className="h-5 w-5 text-gray-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleFavorite}
              className="p-2"
            >
              <Heart 
                className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
              />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 pb-6">
        {/* Subcategory Icon */}
        <div className="flex justify-center py-6">
          <div className="text-6xl">{subcategory.icon}</div>
        </div>

        {/* Budget Overview Circle */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between">
            {/* Circular Progress */}
            <div className="relative">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                {/* Background circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#10b981"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${overallProgress * 3.14} 314`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{overallProgress}%</span>
                <span className="text-xs text-gray-500">of total Budgeted</span>
              </div>
            </div>

            {/* Budget Stats */}
            <div className="flex-1 ml-8 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Budgeted</span>
                <span className="font-semibold text-gray-900">{formatCurrency(subcategory.budgeted)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Spent</span>
                <span className="font-semibold text-gray-900">{formatCurrency(subcategory.spent)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-semibold text-gray-900">Transactions</h2>
            <Button variant="outline" size="icon" className="w-8 h-8">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Transaction List */}
          <div className="space-y-3">
            {mockTransactions.map((transaction) => (
              <Card 
                key={transaction.id}
                className="border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onNavigate?.('transaction-details-screen', { transaction })}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    {/* Left Side - Icon and Details */}
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-12 h-12 ${transaction.color} rounded-full flex items-center justify-center`}>
                        <span className="text-white font-semibold">{transaction.category}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{transaction.merchant}</h3>
                          {transaction.hasSplit && (
                            <Badge variant="outline" className="text-xs text-purple-600 border-purple-200">
                              Split
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{transaction.account}</p>
                      </div>
                    </div>

                    {/* Right Side - Amount and Date */}
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {formatCurrency(transaction.amount)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {transaction.date}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}