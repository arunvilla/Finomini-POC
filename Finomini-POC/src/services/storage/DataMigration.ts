// Data migration utilities for the AI Finance Manager

import { storageService } from './StorageService';
import { Transaction, Account, Budget, Investment, AIInsight } from '../../types';

export interface MigrationResult {
  success: boolean;
  fromVersion: string;
  toVersion: string;
  migratedItems: number;
  errors: string[];
}

export interface BackupData {
  version: string;
  timestamp: Date;
  transactions: Transaction[];
  accounts: Account[];
  budgets: Budget[];
  investments: Investment[];
  insights: AIInsight[];
  preferences: any;
  categories: any[];
  tags: any[];
}

export class DataMigration {
  private static readonly CURRENT_VERSION = '1.0.0';
  
  /**
   * Check if data migration is needed
   */
  static async checkMigrationNeeded(): Promise<{
    needed: boolean;
    currentVersion: string;
    targetVersion: string;
  }> {
    const preferences = storageService.getUserPreferences();
    const currentVersion = preferences.dataVersion || '0.0.0';
    
    return {
      needed: currentVersion !== this.CURRENT_VERSION,
      currentVersion,
      targetVersion: this.CURRENT_VERSION
    };
  }

  /**
   * Perform data migration
   */
  static async migrate(): Promise<MigrationResult> {
    const preferences = storageService.getUserPreferences();
    const fromVersion = preferences.dataVersion || '0.0.0';
    const toVersion = this.CURRENT_VERSION;
    
    const result: MigrationResult = {
      success: false,
      fromVersion,
      toVersion,
      migratedItems: 0,
      errors: []
    };

    try {
      // Create backup before migration
      await this.createBackup(`pre_migration_${fromVersion}_to_${toVersion}`);

      // Perform version-specific migrations
      if (fromVersion === '0.0.0' && toVersion === '1.0.0') {
        await this.migrateFrom0_0_0To1_0_0(result);
      }
      
      // Add more migration paths as needed
      // if (fromVersion === '1.0.0' && toVersion === '1.1.0') {
      //   await this.migrateFrom1_0_0To1_1_0(result);
      // }

      // Update version in preferences
      preferences.dataVersion = toVersion;
      preferences.lastMigration = new Date().toISOString();
      storageService.saveUserPreferences(preferences);

      result.success = true;
      
    } catch (error) {
      result.errors.push(`Migration failed: ${(error as Error).message}`);
      console.error('Data migration failed:', error);
    }

    return result;
  }

  /**
   * Migration from version 0.0.0 to 1.0.0
   */
  private static async migrateFrom0_0_0To1_0_0(result: MigrationResult): Promise<void> {
    // This is the initial migration - ensure all data has proper structure
    
    // Migrate transactions
    const transactions = await storageService.getTransactions();
    let migratedTransactions = 0;
    
    for (const transaction of transactions) {
      let needsUpdate = false;
      const updates: Partial<Transaction> = {};

      // Ensure all required fields exist
      if (!transaction.created_at) {
        updates.created_at = new Date();
        needsUpdate = true;
      }
      
      if (!transaction.updated_at) {
        updates.updated_at = new Date();
        needsUpdate = true;
      }

      if (transaction.is_manual === undefined) {
        updates.is_manual = true; // Default to manual for existing transactions
        needsUpdate = true;
      }

      if (transaction.is_hidden === undefined) {
        updates.is_hidden = false;
        needsUpdate = true;
      }

      if (needsUpdate) {
        await storageService.updateTransaction(transaction.id, updates);
        migratedTransactions++;
      }
    }

    // Migrate accounts
    const accounts = await storageService.getAccounts();
    let migratedAccounts = 0;
    
    for (const account of accounts) {
      let needsUpdate = false;
      const updates: Partial<Account> = {};

      if (!account.created_at) {
        updates.created_at = new Date();
        needsUpdate = true;
      }
      
      if (!account.updated_at) {
        updates.updated_at = new Date();
        needsUpdate = true;
      }

      if (account.is_active === undefined) {
        updates.is_active = true;
        needsUpdate = true;
      }

      if (needsUpdate) {
        await storageService.updateAccount(account.id, updates);
        migratedAccounts++;
      }
    }

    // Migrate budgets
    const budgets = await storageService.getBudgets();
    let migratedBudgets = 0;
    
    for (const budget of budgets) {
      let needsUpdate = false;
      const updates: Partial<Budget> = {};

      if (!budget.created_at) {
        updates.created_at = new Date();
        needsUpdate = true;
      }
      
      if (!budget.updated_at) {
        updates.updated_at = new Date();
        needsUpdate = true;
      }

      if (budget.is_active === undefined) {
        updates.is_active = true;
        needsUpdate = true;
      }

      if (budget.current_spent === undefined) {
        updates.current_spent = 0;
        needsUpdate = true;
      }

      if (needsUpdate) {
        await storageService.updateBudget(budget.id, updates);
        migratedBudgets++;
      }
    }

    result.migratedItems = migratedTransactions + migratedAccounts + migratedBudgets;
  }

  /**
   * Create a backup of all data
   */
  static async createBackup(backupName?: string): Promise<string> {
    const timestamp = new Date();
    const name = backupName || `backup_${timestamp.toISOString().split('T')[0]}`;
    
    try {
      const backupData: BackupData = {
        version: this.CURRENT_VERSION,
        timestamp,
        transactions: await storageService.getTransactions(),
        accounts: await storageService.getAccounts(),
        budgets: await storageService.getBudgets(),
        investments: await storageService.getInvestments(),
        insights: await storageService.getInsights(),
        preferences: storageService.getUserPreferences(),
        categories: storageService.getCategories(),
        tags: storageService.getTags()
      };

      // Store backup in localStorage with a special key
      const backupKey = `backup_${name}`;
      localStorage.setItem(backupKey, JSON.stringify(backupData));
      
      return backupKey;
      
    } catch (error) {
      console.error('Backup creation failed:', error);
      throw new Error(`Failed to create backup: ${(error as Error).message}`);
    }
  }

  /**
   * Restore data from a backup
   */
  static async restoreFromBackup(backupKey: string): Promise<{
    success: boolean;
    restoredItems: number;
    errors: string[];
  }> {
    const result = {
      success: false,
      restoredItems: 0,
      errors: [] as string[]
    };

    try {
      const backupDataStr = localStorage.getItem(backupKey);
      if (!backupDataStr) {
        throw new Error('Backup not found');
      }

      const backupData: BackupData = JSON.parse(backupDataStr);
      
      // Restore all data
      await storageService.saveTransactions(backupData.transactions);
      await storageService.saveAccounts(backupData.accounts);
      await storageService.saveBudgets(backupData.budgets);
      await storageService.saveInvestments(backupData.investments);
      await storageService.saveInsights(backupData.insights);
      
      storageService.saveUserPreferences(backupData.preferences);
      storageService.saveCategories(backupData.categories);
      storageService.saveTags(backupData.tags);

      result.restoredItems = 
        backupData.transactions.length +
        backupData.accounts.length +
        backupData.budgets.length +
        backupData.investments.length +
        backupData.insights.length;

      result.success = true;
      
    } catch (error) {
      result.errors.push(`Restore failed: ${(error as Error).message}`);
      console.error('Backup restore failed:', error);
    }

    return result;
  }

  /**
   * List available backups
   */
  static listBackups(): Array<{
    key: string;
    name: string;
    timestamp: Date;
    version: string;
    size: number;
  }> {
    const backups: Array<{
      key: string;
      name: string;
      timestamp: Date;
      version: string;
      size: number;
    }> = [];

    try {
      const keys = Object.keys(localStorage);
      
      for (const key of keys) {
        if (key.startsWith('backup_')) {
          try {
            const backupDataStr = localStorage.getItem(key);
            if (backupDataStr) {
              const backupData: BackupData = JSON.parse(backupDataStr);
              
              backups.push({
                key,
                name: key.replace('backup_', ''),
                timestamp: new Date(backupData.timestamp),
                version: backupData.version,
                size: backupDataStr.length
              });
            }
          } catch (error) {
            console.warn(`Failed to parse backup ${key}:`, error);
          }
        }
      }
      
      // Sort by timestamp, newest first
      backups.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      
    } catch (error) {
      console.error('Failed to list backups:', error);
    }

    return backups;
  }

  /**
   * Delete a backup
   */
  static deleteBackup(backupKey: string): boolean {
    try {
      localStorage.removeItem(backupKey);
      return true;
    } catch (error) {
      console.error('Failed to delete backup:', error);
      return false;
    }
  }

  /**
   * Export data as JSON for external backup
   */
  static async exportData(): Promise<string> {
    try {
      const backupData: BackupData = {
        version: this.CURRENT_VERSION,
        timestamp: new Date(),
        transactions: await storageService.getTransactions(),
        accounts: await storageService.getAccounts(),
        budgets: await storageService.getBudgets(),
        investments: await storageService.getInvestments(),
        insights: await storageService.getInsights(),
        preferences: storageService.getUserPreferences(),
        categories: storageService.getCategories(),
        tags: storageService.getTags()
      };

      return JSON.stringify(backupData, null, 2);
      
    } catch (error) {
      console.error('Data export failed:', error);
      throw new Error(`Failed to export data: ${(error as Error).message}`);
    }
  }

  /**
   * Import data from JSON
   */
  static async importData(jsonData: string): Promise<{
    success: boolean;
    importedItems: number;
    errors: string[];
  }> {
    const result = {
      success: false,
      importedItems: 0,
      errors: [] as string[]
    };

    try {
      const backupData: BackupData = JSON.parse(jsonData);
      
      // Validate the data structure
      if (!backupData.version || !backupData.transactions || !backupData.accounts) {
        throw new Error('Invalid backup data format');
      }

      // Create backup before import
      await this.createBackup(`pre_import_${new Date().toISOString()}`);

      // Import all data
      await storageService.saveTransactions(backupData.transactions);
      await storageService.saveAccounts(backupData.accounts);
      await storageService.saveBudgets(backupData.budgets || []);
      await storageService.saveInvestments(backupData.investments || []);
      await storageService.saveInsights(backupData.insights || []);
      
      if (backupData.preferences) {
        storageService.saveUserPreferences(backupData.preferences);
      }
      if (backupData.categories) {
        storageService.saveCategories(backupData.categories);
      }
      if (backupData.tags) {
        storageService.saveTags(backupData.tags);
      }

      result.importedItems = 
        backupData.transactions.length +
        backupData.accounts.length +
        (backupData.budgets?.length || 0) +
        (backupData.investments?.length || 0) +
        (backupData.insights?.length || 0);

      result.success = true;
      
    } catch (error) {
      result.errors.push(`Import failed: ${(error as Error).message}`);
      console.error('Data import failed:', error);
    }

    return result;
  }
}