import { useState, useMemo } from 'react';
import { ArrowLeft, Calendar, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface MerchantTrendScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
  merchantName?: string;
}

// Mock transaction data for the merchant across multiple months
const generateMerchantTransactions = (merchantName: string) => [
  {
    id: '1',
    merchant: merchantName,
    amount: -25.47,
    date: new Date('2024-12-27'),
    category: 'Food & Dining',
    account: 'Chase Freedom ••••4526',
    notes: 'Lunch meeting',
    tags: ['Work']
  },
  {
    id: '2',
    merchant: merchantName,
    amount: -18.95,
    date: new Date('2024-12-15'),
    category: 'Food & Dining',
    account: 'Chase Freedom ••••4526',
    notes: 'Morning coffee',
    tags: ['Personal']
  },
  {
    id: '3',
    merchant: merchantName,
    amount: -22.30,
    date: new Date('2024-12-03'),
    category: 'Food & Dining',
    account: 'Chase Freedom ••••4526',
    notes: 'Team breakfast',
    tags: ['Work']
  },
  {
    id: '4',
    merchant: merchantName,
    amount: -31.25,
    date: new Date('2024-11-28'),
    category: 'Food & Dining',
    account: 'Chase Freedom ••••4526',
    notes: 'Client dinner',
    tags: ['Work']
  },
  {
    id: '5',
    merchant: merchantName,
    amount: -15.60,
    date: new Date('2024-11-18'),
    category: 'Food & Dining',
    account: 'Chase Freedom ••••4526',
    notes: 'Quick bite',
    tags: ['Personal']
  },
  {
    id: '6',
    merchant: merchantName,
    amount: -42.80,
    date: new Date('2024-11-08'),
    category: 'Food & Dining',
    account: 'Chase Freedom ••••4526',
    notes: 'Birthday dinner',
    tags: ['Personal']
  },
  {
    id: '7',
    merchant: merchantName,
    amount: -19.95,
    date: new Date('2024-10-25'),
    category: 'Food & Dining',
    account: 'Chase Freedom ••••4526',
    notes: 'Coffee and pastry',
    tags: ['Personal']
  },
  {
    id: '8',
    merchant: merchantName,
    amount: -28.40,
    date: new Date('2024-10-12'),
    category: 'Food & Dining',
    account: 'Chase Freedom ••••4526',
    notes: 'Lunch with team',
    tags: ['Work']
  },
  {
    id: '9',
    merchant: merchantName,
    amount: -33.75,
    date: new Date('2024-10-05'),
    category: 'Food & Dining',
    account: 'Chase Freedom ••••4526',
    notes: 'Weekend brunch',
    tags: ['Personal']
  },
  {
    id: '10',
    merchant: merchantName,
    amount: -26.90,
    date: new Date('2024-09-28'),
    category: 'Food & Dining',
    account: 'Chase Freedom ••••4526',
    notes: 'Business lunch',
    tags: ['Work']
  },
  {
    id: '11',
    merchant: merchantName,
    amount: -21.45,
    date: new Date('2024-09-15'),
    category: 'Food & Dining',
    account: 'Chase Freedom ••••4526',
    notes: 'Date night',
    tags: ['Personal']
  },
  {
    id: '12',
    merchant: merchantName,
    amount: -17.80,
    date: new Date('2024-09-08'),
    category: 'Food & Dining',
    account: 'Chase Freedom ••••4526',
    notes: 'Morning coffee',
    tags: ['Personal']
  }
];

export default function MerchantTrendScreen({ onBack, onNavigate, merchantName = 'Starbucks Coffee' }: MerchantTrendScreenProps) {
  const [timeRange, setTimeRange] = useState('6months');
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  const transactions = useMemo(() => generateMerchantTransactions(merchantName), [merchantName]);

  // Group transactions by month for the chart
  const monthlyData = useMemo(() => {
    const monthGroups: { [key: string]: number } = {};
    const transactionCounts: { [key: string]: number } = {};

    transactions.forEach(transaction => {
      const monthKey = transaction.date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      monthGroups[monthKey] = (monthGroups[monthKey] || 0) + Math.abs(transaction.amount);
      transactionCounts[monthKey] = (transactionCounts[monthKey] || 0) + 1;
    });

    return Object.entries(monthGroups)
      .map(([month, amount]) => ({
        month,
        amount: Number(amount.toFixed(2)),
        transactions: transactionCounts[month] || 0
      }))
      .sort((a, b) => new Date(a.month + ' 1, 2024').getTime() - new Date(b.month + ' 1, 2024').getTime());
  }, [transactions]);

  // Calculate statistics
  const totalSpent = transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const averageTransaction = totalSpent / transactions.length;
  const transactionCount = transactions.length;
  
  // Calculate trend (comparing last 3 months to previous 3 months)
  const recentMonths = monthlyData.slice(-3);
  const previousMonths = monthlyData.slice(-6, -3);
  const recentTotal = recentMonths.reduce((sum, m) => sum + m.amount, 0);
  const previousTotal = previousMonths.reduce((sum, m) => sum + m.amount, 0);
  const trendPercent = previousTotal > 0 ? ((recentTotal - previousTotal) / previousTotal) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            Total: <span className="font-semibold text-foreground">{formatCurrency(payload[0].value)}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Transactions: <span className="font-semibold text-foreground">{payload[0].payload.transactions}</span>
          </p>
        </div>
      );
    }
    return null;
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
          
          <h1 className="text-xl font-semibold text-foreground">Merchant Trend</h1>
          
          <div className="w-10" />
        </div>
        
        {/* Merchant Name */}
        <div className="mt-3 text-center">
          <h2 className="text-lg font-semibold text-foreground">{merchantName}</h2>
          <p className="text-sm text-muted-foreground">Spending analysis</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Total Spent</span>
              </div>
              <p className="text-xl font-bold text-foreground">{formatCurrency(totalSpent)}</p>
              <p className="text-xs text-muted-foreground mt-1">{transactionCount} transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {trendPercent >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span className="text-sm font-medium text-muted-foreground">Trend</span>
              </div>
              <p className={`text-xl font-bold ${trendPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trendPercent >= 0 ? '+' : ''}{trendPercent.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">vs. previous period</p>
            </CardContent>
          </Card>
        </div>

        {/* Average Transaction */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Transaction</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(averageTransaction)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground">Frequency</p>
                <p className="text-lg font-semibold text-foreground">
                  {(transactionCount / 6).toFixed(1)}/month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart Controls */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Spending Trend</h3>
          <div className="flex items-center gap-2">
            <Select value={chartType} onValueChange={(value: 'line' | 'bar') => setChartType(value)}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Line</SelectItem>
                <SelectItem value="bar">Bar</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">3M</SelectItem>
                <SelectItem value="6months">6M</SelectItem>
                <SelectItem value="1year">1Y</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Chart */}
        <Card>
          <CardContent className="p-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'line' ? (
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                    />
                  </LineChart>
                ) : (
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="amount" 
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Transaction History</h3>
            <Badge variant="secondary">{transactions.length} transactions</Badge>
          </div>

          <div className="space-y-2">
            {transactions.map((transaction) => (
              <Card 
                key={transaction.id}
                className="hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => onNavigate('transaction-details-screen', { transaction })}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-foreground">{transaction.merchant}</p>
                        <p className="font-semibold text-foreground">
                          {formatCurrency(transaction.amount)}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{transaction.category} • {transaction.account}</span>
                        <span>{formatDate(transaction.date)}</span>
                      </div>

                      {/* Tags and Notes */}
                      <div className="flex items-center gap-2 mt-2">
                        {transaction.tags && transaction.tags.length > 0 && (
                          <div className="flex gap-1">
                            {transaction.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        {transaction.notes && (
                          <p className="text-xs text-muted-foreground italic">
                            {transaction.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Insights Card */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Spending Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <p className="text-muted-foreground">
                • You spend an average of <span className="font-semibold text-foreground">{formatCurrency(averageTransaction)}</span> per visit to {merchantName}
              </p>
              <p className="text-muted-foreground">
                • Your spending has {trendPercent >= 0 ? 'increased' : 'decreased'} by <span className="font-semibold text-foreground">{Math.abs(trendPercent).toFixed(1)}%</span> recently
              </p>
              <p className="text-muted-foreground">
                • Most transactions are tagged as <span className="font-semibold text-foreground">
                  {transactions.reduce((acc, t) => {
                    const tag = t.tags?.[0] || 'Personal';
                    acc[tag] = (acc[tag] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>).hasOwnProperty('Work') ? 'Work' : 'Personal'}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}