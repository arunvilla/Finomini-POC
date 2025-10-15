# AI Learning Features Migration Guide

## Overview

This guide covers the migration to the new AI learning system that was implemented in Task 13.2. The new system adds user feedback collection, learning analytics, and improved categorization accuracy.

## What's New

### 1. Enhanced AI Categorization with Learning
- **FeedbackService**: New service that learns from user corrections
- **Improved Suggestions**: AI now considers historical user feedback
- **Confidence Scoring**: More accurate confidence levels based on learning
- **Source Attribution**: Know whether suggestions come from AI, history, or rules

### 2. User Feedback Collection
- **AddManualTransactionScreen**: Enhanced with AI suggestion feedback
- **TransactionDetailsScreen**: Tracks category changes and collects feedback
- **Bulk Review**: New screen for reviewing multiple AI suggestions

### 3. Learning Analytics
- **Performance Metrics**: Track AI accuracy over time
- **Category Analysis**: See which categories perform best
- **Merchant Patterns**: View learned merchant categorization patterns

### 4. New UI Components
- **BulkCategorizationScreen**: Review and apply AI suggestions in bulk
- **AILearningAnalyticsScreen**: Dashboard showing AI performance metrics

## Breaking Changes

### AIService.categorizeTransaction()

**Before:**
```typescript
const result = await aiService.categorizeTransaction(description, amount, plaidCategory);
// Returns: { category: string, confidence: number }
```

**After:**
```typescript
const result = await aiService.categorizeTransaction(description, amount, plaidCategory, merchant);
// Returns: { category: string, confidence: number, reasoning?: string, source?: string }
```

**Migration:**
```typescript
// Old code
const { category, confidence } = await aiService.categorizeTransaction(desc, amount);

// New code - backward compatible
const { category, confidence, reasoning, source } = await aiService.categorizeTransaction(desc, amount, plaidCategory, merchant);

// Optional: Use new fields
if (reasoning) {
  console.log('AI reasoning:', reasoning);
}
if (source === 'history') {
  console.log('Based on user history');
}
```

## New Dependencies

### Storage Schema Updates

The new system adds AI feedback storage. No manual migration needed - the system will automatically create the new storage structure.

**New Storage Keys:**
```typescript
STORAGE_KEYS.AI_FEEDBACK = 'ai_finance_ai_feedback'
```

### New Type Definitions

Add these types to your imports:

```typescript
import { 
  AICategoryFeedback, 
  LearningAnalytics, 
  CategorySuggestion,
  BulkCategorizationItem 
} from '../types';
```

## Migration Steps

### Step 1: Update Existing Transaction Forms

**Before:**
```typescript
// Basic transaction form
function TransactionForm() {
  const [category, setCategory] = useState('');
  
  const handleSave = () => {
    // Save transaction
  };
}
```

**After:**
```typescript
// Enhanced with AI feedback
import { useAIFeedback, useQuickFeedback } from '../hooks/useAIFeedback';

function TransactionForm() {
  const [category, setCategory] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState(null);
  
  const { getImprovedSuggestion } = useAIFeedback();
  const { acceptSuggestion, correctSuggestion } = useQuickFeedback();
  
  const handleMerchantChange = async (merchant) => {
    if (merchant.length > 3) {
      const suggestion = await getImprovedSuggestion(merchant, merchant, amount);
      setAiSuggestion(suggestion);
    }
  };
  
  const handleSave = async () => {
    // Record feedback if AI suggestion was used
    if (aiSuggestion) {
      if (category === aiSuggestion.category) {
        await acceptSuggestion(transactionId, aiSuggestion.category, aiSuggestion.confidence);
      } else {
        await correctSuggestion(transactionId, aiSuggestion.category, aiSuggestion.confidence, category);
      }
    }
    
    // Save transaction
  };
}
```

### Step 2: Add AI Suggestion UI

```typescript
// Add AI suggestion display
{aiSuggestion && (
  <Card className="border-blue-200 bg-blue-50">
    <CardContent className="p-4">
      <div className="flex items-center gap-2 mb-2">
        <Brain className="h-5 w-5 text-blue-600" />
        <span className="font-semibold">AI Suggestion</span>
      </div>
      <p>
        <strong>Category:</strong> {aiSuggestion.category} 
        ({Math.round(aiSuggestion.confidence * 100)}% confidence)
      </p>
      {aiSuggestion.reasoning && (
        <p><strong>Reasoning:</strong> {aiSuggestion.reasoning}</p>
      )}
      
      <div className="flex gap-2 mt-3">
        <Button onClick={() => handleAcceptAI()}>
          <ThumbsUp className="h-4 w-4 mr-2" />
          Accept
        </Button>
        <Button variant="outline" onClick={() => handleRejectAI()}>
          <ThumbsDown className="h-4 w-4 mr-2" />
          Reject
        </Button>
      </div>
    </CardContent>
  </Card>
)}
```

### Step 3: Update Navigation

Add new screens to your navigation:

```typescript
// In App.tsx or your router
case "bulk-categorization":
  return (
    <BulkCategorizationScreen
      onBack={goBack}
      onNavigate={navigateToScreen}
    />
  );

case "ai-learning-analytics":
  return (
    <AILearningAnalyticsScreen
      onBack={goBack}
      onNavigate={navigateToScreen}
    />
  );
```

### Step 4: Update Store Integration

The store automatically uses the new learning system. No changes needed, but you can optionally enhance it:

```typescript
// Optional: Add feedback recording to store actions
addTransaction: async (transactionData) => {
  const transaction = {
    ...transactionData,
    id: generateId(),
    created_at: now(),
    updated_at: now(),
  };

  // Enhanced AI categorization with learning
  if (!transaction.category) {
    const { feedbackService } = await import('../services/ai/FeedbackService');
    const suggestion = await feedbackService.getImprovedSuggestion(
      transaction.description,
      transaction.merchant,
      transaction.amount
    );
    
    transaction.category = suggestion.category;
    transaction.confidence_score = suggestion.confidence;
    
    // Optionally auto-record as accepted if high confidence
    if (suggestion.confidence > 0.9) {
      await feedbackService.recordFeedback({
        transaction_id: transaction.id,
        suggested_category: suggestion.category,
        suggested_confidence: suggestion.confidence,
        user_selected_category: suggestion.category,
        feedback_type: 'accepted',
        merchant: transaction.merchant,
        amount: transaction.amount,
        description: transaction.description
      });
    }
  }

  await storageService.addTransaction(transaction);
  set((state) => ({ transactions: [...state.transactions, transaction] }));
}
```

## Optional Enhancements

### 1. Add Confidence Indicators

```typescript
const getConfidenceColor = (confidence) => {
  if (confidence >= 0.8) return 'text-green-600';
  if (confidence >= 0.6) return 'text-yellow-600';
  return 'text-red-600';
};

const getConfidenceLabel = (confidence) => {
  if (confidence >= 0.8) return 'High';
  if (confidence >= 0.6) return 'Medium';
  return 'Low';
};

// Usage
<Badge className={getConfidenceColor(suggestion.confidence)}>
  {getConfidenceLabel(suggestion.confidence)} ({Math.round(suggestion.confidence * 100)}%)
</Badge>
```

### 2. Add Learning Progress Indicators

```typescript
function LearningProgress() {
  const { getLearningAnalytics } = useAIFeedback();
  const [analytics, setAnalytics] = useState(null);
  
  useEffect(() => {
    getLearningAnalytics().then(setAnalytics);
  }, []);
  
  if (!analytics) return null;
  
  return (
    <div className="learning-progress">
      <h3>AI Learning Progress</h3>
      <p>Accuracy: {Math.round(analytics.accuracy_rate * 100)}%</p>
      <p>Total Suggestions: {analytics.total_suggestions}</p>
      <Progress value={analytics.accuracy_rate * 100} />
    </div>
  );
}
```

### 3. Add Merchant Pattern Display

```typescript
function MerchantPatterns() {
  const { getLearningAnalytics } = useAIFeedback();
  const [patterns, setPatterns] = useState({});
  
  useEffect(() => {
    getLearningAnalytics().then(data => setPatterns(data.merchant_patterns));
  }, []);
  
  return (
    <div>
      <h3>Learned Merchant Patterns</h3>
      {Object.entries(patterns).map(([merchant, pattern]) => (
        <div key={merchant} className="merchant-pattern">
          <span>{merchant}</span>
          <Badge>{pattern.category}</Badge>
          <span>{Math.round(pattern.confidence * 100)}%</span>
        </div>
      ))}
    </div>
  );
}
```

## Testing Migration

### 1. Test Basic Functionality

```typescript
describe('AI Learning Migration', () => {
  it('should maintain backward compatibility', async () => {
    const aiService = AIService.getInstance();
    
    // Old API should still work
    const result = await aiService.categorizeTransaction('Starbucks', 15.50);
    expect(result).toHaveProperty('category');
    expect(result).toHaveProperty('confidence');
    
    // New fields should be available
    expect(result).toHaveProperty('source');
  });
  
  it('should record feedback correctly', async () => {
    const { recordFeedback } = useAIFeedback();
    
    await recordFeedback({
      transaction_id: 'test-123',
      suggested_category: 'Shopping',
      user_selected_category: 'Groceries',
      feedback_type: 'corrected'
    });
    
    // Verify feedback was recorded
    const analytics = await feedbackService.getLearningAnalytics();
    expect(analytics.corrected_suggestions).toBeGreaterThan(0);
  });
});
```

### 2. Test UI Components

```typescript
describe('Enhanced Transaction Form', () => {
  it('should show AI suggestions', async () => {
    render(<TransactionForm />);
    
    // Type merchant name
    fireEvent.change(screen.getByPlaceholderText('Merchant'), {
      target: { value: 'Starbucks' }
    });
    
    // Wait for AI suggestion
    await waitFor(() => {
      expect(screen.getByText(/AI Suggestion/)).toBeInTheDocument();
    });
  });
});
```

## Performance Considerations

### 1. Debounce AI Requests

```typescript
const debouncedGetSuggestion = useMemo(
  () => debounce(getImprovedSuggestion, 300),
  [getImprovedSuggestion]
);
```

### 2. Cache Suggestions

```typescript
const suggestionCache = useRef(new Map());

const getCachedSuggestion = useCallback(async (key, ...args) => {
  if (suggestionCache.current.has(key)) {
    return suggestionCache.current.get(key);
  }
  
  const result = await getImprovedSuggestion(...args);
  suggestionCache.current.set(key, result);
  return result;
}, [getImprovedSuggestion]);
```

### 3. Batch Feedback Recording

```typescript
const feedbackQueue = useRef([]);

const queueFeedback = useCallback((feedback) => {
  feedbackQueue.current.push(feedback);
  
  // Process queue after delay
  setTimeout(() => {
    if (feedbackQueue.current.length > 0) {
      const batch = [...feedbackQueue.current];
      feedbackQueue.current = [];
      
      batch.forEach(recordFeedback);
    }
  }, 1000);
}, [recordFeedback]);
```

## Rollback Plan

If you need to rollback the changes:

### 1. Disable Learning Features

```typescript
// Temporarily disable learning
const ENABLE_AI_LEARNING = false;

if (ENABLE_AI_LEARNING) {
  // Use new learning system
  const suggestion = await feedbackService.getImprovedSuggestion(...);
} else {
  // Use old system
  const result = await aiService.categorizeTransaction(...);
}
```

### 2. Remove New UI Components

```typescript
// Comment out new screens in navigation
// case "bulk-categorization":
// case "ai-learning-analytics":
```

### 3. Revert AIService Changes

The AIService maintains backward compatibility, so no changes needed. The new parameters are optional.

## Support and Troubleshooting

### Common Issues

1. **Feedback not recording**: Check storage permissions and quota
2. **Slow suggestions**: Implement debouncing and caching
3. **Low accuracy**: Collect more user feedback over time
4. **UI not updating**: Ensure proper state management

### Debug Tools

```typescript
// Enable debug mode
localStorage.setItem('ai_debug', 'true');

// Check learning analytics
const analytics = await feedbackService.getLearningAnalytics();
console.log('Learning Analytics:', analytics);

// Check service status
const status = aiService.getStatus();
console.log('AI Service Status:', status);
```

## Next Steps

After migration:

1. **Monitor Analytics**: Check the learning analytics dashboard regularly
2. **Collect Feedback**: Encourage users to provide feedback on AI suggestions
3. **Review Patterns**: Analyze merchant patterns and category accuracy
4. **Optimize Performance**: Implement caching and debouncing as needed
5. **Train Users**: Show users how to use the new feedback features

## Resources

- [Full AI Service Documentation](./AI_SERVICE_DOCUMENTATION.md)
- [Quick Reference Guide](./AI_QUICK_REFERENCE.md)
- [API Reference](./API_REFERENCE.md)
- [Testing Guide](./TESTING_GUIDE.md)