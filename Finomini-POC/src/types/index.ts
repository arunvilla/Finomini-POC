// Core data model interfaces for the AI Finance Manager

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
  receipt_image?: string;
  confidence_score?: number;
  created_at: Date;
  updated_at: Date;
  tags?: string[];
  notes?: string;
  merchant?: string;
  status?: 'posted' | 'pending';
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
  | "plaid-dashboard";