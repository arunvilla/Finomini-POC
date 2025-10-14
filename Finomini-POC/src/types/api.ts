// API-related types and interfaces

// Generic API response wrapper
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
  timestamp: Date;
}

// Pagination interface
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Date range filter
export interface DateRangeFilter {
  start: Date;
  end: Date;
}

// Transaction filters
export interface TransactionFilters {
  dateRange?: DateRangeFilter;
  categories?: string[];
  accounts?: string[];
  amountRange?: {
    min?: number;
    max?: number;
  };
  searchTerm?: string;
  isManual?: boolean;
  isHidden?: boolean;
}

// Sort options
export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

// Request options for API calls
export interface RequestOptions {
  filters?: TransactionFilters;
  sort?: SortOptions;
  pagination?: {
    page: number;
    limit: number;
  };
}