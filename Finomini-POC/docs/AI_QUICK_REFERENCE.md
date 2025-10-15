# AI Service Quick Reference

## Quick Start

### 1. Basic Setup

```typescript
import { AIService } from '../services/ai/AIService';
import { useAIFeedback } from '../hooks/useAIFeedback';

// Initialize AI service
const aiService = AIService.getInstance();
await aiService.initialize();

// Use in React component
const { getImprovedSuggestion, recordFeedback } = useAIFeedback();
```

### 2. Categorize Transaction

```typescript
// Get AI suggestion
const result = await aiService.categorizeTransaction(
  "Starbucks Coffee",  // description
  15.50,              // amount
  "food_and_drink",   // plaidCategory (optional)
  "Starbucks"         // merchant (optional)
);

// Result: { category: "Dining Out", confidence: 0.85, source: "ai" }
```

### 3. Record User Feedback

```typescript
// User accepts suggestion
await recordFeedback({
  transaction_id: "txn_123",
  suggested_category: "Dining Out",
  suggested_confidence: 0.85,
  user_selected_category: "Dining Out",
  feedback_type: "accepted",
  merchant: "Starbucks"
});

// User corrects suggestion
await recordFeedback({
  transaction_id: "txn_124", 
  suggested_category: "Shopping",
  suggested_confidence: 0.7,
  user_selected_category: "Groceries",
  feedback_type: "corrected"
});
```

## Common Patterns

### Transaction Form with AI

```typescript
function TransactionForm() {
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const { getImprovedSuggestion } = useAIFeedback();
  const { acceptSuggestion, correctSuggestion } = useQuickFeedback();

  const handleMerchantChange = async (merchant) => {
    if (merchant.length > 3) {
      const suggestion = await getImprovedSuggestion(merchant, merchant, amount);
      setAiSuggestion(suggestion);
    }
  };

  const handleAcceptAI = async () => {
    await acceptSuggestion(transactionId, aiSuggestion.category, aiSuggestion.confidence);
    setCategory(aiSuggestion.category);
  };

  return (
    <div>
      <Input onChange={(e) => handleMerchantChange(e.target.value)} />
      
      {aiSuggestion && (
        <div className="ai-suggestion">
          <p>Suggested: {aiSuggestion.category} ({Math.round(aiSuggestion.confidence * 100)}%)</p>
          <Button onClick={handleAcceptAI}>Accept</Button>
          <Button onClick={() => setAiSuggestion(null)}>Reject</Button>
        </div>
      )}
    </div>
  );
}
```

### Bulk Operations

```typescript
function BulkReview() {
  const { getImprovedSuggestion } = useAIFeedback();
  const { acceptSuggestion } = useQuickFeedback();

  const reviewTransactions = async (transactions) => {
    const suggestions = [];
    
    for (const txn of transactions) {
      const suggestion = await getImprovedSuggestion(
        txn.description,
        txn.merchant,
        txn.amount
      );
      
      if (suggestion.confidence > 0.8 && suggestion.category !== txn.category) {
        suggestions.push({ transaction: txn, suggestion });
      }
    }
    
    return suggestions;
  };

  const applyAllSuggestions = async (suggestions) => {
    for (const { transaction, suggestion } of suggestions) {
      await acceptSuggestion(
        transaction.id,
        suggestion.category,
        suggestion.confidence
      );
    }
  };
}
```

## API Reference

### AIService Methods

| Method | Quick Usage |
|--------|-------------|
| `categorizeTransaction()` | `await aiService.categorizeTransaction(desc, amount)` |
| `generateInsights()` | `await aiService.generateInsights(transactions)` |
| `predictSpending()` | `await aiService.predictSpending(transactions, category)` |
| `getStatus()` | `aiService.getStatus()` |

### FeedbackService Methods

| Method | Quick Usage |
|--------|-------------|
| `getImprovedSuggestion()` | `await feedbackService.getImprovedSuggestion(desc, merchant, amount)` |
| `recordFeedback()` | `await feedbackService.recordFeedback(feedbackData)` |
| `getLearningAnalytics()` | `await feedbackService.getLearningAnalytics()` |

### Hook Methods

| Hook | Methods |
|------|---------|
| `useAIFeedback()` | `recordFeedback`, `getImprovedSuggestion`, `getLearningAnalytics` |
| `useQuickFeedback()` | `acceptSuggestion`, `correctSuggestion`, `rejectSuggestion` |

## Configuration

### Environment Variables

```bash
# Required for AI features
VITE_OPENAI_API_KEY=sk-your-key-here
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here

# Optional model configuration
VITE_OPENAI_MODEL=gpt-3.5-turbo
VITE_ANTHROPIC_MODEL=claude-3-haiku-20240307
```

### Provider Configuration

```typescript
// Check current provider
const status = aiService.getStatus();
console.log(status.preferredProvider); // 'openai', 'anthropic', or 'local'

// Change provider
aiService.setPreferredProvider('anthropic');

// Update API keys
aiService.updateConfig({
  openaiApiKey: 'new-key',
  anthropicApiKey: 'new-key'
});
```

## Error Handling

### Basic Error Handling

```typescript
try {
  const result = await aiService.categorizeTransaction(description, amount);
  // Use result
} catch (error) {
  console.warn('AI failed, using fallback:', error);
  // Provide manual categorization
}
```

### Hook Error Handling

```typescript
const { getImprovedSuggestion, error, clearError } = useAIFeedback();

useEffect(() => {
  if (error) {
    toast.error(`AI Error: ${error}`);
    clearError();
  }
}, [error, clearError]);
```

## Performance Tips

### 1. Debounce Suggestions

```typescript
const debouncedGetSuggestion = useMemo(
  () => debounce(getImprovedSuggestion, 300),
  [getImprovedSuggestion]
);
```

### 2. Cache Results

```typescript
const suggestionCache = new Map();

const getCachedSuggestion = async (key, ...args) => {
  if (suggestionCache.has(key)) {
    return suggestionCache.get(key);
  }
  
  const result = await getImprovedSuggestion(...args);
  suggestionCache.set(key, result);
  return result;
};
```

### 3. Batch Feedback

```typescript
const feedbackQueue = [];

const batchRecordFeedback = async () => {
  const batch = [...feedbackQueue];
  feedbackQueue.length = 0;
  
  for (const feedback of batch) {
    await recordFeedback(feedback);
  }
};

// Queue feedback and batch process
feedbackQueue.push(feedbackData);
setTimeout(batchRecordFeedback, 1000);
```

## Debugging

### Enable Debug Mode

```typescript
// In development
localStorage.setItem('ai_debug', 'true');

// Check service status
console.log('AI Status:', aiService.getStatus());

// Check feedback analytics
const analytics = await feedbackService.getLearningAnalytics();
console.log('Learning Analytics:', analytics);
```

### Common Debug Checks

```typescript
// 1. Check API connectivity
const status = aiService.getStatus();
if (!status.hasAPIKey) {
  console.warn('No API keys configured');
}

// 2. Check feedback data
const analytics = await feedbackService.getLearningAnalytics();
if (analytics.total_suggestions === 0) {
  console.warn('No feedback data available');
}

// 3. Check storage
const health = await storageService.checkStorageHealth();
if (!health.isHealthy) {
  console.warn('Storage issues:', health.issues);
}
```

## Testing

### Mock AI Service

```typescript
// For testing
const mockAIService = {
  categorizeTransaction: jest.fn().mockResolvedValue({
    category: 'Test Category',
    confidence: 0.8,
    source: 'mock'
  }),
  generateInsights: jest.fn().mockResolvedValue([]),
  getStatus: jest.fn().mockReturnValue({
    isInitialized: true,
    preferredProvider: 'local'
  })
};
```

### Test Feedback Recording

```typescript
describe('AI Feedback', () => {
  it('should record feedback correctly', async () => {
    const feedback = {
      transaction_id: 'test-123',
      suggested_category: 'Shopping',
      user_selected_category: 'Groceries',
      feedback_type: 'corrected'
    };
    
    await feedbackService.recordFeedback(feedback);
    
    const analytics = await feedbackService.getLearningAnalytics();
    expect(analytics.corrected_suggestions).toBe(1);
  });
});
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| No AI suggestions | Check API keys and network connectivity |
| Low accuracy | Collect more user feedback |
| Slow responses | Check rate limiting and API quotas |
| Storage errors | Clear old data or check storage quota |
| Missing feedback | Verify feedback recording implementation |

## Best Practices

1. **Always handle errors gracefully**
2. **Collect feedback consistently**
3. **Show confidence levels to users**
4. **Debounce real-time suggestions**
5. **Cache frequent requests**
6. **Monitor accuracy metrics**
7. **Provide fallback options**
8. **Test with mock data**

## Navigation

- [Full Documentation](./AI_SERVICE_DOCUMENTATION.md)
- [API Reference](./API_REFERENCE.md)
- [Testing Guide](./TESTING_GUIDE.md)