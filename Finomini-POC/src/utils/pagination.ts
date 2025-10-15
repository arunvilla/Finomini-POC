export interface PaginationOptions {
  page: number;
  pageSize: number;
  totalItems: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export function paginateArray<T>(
  items: T[],
  options: PaginationOptions
): PaginatedResult<T> {
  const { page, pageSize, totalItems } = options;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  const data = items.slice(startIndex, endIndex);
  
  return {
    data,
    pagination: {
      currentPage: page,
      pageSize,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    }
  };
}

export function createPaginationState(initialPageSize = 50) {
  return {
    currentPage: 1,
    pageSize: initialPageSize,
    loadedPages: new Set<number>([1])
  };
}

export function getNextPageToLoad(
  currentPage: number,
  loadedPages: Set<number>,
  totalPages: number
): number | null {
  const nextPage = currentPage + 1;
  
  if (nextPage <= totalPages && !loadedPages.has(nextPage)) {
    return nextPage;
  }
  
  return null;
}

// Utility for lazy loading historical data
export function shouldLoadHistoricalData(
  scrollPosition: number,
  containerHeight: number,
  contentHeight: number,
  threshold = 0.8
): boolean {
  const scrollPercentage = (scrollPosition + containerHeight) / contentHeight;
  return scrollPercentage >= threshold;
}

// Utility for data sampling for large datasets
export function sampleDataForCharts<T>(
  data: T[],
  maxPoints = 100,
  _keyExtractor?: (item: T) => number | Date
): T[] {
  if (data.length <= maxPoints) {
    return data;
  }

  const step = Math.ceil(data.length / maxPoints);
  const sampled: T[] = [];
  
  for (let i = 0; i < data.length; i += step) {
    sampled.push(data[i]);
  }
  
  // Always include the last item if it wasn't included and we have room
  if (sampled[sampled.length - 1] !== data[data.length - 1] && sampled.length < maxPoints) {
    sampled.push(data[data.length - 1]);
  }
  
  return sampled;
}

export default {
  paginateArray,
  createPaginationState,
  getNextPageToLoad,
  shouldLoadHistoricalData,
  sampleDataForCharts
};