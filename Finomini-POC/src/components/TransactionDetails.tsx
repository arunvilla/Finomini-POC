import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface TransactionDetailsProps {
  onBack: () => void;
  onNavigate?: (screen: any, category?: any, tag?: any, date?: Date, subscriptions?: any[], subscription?: any) => void;
  subscription: {
    id: string;
    name: string;
    amount: number;
    icon: string;
    color: string;
  };
  transactionDate: Date;
}

export default function TransactionDetails({ onBack, onNavigate, subscription, transactionDate }: TransactionDetailsProps) {
  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calculate next billing date (20 days after transaction date for this example)
  const nextBillDate = new Date(transactionDate);
  nextBillDate.setDate(nextBillDate.getDate() + 20);

  const getSubscriptionIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'youtube':
        return '▶';
      case 'at&t':
        return '≈';
      case 'spotify':
        return '♪';
      case 'netflix':
        return 'N';
      case 'apple music':
        return '🎧';
      default:
        return '💳';
    }
  };

  const getSubscriptionColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'youtube':
        return 'bg-red-100';
      case 'at&t':
        return 'bg-blue-100';
      case 'spotify':
        return 'bg-green-100';
      case 'netflix':
        return 'bg-red-100';
      case 'apple music':
        return 'bg-gray-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getIconColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'youtube':
        return 'text-red-600';
      case 'at&t':
        return 'text-blue-600';
      case 'spotify':
        return 'text-green-600';
      case 'netflix':
        return 'text-red-600';
      case 'apple music':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const getCategory = (name: string) => {
    switch (name.toLowerCase()) {
      case 'youtube':
      case 'netflix':
      case 'spotify':
      case 'apple music':
        return 'Entertainment';
      case 'at&t':
        return 'Utilities';
      default:
        return 'Entertainment';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Status Bar */}
      <div className="bg-white flex flex-row items-center justify-between px-4 pt-[21px] pb-0 h-[50px]">
        <div className="text-[17px] text-black">9:41</div>
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
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg text-foreground">Transaction Details</h1>
        <div className="w-9" /> {/* Spacer for centering */}
      </div>

      <div className="p-6 space-y-6">
        {/* Service Icon and Info */}
        <div className="text-center space-y-4">
          <div className={`w-20 h-20 ${getSubscriptionColor(subscription.name)} rounded-full flex items-center justify-center mx-auto`}>
            <span className={`text-2xl ${getIconColor(subscription.name)}`}>
              {getSubscriptionIcon(subscription.name)}
            </span>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl text-foreground">
              {subscription.name}
            </h2>
            <div className="text-3xl text-foreground">
              {formatCurrency(subscription.amount)}
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-0">
          <div className="flex justify-between items-center py-4 border-b border-gray-200">
            <span className="text-base text-gray-700">Next bill</span>
            <span className="text-base text-gray-900">{formatDate(nextBillDate)}</span>
          </div>
          
          <div className="flex justify-between items-center py-4 border-b border-gray-200">
            <span className="text-base text-gray-700">Payment method</span>
            <span className="text-base text-gray-900">**** 4657</span>
          </div>
          
          <div className="flex justify-between items-center py-4 border-b border-gray-200">
            <span className="text-base text-gray-700">Category</span>
            <span className="text-base text-gray-900">{getCategory(subscription.name)}</span>
          </div>
          
          <div className="flex justify-between items-center py-4">
            <span className="text-base text-gray-700">Period</span>
            <span className="text-base text-gray-900">Monthly</span>
          </div>
        </div>

        {/* All Upcoming Payments Button */}
        <div className="pt-4">
          <Button 
            variant="outline" 
            className="w-full h-12 text-base bg-white border-gray-200 hover:bg-gray-50"
            onClick={() => onNavigate && onNavigate('upcoming-payments-list')}
          >
            View All Upcoming Payments
          </Button>
        </div>
      </div>
    </div>
  );
}