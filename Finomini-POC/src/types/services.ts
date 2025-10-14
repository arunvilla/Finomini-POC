// Service interface definitions for the AI Finance Manager

import { Transaction, Account, Investment, AIInsight, Budget } from './index';

// Plaid Service Interface
export interface PlaidService {
  initializePlaid(): Promise<void>;
  connectAccount(): Promise<string>;
  syncTransactions(accessToken: string): Promise<Transaction[]>;
  getAccounts(accessToken: string): Promise<Account[]>;
  getInvestments(accessToken: string): Promise<Investment[]>;
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

export interface AICategorizationResponse {
  category: string;
  subcategory?: string;
  confidence: number;
  reasoning?: string;
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