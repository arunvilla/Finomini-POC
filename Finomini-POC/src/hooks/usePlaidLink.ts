// React hook for Plaid Link integration

import { useCallback, useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { plaidApiService } from '../services/plaid/PlaidApiService';
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
  const [linkToken, setLinkToken] = useState<string | null>(null);

  const {
    addTransaction,
    addAccount,
    addInvestment,
    setLoading,
    setError: setStoreError
  } = useAppStore();

  // Initialize Plaid Link token on component mount
  useEffect(() => {
    const initializePlaid = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Try to get token from backend, fallback to mock for development
        try {
          const token = await plaidApiService.createLinkToken();
          setLinkToken(token);
        } catch (backendError) {
          console.warn('Backend not available, using mock mode for development');
          // Use mock token for development when backend is not running
          setLinkToken('link-sandbox-mock-token-' + Date.now());
        }
      } catch (err) {
        const error = err as AppError;
        setError(error);
        setStoreError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializePlaid();
  }, [setStoreError]);

  // Enhanced success handler
  const handleSuccess = useCallback(async (public_token: string, metadata: any) => {
    try {
      setIsLoading(true);
      setError(null);
      setStoreError(null);

      console.log('Plaid Link successful connection:', metadata);

      // Exchange public token for access token
      const { access_token } = await plaidApiService.exchangePublicToken(public_token);

      // Sync initial data
      await syncDataForToken(access_token);

    } catch (err) {
      const error = err as AppError;
      setError(error);
      setStoreError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [setStoreError]);

  // Sync data for a specific token using production API
  const syncDataForToken = async (accessToken: string) => {
    try {
      setLoading(true);

      // Sync accounts
      const accounts = await plaidApiService.getAccounts(accessToken);
      accounts.forEach(account => addAccount(account));

      // Sync transactions
      const transactions = await plaidApiService.getTransactions(accessToken);
      transactions.forEach(transaction => addTransaction(transaction));

      // Sync investments (if available)
      try {
        const investments = await plaidApiService.getInvestments(accessToken);
        investments.forEach(investment => addInvestment(investment));
      } catch (investmentError) {
        // Investments might not be available for all account types
        console.log('Investments not available for this account type');
      }

      console.log(`Successfully synced data: ${accounts.length} accounts, ${transactions.length} transactions`);

    } catch (err) {
      console.error('Failed to sync data:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Use the Plaid Link hook with production configuration
  const plaidLinkConfig = linkToken ? {
    token: linkToken,
    onSuccess: handleSuccess,
    env: (process.env.REACT_APP_PLAID_ENV as 'sandbox' | 'development' | 'production') || 'sandbox',
    product: ['transactions', 'accounts', 'investments'] as const,
    countryCodes: ['US'] as const,
  } : {
    token: '',
    onSuccess: handleSuccess,
    env: 'sandbox' as const,
    product: ['transactions', 'accounts', 'investments'] as const,
    countryCodes: ['US'] as const,
  };

  const { open, ready } = usePlaidLink(plaidLinkConfig);

  // Sync data for all connected accounts or a specific one
  const syncData = useCallback(async (accessToken?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const tokensToSync = accessToken
        ? [accessToken]
        : plaidApiService.getConnectedTokens();

      for (const token of tokensToSync) {
        await syncDataForToken(token);
      }

    } catch (err) {
      const error = err as AppError;
      setError(error);
      setStoreError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [setStoreError, setLoading, addAccount, addTransaction, addInvestment]);

  // Disconnect an account
  const disconnectAccount = useCallback(async (accessToken: string) => {
    try {
      setIsLoading(true);
      setError(null);

      await plaidApiService.removeItem(accessToken);

      console.log('Account disconnected successfully');

    } catch (err) {
      const error = err as AppError;
      setError(error);
      setStoreError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [setStoreError]);

  // Get account summary with financial metrics (simplified for production)
  const getAccountSummary = useCallback(async (accessToken: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Get accounts and investments to calculate summary
      const accounts = await plaidApiService.getAccounts(accessToken);
      const investments = await plaidApiService.getInvestments(accessToken);

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
          totalGainLoss: 0, // Will be calculated when we have cost basis data
          totalGainLossPercent: 0,
        },
      };

    } catch (err) {
      const error = err as AppError;
      setError(error);
      setStoreError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setStoreError]);

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
    if (linkToken && ready && open) {
      open();
    } else {
      console.warn('Plaid Link not ready - no link token or not ready');
    }
  };

  return {
    open: openFunction,
    ready: ready && !!linkToken,
    error,
    isLoading,
    isConnected: plaidApiService.isConnected(),
    connectedInstitutions: plaidApiService.getConnectedInstitutions(),
    syncData,
    disconnectAccount,
    getAccountSummary,
    startPeriodicSync,
    stopPeriodicSync,
  };
};

export default usePlaidLinkHook;