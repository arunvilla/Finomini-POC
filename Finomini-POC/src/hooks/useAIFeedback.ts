// Hook for AI categorization feedback and learning

import { useState, useCallback } from 'react';
import { feedbackService } from '../services/ai/FeedbackService';
import { AICategoryFeedback, LearningAnalytics, CategorySuggestion } from '../types';
import { toast } from 'sonner';

export interface UseAIFeedbackReturn {
  // Feedback recording
  recordFeedback: (feedback: Omit<AICategoryFeedback, 'id' | 'created_at'>) => Promise<void>;
  
  // Category suggestions
  getImprovedSuggestion: (
    description: string,
    merchant?: string,
    amount?: number,
    plaidCategory?: string
  ) => Promise<CategorySuggestion>;
  
  // Analytics
  getLearningAnalytics: () => Promise<LearningAnalytics>;
  
  // State
  isProcessing: boolean;
  error: string | null;
  
  // Utility functions
  clearError: () => void;
}

export function useAIFeedback(): UseAIFeedbackReturn {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const recordFeedback = useCallback(async (
    feedback: Omit<AICategoryFeedback, 'id' | 'created_at'>
  ) => {
    setIsProcessing(true);
    setError(null);

    try {
      await feedbackService.recordFeedback(feedback);
      
      // Show appropriate toast based on feedback type
      switch (feedback.feedback_type) {
        case 'accepted':
          toast.success('Thanks! AI will learn from this categorization.');
          break;
        case 'corrected':
          toast.success('Category corrected. AI will improve future suggestions.');
          break;
        case 'rejected':
          toast.info('Feedback recorded. AI will avoid this suggestion.');
          break;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to record feedback';
      setError(errorMessage);
      toast.error('Failed to record feedback: ' + errorMessage);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const getImprovedSuggestion = useCallback(async (
    description: string,
    merchant?: string,
    amount?: number,
    plaidCategory?: string
  ): Promise<CategorySuggestion> => {
    setIsProcessing(true);
    setError(null);

    try {
      const suggestion = await feedbackService.getImprovedSuggestion(
        description,
        merchant,
        amount,
        plaidCategory
      );
      return suggestion;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get suggestion';
      setError(errorMessage);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const getLearningAnalytics = useCallback(async (): Promise<LearningAnalytics> => {
    setIsProcessing(true);
    setError(null);

    try {
      const analytics = await feedbackService.getLearningAnalytics();
      return analytics;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get analytics';
      setError(errorMessage);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    recordFeedback,
    getImprovedSuggestion,
    getLearningAnalytics,
    isProcessing,
    error,
    clearError
  };
}

// Convenience functions for common feedback scenarios
export const useQuickFeedback = () => {
  const { recordFeedback } = useAIFeedback();

  const acceptSuggestion = useCallback(async (
    transactionId: string,
    suggestedCategory: string,
    confidence: number,
    merchant?: string,
    amount?: number,
    description?: string
  ) => {
    await recordFeedback({
      transaction_id: transactionId,
      suggested_category: suggestedCategory,
      suggested_confidence: confidence,
      user_selected_category: suggestedCategory,
      feedback_type: 'accepted',
      merchant,
      amount,
      description
    });
  }, [recordFeedback]);

  const correctSuggestion = useCallback(async (
    transactionId: string,
    suggestedCategory: string,
    confidence: number,
    userSelectedCategory: string,
    reasoning?: string,
    merchant?: string,
    amount?: number,
    description?: string
  ) => {
    await recordFeedback({
      transaction_id: transactionId,
      suggested_category: suggestedCategory,
      suggested_confidence: confidence,
      user_selected_category: userSelectedCategory,
      feedback_type: 'corrected',
      reasoning,
      merchant,
      amount,
      description
    });
  }, [recordFeedback]);

  const rejectSuggestion = useCallback(async (
    transactionId: string,
    suggestedCategory: string,
    confidence: number,
    userSelectedCategory: string,
    reasoning?: string,
    merchant?: string,
    amount?: number,
    description?: string
  ) => {
    await recordFeedback({
      transaction_id: transactionId,
      suggested_category: suggestedCategory,
      suggested_confidence: confidence,
      user_selected_category: userSelectedCategory,
      feedback_type: 'rejected',
      reasoning,
      merchant,
      amount,
      description
    });
  }, [recordFeedback]);

  return {
    acceptSuggestion,
    correctSuggestion,
    rejectSuggestion
  };
};