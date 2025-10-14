// Plaid service implementation for bank account integration

import { 
  PlaidLinkOnSuccess, 
  PlaidLinkOnExit, 
  PlaidLinkOnEvent 
} from 'react-plaid-link';
import { Transaction, Account, Investment } from '../../types';
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
  // In production, these should come from environment variables
  CLIENT_ID: process.env.REACT_APP_PLAID_CLIENT_ID || 'demo_client_id',
  PUBLIC_KEY: process.env.REACT_APP_PLAID_PUBLIC_KEY || 'demo_public_key',
  ENV: (process.env.REACT_APP_PLAID_ENV as 'sandbox' | 'development' | 'production') || 'sandbox',
  PRODUCTS: ['transactions', 'accounts', 'investments'] as const,
  COUNTRY_CODES: ['US'] as const,
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

class PlaidService implements IPlaidService {
  private isInitialized = false;
  private linkToken: string | null = null;
  private connectedTokens: Map<string, PlaidTokenData> = new Map();

  constructor() {
    this.loadStoredTokens();
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
  async initializePlaid(): Promise<void> {
    try {
      if (this.isInitialized) {
        return;
      }

      // In a real implementation, you would call your backend to get a link token
      // For now, we'll simulate this process
      this.linkToken = await this.createLinkToken();
      this.isInitialized = true;
      
      console.log('Plaid Link initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Plaid:', error);
      throw this.createError(
        ErrorType.PLAID_CONNECTION,
        'Failed to initialize Plaid Link. Please check your configuration.',
        error
      );
    }
  }

  // Create link token (in production, this would be a backend call)
  private async createLinkToken(): Promise<string> {
    // Simulate API call to backend to create link token
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate for demo
          resolve(`link-${PLAID_CONFIG.ENV}-${Date.now()}`);
        } else {
          reject(new Error('Failed to create link token'));
        }
      }, 500);
    });
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
      
      // Exchange public token for access token (in production, this would be a backend call)
      const accessToken = await this.exchangePublicToken(public_token);
      
      // Store token data
      const tokenData: PlaidTokenData = {
        access_token: accessToken,
        item_id: metadata.link_session_id,
        institution_id: metadata.institution?.institution_id,
        institution_name: metadata.institution?.name,
        created_at: new Date(),
      };

      this.connectedTokens.set(accessToken, tokenData);
      await this.saveTokens();

      console.log('Account connected successfully:', metadata.institution?.name);
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
    } else {
      console.log('Plaid Link exit:', metadata);
    }
  };

  // Handle Plaid Link events
  private handleLinkEvent: PlaidLinkOnEvent = (eventName, metadata) => {
    console.log('Plaid Link event:', eventName, metadata);
  };

  // Exchange public token for access token (simulate backend call)
  private async exchangePublicToken(_publicToken: string): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.05) { // 95% success rate for demo
          resolve(`access-${PLAID_CONFIG.ENV}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
        } else {
          reject(new Error('Failed to exchange public token'));
        }
      }, 1000);
    });
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

  // Sync transactions from Plaid API (basic method for compatibility)
  async syncTransactions(accessToken: string): Promise<Transaction[]> {
    try {
      if (!this.connectedTokens.has(accessToken)) {
        throw this.createError(
          ErrorType.PLAID_CONNECTION,
          'Invalid access token. Please reconnect your account.'
        );
      }

      return await this.retryWithBackoff(async () => {
        // Simulate Plaid API call to fetch transactions
        const plaidTransactions = await this.fetchPlaidTransactions(accessToken);
        
        // Transform Plaid transactions to our Transaction interface
        const transactions = plaidTransactions.map(this.transformPlaidTransaction);
        
        // Validate transactions
        const validTransactions = transactions.filter(transaction => {
          try {
            validateTransaction(transaction);
            return true;
          } catch (error) {
            console.warn('Invalid transaction data:', transaction, error);
            return false;
          }
        });

        // Update last sync time
        const tokenData = this.connectedTokens.get(accessToken);
        if (tokenData) {
          tokenData.last_synced = new Date();
          await this.saveTokens();
        }

        console.log(`Synced ${validTransactions.length} transactions from Plaid`);
        return validTransactions;
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
  async fetchRawTransactions(accessToken: string): Promise<any[]> {
    if (!this.connectedTokens.has(accessToken)) {
      throw this.createError(
        ErrorType.PLAID_CONNECTION,
        'Invalid access token. Please reconnect your account.'
      );
    }

    return await this.retryWithBackoff(async () => {
      return await this.fetchPlaidTransactions(accessToken);
    });
  }

  // Simulate Plaid API transaction fetch
  private async fetchPlaidTransactions(accessToken: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate
          // Generate mock Plaid transaction data
          const mockTransactions = Array.from({ length: 10 }, (_, i) => ({
            transaction_id: `plaid_tx_${Date.now()}_${i}`,
            account_id: `plaid_acc_${accessToken.slice(-8)}`,
            amount: Math.random() * 200 + 10,
            date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            name: [
              'Starbucks Coffee',
              'Amazon Purchase',
              'Grocery Store',
              'Gas Station',
              'Restaurant',
              'Online Shopping',
              'Utility Payment',
              'ATM Withdrawal'
            ][Math.floor(Math.random() * 8)],
            merchant_name: 'Sample Merchant',
            category: ['Food and Drink', 'Shops', 'Transportation', 'Bills'][Math.floor(Math.random() * 4)],
            subcategory: ['Restaurants', 'General Merchandise', 'Gas Stations', 'Utilities'][Math.floor(Math.random() * 4)],
          }));
          resolve(mockTransactions);
        } else {
          reject(new Error('Plaid API error'));
        }
      }, 1500);
    });
  }

  // Transform Plaid transaction to our Transaction interface
  private transformPlaidTransaction = (plaidTx: any): Transaction => {
    return {
      id: generateId(),
      amount: Math.abs(plaidTx.amount),
      date: new Date(plaidTx.date),
      description: plaidTx.name || 'Unknown Transaction',
      category: plaidTx.category || 'Other',
      subcategory: plaidTx.subcategory,
      account_id: plaidTx.account_id,
      plaid_transaction_id: plaidTx.transaction_id,
      is_manual: false,
      is_hidden: false,
      confidence_score: 0.9, // High confidence for Plaid data
      created_at: new Date(),
      updated_at: new Date(),
      merchant: plaidTx.merchant_name,
      status: 'posted',
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

  // Simulate Plaid API account fetch
  private async fetchPlaidAccounts(accessToken: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate
          const tokenData = this.connectedTokens.get(accessToken);
          const mockAccounts = [
            {
              account_id: `plaid_acc_${accessToken.slice(-8)}_checking`,
              name: 'Primary Checking',
              type: 'depository',
              subtype: 'checking',
              balances: {
                available: 2500.50,
                current: 2500.50,
              },
              institution_name: tokenData?.institution_name || 'Demo Bank',
            },
            {
              account_id: `plaid_acc_${accessToken.slice(-8)}_savings`,
              name: 'Savings Account',
              type: 'depository',
              subtype: 'savings',
              balances: {
                available: 15000.00,
                current: 15000.00,
              },
              institution_name: tokenData?.institution_name || 'Demo Bank',
            }
          ];
          resolve(mockAccounts);
        } else {
          reject(new Error('Plaid API error'));
        }
      }, 1000);
    });
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
        // Simulate Plaid API call to fetch investments
        const plaidInvestments = await this.fetchPlaidInvestments(accessToken);
        
        // Transform Plaid investments to our Investment interface
        const investments = plaidInvestments.map(this.transformPlaidInvestment);
        
        // Validate investments
        const validInvestments = investments.filter(investment => {
          try {
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

  // Simulate Plaid API investment fetch
  private async fetchPlaidInvestments(accessToken: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate
          const mockInvestments = [
            {
              account_id: `plaid_acc_${accessToken.slice(-8)}_investment`,
              security_id: 'sec_aapl',
              name: 'Apple Inc.',
              ticker_symbol: 'AAPL',
              quantity: 10,
              price: 150.25,
              value: 1502.50,
              type: 'equity',
            },
            {
              account_id: `plaid_acc_${accessToken.slice(-8)}_investment`,
              security_id: 'sec_spy',
              name: 'SPDR S&P 500 ETF Trust',
              ticker_symbol: 'SPY',
              quantity: 5,
              price: 420.80,
              value: 2104.00,
              type: 'etf',
            }
          ];
          resolve(mockInvestments);
        } else {
          reject(new Error('Plaid API error'));
        }
      }, 1200);
    });
  }

  // Transform Plaid investment to our Investment interface
  private transformPlaidInvestment = (plaidInv: any): Investment => {
    const investmentTypeMap: Record<string, Investment['type']> = {
      'equity': 'stock',
      'etf': 'etf',
      'mutual fund': 'mutual_fund',
      'bond': 'bond',
      'cash': 'cash',
      'cryptocurrency': 'crypto',
    };

    return {
      id: generateId(),
      account_id: plaidInv.account_id,
      security_name: plaidInv.name,
      ticker_symbol: plaidInv.ticker_symbol,
      quantity: plaidInv.quantity,
      price: plaidInv.price,
      value: plaidInv.value,
      type: investmentTypeMap[plaidInv.type] || 'stock',
      last_updated: new Date(),
      average_cost_basis: plaidInv.cost_basis,
      daily_change: plaidInv.daily_change || 0,
      daily_change_percent: plaidInv.daily_change_percent || 0,
    };
  };

  // Disconnect account
  async disconnectAccount(accessToken: string): Promise<void> {
    try {
      if (!this.connectedTokens.has(accessToken)) {
        throw this.createError(
          ErrorType.PLAID_CONNECTION,
          'Account not found or already disconnected'
        );
      }

      // In production, you would call Plaid API to remove the item
      // For now, we'll just remove it from our local storage
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

  // Get connection status
  isConnected(accessToken?: string): boolean {
    if (accessToken) {
      return this.connectedTokens.has(accessToken);
    }
    return this.connectedTokens.size > 0;
  }

  // Get all connected institutions
  getConnectedInstitutions(): Array<{accessToken: string, institutionName: string, lastSynced?: Date}> {
    return Array.from(this.connectedTokens.entries()).map(([token, data]) => ({
      accessToken: token,
      institutionName: data.institution_name || 'Unknown Institution',
      lastSynced: data.last_synced,
    }));
  }
}

// Export singleton instance
export const plaidService = new PlaidService();
export default PlaidService;