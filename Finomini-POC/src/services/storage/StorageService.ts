// Local storage service with encryption for the AI Finance Manager

import { 
  Transaction, 
  Account, 
  Budget, 
  Investment, 
  AIInsight,
  STORAGE_KEYS,
  ErrorType,
  AppError
} from '../../types';

export class StorageService {
  private static instance: StorageService;
  private encryptionKey: CryptoKey | null = null;

  private constructor() {}

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  /**
   * Initialize the encryption key for secure storage
   */
  private async initializeEncryption(): Promise<void> {
    if (this.encryptionKey) return;

    try {
      // Check if we have a stored key
      const storedKey = localStorage.getItem('ai_finance_encryption_key');
      
      if (storedKey) {
        // Import the stored key
        const keyData = JSON.parse(storedKey);
        this.encryptionKey = await window.crypto.subtle.importKey(
          'jwk',
          keyData,
          { name: 'AES-GCM' },
          false,
          ['encrypt', 'decrypt']
        );
      } else {
        // Generate a new key
        this.encryptionKey = await window.crypto.subtle.generateKey(
          { name: 'AES-GCM', length: 256 },
          true,
          ['encrypt', 'decrypt']
        );

        // Export and store the key
        const exportedKey = await window.crypto.subtle.exportKey('jwk', this.encryptionKey);
        localStorage.setItem('ai_finance_encryption_key', JSON.stringify(exportedKey));
      }
    } catch (error) {
      console.error('Failed to initialize encryption:', error);
      throw new Error('Encryption initialization failed');
    }
  }

  /**
   * Encrypt data using AES-GCM
   */
  private async encrypt(data: string): Promise<string> {
    await this.initializeEncryption();
    
    if (!this.encryptionKey) {
      throw new Error('Encryption key not available');
    }

    try {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      
      // Generate a random IV
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      
      // Encrypt the data
      const encryptedBuffer = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        this.encryptionKey,
        dataBuffer
      );

      // Combine IV and encrypted data
      const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength);
      combined.set(iv);
      combined.set(new Uint8Array(encryptedBuffer), iv.length);

      // Convert to base64 for storage
      return btoa(String.fromCharCode(...combined));
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Data encryption failed');
    }
  }

  /**
   * Decrypt data using AES-GCM
   */
  private async decrypt(encryptedData: string): Promise<string> {
    await this.initializeEncryption();
    
    if (!this.encryptionKey) {
      throw new Error('Encryption key not available');
    }

    try {
      // Convert from base64
      const combined = new Uint8Array(
        atob(encryptedData).split('').map(char => char.charCodeAt(0))
      );

      // Extract IV and encrypted data
      const iv = combined.slice(0, 12);
      const encryptedBuffer = combined.slice(12);

      // Decrypt the data
      const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        this.encryptionKey,
        encryptedBuffer
      );

      // Convert back to string
      const decoder = new TextDecoder();
      return decoder.decode(decryptedBuffer);
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Data decryption failed');
    }
  }

  /**
   * Save data to encrypted storage
   */
  private async saveEncrypted<T>(key: string, data: T): Promise<void> {
    try {
      const jsonData = JSON.stringify(data);
      const encryptedData = await this.encrypt(jsonData);
      localStorage.setItem(key, encryptedData);
    } catch (error) {
      console.error(`Failed to save ${key}:`, error);
      throw this.createStorageError(`Failed to save ${key}`, error);
    }
  }

  /**
   * Load data from encrypted storage
   */
  private async loadEncrypted<T>(key: string, defaultValue: T): Promise<T> {
    try {
      const encryptedData = localStorage.getItem(key);
      if (!encryptedData) {
        return defaultValue;
      }

      const jsonData = await this.decrypt(encryptedData);
      return JSON.parse(jsonData);
    } catch (error) {
      console.error(`Failed to load ${key}:`, error);
      // Return default value if decryption fails (corrupted data)
      return defaultValue;
    }
  }

  /**
   * Save data to non-encrypted storage (for non-sensitive data)
   */
  private saveUnencrypted<T>(key: string, data: T): void {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(key, jsonData);
    } catch (error) {
      console.error(`Failed to save ${key}:`, error);
      throw this.createStorageError(`Failed to save ${key}`, error);
    }
  }

  /**
   * Load data from non-encrypted storage
   */
  private loadUnencrypted<T>(key: string, defaultValue: T): T {
    try {
      const jsonData = localStorage.getItem(key);
      if (!jsonData) {
        return defaultValue;
      }
      return JSON.parse(jsonData);
    } catch (error) {
      console.error(`Failed to load ${key}:`, error);
      return defaultValue;
    }
  }

  /**
   * Create a standardized storage error
   */
  private createStorageError(message: string, originalError: any): AppError {
    return {
      type: ErrorType.STORAGE,
      message,
      details: originalError,
      timestamp: new Date(),
      recoverable: true
    };
  }

  // Transaction operations
  async saveTransactions(transactions: Transaction[]): Promise<void> {
    await this.saveEncrypted(STORAGE_KEYS.TRANSACTIONS, transactions);
  }

  async getTransactions(): Promise<Transaction[]> {
    return await this.loadEncrypted(STORAGE_KEYS.TRANSACTIONS, []);
  }

  async addTransaction(transaction: Transaction): Promise<void> {
    const transactions = await this.getTransactions();
    const existingIndex = transactions.findIndex(t => t.id === transaction.id);
    
    if (existingIndex >= 0) {
      transactions[existingIndex] = transaction;
    } else {
      transactions.push(transaction);
    }
    
    await this.saveTransactions(transactions);
  }

  async updateTransaction(id: string, updates: Partial<Transaction>): Promise<void> {
    const transactions = await this.getTransactions();
    const index = transactions.findIndex(t => t.id === id);
    
    if (index >= 0) {
      transactions[index] = { ...transactions[index], ...updates, updated_at: new Date() };
      await this.saveTransactions(transactions);
    } else {
      throw new Error(`Transaction with id ${id} not found`);
    }
  }

  async deleteTransaction(id: string): Promise<void> {
    const transactions = await this.getTransactions();
    const filteredTransactions = transactions.filter(t => t.id !== id);
    await this.saveTransactions(filteredTransactions);
  }

  // Account operations
  async saveAccounts(accounts: Account[]): Promise<void> {
    await this.saveEncrypted(STORAGE_KEYS.ACCOUNTS, accounts);
  }

  async getAccounts(): Promise<Account[]> {
    return await this.loadEncrypted(STORAGE_KEYS.ACCOUNTS, []);
  }

  async addAccount(account: Account): Promise<void> {
    const accounts = await this.getAccounts();
    const existingIndex = accounts.findIndex(a => a.id === account.id);
    
    if (existingIndex >= 0) {
      accounts[existingIndex] = account;
    } else {
      accounts.push(account);
    }
    
    await this.saveAccounts(accounts);
  }

  async updateAccount(id: string, updates: Partial<Account>): Promise<void> {
    const accounts = await this.getAccounts();
    const index = accounts.findIndex(a => a.id === id);
    
    if (index >= 0) {
      accounts[index] = { ...accounts[index], ...updates, updated_at: new Date() };
      await this.saveAccounts(accounts);
    } else {
      throw new Error(`Account with id ${id} not found`);
    }
  }

  async deleteAccount(id: string): Promise<void> {
    const accounts = await this.getAccounts();
    const filteredAccounts = accounts.filter(a => a.id !== id);
    await this.saveAccounts(filteredAccounts);
  }

  // Budget operations
  async saveBudgets(budgets: Budget[]): Promise<void> {
    await this.saveEncrypted(STORAGE_KEYS.BUDGETS, budgets);
  }

  async getBudgets(): Promise<Budget[]> {
    return await this.loadEncrypted(STORAGE_KEYS.BUDGETS, []);
  }

  async addBudget(budget: Budget): Promise<void> {
    const budgets = await this.getBudgets();
    const existingIndex = budgets.findIndex(b => b.id === budget.id);
    
    if (existingIndex >= 0) {
      budgets[existingIndex] = budget;
    } else {
      budgets.push(budget);
    }
    
    await this.saveBudgets(budgets);
  }

  async updateBudget(id: string, updates: Partial<Budget>): Promise<void> {
    const budgets = await this.getBudgets();
    const index = budgets.findIndex(b => b.id === id);
    
    if (index >= 0) {
      budgets[index] = { ...budgets[index], ...updates, updated_at: new Date() };
      await this.saveBudgets(budgets);
    } else {
      throw new Error(`Budget with id ${id} not found`);
    }
  }

  async deleteBudget(id: string): Promise<void> {
    const budgets = await this.getBudgets();
    const filteredBudgets = budgets.filter(b => b.id !== id);
    await this.saveBudgets(filteredBudgets);
  }

  // Investment operations
  async saveInvestments(investments: Investment[]): Promise<void> {
    await this.saveEncrypted(STORAGE_KEYS.INVESTMENTS, investments);
  }

  async getInvestments(): Promise<Investment[]> {
    return await this.loadEncrypted(STORAGE_KEYS.INVESTMENTS, []);
  }

  async addInvestment(investment: Investment): Promise<void> {
    const investments = await this.getInvestments();
    const existingIndex = investments.findIndex(i => i.id === investment.id);
    
    if (existingIndex >= 0) {
      investments[existingIndex] = investment;
    } else {
      investments.push(investment);
    }
    
    await this.saveInvestments(investments);
  }

  async updateInvestment(id: string, updates: Partial<Investment>): Promise<void> {
    const investments = await this.getInvestments();
    const index = investments.findIndex(i => i.id === id);
    
    if (index >= 0) {
      investments[index] = { ...investments[index], ...updates };
      await this.saveInvestments(investments);
    } else {
      throw new Error(`Investment with id ${id} not found`);
    }
  }

  async deleteInvestment(id: string): Promise<void> {
    const investments = await this.getInvestments();
    const filteredInvestments = investments.filter(i => i.id !== id);
    await this.saveInvestments(filteredInvestments);
  }

  // AI Insights operations
  async saveInsights(insights: AIInsight[]): Promise<void> {
    await this.saveEncrypted(STORAGE_KEYS.INSIGHTS, insights);
  }

  async getInsights(): Promise<AIInsight[]> {
    return await this.loadEncrypted(STORAGE_KEYS.INSIGHTS, []);
  }

  async addInsight(insight: AIInsight): Promise<void> {
    const insights = await this.getInsights();
    const existingIndex = insights.findIndex(i => i.id === insight.id);
    
    if (existingIndex >= 0) {
      insights[existingIndex] = insight;
    } else {
      insights.push(insight);
    }
    
    await this.saveInsights(insights);
  }

  async markInsightAsRead(id: string): Promise<void> {
    const insights = await this.getInsights();
    const index = insights.findIndex(i => i.id === id);
    
    if (index >= 0) {
      insights[index].is_read = true;
      await this.saveInsights(insights);
    }
  }

  async deleteInsight(id: string): Promise<void> {
    const insights = await this.getInsights();
    const filteredInsights = insights.filter(i => i.id !== id);
    await this.saveInsights(filteredInsights);
  }

  // Secure data operations (for sensitive data like Plaid tokens)
  async saveSecureData(key: string, data: any): Promise<void> {
    await this.saveEncrypted(`secure_${key}`, data);
  }

  async getSecureData(key: string): Promise<any> {
    return await this.loadEncrypted(`secure_${key}`, null);
  }

  async deleteSecureData(key: string): Promise<void> {
    localStorage.removeItem(`secure_${key}`);
  }

  // User preferences (non-encrypted)
  saveUserPreferences(preferences: any): void {
    this.saveUnencrypted(STORAGE_KEYS.USER_PREFERENCES, preferences);
  }

  getUserPreferences(): any {
    return this.loadUnencrypted(STORAGE_KEYS.USER_PREFERENCES, {});
  }

  // Categories and tags (non-encrypted)
  saveCategories(categories: any[]): void {
    this.saveUnencrypted(STORAGE_KEYS.CATEGORIES, categories);
  }

  getCategories(): any[] {
    return this.loadUnencrypted(STORAGE_KEYS.CATEGORIES, []);
  }

  saveTags(tags: any[]): void {
    this.saveUnencrypted(STORAGE_KEYS.TAGS, tags);
  }

  getTags(): any[] {
    return this.loadUnencrypted(STORAGE_KEYS.TAGS, []);
  }

  // Data migration utilities
  async migrateData(fromVersion: string, toVersion: string): Promise<void> {
    console.log(`Migrating data from version ${fromVersion} to ${toVersion}`);
    
    // Add migration logic here as needed
    // This is a placeholder for future data schema changes
    
    try {
      // Example migration logic
      if (fromVersion === '1.0' && toVersion === '1.1') {
        // Perform specific migration steps
        const transactions = await this.getTransactions();
        // Add new fields or transform data as needed
        await this.saveTransactions(transactions);
      }
      
      // Update version in preferences
      const preferences = this.getUserPreferences();
      preferences.dataVersion = toVersion;
      this.saveUserPreferences(preferences);
      
    } catch (error) {
      console.error('Data migration failed:', error);
      throw this.createStorageError('Data migration failed', error);
    }
  }

  // Clear all data
  async clearData(): Promise<void> {
    try {
      const keysToRemove = Object.values(STORAGE_KEYS);
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
      });
      
      // Also remove secure data keys
      const allKeys = Object.keys(localStorage);
      allKeys.forEach(key => {
        if (key.startsWith('secure_') || key === 'ai_finance_encryption_key') {
          localStorage.removeItem(key);
        }
      });
      
      // Reset encryption key
      this.encryptionKey = null;
      
    } catch (error) {
      console.error('Failed to clear data:', error);
      throw this.createStorageError('Failed to clear data', error);
    }
  }

  // Check storage health
  async checkStorageHealth(): Promise<{
    isHealthy: boolean;
    issues: string[];
    storageUsed: number;
    storageAvailable: number;
  }> {
    const issues: string[] = [];
    let isHealthy = true;

    try {
      // Check if encryption is working
      await this.initializeEncryption();
      
      // Test encryption/decryption
      const testData = 'test_data_' + Date.now();
      const encrypted = await this.encrypt(testData);
      const decrypted = await this.decrypt(encrypted);
      
      if (decrypted !== testData) {
        issues.push('Encryption/decryption test failed');
        isHealthy = false;
      }

      // Check storage quota
      let storageUsed = 0;
      let storageAvailable = 0;

      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        storageUsed = estimate.usage || 0;
        storageAvailable = estimate.quota || 0;
        
        if (storageAvailable > 0 && storageUsed / storageAvailable > 0.9) {
          issues.push('Storage quota nearly full');
          isHealthy = false;
        }
      }

      // Check if critical data can be loaded
      try {
        await this.getTransactions();
        await this.getAccounts();
        await this.getBudgets();
      } catch (error) {
        issues.push('Failed to load critical data');
        isHealthy = false;
      }

      return {
        isHealthy,
        issues,
        storageUsed,
        storageAvailable
      };

    } catch (error) {
      return {
        isHealthy: false,
        issues: ['Storage health check failed: ' + (error as Error).message],
        storageUsed: 0,
        storageAvailable: 0
      };
    }
  }
}

// Export singleton instance
export const storageService = StorageService.getInstance();