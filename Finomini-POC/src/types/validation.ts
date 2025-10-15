// Zod validation schemas for the AI Finance Manager

import { z } from 'zod';
import { 
  ACCOUNT_TYPES, 
  BUDGET_PERIODS, 
  INVESTMENT_TYPES, 
  TRANSACTION_STATUSES,
  AI_INSIGHT_TYPES,
  VALIDATION_RULES 
} from './constants';

// Base validation schemas
export const TransactionSchema = z.object({
  id: z.string().uuid().optional(),
  amount: z.number()
    .min(VALIDATION_RULES.TRANSACTION.MIN_AMOUNT, 'Amount must be at least $0.01')
    .max(VALIDATION_RULES.TRANSACTION.MAX_AMOUNT, 'Amount cannot exceed $1,000,000'),
  date: z.date().max(new Date(), 'Date cannot be in the future'),
  description: z.string()
    .min(1, 'Description is required')
    .max(VALIDATION_RULES.TRANSACTION.MAX_DESCRIPTION_LENGTH, 'Description too long'),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().optional(),
  account_id: z.string().uuid().optional(),
  plaid_transaction_id: z.string().optional(),
  is_manual: z.boolean(),
  is_hidden: z.boolean().default(false),
  receipt_image: z.string().url().optional(), // Legacy field
  receipt_images: z.array(z.string().uuid()).optional(), // Array of receipt image IDs
  receipt_metadata: z.object({
    ocr_confidence: z.number().min(0).max(1).optional(),
    processing_time: z.number().min(0).optional(),
    extracted_merchant: z.string().optional(),
    extracted_amount: z.number().optional(),
    extracted_date: z.date().optional(),
    item_count: z.number().min(0).optional()
  }).optional(),
  confidence_score: z.number().min(0).max(1).optional(),
  tags: z.array(z.string()).optional(),
  notes: z.string()
    .max(VALIDATION_RULES.TRANSACTION.MAX_NOTES_LENGTH, 'Notes too long')
    .optional(),
  merchant: z.string().optional(),
  status: z.enum([TRANSACTION_STATUSES.POSTED, TRANSACTION_STATUSES.PENDING]).optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional()
});

export const AccountSchema = z.object({
  id: z.string().uuid().optional(),
  plaid_account_id: z.string().optional(),
  name: z.string()
    .min(1, 'Account name is required')
    .max(VALIDATION_RULES.ACCOUNT.MAX_NAME_LENGTH, 'Account name too long'),
  type: z.enum([
    ACCOUNT_TYPES.CHECKING,
    ACCOUNT_TYPES.SAVINGS,
    ACCOUNT_TYPES.CREDIT,
    ACCOUNT_TYPES.INVESTMENT
  ]),
  balance: z.number()
    .min(VALIDATION_RULES.ACCOUNT.MIN_BALANCE, 'Balance too low')
    .max(VALIDATION_RULES.ACCOUNT.MAX_BALANCE, 'Balance too high'),
  institution_name: z.string().optional(),
  last_synced: z.date().optional(),
  is_active: z.boolean().default(true),
  created_at: z.date().optional(),
  updated_at: z.date().optional()
});

export const BudgetSchema = z.object({
  id: z.string().uuid().optional(),
  category: z.string().min(1, 'Category is required'),
  amount: z.number()
    .min(VALIDATION_RULES.BUDGET.MIN_AMOUNT, 'Budget amount must be at least $1')
    .max(VALIDATION_RULES.BUDGET.MAX_AMOUNT, 'Budget amount cannot exceed $1,000,000'),
  period: z.enum([
    BUDGET_PERIODS.WEEKLY,
    BUDGET_PERIODS.MONTHLY,
    BUDGET_PERIODS.YEARLY
  ]),
  start_date: z.date(),
  current_spent: z.number().min(0).default(0),
  is_active: z.boolean().default(true),
  created_at: z.date().optional(),
  updated_at: z.date().optional()
});

export const InvestmentSchema = z.object({
  id: z.string().uuid().optional(),
  account_id: z.string().uuid(),
  security_name: z.string().min(1, 'Security name is required'),
  ticker_symbol: z.string().optional(),
  quantity: z.number().min(0, 'Quantity cannot be negative'),
  price: z.number().min(0, 'Price cannot be negative'),
  value: z.number().min(0, 'Value cannot be negative'),
  type: z.enum([
    INVESTMENT_TYPES.STOCK,
    INVESTMENT_TYPES.BOND,
    INVESTMENT_TYPES.ETF,
    INVESTMENT_TYPES.MUTUAL_FUND,
    INVESTMENT_TYPES.CRYPTO,
    INVESTMENT_TYPES.REAL_ESTATE,
    INVESTMENT_TYPES.CASH
  ]),
  last_updated: z.date(),
  average_cost_basis: z.number().min(0).optional(),
  daily_change: z.number().optional(),
  daily_change_percent: z.number().optional(),
  total_gain_loss: z.number().optional(),
  total_gain_loss_percent: z.number().optional()
});

export const AIInsightSchema = z.object({
  id: z.string().uuid().optional(),
  type: z.enum([
    AI_INSIGHT_TYPES.SPENDING_PATTERN,
    AI_INSIGHT_TYPES.ANOMALY,
    AI_INSIGHT_TYPES.RECOMMENDATION,
    AI_INSIGHT_TYPES.PREDICTION
  ]),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  confidence: z.number().min(0).max(1),
  category: z.string().optional(),
  amount: z.number().optional(),
  is_read: z.boolean().default(false),
  action_items: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  created_at: z.date().optional()
});

// Form validation schemas
export const TransactionFormSchema = z.object({
  amount: z.number()
    .min(VALIDATION_RULES.TRANSACTION.MIN_AMOUNT, 'Amount must be at least $0.01')
    .max(VALIDATION_RULES.TRANSACTION.MAX_AMOUNT, 'Amount cannot exceed $1,000,000'),
  date: z.date().max(new Date(), 'Date cannot be in the future'),
  description: z.string()
    .min(1, 'Description is required')
    .max(VALIDATION_RULES.TRANSACTION.MAX_DESCRIPTION_LENGTH, 'Description too long'),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().optional(),
  account_id: z.string().uuid().optional(),
  tags: z.array(z.string()).optional(),
  notes: z.string()
    .max(VALIDATION_RULES.TRANSACTION.MAX_NOTES_LENGTH, 'Notes too long')
    .optional(),
  merchant: z.string().optional(),
  receipt_image: z.string().url().optional()
});

export const BudgetFormSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  amount: z.number()
    .min(VALIDATION_RULES.BUDGET.MIN_AMOUNT, 'Budget amount must be at least $1')
    .max(VALIDATION_RULES.BUDGET.MAX_AMOUNT, 'Budget amount cannot exceed $1,000,000'),
  period: z.enum([
    BUDGET_PERIODS.WEEKLY,
    BUDGET_PERIODS.MONTHLY,
    BUDGET_PERIODS.YEARLY
  ]),
  start_date: z.date()
});

export const AccountFormSchema = z.object({
  name: z.string()
    .min(1, 'Account name is required')
    .max(VALIDATION_RULES.ACCOUNT.MAX_NAME_LENGTH, 'Account name too long'),
  type: z.enum([
    ACCOUNT_TYPES.CHECKING,
    ACCOUNT_TYPES.SAVINGS,
    ACCOUNT_TYPES.CREDIT,
    ACCOUNT_TYPES.INVESTMENT
  ]),
  balance: z.number()
    .min(VALIDATION_RULES.ACCOUNT.MIN_BALANCE, 'Balance too low')
    .max(VALIDATION_RULES.ACCOUNT.MAX_BALANCE, 'Balance too high'),
  institution_name: z.string().optional()
});

// Filter validation schemas
export const TransactionFiltersSchema = z.object({
  dateRange: z.object({
    start: z.date(),
    end: z.date()
  }).optional(),
  categories: z.array(z.string()).optional(),
  accounts: z.array(z.string().uuid()).optional(),
  amountRange: z.object({
    min: z.number().min(0),
    max: z.number().min(0)
  }).optional(),
  searchTerm: z.string().optional(),
  isManual: z.boolean().optional(),
  isHidden: z.boolean().optional(),
  tags: z.array(z.string()).optional()
});

export const BudgetFiltersSchema = z.object({
  categories: z.array(z.string()).optional(),
  period: z.enum([
    BUDGET_PERIODS.WEEKLY,
    BUDGET_PERIODS.MONTHLY,
    BUDGET_PERIODS.YEARLY
  ]).optional(),
  isActive: z.boolean().optional()
});

// API response validation schemas
export const PlaidTransactionResponseSchema = z.object({
  transactions: z.array(z.any()),
  accounts: z.array(z.any()),
  total_transactions: z.number(),
  request_id: z.string()
});

export const AICategorizationResponseSchema = z.object({
  category: z.string(),
  subcategory: z.string().optional(),
  confidence: z.number().min(0).max(1),
  reasoning: z.string().optional()
});

export const OCRProcessingResponseSchema = z.object({
  text: z.string(),
  merchant: z.string().optional(),
  amount: z.number().optional(),
  date: z.string().optional(),
  items: z.array(z.object({
    name: z.string(),
    price: z.number(),
    quantity: z.number().optional()
  })).optional(),
  confidence: z.number().min(0).max(1),
  processing_time: z.number()
});

// Type inference from schemas
export type TransactionInput = z.infer<typeof TransactionSchema>;
export type AccountInput = z.infer<typeof AccountSchema>;
export type BudgetInput = z.infer<typeof BudgetSchema>;
export type InvestmentInput = z.infer<typeof InvestmentSchema>;
export type AIInsightInput = z.infer<typeof AIInsightSchema>;

export type TransactionFormInput = z.infer<typeof TransactionFormSchema>;
export type BudgetFormInput = z.infer<typeof BudgetFormSchema>;
export type AccountFormInput = z.infer<typeof AccountFormSchema>;

export type TransactionFiltersInput = z.infer<typeof TransactionFiltersSchema>;
export type BudgetFiltersInput = z.infer<typeof BudgetFiltersSchema>;

// Validation helper functions
export const validateTransaction = (data: unknown) => {
  return TransactionSchema.safeParse(data);
};

export const validateAccount = (data: unknown) => {
  return AccountSchema.safeParse(data);
};

export const validateBudget = (data: unknown) => {
  return BudgetSchema.safeParse(data);
};

export const validateInvestment = (data: unknown) => {
  return InvestmentSchema.safeParse(data);
};

export const validateAIInsight = (data: unknown) => {
  return AIInsightSchema.safeParse(data);
};

export const validateTransactionForm = (data: unknown) => {
  return TransactionFormSchema.safeParse(data);
};

export const validateBudgetForm = (data: unknown) => {
  return BudgetFormSchema.safeParse(data);
};

export const validateAccountForm = (data: unknown) => {
  return AccountFormSchema.safeParse(data);
};

export const validateTransactionFilters = (data: unknown) => {
  return TransactionFiltersSchema.safeParse(data);
};

export const validateBudgetFilters = (data: unknown) => {
  return BudgetFiltersSchema.safeParse(data);
};