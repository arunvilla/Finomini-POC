# AI Testing Guide

## Comprehensive Testing Strategy for AI Services

This guide covers testing procedures for AI services in the AI Finance Manager, including unit tests, integration tests, and validation procedures.

## Testing Overview

The AI testing strategy covers:
- ✅ **Service Integration Testing** - AI service connectivity and configuration
- ✅ **Categorization Accuracy Testing** - Transaction classification validation
- ✅ **Fallback Mechanism Testing** - Provider switching and error handling
- ✅ **Performance Testing** - Response times and rate limiting
- ✅ **Cost Optimization Testing** - Token usage and efficiency

## Test Categories

### 1. Unit Tests

#### AI Service Initialization
```typescript
describe('AIService Initialization', () => {
  it('should initialize with environment variables', async () => {
    const service = AIService.getInstance();
    await service.initialize();
    
    const status = service.getStatus();
    expect(status.isInitialized).toBe(true);
  });

  it('should handle missing API keys gracefully', async () => {
    // Test with no API keys configured
    const service = new AIService();
    await service.initialize();
    
    const status = service.getStatus();
    expect(status.preferredProvider).toBe('local');
  });
});
```

#### Transaction Categorization
```typescript
describe('Transaction Categorization', () => {
  it('should categorize grocery transactions correctly', async () => {
    const result = await aiService.categorizeTransaction(
      'WALMART SUPERCENTER #1234',
      45.67
    );
    
    expect(result.category).toBe('Groceries');
    expect(result.confidence).toBeGreaterThan(0.8);
  });

  it('should handle restaurant transactions', async () => {
    const result = await aiService.categorizeTransaction(
      'STARBUCKS COFFEE #5678',
      5.45
    );
    
    expect(result.category).toBe('Dining Out');
    expect(result.confidence).toBeGreaterThan(0.8);
  });
});
```

### 2. Integration Tests

#### Multi-Provider Testing
```typescript
describe('Multi-Provider Integration', () => {
  it('should switch between OpenAI and Anthropic', async () => {
    // Test OpenAI
    aiService.setPreferredProvider('openai');
    const openaiResult = await aiService.categorizeTransaction('TEST STORE', 10);
    
    // Test Anthropic
    aiService.setPreferredProvider('anthropic');
    const anthropicResult = await aiService.categorizeTransaction('TEST STORE', 10);
    
    expect(openaiResult.category).toBeDefined();
    expect(anthropicResult.category).toBeDefined();
  });

  it('should fallback gracefully when primary provider fails', async () => {
    // Mock primary provider failure
    const mockFailure = vi.spyOn(aiService, 'makeOpenAIRequest')
      .mockRejectedValue(new Error('API Error'));
    
    const result = await aiService.categorizeTransaction('TEST STORE', 10);
    
    // Should still get a result from fallback
    expect(result.category).toBeDefined();
    mockFailure.mockRestore();
  });
});
```

#### OCR-AI Integration
```typescript
describe('OCR-AI Integration', () => {
  it('should enhance OCR results with AI categorization', async () => {
    const mockFile = new File(['test'], 'receipt.png', { type: 'image/png' });
    
    // Mock OCR result
    const ocrResult = {
      merchant: 'WALMART SUPERCENTER',
      amount: 45.67,
      confidence: 0.9
    };
    
    // Test AI enhancement
    const enhanced = await aiService.enhanceReceiptData(ocrResult);
    
    expect(enhanced.category).toBeDefined();
    expect(enhanced.confidence).toBeGreaterThan(0.8);
  });
});
```

### 3. Performance Tests

#### Response Time Testing
```typescript
describe('Performance Testing', () => {
  it('should categorize transactions within acceptable time limits', async () => {
    const startTime = Date.now();
    
    const result = await aiService.categorizeTransaction(
      'STARBUCKS COFFEE',
      5.45
    );
    
    const responseTime = Date.now() - startTime;
    
    expect(responseTime).toBeLessThan(5000); // 5 seconds max
    expect(result.category).toBeDefined();
  });

  it('should handle concurrent requests efficiently', async () => {
    const requests = Array.from({ length: 5 }, (_, i) =>
      aiService.categorizeTransaction(`STORE ${i}`, 10 + i)
    );
    
    const startTime = Date.now();
    const results = await Promise.all(requests);
    const totalTime = Date.now() - startTime;
    
    expect(results).toHaveLength(5);
    expect(totalTime).toBeLessThan(10000); // 10 seconds for 5 requests
    results.forEach(result => {
      expect(result.category).toBeDefined();
    });
  });
});
```

#### Rate Limiting Tests
```typescript
describe('Rate Limiting', () => {
  it('should respect rate limits', async () => {
    const requests = [];
    const startTime = Date.now();
    
    // Make multiple rapid requests
    for (let i = 0; i < 3; i++) {
      requests.push(aiService.categorizeTransaction(`STORE ${i}`, 10));
    }
    
    await Promise.all(requests);
    const totalTime = Date.now() - startTime;
    
    // Should take at least 2 seconds due to rate limiting (1 sec between requests)
    expect(totalTime).toBeGreaterThan(2000);
  });
});
```

### 4. Error Handling Tests

#### API Failure Scenarios
```typescript
describe('Error Handling', () => {
  it('should handle invalid API keys', async () => {
    aiService.updateConfig({
      openaiApiKey: 'invalid-key',
      anthropicApiKey: 'invalid-key'
    });
    
    // Should fallback to local processing
    const result = await aiService.categorizeTransaction('TEST STORE', 10);
    expect(result.category).toBeDefined();
    expect(result.confidence).toBeGreaterThan(0);
  });

  it('should handle network timeouts', async () => {
    // Mock network timeout
    const mockTimeout = vi.spyOn(global, 'fetch')
      .mockRejectedValue(new Error('Network timeout'));
    
    const result = await aiService.categorizeTransaction('TEST STORE', 10);
    
    // Should fallback gracefully
    expect(result.category).toBeDefined();
    mockTimeout.mockRestore();
  });

  it('should handle malformed responses', async () => {
    // Mock malformed API response
    const mockResponse = vi.spyOn(global, 'fetch')
      .mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ invalid: 'response' })
      } as Response);
    
    const result = await aiService.categorizeTransaction('TEST STORE', 10);
    
    // Should handle gracefully
    expect(result.category).toBeDefined();
    mockResponse.mockRestore();
  });
});
```

### 5. Accuracy Validation Tests

#### Categorization Accuracy
```typescript
describe('Categorization Accuracy', () => {
  const testCases = [
    { merchant: 'WALMART SUPERCENTER', amount: 45.67, expected: 'Groceries' },
    { merchant: 'STARBUCKS COFFEE', amount: 5.45, expected: 'Dining Out' },
    { merchant: 'SHELL GAS STATION', amount: 35.00, expected: 'Gas' },
    { merchant: 'TARGET STORE', amount: 89.99, expected: 'Shopping' },
    { merchant: 'UBER RIDE', amount: 12.50, expected: 'Transportation' }
  ];

  testCases.forEach(({ merchant, amount, expected }) => {
    it(`should categorize ${merchant} as ${expected}`, async () => {
      const result = await aiService.categorizeTransaction(merchant, amount);
      
      expect(result.category).toBe(expected);
      expect(result.confidence).toBeGreaterThan(0.7);
    });
  });
});
```

#### Confidence Score Validation
```typescript
describe('Confidence Scoring', () => {
  it('should provide high confidence for clear merchants', async () => {
    const clearMerchants = [
      'WALMART SUPERCENTER',
      'STARBUCKS COFFEE',
      'MCDONALDS'
    ];
    
    for (const merchant of clearMerchants) {
      const result = await aiService.categorizeTransaction(merchant, 10);
      expect(result.confidence).toBeGreaterThan(0.8);
    }
  });

  it('should provide lower confidence for ambiguous merchants', async () => {
    const ambiguousMerchants = [
      'UNKNOWN STORE',
      'ABC123',
      'PAYMENT'
    ];
    
    for (const merchant of ambiguousMerchants) {
      const result = await aiService.categorizeTransaction(merchant, 10);
      expect(result.confidence).toBeLessThan(0.8);
    }
  });
});
```

## Manual Testing Procedures

### 1. Configuration Testing

#### Test API Key Setup
```bash
# Test environment variable configuration
echo $VITE_OPENAI_API_KEY
echo $VITE_ANTHROPIC_API_KEY

# Test UI configuration
# 1. Open AI Configuration screen
# 2. Enter test API keys
# 3. Click "Test Connection"
# 4. Verify successful connection
```

#### Test Provider Switching
```typescript
// Test switching between providers
aiService.setPreferredProvider('openai');
// Verify OpenAI is used

aiService.setPreferredProvider('anthropic');
// Verify Anthropic is used

aiService.setPreferredProvider('local');
// Verify local processing is used
```

### 2. Accuracy Testing

#### Real-World Transaction Testing
```typescript
// Test with real transaction data
const realTransactions = [
  { description: 'WALMART SUPERCENTER #1234', amount: 67.89 },
  { description: 'STARBUCKS STORE #5678', amount: 4.95 },
  { description: 'SHELL OIL #9012', amount: 45.00 },
  { description: 'AMAZON.COM PURCHASE', amount: 29.99 }
];

for (const transaction of realTransactions) {
  const result = await aiService.categorizeTransaction(
    transaction.description,
    transaction.amount
  );
  
  console.log(`${transaction.description} → ${result.category} (${result.confidence})`);
}
```

#### Edge Case Testing
```typescript
// Test edge cases
const edgeCases = [
  { description: '', amount: 0 }, // Empty description
  { description: 'UNKNOWN', amount: -10 }, // Negative amount
  { description: 'A'.repeat(1000), amount: 999999 }, // Very long description
  { description: '!@#$%^&*()', amount: 0.01 } // Special characters
];

for (const testCase of edgeCases) {
  try {
    const result = await aiService.categorizeTransaction(
      testCase.description,
      testCase.amount
    );
    console.log(`Edge case handled: ${result.category}`);
  } catch (error) {
    console.log(`Edge case error: ${error.message}`);
  }
}
```

### 3. Performance Testing

#### Load Testing
```typescript
// Test with high volume
async function loadTest() {
  const batchSize = 10;
  const batches = 5;
  
  for (let batch = 0; batch < batches; batch++) {
    const requests = Array.from({ length: batchSize }, (_, i) =>
      aiService.categorizeTransaction(`STORE ${batch}-${i}`, 10 + i)
    );
    
    const startTime = Date.now();
    const results = await Promise.all(requests);
    const batchTime = Date.now() - startTime;
    
    console.log(`Batch ${batch}: ${batchTime}ms for ${batchSize} requests`);
    console.log(`Success rate: ${results.filter(r => r.category).length}/${batchSize}`);
  }
}
```

#### Memory Usage Testing
```typescript
// Monitor memory usage during processing
function monitorMemory() {
  if (performance.memory) {
    const memory = performance.memory;
    console.log({
      used: Math.round(memory.usedJSHeapSize / 1024 / 1024) + ' MB',
      total: Math.round(memory.totalJSHeapSize / 1024 / 1024) + ' MB',
      limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) + ' MB'
    });
  }
}

// Test memory usage
setInterval(monitorMemory, 5000);
```

## Test Data and Fixtures

### Sample Transaction Data
```typescript
export const sampleTransactions = [
  // Grocery stores
  { merchant: 'WALMART SUPERCENTER #1234', amount: 67.89, category: 'Groceries' },
  { merchant: 'TARGET STORE #5678', amount: 45.23, category: 'Groceries' },
  { merchant: 'WHOLE FOODS MARKET', amount: 89.45, category: 'Groceries' },
  
  // Restaurants
  { merchant: 'STARBUCKS COFFEE #9012', amount: 5.45, category: 'Dining Out' },
  { merchant: 'MCDONALDS #3456', amount: 8.99, category: 'Dining Out' },
  { merchant: 'CHIPOTLE MEXICAN GRILL', amount: 12.50, category: 'Dining Out' },
  
  // Gas stations
  { merchant: 'SHELL OIL #7890', amount: 45.00, category: 'Gas' },
  { merchant: 'EXXON MOBIL', amount: 52.30, category: 'Gas' },
  { merchant: 'CHEVRON STATION', amount: 38.75, category: 'Gas' },
  
  // Transportation
  { merchant: 'UBER TRIP', amount: 15.25, category: 'Transportation' },
  { merchant: 'LYFT RIDE', amount: 12.80, category: 'Transportation' },
  { merchant: 'METRO TRANSIT', amount: 2.50, category: 'Transportation' }
];
```

### Mock API Responses
```typescript
export const mockOpenAIResponse = {
  choices: [{
    message: {
      content: 'Category: Groceries, Confidence: 95'
    }
  }]
};

export const mockAnthropicResponse = {
  content: [{
    text: 'Category: Dining Out, Confidence: 92'
  }]
};
```

## Continuous Testing

### Automated Test Execution
```bash
# Run all AI tests
npm test src/services/ai/

# Run specific test suites
npm test -- --grep "categorization"
npm test -- --grep "performance"
npm test -- --grep "error handling"

# Run tests with coverage
npm test -- --coverage
```

### Test Monitoring
```typescript
// Monitor test results over time
const testResults = {
  timestamp: new Date(),
  accuracy: calculateAccuracy(),
  performance: measurePerformance(),
  errorRate: calculateErrorRate()
};

// Log results for analysis
console.log('Test Results:', testResults);
```

## Quality Assurance Checklist

### Pre-Release Testing
- ✅ All unit tests passing
- ✅ Integration tests successful
- ✅ Performance benchmarks met
- ✅ Error handling validated
- ✅ Accuracy targets achieved
- ✅ Cost optimization verified
- ✅ Security measures tested

### Production Monitoring
- ✅ API usage tracking
- ✅ Error rate monitoring
- ✅ Performance metrics
- ✅ Cost analysis
- ✅ User feedback collection

---

**🧪 Testing Complete!** This comprehensive testing strategy ensures the AI services are reliable, accurate, and performant across all use cases and scenarios.