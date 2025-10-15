import { useState, useEffect, useCallback, useRef } from 'react';

interface UseLazyLoadingOptions<T> {
  initialData: T[];
  loadMoreData: (page: number, pageSize: number) => Promise<T[]>;
  pageSize?: number;
  threshold?: number;
}

interface LazyLoadingState<T> {
  data: T[];
  isLoading: boolean;
  hasMore: boolean;
  error: string | null;
  currentPage: number;
}

export function useLazyLoading<T>({
  initialData,
  loadMoreData,
  pageSize = 50,
  threshold = 0.8
}: UseLazyLoadingOptions<T>) {
  const [state, setState] = useState<LazyLoadingState<T>>({
    data: initialData,
    isLoading: false,
    hasMore: true,
    error: null,
    currentPage: 1
  });

  const loadingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !state.hasMore || state.isLoading) {
      return;
    }

    loadingRef.current = true;
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const nextPage = state.currentPage + 1;
      const newData = await loadMoreData(nextPage, pageSize);
      
      setState(prev => ({
        ...prev,
        data: [...prev.data, ...newData],
        currentPage: nextPage,
        hasMore: newData.length === pageSize,
        isLoading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to load more data',
        isLoading: false
      }));
    } finally {
      loadingRef.current = false;
    }
  }, [state.currentPage, state.hasMore, state.isLoading, loadMoreData, pageSize]);

  const checkScrollPosition = useCallback((
    scrollTop: number,
    scrollHeight: number,
    clientHeight: number
  ) => {
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
    
    if (scrollPercentage >= threshold && state.hasMore && !state.isLoading) {
      loadMore();
    }
  }, [threshold, state.hasMore, state.isLoading, loadMore]);

  const reset = useCallback(() => {
    setState({
      data: initialData,
      isLoading: false,
      hasMore: true,
      error: null,
      currentPage: 1
    });
    loadingRef.current = false;
  }, [initialData]);

  // Update data when initialData changes
  useEffect(() => {
    setState(prev => ({
      ...prev,
      data: initialData,
      currentPage: 1,
      hasMore: true
    }));
  }, [initialData]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasMore: state.hasMore,
    error: state.error,
    loadMore,
    checkScrollPosition,
    reset
  };
}

export default useLazyLoading;