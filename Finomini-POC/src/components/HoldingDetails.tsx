import { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, DollarSign, Percent, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import type { Holding } from '../types';

interface HoldingDetailsProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
  holding: Holding | null;
}

// Mock price history data
const mockPriceHistory = [
  { period: '1D', price: 178.50 },
  { period: '2D', price: 179.20 },
  { period: '3D', price: 177.80 },
  { period: '4D', price: 180.10 },
  { period: '5D', price: 180.50 }
];

const mockLongerHistory = [
  { period: 'Jan', price: 165.00 },
  { period: 'Feb', price: 168.50 },
  { period: 'Mar', price: 171.20 },
  { period: 'Apr', price: 175.80 },
  { period: 'May', price: 178.90 },
  { period: 'Jun', price: 180.50 }
];

// Mock recent transactions for this holding
const mockRecentActivity = [
  {
    id: '1',
    type: 'buy',
    date: new Date(2025, 5, 15),
    quantity: 10,
    price: 175.50,
    total: 1755.00
  },
  {
    id: '2',
    type: 'buy',
    date: new Date(2025, 3, 20),
    quantity: 15,
    price: 168.20,
    total: 2523.00
  },
  {
    id: '3',
    type: 'dividend',
    date: new Date(2025, 2, 10),
    quantity: 0,
    price: 0,
    total: 12.50
  }
];

export default function HoldingDetails({ onBack, onNavigate, holding }: HoldingDetailsProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');

  if (!holding) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Holding Not Found</h2>
          <p className="text-gray-600 mb-4">The holding details could not be loaded.</p>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    );
  }

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
      year: 'numeric'
    });
  };

  const getKeyMetrics = () => {
    switch (holding.type) {
      case 'stock':
        return [
          { label: 'Market Cap', value: '$2.8T' },
          { label: 'P/E Ratio', value: '28.5' },
          { label: 'Dividend Yield', value: '0.5%' },
          { label: '52W High', value: '$198.23' },
          { label: '52W Low', value: '$164.08' }
        ];
      case 'crypto':
        return [
          { label: 'Market Cap', value: '$1.3T' },
          { label: '24h Volume', value: '$45.2B' },
          { label: 'Circulating Supply', value: '19.8M BTC' },
          { label: 'All-Time High', value: '$73,737' },
          { label: 'All-Time Low', value: '$67.81' }
        ];
      case 'etf':
        return [
          { label: 'Expense Ratio', value: '0.09%' },
          { label: 'Assets Under Mgmt', value: '$450B' },
          { label: 'Dividend Yield', value: '1.3%' },
          { label: '52W High', value: '$467.23' },
          { label: '52W Low', value: '$394.88' }
        ];
      default:
        return [];
    }
  };

  const getCurrentData = () => {
    return selectedTimeframe === '1W' || selectedTimeframe === '1D' ? mockPriceHistory : mockLongerHistory;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-center flex-1">{holding.name}</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Holding Summary */}
        <Card className="mx-4 mt-4">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{holding.icon}</div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-semibold text-gray-900">{holding.name}</h2>
                  {holding.ticker && (
                    <Badge variant="secondary">{holding.ticker}</Badge>
                  )}
                </div>
                
                <div className="text-sm text-gray-600 mb-3">
                  {holding.type.charAt(0).toUpperCase() + holding.type.slice(1)}
                </div>
                
                <div className="space-y-2">
                  <div>
                    <div className="text-sm text-gray-500">Current Value</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(holding.totalValue)}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Quantity: </span>
                      <span className="font-medium">{holding.quantity} {holding.type === 'stock' ? 'shares' : 'units'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Price: </span>
                      <span className="font-medium">{formatCurrency(holding.currentPrice)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                      holding.dailyChange >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {holding.dailyChange >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span>{holding.dailyChange >= 0 ? '+' : ''}{formatCurrency(holding.dailyChange)}</span>
                      <span>({holding.dailyChangePercent.toFixed(2)}%)</span>
                      <span className="text-gray-500 font-normal">today</span>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <span className="text-gray-500">Total Gain/Loss: </span>
                    <span className={`font-medium ${holding.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {holding.totalGainLoss >= 0 ? '+' : ''}{formatCurrency(holding.totalGainLoss)} ({holding.totalGainLossPercent.toFixed(1)}%)
                    </span>
                  </div>
                  
                  {holding.averageCostBasis && (
                    <div className="text-sm">
                      <span className="text-gray-500">Avg Cost Basis: </span>
                      <span className="font-medium">{formatCurrency(holding.averageCostBasis)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Chart */}
        <Card className="mx-4 mt-4">
          <CardHeader>
            <CardTitle className="text-base">Price Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={getCurrentData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="period" axisLine={false} tickLine={false} className="text-xs" />
                <YAxis axisLine={false} tickLine={false} className="text-xs" tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => [`$${value}`, 'Price']} />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            
            {/* Time Period Selector */}
            <div className="flex justify-center mt-4">
              <div className="flex bg-gray-100 rounded-lg p-1 text-xs">
                {['1D', '1W', '1M', '3M', 'YTD', '1Y', '5Y', 'Max'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedTimeframe(period)}
                    className={`px-2 py-1 rounded-md transition-colors ${
                      selectedTimeframe === period 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <Card className="mx-4 mt-4">
          <CardHeader>
            <CardTitle className="text-base">Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {getKeyMetrics().map((metric, index) => (
                <div key={index} className="text-sm">
                  <div className="text-gray-500 mb-1">{metric.label}</div>
                  <div className="font-semibold text-gray-900">{metric.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="mx-4 mt-4 mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Recent Activity</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => console.log('View all transactions for this holding')}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockRecentActivity.map((activity, index) => (
                <div key={activity.id}>
                  {index > 0 && <Separator />}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'buy' ? 'bg-green-100' :
                        activity.type === 'sell' ? 'bg-red-100' :
                        'bg-blue-100'
                      }`}>
                        {activity.type === 'buy' && <TrendingUp className="h-4 w-4 text-green-600" />}
                        {activity.type === 'sell' && <TrendingDown className="h-4 w-4 text-red-600" />}
                        {activity.type === 'dividend' && <DollarSign className="h-4 w-4 text-blue-600" />}
                      </div>
                      
                      <div>
                        <div className="font-medium text-gray-900 capitalize">
                          {activity.type}
                          {activity.quantity > 0 && (
                            <span className="text-gray-600 font-normal"> {activity.quantity} shares</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{formatDate(activity.date)}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {formatCurrency(activity.total)}
                      </div>
                      {activity.price > 0 && (
                        <div className="text-sm text-gray-500">
                          @ {formatCurrency(activity.price)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}