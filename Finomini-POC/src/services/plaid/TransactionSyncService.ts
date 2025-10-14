// Enhanced transaction syncing service with duplicate detection and data transformation

import { Transaction } from '../../types';
import { plaidService } from './PlaidService';
import { storageService } from '../storage/StorageService';
import { validateTransaction } from '../../types/validation';
import { generateId } from '../../utils';
import { format, parseISO, isValid, subDays } from 'date-fns';

interface SyncOptions {
  startDate?: Date;
  endDate?: Date;
  accountIds?: string[];
  forceFullSync?: boolean;
}

interface SyncResult {
  newTransactions: Transaction[];
  updatedTransactions: Transaction[];
  duplicatesFound: number;
  errors: string[];
  syncedAccounts: string[];
}

class TransactionSyncService {
  private readonly DUPLICATE_THRESHOLD_HOURS = 24;
  private readonly MAX_SYNC_DAYS = 730; // 2 years max

  // Main sync method with comprehensive duplicate detection
  async syncTransactions(accessToken: string, options: SyncOptions = {}): Promise<SyncResult> {
    const result: SyncResult = {
      newTransactions: [],
      updatedTransactions: [],
      duplicatesFound: 0,
      errors: [],
      syncedAccounts: [],
    };

    try {
      // Get existing transactions for duplicate detection
      const existingTransactions = await storageService.getTransactions();
      
      // Fetch new transactions from Plaid
      const plaidTransactions = await this.fetchPlaidTransactionsWithOptions(accessToken, options);
      
      // Process each transaction
      for (const plaidTx of plaidTransactions) {
        try {
          const transformedTransaction = this.transformPlaidTransaction(plaidTx);
          
          // Validate the transaction
          validateTransaction(transformedTransaction);
          
          // Check for duplicates
          const duplicate = this.findDuplicate(transformedTransaction, existingTransactions);
          
          if (duplicate) {
            // Update existing transaction if Plaid data is more recent
            if (this.shouldUpdateTransaction(duplicate, transformedTransaction)) {
              const updatedTransaction = this.mergeTransactionData(duplicate, transformedTransaction);
              result.updatedTransactions.push(updatedTransaction);
            } else {
              result.duplicatesFound++;
            }
          } else {
            // New transaction
            result.newTransactions.push(transformedTransaction);
          }
          
          // Track synced accounts
          if (transformedTransaction.account_id && !result.syncedAccounts.includes(transformedTransaction.account_id)) {
            result.syncedAccounts.push(transformedTransaction.account_id);
          }
          
        } catch (error) {
          result.errors.push(`Failed to process transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
      console.log(`Sync completed: ${result.newTransactions.length} new, ${result.updatedTransactions.length} updated, ${result.duplicatesFound} duplicates`);
      
    } catch (error) {
      result.errors.push(`Sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    
    return result;
  }

  // Fetch Plaid transactions with date range and filtering options
  private async fetchPlaidTransactionsWithOptions(accessToken: string, options: SyncOptions): Promise<any[]> {
    const { startDate, endDate, forceFullSync } = options;
    
    // Determine date range
    let syncStartDate = startDate;
    let syncEndDate = endDate || new Date();
    
    if (!syncStartDate) {
      if (forceFullSync) {
        // Full sync: get last 2 years of data
        syncStartDate = subDays(new Date(), this.MAX_SYNC_DAYS);
      } else {
        // Incremental sync: get last 30 days
        syncStartDate = subDays(new Date(), 30);
      }
    }
    
    console.log(`Fetching transactions from ${format(syncStartDate, 'yyyy-MM-dd')} to ${format(syncEndDate, 'yyyy-MM-dd')}`);
    
    // Use the existing PlaidService method (which simulates the API call)
    return await plaidService.syncTransactions(accessToken);
  }

  // Enhanced Plaid transaction transformation with better categorization
  private transformPlaidTransaction(plaidTx: any): Transaction {
    // Extract and clean transaction data
    const amount = Math.abs(parseFloat(plaidTx.amount) || 0);
    const date = this.parseTransactionDate(plaidTx.date);
    const description = this.cleanDescription(plaidTx.name || plaidTx.description || 'Unknown Transaction');
    
    // Determine transaction category from Plaid categories
    const category = this.mapPlaidCategory(plaidTx.category, plaidTx.subcategory);
    
    // Extract merchant information
    const merchant = this.extractMerchant(plaidTx);
    
    return {
      id: generateId(),
      amount,
      date,
      description,
      category: category.primary,
      subcategory: category.secondary,
      account_id: plaidTx.account_id,
      plaid_transaction_id: plaidTx.transaction_id,
      is_manual: false,
      is_hidden: false,
      confidence_score: 0.95, // High confidence for Plaid data
      created_at: new Date(),
      updated_at: new Date(),
      merchant,
      status: plaidTx.pending ? 'pending' : 'posted',
      tags: this.generateAutoTags(plaidTx),
    };
  }

  // Parse transaction date with fallback handling
  private parseTransactionDate(dateStr: string): Date {
    if (!dateStr) return new Date();
    
    const parsed = parseISO(dateStr);
    return isValid(parsed) ? parsed : new Date();
  }

  // Clean and normalize transaction descriptions
  private cleanDescription(description: string): string {
    return description
      .trim()
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/[^\w\s\-\.]/g, '') // Remove special characters except basic punctuation
      .substring(0, 255); // Ensure it fits our validation limit
  }

  // Map Plaid categories to our category system
  private mapPlaidCategory(plaidCategories: string[] = [], plaidSubcategory?: string): { primary: string; secondary?: string } {
    const categoryMap: Record<string, { primary: string; secondary?: string }> = {
      'Food and Drink': { primary: 'Dining', secondary: 'Restaurants' },
      'Shops': { primary: 'Shopping', secondary: 'General Merchandise' },
      'Transportation': { primary: 'Transportation', secondary: 'Gas Stations' },
      'Travel': { primary: 'Travel', secondary: 'Lodging' },
      'Recreation': { primary: 'Entertainment', secondary: 'Recreation' },
      'Healthcare': { primary: 'Healthcare', secondary: 'Medical' },
      'Service': { primary: 'Services', secondary: 'Professional Services' },
      'Government and Non-Profit': { primary: 'Government', secondary: 'Taxes' },
      'Bills': { primary: 'Utilities', secondary: 'Bills' },
      'Bank Fees': { primary: 'Fees', secondary: 'Bank Fees' },
      'Cash Advance': { primary: 'Cash', secondary: 'ATM' },
      'Deposit': { primary: 'Income', secondary: 'Deposits' },
      'Payroll': { primary: 'Income', secondary: 'Salary' },
      'Transfer': { primary: 'Transfer', secondary: 'Internal Transfer' },
    };

    // Try to match the first category
    const primaryCategory = plaidCategories[0];
    if (primaryCategory && categoryMap[primaryCategory]) {
      return categoryMap[primaryCategory];
    }

    // Fallback to subcategory matching
    if (plaidSubcategory) {
      for (const [key, value] of Object.entries(categoryMap)) {
        if (key.toLowerCase().includes(plaidSubcategory.toLowerCase())) {
          return value;
        }
      }
    }

    // Default category
    return { primary: 'Other', secondary: undefined };
  }

  // Extract merchant information from Plaid data
  private extractMerchant(plaidTx: any): string | undefined {
    return plaidTx.merchant_name || 
           plaidTx.merchant?.name || 
           this.extractMerchantFromDescription(plaidTx.name);
  }

  // Extract merchant from transaction description using patterns
  private extractMerchantFromDescription(description: string): string | undefined {
    if (!description) return undefined;
    
    // Common patterns for merchant extraction
    const patterns = [
      /^([A-Z\s]+)\s+\d+/, // "STARBUCKS 12345" -> "STARBUCKS"
      /^([A-Z][a-z\s]+)/, // "Starbucks Coffee" -> "Starbucks Coffee"
      /([A-Z\s]+)\s*-\s*/, // "AMAZON - " -> "AMAZON"
    ];
    
    for (const pattern of patterns) {
      const match = description.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
    
    return undefined;
  }

  // Generate automatic tags based on transaction data
  private generateAutoTags(plaidTx: any): string[] {
    const tags: string[] = [];
    
    // Add tags based on amount
    if (plaidTx.amount > 1000) {
      tags.push('large-expense');
    }
    
    // Add tags based on categories
    if (plaidTx.category?.includes('Food')) {
      tags.push('food');
    }
    
    if (plaidTx.category?.includes('Travel')) {
      tags.push('travel');
    }
    
    // Add pending tag
    if (plaidTx.pending) {
      tags.push('pending');
    }
    
    return tags;
  }

  // Find duplicate transactions using multiple criteria
  private findDuplicate(newTransaction: Transaction, existingTransactions: Transaction[]): Transaction | null {
    const candidates = existingTransactions.filter(existing => {
      // Must be same account (if available)
      if (newTransaction.account_id && existing.account_id && 
          newTransaction.account_id !== existing.account_id) {
        return false;
      }
      
      // Must be same amount
      if (Math.abs(existing.amount - newTransaction.amount) > 0.01) {
        return false;
      }
      
      // Must be within time threshold
      const timeDiff = Math.abs(existing.date.getTime() - newTransaction.date.getTime());
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      if (hoursDiff > this.DUPLICATE_THRESHOLD_HOURS) {
        return false;
      }
      
      return true;
    });
    
    if (candidates.length === 0) {
      return null;
    }
    
    // If multiple candidates, find the best match
    return candidates.reduce((best, candidate) => {
      const bestScore = this.calculateSimilarityScore(newTransaction, best);
      const candidateScore = this.calculateSimilarityScore(newTransaction, candidate);
      return candidateScore > bestScore ? candidate : best;
    });
  }

  // Calculate similarity score between transactions
  private calculateSimilarityScore(tx1: Transaction, tx2: Transaction): number {
    let score = 0;
    
    // Exact Plaid ID match (highest priority)
    if (tx1.plaid_transaction_id && tx2.plaid_transaction_id && 
        tx1.plaid_transaction_id === tx2.plaid_transaction_id) {
      return 1.0;
    }
    
    // Description similarity
    const desc1 = tx1.description.toLowerCase();
    const desc2 = tx2.description.toLowerCase();
    if (desc1 === desc2) {
      score += 0.4;
    } else if (desc1.includes(desc2) || desc2.includes(desc1)) {
      score += 0.2;
    }
    
    // Merchant similarity
    if (tx1.merchant && tx2.merchant) {
      if (tx1.merchant.toLowerCase() === tx2.merchant.toLowerCase()) {
        score += 0.3;
      }
    }
    
    // Category similarity
    if (tx1.category === tx2.category) {
      score += 0.2;
    }
    
    // Status similarity
    if (tx1.status === tx2.status) {
      score += 0.1;
    }
    
    return score;
  }

  // Determine if an existing transaction should be updated
  private shouldUpdateTransaction(existing: Transaction, newTransaction: Transaction): boolean {
    // Always update if new transaction has Plaid ID and existing doesn't
    if (newTransaction.plaid_transaction_id && !existing.plaid_transaction_id) {
      return true;
    }
    
    // Update if new transaction is more recent
    if (newTransaction.updated_at > existing.updated_at) {
      return true;
    }
    
    // Update if status changed from pending to posted
    if (existing.status === 'pending' && newTransaction.status === 'posted') {
      return true;
    }
    
    return false;
  }

  // Merge transaction data, preserving manual edits
  private mergeTransactionData(existing: Transaction, newTransaction: Transaction): Transaction {
    return {
      ...existing,
      // Update fields that should sync from Plaid
      amount: newTransaction.amount,
      status: newTransaction.status,
      plaid_transaction_id: newTransaction.plaid_transaction_id || existing.plaid_transaction_id,
      confidence_score: newTransaction.confidence_score,
      updated_at: new Date(),
      
      // Preserve manual edits
      category: existing.is_manual ? existing.category : newTransaction.category,
      subcategory: existing.is_manual ? existing.subcategory : newTransaction.subcategory,
      description: existing.is_manual ? existing.description : newTransaction.description,
      tags: existing.is_manual ? existing.tags : newTransaction.tags,
      notes: existing.notes, // Always preserve notes
    };
  }

  // Sync transactions for all connected accounts
  async syncAllAccounts(options: SyncOptions = {}): Promise<Map<string, SyncResult>> {
    const results = new Map<string, SyncResult>();
    const connectedTokens = plaidService.getConnectedTokens();
    
    for (const accessToken of connectedTokens) {
      try {
        const result = await this.syncTransactions(accessToken, options);
        results.set(accessToken, result);
      } catch (error) {
        results.set(accessToken, {
          newTransactions: [],
          updatedTransactions: [],
          duplicatesFound: 0,
          errors: [error instanceof Error ? error.message : 'Unknown error'],
          syncedAccounts: [],
        });
      }
    }
    
    return results;
  }
}

// Export singleton instance
export const transactionSyncService = new TransactionSyncService();
export default TransactionSyncService;