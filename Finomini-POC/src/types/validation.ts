// Zod validation schemas for all data models

import { z } from 'zod';

// Transaction validation schema
export const TransactionSchema = z.object({
  id: z.string().uuid(),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  date: z.date().max(new Date(), 'Date cannot be in the future'),
  description: z.string().min(1, 'Description is required').max(255, 'Description too long'),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().optional(),
  account_id: z.string().uuid().optional(),
  plaid_transaction_id: z.string().optional(),
  is_manual: z.boolean(),
  is_hidden: z.boolean().default(false),
  receipt_image: z.string().optional(),
  confidence_score: z.number().min(0).max(1).optional(),
  created_at: z.date(),
  updated_at: z.date(),
  tags: z.array(z.string()).optional(),
  notes: z.string().max(1000).optional(),
  merchant: z.string().optional(),
  status: z.enum(['posted', 'pending']).optional(),
});

// Account validation schema
export const AccountSchema = z.object({
  id: z.string().uuid(),
  plaid_account_id: z.string().optional(),
  name: z.string().min(1, 'Account name is required').max(100, 'Name too long'),
  type: z.enum(['checking', 'savings', 'credit', 'investment']),
  balance: z.number(),
  institution_name: z.string().optional(),
  last_synced: z.date().optional(),
  is_active: z.boolean().default(true),
  created_at: z.date(),
  updated_at: z.date(),
});

// Budget validation schema
export const BudgetSchema = z.object({
  id: z.string().uuid(),
  category: z.string().min(1, 'Category is required'),
  amount: z.number().min(0.01, 'Budget amount must be greater than 0'),
  period: z.enum(['weekly', 'monthly', 'yearly']),
  start_date: z.date(),
  current_spent: z.number().min(0).default(0),
  created_at: z.date(),
  updated_at: z.date(),
  is_active: z.boolean().default(true),
});

// Investment validation schema
export const InvestmentSchema = z.object({
  id: z.string().uuid(),
  account_id: z.string().uuid(),
  security_name: z.string().min(1, 'Security name is required'),
  ticker_symbol: z.string().optional(),
  quantity: z.number().min(0, 'Quantity cannot be negative'),
  price: z.number().min(0, 'Price cannot be negative'),
  value: z.number().min(0, 'Value cannot be negative'),
  type: z.enum(['stock', 'bond', 'etf', 'mutual_fund', 'cash', 'crypto', 'real_estate']),
  last_updated: z.date(),
  average_cost_basis: z.number().min(0).optional(),
  daily_change: z.number().optional(),
  daily_change_percent: z.number().optional(),
  total_gain_loss: z.number().optional(),
  total_gain_loss_percent: z.number().optional(),
});

// AI Insight validation schema
export const AIInsightSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['spending_pattern', 'anomaly', 'recommendation', 'prediction']),
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().min(1, 'Description is required').max(1000, 'Description too long'),
  confidence: z.number().min(0).max(1),
  category: z.string().optional(),
  amount: z.number().optional(),
  created_at: z.date(),
  is_read: z.boolean().default(false),
  action_items: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

// Category validation schema (legacy)
export const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Category name is required').max(50, 'Name too long'),
  icon: z.string().min(1, 'Icon is required'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format'),
  group: z.string().min(1, 'Group is required'),
  type: z.enum(['income', 'expense']),
  isSystemDefault: z.boolean().default(false),
  usageCount: z.number().min(0).default(0),
  isArchived: z.boolean().default(false),
});

// Subcategory validation schema (legacy)
export const SubcategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Subcategory name is required').max(50, 'Name too long'),
  categoryId: z.string().uuid(),
  icon: z.string().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').optional(),
  usageCount: z.number().min(0).default(0),
  isArchived: z.boolean().default(false),
});

// Tag validation schema (legacy)
export const TagSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Tag name is required').max(30, 'Name too long'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format'),
  usageCount: z.number().min(0).default(0),
  isArchived: z.boolean().default(false),
});

// Form validation schemas for user input
export const CreateTransactionSchema = TransactionSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
}).extend({
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  date: z.date().max(new Date(), 'Date cannot be in the future'),
});

export const CreateAccountSchema = AccountSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  last_synced: true,
});

export const CreateBudgetSchema = BudgetSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  current_spent: true,
});

export const CreateInvestmentSchema = InvestmentSchema.omit({
  id: true,
  last_updated: true,
});

// Export types inferred from schemas
export type TransactionInput = z.infer<typeof CreateTransactionSchema>;
export type AccountInput = z.infer<typeof CreateAccountSchema>;
export type BudgetInput = z.infer<typeof CreateBudgetSchema>;
export type InvestmentInput = z.infer<typeof CreateInvestmentSchema>;

// Validation utility functions
export const validateTransaction = (data: unknown) => TransactionSchema.parse(data);
export const validateAccount = (data: unknown) => AccountSchema.parse(data);
export const validateBudget = (data: unknown) => BudgetSchema.parse(data);
export const validateInvestment = (data: unknown) => InvestmentSchema.parse(data);
export const validateAIInsight = (data: unknown) => AIInsightSchema.parse(data);

// Safe validation functions that return results instead of throwing
export const safeValidateTransaction = (data: unknown) => TransactionSchema.safeParse(data);
export const safeValidateAccount = (data: unknown) => AccountSchema.safeParse(data);
export const safeValidateBudget = (data: unknown) => BudgetSchema.safeParse(data);
export const safeValidateInvestment = (data: unknown) => InvestmentSchema.safeParse(data);
export const safeValidateAIInsight = (data: unknown) => AIInsightSchema.safeParse(data);