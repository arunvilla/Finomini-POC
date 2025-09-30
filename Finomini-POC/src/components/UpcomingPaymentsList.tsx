import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface UpcomingPaymentsListProps {
  onBack: () => void;
  onNavigate: (screen: any, category?: any, tag?: any, date?: Date, subscriptions?: any[], subscription?: any) => void;
}

export default function UpcomingPaymentsList({ onBack, onNavigate }: UpcomingPaymentsListProps) {
  const upcomingPayments = [
    {
      id: '1',
      name: 'Netflix',
      amount: 10.00,
      dueDate: 'Apr 20',
      icon: 'N',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      category: 'Entertainment'
    },
    {
      id: '2', 
      name: 'Youtube',
      amount: 8.99,
      dueDate: 'Apr 25',
      icon: '▶',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      category: 'Entertainment'
    },
    {
      id: '3',
      name: 'AT&T',
      amount: 141.00,
      dueDate: 'Apr 25',
      icon: '≈',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      category: 'Utilities'
    },
    {
      id: '4',
      name: 'Spotify',
      amount: 9.99,
      dueDate: 'Apr 25', 
      icon: '♪',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      category: 'Entertainment'
    },
    {
      id: '5',
      name: 'Prime',
      amount: 20.00,
      dueDate: 'May 2',
      icon: 'prime',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      category: 'Shopping'
    },
    {
      id: '6',
      name: 'Enbridge',
      amount: 60.00,
      dueDate: 'May 5',
      icon: '⚡',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600',
      category: 'Utilities'
    }
  ];

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

  const handlePaymentClick = (payment: any) => {
    const subscriptionData = {
      id: payment.id,
      name: payment.name,
      amount: payment.amount,
      icon: payment.icon,
      color: payment.iconBg,
      category: payment.category
    };
    
    onNavigate('transaction-details', undefined, undefined, undefined, undefined, subscriptionData);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-background border-b border-border/20">
        <Button
          variant="ghost"
          size="sm" 
          onClick={onBack}
          className="p-0 h-auto bg-transparent hover:bg-transparent"
        >
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </Button>
        <h1 className="text-lg font-medium text-foreground">Upcoming Payments</h1>
        <div className="w-6" />
      </div>

      {/* Payment List */}
      <div className="p-4 space-y-3">
        {upcomingPayments.map((payment) => (
          <Card 
            key={payment.id}
            className="bg-card shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handlePaymentClick(payment)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">
                    Due {payment.dueDate}
                  </p>
                  <h3 className="text-lg font-medium text-foreground mb-1">
                    {payment.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(payment.amount)}
                  </p>
                </div>
                <div className={`w-16 h-12 ${payment.iconBg} rounded-lg flex items-center justify-center`}>
                  {payment.icon === 'prime' ? (
                    <span className={`${payment.iconColor} font-bold text-xs`}>
                      {payment.icon}
                    </span>
                  ) : (
                    <span className={`${payment.iconColor} font-bold text-xl`}>
                      {payment.icon}
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