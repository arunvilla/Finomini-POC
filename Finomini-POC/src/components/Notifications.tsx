import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Screen } from '../types';
import svgPaths from "../imports/svg-qll5vuxvpj";
import { 
  Settings, 
  Bell, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  Zap,
  Target,
  Wallet
} from 'lucide-react';

interface NotificationsProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'payment' | 'spending' | 'bill' | 'deposit' | 'budget' | 'goal' | 'security';
  timestamp: string;
  isRead: boolean;
  amount?: number;
  icon: React.ComponentType<any>;
  color: string;
}

export default function Notifications({ onBack, onNavigate }: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Payment Deposited',
      message: 'Your salary payment of $3,500.00 has been deposited to your checking account.',
      type: 'deposit',
      timestamp: '2 hours ago',
      isRead: false,
      amount: 3500.00,
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      id: '2',
      title: 'Budget Alert',
      message: 'You\'ve spent 85% of your dining budget for this month.',
      type: 'budget',
      timestamp: '4 hours ago',
      isRead: false,
      icon: AlertTriangle,
      color: 'bg-orange-500'
    },
    {
      id: '3',
      title: 'Bill Reminder',
      message: 'Your Netflix subscription payment of $10.00 is due tomorrow.',
      type: 'bill',
      timestamp: '1 day ago',
      isRead: true,
      amount: 10.00,
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      id: '4',
      title: 'Large Purchase',
      message: 'You spent $89.99 at Amazon.com. This is above your usual spending pattern.',
      type: 'spending',
      timestamp: '1 day ago',
      isRead: true,
      amount: 89.99,
      icon: TrendingUp,
      color: 'bg-red-500'
    },
    {
      id: '5',
      title: 'Goal Achievement',
      message: 'Congratulations! You\'ve reached 75% of your vacation savings goal.',
      type: 'goal',
      timestamp: '2 days ago',
      isRead: true,
      icon: Target,
      color: 'bg-purple-500'
    },
    {
      id: '6',
      title: 'Payment Processed',
      message: 'Your AT&T bill payment of $141.00 has been processed successfully.',
      type: 'payment',
      timestamp: '3 days ago',
      isRead: true,
      amount: 141.00,
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      id: '7',
      title: 'Low Balance Alert',
      message: 'Your checking account balance is below $500. Consider transferring funds.',
      type: 'spending',
      timestamp: '3 days ago',
      isRead: true,
      icon: Wallet,
      color: 'bg-yellow-500'
    },
    {
      id: '8',
      title: 'Cashback Earned',
      message: 'You earned $12.45 in cashback from your recent purchases.',
      type: 'deposit',
      timestamp: '1 week ago',
      isRead: true,
      amount: 12.45,
      icon: Zap,
      color: 'bg-green-500'
    }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative size-full bg-white">
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
      <div className="bg-white relative w-full">
        <div className="flex flex-row items-center p-4">
          <button onClick={onBack} className="w-[72px] flex items-center">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path d={svgPaths.p1c45f500} fill="#353945" />
            </svg>
          </button>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="font-semibold text-[18px] text-[#18312d]">Notifications</h1>
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onNavigate('notification-settings')}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6 overflow-y-auto" style={{ height: 'calc(100vh - 106px)' }}>
        <div className="space-y-4">
          {/* Notification Summary */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-[18px] text-[#18312d]">Recent Activity</h2>
              <p className="text-sm text-[#18312d] opacity-70">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {notifications.length} total
            </Badge>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  notification.isRead 
                    ? 'bg-white border-gray-200' 
                    : 'bg-blue-50 border-blue-200'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 ${notification.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <notification.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-[16px] text-[#18312d]">
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-[#18312d] opacity-70 mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#18312d] opacity-60">
                        {notification.timestamp}
                      </span>
                      {notification.amount && (
                        <span className={`text-sm font-medium ${
                          notification.type === 'deposit' ? 'text-green-600' : 'text-gray-900'
                        }`}>
                          {notification.type === 'deposit' ? '+' : ''}{formatCurrency(notification.amount)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State Message */}
          {notifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-[18px] text-[#18312d] mb-2">No notifications</h3>
              <p className="text-sm text-[#18312d] opacity-70">
                You're all caught up! New notifications will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}