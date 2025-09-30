import { useState, useMemo } from 'react';
import { ArrowLeft, Filter, Share, Eye, EyeOff, TrendingUp, TrendingDown, ChevronRight, ChevronDown, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface NetWorthScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

// Mock net worth historical data
const netWorthHistory = [
  { period: 'Jan', value: 145000, assets: 185000, liabilities: 40000 },
  { period: 'Feb', value: 148000, assets: 188000, liabilities: 40000 },
  { period: 'Mar', value: 152000, assets: 192000, liabilities: 40000 },
  { period: 'Apr', value: 155000, assets: 198000, liabilities: 43000 },
  { period: 'May', value: 158000, assets: 201000, liabilities: 43000 },
  { period: 'Jun', value: 162000, assets: 205000, liabilities: 43000 },
  { period: 'Jul', value: 165378, assets: 208500, liabilities: 43122 }
];

// Mock account data organized by categories
const accountsByCategory = {
  assets: {
    'Cash & Bank Accounts': [
      { id: '1', name: 'Chase Checking', value: 5584, institution: 'Chase Bank', type: 'checking' },
      { id: '2', name: 'High Yield Savings', value: 15420, institution: 'Marcus', type: 'savings' },
      { id: '3', name: 'Emergency Fund', value: 8500, institution: 'Manual', type: 'cash' }
    ],
    'Investments': [
      { id: '4', name: 'Fidelity 401(k)', value: 85678, institution: 'Fidelity', type: 'retirement' },
      { id: '5', name: 'Brokerage Account', value: 45200, institution: 'Schwab', type: 'brokerage' },
      { id: '6', name: 'Crypto Portfolio', value: 12800, institution: 'Coinbase', type: 'crypto' }
    ],
    'Real Estate': [
      { id: '7', name: 'Primary Residence', value: 425000, institution: 'Manual', type: 'real_estate' }
    ],
    'Other Assets': [
      { id: '8', name: '2019 Honda Civic', value: 18500, institution: 'Manual', type: 'vehicle' },
      { id: '9', name: 'Watch Collection', value: 5200, institution: 'Manual', type: 'collectible' }
    ]
  },
  liabilities: {
    'Credit Cards': [
      { id: '10', name: 'Chase Freedom Unlimited', value: 1378, institution: 'Chase', type: 'credit_card' },
      { id: '11', name: 'American Express Gold', value: 892, institution: 'American Express', type: 'credit_card' }
    ],
    'Loans': [
      { id: '12', name: 'Student Loan', value: 15200, institution: 'Nelnet', type: 'student_loan' },
      { id: '13', name: 'Auto Loan', value: 8950, institution: 'Honda Financial', type: 'auto_loan' }
    ],
    'Mortgages': [
      { id: '14', name: 'Primary Mortgage', value: 285450, institution: 'Wells Fargo', type: 'mortgage' }
    ]
  }
};

const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'];

export default function NetWorthScreen({ onBack, onNavigate }: NetWorthScreenProps) {
  const [showBalances, setShowBalances] = useState(true);
  const [timePeriod, setTimePeriod] = useState('1Y');
  const [expandedSections, setExpandedSections] = useState<string[]>(['assets', 'liabilities']);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedDataPoint, setSelectedDataPoint] = useState<any>(null);

  // Calculate totals
  const totalAssets = useMemo(() => {
    return Object.values(accountsByCategory.assets)
      .flat()
      .reduce((sum, account) => sum + account.value, 0);
  }, []);

  const totalLiabilities = useMemo(() => {
    return Object.values(accountsByCategory.liabilities)
      .flat()
      .reduce((sum, account) => sum + account.value, 0);
  }, []);

  const netWorth = totalAssets - totalLiabilities;
  const periodChange = { amount: 10116, percentage: 6.1 };

  // Prepare pie chart data
  const pieData = [
    { name: 'Assets', value: totalAssets, color: COLORS[0] },
    { name: 'Liabilities', value: totalLiabilities, color: COLORS[1] }
  ];

  const formatCurrency = (amount: number) => {
    if (!showBalances) return '••••••';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatCurrencyDetailed = (amount: number) => {
    if (!showBalances) return '••••••';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAccountClick = (account: any) => {
    onNavigate('account-details', { account });
  };

  const getCategoryTotal = (category: any[]) => {
    return category.reduce((sum, account) => sum + account.value, 0);
  };

  const getAccountIcon = (type: string) => {
    const icons: Record<string, string> = {
      checking: '🏦',
      savings: '💰',
      cash: '💵',
      retirement: '📈',
      brokerage: '📊',
      crypto: '₿',
      real_estate: '🏠',
      vehicle: '🚗',
      collectible: '💎',
      credit_card: '💳',
      student_loan: '🎓',
      auto_loan: '🚙',
      mortgage: '🏠'
    };
    return icons[type] || '💼';
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
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <h1 className="text-xl font-semibold text-gray-900">Net Worth</h1>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="p-2">
              <Filter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="p-2">
              <Share className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Current Net Worth Summary */}
        <div className="bg-white mx-4 mt-4 rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Current Net Worth</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowBalances(!showBalances)}
              className="p-1"
            >
              {showBalances ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="text-4xl font-bold text-gray-900 mb-3">
            {showBalances ? `$${netWorth.toLocaleString()}` : '••••••••'}
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-green-600 font-medium">
              {periodChange.percentage}% (+{formatCurrency(periodChange.amount)})
            </span>
            <span className="text-gray-500">last year</span>
          </div>
        </div>

        {/* Net Worth Trend Graph */}
        <div className="bg-white mx-4 mt-4 rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Net Worth Trend</h3>
          
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={netWorthHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="period" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Net Worth']}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Time Period Selector */}
          <div className="flex justify-center">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {['1M', '3M', '6M', '1Y', '3Y', '5Y', 'All'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimePeriod(period)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    timePeriod === period 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Assets vs. Liabilities Summary */}
        <div className="bg-white mx-4 mt-4 rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Assets vs. Liabilities</h3>
          
          <div className="flex items-center gap-6">
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-blue-900">Total Assets</span>
                </div>
                <span className="font-bold text-blue-900">
                  {formatCurrency(totalAssets)}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="font-medium text-red-900">Total Liabilities</span>
                </div>
                <span className="font-bold text-red-900">
                  {formatCurrency(totalLiabilities)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Lists */}
        <div className="space-y-4 mx-4 mt-4 pb-6">
          {/* Assets Section */}
          <Collapsible open={expandedSections.includes('assets')}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleSection('assets')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <div>
                        <CardTitle className="text-lg text-green-900">Assets</CardTitle>
                        <p className="text-sm text-green-600 font-semibold">
                          {formatCurrency(totalAssets)}
                        </p>
                      </div>
                    </div>
                    {expandedSections.includes('assets') ? 
                      <ChevronDown className="h-5 w-5 text-gray-400" /> : 
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    }
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0 space-y-4">
                  {Object.entries(accountsByCategory.assets).map(([categoryName, accounts]) => (
                    <Collapsible 
                      key={categoryName}
                      open={expandedCategories.includes(categoryName)}
                    >
                      <CollapsibleTrigger asChild>
                        <div 
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => toggleCategory(categoryName)}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{categoryName}</span>
                            <Badge variant="secondary" className="text-xs">
                              {accounts.length}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">
                              {formatCurrency(getCategoryTotal(accounts))}
                            </span>
                            {expandedCategories.includes(categoryName) ? 
                              <ChevronDown className="h-4 w-4 text-gray-400" /> : 
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            }
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <div className="mt-2 space-y-2">
                          {accounts.map((account) => (
                            <div 
                              key={account.id}
                              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors ml-4"
                              onClick={() => handleAccountClick(account)}
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-lg">{getAccountIcon(account.type)}</span>
                                <div>
                                  <div className="font-medium text-gray-900">{account.name}</div>
                                  <div className="text-sm text-gray-500">{account.institution}</div>
                                </div>
                              </div>
                              <div className="font-semibold text-gray-900">
                                {formatCurrencyDetailed(account.value)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Liabilities Section */}
          <Collapsible open={expandedSections.includes('liabilities')}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleSection('liabilities')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <TrendingDown className="h-5 w-5 text-red-600" />
                      <div>
                        <CardTitle className="text-lg text-red-900">Liabilities</CardTitle>
                        <p className="text-sm text-red-600 font-semibold">
                          {formatCurrency(totalLiabilities)}
                        </p>
                      </div>
                    </div>
                    {expandedSections.includes('liabilities') ? 
                      <ChevronDown className="h-5 w-5 text-gray-400" /> : 
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    }
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0 space-y-4">
                  {Object.entries(accountsByCategory.liabilities).map(([categoryName, accounts]) => (
                    <Collapsible 
                      key={categoryName}
                      open={expandedCategories.includes(categoryName)}
                    >
                      <CollapsibleTrigger asChild>
                        <div 
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => toggleCategory(categoryName)}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{categoryName}</span>
                            <Badge variant="secondary" className="text-xs">
                              {accounts.length}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">
                              {formatCurrency(getCategoryTotal(accounts))}
                            </span>
                            {expandedCategories.includes(categoryName) ? 
                              <ChevronDown className="h-4 w-4 text-gray-400" /> : 
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            }
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <div className="mt-2 space-y-2">
                          {accounts.map((account) => (
                            <div 
                              key={account.id}
                              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors ml-4"
                              onClick={() => handleAccountClick(account)}
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-lg">{getAccountIcon(account.type)}</span>
                                <div>
                                  <div className="font-medium text-gray-900">{account.name}</div>
                                  <div className="text-sm text-gray-500">{account.institution}</div>
                                </div>
                              </div>
                              <div className="font-semibold text-red-600">
                                {formatCurrencyDetailed(account.value)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>

        {/* Key Insights */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 mx-4 mb-6 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Info className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-2">Key Insights</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <p>• Your net worth has grown by 6.1% this quarter, primarily driven by investment gains in your retirement accounts.</p>
                <p>• Consider paying down your highest interest credit card ($1,378 balance) to accelerate debt reduction.</p>
                <p>• Your asset allocation shows 68% in real estate and investments - you're well-diversified for long-term growth.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}