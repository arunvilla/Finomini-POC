// Storage service implementation with encryption for secure data persistence

import { Transaction, Account, Investment, Budget, AIInsight } from '../../types';
import type { StorageService as IStorageService } from '../../types/services';

class StorageService implements IStorageService {
  private readonly STORAGE_KEYS = {
    TRANSACTIONS: 'ai-finance-transactions',
    ACCOUNTS: 'ai-finance-accounts',
    INVESTMENTS: 'ai-finance-investments',
    BUDGETS: 'ai-finance-budgets',
    INSIGHTS: 'ai-finance-insights',
    SECURE_DATA: 'ai-finance-secure-',
  };

  // Encryption key for secure data (in production, this should be derived from user credentials)
  private async getEncryptionKey(): Promise<CryptoKey> {
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode('ai-finance-manager-key-2024'), // In production, use proper key derivation
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );

    return window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: new TextEncoder().encode('ai-finance-salt'),
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  // Encrypt data for secure storage
  private async encryptData(data: string): Promise<string> {
    try {
      const key = await this.getEncryptionKey();
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const encodedData = new TextEncoder().encode(data);

      const encryptedData = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        encodedData
      );

      // Combine IV and encrypted data
      const combined = new Uint8Array(iv.length + encryptedData.byteLength);
      combined.set(iv);
      combined.set(new Uint8Array(encryptedData), iv.length);

      // Convert to base64 for storage
      return btoa(String.fromCharCode(...combined));
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  // Decrypt data from secure storage
  private async decryptData(encryptedData: string): Promise<string> {
    try {
      const key = await this.getEncryptionKey();
      const combined = new Uint8Array(
        atob(encryptedData)
          .split('')
          .map((char) => char.charCodeAt(0))
      );

      const iv = combined.slice(0, 12);
      const data = combined.slice(12);

      const decryptedData = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        data
      );

      return new TextDecoder().decode(decryptedData);
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  // Generic storage methods
  private async saveData<T>(key: string, data: T[]): Promise<void> {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (error) {
      console.error(`Failed to save data for key ${key}:`, error);
      throw new Error(`Storage operation failed for ${key}`);
    }
  }

  private async getData<T>(key: string): Promise<T[]> {
    try {
      const data = localStorage.getItem(key);
      if (!data) return [];
      
      return JSON.parse(data) as T[];
    } catch (error) {
      console.error(`Failed to retrieve data for key ${key}:`, error);
      return [];
    }
  }

  // Transaction methods
  async saveTransactions(transactions: Transaction[]): Promise<void> {
    await this.saveData(this.STORAGE_KEYS.TRANSACTIONS, transactions);
  }

  async getTransactions(): Promise<Transaction[]> {
    const transactions = await this.getData<Transaction>(this.STORAGE_KEYS.TRANSACTIONS);
    // Convert date strings back to Date objects
    return transactions.map(transaction => ({
      ...transaction,
      date: new Date(transaction.date),
      created_at: new Date(transaction.created_at),
      updated_at: new Date(transaction.updated_at),
    }));
  }

  // Account methods
  async saveAccounts(accounts: Account[]): Promise<void> {
    await this.saveData(this.STORAGE_KEYS.ACCOUNTS, accounts);
  }

  async getAccounts(): Promise<Account[]> {
    const accounts = await this.getData<Account>(this.STORAGE_KEYS.ACCOUNTS);
    // Convert date strings back to Date objects
    return accounts.map(account => ({
      ...account,
      last_synced: account.last_synced ? new Date(account.last_synced) : undefined,
      created_at: new Date(account.created_at),
      updated_at: new Date(account.updated_at),
    }));
  }

  // Budget methods
  async saveBudgets(budgets: Budget[]): Promise<void> {
    await this.saveData(this.STORAGE_KEYS.BUDGETS, budgets);
  }

  async getBudgets(): Promise<Budget[]> {
    const budgets = await this.getData<Budget>(this.STORAGE_KEYS.BUDGETS);
    // Convert date strings back to Date objects
    return budgets.map(budget => ({
      ...budget,
      start_date: new Date(budget.start_date),
      created_at: new Date(budget.created_at),
      updated_at: new Date(budget.updated_at),
    }));
  }

  // Investment methods
  async saveInvestments(investments: Investment[]): Promise<void> {
    await this.saveData(this.STORAGE_KEYS.INVESTMENTS, investments);
  }

  async getInvestments(): Promise<Investment[]> {
    const investments = await this.getData<Investment>(this.STORAGE_KEYS.INVESTMENTS);
    // Convert date strings back to Date objects
    return investments.map(investment => ({
      ...investment,
      last_updated: new Date(investment.last_updated),
    }));
  }

  // Insight methods
  async saveInsights(insights: AIInsight[]): Promise<void> {
    await this.saveData(this.STORAGE_KEYS.INSIGHTS, insights);
  }

  async getInsights(): Promise<AIInsight[]> {
    const insights = await this.getData<AIInsight>(this.STORAGE_KEYS.INSIGHTS);
    // Convert date strings back to Date objects
    return insights.map(insight => ({
      ...insight,
      created_at: new Date(insight.created_at),
    }));
  }

  // Secure data methods (for sensitive information like Plaid tokens)
  async saveSecureData(key: string, data: any): Promise<void> {
    try {
      const serializedData = JSON.stringify(data);
      const encryptedData = await this.encryptData(serializedData);
      localStorage.setItem(this.STORAGE_KEYS.SECURE_DATA + key, encryptedData);
    } catch (error) {
      console.error(`Failed to save secure data for key ${key}:`, error);
      throw new Error(`Secure storage operation failed for ${key}`);
    }
  }

  async getSecureData(key: string): Promise<any> {
    try {
      const encryptedData = localStorage.getItem(this.STORAGE_KEYS.SECURE_DATA + key);
      if (!encryptedData) return null;

      const decryptedData = await this.decryptData(encryptedData);
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error(`Failed to retrieve secure data for key ${key}:`, error);
      return null;
    }
  }

  // Utility methods
  async clearData(): Promise<void> {
    try {
      Object.values(this.STORAGE_KEYS).forEach(key => {
        if (key.endsWith('-')) {
          // Handle secure data keys
          Object.keys(localStorage).forEach(storageKey => {
            if (storageKey.startsWith(key)) {
              localStorage.removeItem(storageKey);
            }
          });
        } else {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Failed to clear data:', error);
      throw new Error('Failed to clear application data');
    }
  }
}

// Export singleton instance
export const storageService = new StorageService();
export default StorageService;