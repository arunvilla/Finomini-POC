// Enhanced account and investment syncing service

import { Account, Investment } from '../../types';
import { plaidService } from './PlaidService';
import { storageService } from '../storage/StorageService';
import { generateId } from '../../utils';

interface AccountSyncOptions {
  includeInvestments?: boolean;
  includeLiabilities?: boolean;
  forceRefresh?: boolean;
}

interface AccountSyncResult {
  accounts: Account[];
  investments: Investment[];
  liabilities: any[]; // Will be defined when we add liability types
  errors: string[];
  lastSynced: Date;
}

class AccountSyncService {
  // Sync all account data for a given access token
  async syncAccountData(accessToken: string, options: AccountSyncOptions = {}): Promise<AccountSyncResult> {
    const result: AccountSyncResult = {
      accounts: [],
      investments: [],
      liabilities: [],
      errors: [],
      lastSynced: new Date(),
    };

    try {
      // Sync basic account information
      result.accounts = await this.syncAccounts(accessToken);
      
      // Sync investment data if requested
      if (options.includeInvestments !== false) {
        try {
          result.investments = await this.syncInvestments(accessToken);
        } catch (error) {
          result.errors.push(`Investment sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
      // Sync liabilities if requested
      if (options.includeLiabilities) {
        try {
          result.liabilities = await this.syncLiabilities(accessToken);
        } catch (error) {
          result.errors.push(`Liability sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
      console.log(`Account sync completed: ${result.accounts.length} accounts, ${result.investments.length} investments`);
      
    } catch (error) {
      result.errors.push(`Account sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    
    return result;
  }

  // Sync account balances and information
  private async syncAccounts(accessToken: string): Promise<Account[]> {
    try {
      // Get existing accounts for comparison
      const existingAccounts = await storageService.getAccounts();
      
      // Fetch fresh account data from Plaid
      const plaidAccounts = await plaidService.getAccounts(accessToken);
      
      // Process and merge account data
      const processedAccounts: Account[] = [];
      
      for (const plaidAccount of plaidAccounts) {
        try {
          // Find existing account by Plaid ID
          const existingAccount = existingAccounts.find(
            acc => acc.plaid_account_id === plaidAccount.plaid_account_id
          );
          
          if (existingAccount) {
            // Update existing account with fresh data
            const updatedAccount = this.mergeAccountData(existingAccount, plaidAccount);
            processedAccounts.push(updatedAccount);
          } else {
            // New account
            processedAccounts.push(plaidAccount);
          }
          
        } catch (error) {
          console.warn('Failed to process account:', plaidAccount, error);
        }
      }
      
      return processedAccounts;
      
    } catch (error) {
      console.error('Failed to sync accounts:', error);
      throw error;
    }
  }

  // Sync investment holdings and portfolio data
  private async syncInvestments(accessToken: string): Promise<Investment[]> {
    try {
      // Get existing investments for comparison
      const existingInvestments = await storageService.getInvestments();
      
      // Fetch fresh investment data from Plaid
      const plaidInvestments = await plaidService.getInvestments(accessToken);
      
      // Process and merge investment data
      const processedInvestments: Investment[] = [];
      
      for (const plaidInvestment of plaidInvestments) {
        try {
          // Find existing investment by account and security
          const existingInvestment = existingInvestments.find(
            inv => inv.account_id === plaidInvestment.account_id && 
                   inv.ticker_symbol === plaidInvestment.ticker_symbol
          );
          
          if (existingInvestment) {
            // Update existing investment with fresh data
            const updatedInvestment = this.mergeInvestmentData(existingInvestment, plaidInvestment);
            processedInvestments.push(updatedInvestment);
          } else {
            // New investment
            processedInvestments.push(plaidInvestment);
          }
          
        } catch (error) {
          console.warn('Failed to process investment:', plaidInvestment, error);
        }
      }
      
      return processedInvestments;
      
    } catch (error) {
      console.error('Failed to sync investments:', error);
      throw error;
    }
  }

  // Sync liability data (loans, credit cards, etc.)
  private async syncLiabilities(accessToken: string): Promise<any[]> {
    try {
      // Simulate Plaid Liabilities API call
      const plaidLiabilities = await this.fetchPlaidLiabilities(accessToken);
      
      // Transform and validate liability data
      const processedLiabilities = plaidLiabilities.map(this.transformPlaidLiability);
      
      return processedLiabilities;
      
    } catch (error) {
      console.error('Failed to sync liabilities:', error);
      throw error;
    }
  }

  // Simulate Plaid Liabilities API call
  private async fetchPlaidLiabilities(accessToken: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate
          const mockLiabilities = [
            {
              account_id: `plaid_acc_${accessToken.slice(-8)}_credit`,
              type: 'credit',
              subtype: 'credit card',
              name: 'Credit Card',
              balances: {
                current: -1250.50,
                limit: 5000.00,
              },
              apr_percentage: 18.99,
              minimum_payment_amount: 35.00,
              next_payment_due_date: '2024-11-15',
            },
            {
              account_id: `plaid_acc_${accessToken.slice(-8)}_mortgage`,
              type: 'loan',
              subtype: 'mortgage',
              name: 'Home Mortgage',
              balances: {
                current: -285000.00,
              },
              apr_percentage: 3.25,
              minimum_payment_amount: 1850.00,
              next_payment_due_date: '2024-11-01',
            }
          ];
          resolve(mockLiabilities);
        } else {
          reject(new Error('Plaid Liabilities API error'));
        }
      }, 800);
    });
  }

  // Transform Plaid liability to our format
  private transformPlaidLiability = (plaidLiability: any): any => {
    return {
      id: generateId(),
      account_id: plaidLiability.account_id,
      name: plaidLiability.name,
      type: plaidLiability.type,
      subtype: plaidLiability.subtype,
      balance: Math.abs(plaidLiability.balances.current || 0),
      limit: plaidLiability.balances.limit,
      apr: plaidLiability.apr_percentage,
      minimum_payment: plaidLiability.minimum_payment_amount,
      next_payment_due: plaidLiability.next_payment_due_date ? new Date(plaidLiability.next_payment_due_date) : undefined,
      last_updated: new Date(),
    };
  };

  // Merge existing account data with fresh Plaid data
  private mergeAccountData(existing: Account, fresh: Account): Account {
    return {
      ...existing,
      // Update fields that should sync from Plaid
      balance: fresh.balance,
      last_synced: new Date(),
      updated_at: new Date(),
      
      // Preserve user customizations
      name: existing.name !== fresh.name ? existing.name : fresh.name, // Keep custom names
      is_active: existing.is_active, // Preserve user's active/inactive setting
    };
  }

  // Merge existing investment data with fresh Plaid data
  private mergeInvestmentData(existing: Investment, fresh: Investment): Investment {
    return {
      ...existing,
      // Update fields that should sync from Plaid
      quantity: fresh.quantity,
      price: fresh.price,
      value: fresh.value,
      daily_change: fresh.daily_change,
      daily_change_percent: fresh.daily_change_percent,
      last_updated: new Date(),
      
      // Calculate gains/losses
      total_gain_loss: existing.average_cost_basis 
        ? fresh.value - (existing.average_cost_basis * fresh.quantity)
        : fresh.total_gain_loss,
      total_gain_loss_percent: existing.average_cost_basis && existing.average_cost_basis > 0
        ? ((fresh.value - (existing.average_cost_basis * fresh.quantity)) / (existing.average_cost_basis * fresh.quantity)) * 100
        : fresh.total_gain_loss_percent,
    };
  }

  // Periodic sync scheduler
  async schedulePeriodicSync(accessToken: string, intervalMinutes: number = 60): Promise<void> {
    const syncInterval = setInterval(async () => {
      try {
        console.log('Running scheduled account sync...');
        await this.syncAccountData(accessToken, {
          includeInvestments: true,
          includeLiabilities: true,
        });
      } catch (error) {
        console.error('Scheduled sync failed:', error);
      }
    }, intervalMinutes * 60 * 1000);

    // Store interval ID for cleanup (in a real app, you'd want to manage this better)
    (window as any).plaidSyncInterval = syncInterval;
  }

  // Stop periodic sync
  stopPeriodicSync(): void {
    if ((window as any).plaidSyncInterval) {
      clearInterval((window as any).plaidSyncInterval);
      delete (window as any).plaidSyncInterval;
    }
  }

  // Get account summary with calculated metrics
  async getAccountSummary(accessToken: string): Promise<{
    totalAssets: number;
    totalLiabilities: number;
    netWorth: number;
    accountBreakdown: {
      checking: number;
      savings: number;
      credit: number;
      investment: number;
    };
    investmentSummary: {
      totalValue: number;
      totalGainLoss: number;
      totalGainLossPercent: number;
    };
  }> {
    try {
      const syncResult = await this.syncAccountData(accessToken, {
        includeInvestments: true,
        includeLiabilities: true,
      });

      // Calculate totals
      const totalAssets = syncResult.accounts
        .filter(acc => acc.type !== 'credit')
        .reduce((sum, acc) => sum + acc.balance, 0) +
        syncResult.investments.reduce((sum, inv) => sum + inv.value, 0);

      const totalLiabilities = syncResult.accounts
        .filter(acc => acc.type === 'credit')
        .reduce((sum, acc) => sum + Math.abs(acc.balance), 0) +
        syncResult.liabilities.reduce((sum, liability) => sum + liability.balance, 0);

      const netWorth = totalAssets - totalLiabilities;

      // Account breakdown
      const accountBreakdown = {
        checking: syncResult.accounts.filter(acc => acc.type === 'checking').reduce((sum, acc) => sum + acc.balance, 0),
        savings: syncResult.accounts.filter(acc => acc.type === 'savings').reduce((sum, acc) => sum + acc.balance, 0),
        credit: syncResult.accounts.filter(acc => acc.type === 'credit').reduce((sum, acc) => sum + Math.abs(acc.balance), 0),
        investment: syncResult.investments.reduce((sum, inv) => sum + inv.value, 0),
      };

      // Investment summary
      const investmentSummary = {
        totalValue: syncResult.investments.reduce((sum, inv) => sum + inv.value, 0),
        totalGainLoss: syncResult.investments.reduce((sum, inv) => sum + (inv.total_gain_loss || 0), 0),
        totalGainLossPercent: 0, // Calculate weighted average
      };

      // Calculate weighted average gain/loss percentage
      if (investmentSummary.totalValue > 0) {
        const weightedGainLoss = syncResult.investments.reduce((sum, inv) => {
          const weight = inv.value / investmentSummary.totalValue;
          return sum + (weight * (inv.total_gain_loss_percent || 0));
        }, 0);
        investmentSummary.totalGainLossPercent = weightedGainLoss;
      }

      return {
        totalAssets,
        totalLiabilities,
        netWorth,
        accountBreakdown,
        investmentSummary,
      };

    } catch (error) {
      console.error('Failed to get account summary:', error);
      throw error;
    }
  }

  // Sync all connected accounts
  async syncAllConnectedAccounts(options: AccountSyncOptions = {}): Promise<Map<string, AccountSyncResult>> {
    const results = new Map<string, AccountSyncResult>();
    const connectedTokens = plaidService.getConnectedTokens();

    for (const accessToken of connectedTokens) {
      try {
        const result = await this.syncAccountData(accessToken, options);
        results.set(accessToken, result);
      } catch (error) {
        results.set(accessToken, {
          accounts: [],
          investments: [],
          liabilities: [],
          errors: [error instanceof Error ? error.message : 'Unknown error'],
          lastSynced: new Date(),
        });
      }
    }

    return results;
  }
}

// Export singleton instance
export const accountSyncService = new AccountSyncService();
export default AccountSyncService;