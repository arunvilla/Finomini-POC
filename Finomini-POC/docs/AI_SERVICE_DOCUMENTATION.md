# AI Service Documentation

## Overview

The AI Finance Manager includes a comprehensive AI service system that provides intelligent transaction categorization, financial insights, and learning capabilities. The system consists of multiple components working together to deliver smart financial analysis and continuously improve through user feedback.

## Architecture

### Core Components

1. **AIService** - Main AI service for categorization and insights
2. **FeedbackService** - Learning system that improves AI accuracy over time
3. **useAIFeedback Hook** - React hook for easy AI feedback integration
4. **UI Components** - Screens for bulk categorization review and analytics

### Service Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   UI Components │────│  useAIFeedback   │────│  FeedbackService│
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                │                        │
                       ┌──────────────────┐    ┌─────────────────┐
                       │    AIService     │────│  StorageService │
                       └──────────────────┘    └─────────────────┘
                                │
                       ┌──────────────────┐
                       │  External APIs   │
                       │ (OpenAI/Anthropic)│
                       └──────────────────┘
```

## AIService

### Features

- **Multi-Provider Support**: OpenAI, Anthropic, and local fallback
- **Automatic Fallback**: Graceful degradation when APIs are unavailable
- **Rate Limiting**: Built-in request throttling
- **Transaction Categorization**: Smart category suggestions with confidence scores
- **Financial Insights**: AI-generated spending analysis and recommendations
- **Cash Flow Forecasting**: Predictive financial planning
- **Budget Analysis**: Goal achievability assessment

### Configuration

#### Environment Variables

```bash
# OpenAI Configuration
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_OPENAI_MODEL=gpt-3.5-turbo  # Optional, defaults to gpt-3.5-turbo

# Anthropic Configuration  
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key
VITE_ANTHROPIC_MODEL=claude-3-haiku-20240307  # Optional
```

#### Provider Priority

1. **OpenAI** - Primary provider if API key is available
2. **Anthropic** - Fallback if OpenAI fails
3. **Local** - Rule-based categorization when no APIs available

### Usage

#### Basic Initialization

```typescript
import { AIService } from '../services/ai/AIService';

const aiService = AIService.getInstance();
await aiService.initialize();
```

#### Transaction Categorization

```typescript
const result = await aiService.categorizeTransaction(
  "Starbucks Coffee Shop",  // description
  15.50,                    // amount
  "food_and_drink",         // plaidCategory (optional)
  "Starbucks"              // merchant (optional)
);

console.log(result);
// {
//   category: "Dining Out",
//   confidence: 0.85,
//   reasoning: "Based on 12 previous transactions with Starbucks",
//   source: "history"
// }
```

#### Generate Insights

```typescript
const insights = await aiService.generateInsights(transactions);
// Returns array of AIInsight objects with spending patterns and recommendations
```

#### Cash Flow Forecasting

```typescript
const forecast = await aiService.generateCashFlowForecast(transactions, accounts);
// Returns 6-month financial projections
```

### API Reference

#### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getInstance()` | - | `AIService` | Get singleton instance |
| `initialize()` | - | `Promise<void>` | Initialize service and test API connections |
| `categorizeTransaction()` | `description, amount, plaidCategory?, merchant?` | `Promise<CategoryResult>` | Categorize a transaction |
| `generateInsights()` | `transactions[]` | `Promise<AIInsight[]>` | Generate financial insights |
| `generateCashFlowForecast()` | `transactions[], accounts[]` | `Promise<Forecast[]>` | Generate cash flow predictions |
| `predictSpending()` | `transactions[], category?` | `Promise<Prediction>` | Predict future spending |
| `analyzeBudgetGoal()` | `budget, transactions[]` | `Promise<Analysis>` | Analyze budget achievability |
| `getStatus()` | - | `ServiceStatus` | Get service configuration status |
| `setPreferredProvider()` | `provider` | `void` | Change AI provider |
| `updateConfig()` | `config` | `void` | Update API configuration |

#### Types

```typescript
interface CategoryResult {
  category: string;
  confidence: number;
  reasoning?: string;
  source?: 'ai' | 'history' | 'local' | 'fallback';
}

interface AIInsight {
  id: string;
  type: 'spending_pattern' | 'anomaly' | 'recommendation' | 'prediction';
  title: string;
  description: string;
  confidence: number;
  category?: string;
  amount?: number;
  created_at: Date;
  is_read: boolean;
}

interface ServiceStatus {
  isInitialized: boolean;
  preferredProvider: string;
  hasOpenAI: boolean;
  hasAnthropic: boolean;
  hasAPIKey: boolean;
  openaiModel: string;
  anthropicModel: string;
}
```

## FeedbackService

### Overview

The FeedbackService implements a learning system that improves AI categorization accuracy over time by collecting and analyzing user feedback.

### Features

- **User Feedback Collection**: Track user corrections and preferences
- **Merchant Pattern Learning**: Remember categorization patterns for specific merchants
- **Description Analysis**: Learn from similar transaction descriptions
- **Confidence Adjustment**: Adjust AI confidence based on historical accuracy
- **Analytics Dashboard**: Provide insights into AI performance

### Learning Mechanisms

#### 1. Merchant Pattern Recognition

```typescript
// Example: User consistently categorizes Starbucks as "Dining Out"
// System learns: Starbucks → Dining Out (95% confidence)

const suggestion = await feedbackService.getImprovedSuggestion(
  "Starbucks Downtown",
  "Starbucks",
  12.50
);
// Returns: { category: "Dining Out", confidence: 0.95, source: "history" }
```

#### 2. Description Similarity

```typescript
// System finds similar descriptions and applies learned patterns
// "Target Store #1234" → "Shopping" (based on previous Target transactions)
```

#### 3. Category Accuracy Tracking

```typescript
// Tracks accuracy per category and adjusts confidence accordingly
// If "Gas" category has 90% accuracy, boost confidence
// If "Entertainment" has 60% accuracy, reduce confidence
```

### Usage

#### Recording Feedback

```typescript
import { feedbackService } from '../services/ai/FeedbackService';

// User accepts AI suggestion
await feedbackService.recordFeedback({
  transaction_id: "txn_123",
  suggested_category: "Dining Out",
  suggested_confidence: 0.8,
  user_selected_category: "Dining Out",
  feedback_type: "accepted",
  merchant: "Starbucks",
  amount: 15.50,
  description: "Starbucks Coffee"
});

// User corrects AI suggestion
await feedbackService.recordFeedback({
  transaction_id: "txn_124",
  suggested_category: "Shopping",
  suggested_confidence: 0.7,
  user_selected_category: "Groceries",
  feedback_type: "corrected",
  reasoning: "This was grocery shopping, not general shopping"
});
```

#### Getting Improved Suggestions

```typescript
const suggestion = await feedbackService.getImprovedSuggestion(
  "Whole Foods Market",
  "Whole Foods",
  85.30
);

console.log(suggestion);
// {
//   category: "Groceries",
//   confidence: 0.92,
//   reasoning: "Based on 8 previous transactions with Whole Foods",
//   source: "history"
// }
```

#### Analytics

```typescript
const analytics = await feedbackService.getLearningAnalytics();

console.log(analytics);
// {
//   total_suggestions: 150,
//   accepted_suggestions: 120,
//   rejected_suggestions: 15,
//   corrected_suggestions: 15,
//   accuracy_rate: 0.8,
//   category_accuracy: {
//     "Groceries": { total: 25, correct: 23, accuracy: 0.92 },
//     "Dining Out": { total: 30, correct: 27, accuracy: 0.9 }
//   },
//   merchant_patterns: {
//     "Starbucks": { category: "Dining Out", confidence: 0.95, feedback_count: 12 }
//   }
// }
```

### API Reference

#### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getInstance()` | - | `FeedbackService` | Get singleton instance |
| `initialize()` | - | `Promise<void>` | Initialize service |
| `recordFeedback()` | `feedback` | `Promise<void>` | Record user feedback |
| `getImprovedSuggestion()` | `description, merchant?, amount?, plaidCategory?` | `Promise<CategorySuggestion>` | Get learned suggestion |
| `getLearningAnalytics()` | - | `Promise<LearningAnalytics>` | Get performance analytics |
| `clearFeedback()` | - | `Promise<void>` | Clear all feedback data |
| `exportFeedback()` | - | `Promise<AICategoryFeedback[]>` | Export feedback for analysis |

#### Types

```typescript
interface AICategoryFeedback {
  id: string;
  transaction_id: string;
  suggested_category: string;
  suggested_confidence: number;
  user_selected_category: string;
  feedback_type: 'accepted' | 'rejected' | 'corrected';
  merchant?: string;
  amount?: number;
  description?: string;
  created_at: Date;
  reasoning?: string;
}

interface CategorySuggestion {
  category: string;
  confidence: number;
  reasoning?: string;
  source: 'ai' | 'rules' | 'history';
}

interface LearningAnalytics {
  total_suggestions: number;
  accepted_suggestions: number;
  rejected_suggestions: number;
  corrected_suggestions: number;
  accuracy_rate: number;
  category_accuracy: Record<string, {
    total: number;
    correct: number;
    accuracy: number;
  }>;
  merchant_patterns: Record<string, {
    category: string;
    confidence: number;
    feedback_count: number;
  }>;
}
```

## React Hooks

### useAIFeedback

Primary hook for AI feedback functionality.

```typescript
import { useAIFeedback } from '../hooks/useAIFeedback';

function MyComponent() {
  const {
    recordFeedback,
    getImprovedSuggestion,
    getLearningAnalytics,
    isProcessing,
    error,
    clearError
  } = useAIFeedback();

  // Use the hook methods...
}
```

### useQuickFeedback

Convenience hook for common feedback scenarios.

```typescript
import { useQuickFeedback } from '../hooks/useAIFeedback';

function TransactionForm() {
  const { acceptSuggestion, correctSuggestion, rejectSuggestion } = useQuickFeedback();

  const handleAccept = async () => {
    await acceptSuggestion(
      transactionId,
      suggestedCategory,
      confidence,
      merchant,
      amount,
      description
    );
  };
}
```

## UI Components

### BulkCategorizationScreen

Screen for reviewing and applying AI suggestions in bulk.

**Features:**
- Filter by confidence level and category
- Bulk accept/reject operations
- Individual transaction review
- Search functionality

**Usage:**
```typescript
<BulkCategorizationScreen
  onBack={() => navigate('dashboard')}
  onNavigate={(screen) => navigate(screen)}
/>
```

### AILearningAnalyticsScreen

Dashboard showing AI performance metrics and learning progress.

**Features:**
- Overall accuracy metrics
- Category-specific performance
- Merchant pattern analysis
- Performance trends

**Usage:**
```typescript
<AILearningAnalyticsScreen
  onBack={() => navigate('dashboard')}
  onNavigate={(screen) => navigate(screen)}
/>
```

### Enhanced Transaction Screens

#### AddManualTransactionScreen

Enhanced with AI feedback collection:
- Real-time AI suggestions
- Confidence indicators
- Feedback buttons (thumbs up/down)
- Override detection

#### TransactionDetailsScreen

Enhanced with feedback tracking:
- Category change detection
- Feedback prompts
- AI correction tracking

## Best Practices

### 1. Error Handling

Always handle AI service errors gracefully:

```typescript
try {
  const result = await aiService.categorizeTransaction(description, amount);
  // Use result
} catch (error) {
  console.warn('AI categorization failed:', error);
  // Fallback to manual categorization
}
```

### 2. Feedback Collection

Collect feedback consistently to improve accuracy:

```typescript
// Always record feedback when users interact with AI suggestions
if (userAcceptedSuggestion) {
  await recordFeedback({
    transaction_id: id,
    suggested_category: aiCategory,
    user_selected_category: aiCategory,
    feedback_type: 'accepted'
  });
}
```

### 3. Performance Optimization

- Use debouncing for real-time suggestions
- Cache frequent suggestions
- Batch feedback recording when possible

```typescript
// Debounce AI suggestions
const debouncedGetSuggestion = useMemo(
  () => debounce(getImprovedSuggestion, 300),
  [getImprovedSuggestion]
);
```

### 4. User Experience

- Show confidence levels to users
- Provide reasoning when available
- Allow easy feedback submission
- Display learning progress

## Configuration

### Storage

AI feedback data is stored securely using the StorageService:

```typescript
// Storage keys
STORAGE_KEYS.AI_FEEDBACK = 'ai_finance_ai_feedback'

// Data is encrypted and stored locally
await storageService.saveAIFeedback(feedbackData);
```

### Rate Limiting

API requests are automatically rate-limited:

```typescript
// Default: 1 second between requests
private rateLimitDelay = 1000;
```

### Fallback Behavior

The system gracefully degrades when APIs are unavailable:

1. **Primary**: OpenAI API
2. **Secondary**: Anthropic API  
3. **Fallback**: Local rule-based categorization

## Troubleshooting

### Common Issues

#### 1. API Key Issues

```
Error: OpenAI API test failed: 401
```

**Solution**: Verify API key in environment variables:
```bash
VITE_OPENAI_API_KEY=sk-your-actual-key-here
```

#### 2. Rate Limiting

```
Error: Too Many Requests (429)
```

**Solution**: Increase rate limit delay:
```typescript
aiService.rateLimitDelay = 2000; // 2 seconds
```

#### 3. Low Accuracy

**Solution**: 
- Collect more user feedback
- Review merchant patterns in analytics
- Check category-specific accuracy

#### 4. Storage Issues

```
Error: Failed to save AI feedback
```

**Solution**: Check storage quota and clear old data if needed.

### Debug Mode

Enable debug logging:

```typescript
// In development
localStorage.setItem('ai_debug', 'true');

// Check service status
const status = aiService.getStatus();
console.log('AI Service Status:', status);
```

## Performance Metrics

### Accuracy Targets

- **Overall Accuracy**: >80%
- **High Confidence Suggestions**: >90%
- **Merchant Pattern Recognition**: >95%

### Response Times

- **Local Categorization**: <100ms
- **API Categorization**: <2s
- **Feedback Recording**: <500ms

## Security Considerations

### Data Privacy

- All feedback data is encrypted locally
- No sensitive data sent to external APIs
- User can clear feedback data anytime

### API Security

- API keys stored in environment variables
- Rate limiting prevents abuse
- Graceful fallback when APIs unavailable

## Future Enhancements

### Planned Features

1. **Advanced Learning Algorithms**
   - Neural network-based categorization
   - Temporal pattern recognition
   - Cross-user learning (anonymized)

2. **Enhanced Analytics**
   - Trend analysis
   - Seasonal pattern detection
   - Comparative benchmarking

3. **Integration Improvements**
   - Real-time learning updates
   - Batch processing optimization
   - Advanced caching strategies

### Roadmap

- **Q1**: Advanced pattern recognition
- **Q2**: Enhanced analytics dashboard
- **Q3**: Cross-user learning system
- **Q4**: Mobile-specific optimizations

## Support

For issues or questions:

1. Check the troubleshooting section
2. Review console logs for errors
3. Verify API configuration
4. Check storage health status

## Changelog

### Version 1.2.0 (Current)
- Added FeedbackService for learning
- Enhanced UI with feedback collection
- Bulk categorization review screen
- Learning analytics dashboard
- Improved confidence scoring

### Version 1.1.0
- Multi-provider API support
- Rate limiting implementation
- Local fallback categorization
- Cash flow forecasting

### Version 1.0.0
- Initial AI service implementation
- Basic transaction categorization
- OpenAI integration
- Insight generation