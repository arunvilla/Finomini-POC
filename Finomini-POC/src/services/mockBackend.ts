// Mock backend service for Plaid integration when real backend is not available

import { generateId } from '../utils';

interface MockPlaidAccount {
  account_id: string;
  name: string;
  type: string;
  subtype: string;
  balances: {
    available: number;
    current: number;
  };
  institution_name: string;
}

interface MockPlaidTransaction {
  transaction_id: string;
  account_id: string;
  amount: number;
  date: string;
  name: string;
  merchant_name?: string;
  category: string[];
  pending: boolean;
}

interface MockPlaidInvestment {
  account_id: string;
  security_id: string;
  quantity: number;
  cost_basis?: number;
}

interface MockPlaidSecurity {
  security_id: string;
  name: string;
  ticker_symbol?: string;
  type: string;
  close_price: number;
}

class MockBackend {
  private isRunning = false;
  private mockData = {
    accounts: [] as MockPlaidAccount[],
    transactions: [] as MockPlaidTransaction[],
    investments: [] as MockPlaidInvestment[],
    securities: [] as MockPlaidSecurity[],
  };

  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.generateMockData();
    console.log('Mock backend started for Plaid sandbox testing');
  }

  stop() {
    this.isRunning = false;
    console.log('Mock backend stopped');
  }

  private generateMockData() {
    // Generate mock accounts
    this.mockData.accounts = [
      {
        account_id: 'mock_checking_001',
        name: 'Primary Checking',
        type: 'depository',
        subtype: 'checking',
        balances: {
          available: 2847.32,
          current: 2847.32,
        },
        institution_name: 'First Platypus Bank',
      },
      {
        account_id: 'mock_savings_001',
        name: 'High Yield Savings',
        type: 'depository',
        subtype: 'savings',
        balances: {
          available: 15420.89,
          current: 15420.89,
        },
        institution_name: 'First Platypus Bank',
      },
      {
        account_id: 'mock_credit_001',
        name: 'Rewards Credit Card',
        type: 'credit',
        subtype: 'credit card',
        balances: {
          available: 4500.00,
          current: -1250.45,
        },
        institution_name: 'First Platypus Bank',
      },
      {
        account_id: 'mock_investment_001',
        name: 'Investment Account',
        type: 'investment',
        subtype: 'brokerage',
        balances: {
          available: 0,
          current: 25680.75,
        },
        institution_name: 'First Platypus Bank',
      },
    ];

    // Generate mock transactions
    this.mockData.transactions = this.generateMockTransactions();

    // Generate mock securities
    this.mockData.securities = [
      {
        security_id: 'sec_aapl',
        name: 'Apple Inc.',
        ticker_symbol: 'AAPL',
        type: 'equity',
        close_price: 175.84,
      },
      {
        security_id: 'sec_spy',
        name: 'SPDR S&P 500 ETF Trust',
        ticker_symbol: 'SPY',
        type: 'etf',
        close_price: 445.20,
      },
      {
        security_id: 'sec_googl',
        name: 'Alphabet Inc.',
        ticker_symbol: 'GOOGL',
        type: 'equity',
        close_price: 138.45,
      },
      {
        security_id: 'sec_vti',
        name: 'Vanguard Total Stock Market ETF',
        ticker_symbol: 'VTI',
        type: 'etf',
        close_price: 245.67,
      },
    ];

    // Generate mock investments
    this.mockData.investments = [
      {
        account_id: 'mock_investment_001',
        security_id: 'sec_aapl',
        quantity: 25,
        cost_basis: 150.00,
      },
      {
        account_id: 'mock_investment_001',
        security_id: 'sec_spy',
        quantity: 15,
        cost_basis: 420.00,
      },
      {
        account_id: 'mock_investment_001',
        security_id: 'sec_googl',
        quantity: 10,
        cost_basis: 125.00,
      },
      {
        account_id: 'mock_investment_001',
        security_id: 'sec_vti',
        quantity: 20,
        cost_basis: 230.00,
      },
    ];
  }

  private generateMockTransactions(): MockPlaidTransaction[] {
    const merchants = [
      { name: 'Starbucks', category: ['Food and Drink', 'Coffee Shop'] },
      { name: 'Amazon', category: ['Shops', 'Online'] },
      { name: 'Whole Foods Market', category: ['Food and Drink', 'Groceries'] },
      { name: 'Shell Gas Station', category: ['Transportation', 'Gas Stations'] },
      { name: 'Netflix', category: ['Service', 'Subscription'] },
      { name: 'Target', category: ['Shops', 'General Merchandise'] },
      { name: 'Chipotle Mexican Grill', category: ['Food and Drink', 'Restaurants'] },
      { name: 'Uber', category: ['Transportation', 'Taxi'] },
      { name: 'Apple Store', category: ['Shops', 'Electronics'] },
      { name: 'CVS Pharmacy', category: ['Shops', 'Pharmacies'] },
      { name: 'Spotify', category: ['Service', 'Subscription'] },
      { name: 'Trader Joes', category: ['Food and Drink', 'Groceries'] },
      { name: 'Exxon Mobil', category: ['Transportation', 'Gas Stations'] },
      { name: 'Home Depot', category: ['Shops', 'Home Improvement'] },
      { name: 'Costco', category: ['Shops', 'Warehouse Clubs'] },
    ];

    const transactions: MockPlaidTransaction[] = [];
    const now = new Date();

    // Generate transactions for the last 90 days
    for (let i = 0; i < 90; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Generate 1-5 transactions per day
      const transactionsPerDay = Math.floor(Math.random() * 5) + 1;
      
      for (let j = 0; j < transactionsPerDay; j++) {
        const merchant = merchants[Math.floor(Math.random() * merchants.length)];
        const amount = Math.round((Math.random() * 200 + 5) * 100) / 100;
        const accountId = Math.random() > 0.8 ? 'mock_credit_001' : 'mock_checking_001';
        
        transactions.push({
          transaction_id: `mock_tx_${generateId()}`,
          account_id: accountId,
          amount: amount,
          date: date.toISOString().split('T')[0],
          name: merchant.name,
          merchant_name: merchant.name,
          category: merchant.category,
          pending: Math.random() < 0.1, // 10% chance of pending
        });
      }
    }

    // Add some income transactions
    for (let i = 0; i < 3; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (i * 15)); // Every 2 weeks
      
      transactions.push({
        transaction_id: `mock_income_${generateId()}`,
        account_id: 'mock_checking_001',
        amount: -3500.00, // Negative amount for income in Plaid
        date: date.toISOString().split('T')[0],
        name: 'Payroll Deposit',
        merchant_name: 'ACME Corporation',
        category: ['Deposit', 'Payroll'],
        pending: false,
      });
    }

    return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  // Mock API endpoints
  async createLinkToken(): Promise<{ link_token: string }> {
    await this.simulateDelay();
    return {
      link_token: `link-sandbox-${generateId()}`,
    };
  }

  async exchangePublicToken(_publicToken: string): Promise<{ access_token: string; item_id: string }> {
    await this.simulateDelay();
    return {
      access_token: `access-sandbox-${generateId()}`,
      item_id: `item-${generateId()}`,
    };
  }

  async getAccounts(): Promise<{ accounts: MockPlaidAccount[]; item: any }> {
    await this.simulateDelay();
    return {
      accounts: this.mockData.accounts,
      item: {
        item_id: `item-${generateId()}`,
        institution_id: 'ins_platypus',
        webhook: null,
        error: null,
      },
    };
  }

  async getTransactions(startDate: string, endDate: string): Promise<{ transactions: MockPlaidTransaction[]; accounts: MockPlaidAccount[] }> {
    await this.simulateDelay();
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const filteredTransactions = this.mockData.transactions.filter(tx => {
      const txDate = new Date(tx.date);
      return txDate >= start && txDate <= end;
    });

    return {
      transactions: filteredTransactions,
      accounts: this.mockData.accounts,
    };
  }

  async getInvestments(): Promise<{ holdings: MockPlaidInvestment[]; securities: MockPlaidSecurity[]; accounts: MockPlaidAccount[] }> {
    await this.simulateDelay();
    return {
      holdings: this.mockData.investments,
      securities: this.mockData.securities,
      accounts: this.mockData.accounts.filter(acc => acc.type === 'investment'),
    };
  }

  async removeItem(): Promise<{ removed: boolean }> {
    await this.simulateDelay();
    return { removed: true };
  }

  private async simulateDelay(min = 500, max = 1500): Promise<void> {
    const delay = Math.random() * (max - min) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  // Get mock data for testing
  getMockData() {
    return this.mockData;
  }

  // Check if backend is running
  isBackendRunning(): boolean {
    return this.isRunning;
  }
}

// Export singleton instance
export const mockBackend = new MockBackend();
export default mockBackend;