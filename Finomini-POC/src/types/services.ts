// Service interface definitions for the AI Finance Manager

import { Transaction, Account, Investment, Liability, AIInsight, Budget } from './index';

// Plaid Service Interface
export interface PlaidService {
  initializePlaid(userId?: string): Promise<void>;
  connectAccount(): Promise<string>;
  syncTransactions(accessToken: string): Promise<Transaction[]>;
  syncTransactionsEnhanced(
    accessToken: string, 
    options?: {
      startDate?: string;
      endDate?: string;
      existingTransactions?: Transaction[];
      forceRefresh?: boolean;
    }
  ): Promise<{
    transactions: Transaction[];
    newCount: number;
    updatedCount: number;
    deletedIds: string[];
  }>;
  getAccounts(accessToken: string): Promise<Account[]>;
  getInvestments(accessToken: string): Promise<Investment[]>;
  getLiabilities(accessToken: string): Promise<Liability[]>;
  disconnectAccount(accessToken: string): Promise<void>;
}

// AI Service Interface
export interface AIService {
  categorizeTransaction(
    description: string, 
    amount: number, 
    plaidCategory?: string
  ): Promise<{category: string, confidence: number}>;
  generateInsights(transactions: Transaction[]): Promise<AIInsight[]>;
  predictSpending(
    transactions: Transaction[], 
    category?: string
  ): Promise<{amount: number, confidence: number}>;
  analyzeBudgetGoal(
    budget: Budget, 
    transactions: Transaction[]
  ): Promise<{achievable: boolean, recommendation: string}>;
}

// OCR Service Interface
export interface OCRService {
  processReceipt(imageFile: File): Promise<{
    merchant?: string;
    amount?: number;
    date?: Date;
    items?: Array<{name: string, amount: number}>;
    confidence: number;
  }>;
}

// Storage Service Interface
export interface StorageService {
  saveTransactions(transactions: Transaction[]): Promise<void>;
  getTransactions(): Promise<Transaction[]>;
  saveAccounts(accounts: Account[]): Promise<void>;
  getAccounts(): Promise<Account[]>;
  saveBudgets(budgets: Budget[]): Promise<void>;
  getBudgets(): Promise<Budget[]>;
  saveInvestments(investments: Investment[]): Promise<void>;
  getInvestments(): Promise<Investment[]>;
  saveInsights(insights: AIInsight[]): Promise<void>;
  getInsights(): Promise<AIInsight[]>;
  saveSecureData(key: string, data: any): Promise<void>;
  getSecureData(key: string): Promise<any>;
  clearData(): Promise<void>;
}

// Error types for the application
export enum ErrorType {
  PLAID_CONNECTION = 'plaid_connection',
  AI_SERVICE = 'ai_service',
  OCR_PROCESSING = 'ocr_processing',
  STORAGE = 'storage',
  VALIDATION = 'validation',
  NETWORK = 'network'
}

export interface AppError {
  type: ErrorType;
  message: string;
  details?: any;
  timestamp: Date;
  recoverable: boolean;
}

// API Response types
export interface PlaidTransactionResponse {
  transactions: any[];
  accounts: any[];
  total_transactions: number;
  request_id: string;
}

export interface PlaidAccountResponse {
  accounts: any[];
  request_id: string;
}

export interface PlaidInvestmentResponse {
  accounts: any[];
  holdings: any[];
  securities: any[];
  request_id: string;
}

export interface PlaidLinkTokenResponse {
  link_token: string;
  expiration: string;
  request_id: string;
}

export interface PlaidExchangeTokenResponse {
  access_token: string;
  item_id: string;
  request_id: string;
}

export interface AICategorizationResponse {
  category: string;
  subcategory?: string;
  confidence: number;
  reasoning?: string;
}

export interface AIInsightResponse {
  insights: AIInsight[];
  generated_at: Date;
  confidence: number;
  processing_time: number;
}

export interface AIPredictionResponse {
  prediction: {
    amount: number;
    category?: string;
    confidence: number;
    factors: string[];
  };
  confidence_interval: {
    lower: number;
    upper: number;
  };
  generated_at: Date;
}

export interface OCRProcessingResponse {
  text: string;
  merchant?: string;
  amount?: number;
  date?: string;
  items?: Array<{
    name: string;
    price: number;
    quantity?: number;
  }>;
  confidence: number;
  processing_time: number;
}

// Validation result types
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// Sync status types
export interface SyncStatus {
  isActive: boolean;
  lastSync?: Date;
  nextSync?: Date;
  status: 'idle' | 'syncing' | 'error' | 'completed';
  progress?: number;
  error?: string;
}

// Notification types
export interface NotificationData {
  id: string;
  type: 'budget_warning' | 'budget_exceeded' | 'unusual_spending' | 'sync_complete' | 'sync_error';
  title: string;
  message: string;
  data?: any;
  created_at: Date;
  is_read: boolean;
  priority: 'low' | 'medium' | 'high';
}