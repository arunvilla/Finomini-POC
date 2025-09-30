import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface UpcomingPaymentsListViewProps {
  onBack: () => void;
  onNavigate?: (screen: any, category?: any, tag?: any, date?: Date, subscriptions?: any[], subscription?: any) => void;
}

const upcomingPayments = [
  {
    id: '1',
    name: 'Netflix',
    amount: 10.00,
    dueDate: 'Apr 20',
    icon: 'N',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600'
  },
  {
    id: '2',
    name: 'Youtube',
    amount: 8.99,
    dueDate: 'Apr 25',
    icon: '▶',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600'
  },
  {
    id: '3',
    name: 'AT&T',
    amount: 141.00,
    dueDate: 'Apr 25',
    icon: '≈',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: '4',
    name: 'Spotify',
    amount: 9.99,
    dueDate: 'Apr 25',
    icon: '♪',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    id: '5',
    name: 'Prime',
    amount: 20.00,
    dueDate: 'May 2',
    icon: 'P',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600'
  },
  {
    id: '6',
    name: 'Enbridge',
    amount: 60.00,
    dueDate: 'May 5',
    icon: '⚡',
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-600'
  }
];

export default function UpcomingPaymentsListView({ onBack, onNavigate }: UpcomingPaymentsListViewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handlePaymentClick = (payment: any) => {
    const subscription = {
      id: payment.id,
      name: payment.name,
      amount: payment.amount,
      icon: payment.icon,
      color: payment.iconBg
    };
    
    const transactionDate = new Date(); // Current date for now
    onNavigate && onNavigate('transaction-details', undefined, undefined, transactionDate, undefined, subscription);
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
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg text-foreground">Upcoming Payments</h1>
        <div className="w-9" /> {/* Spacer for centering */}
      </div>

      {/* Payments List */}
      <div className="p-4 space-y-3 bg-gray-50">
        {upcomingPayments.map((payment) => (
          <div
            key={payment.id}
            className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handlePaymentClick(payment)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-sm text-gray-500 mb-1">
                  Due {payment.dueDate}
                </div>
                <div className="text-lg text-foreground mb-1">
                  {payment.name}
                </div>
                <div className="text-base text-gray-600">
                  {formatCurrency(payment.amount)}
                </div>
              </div>
              <div className={`w-14 h-14 ${payment.iconBg} rounded-xl flex items-center justify-center ml-4`}>
                <span className={`text-xl ${payment.iconColor}`}>
                  {payment.icon}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}