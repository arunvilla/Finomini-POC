// Mock backend service that runs in the browser for testing
// This eliminates the need for a separate backend server during development

export class MockBackendService {
  private isRunning = false;
  private mockDelay = 1000; // 1 second delay to simulate network

  // Simulate backend health check
  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    await this.delay();
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }

  // Mock Plaid link token creation
  async createLinkToken(userId?: string): Promise<string> {
    await this.delay();
    
    // Simulate successful token creation
    return `link-sandbox-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Mock public token exchange
  async exchangePublicToken(publicToken: string): Promise<{ access_token: string; item_id: string }> {
    await this.delay();
    
    return {
      access_token: `access-sandbox-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      item_id: `item-${Date.now()}`,
    };
  }

  // Mock account data
  async getAccounts(accessToken: string): Promise<any> {
    await this.delay();
    
    return {
      accounts: [
        {
          account_id: 'demo_checking',
          name: 'Demo Checking Account',
          type: 'depository',
          subtype: 'checking',
          balances: {
            available: 2500.50,
            current: 2500.50,
          },
          institution_name: 'Demo Bank',
        },
        {
          account_id: 'demo_savings',
          name: 'Demo Savings Account',
          type: 'depository',
          subtype: 'savings',
          balances: {
            available: 15000.00,
            current: 15000.00,
          },
          institution_name: 'Demo Bank',
        }
      ],
      item: { item_id: 'demo_item' },
    };
  }

  // Mock transaction data
  async getTransactions(accessToken: string, startDate: string, endDate: string): Promise<any> {
    await this.delay();
    
    const mockTransactions = Array.from({ length: 20 }, (_, i) => ({
      transaction_id: `demo_tx_${i}`,
      account_id: i % 2 === 0 ? 'demo_checking' : 'demo_savings',
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
      merchant_name: 'Demo Merchant',
      category: ['Food and Drink', 'Shops', 'Transportation', 'Bills'][Math.floor(Math.random() * 4)],
      pending: Math.random() > 0.8,
    }));

    return {
      transactions: mockTransactions,
      accounts: [],
      total_transactions: mockTransactions.length,
    };
  }

  // Mock investments
  async getInvestments(accessToken: string): Promise<any> {
    await this.delay();
    
    return {
      holdings: [
        {
          account_id: 'demo_investment',
          security_id: 'demo_aapl',
          quantity: 10,
          cost_basis: 1400,
        }
      ],
      securities: [
        {
          security_id: 'demo_aapl',
          name: 'Apple Inc.',
          ticker_symbol: 'AAPL',
          type: 'equity',
          close_price: 150.25,
        }
      ],
      accounts: [
        {
          account_id: 'demo_investment',
          name: 'Demo Investment Account',
          type: 'investment',
        }
      ],
    };
  }

  // Start mock backend
  start(): void {
    this.isRunning = true;
    console.log('🚀 Mock Backend Service started');
  }

  // Stop mock backend
  stop(): void {
    this.isRunning = false;
    console.log('🛑 Mock Backend Service stopped');
  }

  // Check if running
  isOnline(): boolean {
    return this.isRunning;
  }

  // Simulate network delay
  private delay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, this.mockDelay));
  }
}

// Export singleton
export const mockBackend = new MockBackendService();
export default MockBackendService;