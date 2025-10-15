// Core data model interfaces for the AI Finance Manager

// Re-export validation schemas and constants
export * from './validation';
export * from './constants';
export * from './services';

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  description: string;
  category: string;
  subcategory?: string;
  account_id?: string;
  plaid_transaction_id?: string;
  is_manual: boolean;
  is_hidden: boolean;
  receipt_image?: string; // Legacy field - kept for backward compatibility
  receipt_images?: string[]; // Array of receipt image IDs for multiple attachments
  receipt_metadata?: {
    ocr_confidence?: number;
    processing_time?: number;
    extracted_merchant?: string;
    extracted_amount?: number;
    extracted_date?: Date;
    item_count?: number;
  };
  confidence_score?: number;
  created_at: Date;
  updated_at: Date;
  tags?: string[];
  notes?: string;
  merchant?: string;
  status?: 'posted' | 'pending';
  type?: 'income' | 'expense'; // Added for Plaid integration
}

export interface Account {
  id: string;
  plaid_account_id?: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  institution_name?: string;
  last_synced?: Date;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  period: 'weekly' | 'monthly' | 'yearly';
  start_date: Date;
  current_spent: number;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
}

export interface Investment {
  id: string;
  account_id: string;
  security_name: string;
  ticker_symbol?: string;
  quantity: number;
  price: number;
  value: number;
  type: 'stock' | 'bond' | 'etf' | 'mutual_fund' | 'cash' | 'crypto' | 'real_estate';
  last_updated: Date;
  average_cost_basis?: number;
  daily_change?: number;
  daily_change_percent?: number;
  total_gain_loss?: number;
  total_gain_loss_percent?: number;
  security_id?: string; // Added for Plaid integration
  institution_value?: number; // Added for Plaid integration
  iso_currency_code?: string; // Added for Plaid integration
}

export interface Liability {
  id: string;
  account_id: string;
  name: string;
  type: 'credit_card' | 'mortgage' | 'student_loan' | 'auto_loan' | 'personal_loan' | 'line_of_credit';
  balance: number;
  minimum_payment?: number;
  interest_rate?: number;
  due_date?: Date;
  last_payment_date?: Date;
  last_payment_amount?: number;
  last_updated: Date;
  institution_name?: string;
  plaid_account_id?: string;
  credit_limit?: number; // Added for Plaid integration
  original_balance?: number; // Added for Plaid integration
  maturity_date?: Date; // Added for Plaid integration
}

export interface AIInsight {
  id: string;
  type: 'spending_pattern' | 'anomaly' | 'recommendation' | 'prediction';
  title: string;
  description: string;
  confidence: number;
  category?: string;
  amount?: number;
  created_at: Date;
  is_read: boolean;
  action_items?: string[];
  metadata?: Record<string, any>;
}

// AI Categorization Feedback Types
export interface AICategoryFeedback {
  id: string;
  transaction_id: string;
  suggested_category: string;
  suggested_confidence: number;
  user_selected_category: string;
  feedback_type: 'accepted' | 'rejected' | 'corrected';
  merchant?: string;
  amount?: number;
  description?: string;
  created_at: Date;
  reasoning?: string; // User's reason for correction
}

export interface CategorySuggestion {
  category: string;
  confidence: number;
  reasoning?: string;
  source: 'ai' | 'rules' | 'history';
}

export interface BulkCategorizationItem {
  transaction_id: string;
  description: string;
  merchant?: string;
  amount: number;
  current_category?: string;
  suggested_category: string;
  confidence: number;
  selected: boolean;
}

export interface LearningAnalytics {
  total_suggestions: number;
  accepted_suggestions: number;
  rejected_suggestions: number;
  corrected_suggestions: number;
  accuracy_rate: number;
  category_accuracy: Record<string, {
    total: number;
    correct: number;
    accuracy: number;
  }>;
  merchant_patterns: Record<string, {
    category: string;
    confidence: number;
    feedback_count: number;
  }>;
}

// Legacy interfaces from App.tsx - keeping for compatibility
export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  group: string;
  type: "income" | "expense";
  isSystemDefault: boolean;
  usageCount: number;
  isArchived: boolean;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
  icon?: string;
  color?: string;
  usageCount: number;
  isArchived: boolean;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  usageCount: number;
  isArchived: boolean;
}

export interface TransactionRule {
  id: string;
  name: string;
  conditions: {
    merchantName?: string;
    keywords?: string[];
    amount?: { min?: number; max?: number };
    description?: string;
  };
  actions: {
    categoryId?: string;
    tagIds?: string[];
  };
  isActive: boolean;
  priority: number;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  icon: string;
  color: string;
}

// Renamed from AccountTransaction to avoid confusion with Transaction
export interface LegacyTransaction {
  id: string;
  date: Date;
  description: string;
  merchant: string;
  amount: number;
  category: string;
  categoryIcon: string;
  subcategory?: string;
  status: "posted" | "pending";
  account?: string;
  tags?: string[];
  notes?: string;
  receipt?: string;
}

export interface Holding {
  id: string;
  name: string;
  ticker?: string;
  type: "stock" | "crypto" | "bond" | "etf" | "real_estate" | "cash";
  quantity: number;
  currentPrice: number;
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  averageCostBasis?: number;
  icon: string;
}

export interface Institution {
  id: string;
  name: string;
  logo: string;
  status: "connected" | "needs_attention" | "disconnected";
  lastSync: Date;
  accountCount: number;
  accounts: string[];
}

// Utility types for API responses and form data
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface FormData {
  [key: string]: any;
}

export interface TransactionFormData {
  amount: number;
  date: Date;
  description: string;
  category: string;
  subcategory?: string;
  account_id?: string;
  tags?: string[];
  notes?: string;
  merchant?: string;
  receipt_image?: string;
}

export interface BudgetFormData {
  category: string;
  amount: number;
  period: 'weekly' | 'monthly' | 'yearly';
  start_date: Date;
}

export interface AccountFormData {
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  institution_name?: string;
}

// Filter and search types
export interface TransactionFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  categories?: string[];
  accounts?: string[];
  amountRange?: {
    min: number;
    max: number;
  };
  searchTerm?: string;
  isManual?: boolean;
  isHidden?: boolean;
  tags?: string[];
}

export interface BudgetFilters {
  categories?: string[];
  period?: 'weekly' | 'monthly' | 'yearly';
  isActive?: boolean;
}

// State management types
export interface LoadingState {
  isLoading: boolean;
  operation?: string;
  progress?: number;
}

export interface ErrorState {
  hasError: boolean;
  message?: string;
  type?: string;
  details?: any;
}

// Chart and visualization data types
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  date?: Date;
}

export interface TimeSeriesData {
  date: Date;
  income: number;
  expenses: number;
  net: number;
}

export interface CategorySpendingData {
  category: string;
  amount: number;
  percentage: number;
  color: string;
  transactions: number;
}

export interface BudgetProgressData {
  category: string;
  budgeted: number;
  spent: number;
  remaining: number;
  percentage: number;
  status: 'on_track' | 'warning' | 'over_budget';
}

// Plaid-specific types
export interface PlaidAccount {
  account_id: string;
  balances: {
    available: number | null;
    current: number | null;
    limit: number | null;
  };
  mask: string;
  name: string;
  official_name: string | null;
  subtype: string;
  type: string;
}

export interface PlaidTransaction {
  transaction_id: string;
  account_id: string;
  amount: number;
  date: string;
  name: string;
  merchant_name?: string;
  category: string[];
  category_id: string;
  pending: boolean;
  account_owner?: string;
}

export interface PlaidInvestmentHolding {
  account_id: string;
  security_id: string;
  institution_price: number;
  institution_value: number;
  cost_basis?: number;
  quantity: number;
}

// Screen navigation type
export type Screen =
  | "dashboard"
  | "profile"
  | "personal-info"
  | "security-login"
  | "linked-accounts"
  | "notifications"
  | "notification-settings"
  | "app-preferences"
  | "help-support"
  | "categories-tags"
  | "create-category"
  | "edit-category"
  | "create-tag"
  | "edit-tag"
  | "transaction-rules"
  | "transactions"
  | "transaction-settings"
  | "add-manual-transaction"
  | "split-transaction"
  | "create-rule"
  | "merchant-trend"
  | "transaction-details-screen"
  | "bulk-edit-transactions"
  | "create-goal"
  | "goal-details"
  | "edit-goal"
  | "goal-settings"
  | "add-contribution"
  | "categories"
  | "category-detail-screen"
  | "subcategory-detail-screen"
  | "accounts"
  | "accounts-settings"
  | "manage-connected-institutions"
  | "manage-institution"
  | "delete-historical-data"
  | "add-account"
  | "add-manual-account"
  | "account-details"
  | "plaid-connections"
  | "plaid-dashboard"
  | "account-transaction-details"
  | "holding-details"
  | "edit-account"
  | "manage-connections"
  | "plaid-link"
  | "goals"
  | "insights"
  | "insight-details"
  | "insights-settings"
  | "achievements"
  | "budgets"
  | "budget-category-detail"
  | "budget-subcategory-detail"
  | "create-budget"
  | "edit-budget"
  | "budget-settings"
  | "budget-rules"
  | "shared-budgets"
  | "manage-subcategories"
  | "net-worth"
  | "more"
  | "upcoming-payments"
  | "upcoming-payments-list"
  | "day-subscription-details"
  | "transaction-details"
  | "monthly-subscription-cost"
  | "category-detail"
  | "ai-assistant"
  | "ai-receipt-scanner"
  | "ai-receipt-list"
  | "ai-receipt-details"
  | "ai-fraud-detection"
  | "ai-what-if-scenarios"
  | "ai-subscription-audit"
  | "ai-bill-analysis"
  | "ai-smart-savings"
  | "ai-investment-advisor"
  | "ai-debt-management"
  | "ai-budget-optimizer"
  | "ai-cash-flow-forecast"
  | "ai-cash-flow-alert"
  | "ai-portfolio-rebalancing"
  | "ai-merchant-cashback"
  | "ai-auto-save"
  | "ai-goal-forecast"
  | "ai-cash-flow-detail"
  | "ai-portfolio-review"
  | "ai-credit-card-optimizer"
  | "ai-cash-flow-alert-settings"
  | "ai-cash-flow-optimizer"
  | "ai-ocr-document-scanner"
  | "ai-duplicate-detection"
  | "ai-subscription-optimizer"
  | "plaid-connections"
  | "plaid-dashboard"
  | "plaid-test";