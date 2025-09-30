import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import exampleImage from 'figma:asset/e609d322d22e05a38f0d498e06a30239f98e0a49.png';

interface MonthlySubscriptionCostProps {
  onBack: () => void;
  onNavigate: (screen: any, category?: any, tag?: any, date?: Date, subscriptions?: any[], subscription?: any, categoryName?: string, categorySubscriptions?: any[]) => void;
}

export default function MonthlySubscriptionCost({ onBack, onNavigate }: MonthlySubscriptionCostProps) {
  const [activeTab, setActiveTab] = useState<'category' | 'vendor'>('category');

  const categoryData = [
    {
      id: '1',
      name: 'Entertainment',
      percentage: 40,
      amount: 169.00,
      icon: '🎬',
      color: 'bg-blue-100',
      subscriptions: [
        {
          id: '1',
          name: 'Netflix',
          amount: 10.00,
          dueDate: 'Apr 20',
          icon: 'N',
          color: 'bg-red-100'
        },
        {
          id: '2',
          name: 'Youtube',
          amount: 8.99,
          dueDate: 'Apr 25',
          icon: '▶',
          color: 'bg-red-100'
        },
        {
          id: '3',
          name: 'Spotify',
          amount: 9.99,
          dueDate: 'Apr 25',
          icon: '♪',
          color: 'bg-green-100'
        },
        {
          id: '4',
          name: 'Prime',
          amount: 20.00,
          dueDate: 'May 2',
          icon: 'prime',
          color: 'bg-blue-100'
        }
      ]
    },
    {
      id: '2',
      name: 'Utilities',
      percentage: 60,
      amount: 201.00,
      icon: '💡',
      color: 'bg-pink-100',
      subscriptions: [
        {
          id: '5',
          name: 'AT&T',
          amount: 141.00,
          dueDate: 'Apr 25',
          icon: '📱',
          color: 'bg-blue-100'
        },
        {
          id: '6',
          name: 'Electric Bill',
          amount: 60.00,
          dueDate: 'May 5',
          icon: '⚡',
          color: 'bg-yellow-100'
        }
      ]
    }
  ];

  const vendorData = [
    {
      id: '1',
      name: 'Walmart',
      category: 'Utilities',
      amount: 141.00,
      dueDate: 'Apr 25, 2025',
      icon: '🏪',
      color: 'bg-blue-100'
    },
    {
      id: '2',
      name: 'Walmart',
      category: 'Utilities',
      amount: 60.00,
      dueDate: 'May 5, 2025',
      icon: '💡',
      color: 'bg-gray-100'
    },
    {
      id: '3',
      name: 'Netflix',
      category: 'Entertainment',
      amount: 10.00,
      dueDate: 'Apr 20, 2025',
      icon: '📺',
      color: 'bg-red-100'
    },
    {
      id: '4',
      name: 'Walmart',
      category: 'Entertainment',
      amount: 20.00,
      dueDate: 'May 2, 2025',
      icon: '📦',
      color: 'bg-blue-100'
    },
    {
      id: '5',
      name: 'Walmart',
      category: 'Entertainment',
      amount: 9.99,
      dueDate: 'Apr 25, 2025',
      icon: '🎵',
      color: 'bg-green-100'
    },
    {
      id: '6',
      name: 'Walmart',
      category: 'Entertainment',
      amount: 8.99,
      dueDate: 'Apr 25, 2025',
      icon: '📺',
      color: 'bg-red-100'
    }
  ];

  const formatCurrency = (amount: number) => `${amount.toFixed(2)}`;

  const handleCategoryClick = (category: any) => {
    onNavigate('category-detail', undefined, undefined, undefined, undefined, undefined, category.name, category.subscriptions);
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
        <h1 className="text-lg font-semibold">Monthly Subscription Cost</h1>
        <div className="w-9" />
      </div>

      <div className="p-6 space-y-6">
        {/* Summary */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Subscription Cost</p>
              <p className="text-2xl font-semibold">$370.00</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Subscriptions</p>
              <p className="text-2xl font-semibold">6</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex rounded-full h-2 overflow-hidden">
            <div className="bg-blue-300 flex-[40]" />
            <div className="bg-pink-300 flex-[60]" />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-100 rounded-full p-1 flex">
          <button
            onClick={() => setActiveTab('category')}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'category'
                ? 'bg-green-700 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Category
          </button>
          <button
            onClick={() => setActiveTab('vendor')}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'vendor'
                ? 'bg-green-700 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Vendor
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'category' ? (
            // Category View
            categoryData.map((category) => (
              <Card key={category.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleCategoryClick(category)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-medium text-gray-600">
                      {category.percentage}%
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(category.amount)}
                      </p>
                    </div>
                  </div>
                  <div className={`w-16 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            // Vendor View
            vendorData.map((vendor) => (
              <Card key={vendor.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 ${vendor.color} rounded-full flex items-center justify-center`}>
                      <span className="text-lg">{vendor.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{vendor.name}</h3>
                      <p className="text-sm text-muted-foreground">{vendor.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(vendor.amount)}</p>
                    <p className="text-xs text-muted-foreground">Due: {vendor.dueDate}</p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}