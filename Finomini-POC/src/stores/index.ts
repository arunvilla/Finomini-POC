// Main Zustand store for the AI Finance Manager application

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  Transaction,
  Account,
  Investment,
  Budget,
  AIInsight,
  TransactionFilters,
  BudgetFilters,
  LoadingState,
  ErrorState,
  SyncStatus
} from '../types';
import { storageService } from '../services/storage';

// Helper functions
const generateId = (): string => crypto.randomUUID();
const now = (): Date => new Date();

// Default date range (last 30 days)
const getDefaultDateRange = () => {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 30);
  return { start, end };
};

// Initial loading state
const createInitialLoadingState = (): LoadingState => ({
  isLoading: false,
  operation: undefined,
  progress: undefined
});

// Initial error state
const createInitialErrorState = (): ErrorState => ({
  hasError: false,
  message: undefined,
  type: undefined,
  details: undefined
});

// Define the main application state interface
export interface AppState {
  // Core data
  transactions: Transaction[];
  accounts: Account[];
  investments: Investment[];
  budgets: Budget[];
  insights: AIInsight[];

  // Forecast data
  cashFlowPredictions: any[];
  budgetForecasts: any[];
  cashFlowAlerts: any[];

  // Loading states
  loadingStates: {
    transactions: LoadingState;
    accounts: LoadingState;
    budgets: LoadingState;
    investments: LoadingState;
    insights: LoadingState;
    plaidSync: LoadingState;
  };

  // Error states
  errorStates: {
    transactions: ErrorState;
    accounts: ErrorState;
    budgets: ErrorState;
    investments: ErrorState;
    insights: ErrorState;
    plaidSync: ErrorState;
  };

  // Sync status
  syncStatus: SyncStatus;

  // UI state
  selectedDateRange: {
    start: Date;
    end: Date;
  };
  selectedCategories: string[];
  currentScreen: string;

  // Filters
  transactionFilters: TransactionFilters;
  budgetFilters: BudgetFilters;

  // Initialization
  isInitialized: boolean;

  // Auto-sync state
  autoSyncInterval: NodeJS.Timeout | null;

  // Transaction actions
  addTransaction: (transaction: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  loadTransactions: () => Promise<void>;

  // Account actions
  addAccount: (account: Omit<Account, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateAccount: (id: string, updates: Partial<Account>) => Promise<void>;
  deleteAccount: (id: string) => Promise<void>;
  loadAccounts: () => Promise<void>;

  // Budget actions
  createBudget: (budget: Omit<Budget, 'id' | 'created_at' | 'updated_at' | 'current_spent'>) => Promise<void>;
  updateBudget: (id: string, updates: Partial<Budget>) => Promise<void>;
  deleteBudget: (id: string) => Promise<void>;
  loadBudgets: () => Promise<void>;

  // Investment actions
  addInvestment: (investment: Omit<Investment, 'id'>) => Promise<void>;
  updateInvestment: (id: string, updates: Partial<Investment>) => Promise<void>;
  deleteInvestment: (id: string) => Promise<void>;
  loadInvestments: () => Promise<void>;

  // Insight actions
  addInsight: (insight: Omit<AIInsight, 'id' | 'created_at'>) => Promise<void>;
  markInsightAsRead: (id: string) => Promise<void>;
  deleteInsight: (id: string) => Promise<void>;
  loadInsights: () => Promise<void>;

  // Async actions
  syncPlaidData: (accessToken?: string) => Promise<void>;
  generateInsights: () => Promise<void>;
  generateCashFlowForecast: () => Promise<void>;
  generateBudgetForecast: () => Promise<void>;

  // Filter actions
  setTransactionFilters: (filters: Partial<TransactionFilters>) => void;
  setBudgetFilters: (filters: Partial<BudgetFilters>) => void;
  clearFilters: () => void;

  // UI actions
  setDateRange: (start: Date, end: Date) => void;
  setSelectedCategories: (categories: string[]) => void;
  setCurrentScreen: (screen: string) => void;

  // Sync scheduling
  startAutoSync: (intervalMinutes?: number) => void;
  stopAutoSync: () => void;

  // Utility actions
  initializeStore: () => Promise<void>;
  clearAllData: () => Promise<void>;
  resetToDefaults: () => Promise<void>;

  // Computed getters
  getFilteredTransactions: () => Transaction[];
  getTotalBalance: () => number;
  getNetWorth: () => number;
  getInvestmentPerformance: () => {
    totalValue: number;
    totalGainLoss: number;
    totalGainLossPercent: number;
  };
}

// Create the main store
export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // Initial state
      transactions: [],
      accounts: [],
      investments: [],
      budgets: [],
      insights: [],

      // Initialize forecast data
      cashFlowPredictions: [],
      budgetForecasts: [],
      cashFlowAlerts: [],

      loadingStates: {
        transactions: createInitialLoadingState(),
        accounts: createInitialLoadingState(),
        budgets: createInitialLoadingState(),
        investments: createInitialLoadingState(),
        insights: createInitialLoadingState(),
        plaidSync: createInitialLoadingState(),
      },

      errorStates: {
        transactions: createInitialErrorState(),
        accounts: createInitialErrorState(),
        budgets: createInitialErrorState(),
        investments: createInitialErrorState(),
        insights: createInitialErrorState(),
        plaidSync: createInitialErrorState(),
      },

      syncStatus: {
        isActive: false,
        status: 'idle'
      },

      selectedDateRange: getDefaultDateRange(),
      selectedCategories: [],
      currentScreen: 'dashboard',
      transactionFilters: {},
      budgetFilters: {},
      isInitialized: false,
      autoSyncInterval: null,

      // Actions
      addTransaction: async (transactionData) => {
        const transaction: Transaction = {
          ...transactionData,
          id: generateId(),
          created_at: now(),
          updated_at: now(),
        };

        // Use AI categorization if category is not provided or has low confidence
        if (!transaction.category || (transaction.confidence_score ?? 0) < 0.8) {
          try {
            const { feedbackService } = await import('../services/ai/FeedbackService');
            
            const aiResult = await feedbackService.getImprovedSuggestion(
              transaction.description,
              transaction.merchant,
              transaction.amount
            );

            transaction.category = aiResult.category;
            transaction.confidence_score = aiResult.confidence;
          } catch (error) {
            console.warn('AI categorization failed, using fallback:', error);
            // Keep original category or use 'Other' as fallback
            transaction.category = transaction.category || 'Other';
            transaction.confidence_score = transaction.confidence_score || 0.5;
          }
        }

        await storageService.addTransaction(transaction);
        set((state) => ({ transactions: [...state.transactions, transaction] }));
      },

      updateTransaction: async (id, updates) => {
        const updatedData = { ...updates, updated_at: now() };
        await storageService.updateTransaction(id, updatedData);

        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updatedData } : t
          ),
        }));
      },

      deleteTransaction: async (id) => {
        await storageService.deleteTransaction(id);
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },

      loadTransactions: async () => {
        const transactions = await storageService.getTransactions();
        set({ transactions });
      },
      addAccount: async (accountData) => {
        const account: Account = {
          ...accountData,
          id: generateId(),
          created_at: now(),
          updated_at: now(),
        };

        await storageService.addAccount(account);
        set((state) => ({ accounts: [...state.accounts, account] }));
      },

      updateAccount: async (id, updates) => {
        const updatedData = { ...updates, updated_at: now() };
        await storageService.updateAccount(id, updatedData);

        set((state) => ({
          accounts: state.accounts.map((a) =>
            a.id === id ? { ...a, ...updatedData } : a
          ),
        }));
      },

      deleteAccount: async (id) => {
        await storageService.deleteAccount(id);
        set((state) => ({
          accounts: state.accounts.filter((a) => a.id !== id),
          transactions: state.transactions.filter((t) => t.account_id !== id),
          investments: state.investments.filter((i) => i.account_id !== id),
        }));
      },

      loadAccounts: async () => {
        const accounts = await storageService.getAccounts();
        set({ accounts });
      },

      createBudget: async (budgetData) => {
        const budget: Budget = {
          ...budgetData,
          id: generateId(),
          current_spent: 0,
          is_active: true,
          created_at: now(),
          updated_at: now(),
        };

        await storageService.addBudget(budget);
        set((state) => ({ budgets: [...state.budgets, budget] }));
      },

      updateBudget: async (id, updates) => {
        const updatedData = { ...updates, updated_at: now() };
        await storageService.updateBudget(id, updatedData);

        set((state) => ({
          budgets: state.budgets.map((b) =>
            b.id === id ? { ...b, ...updatedData } : b
          ),
        }));
      },

      deleteBudget: async (id) => {
        await storageService.deleteBudget(id);
        set((state) => ({
          budgets: state.budgets.filter((b) => b.id !== id),
        }));
      },

      loadBudgets: async () => {
        const budgets = await storageService.getBudgets();
        set({ budgets });
      },
      addInvestment: async (investmentData) => {
        const investment: Investment = {
          ...investmentData,
          id: generateId(),
        };

        await storageService.addInvestment(investment);
        set((state) => ({ investments: [...state.investments, investment] }));
      },

      updateInvestment: async (id, updates) => {
        const updatedData = { ...updates, last_updated: now() };
        await storageService.updateInvestment(id, updatedData);

        set((state) => ({
          investments: state.investments.map((i) =>
            i.id === id ? { ...i, ...updatedData } : i
          ),
        }));
      },

      deleteInvestment: async (id) => {
        await storageService.deleteInvestment(id);
        set((state) => ({
          investments: state.investments.filter((i) => i.id !== id),
        }));
      },

      loadInvestments: async () => {
        const investments = await storageService.getInvestments();
        set({ investments });
      },

      addInsight: async (insightData) => {
        const insight: AIInsight = {
          ...insightData,
          id: generateId(),
          created_at: now(),
        };

        await storageService.addInsight(insight);
        set((state) => ({ insights: [...state.insights, insight] }));
      },

      markInsightAsRead: async (id) => {
        await storageService.markInsightAsRead(id);
        set((state) => ({
          insights: state.insights.map((i) =>
            i.id === id ? { ...i, is_read: true } : i
          ),
        }));
      },

      deleteInsight: async (id) => {
        await storageService.deleteInsight(id);
        set((state) => ({
          insights: state.insights.filter((i) => i.id !== id),
        }));
      },

      loadInsights: async () => {
        const insights = await storageService.getInsights();
        set({ insights });
      },
      syncPlaidData: async (accessToken?: string) => {
        set((state) => ({
          syncStatus: { ...state.syncStatus, isActive: true, status: 'syncing' },
          loadingStates: {
            ...state.loadingStates,
            plaidSync: { isLoading: true, operation: 'Syncing Plaid data...' }
          }
        }));

        try {
          const PlaidService = (await import('../services/plaid/PlaidService')).default;
          const plaidService = new PlaidService();

          // Initialize if not already done
          await plaidService.initializePlaid();

          const tokensToSync = accessToken
            ? [accessToken]
            : plaidService.getConnectedTokens();

          for (const token of tokensToSync) {
            // Get existing transactions for deduplication
            const existingTransactions = get().transactions;

            // Sync transactions with enhanced deduplication
            const syncResult = await plaidService.syncTransactionsEnhanced(token, {
              existingTransactions,
              forceRefresh: true
            });

            // Update transactions in store
            set((_state) => ({
              transactions: syncResult.transactions
            }));

            // Sync accounts
            const accounts = await plaidService.getAccounts(token);
            for (const account of accounts) {
              await get().addAccount(account);
            }

            // Sync investments
            try {
              const investments = await plaidService.getInvestments(token);
              for (const investment of investments) {
                await get().addInvestment(investment);
              }
            } catch (investmentError) {
              console.log('Investments not available for this account');
            }
          }

          set((state) => ({
            syncStatus: {
              ...state.syncStatus,
              isActive: false,
              status: 'completed',
              lastSync: now()
            },
            loadingStates: {
              ...state.loadingStates,
              plaidSync: { isLoading: false }
            }
          }));

          console.log('Plaid sync completed successfully');
        } catch (error) {
          set((state) => ({
            syncStatus: {
              ...state.syncStatus,
              isActive: false,
              status: 'error',
              error: (error as Error).message
            },
            loadingStates: {
              ...state.loadingStates,
              plaidSync: { isLoading: false }
            },
            errorStates: {
              ...state.errorStates,
              plaidSync: {
                hasError: true,
                message: (error as Error).message,
                type: 'PLAID_CONNECTION',
                timestamp: now()
              }
            }
          }));
          throw error;
        }
      },

      generateInsights: async () => {
        try {
          const { aiService } = await import('../services/ai');
          const { transactions } = get();
          const insights = await aiService.generateInsights(transactions);

          // Add insights to store
          for (const insight of insights) {
            await get().addInsight(insight);
          }
        } catch (error) {
          console.error('Failed to generate insights:', error);
          throw error;
        }
      },

      generateCashFlowForecast: async () => {
        try {
          const { aiService } = await import('../services/ai');
          const { transactions, accounts } = get();

          // Generate cash flow predictions
          const predictions = await aiService.generateCashFlowForecast(transactions, accounts);
          const alerts = await aiService.generateCashFlowAlerts(predictions);

          set({
            cashFlowPredictions: predictions,
            cashFlowAlerts: alerts
          });
        } catch (error) {
          console.error('Failed to generate cash flow forecast:', error);
          throw error;
        }
      },

      generateBudgetForecast: async () => {
        try {
          const { aiService } = await import('../services/ai');
          const { budgets, transactions } = get();

          // Generate budget forecasts
          const forecasts = await aiService.generateBudgetForecast(budgets, transactions);

          set({ budgetForecasts: forecasts });
        } catch (error) {
          console.error('Failed to generate budget forecast:', error);
          throw error;
        }
      },

      setTransactionFilters: (filters) => {
        set((state) => ({
          transactionFilters: { ...state.transactionFilters, ...filters }
        }));
      },

      setBudgetFilters: (filters) => {
        set((state) => ({
          budgetFilters: { ...state.budgetFilters, ...filters }
        }));
      },

      clearFilters: () => {
        set({ transactionFilters: {}, budgetFilters: {} });
      },

      setDateRange: (start, end) => set({ selectedDateRange: { start, end } }),
      setSelectedCategories: (categories) => set({ selectedCategories: categories }),
      setCurrentScreen: (screen) => set({ currentScreen: screen }),

      startAutoSync: (intervalMinutes = 60) => {
        const { autoSyncInterval } = get();

        // Clear existing interval
        if (autoSyncInterval) {
          clearInterval(autoSyncInterval);
        }

        // Start new interval
        const interval = setInterval(async () => {
          try {
            console.log('Running automatic Plaid sync...');
            await get().syncPlaidData();
          } catch (error) {
            console.error('Auto-sync failed:', error);
          }
        }, intervalMinutes * 60 * 1000);

        set({ autoSyncInterval: interval });
        console.log(`Auto-sync started (every ${intervalMinutes} minutes)`);
      },

      stopAutoSync: () => {
        const { autoSyncInterval } = get();
        if (autoSyncInterval) {
          clearInterval(autoSyncInterval);
          set({ autoSyncInterval: null });
          console.log('Auto-sync stopped');
        }
      },

      initializeStore: async () => {
        await Promise.all([
          get().loadTransactions(),
          get().loadAccounts(),
          get().loadBudgets(),
          get().loadInvestments(),
          get().loadInsights()
        ]);
        set({ isInitialized: true });
      },

      clearAllData: async () => {
        await storageService.clearData();
        set({
          transactions: [],
          accounts: [],
          investments: [],
          budgets: [],
          insights: [],
          cashFlowPredictions: [],
          budgetForecasts: [],
          cashFlowAlerts: [],
        });
      },

      resetToDefaults: async () => {
        await get().clearAllData();
        set({
          selectedDateRange: getDefaultDateRange(),
          selectedCategories: [],
          currentScreen: 'dashboard',
          transactionFilters: {},
          budgetFilters: {},
        });
      },
      getFilteredTransactions: () => {
        const { transactions, transactionFilters } = get();
        return transactions.filter(transaction => {
          if (transactionFilters.dateRange) {
            const transactionDate = new Date(transaction.date);
            if (transactionDate < transactionFilters.dateRange.start ||
              transactionDate > transactionFilters.dateRange.end) {
              return false;
            }
          }

          if (transactionFilters.categories && transactionFilters.categories.length > 0) {
            if (!transactionFilters.categories.includes(transaction.category)) {
              return false;
            }
          }

          if (transactionFilters.searchTerm) {
            const searchTerm = transactionFilters.searchTerm.toLowerCase();
            if (!transaction.description.toLowerCase().includes(searchTerm) &&
              !transaction.merchant?.toLowerCase().includes(searchTerm)) {
              return false;
            }
          }

          return true;
        });
      },

      getTotalBalance: () => {
        const { accounts } = get();
        return accounts.reduce((total, account) => total + account.balance, 0);
      },

      getNetWorth: () => {
        const { accounts, investments } = get();

        // Calculate total assets (positive balances + investments)
        const totalAssets = accounts
          .filter(account => account.is_active && account.balance > 0)
          .reduce((total, account) => total + account.balance, 0) +
          investments.reduce((total, investment) => total + investment.value, 0);

        // Calculate total liabilities (negative balances like credit cards)
        const totalLiabilities = Math.abs(accounts
          .filter(account => account.is_active && account.balance < 0)
          .reduce((total, account) => total + account.balance, 0));

        return totalAssets - totalLiabilities;
      },

      getInvestmentPerformance: () => {
        const { investments } = get();

        const totalValue = investments.reduce((total, investment) => total + investment.value, 0);

        const totalGainLoss = investments.reduce((total, investment) => {
          const costBasis = investment.average_cost_basis || investment.price;
          return total + ((investment.price - costBasis) * investment.quantity);
        }, 0);

        const totalCostBasis = investments.reduce((total, investment) => {
          const costBasis = investment.average_cost_basis || investment.price;
          return total + (costBasis * investment.quantity);
        }, 0);

        const totalGainLossPercent = totalCostBasis > 0 ? (totalGainLoss / totalCostBasis) * 100 : 0;

        return {
          totalValue,
          totalGainLoss,
          totalGainLossPercent
        };
      },
    }),
    { name: 'ai-finance-manager-store' }
  )
);

// Selector hooks for better performance
export const useTransactions = () => useAppStore((state) => state.transactions);
export const useAccounts = () => useAppStore((state) => state.accounts);
export const useInvestments = () => useAppStore((state) => state.investments);
export const useBudgets = () => useAppStore((state) => state.budgets);
export const useInsights = () => useAppStore((state) => state.insights);
export const useLoadingStates = () => useAppStore((state) => state.loadingStates);
export const useErrorStates = () => useAppStore((state) => state.errorStates);
export const useSyncStatus = () => useAppStore((state) => state.syncStatus);
export const useDateRange = () => useAppStore((state) => state.selectedDateRange);
export const useSelectedCategories = () => useAppStore((state) => state.selectedCategories);
export const useTransactionFilters = () => useAppStore((state) => state.transactionFilters);
export const useBudgetFilters = () => useAppStore((state) => state.budgetFilters);
export const useIsInitialized = () => useAppStore((state) => state.isInitialized);