import { useState } from 'react';
import { ArrowLeft, Heart, Plus, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface CategoryDetailScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
  category?: any;
}

// Mock spending trend data
const spendingTrendData = [
  { month: 'Feb', amount: 400 },
  { month: 'Mar', amount: 600 }, 
  { month: 'Apr', amount: 500 },
  { month: 'May', amount: 800 },
  { month: 'Jun', amount: 900 }
];

// Mock subcategories
const mockSubcategories = [
  {
    id: '1',
    name: 'Car Wash',
    icon: '🚗',
    spent: 10,
    budget: 50,
    parentCategory: 'Transportation',
    bgColor: 'bg-green-100'
  },
  {
    id: '2', 
    name: 'Fuel',
    icon: '⛽',
    spent: 10,
    budget: 50,
    parentCategory: 'Transportation',
    bgColor: 'bg-green-100'
  },
  {
    id: '3',
    name: 'Car Wash',
    icon: '🚗',
    spent: 10,
    budget: 50,
    parentCategory: 'Transportation',
    bgColor: 'bg-green-100',
    isEditable: true
  }
];

export default function CategoryDetailScreen({ onBack, onNavigate, category }: CategoryDetailScreenProps) {
  const [isFavorite, setIsFavorite] = useState(category?.isFavorite || false);

  // Mock category data if none provided
  const mockCategory = {
    id: '4',
    name: 'Transportation',
    icon: '🚗',
    spent: 837,
    budget: 1000,
    monthlyLimit: 1000,
    bgColor: 'bg-purple-100'
  };

  const currentCategory = category || mockCategory;
  const progress = (currentCategory.spent / currentCategory.budget) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleSubcategoryClick = (subcategory: any) => {
    onNavigate?.('subcategory-detail-screen', { subcategory, parentCategory: currentCategory });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
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
          
          <h1 className="text-lg font-semibold text-foreground">{currentCategory.name}</h1>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleFavorite}
            className="p-2"
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Category Summary */}
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex flex-col items-center gap-4">
              <div className="text-6xl">{currentCategory.icon}</div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-3xl font-bold text-foreground">
                    {formatCurrency(currentCategory.spent)}
                    <span className="text-muted-foreground">.00</span>
                  </span>
                </div>
                <p className="text-muted-foreground">
                  Monthly Limit: {formatCurrency(currentCategory.monthlyLimit)}.00
                </p>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full">
                <div className="w-full bg-green-100 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spending Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Spending Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={spendingTrendData}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  className="text-xs"
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  className="text-xs"
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Amount']}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#9B5295" 
                  strokeWidth={3}
                  dot={{ fill: '#9B5295', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#9B5295', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sub Categories */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Sub Categories</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="p-2">
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="p-2">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {mockSubcategories.map((subcategory) => (
              <Card 
                key={subcategory.id}
                className={`${subcategory.bgColor} border border-primary/20 hover:shadow-md transition-all duration-200 cursor-pointer`}
                onClick={() => handleSubcategoryClick(subcategory)}
              >
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{subcategory.icon}</div>
                        <div className="text-right text-muted-foreground">
                          <p>{subcategory.parentCategory}</p>
                        </div>
                      </div>
                      <Heart className="h-6 w-6 text-muted-foreground" />
                    </div>

                    {/* Title and Amount */}
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-foreground">{subcategory.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">
                          {formatCurrency(subcategory.spent)} of {formatCurrency(subcategory.budget)}
                        </span>
                        {subcategory.isEditable && (
                          <div className="bg-card border border-muted rounded-lg px-2 py-1">
                            <span className="text-sm font-semibold text-foreground">
                              {formatCurrency(subcategory.budget)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}