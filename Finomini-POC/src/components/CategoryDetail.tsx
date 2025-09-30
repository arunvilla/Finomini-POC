import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import exampleImage from 'figma:asset/d5929efae009ea7cd38dba6b292ddbac7251e3b5.png';

interface CategoryDetailProps {
  onBack: () => void;
  onNavigate: (screen: any, category?: any, tag?: any, date?: Date, subscriptions?: any[], subscription?: any) => void;
  categoryName: string;
  subscriptions: {
    id: string;
    name: string;
    amount: number;
    dueDate: string;
    icon: string;
    color: string;
  }[];
}

export default function CategoryDetail({ onBack, onNavigate, categoryName, subscriptions }: CategoryDetailProps) {
  const formatCurrency = (amount: number) => `${amount.toFixed(2)}`;

  const handleSubscriptionClick = (subscription: any) => {
    // Convert subscription to the format expected by TransactionDetails
    const subscriptionData = {
      id: subscription.id,
      name: subscription.name,
      amount: subscription.amount,
      icon: subscription.icon,
      color: subscription.color
    };
    
    onNavigate('transaction-details', undefined, undefined, undefined, undefined, subscriptionData);
  };

  const getServiceIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'netflix':
        return 'N';
      case 'youtube':
        return '▶';
      case 'spotify':
        return '♪';
      case 'prime':
        return 'prime';
      case 'apple music':
        return '♪';
      case 'hulu':
        return 'hulu';
      case 'disney+':
        return 'D+';
      default:
        return '📺';
    }
  };

  const getServiceIconBackground = (name: string) => {
    switch (name.toLowerCase()) {
      case 'netflix':
        return 'bg-red-100';
      case 'youtube':
        return 'bg-red-100';
      case 'spotify':
        return 'bg-green-100';
      case 'prime':
        return 'bg-blue-100';
      case 'apple music':
        return 'bg-gray-100';
      case 'hulu':
        return 'bg-green-100';
      case 'disney+':
        return 'bg-blue-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getServiceIconColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'netflix':
        return 'text-red-600';
      case 'youtube':
        return 'text-red-600';
      case 'spotify':
        return 'text-green-600';
      case 'prime':
        return 'text-blue-600';
      case 'apple music':
        return 'text-gray-600';
      case 'hulu':
        return 'text-green-600';
      case 'disney+':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-background">
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
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">{categoryName}</h1>
        <div className="w-9" /> {/* Spacer for centering */}
      </div>

      {/* Subscription List */}
      <div className="p-4 space-y-3">
        {subscriptions.map((subscription) => (
          <Card key={subscription.id} className="bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleSubscriptionClick(subscription)}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">
                    Due {subscription.dueDate}
                  </p>
                  <h3 className="text-lg font-medium text-foreground mb-1">
                    {subscription.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(subscription.amount)}
                  </p>
                </div>
                <div className={`w-16 h-12 ${getServiceIconBackground(subscription.name)} rounded-lg flex items-center justify-center`}>
                  {subscription.name.toLowerCase() === 'netflix' && (
                    <span className="text-red-600 font-bold text-xl">N</span>
                  )}
                  {subscription.name.toLowerCase() === 'youtube' && (
                    <span className="text-red-600 font-bold text-xl">▶</span>
                  )}
                  {subscription.name.toLowerCase() === 'spotify' && (
                    <span className="text-green-600 font-bold text-xl">♪</span>
                  )}
                  {subscription.name.toLowerCase() === 'prime' && (
                    <span className="text-blue-600 font-bold text-xs">prime</span>
                  )}
                  {!['netflix', 'youtube', 'spotify', 'prime'].includes(subscription.name.toLowerCase()) && (
                    <span className={`${getServiceIconColor(subscription.name)} font-bold text-lg`}>
                      {getServiceIcon(subscription.name)}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}