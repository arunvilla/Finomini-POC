import { describe, it, expect } from 'vitest';
import { sampleDataForCharts, paginateArray } from '../utils/pagination';

describe('Performance Optimizations', () => {

  describe('Data Sampling Utility', () => {
    it('should sample large datasets correctly', () => {
      const largeData = Array.from({ length: 1000 }, (_, i) => ({ value: i }));
      const sampled = sampleDataForCharts(largeData, 100);

      expect(sampled.length).toBeLessThanOrEqual(100);
      expect(sampled[0]).toEqual({ value: 0 }); // First item should be included
      expect(sampled.length).toBeGreaterThan(10); // Should have reasonable number of samples
    });

    it('should return original data if under limit', () => {
      const smallData = Array.from({ length: 50 }, (_, i) => ({ value: i }));
      const sampled = sampleDataForCharts(smallData, 100);

      expect(sampled).toEqual(smallData);
    });
  });

  describe('Pagination Utility', () => {
    it('should paginate data correctly', () => {
      const data = Array.from({ length: 100 }, (_, i) => ({ id: i }));
      const result = paginateArray(data, {
        page: 1,
        pageSize: 10,
        totalItems: 100
      });

      expect(result.data).toHaveLength(10);
      expect(result.pagination.currentPage).toBe(1);
      expect(result.pagination.totalPages).toBe(10);
      expect(result.pagination.hasNextPage).toBe(true);
      expect(result.pagination.hasPreviousPage).toBe(false);
    });

    it('should handle last page correctly', () => {
      const data = Array.from({ length: 100 }, (_, i) => ({ id: i }));
      const result = paginateArray(data, {
        page: 10,
        pageSize: 10,
        totalItems: 100
      });

      expect(result.data).toHaveLength(10);
      expect(result.pagination.hasNextPage).toBe(false);
      expect(result.pagination.hasPreviousPage).toBe(true);
    });
  });
});