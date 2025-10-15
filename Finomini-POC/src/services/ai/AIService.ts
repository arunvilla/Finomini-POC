// AI Service for transaction categorization and insights

import { AIService as IAIService } from '../../types/services';
import { Transaction, Budget, AIInsight } from '../../types';

export interface AICategorizationResult {
  category: string;
  subcategory?: string;
  confidence: number;
  reasoning?: string;
}

export interface AIInsightResult {
  insights: AIInsight[];
  generated_at: Date;
  confidence: number;
  processing_time: number;
}

export interface AIPredictionResult {
  prediction: {
    amount: number;
    category?: string;
    confidence: number;
    factors: string[];
  };
  confidence_interval: {
    lower: number;
    upper: number;
  };
  generated_at: Date;
}

export class AIService implements IAIService {
  private static instance: AIService;
  private openaiApiKey: string | null = null;
  private anthropicApiKey: string | null = null;
  private preferredProvider: 'openai' | 'anthropic' | 'local' = 'local';
  private openaiBaseUrl = 'https://api.openai.com/v1';
  private anthropicBaseUrl = 'https://api.anthropic.com/v1';
  private openaiModel = 'gpt-3.5-turbo';
  private anthropicModel = 'claude-3-haiku-20240307';
  private isInitialized = false;
  private rateLimitDelay = 1000; // 1 second between requests
  private lastRequestTime = 0;

  private constructor() {
    // Initialize with environment variables
    this.openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY || null;
    this.anthropicApiKey = import.meta.env.VITE_ANTHROPIC_API_KEY || null;
    
    // Determine preferred provider
    if (this.openaiApiKey) {
      this.preferredProvider = 'openai';
    } else if (this.anthropicApiKey) {
      this.preferredProvider = 'anthropic';
    } else {
      this.preferredProvider = 'local';
    }
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  /**
   * Initialize the AI service
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Test API connections and determine best provider
      if (this.openaiApiKey) {
        try {
          await this.testOpenAIConnection();
          this.preferredProvider = 'openai';
          console.log('AI Service initialized with OpenAI API');
        } catch (error) {
          console.warn('OpenAI API test failed:', error);
          if (this.anthropicApiKey) {
            try {
              await this.testAnthropicConnection();
              this.preferredProvider = 'anthropic';
              console.log('AI Service initialized with Anthropic API (OpenAI fallback)');
            } catch (anthropicError) {
              console.warn('Anthropic API test failed:', anthropicError);
              this.preferredProvider = 'local';
            }
          } else {
            this.preferredProvider = 'local';
          }
        }
      } else if (this.anthropicApiKey) {
        try {
          await this.testAnthropicConnection();
          this.preferredProvider = 'anthropic';
          console.log('AI Service initialized with Anthropic API');
        } catch (error) {
          console.warn('Anthropic API test failed:', error);
          this.preferredProvider = 'local';
        }
      } else {
        this.preferredProvider = 'local';
        console.log('AI Service initialized with local processing (no API keys)');
      }
      
      this.isInitialized = true;
    } catch (error) {
      console.warn('AI Service initialization failed, falling back to local processing:', error);
      this.preferredProvider = 'local';
      this.isInitialized = true;
    }
  }

  /**
   * Test OpenAI API connection
   */
  private async testOpenAIConnection(): Promise<void> {
    if (!this.openaiApiKey) throw new Error('No OpenAI API key');

    const response = await fetch(`${this.openaiBaseUrl}/models`, {
      headers: {
        'Authorization': `Bearer ${this.openaiApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`OpenAI API test failed: ${response.status}`);
    }
  }

  /**
   * Test Anthropic API connection
   */
  private async testAnthropicConnection(): Promise<void> {
    if (!this.anthropicApiKey) throw new Error('No Anthropic API key');

    // Anthropic doesn't have a models endpoint, so we'll do a minimal request
    const response = await fetch(`${this.anthropicBaseUrl}/messages`, {
      method: 'POST',
      headers: {
        'x-api-key': this.anthropicApiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: this.anthropicModel,
        max_tokens: 1,
        messages: [{ role: 'user', content: 'test' }]
      })
    });

    if (!response.ok && response.status !== 400) { // 400 is expected for minimal request
      throw new Error(`Anthropic API test failed: ${response.status}`);
    }
  }

  /**
   * Rate limit API requests
   */
  private async rateLimitRequest(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.rateLimitDelay) {
      const delay = this.rateLimitDelay - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    this.lastRequestTime = Date.now();
  }

  /**
   * Make API request with provider fallback
   */
  private async makeAPIRequest(messages: Array<{role: string, content: string}>): Promise<string> {
    await this.rateLimitRequest();

    // Try preferred provider first
    try {
      if (this.preferredProvider === 'openai' && this.openaiApiKey) {
        return await this.makeOpenAIRequest(messages);
      } else if (this.preferredProvider === 'anthropic' && this.anthropicApiKey) {
        return await this.makeAnthropicRequest(messages);
      }
    } catch (error) {
      console.warn(`${this.preferredProvider} API request failed, trying fallback:`, error);
      
      // Try fallback provider
      if (this.preferredProvider === 'openai' && this.anthropicApiKey) {
        try {
          return await this.makeAnthropicRequest(messages);
        } catch (fallbackError) {
          console.warn('Anthropic fallback failed:', fallbackError);
        }
      } else if (this.preferredProvider === 'anthropic' && this.openaiApiKey) {
        try {
          return await this.makeOpenAIRequest(messages);
        } catch (fallbackError) {
          console.warn('OpenAI fallback failed:', fallbackError);
        }
      }
      
      throw error;
    }

    throw new Error('No API provider available');
  }

  /**
   * Make OpenAI API request
   */
  private async makeOpenAIRequest(messages: Array<{role: string, content: string}>): Promise<string> {
    if (!this.openaiApiKey) {
      throw new Error('No OpenAI API key available');
    }

    const response = await fetch(`${this.openaiBaseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: this.openaiModel,
        messages,
        max_tokens: 500,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API request failed: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  }

  /**
   * Make Anthropic API request
   */
  private async makeAnthropicRequest(messages: Array<{role: string, content: string}>): Promise<string> {
    if (!this.anthropicApiKey) {
      throw new Error('No Anthropic API key available');
    }

    // Convert OpenAI format to Anthropic format
    const anthropicMessages = messages.filter(m => m.role !== 'system').map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content
    }));

    const systemMessage = messages.find(m => m.role === 'system')?.content;

    const response = await fetch(`${this.anthropicBaseUrl}/messages`, {
      method: 'POST',
      headers: {
        'x-api-key': this.anthropicApiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: this.anthropicModel,
        max_tokens: 500,
        messages: anthropicMessages,
        system: systemMessage
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Anthropic API request failed: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.content[0]?.text || '';
  }

  /**
   * Categorize transaction using AI with learning
   */
  async categorizeTransaction(
    description: string,
    amount: number,
    plaidCategory?: string,
    merchant?: string
  ): Promise<{ category: string; confidence: number; reasoning?: string; source?: string }> {
    await this.initialize();

    try {
      // First try to get improved suggestion from feedback service
      const { feedbackService } = await import('./FeedbackService');
      const improvedSuggestion = await feedbackService.getImprovedSuggestion(
        description,
        merchant,
        amount,
        plaidCategory
      );

      if (improvedSuggestion.confidence > 0.8) {
        return {
          category: improvedSuggestion.category,
          confidence: improvedSuggestion.confidence,
          reasoning: improvedSuggestion.reasoning,
          source: improvedSuggestion.source
        };
      }

      // Fallback to regular AI categorization
      if (this.preferredProvider !== 'local') {
        const result = await this.categorizeWithAPI(description, amount, plaidCategory);
        return { ...result, source: 'ai' };
      } else {
        const result = this.categorizeLocally(description, amount, plaidCategory);
        return { ...result, source: 'local' };
      }
    } catch (error) {
      console.warn('AI categorization failed, using fallback:', error);
      const result = this.categorizeLocally(description, amount, plaidCategory);
      return { ...result, source: 'fallback' };
    }
  }

  /**
   * Categorize using OpenAI API
   */
  private async categorizeWithAPI(
    description: string,
    amount: number,
    plaidCategory?: string
  ): Promise<{ category: string; confidence: number }> {
    const prompt = `Categorize this financial transaction:
Description: "${description}"
Amount: $${amount}
${plaidCategory ? `Plaid Category: ${plaidCategory}` : ''}

Choose the most appropriate category from:
- Groceries
- Dining Out
- Transportation
- Gas
- Shopping
- Entertainment
- Healthcare
- Utilities
- Income
- Transfer
- Other

Respond with only the category name and confidence (0-100) in format: "Category: [category], Confidence: [number]"`;

    const messages = [
      { role: 'system', content: 'You are a financial transaction categorization expert.' },
      { role: 'user', content: prompt }
    ];

    const response = await this.makeAPIRequest(messages);
    
    // Parse response
    const categoryMatch = response.match(/Category:\s*([^,]+)/i);
    const confidenceMatch = response.match(/Confidence:\s*(\d+)/i);
    
    const category = categoryMatch?.[1]?.trim() || 'Other';
    const confidence = confidenceMatch ? parseInt(confidenceMatch[1]) / 100 : 0.7;

    return { category, confidence };
  }

  /**
   * Local categorization fallback
   */
  private categorizeLocally(
    description: string,
    amount: number,
    plaidCategory?: string
  ): Promise<{ category: string; confidence: number }> {
    const desc = description.toLowerCase();
    let category = 'Other';
    let confidence = 0.6;

    // Use Plaid category if available
    if (plaidCategory) {
      const plaidLower = plaidCategory.toLowerCase();
      if (plaidLower.includes('food') || plaidLower.includes('restaurant')) {
        category = 'Dining Out';
        confidence = 0.8;
      } else if (plaidLower.includes('grocery')) {
        category = 'Groceries';
        confidence = 0.8;
      } else if (plaidLower.includes('gas') || plaidLower.includes('fuel')) {
        category = 'Gas';
        confidence = 0.8;
      } else if (plaidLower.includes('transport')) {
        category = 'Transportation';
        confidence = 0.8;
      }
    }

    // Fallback to description-based categorization
    if (category === 'Other') {
      if (desc.includes('grocery') || desc.includes('market') || desc.includes('whole foods')) {
        category = 'Groceries';
        confidence = 0.7;
      } else if (desc.includes('restaurant') || desc.includes('cafe') || desc.includes('starbucks')) {
        category = 'Dining Out';
        confidence = 0.7;
      } else if (desc.includes('gas') || desc.includes('shell') || desc.includes('exxon')) {
        category = 'Gas';
        confidence = 0.7;
      } else if (desc.includes('uber') || desc.includes('lyft') || desc.includes('taxi')) {
        category = 'Transportation';
        confidence = 0.7;
      } else if (desc.includes('target') || desc.includes('walmart') || desc.includes('amazon')) {
        category = 'Shopping';
        confidence = 0.7;
      } else if (amount < 0) {
        category = 'Income';
        confidence = 0.6;
      }
    }

    return Promise.resolve({ category, confidence });
  }

  /**
   * Generate cash flow forecast from transaction data
   */
  async generateCashFlowForecast(transactions: Transaction[], accounts: any[]): Promise<any[]> {
    await this.initialize();
    
    if (this.preferredProvider !== 'local') {
      try {
        return await this.generateCashFlowForecastWithAPI(transactions, accounts);
      } catch (error) {
        console.warn('AI cash flow forecast failed, using fallback:', error);
        return this.generateCashFlowForecastLocal(transactions, accounts);
      }
    } else {
      return this.generateCashFlowForecastLocal(transactions, accounts);
    }
  }

  /**
   * Generate cash flow alerts from predictions
   */
  async generateCashFlowAlerts(predictions: any[]): Promise<any[]> {
    await this.initialize();
    
    if (this.preferredProvider !== 'local') {
      try {
        return await this.generateCashFlowAlertsWithAPI(predictions);
      } catch (error) {
        console.warn('AI cash flow alerts failed, using fallback:', error);
        return this.generateCashFlowAlertsLocal(predictions);
      }
    } else {
      return this.generateCashFlowAlertsLocal(predictions);
    }
  }

  /**
   * Generate budget forecast from budget and transaction data
   */
  async generateBudgetForecast(budgets: Budget[], transactions: Transaction[]): Promise<any[]> {
    await this.initialize();
    
    if (this.preferredProvider !== 'local') {
      try {
        return await this.generateBudgetForecastWithAPI(budgets, transactions);
      } catch (error) {
        console.warn('AI budget forecast failed, using fallback:', error);
        return this.generateBudgetForecastLocal(budgets, transactions);
      }
    } else {
      return this.generateBudgetForecastLocal(budgets, transactions);
    }
  }

  /**
   * Generate AI insights from transaction data
   */
  async generateInsights(transactions: Transaction[]): Promise<AIInsight[]> {
    await this.initialize();

    try {
      if (this.preferredProvider !== 'local' && transactions.length > 10) {
        return await this.generateInsightsWithAPI(transactions);
      } else {
        return this.generateInsightsLocally(transactions);
      }
    } catch (error) {
      console.warn('AI insights generation failed, using fallback:', error);
      return this.generateInsightsLocally(transactions);
    }
  }

  /**
   * Generate insights using OpenAI API
   */
  private async generateInsightsWithAPI(transactions: Transaction[]): Promise<AIInsight[]> {
    // Prepare transaction summary for AI
    const summary = this.prepareTransactionSummary(transactions);
    
    const prompt = `Analyze these financial transactions and provide insights:

${summary}

Generate 3-5 actionable financial insights focusing on:
1. Spending patterns and trends
2. Budget optimization opportunities
3. Unusual or concerning transactions
4. Savings recommendations

Format each insight as:
Type: [spending_pattern|recommendation|anomaly]
Title: [Brief title]
Description: [Detailed description]
Confidence: [0-100]
---`;

    const messages = [
      { role: 'system', content: 'You are a financial advisor AI that provides actionable insights.' },
      { role: 'user', content: prompt }
    ];

    const response = await this.makeAPIRequest(messages);
    return this.parseInsightsResponse(response);
  }

  /**
   * Generate insights locally
   */
  private generateInsightsLocally(transactions: Transaction[]): AIInsight[] {
    const insights: AIInsight[] = [];
    
    if (transactions.length === 0) return insights;

    // Calculate basic statistics
    const totalSpending = transactions
      .filter(t => t.amount > 0 && !t.is_hidden)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const avgTransaction = totalSpending / transactions.length;
    
    // Category analysis
    const categorySpending = this.analyzeCategorySpending(transactions);
    const topCategory = Object.entries(categorySpending)
      .sort(([,a], [,b]) => b - a)[0];

    if (topCategory && topCategory[1] > totalSpending * 0.3) {
      insights.push({
        id: crypto.randomUUID(),
        type: 'spending_pattern',
        title: `High ${topCategory[0]} Spending`,
        description: `You've spent $${topCategory[1].toFixed(2)} on ${topCategory[0]}, which is ${((topCategory[1] / totalSpending) * 100).toFixed(1)}% of your total spending.`,
        confidence: 0.8,
        category: topCategory[0],
        amount: topCategory[1],
        created_at: new Date(),
        is_read: false
      });
    }

    // Large transaction detection
    const largeTransactions = transactions.filter(t => t.amount > avgTransaction * 3);
    if (largeTransactions.length > 0) {
      insights.push({
        id: crypto.randomUUID(),
        type: 'anomaly',
        title: 'Unusual Large Transactions',
        description: `Found ${largeTransactions.length} transactions significantly above your average of $${avgTransaction.toFixed(2)}.`,
        confidence: 0.7,
        created_at: new Date(),
        is_read: false
      });
    }

    // Savings recommendation
    if (totalSpending > 1000) {
      insights.push({
        id: crypto.randomUUID(),
        type: 'recommendation',
        title: 'Savings Opportunity',
        description: `Consider setting aside 10% of your spending ($${(totalSpending * 0.1).toFixed(2)}) for savings.`,
        confidence: 0.6,
        created_at: new Date(),
        is_read: false
      });
    }

    return insights;
  }

  /**
   * Predict spending for a category
   */
  async predictSpending(
    transactions: Transaction[],
    category?: string
  ): Promise<{ amount: number; confidence: number }> {
    await this.initialize();

    // Simple prediction based on historical average
    const relevantTransactions = category 
      ? transactions.filter(t => t.category === category && t.amount > 0)
      : transactions.filter(t => t.amount > 0);

    if (relevantTransactions.length === 0) {
      return { amount: 0, confidence: 0 };
    }

    const totalAmount = relevantTransactions.reduce((sum, t) => sum + t.amount, 0);
    const avgAmount = totalAmount / relevantTransactions.length;
    
    // Simple trend analysis
    const recentTransactions = relevantTransactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, Math.min(10, relevantTransactions.length));
    
    const recentAvg = recentTransactions.reduce((sum, t) => sum + t.amount, 0) / recentTransactions.length;
    
    // Weighted prediction favoring recent data
    const prediction = (avgAmount * 0.3) + (recentAvg * 0.7);
    const confidence = Math.min(relevantTransactions.length / 10, 1) * 0.8;

    return { amount: prediction, confidence };
  }

  /**
   * Analyze budget goal achievability
   */
  async analyzeBudgetGoal(
    budget: Budget,
    transactions: Transaction[]
  ): Promise<{ achievable: boolean; recommendation: string }> {
    const categoryTransactions = transactions.filter(
      t => t.category === budget.category && t.amount > 0 && !t.is_hidden
    );

    if (categoryTransactions.length === 0) {
      return {
        achievable: true,
        recommendation: 'No spending history in this category. Monitor closely as you start spending.'
      };
    }

    const avgMonthlySpending = this.calculateMonthlyAverage(categoryTransactions);
    const achievable = avgMonthlySpending <= budget.amount;
    
    let recommendation: string;
    if (achievable) {
      const savings = budget.amount - avgMonthlySpending;
      recommendation = `Your budget looks achievable! You typically spend $${avgMonthlySpending.toFixed(2)}, giving you $${savings.toFixed(2)} buffer.`;
    } else {
      const overage = avgMonthlySpending - budget.amount;
      recommendation = `Your budget may be challenging. You typically spend $${avgMonthlySpending.toFixed(2)}, which is $${overage.toFixed(2)} over budget. Consider increasing the budget or reducing spending.`;
    }

    return { achievable, recommendation };
  }

  // Helper methods
  private prepareTransactionSummary(transactions: Transaction[]): string {
    const summary = transactions.slice(0, 20).map(t => 
      `${t.date}: ${t.description} - $${t.amount} (${t.category})`
    ).join('\n');
    
    const totalSpending = transactions.reduce((sum, t) => sum + (t.amount > 0 ? t.amount : 0), 0);
    const categoryBreakdown = this.analyzeCategorySpending(transactions);
    
    return `Recent Transactions:\n${summary}\n\nTotal Spending: $${totalSpending.toFixed(2)}\nTop Categories: ${Object.entries(categoryBreakdown).slice(0, 5).map(([cat, amt]) => `${cat}: $${amt.toFixed(2)}`).join(', ')}`;
  }

  private parseInsightsResponse(response: string): AIInsight[] {
    const insights: AIInsight[] = [];
    const sections = response.split('---').filter(s => s.trim());
    
    for (const section of sections) {
      const lines = section.trim().split('\n');
      const insight: Partial<AIInsight> = {
        id: crypto.randomUUID(),
        created_at: new Date(),
        is_read: false
      };
      
      for (const line of lines) {
        const [key, ...valueParts] = line.split(':');
        const value = valueParts.join(':').trim();
        
        switch (key.toLowerCase().trim()) {
          case 'type':
            insight.type = value as AIInsight['type'];
            break;
          case 'title':
            insight.title = value;
            break;
          case 'description':
            insight.description = value;
            break;
          case 'confidence':
            insight.confidence = parseInt(value) / 100;
            break;
        }
      }
      
      if (insight.type && insight.title && insight.description) {
        insights.push(insight as AIInsight);
      }
    }
    
    return insights;
  }

  private analyzeCategorySpending(transactions: Transaction[]): Record<string, number> {
    const categorySpending: Record<string, number> = {};
    
    for (const transaction of transactions) {
      if (transaction.amount > 0 && !transaction.is_hidden) {
        categorySpending[transaction.category] = (categorySpending[transaction.category] || 0) + transaction.amount;
      }
    }
    
    return categorySpending;
  }

  private calculateMonthlyAverage(transactions: Transaction[]): number {
    if (transactions.length === 0) return 0;
    
    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
    const oldestDate = new Date(Math.min(...transactions.map(t => new Date(t.date).getTime())));
    const newestDate = new Date(Math.max(...transactions.map(t => new Date(t.date).getTime())));
    
    const monthsDiff = Math.max(1, (newestDate.getTime() - oldestDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
    
    return totalAmount / monthsDiff;
  }

  /**
   * Get service status
   */
  getStatus(): {
    isInitialized: boolean;
    preferredProvider: string;
    hasOpenAI: boolean;
    hasAnthropic: boolean;
    hasAPIKey: boolean;
    openaiModel: string;
    anthropicModel: string;
  } {
    return {
      isInitialized: this.isInitialized,
      preferredProvider: this.preferredProvider,
      hasOpenAI: !!this.openaiApiKey,
      hasAnthropic: !!this.anthropicApiKey,
      hasAPIKey: !!(this.openaiApiKey || this.anthropicApiKey),
      openaiModel: this.openaiModel,
      anthropicModel: this.anthropicModel
    };
  }

  /**
   * Set preferred AI provider
   */
  setPreferredProvider(provider: 'openai' | 'anthropic' | 'local'): void {
    if (provider === 'openai' && !this.openaiApiKey) {
      throw new Error('OpenAI API key not available');
    }
    if (provider === 'anthropic' && !this.anthropicApiKey) {
      throw new Error('Anthropic API key not available');
    }
    
    this.preferredProvider = provider;
    console.log(`AI Service provider changed to: ${provider}`);
  }

  /**
   * Update API configuration
   */
  updateConfig(config: {
    openaiApiKey?: string;
    anthropicApiKey?: string;
    openaiModel?: string;
    anthropicModel?: string;
  }): void {
    if (config.openaiApiKey !== undefined) {
      this.openaiApiKey = config.openaiApiKey;
    }
    if (config.anthropicApiKey !== undefined) {
      this.anthropicApiKey = config.anthropicApiKey;
    }
    if (config.openaiModel !== undefined) {
      this.openaiModel = config.openaiModel;
    }
    if (config.anthropicModel !== undefined) {
      this.anthropicModel = config.anthropicModel;
    }
    
    // Re-determine preferred provider
    if (this.openaiApiKey && this.preferredProvider === 'local') {
      this.preferredProvider = 'openai';
    } else if (this.anthropicApiKey && this.preferredProvider === 'local') {
      this.preferredProvider = 'anthropic';
    }
    
    // Reset initialization to test new config
    this.isInitialized = false;
  }

  /**
   * Generate cash flow forecast with API
   */
  private async generateCashFlowForecastWithAPI(transactions: Transaction[], accounts: any[]): Promise<any[]> {
    const summary = this.prepareTransactionSummary(transactions);
    const accountSummary = accounts.map(acc => `${acc.name}: ${acc.balance}`).join(', ');
    
    const prompt = `Based on this financial data, generate a 6-month cash flow forecast:

Transaction History:
${summary}

Current Accounts:
${accountSummary}

Please provide a JSON array of monthly predictions with this structure:
[{
  "date": "2024-02-01",
  "starting_balance": 5000,
  "predicted_income": 4500,
  "predicted_expenses": 3800,
  "ending_balance": 5700,
  "risk_level": "low",
  "predicted_events": ["Salary deposit", "Regular expenses"]
}]

Focus on realistic predictions based on historical patterns.`;

    try {
      const response = await this.makeAPIRequest([
        { role: 'user', content: prompt }
      ]);
      
      return JSON.parse(response);
    } catch (error) {
      console.error('API forecast failed, falling back to local:', error);
      return this.generateCashFlowForecastLocal(transactions, accounts);
    }
  }

  /**
   * Generate cash flow forecast locally
   */
  private generateCashFlowForecastLocal(transactions: Transaction[], accounts: any[]): any[] {
    const currentBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);
    const monthlyIncome = this.calculateMonthlyIncome(transactions);
    const monthlyExpenses = this.calculateMonthlyExpenses(transactions);
    
    const predictions = [];
    let balance = currentBalance;
    
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() + i);
      
      const income = monthlyIncome * (0.95 + Math.random() * 0.1); // Add some variation
      const expenses = monthlyExpenses * (0.95 + Math.random() * 0.1);
      const endingBalance = balance + income - expenses;
      
      let riskLevel = 'low';
      if (endingBalance < 1000) riskLevel = 'high';
      else if (endingBalance < 3000) riskLevel = 'medium';
      
      predictions.push({
        date: date.toISOString().split('T')[0],
        starting_balance: balance,
        predicted_income: income,
        predicted_expenses: expenses,
        ending_balance: endingBalance,
        risk_level: riskLevel,
        predicted_events: ['Projected income', 'Estimated expenses']
      });
      
      balance = endingBalance;
    }
    
    return predictions;
  }

  /**
   * Generate cash flow alerts with API
   */
  private async generateCashFlowAlertsWithAPI(predictions: any[]): Promise<any[]> {
    const prompt = `Based on these cash flow predictions, identify potential risks and opportunities:

${JSON.stringify(predictions, null, 2)}

Generate alerts as JSON array with this structure:
[{
  "id": "unique-id",
  "type": "critical|warning|opportunity",
  "date": "2024-02-15",
  "title": "Alert Title",
  "description": "Detailed description",
  "suggested_action": "Recommended action",
  "impact_amount": -500,
  "priority": "high|medium|low"
}]`;

    try {
      const response = await this.makeAPIRequest([
        { role: 'user', content: prompt }
      ]);
      
      return JSON.parse(response);
    } catch (error) {
      console.error('API alerts failed, falling back to local:', error);
      return this.generateCashFlowAlertsLocal(predictions);
    }
  }

  /**
   * Generate cash flow alerts locally
   */
  private generateCashFlowAlertsLocal(predictions: any[]): any[] {
    const alerts = [];
    
    for (const pred of predictions) {
      if (pred.ending_balance < 500) {
        alerts.push({
          id: crypto.randomUUID(),
          type: 'critical',
          date: pred.date,
          title: 'Critical Low Balance Alert',
          description: `Balance projected to drop to $${pred.ending_balance.toFixed(2)}`,
          suggested_action: 'Transfer funds from savings or reduce expenses',
          impact_amount: pred.ending_balance,
          priority: 'high'
        });
      } else if (pred.ending_balance < 1500) {
        alerts.push({
          id: crypto.randomUUID(),
          type: 'warning',
          date: pred.date,
          title: 'Low Balance Warning',
          description: `Balance projected to be $${pred.ending_balance.toFixed(2)}`,
          suggested_action: 'Monitor spending closely',
          impact_amount: pred.ending_balance,
          priority: 'medium'
        });
      }
      
      if (pred.ending_balance > pred.starting_balance + 1000) {
        alerts.push({
          id: crypto.randomUUID(),
          type: 'opportunity',
          date: pred.date,
          title: 'Surplus Opportunity',
          description: `Projected surplus of $${(pred.ending_balance - pred.starting_balance).toFixed(2)}`,
          suggested_action: 'Consider investing or saving excess funds',
          impact_amount: pred.ending_balance - pred.starting_balance,
          priority: 'medium'
        });
      }
    }
    
    return alerts;
  }

  /**
   * Generate budget forecast with API
   */
  private async generateBudgetForecastWithAPI(budgets: Budget[], transactions: Transaction[]): Promise<any[]> {
    const budgetSummary = budgets.map(b => `${b.category}: $${b.amount} budget`).join(', ');
    const spendingSummary = this.analyzeCategorySpending(transactions);
    
    const prompt = `Based on budget goals and spending history, generate budget forecasts:

Budgets: ${budgetSummary}
Historical Spending: ${JSON.stringify(spendingSummary, null, 2)}

Generate forecasts as JSON array:
[{
  "budget_id": "budget-id",
  "confidence": 0.85,
  "recommended_adjustment": 450,
  "insights": ["Insight 1", "Insight 2"]
}]`;

    try {
      const response = await this.makeAPIRequest([
        { role: 'user', content: prompt }
      ]);
      
      return JSON.parse(response);
    } catch (error) {
      console.error('API budget forecast failed, falling back to local:', error);
      return this.generateBudgetForecastLocal(budgets, transactions);
    }
  }

  /**
   * Generate budget forecast locally
   */
  private generateBudgetForecastLocal(budgets: Budget[], transactions: Transaction[]): any[] {
    return budgets.map(budget => {
      const categoryTransactions = transactions.filter(t => t.category === budget.category);
      const avgSpending = this.calculateMonthlyAverage(categoryTransactions);
      const confidence = Math.min(categoryTransactions.length / 10, 1) * 0.8;
      
      let recommendedAdjustment = budget.amount;
      const insights = [`Average monthly spending: $${avgSpending.toFixed(2)}`];
      
      if (avgSpending > budget.amount) {
        recommendedAdjustment = avgSpending * 1.1;
        insights.push('Consider increasing budget based on spending patterns');
      } else if (avgSpending < budget.amount * 0.8) {
        recommendedAdjustment = avgSpending * 1.2;
        insights.push('Budget could be reduced while maintaining spending flexibility');
      } else {
        insights.push('Current budget appears well-calibrated');
      }
      
      return {
        budget_id: budget.id,
        confidence,
        recommended_adjustment: recommendedAdjustment,
        insights
      };
    });
  }

  private calculateMonthlyIncome(transactions: Transaction[]): number {
    const incomeTransactions = transactions.filter(t => t.amount < 0); // Income is negative
    if (incomeTransactions.length === 0) return 0;
    
    const totalIncome = incomeTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const months = this.getMonthsSpan(incomeTransactions);
    return totalIncome / Math.max(months, 1);
  }

  private calculateMonthlyExpenses(transactions: Transaction[]): number {
    const expenseTransactions = transactions.filter(t => t.amount > 0); // Expenses are positive
    if (expenseTransactions.length === 0) return 0;
    
    const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
    const months = this.getMonthsSpan(expenseTransactions);
    return totalExpenses / Math.max(months, 1);
  }

  private getMonthsSpan(transactions: Transaction[]): number {
    if (transactions.length === 0) return 1;
    
    const dates = transactions.map(t => new Date(t.date));
    const earliest = new Date(Math.min(...dates.map(d => d.getTime())));
    const latest = new Date(Math.max(...dates.map(d => d.getTime())));
    
    const monthsDiff = (latest.getFullYear() - earliest.getFullYear()) * 12 + 
                      (latest.getMonth() - earliest.getMonth()) + 1;
    
    return Math.max(monthsDiff, 1);
  }
}

// Export singleton instance
export const aiService = AIService.getInstance();