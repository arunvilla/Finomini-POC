// Production Plaid API Service - Connects to backend API
import { Transaction, Account, Investment } from '../../types';
import type { AppError } from '../../types/services';
import { ErrorType } from '../../types/services';
import { validateTransaction, validateAccount, validateInvestment } from '../../types/validation';
import { generateId } from '../../utils';
import { format, subDays } from 'date-fns';

// API configuration
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  TIMEOUT: 30000, // 30 seconds
};

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    type: string;
    code?: string;
    message: string;
    display_message?: string;
  };
}

interface PlaidTokenData {
  access_token: string;
  item_id: string;
  institution_id?: string;
  institution_name?: string;
  created_at: Date;
  last_synced?: Date;
}

class PlaidApiService {
  private connectedTokens: Map<string, PlaidTokenData> = new Map();

  constructor() {
    this.loadStoredTokens();
  }

  // Load stored tokens from localStorage
  private async loadStoredTokens(): Promise<void> {
    try {
      const stored = localStorage.getItem('plaid_tokens');
      if (stored) {
        const tokens = JSON.parse(stored);
        tokens.forEach((tokenData: any) => {
          this.connectedTokens.set(tokenData.access_token, {
            ...tokenData,
            created_at: new Date(tokenData.created_at),
            last_synced: tokenData.last_synced ? new Date(tokenData.last_synced) : undefined,
          });
        });
      }
    } catch (error) {
      console.error('Failed to load stored tokens:', error);
    }
  }

  // Save tokens to localStorage
  private async saveTokens(): Promise<void> {
    try {
      const tokens = Array.from(this.connectedTokens.values());
      localStorage.setItem('plaid_tokens', JSON.stringify(tokens));
    } catch (error) {
      console.error('Failed to save tokens:', error);
    }
  }

  // Generic API call method
  private async apiCall<T>(endpoint: string, data?: any): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result: ApiResponse<T> = await response.json();

      if (!result.success) {
        throw this.createErrorFromApiResponse(result.error);
      }

      return result.data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw this.createError(ErrorType.NETWORK, 'Request timeout');
      }
      
      throw error;
    }
  }

  // Create error from API response
  private createErrorFromApiResponse(apiError: any): AppError {
    return {
      type: this.mapErrorType(apiError?.type),
      message: apiError?.display_message || apiError?.message || 'Unknown error',
      details: apiError,
      timestamp: new Date(),
      recoverable: apiError?.type !== 'plaid_error' || apiError?.code !== 'ITEM_LOGIN_REQUIRED',
    };
  }

  // Map API error types to our ErrorType enum
  private mapErrorType(apiErrorType: string): ErrorType {
    switch (apiErrorType) {
      case 'plaid_error':
        return ErrorType.PLAID_CONNECTION;
      case 'validation_error':
        return ErrorType.VALIDATION;
      case 'server_error':
        return ErrorType.NETWORK;
      default:
        return ErrorType.PLAID_CONNECTION;
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

  // Create link token
  async createLinkToken(userId?: string): Promise<string> {
    try {
      const result = await this.apiCall<{ link_token: string }>('/plaid/link-token', {
        user_id: userId,
      });
      
      return result.link_token;
    } catch (error) {
      console.error('Failed to create link token:', error);
      // If backend is not available, throw error to trigger mock mode
      throw this.createError(ErrorType.NETWORK, 'Backend server not available');
    }
  }

  // Exchange public token for access token
  async exchangePublicToken(publicToken: string): Promise<{ access_token: string; item_id: string }> {
    try {
      const result = await this.apiCall<{ access_token: string; item_id: string }>('/plaid/exchange-token', {
        public_token: publicToken,
      });
      
      // Store the new token
      const tokenData: PlaidTokenData = {
        access_token: result.access_token,
        item_id: result.item_id,
        created_at: new Date(),
      };
      
      this.connectedTokens.set(result.access_token, tokenData);
      await this.saveTokens();
      
      return result;
    } catch (error) {
      console.error('Failed to exchange public token:', error);
      throw error;
    }
  }

  // Get accounts
  async getAccounts(accessToken: string): Promise<Account[]> {
    try {
      const result = await this.apiCall<{ accounts: any[]; item: any }>('/plaid/accounts', {
        access_token: accessToken,
      });
      
      // Transform Plaid accounts to our Account interface
      const accounts = result.accounts.map(this.transformPlaidAccount);
      
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

      // Update last sync time
      const tokenData = this.connectedTokens.get(accessToken);
      if (tokenData) {
        tokenData.last_synced = new Date();
        await this.saveTokens();
      }

      return validAccounts;
    } catch (error) {
      console.error('Failed to get accounts:', error);
      throw error;
    }
  }

  // Get transactions
  async getTransactions(accessToken: string, startDate?: Date, endDate?: Date): Promise<Transaction[]> {
    try {
      const start = startDate || subDays(new Date(), 30);
      const end = endDate || new Date();
      
      const result = await this.apiCall<{ transactions: any[]; accounts: any[] }>('/plaid/transactions', {
        access_token: accessToken,
        start_date: format(start, 'yyyy-MM-dd'),
        end_date: format(end, 'yyyy-MM-dd'),
      });
      
      // Transform Plaid transactions to our Transaction interface
      const transactions = result.transactions.map(this.transformPlaidTransaction);
      
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

      return validTransactions;
    } catch (error) {
      console.error('Failed to get transactions:', error);
      throw error;
    }
  }

  // Get investments
  async getInvestments(accessToken: string): Promise<Investment[]> {
    try {
      const result = await this.apiCall<{ holdings: any[]; securities: any[]; accounts: any[] }>('/plaid/investments', {
        access_token: accessToken,
      });
      
      // Transform Plaid investments to our Investment interface
      const investments = this.transformPlaidInvestments(result.holdings, result.securities, result.accounts);
      
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

      return validInvestments;
    } catch (error) {
      console.error('Failed to get investments:', error);
      throw error;
    }
  }

  // Remove item (disconnect account)
  async removeItem(accessToken: string): Promise<void> {
    try {
      await this.apiCall('/plaid/remove-item', {
        access_token: accessToken,
      });
      
      // Remove from local storage
      this.connectedTokens.delete(accessToken);
      await this.saveTokens();
    } catch (error) {
      console.error('Failed to remove item:', error);
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
      'brokerage': 'investment',
      '401k': 'investment',
      'ira': 'investment',
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

  // Transform Plaid transaction to our Transaction interface
  private transformPlaidTransaction = (plaidTx: any): Transaction => {
    return {
      id: generateId(),
      amount: Math.abs(plaidTx.amount),
      date: new Date(plaidTx.date),
      description: plaidTx.name || 'Unknown Transaction',
      category: plaidTx.category?.[0] || 'Other',
      subcategory: plaidTx.category?.[1],
      account_id: plaidTx.account_id,
      plaid_transaction_id: plaidTx.transaction_id,
      is_manual: false,
      is_hidden: false,
      confidence_score: 0.95, // High confidence for Plaid data
      created_at: new Date(),
      updated_at: new Date(),
      merchant: plaidTx.merchant_name,
      status: plaidTx.pending ? 'pending' : 'posted',
    };
  };

  // Transform Plaid investments to our Investment interface
  private transformPlaidInvestments = (holdings: any[], securities: any[], accounts: any[]): Investment[] => {
    const investments: Investment[] = [];
    
    holdings.forEach(holding => {
      const security = securities.find(sec => sec.security_id === holding.security_id);
      
      if (security) {
        const investmentTypeMap: Record<string, Investment['type']> = {
          'equity': 'stock',
          'etf': 'etf',
          'mutual fund': 'mutual_fund',
          'bond': 'bond',
          'cash': 'cash',
          'cryptocurrency': 'crypto',
        };

        investments.push({
          id: generateId(),
          account_id: holding.account_id,
          security_name: security.name,
          ticker_symbol: security.ticker_symbol,
          quantity: holding.quantity,
          price: security.close_price || 0,
          value: holding.quantity * (security.close_price || 0),
          type: investmentTypeMap[security.type] || 'stock',
          last_updated: new Date(),
          average_cost_basis: holding.cost_basis,
        });
      }
    });
    
    return investments;
  };

  // Get connected tokens
  getConnectedTokens(): string[] {
    return Array.from(this.connectedTokens.keys());
  }

  // Get token information
  getTokenInfo(accessToken: string): PlaidTokenData | null {
    return this.connectedTokens.get(accessToken) || null;
  }

  // Check if connected
  isConnected(accessToken?: string): boolean {
    if (accessToken) {
      return this.connectedTokens.has(accessToken);
    }
    return this.connectedTokens.size > 0;
  }

  // Get connected institutions
  getConnectedInstitutions(): Array<{accessToken: string, institutionName: string, lastSynced?: Date}> {
    return Array.from(this.connectedTokens.entries()).map(([token, data]) => ({
      accessToken: token,
      institutionName: data.institution_name || 'Unknown Institution',
      lastSynced: data.last_synced,
    }));
  }
}

// Export singleton instance
export const plaidApiService = new PlaidApiService();
export default PlaidApiService;