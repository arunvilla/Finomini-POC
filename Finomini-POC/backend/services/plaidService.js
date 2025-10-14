// Backend Plaid Service - Secure server-side integration
const { PlaidApi, Configuration, PlaidEnvironments } = require('plaid');
const { v4: uuidv4 } = require('uuid');

class PlaidService {
  constructor() {
    // Validate required environment variables
    if (!process.env.PLAID_CLIENT_ID || !process.env.PLAID_SECRET) {
      throw new Error('Missing required Plaid credentials in environment variables');
    }

    // Configure Plaid client
    const configuration = new Configuration({
      basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
          'PLAID-SECRET': process.env.PLAID_SECRET,
        },
      },
    });

    this.client = new PlaidApi(configuration);
    this.environment = process.env.PLAID_ENV || 'sandbox';
    
    console.log(`🔗 Plaid Service initialized for ${this.environment} environment`);
  }

  // Create link token for Plaid Link initialization
  async createLinkToken(userId = null) {
    try {
      const request = {
        products: ['transactions', 'accounts', 'investments'],
        client_name: 'AI Finance Manager',
        country_codes: ['US'],
        language: 'en',
        user: {
          client_user_id: userId || uuidv4(),
        },
        webhook: process.env.PLAID_WEBHOOK_URL || undefined,
      };

      const response = await this.client.linkTokenCreate(request);
      
      return {
        link_token: response.data.link_token,
        expiration: response.data.expiration,
        request_id: response.data.request_id,
      };
    } catch (error) {
      console.error('Failed to create link token:', error);
      throw new Error(`Link token creation failed: ${error.message}`);
    }
  }

  // Exchange public token for access token
  async exchangePublicToken(publicToken) {
    try {
      const request = {
        public_token: publicToken,
      };

      const response = await this.client.linkTokenExchange(request);
      
      return {
        access_token: response.data.access_token,
        item_id: response.data.item_id,
        request_id: response.data.request_id,
      };
    } catch (error) {
      console.error('Failed to exchange public token:', error);
      throw new Error(`Token exchange failed: ${error.message}`);
    }
  }

  // Get account information
  async getAccounts(accessToken) {
    try {
      const request = {
        access_token: accessToken,
      };

      const response = await this.client.accountsGet(request);
      
      return {
        accounts: response.data.accounts,
        item: response.data.item,
        request_id: response.data.request_id,
      };
    } catch (error) {
      console.error('Failed to get accounts:', error);
      throw new Error(`Account fetch failed: ${error.message}`);
    }
  }

  // Get transactions
  async getTransactions(accessToken, startDate, endDate, options = {}) {
    try {
      const request = {
        access_token: accessToken,
        start_date: startDate,
        end_date: endDate,
        count: options.count || 500,
        offset: options.offset || 0,
      };

      const response = await this.client.transactionsGet(request);
      
      return {
        transactions: response.data.transactions,
        accounts: response.data.accounts,
        total_transactions: response.data.total_transactions,
        request_id: response.data.request_id,
      };
    } catch (error) {
      console.error('Failed to get transactions:', error);
      throw new Error(`Transaction fetch failed: ${error.message}`);
    }
  }

  // Get investments
  async getInvestments(accessToken) {
    try {
      const request = {
        access_token: accessToken,
      };

      const response = await this.client.investmentsHoldingsGet(request);
      
      return {
        accounts: response.data.accounts,
        holdings: response.data.holdings,
        securities: response.data.securities,
        request_id: response.data.request_id,
      };
    } catch (error) {
      console.error('Failed to get investments:', error);
      throw new Error(`Investment fetch failed: ${error.message}`);
    }
  }

  // Get liabilities
  async getLiabilities(accessToken) {
    try {
      const request = {
        access_token: accessToken,
      };

      const response = await this.client.liabilitiesGet(request);
      
      return {
        accounts: response.data.accounts,
        liabilities: response.data.liabilities,
        request_id: response.data.request_id,
      };
    } catch (error) {
      console.error('Failed to get liabilities:', error);
      throw new Error(`Liability fetch failed: ${error.message}`);
    }
  }

  // Remove item (disconnect account)
  async removeItem(accessToken) {
    try {
      const request = {
        access_token: accessToken,
      };

      const response = await this.client.itemRemove(request);
      
      return {
        removed: response.data.removed,
        request_id: response.data.request_id,
      };
    } catch (error) {
      console.error('Failed to remove item:', error);
      throw new Error(`Item removal failed: ${error.message}`);
    }
  }

  // Get item status
  async getItemStatus(accessToken) {
    try {
      const request = {
        access_token: accessToken,
      };

      const response = await this.client.itemGet(request);
      
      return {
        item: response.data.item,
        status: response.data.status,
        request_id: response.data.request_id,
      };
    } catch (error) {
      console.error('Failed to get item status:', error);
      throw new Error(`Item status fetch failed: ${error.message}`);
    }
  }

  // Refresh transactions (force sync)
  async refreshTransactions(accessToken) {
    try {
      const request = {
        access_token: accessToken,
      };

      const response = await this.client.transactionsRefresh(request);
      
      return {
        request_id: response.data.request_id,
      };
    } catch (error) {
      console.error('Failed to refresh transactions:', error);
      throw new Error(`Transaction refresh failed: ${error.message}`);
    }
  }
}

module.exports = new PlaidService();