// Plaid-powered financial dashboard component

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Building2,
  RefreshCw,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { usePlaidLinkHook } from '../hooks/usePlaidLink';
import { formatCurrency, formatDate } from '../utils';

interface PlaidDashboardProps {
  className?: string;
}

interface AccountSummary {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  accountBreakdown: {
    checking: number;
    savings: number;
    credit: number;
    investment: number;
  };
  investmentSummary: {
    totalValue: number;
    totalGainLoss: number;
    totalGainLossPercent: number;
  };
}

export const PlaidDashboard: React.FC<PlaidDashboardProps> = ({ className }) => {
  const {
    isConnected,
    connectedInstitutions,
    getAccountSummary,
    syncData,
    isLoading,
    error,
  } = usePlaidLinkHook();

  const [summaries, setSummaries] = useState<Map<string, AccountSummary>>(new Map());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showBalances, setShowBalances] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  // Load account summaries on mount and when institutions change
  useEffect(() => {
    if (isConnected && connectedInstitutions.length > 0) {
      loadAccountSummaries();
    }
  }, [isConnected, connectedInstitutions.length]);

  const loadAccountSummaries = async () => {
    const newSummaries = new Map<string, AccountSummary>();
    
    for (const institution of connectedInstitutions) {
      try {
        const summary = await getAccountSummary(institution.accessToken);
        newSummaries.set(institution.accessToken, summary);
      } catch (error) {
        console.error(`Failed to load summary for ${institution.institutionName}:`, error);
      }
    }
    
    setSummaries(newSummaries);
    setLastRefresh(new Date());
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Sync data for all connected accounts
      await syncData();
      // Reload summaries after sync
      await loadAccountSummaries();
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Calculate combined totals across all accounts
  const getCombinedTotals = (): AccountSummary => {
    const combined: AccountSummary = {
      totalAssets: 0,
      totalLiabilities: 0,
      netWorth: 0,
      accountBreakdown: {
        checking: 0,
        savings: 0,
        credit: 0,
        investment: 0,
      },
      investmentSummary: {
        totalValue: 0,
        totalGainLoss: 0,
        totalGainLossPercent: 0,
      },
    };

    Array.from(summaries.values()).forEach(summary => {
      combined.totalAssets += summary.totalAssets;
      combined.totalLiabilities += summary.totalLiabilities;
      combined.netWorth += summary.netWorth;
      
      combined.accountBreakdown.checking += summary.accountBreakdown.checking;
      combined.accountBreakdown.savings += summary.accountBreakdown.savings;
      combined.accountBreakdown.credit += summary.accountBreakdown.credit;
      combined.accountBreakdown.investment += summary.accountBreakdown.investment;
      
      combined.investmentSummary.totalValue += summary.investmentSummary.totalValue;
      combined.investmentSummary.totalGainLoss += summary.investmentSummary.totalGainLoss;
    });

    // Calculate weighted average for investment percentage
    if (combined.investmentSummary.totalValue > 0) {
      let weightedGainLoss = 0;
      Array.from(summaries.values()).forEach(summary => {
        const weight = summary.investmentSummary.totalValue / combined.investmentSummary.totalValue;
        weightedGainLoss += weight * summary.investmentSummary.totalGainLossPercent;
      });
      combined.investmentSummary.totalGainLossPercent = weightedGainLoss;
    }

    return combined;
  };

  const formatBalance = (amount: number): string => {
    return showBalances ? formatCurrency(amount) : '••••••';
  };

  if (!isConnected) {
    return (
      <Card className={className}>
        <CardContent className="p-6 text-center">
          <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Connected Accounts</h3>
          <p className="text-gray-600">
            Connect your bank accounts to see your financial overview
          </p>
        </CardContent>
      </Card>
    );
  }

  const combinedTotals = getCombinedTotals();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Financial Overview</h2>
          <p className="text-gray-600">
            {lastRefresh && `Last updated: ${formatDate(lastRefresh)}`}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBalances(!showBalances)}
          >
            {showBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing || isLoading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-red-800">{error.message}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Net Worth Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatBalance(combinedTotals.totalAssets)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Liabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatBalance(combinedTotals.totalLiabilities)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Net Worth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${combinedTotals.netWorth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatBalance(combinedTotals.netWorth)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5" />
            Account Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Checking</div>
              <div className="text-lg font-semibold">
                {formatBalance(combinedTotals.accountBreakdown.checking)}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Savings</div>
              <div className="text-lg font-semibold">
                {formatBalance(combinedTotals.accountBreakdown.savings)}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Credit Cards</div>
              <div className="text-lg font-semibold text-red-600">
                {formatBalance(combinedTotals.accountBreakdown.credit)}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Investments</div>
              <div className="text-lg font-semibold">
                {formatBalance(combinedTotals.accountBreakdown.investment)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Summary */}
      {combinedTotals.investmentSummary.totalValue > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Investment Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Value</div>
                <div className="text-xl font-semibold">
                  {formatBalance(combinedTotals.investmentSummary.totalValue)}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Gain/Loss</div>
                <div className={`text-xl font-semibold flex items-center ${
                  combinedTotals.investmentSummary.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {combinedTotals.investmentSummary.totalGainLoss >= 0 ? (
                    <TrendingUp className="mr-1 h-4 w-4" />
                  ) : (
                    <TrendingDown className="mr-1 h-4 w-4" />
                  )}
                  {formatBalance(Math.abs(combinedTotals.investmentSummary.totalGainLoss))}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-1">Percentage</div>
                <div className={`text-xl font-semibold ${
                  combinedTotals.investmentSummary.totalGainLossPercent >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {showBalances 
                    ? `${combinedTotals.investmentSummary.totalGainLossPercent >= 0 ? '+' : ''}${combinedTotals.investmentSummary.totalGainLossPercent.toFixed(2)}%`
                    : '••••%'
                  }
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Connected Institutions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="mr-2 h-5 w-5" />
            Connected Institutions ({connectedInstitutions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {connectedInstitutions.map((institution) => (
              <div
                key={institution.accessToken}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-medium">{institution.institutionName}</div>
                  <div className="text-sm text-gray-600">
                    {institution.lastSynced 
                      ? `Last synced: ${formatDate(institution.lastSynced)}`
                      : 'Never synced'
                    }
                  </div>
                </div>
                
                <Badge variant="secondary">
                  Connected
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaidDashboard;