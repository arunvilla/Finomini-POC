// Main Zustand store for the AI Finance Manager application

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Transaction, Account, Investment, Budget, AIInsight } from '../types';

// Define the main application state interface
export interface AppState {
  // Core data
  transactions: Transaction[];
  accounts: Account[];
  investments: Investment[];
  budgets: Budget[];
  insights: AIInsight[];
  
  // UI state
  isLoading: boolean;
  selectedDateRange: {
    start: Date;
    end: Date;
  };
  selectedCategories: string[];
  currentScreen: string;
  
  // Error state
  error: string | null;
  
  // Transaction actions
  addTransaction: (transaction: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  hideTransaction: (id: string) => void;
  showTransaction: (id: string) => void;
  
  // Account actions
  addAccount: (account: Omit<Account, 'id' | 'created_at' | 'updated_at'>) => void;
  updateAccount: (id: string, updates: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
  
  // Budget actions
  createBudget: (budget: Omit<Budget, 'id' | 'created_at' | 'updated_at' | 'current_spent'>) => void;
  updateBudget: (id: string, updates: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  
  // Investment actions
  addInvestment: (investment: Omit<Investment, 'id'>) => void;
  updateInvestment: (id: string, updates: Partial<Investment>) => void;
  deleteInvestment: (id: string) => void;
  
  // Insight actions
  addInsight: (insight: Omit<AIInsight, 'id'>) => void;
  markInsightAsRead: (id: string) => void;
  deleteInsight: (id: string) => void;
  
  // Async actions
  syncPlaidData: () => Promise<void>;
  generateInsights: () => Promise<void>;
  
  // UI actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setDateRange: (start: Date, end: Date) => void;
  setSelectedCategories: (categories: string[]) => void;
  setCurrentScreen: (screen: string) => void;
  
  // Utility actions
  clearAllData: () => void;
  resetToDefaults: () => void;
}

// Helper function to generate UUIDs
const generateId = (): string => {
  return crypto.randomUUID();
};

// Helper function to get current timestamp
const now = (): Date => new Date();

// Default date range (last 30 days)
const getDefaultDateRange = () => {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 30);
  return { start, end };
};

// Create the main store
export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        transactions: [],
        accounts: [],
        investments: [],
        budgets: [],
        insights: [],
        isLoading: false,
        selectedDateRange: getDefaultDateRange(),
        selectedCategories: [],
        currentScreen: 'dashboard',
        error: null,

        // Transaction actions
        addTransaction: (transactionData) => {
          const transaction: Transaction = {
            ...transactionData,
            id: generateId(),
            created_at: now(),
            updated_at: now(),
          };
          
          set((state) => ({
            transactions: [...state.transactions, transaction],
          }));
        },

        updateTransaction: (id, updates) => {
          set((state) => ({
            transactions: state.transactions.map((transaction) =>
              transaction.id === id
                ? { ...transaction, ...updates, updated_at: now() }
                : transaction
            ),
          }));
        },

        deleteTransaction: (id) => {
          set((state) => ({
            transactions: state.transactions.filter((transaction) => transaction.id !== id),
          }));
        },

        hideTransaction: (id) => {
          get().updateTransaction(id, { is_hidden: true });
        },

        showTransaction: (id) => {
          get().updateTransaction(id, { is_hidden: false });
        },

        // Account actions
        addAccount: (accountData) => {
          const account: Account = {
            ...accountData,
            id: generateId(),
            created_at: now(),
            updated_at: now(),
          };
          
          set((state) => ({
            accounts: [...state.accounts, account],
          }));
        },

        updateAccount: (id, updates) => {
          set((state) => ({
            accounts: state.accounts.map((account) =>
              account.id === id
                ? { ...account, ...updates, updated_at: now() }
                : account
            ),
          }));
        },

        deleteAccount: (id) => {
          set((state) => ({
            accounts: state.accounts.filter((account) => account.id !== id),
            // Also remove transactions associated with this account
            transactions: state.transactions.filter((transaction) => transaction.account_id !== id),
            // Also remove investments associated with this account
            investments: state.investments.filter((investment) => investment.account_id !== id),
          }));
        },

        // Budget actions
        createBudget: (budgetData) => {
          const budget: Budget = {
            ...budgetData,
            id: generateId(),
            current_spent: 0,
            created_at: now(),
            updated_at: now(),
          };
          
          set((state) => ({
            budgets: [...state.budgets, budget],
          }));
        },

        updateBudget: (id, updates) => {
          set((state) => ({
            budgets: state.budgets.map((budget) =>
              budget.id === id
                ? { ...budget, ...updates, updated_at: now() }
                : budget
            ),
          }));
        },

        deleteBudget: (id) => {
          set((state) => ({
            budgets: state.budgets.filter((budget) => budget.id !== id),
          }));
        },

        // Investment actions
        addInvestment: (investmentData) => {
          const investment: Investment = {
            ...investmentData,
            id: generateId(),
          };
          
          set((state) => ({
            investments: [...state.investments, investment],
          }));
        },

        updateInvestment: (id, updates) => {
          set((state) => ({
            investments: state.investments.map((investment) =>
              investment.id === id
                ? { ...investment, ...updates, last_updated: now() }
                : investment
            ),
          }));
        },

        deleteInvestment: (id) => {
          set((state) => ({
            investments: state.investments.filter((investment) => investment.id !== id),
          }));
        },

        // Insight actions
        addInsight: (insightData) => {
          const insight: AIInsight = {
            ...insightData,
            id: generateId(),
          };
          
          set((state) => ({
            insights: [...state.insights, insight],
          }));
        },

        markInsightAsRead: (id) => {
          set((state) => ({
            insights: state.insights.map((insight) =>
              insight.id === id
                ? { ...insight, is_read: true }
                : insight
            ),
          }));
        },

        deleteInsight: (id) => {
          set((state) => ({
            insights: state.insights.filter((insight) => insight.id !== id),
          }));
        },

        // Async actions (placeholder implementations)
        syncPlaidData: async () => {
          set({ isLoading: true, error: null });
          try {
            // TODO: Implement Plaid sync logic in task 5
            console.log('Plaid sync not yet implemented');
          } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Plaid sync failed' });
          } finally {
            set({ isLoading: false });
          }
        },

        generateInsights: async () => {
          set({ isLoading: true, error: null });
          try {
            // TODO: Implement AI insights generation in task 7
            console.log('AI insights generation not yet implemented');
          } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Insights generation failed' });
          } finally {
            set({ isLoading: false });
          }
        },

        // UI actions
        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error }),
        setDateRange: (start, end) => set({ selectedDateRange: { start, end } }),
        setSelectedCategories: (categories) => set({ selectedCategories: categories }),
        setCurrentScreen: (screen) => set({ currentScreen: screen }),

        // Utility actions
        clearAllData: () => {
          set({
            transactions: [],
            accounts: [],
            investments: [],
            budgets: [],
            insights: [],
            error: null,
          });
        },

        resetToDefaults: () => {
          set({
            transactions: [],
            accounts: [],
            investments: [],
            budgets: [],
            insights: [],
            isLoading: false,
            selectedDateRange: getDefaultDateRange(),
            selectedCategories: [],
            currentScreen: 'dashboard',
            error: null,
          });
        },
      }),
      {
        name: 'ai-finance-manager-storage',
        // Only persist the core data, not UI state
        partialize: (state) => ({
          transactions: state.transactions,
          accounts: state.accounts,
          investments: state.investments,
          budgets: state.budgets,
          insights: state.insights,
        }),
      }
    ),
    {
      name: 'ai-finance-manager-store',
    }
  )
);

// Selector hooks for better performance
export const useTransactions = () => useAppStore((state) => state.transactions);
export const useAccounts = () => useAppStore((state) => state.accounts);
export const useInvestments = () => useAppStore((state) => state.investments);
export const useBudgets = () => useAppStore((state) => state.budgets);
export const useInsights = () => useAppStore((state) => state.insights);
export const useIsLoading = () => useAppStore((state) => state.isLoading);
export const useError = () => useAppStore((state) => state.error);
export const useDateRange = () => useAppStore((state) => state.selectedDateRange);
export const useSelectedCategories = () => useAppStore((state) => state.selectedCategories);