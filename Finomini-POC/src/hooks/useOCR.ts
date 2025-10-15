// React hook for OCR functionality

import { useState, useCallback, useRef, useEffect } from 'react';
import { ocrService } from '../services/ocr';

export interface UseOCRState {
  isProcessing: boolean;
  isInitialized: boolean;
  progress: number;
  error: string | null;
  result: {
    merchant?: string;
    amount?: number;
    date?: Date;
    items?: Array<{name: string, amount: number}>;
    confidence: number;
  } | null;
}

export interface UseOCRActions {
  processReceipt: (file: File) => Promise<{
    merchant?: string;
    amount?: number;
    date?: Date;
    items?: Array<{name: string, amount: number}>;
    confidence: number;
  }>;
  processReceiptBatch: (files: File[]) => Promise<Array<{
    merchant?: string;
    amount?: number;
    date?: Date;
    items?: Array<{name: string, amount: number}>;
    confidence: number;
  }>>;
  initialize: () => Promise<void>;
  cleanup: () => Promise<void>;
  clearResult: () => void;
  clearError: () => void;
}

export function useOCR(): UseOCRState & UseOCRActions {
  const [state, setState] = useState<UseOCRState>({
    isProcessing: false,
    isInitialized: false,
    progress: 0,
    error: null,
    result: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  // Initialize OCR service on mount
  useEffect(() => {
    const initializeOCR = async () => {
      try {
        await ocrService.initialize();
        setState(prev => ({ ...prev, isInitialized: true }));
      } catch (error) {
        setState(prev => ({ 
          ...prev, 
          error: `Failed to initialize OCR: ${(error as Error).message}`,
          isInitialized: false 
        }));
      }
    };

    initializeOCR();

    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const initialize = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, error: null }));
      await ocrService.initialize();
      setState(prev => ({ ...prev, isInitialized: true }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: `Failed to initialize OCR: ${(error as Error).message}`,
        isInitialized: false 
      }));
      throw error;
    }
  }, []);

  const processReceipt = useCallback(async (file: File) => {
    // Cancel any ongoing processing
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setState(prev => ({
      ...prev,
      isProcessing: true,
      progress: 0,
      error: null,
      result: null
    }));

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setState(prev => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90)
        }));
      }, 200);

      const result = await ocrService.processReceipt(file);

      clearInterval(progressInterval);

      setState(prev => ({
        ...prev,
        isProcessing: false,
        progress: 100,
        result,
        error: null
      }));

      return result;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isProcessing: false,
        progress: 0,
        error: (error as Error).message
      }));
      throw error;
    }
  }, []);

  const processReceiptBatch = useCallback(async (files: File[]) => {
    setState(prev => ({
      ...prev,
      isProcessing: true,
      progress: 0,
      error: null,
      result: null
    }));

    try {
      const results = await ocrService.processReceiptBatch(files);
      
      setState(prev => ({
        ...prev,
        isProcessing: false,
        progress: 100,
        error: null
      }));

      return results;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isProcessing: false,
        progress: 0,
        error: (error as Error).message
      }));
      throw error;
    }
  }, []);

  const cleanup = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    await ocrService.cleanup();
    setState(prev => ({ ...prev, isInitialized: false }));
  }, []);

  const clearResult = useCallback(() => {
    setState(prev => ({ ...prev, result: null }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    processReceipt,
    processReceiptBatch,
    initialize,
    cleanup,
    clearResult,
    clearError,
  };
}