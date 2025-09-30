import { ArrowLeft, AlertTriangle, TrendingUp, TrendingDown, Calendar, DollarSign, Bell, CheckCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface AICashFlowAlertScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export default function AICashFlowAlertScreen({ onBack, onNavigate }: AICashFlowAlertScreenProps) {
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  const cashFlowAlerts = [
    {
      id: '1',
      type: 'warning',
      title: 'Low Balance Warning',
      message: 'Your checking account will drop below $500 in 3 days based on upcoming transactions.',
      amount: -320,
      date: 'Dec 28, 2024',
      account: 'Chase Checking',
      urgency: 'high',
      action: 'Transfer funds or defer payments',
      relatedTransactions: [
        { name: 'Rent Payment', amount: -1200, date: 'Dec 28' },
        { name: 'Spotify', amount: -9.99, date: 'Dec 29' },
        { name: 'Salary Deposit', amount: 3200, date: 'Dec 30' }
      ]
    },
    {
      id: '2',
      type: 'opportunity',
      title: 'Surplus Cash Detected',
      message: 'You\'ll have $1,850 extra after all bills are paid this month. Consider investing or saving.',
      amount: 1850,
      date: 'Dec 31, 2024',
      account: 'Multiple Accounts',
      urgency: 'medium',
      action: 'Move to high-yield savings',
      relatedTransactions: [
        { name: 'Paycheck', amount: 3200, date: 'Dec 30' },
        { name: 'Remaining Bills', amount: -1350, date: 'Dec 31' }
      ]
    },
    {
      id: '3',
      type: 'insight',
      title: 'Unusual Spending Pattern',
      message: 'Your dining expenses are 40% higher than usual this month ($380 vs $270 average).',
      amount: 110,
      date: 'Dec 26, 2024',
      account: 'Credit Cards',
      urgency: 'low',
      action: 'Review dining transactions',
      relatedTransactions: [
        { name: 'Restaurant visits', amount: -380, date: 'This month' },
        { name: 'Monthly average', amount: -270, date: 'Typical' }
      ]
    }
  ];

  const handleDismissAlert = (alertId: string) => {
    setDismissedAlerts(prev => [...prev, alertId]);
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'opportunity':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'insight':
        return <Bell className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const activeAlerts = cashFlowAlerts.filter(alert => !dismissedAlerts.includes(alert.id));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-0 h-8 w-8"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-medium">Cash Flow Alerts</h1>
            <p className="text-sm text-muted-foreground">AI-powered financial monitoring</p>
          </div>
          <Badge variant="secondary" className="px-2 py-1">
            {activeAlerts.length} Active
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Alert Settings */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              <span className="font-medium">Alert Settings</span>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-muted rounded-lg">
              <div className="font-medium text-sm">3 Days</div>
              <div className="text-xs text-muted-foreground">Forecast Range</div>
            </div>
            <div className="text-center p-2 bg-muted rounded-lg">
              <div className="font-medium text-sm">$500</div>
              <div className="text-xs text-muted-foreground">Alert Threshold</div>
            </div>
            <div className="text-center p-2 bg-muted rounded-lg">
              <div className="font-medium text-sm">Active</div>
              <div className="text-xs text-muted-foreground">Notifications</div>
            </div>
          </div>
        </Card>

        {/* Active Alerts */}
        {activeAlerts.length > 0 ? (
          <div className="space-y-3">
            {activeAlerts.map((alert) => (
              <Card key={alert.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getAlertIcon(alert.type)}
                    <Badge className={getUrgencyColor(alert.urgency)} variant="secondary">
                      {alert.urgency.toUpperCase()}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDismissAlert(alert.id)}
                    className="p-1 h-6 w-6"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium mb-1">{alert.title}</h3>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className={`font-medium ${alert.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {alert.amount >= 0 ? '+' : ''}${Math.abs(alert.amount).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{alert.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Related Transactions</span>
                      <span className="text-xs text-muted-foreground">{alert.account}</span>
                    </div>
                    <div className="space-y-1">
                      {alert.relatedTransactions.map((transaction, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{transaction.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{transaction.date}</span>
                            <span className={transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      {alert.action}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onNavigate('ai-cash-flow-detail')}>
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="font-medium mb-2">All Caught Up!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              No cash flow alerts at the moment. Your finances look stable.
            </p>
            <Button variant="outline" size="sm" onClick={() => onNavigate('ai-cash-flow-alert-settings')}>
              Review Settings
            </Button>
          </Card>
        )}

        {/* Recent Activity */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Recent AI Analysis</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 bg-muted rounded-lg">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <div className="flex-1">
                <div className="text-sm">Cash flow analyzed</div>
                <div className="text-xs text-muted-foreground">2 minutes ago</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-muted rounded-lg">
              <Bell className="w-4 h-4 text-blue-500" />
              <div className="flex-1">
                <div className="text-sm">Alert threshold updated</div>
                <div className="text-xs text-muted-foreground">1 hour ago</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-muted rounded-lg">
              <TrendingDown className="w-4 h-4 text-orange-500" />
              <div className="flex-1">
                <div className="text-sm">Pattern deviation detected</div>
                <div className="text-xs text-muted-foreground">3 hours ago</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Test Navigation */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" onClick={() => onNavigate('ai-cash-flow-detail')}>
              View Forecast Details
            </Button>
            <Button variant="outline" size="sm" onClick={() => onNavigate('ai-cash-flow-alert-settings')}>
              Alert Settings
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}