// React hook for AI service functionality

import { useState, useCallback, useEffect } from 'react';
import { aiService } from '../services/ai/AIService';
import { Transaction, Budget, AIInsight } from '../types';

export interface UseAIState {
  isInitialized: boolean;
  isProcessing: boolean;
  error: string | null;
  hasAPIKey: boolean;
}

export interface UseAIActions {
  categorizeTransaction: (
    description: string, 
    amount: number, 
    plaidCategory?: string
  ) => Promise<{ category: string; confidence: number }>;
  generateInsights: (transactions: Transaction[]) => Promise<AIInsight[]>;
  predictSpending: (
    transactions: Transaction[], 
    category?: string
  ) => Promise<{ amount: number; confidence: number }>;
  analyzeBudgetGoal: (
    budget: Budget, 
    transactions: Transaction[]
  ) => Promise<{ achievable: boolean; recommendation: string }>;
  initialize: () => Promise<void>;
  clearError: () => void;
}

export function useAI(): UseAIState & UseAIActions {
  const [state, setState] = useState<UseAIState>({
    isInitialized: false,
    isProcessing: false,
    error: null,
    hasAPIKey: false
  });

  // Initialize AI service on mount
  useEffect(() => {
    const initializeAI = async () => {
      try {
        await aiService.initialize();
        const status = aiService.getStatus();
        setState(prev => ({
          ...prev,
          isInitialized: status.isInitialized,
          hasAPIKey: status.hasAPIKey
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: `Failed to initialize AI service: ${(error as Error).message}`,
          isInitialized: false
        }));
      }
    };

    initializeAI();
  }, []);

  const initialize = useCallback(async () => {
    setState(prev => ({ ...prev, isProcessing: true, error: null }));
    
    try {
      await aiService.initialize();
      const status = aiService.getStatus();
      setState(prev => ({
        ...prev,
        isInitialized: status.isInitialized,
        hasAPIKey: status.hasAPIKey,
        isProcessing: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: `Failed to initialize AI service: ${(error as Error).message}`,
        isInitialized: false,
        isProcessing: false
      }));
      throw error;
    }
  }, []);

  const categorizeTransaction = useCallback(async (
    description: string,
    amount: number,
    plaidCategory?: string
  ) => {
    setState(prev => ({ ...prev, isProcessing: true, error: null }));
    
    try {
      const result = await aiService.categorizeTransaction(description, amount, plaidCategory);
      setState(prev => ({ ...prev, isProcessing: false }));
      return result;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: `Categorization failed: ${(error as Error).message}`,
        isProcessing: false
      }));
      throw error;
    }
  }, []);

  const generateInsights = useCallback(async (transactions: Transaction[]) => {
    setState(prev => ({ ...prev, isProcessing: true, error: null }));
    
    try {
      const insights = await aiService.generateInsights(transactions);
      setState(prev => ({ ...prev, isProcessing: false }));
      return insights;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: `Insights generation failed: ${(error as Error).message}`,
        isProcessing: false
      }));
      throw error;
    }
  }, []);

  const predictSpending = useCallback(async (
    transactions: Transaction[],
    category?: string
  ) => {
    setState(prev => ({ ...prev, isProcessing: true, error: null }));
    
    try {
      const prediction = await aiService.predictSpending(transactions, category);
      setState(prev => ({ ...prev, isProcessing: false }));
      return prediction;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: `Spending prediction failed: ${(error as Error).message}`,
        isProcessing: false
      }));
      throw error;
    }
  }, []);

  const analyzeBudgetGoal = useCallback(async (
    budget: Budget,
    transactions: Transaction[]
  ) => {
    setState(prev => ({ ...prev, isProcessing: true, error: null }));
    
    try {
      const analysis = await aiService.analyzeBudgetGoal(budget, transactions);
      setState(prev => ({ ...prev, isProcessing: false }));
      return analysis;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: `Budget analysis failed: ${(error as Error).message}`,
        isProcessing: false
      }));
      throw error;
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    categorizeTransaction,
    generateInsights,
    predictSpending,
    analyzeBudgetGoal,
    initialize,
    clearError
  };
}