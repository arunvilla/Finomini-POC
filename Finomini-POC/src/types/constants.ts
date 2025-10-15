// Constants and enums for the AI Finance Manager

// Transaction categories
export const TRANSACTION_CATEGORIES = {
  INCOME: [
    'Salary',
    'Freelance',
    'Investment Income',
    'Rental Income',
    'Business Income',
    'Other Income'
  ],
  EXPENSES: [
    'Groceries',
    'Dining Out',
    'Transportation',
    'Gas',
    'Utilities',
    'Rent/Mortgage',
    'Insurance',
    'Healthcare',
    'Entertainment',
    'Shopping',
    'Travel',
    'Education',
    'Subscriptions',
    'Personal Care',
    'Home Improvement',
    'Gifts & Donations',
    'Taxes',
    'Other Expenses'
  ]
} as const;

// Budget periods
export const BUDGET_PERIODS = {
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly'
} as const;

// Account types
export const ACCOUNT_TYPES = {
  CHECKING: 'checking',
  SAVINGS: 'savings',
  CREDIT: 'credit',
  INVESTMENT: 'investment'
} as const;

// Investment types
export const INVESTMENT_TYPES = {
  STOCK: 'stock',
  BOND: 'bond',
  ETF: 'etf',
  MUTUAL_FUND: 'mutual_fund',
  CRYPTO: 'crypto',
  REAL_ESTATE: 'real_estate',
  CASH: 'cash'
} as const;

// Transaction statuses
export const TRANSACTION_STATUSES = {
  POSTED: 'posted',
  PENDING: 'pending'
} as const;

// AI insight types
export const AI_INSIGHT_TYPES = {
  SPENDING_PATTERN: 'spending_pattern',
  ANOMALY: 'anomaly',
  RECOMMENDATION: 'recommendation',
  PREDICTION: 'prediction'
} as const;

// Budget status types
export const BUDGET_STATUS = {
  ON_TRACK: 'on_track',
  WARNING: 'warning',
  OVER_BUDGET: 'over_budget'
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  BUDGET_WARNING: 'budget_warning',
  BUDGET_EXCEEDED: 'budget_exceeded',
  UNUSUAL_SPENDING: 'unusual_spending',
  SYNC_COMPLETE: 'sync_complete',
  SYNC_ERROR: 'sync_error'
} as const;

// Notification priorities
export const NOTIFICATION_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
} as const;

// Sync statuses
export const SYNC_STATUSES = {
  IDLE: 'idle',
  SYNCING: 'syncing',
  ERROR: 'error',
  COMPLETED: 'completed'
} as const;

// Error types
export const ERROR_TYPES = {
  PLAID_CONNECTION: 'plaid_connection',
  AI_SERVICE: 'ai_service',
  OCR_PROCESSING: 'ocr_processing',
  STORAGE: 'storage',
  VALIDATION: 'validation',
  NETWORK: 'network'
} as const;

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  API: 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx',
  SHORT: 'MM/dd/yy'
} as const;

// Currency settings
export const CURRENCY = {
  SYMBOL: '$',
  CODE: 'USD',
  DECIMAL_PLACES: 2
} as const;

// Chart colors
export const CHART_COLORS = {
  PRIMARY: '#3B82F6',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  DANGER: '#EF4444',
  INFO: '#6366F1',
  SECONDARY: '#6B7280',
  CATEGORIES: [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#14B8A6'
  ]
} as const;

// Storage keys
export const STORAGE_KEYS = {
  TRANSACTIONS: 'ai_finance_transactions',
  ACCOUNTS: 'ai_finance_accounts',
  BUDGETS: 'ai_finance_budgets',
  INVESTMENTS: 'ai_finance_investments',
  INSIGHTS: 'ai_finance_insights',
  PLAID_TOKENS: 'ai_finance_plaid_tokens',
  USER_PREFERENCES: 'ai_finance_preferences',
  CATEGORIES: 'ai_finance_categories',
  TAGS: 'ai_finance_tags'
} as const;

// API endpoints (for backend integration)
export const API_ENDPOINTS = {
  PLAID: {
    CREATE_LINK_TOKEN: '/api/plaid/create-link-token',
    EXCHANGE_TOKEN: '/api/plaid/exchange-token',
    GET_ACCOUNTS: '/api/plaid/accounts',
    GET_TRANSACTIONS: '/api/plaid/transactions',
    GET_INVESTMENTS: '/api/plaid/investments',
    DISCONNECT: '/api/plaid/disconnect'
  },
  AI: {
    CATEGORIZE: '/api/ai/categorize',
    GENERATE_INSIGHTS: '/api/ai/insights',
    PREDICT_SPENDING: '/api/ai/predict'
  },
  OCR: {
    PROCESS_RECEIPT: '/api/ocr/process'
  }
} as const;

// Validation rules
export const VALIDATION_RULES = {
  TRANSACTION: {
    MIN_AMOUNT: 0.01,
    MAX_AMOUNT: 1000000,
    MAX_DESCRIPTION_LENGTH: 255,
    MAX_NOTES_LENGTH: 1000
  },
  BUDGET: {
    MIN_AMOUNT: 1,
    MAX_AMOUNT: 1000000
  },
  ACCOUNT: {
    MAX_NAME_LENGTH: 100,
    MIN_BALANCE: -1000000,
    MAX_BALANCE: 1000000000
  }
} as const;

// Feature flags
export const FEATURE_FLAGS = {
  ENABLE_AI_CATEGORIZATION: true,
  ENABLE_OCR_SCANNING: true,
  ENABLE_INVESTMENT_TRACKING: true,
  ENABLE_BUDGET_NOTIFICATIONS: true,
  ENABLE_PLAID_SYNC: true,
  ENABLE_EXPORT_FEATURES: true
} as const;