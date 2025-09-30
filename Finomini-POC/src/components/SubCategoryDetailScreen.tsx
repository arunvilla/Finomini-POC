import { useState } from 'react';
import { ArrowLeft, Settings, Heart, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface SubCategoryDetailScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
  subcategory?: any;
  parentCategory?: any;
}

// Mock transactions data
const mockTransactions = [
  {
    id: '1',
    merchant: 'Gas',
    account: 'Account ••4526',
    amount: -50.00,
    date: 'Fri, 21 Feb 2025',
    logo: '🔴',
    tags: ['G'],
    category: 'Transportation'
  },
  {
    id: '2',
    merchant: 'Gas', 
    account: 'Account ••4526',
    amount: -50.00,
    date: 'Fri, 21 Feb 2025',
    logo: '🔴',
    tags: ['G'],
    category: 'Transportation'
  },
  {
    id: '3',
    merchant: 'Gas',
    account: 'Account ••4526', 
    amount: -50.00,
    date: 'Fri, 21 Feb 2025',
    logo: '🔴',
    tags: ['G'],
    badges: ['Split'],
    category: 'Transportation'
  },
  {
    id: '4',
    merchant: 'Gas',
    account: 'Account ••4526',
    amount: -50.00, 
    date: 'Fri, 21 Feb 2025',
    logo: '🔴',
    tags: ['G'],
    category: 'Transportation'
  }
];

export default function SubCategoryDetailScreen({ onBack, onNavigate, subcategory, parentCategory }: SubCategoryDetailScreenProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock subcategory data if none provided
  const mockSubcategory = {
    id: '2',
    name: 'Fuel',
    icon: '⛽',
    spent: 10,
    budget: 50,
    parentCategory: 'Transportation'
  };

  const currentSubcategory = subcategory || mockSubcategory;
  const progressPercentage = Math.round((currentSubcategory.spent / currentSubcategory.budget) * 100);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Math.abs(amount));
  };

  const handleTransactionClick = (transaction: any) => {
    onNavigate?.('transaction-details-screen', { transaction });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Status Bar */}
      <div className="bg-card flex flex-row items-center justify-between px-4 pt-[21px] pb-0 h-[50px]">
        <div className="text-[17px] text-foreground font-semibold">9:41</div>
        <div className="h-2.5 w-[124px]" />
        <div className="flex items-center gap-[7px]">
          <div className="w-[19.2px] h-[12.226px] bg-foreground rounded-sm" />
          <div className="w-[17.142px] h-[12.328px] bg-foreground rounded-sm" />
          <div className="w-[27.328px] h-[13px] border border-foreground rounded-[3.8px] relative">
            <div className="w-[21px] h-[9px] bg-foreground rounded-[2.5px] absolute left-[2px] top-[2px]" />
            <div className="w-[1.328px] h-[5px] bg-foreground rounded-r absolute right-0 top-[4px]" />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <h1 className="text-lg font-semibold text-foreground">{currentSubcategory.name}</h1>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="p-2">
              <Settings className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleFavorite}
              className="p-2"
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Budget Summary Card */}
        <Card className="bg-card shadow-lg">
          <CardContent className="p-4">
            <div className="flex flex-col items-center gap-4">
              <div className="text-6xl">{currentSubcategory.icon}</div>
              
              {/* Budget Progress Circle */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="45"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="45"
                    stroke="#0F9950"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - progressPercentage / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-foreground">{progressPercentage}%</span>
                  <span className="text-xs text-muted-foreground">of total Budgeted</span>
                </div>
              </div>

              {/* Budget Details */}
              <div className="w-full space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Budgeted</span>
                  <span className="font-semibold text-foreground">{formatCurrency(currentSubcategory.budget)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Spent</span>
                  <span className="font-semibold text-foreground">{formatCurrency(currentSubcategory.spent)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Transactions</h3>
            <Button variant="outline" size="icon" className="p-2">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {mockTransactions.map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => handleTransactionClick(transaction)}
                  >
                    <div className="flex items-center gap-4">
                      {/* Logo */}
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                          C
                        </div>
                      </div>

                      {/* Transaction Details */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">{transaction.merchant}</h4>
                            {transaction.tags && transaction.tags.map((tag) => (
                              <div key={tag} className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center">
                                <span className="text-xs text-green-800">{tag}</span>
                              </div>
                            ))}
                            {transaction.badges && transaction.badges.map((badge) => (
                              <Badge key={badge} variant="outline" className="text-xs border-purple-300 text-purple-600">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                          <span className="font-semibold text-foreground">
                            {formatCurrency(transaction.amount)}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{transaction.account}</span>
                          <span>{transaction.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}