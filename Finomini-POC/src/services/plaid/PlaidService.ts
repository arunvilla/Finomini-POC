// Plaid service implementation for bank account integration

import { 
  PlaidLinkOnSuccess, 
  PlaidLinkOnExit, 
  PlaidLinkOnEvent 
} from 'react-plaid-link';
import { Transaction, Account, Investment, Liability } from '../../types';
import type { 
  PlaidService as IPlaidService, 
  AppError 
} from '../../types/services';
import { ErrorType } from '../../types/services';
import { storageService } from '../storage/StorageService';
import { validateTransaction, validateAccount, validateInvestment } from '../../types/validation';
import { generateId } from '../../utils';

// Plaid API configuration
const PLAID_CONFIG = {
  CLIENT_ID: import.meta.env.VITE_PLAID_CLIENT_ID || 'demo_client_id',
  ENV: (import.meta.env.VITE_PLAID_ENV as 'sandbox' | 'development' | 'production') || 'sandbox',
  PRODUCTS: ['transactions', 'accounts', 'investments'] as const,
  COUNTRY_CODES: ['US'] as const,
};

// Backend API configuration
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:7777/api',
  TIMEOUT: 30000, // 30 seconds
};

// Retry configuration
const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  BASE_DELAY: 1000, // 1 second
  MAX_DELAY: 10000, // 10 seconds
};

interface PlaidTokenData {
  access_token: string;
  item_id: string;
  institution_id?: string;
  institution_name?: string;
  created_at: Date;
  last_synced?: Date;
}

interface BackendResponse<T = any> {
  success: boolean;
  data: T;
  error?: string;
}

interface LinkTokenResponse {
  link_token: string;
  expiration: string;
  request_id: string;
}

interface ExchangeTokenResponse {
  access_token: string;
  item_id: string;
  request_id: string;
}

class PlaidService implements IPlaidService {
  private isInitialized = false;
  private linkToken: string | null = null;
  private connectedTokens: Map<string, PlaidTokenData> = new Map();

  constructor() {
    this.loadStoredTokens();
  }

  // Make HTTP request to backend API
  private async makeBackendRequest<T>(
    endpoint: string, 
    method: 'GET' | 'POST' = 'POST', 
    body?: any
  ): Promise<T> {
    const url = `${API_CONFIG.BASE_URL}/plaid${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result: BackendResponse<T> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Backend request failed');
      }

      return result.data;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw this.createError(ErrorType.NETWORK, 'Request timeout - please check your connection');
        }
        if (error.message.includes('Failed to fetch')) {
          throw this.createError(ErrorType.NETWORK, 'Unable to connect to backend service');
        }
      }
      throw this.createError(ErrorType.PLAID_CONNECTION, `Backend API error: ${error}`);
    }
  }

  // Load stored Plaid tokens from secure storage
  private async loadStoredTokens(): Promise<void> {
    try {
      const tokens = await storageService.getSecureData('plaid_tokens');
      if (tokens && Array.isArray(tokens)) {
        tokens.forEach((tokenData: PlaidTokenData) => {
          this.connectedTokens.set(tokenData.access_token, {
            ...tokenData,
            created_at: new Date(tokenData.created_at),
            last_synced: tokenData.last_synced ? new Date(tokenData.last_synced) : undefined,
          });
        });
      }
    } catch (error) {
      console.error('Failed to load stored Plaid tokens:', error);
    }
  }

  // Save Plaid tokens to secure storage
  private async saveTokens(): Promise<void> {
    try {
      const tokens = Array.from(this.connectedTokens.values());
      await storageService.saveSecureData('plaid_tokens', tokens);
    } catch (error) {
      console.error('Failed to save Plaid tokens:', error);
      throw this.createError(ErrorType.STORAGE, 'Failed to save connection data');
    }
  }

  // Create standardized error objects
  private createError(type: ErrorType, message: string, details?: any): AppError {
    return {
      type,
      message,
      details,
      timestamp: new Date(),
      recoverable: type !== ErrorType.PLAID_CONNECTION,
    };
  }

  // Exponential backoff retry logic
  private async retryWithBackoff<T>(
    operation: () => Promise<T>,
    retries = RETRY_CONFIG.MAX_RETRIES
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (retries <= 0) {
        throw error;
      }

      const delay = Math.min(
        RETRY_CONFIG.BASE_DELAY * Math.pow(2, RETRY_CONFIG.MAX_RETRIES - retries),
        RETRY_CONFIG.MAX_DELAY
      );

      console.log(`Retrying operation in ${delay}ms. Retries left: ${retries - 1}`);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      return this.retryWithBackoff(operation, retries - 1);
    }
  }

  // Initialize Plaid Link SDK
  async initializePlaid(userId?: string): Promise<void> {
    try {
      if (this.isInitialized) {
        return;
      }

      // Create link token via backend API
      this.linkToken = await this.createLinkToken(userId);
      this.isInitialized = true;
      
      console.log('Plaid Link initialized successfully with backend');
    } catch (error) {
      console.error('Failed to initialize Plaid:', error);
      throw this.createError(
        ErrorType.PLAID_CONNECTION,
        'Failed to initialize Plaid Link. Please check your backend connection and Plaid configuration.',
        error
      );
    }
  }

  // Create link token via backend API
  private async createLinkToken(userId?: string): Promise<string> {
    try {
      const response = await this.makeBackendRequest<LinkTokenResponse>('/link-token', 'POST', {
        user_id: userId || `user_${Date.now()}`,
      });

      console.log('Link token created successfully:', response.request_id);
      return response.link_token;
    } catch (error) {
      console.error('Failed to create link token:', error);
      throw this.createError(
        ErrorType.PLAID_CONNECTION,
        'Failed to create Plaid Link token. Please check your backend connection.',
        error
      );
    }
  }

  // Get Plaid Link configuration
  getPlaidLinkConfig() {
    if (!this.isInitialized || !this.linkToken) {
      throw this.createError(
        ErrorType.PLAID_CONNECTION,
        'Plaid Link not initialized. Call initializePlaid() first.'
      );
    }

    return {
      token: this.linkToken,
      onSuccess: this.handleLinkSuccess.bind(this),
      onExit: this.handleLinkExit.bind(this),
      onEvent: this.handleLinkEvent.bind(this),
      env: PLAID_CONFIG.ENV,
      product: PLAID_CONFIG.PRODUCTS,
      countryCodes: PLAID_CONFIG.COUNTRY_CODES,
    };
  }

  // Handle successful Plaid Link connection
  private handleLinkSuccess: PlaidLinkOnSuccess = async (public_token, metadata) => {
    try {
      console.log('Plaid Link success:', { public_token, metadata });
      
      // Exchange public token for access token via backend
      const accessToken = await this.exchangePublicToken(public_token);
      
      // Get additional account information from backend to verify connection
      let institutionName = metadata.institution?.name;
      try {
        const accountsData = await this.makeBackendRequest<any>('/accounts', 'POST', {
          access_token: accessToken,
        });
        
        // Use institution name from accounts data if available
        if (accountsData.accounts && accountsData.accounts.length > 0) {
          const firstAccount = accountsData.accounts[0];
          if (firstAccount.institution_name) {
            institutionName = firstAccount.institution_name;
          }
        }
      } catch (error) {
        console.warn('Could not fetch account details during connection:', error);
        // Continue with metadata institution name
      }
      
      // Store token data with enhanced metadata
      const tokenData: PlaidTokenData = {
        access_token: accessToken,
        item_id: metadata.link_session_id,
        institution_id: metadata.institution?.institution_id,
        institution_name: institutionName,
        created_at: new Date(),
      };

      this.connectedTokens.set(accessToken, tokenData);
      await this.saveTokens();

      console.log('Account connected successfully:', institutionName);
    } catch (error) {
      console.error('Failed to handle Plaid Link success:', error);
      throw this.createError(
        ErrorType.PLAID_CONNECTION,
        'Failed to complete account connection',
        error
      );
    }
  };

  // Handle Plaid Link exit
  private handleLinkExit: PlaidLinkOnExit = (err, metadata) => {
    if (err) {
      console.error('Plaid Link exit with error:', err);
      
      // Log specific error types for debugging
      if (err.error_code) {
        console.error(`Plaid error code: ${err.error_code}, type: ${err.error_type}`);
      }
      
      // Create user-friendly error message
      let userMessage = 'Account connection was cancelled or failed.';
      if (err.error_type === 'INVALID_CREDENTIALS') {
        userMessage = 'Invalid login credentials. Please check your username and password.';
      } else if (err.error_type === 'INSTITUTION_ERROR') {
        userMessage = 'Your bank is temporarily unavailable. Please try again later.';
      } else if (err.error_type === 'RATE_LIMIT_EXCEEDED') {
        userMessage = 'Too many connection attempts. Please wait a few minutes and try again.';
      }
      
      // You could emit this error to a global error handler or store
      console.warn('User-friendly error message:', userMessage);
    } else {
      console.log('Plaid Link exit (user cancelled):', metadata);
    }
  };

  // Handle Plaid Link events
  private handleLinkEvent: PlaidLinkOnEvent = (eventName, metadata) => {
    console.log('Plaid Link event:', eventName, metadata);
  };

  // Exchange public token for access token via backend API
  private async exchangePublicToken(publicToken: string): Promise<string> {
    try {
      const response = await this.makeBackendRequest<ExchangeTokenResponse>('/exchange-token', 'POST', {
        public_token: publicToken,
      });

      console.log('Public token exchanged successfully:', response.request_id);
      return response.access_token;
    } catch (error) {
      console.error('Failed to exchange public token:', error);
      throw this.createError(
        ErrorType.PLAID_CONNECTION,
        'Failed to exchange public token. Please try connecting your account again.',
        error
      );
    }
  }

  // Connect account (returns access token)
  async connectAccount(): Promise<string> {
    if (!this.isInitialized) {
      await this.initializePlaid();
    }

    // In a React component, you would use the usePlaidLink hook with the config
    // This method returns the configuration needed for the hook
    throw this.createError(
      ErrorType.PLAID_CONNECTION,
      'Use getPlaidLinkConfig() with usePlaidLink hook in React component'
    );
  }

  // Get all connected access tokens
  getConnectedTokens(): string[] {
    return Array.from(this.connectedTokens.keys());
  }

  // Get token information
  getTokenInfo(accessToken: string): PlaidTokenData | null {
    return this.connectedTokens.get(accessToken) || null;
  }

  // Legacy sync method for backward compatibility
  async syncTransactions(accessToken: string): Promise<Transaction[]> {
    const result = await this.syncTransactionsEnhanced(accessToken);
    return result.transactions;
  }

  // Sync transactions from Plaid API with deduplication and update handling
  async syncTransactionsEnhanced(
    accessToken: string, 
    options: {
      startDate?: string;
      endDate?: string;
      existingTransactions?: Transaction[];
      forceRefresh?: boolean;
    } = {}
  ): Promise<{
    transactions: Transaction[];
    newCount: number;
    updatedCount: number;
    deletedIds: string[];
  }> {
    try {
      if (!this.connectedTokens.has(accessToken)) {
        throw this.createError(
          ErrorType.PLAID_CONNECTION,
          'Invalid access token. Please reconnect your account.'
        );
      }

      return await this.retryWithBackoff(async () => {
        // Force refresh transactions if requested
        if (options.forceRefresh) {
          try {
            await this.makeBackendRequest<any>('/refresh-transactions', 'POST', {
              access_token: accessToken,
            });
            console.log('Forced transaction refresh completed');
          } catch (error) {
            console.warn('Failed to force refresh transactions:', error);
            // Continue with regular sync
          }
        }

        // Fetch transactions from Plaid API
        const plaidTransactions = await this.fetchPlaidTransactions(
          accessToken,
          options.startDate,
          options.endDate
        );
        
        // Transform Plaid transactions to our Transaction interface
        const newTransactions = plaidTransactions.map(this.transformPlaidTransaction);
        
        // Validate transactions
        const validTransactions = newTransactions.filter(transaction => {
          try {
            validateTransaction(transaction);
            return true;
          } catch (error) {
            console.warn('Invalid transaction data:', transaction, error);
            return false;
          }
        });

        // Perform deduplication and update detection
        const existingTransactions = options.existingTransactions || [];
        const result = this.deduplicateAndMergeTransactions(validTransactions, existingTransactions);

        // Update last sync time
        const tokenData = this.connectedTokens.get(accessToken);
        if (tokenData) {
          tokenData.last_synced = new Date();
          await this.saveTokens();
        }

        console.log(`Sync completed: ${result.newCount} new, ${result.updatedCount} updated, ${result.deletedIds.length} deleted`);
        return result;
      });
    } catch (error) {
      console.error('Failed to sync transactions:', error);
      throw this.createError(
        ErrorType.PLAID_CONNECTION,
        'Failed to sync transactions from your bank',
        error
      );
    }
  }

  // Enhanced sync method that returns raw Plaid data for advanced processing
  async fetchRawTransactions(
    accessToken: string,
    startDate?: string,
    endDate?: string
  ): Promise<any[]> {
    if (!this.connectedTokens.has(accessToken)) {
      throw this.createError(
        ErrorType.PLAID_CONNECTION,
        'Invalid access token. Please reconnect your account.'
      );
    }

    return await this.retryWithBackoff(async () => {
      return await this.fetchPlaidTransactions(accessToken, startDate, endDate);
    });
  }

  // Handle Plaid webhook notifications (for real-time updates)
  async handleWebhookNotification(webhookData: {
    webhook_type: string;
    webhook_code: string;
    item_id: string;
    error?: any;
  }): Promise<{
    shouldSync: boolean;
    accessToken?: string;
    message: string;
  }> {
    try {
      const { webhook_type, webhook_code, item_id, error } = webhookData;
      
      // Find access token by item_id
      let accessToken: string | undefined;
      for (const [token, data] of this.connectedTokens.entries()) {
        if (data.item_id === item_id) {
          accessToken = token;
          break;
        }
      }

      if (!accessToken) {
        return {
          shouldSync: false,
          message: `No access token found for item_id: ${item_id}`,
        };
      }

      // Handle different webhook types
      switch (webhook_type) {
        case 'TRANSACTIONS':
          switch (webhook_code) {
            case 'INITIAL_UPDATE':
              return {
                shouldSync: true,
                accessToken,
                message: 'Initial transaction data available',
              };
            case 'HISTORICAL_UPDATE':
              return {
                shouldSync: true,
                accessToken,
                message: 'Historical transaction data updated',
              };
            case 'DEFAULT_UPDATE':
              return {
                shouldSync: true,
                accessToken,
                message: 'New transaction data available',
              };
            case 'TRANSACTIONS_REMOVED':
              return {
                shouldSync: true,
                accessToken,
                message: 'Some transactions were removed',
              };
          }
          break;

        case 'ITEM':
          switch (webhook_code) {
            case 'ERROR':
              console.error('Plaid item error:', error);
              return {
                shouldSync: false,
                accessToken,
                message: `Item error: ${error?.error_message || 'Unknown error'}`,
              };
            case 'PENDING_EXPIRATION':
              return {
                shouldSync: false,
                accessToken,
                message: 'Item access will expire soon - user needs to re-authenticate',
              };
          }
          break;

        case 'HOLDINGS':
          return {
            shouldSync: true,
            accessToken,
            message: 'Investment holdings updated',
          };

        case 'LIABILITIES':
          return {
            shouldSync: true,
            accessToken,
            message: 'Liability data updated',
          };
      }

      return {
        shouldSync: false,
        accessToken,
        message: `Unhandled webhook: ${webhook_type}.${webhook_code}`,
      };
    } catch (error) {
      console.error('Failed to handle webhook notification:', error);
      return {
        shouldSync: false,
        message: `Webhook handling error: ${error}`,
      };
    }
  }

  // Fetch transactions from Plaid API via backend
  private async fetchPlaidTransactions(
    accessToken: string, 
    startDate?: string, 
    endDate?: string,
    count?: number,
    offset?: number
  ): Promise<any[]> {
    try {
      // Default to last 90 days if no date range provided
      const end = endDate || new Date().toISOString().split('T')[0];
      const start = startDate || new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const response = await this.makeBackendRequest<any>('/transactions', 'POST', {
        access_token: accessToken,
        start_date: start,
        end_date: end,
        count: count || 500,
        offset: offset || 0,
      });

      console.log(`Fetched ${response.transactions?.length || 0} transactions from Plaid API`);
      return response.transactions || [];
    } catch (error) {
      console.error('Failed to fetch Plaid transactions:', error);
      throw error;
    }
  }

  // Deduplicate and merge transactions with existing data
  private deduplicateAndMergeTransactions(
    newTransactions: Transaction[],
    existingTransactions: Transaction[]
  ): {
    transactions: Transaction[];
    newCount: number;
    updatedCount: number;
    deletedIds: string[];
  } {
    const existingByPlaidId = new Map<string, Transaction>();
    const existingById = new Map<string, Transaction>();
    
    // Index existing transactions
    existingTransactions.forEach(tx => {
      if (tx.plaid_transaction_id) {
        existingByPlaidId.set(tx.plaid_transaction_id, tx);
      }
      existingById.set(tx.id, tx);
    });

    const finalTransactions: Transaction[] = [];
    const updatedTransactions: Transaction[] = [];
    let newCount = 0;
    let updatedCount = 0;

    // Process new transactions
    for (const newTx of newTransactions) {
      if (!newTx.plaid_transaction_id) {
        // Skip transactions without Plaid ID
        continue;
      }

      const existing = existingByPlaidId.get(newTx.plaid_transaction_id);
      
      if (existing) {
        // Check if transaction has been updated
        const hasChanges = 
          existing.amount !== newTx.amount ||
          existing.description !== newTx.description ||
          existing.date.getTime() !== newTx.date.getTime() ||
          existing.category !== newTx.category ||
          existing.merchant !== newTx.merchant;

        if (hasChanges) {
          // Update existing transaction while preserving user modifications
          const updatedTx: Transaction = {
            ...existing,
            amount: newTx.amount,
            description: newTx.description,
            date: newTx.date,
            merchant: newTx.merchant,
            // Only update category if user hasn't manually changed it
            category: existing.confidence_score === 0.9 ? newTx.category : existing.category,
            subcategory: existing.confidence_score === 0.9 ? newTx.subcategory : existing.subcategory,
            updated_at: new Date(),
            status: newTx.status,
          };
          
          finalTransactions.push(updatedTx);
          updatedTransactions.push(updatedTx);
          updatedCount++;
        } else {
          // No changes, keep existing
          finalTransactions.push(existing);
        }
      } else {
        // New transaction
        finalTransactions.push(newTx);
        newCount++;
      }
    }

    // Add existing manual transactions (not from Plaid)
    existingTransactions.forEach(tx => {
      if (tx.is_manual || !tx.plaid_transaction_id) {
        finalTransactions.push(tx);
      }
    });

    // Detect deleted transactions (Plaid transactions that are no longer returned)
    const newPlaidIds = new Set(newTransactions.map(tx => tx.plaid_transaction_id).filter(Boolean));
    const deletedIds: string[] = [];
    
    existingTransactions.forEach(tx => {
      if (tx.plaid_transaction_id && !newPlaidIds.has(tx.plaid_transaction_id) && !tx.is_manual) {
        deletedIds.push(tx.id);
      }
    });

    return {
      transactions: finalTransactions.sort((a, b) => b.date.getTime() - a.date.getTime()),
      newCount,
      updatedCount,
      deletedIds,
    };
  }

  // Transform Plaid transaction to our Transaction interface
  private transformPlaidTransaction = (plaidTx: any): Transaction => {
    // Handle Plaid's amount format (positive for debits, negative for credits)
    const amount = Math.abs(plaidTx.amount);
    const isIncome = plaidTx.amount < 0;

    // Extract category information
    const categories = Array.isArray(plaidTx.category) ? plaidTx.category : [plaidTx.category || 'Other'];
    const primaryCategory = categories[0] || 'Other';
    const subcategory = categories[1] || undefined;

    return {
      id: generateId(),
      amount: amount,
      date: new Date(plaidTx.date),
      description: plaidTx.name || plaidTx.merchant_name || 'Unknown Transaction',
      category: isIncome ? 'Income' : primaryCategory,
      subcategory: isIncome ? 'Deposit' : subcategory,
      account_id: plaidTx.account_id,
      plaid_transaction_id: plaidTx.transaction_id,
      is_manual: false,
      is_hidden: false,
      confidence_score: 0.9, // High confidence for Plaid data
      created_at: new Date(),
      updated_at: new Date(),
      merchant: plaidTx.merchant_name || undefined,
      status: plaidTx.pending ? 'pending' : 'posted',
      type: isIncome ? 'income' : 'expense',
    };
  };

  // Get accounts from Plaid API
  async getAccounts(accessToken: string): Promise<Account[]> {
    try {
      if (!this.connectedTokens.has(accessToken)) {
        throw this.createError(
          ErrorType.PLAID_CONNECTION,
          'Invalid access token. Please reconnect your account.'
        );
      }

      return await this.retryWithBackoff(async () => {
        // Simulate Plaid API call to fetch accounts
        const plaidAccounts = await this.fetchPlaidAccounts(accessToken);
        
        // Transform Plaid accounts to our Account interface
        const accounts = plaidAccounts.map(this.transformPlaidAccount);
        
        // Validate accounts
        const validAccounts = accounts.filter(account => {
          try {
            validateAccount(account);
            return true;
          } catch (error) {
            console.warn('Invalid account data:', account, error);
            return false;
          }
        });

        console.log(`Fetched ${validAccounts.length} accounts from Plaid`);
        return validAccounts;
      });
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
      throw this.createError(
        ErrorType.PLAID_CONNECTION,
        'Failed to fetch account information',
        error
      );
    }
  }

  // Fetch accounts from Plaid API via backend
  private async fetchPlaidAccounts(accessToken: string): Promise<any[]> {
    try {
      const response = await this.makeBackendRequest<any>('/accounts', 'POST', {
        access_token: accessToken,
      });

      console.log(`Fetched ${response.accounts?.length || 0} accounts from Plaid API`);
      return response.accounts || [];
    } catch (error) {
      console.error('Failed to fetch Plaid accounts:', error);
      throw error;
    }
  }

  // Transform Plaid account to our Account interface
  private transformPlaidAccount = (plaidAcc: any): Account => {
    const accountTypeMap: Record<string, 'checking' | 'savings' | 'credit' | 'investment'> = {
      'checking': 'checking',
      'savings': 'savings',
      'credit card': 'credit',
      'investment': 'investment',
    };

    return {
      id: generateId(),
      plaid_account_id: plaidAcc.account_id,
      name: plaidAcc.name,
      type: accountTypeMap[plaidAcc.subtype] || 'checking',
      balance: plaidAcc.balances.current || 0,
      institution_name: plaidAcc.institution_name,
      last_synced: new Date(),
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
  };

  // Get investments from Plaid API
  async getInvestments(accessToken: string): Promise<Investment[]> {
    try {
      if (!this.connectedTokens.has(accessToken)) {
        throw this.createError(
          ErrorType.PLAID_CONNECTION,
          'Invalid access token. Please reconnect your account.'
        );
      }

      return await this.retryWithBackoff(async () => {
        // Fetch investment data from Plaid API
        const investmentData = await this.fetchPlaidInvestments(accessToken);
        
        // Create a map of securities for easy lookup
        const securitiesMap = new Map();
        investmentData.securities.forEach(security => {
          securitiesMap.set(security.security_id, security);
        });

        // Transform holdings with security information
        const investments = investmentData.holdings.map(holding => 
          this.transformPlaidInvestment(holding, securitiesMap.get(holding.security_id))
        );
        
        // Validate investments
        const validInvestments = investments.filter(investment => {
          try {
            // Basic validation for required fields
            if (!investment.security_name || typeof investment.quantity !== 'number' || 
                typeof investment.price !== 'number' || typeof investment.value !== 'number') {
              return false;
            }
            validateInvestment(investment);
            return true;
          } catch (error) {
            console.warn('Invalid investment data:', investment, error);
            return false;
          }
        });

        console.log(`Fetched ${validInvestments.length} investments from Plaid`);
        return validInvestments;
      });
    } catch (error) {
      console.error('Failed to fetch investments:', error);
      throw this.createError(
        ErrorType.PLAID_CONNECTION,
        'Failed to fetch investment information',
        error
      );
    }
  }

  // Fetch investments from Plaid API via backend
  private async fetchPlaidInvestments(accessToken: string): Promise<{
    holdings: any[];
    securities: any[];
    accounts: any[];
  }> {
    try {
      const response = await this.makeBackendRequest<any>('/investments', 'POST', {
        access_token: accessToken,
      });

      console.log(`Fetched ${response.holdings?.length || 0} investment holdings from Plaid API`);
      return {
        holdings: response.holdings || [],
        securities: response.securities || [],
        accounts: response.accounts || [],
      };
    } catch (error) {
      console.error('Failed to fetch Plaid investments:', error);
      throw error;
    }
  }

  // Transform Plaid investment to our Investment interface
  private transformPlaidInvestment = (holding: any, security?: any): Investment => {
    const investmentTypeMap: Record<string, Investment['type']> = {
      'equity': 'stock',
      'etf': 'etf',
      'mutual fund': 'mutual_fund',
      'bond': 'bond',
      'cash': 'cash',
      'derivative': 'stock', // Map derivatives to stock for simplicity
      'other': 'stock',
    };

    // Calculate current value
    const quantity = holding.quantity || 0;
    const price = security?.close_price || holding.institution_price || 0;
    const value = quantity * price;

    // Calculate daily change if available
    const costBasis = holding.cost_basis || 0;
    const dailyChange = value - costBasis;
    const dailyChangePercent = costBasis > 0 ? (dailyChange / costBasis) * 100 : 0;

    return {
      id: generateId(),
      account_id: holding.account_id,
      security_name: security?.name || holding.security_id || 'Unknown Security',
      ticker_symbol: security?.ticker_symbol || undefined,
      quantity: quantity,
      price: price,
      value: value,
      type: investmentTypeMap[security?.type] || 'stock',
      last_updated: new Date(),
      average_cost_basis: costBasis,
      daily_change: dailyChange,
      daily_change_percent: dailyChangePercent,
      security_id: holding.security_id,
      institution_value: holding.institution_value,
      iso_currency_code: security?.iso_currency_code || 'USD',
    };
  };

  // Get liabilities from Plaid API
  async getLiabilities(accessToken: string): Promise<Liability[]> {
    try {
      if (!this.connectedTokens.has(accessToken)) {
        throw this.createError(
          ErrorType.PLAID_CONNECTION,
          'Invalid access token. Please reconnect your account.'
        );
      }

      return await this.retryWithBackoff(async () => {
        // Fetch liability data from Plaid API
        const liabilityData = await this.fetchPlaidLiabilities(accessToken);
        
        const liabilities: Liability[] = [];

        // Process credit card liabilities
        if (liabilityData.liabilities.credit) {
          liabilityData.liabilities.credit.forEach((creditCard: any) => {
            liabilities.push(this.transformPlaidLiability(creditCard, 'credit_card'));
          });
        }

        // Process mortgage liabilities
        if (liabilityData.liabilities.mortgage) {
          liabilityData.liabilities.mortgage.forEach((mortgage: any) => {
            liabilities.push(this.transformPlaidLiability(mortgage, 'mortgage'));
          });
        }

        // Process student loan liabilities
        if (liabilityData.liabilities.student) {
          liabilityData.liabilities.student.forEach((studentLoan: any) => {
            liabilities.push(this.transformPlaidLiability(studentLoan, 'student_loan'));
          });
        }

        // Validate liabilities
        const validLiabilities = liabilities.filter(liability => {
          try {
            // Basic validation for required fields
            if (!liability.name || typeof liability.balance !== 'number' || 
                isNaN(liability.balance) || !liability.type) {
              return false;
            }
            return true;
          } catch (error) {
            console.warn('Invalid liability data:', liability, error);
            return false;
          }
        });

        console.log(`Fetched ${validLiabilities.length} liabilities from Plaid`);
        return validLiabilities;
      });
    } catch (error) {
      console.error('Failed to fetch liabilities:', error);
      throw this.createError(
        ErrorType.PLAID_CONNECTION,
        'Failed to fetch liability information',
        error
      );
    }
  }

  // Fetch liabilities from Plaid API via backend
  private async fetchPlaidLiabilities(accessToken: string): Promise<{
    accounts: any[];
    liabilities: any;
  }> {
    try {
      const response = await this.makeBackendRequest<any>('/liabilities', 'POST', {
        access_token: accessToken,
      });

      console.log(`Fetched liability data from Plaid API`);
      return {
        accounts: response.accounts || [],
        liabilities: response.liabilities || {},
      };
    } catch (error) {
      console.error('Failed to fetch Plaid liabilities:', error);
      throw error;
    }
  }

  // Transform Plaid liability to our Liability interface
  private transformPlaidLiability = (plaidLiab: any, type: Liability['type']): Liability => {
    // Extract balance based on liability type
    let balance = 0;
    let minimumPayment = 0;
    let interestRate = 0;
    let dueDate: Date | undefined;
    let lastPaymentDate: Date | undefined;
    let lastPaymentAmount = 0;

    switch (type) {
      case 'credit_card':
        balance = Math.abs(plaidLiab.balances?.current || 0);
        minimumPayment = plaidLiab.minimum_payment_amount || 0;
        interestRate = plaidLiab.aprs?.find((apr: any) => apr.apr_type === 'purchase_apr')?.apr_percentage || 0;
        dueDate = plaidLiab.next_payment_due_date ? new Date(plaidLiab.next_payment_due_date) : undefined;
        lastPaymentDate = plaidLiab.last_payment_date ? new Date(plaidLiab.last_payment_date) : undefined;
        lastPaymentAmount = plaidLiab.last_payment_amount || 0;
        break;

      case 'mortgage':
        balance = Math.abs(plaidLiab.current_balance || 0);
        minimumPayment = plaidLiab.minimum_payment || 0;
        interestRate = plaidLiab.interest_rate?.percentage || 0;
        dueDate = plaidLiab.next_payment_due_date ? new Date(plaidLiab.next_payment_due_date) : undefined;
        lastPaymentDate = plaidLiab.last_payment_date ? new Date(plaidLiab.last_payment_date) : undefined;
        lastPaymentAmount = plaidLiab.last_payment_amount || 0;
        break;

      case 'student_loan':
        balance = Math.abs(plaidLiab.balance || 0);
        minimumPayment = plaidLiab.minimum_payment_amount || 0;
        interestRate = plaidLiab.interest_rate_percentage || 0;
        dueDate = plaidLiab.next_payment_due_date ? new Date(plaidLiab.next_payment_due_date) : undefined;
        lastPaymentDate = plaidLiab.last_payment_date ? new Date(plaidLiab.last_payment_date) : undefined;
        lastPaymentAmount = plaidLiab.last_payment_amount || 0;
        break;
    }

    return {
      id: generateId(),
      account_id: plaidLiab.account_id,
      name: plaidLiab.name || `${type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
      type: type,
      balance: balance,
      minimum_payment: minimumPayment,
      interest_rate: interestRate,
      due_date: dueDate,
      last_payment_date: lastPaymentDate,
      last_payment_amount: lastPaymentAmount,
      last_updated: new Date(),
      plaid_account_id: plaidLiab.account_id,
      // Additional fields for specific liability types
      credit_limit: type === 'credit_card' ? plaidLiab.balances?.limit : undefined,
      original_balance: type === 'mortgage' || type === 'student_loan' ? plaidLiab.original_balance : undefined,
      maturity_date: plaidLiab.maturity_date ? new Date(plaidLiab.maturity_date) : undefined,
    };
  };

  // Incremental sync - only fetch transactions since last sync
  async incrementalSync(
    accessToken: string,
    existingTransactions: Transaction[]
  ): Promise<{
    transactions: Transaction[];
    newCount: number;
    updatedCount: number;
    deletedIds: string[];
  }> {
    try {
      const tokenData = this.connectedTokens.get(accessToken);
      if (!tokenData) {
        throw this.createError(
          ErrorType.PLAID_CONNECTION,
          'Invalid access token. Please reconnect your account.'
        );
      }

      // Calculate date range for incremental sync
      const lastSyncDate = tokenData.last_synced;
      const startDate = lastSyncDate 
        ? new Date(lastSyncDate.getTime() - 7 * 24 * 60 * 60 * 1000) // 7 days before last sync for safety
        : new Date(Date.now() - 90 * 24 * 60 * 60 * 1000); // Default to 90 days

      const endDate = new Date();

      console.log(`Performing incremental sync from ${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`);

      return await this.syncTransactionsEnhanced(accessToken, {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        existingTransactions,
      });
    } catch (error) {
      console.error('Incremental sync failed:', error);
      throw this.createError(
        ErrorType.PLAID_CONNECTION,
        'Failed to perform incremental sync',
        error
      );
    }
  }

  // Full sync - fetch all available transactions
  async fullSync(
    accessToken: string,
    existingTransactions: Transaction[]
  ): Promise<{
    transactions: Transaction[];
    newCount: number;
    updatedCount: number;
    deletedIds: string[];
  }> {
    try {
      console.log('Performing full transaction sync');

      return await this.syncTransactionsEnhanced(accessToken, {
        startDate: new Date(Date.now() - 730 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 years
        endDate: new Date().toISOString().split('T')[0],
        existingTransactions,
        forceRefresh: true,
      });
    } catch (error) {
      console.error('Full sync failed:', error);
      throw this.createError(
        ErrorType.PLAID_CONNECTION,
        'Failed to perform full sync',
        error
      );
    }
  }

  // Disconnect account via backend API
  async disconnectAccount(accessToken: string): Promise<void> {
    try {
      if (!this.connectedTokens.has(accessToken)) {
        throw this.createError(
          ErrorType.PLAID_CONNECTION,
          'Account not found or already disconnected'
        );
      }

      // Call backend API to remove the item
      await this.makeBackendRequest<any>('/remove-item', 'POST', {
        access_token: accessToken,
      });

      // Remove from local storage
      this.connectedTokens.delete(accessToken);
      await this.saveTokens();

      console.log('Account disconnected successfully');
    } catch (error) {
      console.error('Failed to disconnect account:', error);
      throw this.createError(
        ErrorType.PLAID_CONNECTION,
        'Failed to disconnect account',
        error
      );
    }
  }

  // Validate access token with backend
  async validateAccessToken(accessToken: string): Promise<boolean> {
    try {
      await this.makeBackendRequest<any>('/item-status', 'POST', {
        access_token: accessToken,
      });
      return true;
    } catch (error) {
      console.warn('Access token validation failed:', error);
      return false;
    }
  }

  // Refresh link token (for re-authentication)
  async refreshLinkToken(_accessToken: string): Promise<string> {
    try {
      // For re-authentication, we need to create a new link token
      // In a real implementation, you might want to pass the access token to maintain context
      return await this.createLinkToken();
    } catch (error) {
      console.error('Failed to refresh link token:', error);
      throw this.createError(
        ErrorType.PLAID_CONNECTION,
        'Failed to refresh connection. Please try reconnecting your account.',
        error
      );
    }
  }

  // Get connection status
  isConnected(accessToken?: string): boolean {
    if (accessToken) {
      return this.connectedTokens.has(accessToken);
    }
    return this.connectedTokens.size > 0;
  }

  // Get institution metadata from backend
  async getInstitutionMetadata(accessToken: string): Promise<{
    institutionId?: string;
    institutionName?: string;
    status?: string;
    lastUpdate?: Date;
  }> {
    try {
      const response = await this.makeBackendRequest<any>('/item-status', 'POST', {
        access_token: accessToken,
      });

      return {
        institutionId: response.item?.institution_id,
        institutionName: response.item?.institution_name,
        status: response.status?.last_webhook?.webhook_type || 'connected',
        lastUpdate: response.item?.update_type ? new Date() : undefined,
      };
    } catch (error) {
      console.warn('Failed to get institution metadata:', error);
      const tokenData = this.connectedTokens.get(accessToken);
      return {
        institutionId: tokenData?.institution_id,
        institutionName: tokenData?.institution_name || 'Unknown Institution',
        status: 'unknown',
      };
    }
  }

  // Calculate net worth including all asset types
  async calculateNetWorth(accessToken: string): Promise<{
    totalAssets: number;
    totalLiabilities: number;
    netWorth: number;
    breakdown: {
      cash: number;
      investments: number;
      creditCards: number;
      mortgages: number;
      loans: number;
    };
  }> {
    try {
      // Fetch all financial data
      const [accounts, investments, liabilities] = await Promise.all([
        this.getAccounts(accessToken),
        this.getInvestments(accessToken).catch(() => []), // Investments might not be available
        this.getLiabilities(accessToken).catch(() => []), // Liabilities might not be available
      ]);

      // Calculate cash assets (checking, savings accounts)
      const cashAssets = accounts
        .filter(account => ['checking', 'savings'].includes(account.type))
        .reduce((sum, account) => sum + account.balance, 0);

      // Calculate investment assets
      const investmentAssets = investments
        .reduce((sum, investment) => sum + investment.value, 0);

      // Calculate liabilities by type
      const creditCardDebt = liabilities
        .filter(liability => liability.type === 'credit_card')
        .reduce((sum, liability) => sum + liability.balance, 0);

      const mortgageDebt = liabilities
        .filter(liability => liability.type === 'mortgage')
        .reduce((sum, liability) => sum + liability.balance, 0);

      const loanDebt = liabilities
        .filter(liability => ['student_loan', 'auto_loan', 'personal_loan', 'line_of_credit'].includes(liability.type))
        .reduce((sum, liability) => sum + liability.balance, 0);

      const totalAssets = cashAssets + investmentAssets;
      const totalLiabilities = creditCardDebt + mortgageDebt + loanDebt;
      const netWorth = totalAssets - totalLiabilities;

      return {
        totalAssets,
        totalLiabilities,
        netWorth,
        breakdown: {
          cash: cashAssets,
          investments: investmentAssets,
          creditCards: creditCardDebt,
          mortgages: mortgageDebt,
          loans: loanDebt,
        },
      };
    } catch (error) {
      console.error('Failed to calculate net worth:', error);
      throw this.createError(
        ErrorType.PLAID_CONNECTION,
        'Failed to calculate net worth',
        error
      );
    }
  }

  // Get investment performance tracking
  async getInvestmentPerformance(accessToken: string): Promise<{
    totalValue: number;
    totalCostBasis: number;
    totalGainLoss: number;
    totalGainLossPercent: number;
    topPerformers: Investment[];
    worstPerformers: Investment[];
  }> {
    try {
      const investments = await this.getInvestments(accessToken);

      if (investments.length === 0) {
        return {
          totalValue: 0,
          totalCostBasis: 0,
          totalGainLoss: 0,
          totalGainLossPercent: 0,
          topPerformers: [],
          worstPerformers: [],
        };
      }

      const totalValue = investments.reduce((sum, inv) => sum + inv.value, 0);
      const totalCostBasis = investments.reduce((sum, inv) => sum + (inv.average_cost_basis || 0), 0);
      const totalGainLoss = totalValue - totalCostBasis;
      const totalGainLossPercent = totalCostBasis > 0 ? (totalGainLoss / totalCostBasis) * 100 : 0;

      // Sort by performance
      const sortedByPerformance = investments
        .filter(inv => inv.average_cost_basis && inv.average_cost_basis > 0)
        .map(inv => ({
          ...inv,
          performancePercent: ((inv.value - (inv.average_cost_basis || 0)) / (inv.average_cost_basis || 1)) * 100,
        }))
        .sort((a, b) => b.performancePercent - a.performancePercent);

      return {
        totalValue,
        totalCostBasis,
        totalGainLoss,
        totalGainLossPercent,
        topPerformers: sortedByPerformance.slice(0, 5),
        worstPerformers: sortedByPerformance.slice(-5).reverse(),
      };
    } catch (error) {
      console.error('Failed to get investment performance:', error);
      throw this.createError(
        ErrorType.PLAID_CONNECTION,
        'Failed to get investment performance data',
        error
      );
    }
  }

  // Get all connected institutions with enhanced metadata
  async getConnectedInstitutions(): Promise<Array<{
    accessToken: string;
    institutionName: string;
    institutionId?: string;
    lastSynced?: Date;
    status?: string;
    isValid?: boolean;
  }>> {
    const institutions = [];
    
    for (const [token, data] of this.connectedTokens.entries()) {
      try {
        const metadata = await this.getInstitutionMetadata(token);
        const isValid = await this.validateAccessToken(token);
        
        institutions.push({
          accessToken: token,
          institutionName: metadata.institutionName || data.institution_name || 'Unknown Institution',
          institutionId: metadata.institutionId || data.institution_id,
          lastSynced: data.last_synced,
          status: metadata.status || 'connected',
          isValid,
        });
      } catch (error) {
        console.warn(`Failed to get metadata for token ${token.slice(-8)}:`, error);
        institutions.push({
          accessToken: token,
          institutionName: data.institution_name || 'Unknown Institution',
          institutionId: data.institution_id,
          lastSynced: data.last_synced,
          status: 'error',
          isValid: false,
        });
      }
    }
    
    return institutions;
  }
}

// Export singleton instance
export const plaidService = new PlaidService();
export default PlaidService;