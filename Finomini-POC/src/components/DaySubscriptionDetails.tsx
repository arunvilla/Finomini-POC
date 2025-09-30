import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import exampleImage from 'figma:asset/012533a0055fc58046286d5d4d4f7ee31027c9bc.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Subscription {
  id: string;
  name: string;
  amount: number;
  icon: string;
  color: string;
}

interface DaySubscriptionDetailsProps {
  onBack: () => void;
  selectedDate: Date;
  subscriptions: Subscription[];
  onNavigate: (screen: any, category?: any, tag?: any, date?: Date, subscriptions?: any[], subscription?: any) => void;
}

export default function DaySubscriptionDetails({ onBack, selectedDate, subscriptions, onNavigate }: DaySubscriptionDetailsProps) {
  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const total = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);

  const getSubscriptionIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'youtube':
        return '📺';
      case 'at&t':
        return '📱';
      case 'spotify':
        return '🎵';
      case 'netflix':
        return '🎬';
      case 'apple music':
        return '🎧';
      default:
        return '💳';
    }
  };

  const getSubscriptionColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'youtube':
        return 'bg-red-500';
      case 'at&t':
        return 'bg-blue-500';
      case 'spotify':
        return 'bg-green-500';
      case 'netflix':
        return 'bg-red-600';
      case 'apple music':
        return 'bg-gray-800';
      default:
        return 'bg-gray-500';
    }
  };

  const handleSubscriptionClick = (subscription: Subscription) => {
    onNavigate('transaction-details', undefined, undefined, selectedDate, undefined, subscription);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Subscriptions</h1>
        <div className="w-9" /> {/* Spacer for centering */}
      </div>

      <div className="p-6 space-y-6">
        {/* Total Amount */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Total: {formatCurrency(total)}
          </h2>
        </div>

        {/* Subscription Items */}
        <div className="space-y-4">
          {subscriptions.map((subscription) => (
            <Card key={subscription.id} className="bg-green-100 border-green-200 cursor-pointer hover:bg-green-200 transition-colors" onClick={() => handleSubscriptionClick(subscription)}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${getSubscriptionColor(subscription.name)} rounded-lg flex items-center justify-center text-white text-lg`}>
                    {getSubscriptionIcon(subscription.name)}
                  </div>
                  <span className="text-lg font-medium text-foreground">
                    {subscription.name}
                  </span>
                </div>
                <span className="text-lg font-semibold text-foreground">
                  {formatCurrency(subscription.amount)}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Date */}
        <div className="text-center pt-8">
          <p className="text-lg text-muted-foreground">
            {formatDate(selectedDate)}
          </p>
        </div>
      </div>
    </div>
  );
}