// Application constants for the AI Finance Manager

// Transaction categories
export const TRANSACTION_CATEGORIES = {
  INCOME: [
    'Salary',
    'Freelance',
    'Investment Returns',
    'Business Income',
    'Other Income',
  ],
  EXPENSES: [
    'Groceries',
    'Dining',
    'Transportation',
    'Utilities',
    'Healthcare',
    'Entertainment',
    'Shopping',
    'Travel',
    'Education',
    'Insurance',
    'Other Expenses',
  ],
} as const;

// Account types
export const ACCOUNT_TYPES = {
  CHECKING: 'checking',
  SAVINGS: 'savings',
  CREDIT: 'credit',
  INVESTMENT: 'investment',
} as const;

// Investment types
export const INVESTMENT_TYPES = {
  STOCK: 'stock',
  BOND: 'bond',
  ETF: 'etf',
  MUTUAL_FUND: 'mutual_fund',
  CASH: 'cash',
  CRYPTO: 'crypto',
  REAL_ESTATE: 'real_estate',
} as const;

// Budget periods
export const BUDGET_PERIODS = {
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
} as const;

// AI insight types
export const INSIGHT_TYPES = {
  SPENDING_PATTERN: 'spending_pattern',
  ANOMALY: 'anomaly',
  RECOMMENDATION: 'recommendation',
  PREDICTION: 'prediction',
} as const;

// Transaction statuses
export const TRANSACTION_STATUSES = {
  POSTED: 'posted',
  PENDING: 'pending',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  PLAID_CONNECTION_FAILED: 'Failed to connect to your bank account. Please try again.',
  AI_SERVICE_UNAVAILABLE: 'AI services are temporarily unavailable. Manual categorization is available.',
  OCR_PROCESSING_FAILED: 'Could not read the receipt. Please enter transaction details manually.',
  STORAGE_ERROR: 'Failed to save data. Please try again.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  TRANSACTION_ADDED: 'Transaction added successfully',
  TRANSACTION_UPDATED: 'Transaction updated successfully',
  TRANSACTION_DELETED: 'Transaction deleted successfully',
  ACCOUNT_CONNECTED: 'Account connected successfully',
  BUDGET_CREATED: 'Budget created successfully',
  DATA_SYNCED: 'Data synced successfully',
} as const;

// API endpoints (placeholders for future implementation)
export const API_ENDPOINTS = {
  PLAID: {
    LINK_TOKEN: '/api/plaid/link-token',
    EXCHANGE_TOKEN: '/api/plaid/exchange-token',
    TRANSACTIONS: '/api/plaid/transactions',
    ACCOUNTS: '/api/plaid/accounts',
    INVESTMENTS: '/api/plaid/investments',
  },
  AI: {
    CATEGORIZE: '/api/ai/categorize',
    INSIGHTS: '/api/ai/insights',
    PREDICT: '/api/ai/predict',
  },
  OCR: {
    PROCESS_RECEIPT: '/api/ocr/process-receipt',
  },
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  TRANSACTIONS: 'ai-finance-transactions',
  ACCOUNTS: 'ai-finance-accounts',
  BUDGETS: 'ai-finance-budgets',
  INVESTMENTS: 'ai-finance-investments',
  INSIGHTS: 'ai-finance-insights',
  USER_PREFERENCES: 'ai-finance-preferences',
  PLAID_TOKENS: 'ai-finance-plaid-tokens',
} as const;

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
  ISO: 'yyyy-MM-dd',
  API: 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx',
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

// Chart colors for data visualization
export const CHART_COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7c7c',
  '#8dd1e1',
  '#d084d0',
  '#ffb347',
  '#87ceeb',
  '#dda0dd',
  '#98fb98',
] as const;

// Currency settings
export const CURRENCY = {
  DEFAULT: 'USD',
  SYMBOL: '$',
  LOCALE: 'en-US',
} as const;

// Validation limits
export const VALIDATION_LIMITS = {
  TRANSACTION_DESCRIPTION_MAX: 255,
  ACCOUNT_NAME_MAX: 100,
  CATEGORY_NAME_MAX: 50,
  TAG_NAME_MAX: 30,
  NOTES_MAX: 1000,
  INSIGHT_TITLE_MAX: 200,
  INSIGHT_DESCRIPTION_MAX: 1000,
} as const;

// Feature flags (for gradual rollout of features)
export const FEATURE_FLAGS = {
  PLAID_INTEGRATION: true,
  AI_CATEGORIZATION: true,
  OCR_RECEIPTS: true,
  INVESTMENT_TRACKING: true,
  BUDGET_ALERTS: true,
  INSIGHTS_GENERATION: true,
} as const;