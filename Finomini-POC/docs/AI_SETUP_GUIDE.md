# AI Service Setup Guide

## 🚨 Security First: API Key Management

### Step 1: Revoke the Exposed Key
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Navigate to API Keys section
3. Find and **DELETE** any exposed API keys from your console
4. Generate a new API key

### Step 2: Secure Configuration
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your new API key:
   ```bash
   # .env
   VITE_ANTHROPIC_API_KEY=your_new_api_key_here
   ```

3. **Never commit `.env` to git** (already in .gitignore)

## 🧪 Testing the AI Service

### Test 1: Basic Service Initialization

Open browser console and run:

```javascript
// Test AI Service initialization
import { AIService } from './src/services/ai/AIService.js';

const aiService = AIService.getInstance();
await aiService.initialize();

// Check status
const status = aiService.getStatus();
console.log('AI Service Status:', status);
// Should show: preferredProvider: 'anthropic', hasAnthropic: true
```

### Test 2: Transaction Categorization

```javascript
// Test basic categorization
const result = await aiService.categorizeTransaction(
  "Starbucks Coffee Shop Downtown",
  15.50
);

console.log('Categorization Result:', result);
// Expected: { category: "Dining Out", confidence: 0.8+, source: "ai" }
```

### Test 3: Learning System

```javascript
// Test feedback service
import { feedbackService } from './src/services/ai/FeedbackService.js';

await feedbackService.initialize();

// Get improved suggestion
const suggestion = await feedbackService.getImprovedSuggestion(
  "McDonald's Restaurant",
  "McDonald's", 
  12.99
);

console.log('Learning Suggestion:', suggestion);
```

### Test 4: React Hook Integration

Create a test component:

```typescript
// TestAIComponent.tsx
import React, { useState } from 'react';
import { useAIFeedback } from '../hooks/useAIFeedback';

export function TestAIComponent() {
  const [result, setResult] = useState(null);
  const { getImprovedSuggestion, recordFeedback, isProcessing } = useAIFeedback();

  const testCategorization = async () => {
    try {
      const suggestion = await getImprovedSuggestion(
        "Whole Foods Market",
        "Whole Foods",
        85.30
      );
      setResult(suggestion);
      
      // Record feedback
      await recordFeedback({
        transaction_id: "test-" + Date.now(),
        suggested_category: suggestion.category,
        suggested_confidence: suggestion.confidence,
        user_selected_category: suggestion.category,
        feedback_type: "accepted",
        merchant: "Whole Foods",
        amount: 85.30,
        description: "Whole Foods Market"
      });
      
      console.log('Test completed successfully!');
    } catch (error) {
      console.error('Test failed:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>AI Service Test</h2>
      <button onClick={testCategorization} disabled={isProcessing}>
        {isProcessing ? 'Testing...' : 'Test AI Categorization'}
      </button>
      
      {result && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>Result:</h3>
          <p><strong>Category:</strong> {result.category}</p>
          <p><strong>Confidence:</strong> {Math.round(result.confidence * 100)}%</p>
          <p><strong>Source:</strong> {result.source}</p>
          {result.reasoning && <p><strong>Reasoning:</strong> {result.reasoning}</p>}
        </div>
      )}
    </div>
  );
}
```

## 🎯 Feature Testing Checklist

### ✅ Core AI Features
- [ ] Service initialization with Anthropic API
- [ ] Basic transaction categorization
- [ ] Confidence scoring
- [ ] Fallback to local categorization (test by removing API key)

### ✅ Learning Features  
- [ ] Feedback recording
- [ ] Improved suggestions based on history
- [ ] Merchant pattern recognition
- [ ] Learning analytics

### ✅ UI Components
- [ ] AI suggestions in AddManualTransactionScreen
- [ ] Feedback collection in TransactionDetailsScreen  
- [ ] Bulk categorization review screen
- [ ] Learning analytics dashboard

### ✅ Performance
- [ ] Response times under 2 seconds
- [ ] Proper error handling
- [ ] Rate limiting working
- [ ] Local storage of feedback data

## 🐛 Troubleshooting

### Issue: "No API key available"
**Solution:** Check environment variable is set correctly:
```bash
echo $VITE_ANTHROPIC_API_KEY  # Should show your key
```

### Issue: "API request failed: 401"
**Solution:** API key is invalid or revoked. Generate new key.

### Issue: "Rate limit exceeded"
**Solution:** Wait 1 minute or increase rate limit delay:
```javascript
aiService.rateLimitDelay = 2000; // 2 seconds
```

### Issue: Low categorization accuracy
**Solution:** 
1. Collect more user feedback
2. Check learning analytics
3. Review merchant patterns

### Issue: Slow responses
**Solution:**
1. Implement debouncing in UI
2. Add caching for frequent requests
3. Check network connectivity

## 📊 Monitoring and Analytics

### Check AI Performance
```javascript
// Get learning analytics
import { feedbackService } from './src/services/ai/FeedbackService.js';

const analytics = await feedbackService.getLearningAnalytics();
console.log('AI Performance:', {
  accuracy: Math.round(analytics.accuracy_rate * 100) + '%',
  totalSuggestions: analytics.total_suggestions,
  merchantPatterns: Object.keys(analytics.merchant_patterns).length
});
```

### Monitor Service Health
```javascript
// Check service status
const status = aiService.getStatus();
console.log('Service Health:', {
  initialized: status.isInitialized,
  provider: status.preferredProvider,
  hasAPI: status.hasAPIKey
});
```

## 🚀 Production Deployment

### Environment Variables
Set these in your production environment:
```bash
VITE_ANTHROPIC_API_KEY=your_production_api_key
VITE_OPENAI_API_KEY=your_openai_key_optional
```

### Performance Optimization
1. Enable caching for frequent requests
2. Implement request debouncing
3. Use batch feedback recording
4. Monitor API usage and costs

### Security Checklist
- [ ] API keys stored securely (not in code)
- [ ] Rate limiting enabled
- [ ] Error handling doesn't expose sensitive data
- [ ] User feedback data encrypted in storage
- [ ] Regular API key rotation

## 📈 Success Metrics

Target performance indicators:
- **Accuracy Rate:** >80% overall
- **High Confidence Suggestions:** >90% accuracy
- **Response Time:** <2 seconds for API calls
- **User Adoption:** >70% of users provide feedback
- **Learning Improvement:** 5% accuracy increase per month

## 🔄 Next Steps

After successful setup:

1. **Collect Initial Data:** Use the app for 1-2 weeks to build feedback data
2. **Review Analytics:** Check learning performance weekly
3. **Optimize Patterns:** Identify and improve low-accuracy categories
4. **User Training:** Show users how to provide effective feedback
5. **Monitor Costs:** Track API usage and optimize as needed

## 📞 Support

If you encounter issues:
1. Check the console for error messages
2. Verify API key configuration
3. Test with simple categorization examples
4. Review the troubleshooting section above
5. Check network connectivity and API status

## 🔗 Related Documentation

- [AI Service Documentation](./AI_SERVICE_DOCUMENTATION.md)
- [Quick Reference](./AI_QUICK_REFERENCE.md)
- [Migration Guide](./AI_LEARNING_MIGRATION_GUIDE.md)
- [API Reference](./API_REFERENCE.md)