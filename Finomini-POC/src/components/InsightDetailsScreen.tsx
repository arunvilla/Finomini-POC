import { useState } from 'react';
import { ArrowLeft, Share2, ThumbsUp, ThumbsDown, TrendingUp, TrendingDown, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface InsightDetailsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
  insight: any;
}

// Mock supporting data
const mockSpendingTrend = [
  { month: 'Jan', amount: 450 },
  { month: 'Feb', amount: 520 },
  { month: 'Mar', amount: 480 },
  { month: 'Apr', amount: 410 },
  { month: 'May', amount: 380 },
  { month: 'Jun', amount: 350 }
];

const mockCategoryBreakdown = [
  { category: 'Fresh Produce', amount: 120, percentage: 34 },
  { category: 'Dairy & Eggs', amount: 85, percentage: 24 },
  { category: 'Meat & Seafood', amount: 90, percentage: 26 },
  { category: 'Pantry Items', amount: 55, percentage: 16 }
];

const mockRelatedTransactions = [
  {
    id: '1',
    date: '2025-01-25',
    merchant: 'Whole Foods Market',
    amount: 67.43,
    category: 'Groceries',
    icon: '🛒'
  },
  {
    id: '2',
    date: '2025-01-23',
    merchant: 'Trader Joe\'s',
    amount: 42.18,
    category: 'Groceries',
    icon: '🛒'
  },
  {
    id: '3',
    date: '2025-01-21',
    merchant: 'Safeway',
    amount: 78.92,
    category: 'Groceries',
    icon: '🛒'
  }
];

export default function InsightDetailsScreen({ onBack, onNavigate, insight }: InsightDetailsScreenProps) {
  const [feedback, setFeedback] = useState<'helpful' | 'not-helpful' | null>(null);

  const handleFeedback = (type: 'helpful' | 'not-helpful') => {
    setFeedback(type);
    // Here you would typically send feedback to your analytics service
  };

  const getDetailedExplanation = () => {
    switch (insight?.type) {
      case 'spending':
        return `Great job staying under budget! Your consistent effort in managing grocery expenses has really paid off. By spending $350 instead of your usual $400 this month, you've demonstrated excellent financial discipline.

This $50 savings represents a 12.5% reduction from your average monthly grocery spending. This kind of consistent saving can add up to $600 per year - enough for a nice vacation or emergency fund boost.

The key factors contributing to this success appear to be better meal planning and taking advantage of sales and discounts. Keep up this momentum!`;
      
      case 'security':
        return `We noticed an unusually large transaction at Downtown Coffee that's significantly higher than your typical spending pattern there. Your average purchase at coffee shops is around $8-12, but this transaction was $127.

This could be legitimate - perhaps you bought coffee for the office or hosted a meeting. However, it's always good to verify large or unusual transactions to ensure your account security.

If this transaction seems incorrect, you should contact your bank immediately to report potential fraud.`;
      
      default:
        return insight?.description || 'No additional details available for this insight.';
    }
  };

  const getActionButtons = () => {
    switch (insight?.type) {
      case 'spending':
        return [
          { label: 'View Grocery Budget', action: () => onNavigate('categories') },
          { label: 'See All Transactions', action: () => onNavigate('transactions') },
          { label: 'Adjust Budget', action: () => onNavigate('budgets') }
        ];
      
      case 'security':
        return [
          { label: 'Review Transaction', action: () => onNavigate('transactions') },
          { label: 'Contact Support', action: () => onNavigate('help-support') },
          { label: 'Security Settings', action: () => onNavigate('security-login') }
        ];
      
      case 'saving':
        return [
          { label: 'Add to Emergency Fund', action: () => onNavigate('goals') },
          { label: 'View Savings Goals', action: () => onNavigate('goals') },
          { label: 'Investment Options', action: () => onNavigate('accounts') }
        ];
      
      default:
        return [
          { label: 'View Related Data', action: () => onNavigate('dashboard') }
        ];
    }
  };

  if (!insight) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Insight Not Found</h2>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    );
  }

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
          
          <h1 className="text-lg font-semibold text-foreground">Insight Details</h1>
          
          <Button variant="ghost" size="icon" className="p-2">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Insight Card */}
        <div className="p-4">
          <Card className={`bg-gradient-to-br ${insight.bgGradient} border-0 shadow-lg`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <Badge variant="secondary" className="text-xs">
                  {insight.type.toUpperCase()}
                </Badge>
                <div className="text-3xl">{insight.icon}</div>
              </div>
              
              <h2 className="text-xl font-bold text-foreground mb-3">
                {insight.headline}
              </h2>
              
              <div className="text-center py-4 mb-4">
                <div 
                  className="text-3xl font-bold"
                  style={{ color: insight.color }}
                >
                  {insight.keyDataPoint}
                </div>
              </div>
              
              <p className="text-foreground/80 text-sm">
                {insight.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Explanation */}
        <div className="px-4 pb-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">What This Means</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-foreground/80 leading-relaxed">
                {getDetailedExplanation()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Supporting Visuals */}
        {insight.type === 'spending' && (
          <div className="px-4 pb-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Spending Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockSpendingTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Line 
                        type="monotone" 
                        dataKey="amount" 
                        stroke={insight.color} 
                        strokeWidth={2}
                        dot={{ fill: insight.color, strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">This Month:</span>
                    <div className="font-semibold text-green-600">$350</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Average:</span>
                    <div className="font-semibold">$400</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Category Breakdown */}
        {insight.type === 'spending' && (
          <div className="px-4 pb-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockCategoryBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{item.category}</span>
                          <span className="text-sm text-muted-foreground">${item.amount}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full"
                            style={{ 
                              width: `${item.percentage}%`,
                              backgroundColor: insight.color 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Key Metrics */}
        <div className="px-4 pb-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Key Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-lg text-foreground">$400</div>
                  <div className="text-muted-foreground">Monthly Average</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-lg text-foreground">15%</div>
                  <div className="text-muted-foreground">Savings Rate</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-lg text-foreground">23</div>
                  <div className="text-muted-foreground">Transactions</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-lg text-foreground">$15.22</div>
                  <div className="text-muted-foreground">Avg Per Trip</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Transactions */}
        <div className="px-4 pb-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Related Transactions</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onNavigate('transactions')}
                >
                  View All
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRelatedTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-lg">{transaction.icon}</div>
                      <div>
                        <div className="font-medium text-sm">{transaction.merchant}</div>
                        <div className="text-xs text-muted-foreground">{transaction.date}</div>
                      </div>
                    </div>
                    <div className="font-semibold">${transaction.amount}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="px-4 pb-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Take Action</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {getActionButtons().map((button, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-between"
                  onClick={button.action}
                >
                  {button.label}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Feedback Section */}
        <div className="px-4 pb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Was this insight helpful?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button
                  variant={feedback === 'helpful' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => handleFeedback('helpful')}
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Yes
                </Button>
                <Button
                  variant={feedback === 'not-helpful' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => handleFeedback('not-helpful')}
                >
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  No
                </Button>
              </div>
              {feedback && (
                <div className="mt-3 text-sm text-muted-foreground text-center">
                  Thank you for your feedback! This helps us improve.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}