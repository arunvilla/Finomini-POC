import { useState, useEffect, useCallback, useRef } from 'react';

interface UseInfiniteScrollOptions {
  hasNextPage: boolean;
  fetchNextPage: () => Promise<void>;
  threshold?: number;
  rootMargin?: string;
}

export function useInfiniteScroll({
  hasNextPage,
  fetchNextPage,
  threshold = 1.0,
  rootMargin = '0px'
}: UseInfiniteScrollOptions) {
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const handleIntersection = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      if (entry.isIntersecting && hasNextPage && !isFetching) {
        setIsFetching(true);
        try {
          await fetchNextPage();
        } catch (error) {
          console.error('Error fetching next page:', error);
        } finally {
          setIsFetching(false);
        }
      }
    },
    [hasNextPage, fetchNextPage, isFetching]
  );

  useEffect(() => {
    const currentLoadingRef = loadingRef.current;
    
    if (currentLoadingRef) {
      observerRef.current = new IntersectionObserver(handleIntersection, {
        threshold,
        rootMargin
      });
      
      observerRef.current.observe(currentLoadingRef);
    }

    return () => {
      if (observerRef.current && currentLoadingRef) {
        observerRef.current.unobserve(currentLoadingRef);
      }
    };
  }, [handleIntersection, threshold, rootMargin]);

  return {
    loadingRef,
    isFetching
  };
}

export default useInfiniteScroll;