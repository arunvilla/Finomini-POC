// AI Categorization Feedback Service for learning and improvement

import { AICategoryFeedback, LearningAnalytics, CategorySuggestion } from '../../types';
import { storageService } from '../storage';

export class FeedbackService {
  private static instance: FeedbackService;
  private feedbackData: AICategoryFeedback[] = [];
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): FeedbackService {
    if (!FeedbackService.instance) {
      FeedbackService.instance = new FeedbackService();
    }
    return FeedbackService.instance;
  }

  /**
   * Initialize the feedback service
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      this.feedbackData = await storageService.getAIFeedback();
      this.isInitialized = true;
      console.log('Feedback Service initialized with', this.feedbackData.length, 'feedback entries');
    } catch (error) {
      console.warn('Failed to initialize feedback service:', error);
      this.feedbackData = [];
      this.isInitialized = true;
    }
  }

  /**
   * Record user feedback on AI categorization
   */
  async recordFeedback(feedback: Omit<AICategoryFeedback, 'id' | 'created_at'>): Promise<void> {
    await this.initialize();

    const feedbackEntry: AICategoryFeedback = {
      ...feedback,
      id: crypto.randomUUID(),
      created_at: new Date()
    };

    this.feedbackData.push(feedbackEntry);
    await storageService.saveAIFeedback(this.feedbackData);

    console.log('AI feedback recorded:', feedbackEntry);
  }

  /**
   * Get improved category suggestion based on learning
   */
  async getImprovedSuggestion(
    description: string,
    merchant?: string,
    amount?: number,
    plaidCategory?: string
  ): Promise<CategorySuggestion> {
    await this.initialize();

    // Check for exact merchant matches first
    if (merchant) {
      const merchantFeedback = this.getMerchantPattern(merchant);
      if (merchantFeedback && merchantFeedback.confidence > 0.8) {
        return {
          category: merchantFeedback.category,
          confidence: merchantFeedback.confidence,
          reasoning: `Based on ${merchantFeedback.feedback_count} previous transactions with ${merchant}`,
          source: 'history'
        };
      }
    }

    // Check for similar descriptions
    const descriptionPattern = this.getDescriptionPattern(description);
    if (descriptionPattern && descriptionPattern.confidence > 0.7) {
      return {
        category: descriptionPattern.category,
        confidence: descriptionPattern.confidence,
        reasoning: `Based on similar transaction descriptions`,
        source: 'history'
      };
    }

    // Fallback to basic categorization with learning adjustments
    const basicSuggestion = this.getBasicCategorization(description, merchant, amount, plaidCategory);
    
    // Adjust confidence based on historical accuracy for this category
    const categoryAccuracy = this.getCategoryAccuracy(basicSuggestion.category);
    const adjustedConfidence = basicSuggestion.confidence * categoryAccuracy;

    return {
      ...basicSuggestion,
      confidence: Math.min(adjustedConfidence, 0.95), // Cap at 95%
      source: 'ai'
    };
  }

  /**
   * Get merchant categorization pattern from feedback
   */
  private getMerchantPattern(merchant: string): { category: string; confidence: number; feedback_count: number } | null {
    const merchantFeedback = this.feedbackData.filter(f => 
      f.merchant?.toLowerCase() === merchant.toLowerCase() && 
      f.feedback_type === 'accepted'
    );

    if (merchantFeedback.length === 0) return null;

    // Find most common category for this merchant
    const categoryCount: Record<string, number> = {};
    merchantFeedback.forEach(f => {
      categoryCount[f.user_selected_category] = (categoryCount[f.user_selected_category] || 0) + 1;
    });

    const mostCommonCategory = Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)[0];

    if (!mostCommonCategory) return null;

    const confidence = mostCommonCategory[1] / merchantFeedback.length;
    
    return {
      category: mostCommonCategory[0],
      confidence: Math.min(confidence + 0.1, 0.95), // Boost confidence slightly
      feedback_count: merchantFeedback.length
    };
  }

  /**
   * Get description pattern from feedback
   */
  private getDescriptionPattern(description: string): { category: string; confidence: number } | null {
    const descWords = description.toLowerCase().split(/\s+/);
    const matchingFeedback: Array<{ feedback: AICategoryFeedback; score: number }> = [];

    this.feedbackData
      .filter(f => f.feedback_type === 'accepted' && f.description)
      .forEach(feedback => {
        const feedbackWords = feedback.description!.toLowerCase().split(/\s+/);
        const commonWords = descWords.filter(word => 
          word.length > 2 && feedbackWords.includes(word)
        );
        
        if (commonWords.length > 0) {
          const score = commonWords.length / Math.max(descWords.length, feedbackWords.length);
          if (score > 0.3) { // At least 30% word overlap
            matchingFeedback.push({ feedback, score });
          }
        }
      });

    if (matchingFeedback.length === 0) return null;

    // Sort by similarity score
    matchingFeedback.sort((a, b) => b.score - a.score);
    
    // Use the most similar transaction's category
    const bestMatch = matchingFeedback[0];
    return {
      category: bestMatch.feedback.user_selected_category,
      confidence: Math.min(bestMatch.score + 0.2, 0.85) // Boost confidence but cap it
    };
  }

  /**
   * Get basic categorization (fallback)
   */
  private getBasicCategorization(
    description: string,
    merchant?: string,
    amount?: number,
    plaidCategory?: string
  ): CategorySuggestion {
    const desc = description.toLowerCase();
    const merchantLower = merchant?.toLowerCase() || '';
    
    // Use Plaid category if available
    if (plaidCategory) {
      const plaidLower = plaidCategory.toLowerCase();
      if (plaidLower.includes('food') || plaidLower.includes('restaurant')) {
        return { category: 'Dining Out', confidence: 0.8, source: 'ai' };
      } else if (plaidLower.includes('grocery')) {
        return { category: 'Groceries', confidence: 0.8, source: 'ai' };
      } else if (plaidLower.includes('gas') || plaidLower.includes('fuel')) {
        return { category: 'Gas', confidence: 0.8, source: 'ai' };
      } else if (plaidLower.includes('transport')) {
        return { category: 'Transportation', confidence: 0.8, source: 'ai' };
      }
    }

    // Description-based categorization
    if (desc.includes('grocery') || desc.includes('market') || merchantLower.includes('whole foods')) {
      return { category: 'Groceries', confidence: 0.7, source: 'ai' };
    } else if (desc.includes('restaurant') || desc.includes('cafe') || merchantLower.includes('starbucks')) {
      return { category: 'Dining Out', confidence: 0.7, source: 'ai' };
    } else if (desc.includes('gas') || merchantLower.includes('shell') || merchantLower.includes('exxon')) {
      return { category: 'Gas', confidence: 0.7, source: 'ai' };
    } else if (desc.includes('uber') || desc.includes('lyft') || desc.includes('taxi')) {
      return { category: 'Transportation', confidence: 0.7, source: 'ai' };
    } else if (merchantLower.includes('target') || merchantLower.includes('walmart') || merchantLower.includes('amazon')) {
      return { category: 'Shopping', confidence: 0.7, source: 'ai' };
    } else if (amount && amount < 0) {
      return { category: 'Income', confidence: 0.6, source: 'ai' };
    }

    return { category: 'Other', confidence: 0.5, source: 'ai' };
  }

  /**
   * Get category accuracy from historical feedback
   */
  private getCategoryAccuracy(category: string): number {
    const categoryFeedback = this.feedbackData.filter(f => 
      f.suggested_category === category
    );

    if (categoryFeedback.length === 0) return 1.0; // No data, assume perfect

    const correctFeedback = categoryFeedback.filter(f => 
      f.feedback_type === 'accepted' || f.user_selected_category === f.suggested_category
    );

    return correctFeedback.length / categoryFeedback.length;
  }

  /**
   * Get learning analytics
   */
  async getLearningAnalytics(): Promise<LearningAnalytics> {
    await this.initialize();

    const totalSuggestions = this.feedbackData.length;
    const acceptedSuggestions = this.feedbackData.filter(f => f.feedback_type === 'accepted').length;
    const rejectedSuggestions = this.feedbackData.filter(f => f.feedback_type === 'rejected').length;
    const correctedSuggestions = this.feedbackData.filter(f => f.feedback_type === 'corrected').length;

    const accuracyRate = totalSuggestions > 0 ? acceptedSuggestions / totalSuggestions : 0;

    // Category-specific accuracy
    const categoryAccuracy: Record<string, { total: number; correct: number; accuracy: number }> = {};
    
    this.feedbackData.forEach(feedback => {
      const category = feedback.suggested_category;
      if (!categoryAccuracy[category]) {
        categoryAccuracy[category] = { total: 0, correct: 0, accuracy: 0 };
      }
      
      categoryAccuracy[category].total++;
      if (feedback.feedback_type === 'accepted') {
        categoryAccuracy[category].correct++;
      }
    });

    // Calculate accuracy rates
    Object.keys(categoryAccuracy).forEach(category => {
      const data = categoryAccuracy[category];
      data.accuracy = data.total > 0 ? data.correct / data.total : 0;
    });

    // Merchant patterns
    const merchantPatterns: Record<string, { category: string; confidence: number; feedback_count: number }> = {};
    
    this.feedbackData
      .filter(f => f.merchant && f.feedback_type === 'accepted')
      .forEach(feedback => {
        const merchant = feedback.merchant!;
        if (!merchantPatterns[merchant]) {
          const pattern = this.getMerchantPattern(merchant);
          if (pattern) {
            merchantPatterns[merchant] = pattern;
          }
        }
      });

    return {
      total_suggestions: totalSuggestions,
      accepted_suggestions: acceptedSuggestions,
      rejected_suggestions: rejectedSuggestions,
      corrected_suggestions: correctedSuggestions,
      accuracy_rate: accuracyRate,
      category_accuracy: categoryAccuracy,
      merchant_patterns: merchantPatterns
    };
  }

  /**
   * Get transactions that need categorization review
   */
  async getTransactionsForReview(): Promise<any[]> {
    // This would typically fetch from the transaction store
    // For now, return empty array as this will be implemented in the UI components
    return [];
  }

  /**
   * Clear all feedback data (for testing/reset)
   */
  async clearFeedback(): Promise<void> {
    this.feedbackData = [];
    await storageService.saveAIFeedback([]);
    console.log('AI feedback data cleared');
  }

  /**
   * Export feedback data for analysis
   */
  async exportFeedback(): Promise<AICategoryFeedback[]> {
    await this.initialize();
    return [...this.feedbackData];
  }
}

export const feedbackService = FeedbackService.getInstance();