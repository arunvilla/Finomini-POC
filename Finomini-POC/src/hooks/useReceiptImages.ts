// React hook for receipt image management

import { useState, useCallback, useEffect } from 'react';
import { receiptImageService, ReceiptImage, ImageCompressionOptions } from '../services/storage/ReceiptImageService';

export interface UseReceiptImagesState {
  images: ReceiptImage[];
  isLoading: boolean;
  error: string | null;
  storageStats: {
    totalImages: number;
    totalSize: number;
    compressedSize: number;
    compressionRatio: number;
  } | null;
}

export interface UseReceiptImagesActions {
  storeImage: (file: File, transactionId: string, options?: ImageCompressionOptions) => Promise<ReceiptImage>;
  getImagesForTransaction: (transactionId: string) => Promise<ReceiptImage[]>;
  deleteImage: (id: string) => Promise<void>;
  deleteImagesForTransaction: (transactionId: string) => Promise<void>;
  exportImageAsBase64: (id: string, useCompressed?: boolean) => Promise<string | null>;
  refreshImages: () => Promise<void>;
  refreshStorageStats: () => Promise<void>;
  clearError: () => void;
}

export function useReceiptImages(): UseReceiptImagesState & UseReceiptImagesActions {
  const [state, setState] = useState<UseReceiptImagesState>({
    images: [],
    isLoading: false,
    error: null,
    storageStats: null
  });

  // Load all images on mount
  useEffect(() => {
    refreshImages();
    refreshStorageStats();
  }, []);

  const refreshImages = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const images = await receiptImageService.getAllReceiptImages();
      setState(prev => ({ ...prev, images, isLoading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: (error as Error).message,
        isLoading: false
      }));
    }
  }, []);

  const refreshStorageStats = useCallback(async () => {
    try {
      const stats = await receiptImageService.getStorageStats();
      setState(prev => ({ ...prev, storageStats: stats }));
    } catch (error) {
      console.error('Failed to refresh storage stats:', error);
    }
  }, []);

  const storeImage = useCallback(async (
    file: File, 
    transactionId: string, 
    options?: ImageCompressionOptions
  ): Promise<ReceiptImage> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const receiptImage = await receiptImageService.storeReceiptImage(file, transactionId, options);
      
      setState(prev => ({
        ...prev,
        images: [...prev.images, receiptImage],
        isLoading: false
      }));
      
      // Refresh storage stats
      await refreshStorageStats();
      
      return receiptImage;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: (error as Error).message,
        isLoading: false
      }));
      throw error;
    }
  }, [refreshStorageStats]);

  const getImagesForTransaction = useCallback(async (transactionId: string): Promise<ReceiptImage[]> => {
    try {
      return await receiptImageService.getReceiptImagesForTransaction(transactionId);
    } catch (error) {
      setState(prev => ({ ...prev, error: (error as Error).message }));
      return [];
    }
  }, []);

  const deleteImage = useCallback(async (id: string): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await receiptImageService.deleteReceiptImage(id);
      
      setState(prev => ({
        ...prev,
        images: prev.images.filter(img => img.id !== id),
        isLoading: false
      }));
      
      // Refresh storage stats
      await refreshStorageStats();
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: (error as Error).message,
        isLoading: false
      }));
      throw error;
    }
  }, [refreshStorageStats]);

  const deleteImagesForTransaction = useCallback(async (transactionId: string): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await receiptImageService.deleteReceiptImagesForTransaction(transactionId);
      
      setState(prev => ({
        ...prev,
        images: prev.images.filter(img => img.transactionId !== transactionId),
        isLoading: false
      }));
      
      // Refresh storage stats
      await refreshStorageStats();
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: (error as Error).message,
        isLoading: false
      }));
      throw error;
    }
  }, [refreshStorageStats]);

  const exportImageAsBase64 = useCallback(async (
    id: string, 
    useCompressed: boolean = true
  ): Promise<string | null> => {
    try {
      return await receiptImageService.exportImageAsBase64(id, useCompressed);
    } catch (error) {
      setState(prev => ({ ...prev, error: (error as Error).message }));
      return null;
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    storeImage,
    getImagesForTransaction,
    deleteImage,
    deleteImagesForTransaction,
    exportImageAsBase64,
    refreshImages,
    refreshStorageStats,
    clearError
  };
}