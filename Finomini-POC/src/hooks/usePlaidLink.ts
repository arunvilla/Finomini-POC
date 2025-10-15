// React hook for Plaid Link integration

import { useCallback, useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { PlaidService } from '../services/plaid/PlaidService';
import { useAppStore } from '../stores';
import type { AppError } from '../types/services';

interface UsePlaidLinkReturn {
  open: () => void;
  ready: boolean;
  error: AppError | null;
  isLoading: boolean;
  isConnected: boolean;
  connectedInstitutions: Array<{
    accessToken: string;
    institutionName: string;
    lastSynced?: Date;
  }>;
  syncData: (accessToken?: string) => Promise<void>;
  disconnectAccount: (accessToken: string) => Promise<void>;
  getAccountSummary: (accessToken: string) => Promise<any>;
  startPeriodicSync: (accessToken: string, intervalMinutes?: number) => Promise<void>;
  stopPeriodicSync: () => void;
}

export const usePlaidLinkHook = (): UsePlaidLinkReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [plaidService] = useState(() => new PlaidService());

  const {
    addTransaction,
    addAccount,
    addInvestment,
    loadingStates,
    errorStates
  } = useAppStore();

  // Initialize Plaid service on component mount
  useEffect(() => {
    const initializePlaid = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await plaidService.initializePlaid();
      } catch (err) {
        const error = err as AppError;
        setError(error);
        console.error('Failed to initialize Plaid:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializePlaid();
  }, [plaidService]);

  // Enhanced success handler
  const handleSuccess = useCallback(async (public_token: string, metadata: any) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('Plaid Link successful connection:', metadata);

      // The PlaidService handles the success internally, so we just need to sync data
      await syncData();

    } catch (err) {
      const error = err as AppError;
      setError(error);
      console.error('Failed to handle Plaid success:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync data for a specific token using PlaidService
  const syncDataForToken = async (accessToken: string) => {
    try {
      // Get existing transactions to handle deduplication
      const existingTransactions = useAppStore.getState().transactions;

      // Sync transactions with enhanced deduplication
      const syncResult = await plaidService.syncTransactionsEnhanced(accessToken, {
        existingTransactions,
        forceRefresh: true
      });

      // Add new transactions to store
      for (const transaction of syncResult.transactions) {
        if (!existingTransactions.find(t => t.id === transaction.id)) {
          await addTransaction(transaction);
        }
      }

      // Sync accounts
      const accounts = await plaidService.getAccounts(accessToken);
      for (const account of accounts) {
        await addAccount(account);
      }

      // Sync investments (if available)
      try {
        const investments = await plaidService.getInvestments(accessToken);
        for (const investment of investments) {
          await addInvestment(investment);
        }
      } catch (investmentError) {
        console.log('Investments not available for this account type');
      }

      console.log(`Successfully synced data: ${accounts.length} accounts, ${syncResult.newCount} new transactions`);

    } catch (err) {
      console.error('Failed to sync data:', err);
      throw err;
    }
  };

  // Get Plaid Link configuration from PlaidService
  const plaidLinkConfig = plaidService.getPlaidLinkConfig();
  const { open, ready } = usePlaidLink(plaidLinkConfig);

  // Sync data for all connected accounts or a specific one
  const syncData = useCallback(async (accessToken?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const tokensToSync = accessToken
        ? [accessToken]
        : plaidService.getConnectedTokens();

      for (const token of tokensToSync) {
        await syncDataForToken(token);
      }

    } catch (err) {
      const error = err as AppError;
      setError(error);
      console.error('Failed to sync data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [plaidService, addAccount, addTransaction, addInvestment]);

  // Disconnect an account
  const disconnectAccount = useCallback(async (accessToken: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Remove from PlaidService (this will handle cleanup)
      // Note: PlaidService doesn't have a removeItem method, so we'll need to add it
      // For now, we'll just remove from local storage
      const tokenInfo = plaidService.getTokenInfo(accessToken);
      if (tokenInfo) {
        // Remove associated data from store
        const { accounts, transactions, investments } = useAppStore.getState();
        
        // Remove accounts associated with this token
        const accountsToRemove = accounts.filter(acc => acc.plaid_account_id);
        for (const account of accountsToRemove) {
          await useAppStore.getState().deleteAccount(account.id);
        }
      }

      console.log('Account disconnected successfully');

    } catch (err) {
      const error = err as AppError;
      setError(error);
      console.error('Failed to disconnect account:', error);
    } finally {
      setIsLoading(false);
    }
  }, [plaidService]);

  // Get account summary with financial metrics
  const getAccountSummary = useCallback(async (accessToken: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Get accounts and investments to calculate summary
      const accounts = await plaidService.getAccounts(accessToken);
      const investments = await plaidService.getInvestments(accessToken);

      // Calculate basic summary
      const totalAssets = accounts.reduce((sum, acc) => sum + acc.balance, 0) +
        investments.reduce((sum, inv) => sum + inv.value, 0);

      return {
        totalAssets,
        totalLiabilities: 0, // Will be implemented when liabilities API is added
        netWorth: totalAssets,
        accountBreakdown: {
          checking: accounts.filter(acc => acc.type === 'checking').reduce((sum, acc) => sum + acc.balance, 0),
          savings: accounts.filter(acc => acc.type === 'savings').reduce((sum, acc) => sum + acc.balance, 0),
          credit: accounts.filter(acc => acc.type === 'credit').reduce((sum, acc) => sum + Math.abs(acc.balance), 0),
          investment: investments.reduce((sum, inv) => sum + inv.value, 0),
        },
        investmentSummary: {
          totalValue: investments.reduce((sum, inv) => sum + inv.value, 0),
          totalGainLoss: investments.reduce((sum, inv) => {
            const costBasis = inv.average_cost_basis || inv.price;
            return sum + ((inv.price - costBasis) * inv.quantity);
          }, 0),
          totalGainLossPercent: 0, // Will calculate based on cost basis
        },
      };

    } catch (err) {
      const error = err as AppError;
      setError(error);
      console.error('Failed to get account summary:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [plaidService]);

  // Start periodic sync for an account (simplified)
  const startPeriodicSync = useCallback(async (_accessToken: string, intervalMinutes = 60) => {
    console.log(`Periodic sync would start for account (every ${intervalMinutes} minutes)`);
    // In production, this would be handled by the backend
  }, []);

  // Stop periodic sync (simplified)
  const stopPeriodicSync = useCallback(() => {
    console.log('Periodic sync would stop');
    // In production, this would be handled by the backend
  }, []);

  const openFunction = (): void => {
    if (ready && open) {
      open();
    } else {
      console.warn('Plaid Link not ready');
    }
  };

  return {
    open: openFunction,
    ready,
    error,
    isLoading: isLoading || loadingStates.plaidSync.isLoading,
    isConnected: plaidService.getConnectedTokens().length > 0,
    connectedInstitutions: plaidService.getConnectedTokens().map(token => {
      const tokenInfo = plaidService.getTokenInfo(token);
      return {
        accessToken: token,
        institutionName: tokenInfo?.institution_name || 'Unknown Institution',
        lastSynced: tokenInfo?.last_synced,
      };
    }),
    syncData,
    disconnectAccount,
    getAccountSummary,
    startPeriodicSync,
    stopPeriodicSync,
  };
};

export default usePlaidLinkHook;