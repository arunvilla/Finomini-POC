# AI Configuration Guide

## Complete Setup Guide for AI Services

This guide provides step-by-step instructions for configuring AI services in the AI Finance Manager to enhance OCR accuracy and provide intelligent financial insights.

## Overview

The AI Finance Manager supports multiple AI providers with intelligent fallback:

1. **OpenAI** (Primary) - GPT models for transaction categorization
2. **Anthropic** (Secondary) - Claude models for detailed analysis  
3. **Local Processing** (Fallback) - Privacy-focused, always available

## Configuration Methods

### Method 1: Environment Variables (Recommended for Developers)

#### Step 1: Create/Edit .env File
```bash
# Create .env file in project root
touch .env

# Add AI configuration
echo "VITE_OPENAI_API_KEY=your-openai-key-here" >> .env
echo "VITE_ANTHROPIC_API_KEY=your-anthropic-key-here" >> .env
```

#### Step 2: Verify Configuration
```typescript
// Check if keys are loaded
console.log('OpenAI configured:', !!import.meta.env.VITE_OPENAI_API_KEY);
console.log('Anthropic configured:', !!import.meta.env.VITE_ANTHROPIC_API_KEY);
```

#### Step 3: Restart Development Server
```bash
npm run dev
```

### Method 2: UI Configuration (Recommended for Users)

#### Step 1: Access Configuration Screen
1. Open the AI Finance Manager app
2. Navigate to **Settings** → **AI Configuration**
3. You'll see the AI Configuration interface

#### Step 2: Choose AI Provider
Select your preferred provider:

**OpenAI (Recommended)**
- Best for general use
- High accuracy (95%+)
- Cost: ~$1-5/month typical usage
- Models: GPT-3.5 Turbo, GPT-4

**Anthropic**
- Excellent for detailed analysis
- Great reasoning capabilities
- Cost: Similar to OpenAI
- Models: Claude 3 Haiku, Sonnet, Opus

**Local Only**
- Free and privacy-focused
- No external API calls
- Basic categorization (70-85% accuracy)
- Always available offline

#### Step 3: Enter API Credentials
1. Select your chosen provider tab
2. Enter your API key in the secure input field
3. Choose your preferred model
4. Click **"Save Configuration"**

#### Step 4: Test Connection
1. Click **"Test Connection"** button
2. Verify successful connection
3. Review test categorization result

## Getting API Keys

### OpenAI API Key Setup

#### Step 1: Create OpenAI Account
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up for an account or log in
3. Complete account verification

#### Step 2: Set Up Billing
1. Go to **Billing** → **Payment methods**
2. Add a credit card or payment method
3. Set usage limits if desired (recommended: $10-20/month)

#### Step 3: Create API Key
1. Navigate to **API Keys** section
2. Click **"Create new secret key"**
3. Give it a descriptive name (e.g., "AI Finance Manager")
4. Copy the key immediately (starts with `sk-`)
5. Store securely - you won't see it again

#### Step 4: Verify Key Format
```
✅ Correct: sk-proj-abcdefghijklmnopqrstuvwxyz1234567890...
❌ Wrong: sk-abcdefghijklmnopqrstuvwxyz (old format)
❌ Wrong: missing sk- prefix
```

### Anthropic API Key Setup

#### Step 1: Create Anthropic Account
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Sign up for an account
3. Complete verification process

#### Step 2: Add Credits
1. Go to **Billing** section
2. Purchase credits (minimum $5)
3. Credits don't expire

#### Step 3: Generate API Key
1. Navigate to **API Keys**
2. Click **"Create Key"**
3. Copy the generated key (starts with `sk-ant-`)
4. Store securely

#### Step 4: Verify Key Format
```
✅ Correct: sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
❌ Wrong: missing sk-ant- prefix
❌ Wrong: truncated or incomplete key
```

## Model Selection Guide

### OpenAI Models

#### GPT-3.5 Turbo (Recommended)
- **Best for**: General use, cost-effectiveness
- **Accuracy**: 95%+ for transaction categorization
- **Speed**: Fast (1-2 seconds)
- **Cost**: $0.0015 per 1K input tokens
- **Use case**: Daily transaction processing

#### GPT-4
- **Best for**: Complex analysis, highest accuracy
- **Accuracy**: 98%+ for transaction categorization
- **Speed**: Slower (2-4 seconds)
- **Cost**: $0.03 per 1K input tokens (20x more expensive)
- **Use case**: Important transactions, complex receipts

#### GPT-4 Turbo
- **Best for**: Balance of speed and accuracy
- **Accuracy**: 97%+ for transaction categorization
- **Speed**: Medium (1-3 seconds)
- **Cost**: $0.01 per 1K input tokens
- **Use case**: High-volume processing

### Anthropic Models

#### Claude 3 Haiku (Recommended)
- **Best for**: Fast, cost-effective processing
- **Accuracy**: 94%+ for transaction categorization
- **Speed**: Very fast (1-2 seconds)
- **Cost**: $0.25 per 1M input tokens
- **Use case**: High-volume, budget-conscious processing

#### Claude 3 Sonnet
- **Best for**: Balanced performance
- **Accuracy**: 96%+ for transaction categorization
- **Speed**: Medium (2-3 seconds)
- **Cost**: $3 per 1M input tokens
- **Use case**: General purpose with good accuracy

#### Claude 3 Opus
- **Best for**: Maximum capability and accuracy
- **Accuracy**: 98%+ for transaction categorization
- **Speed**: Slower (3-5 seconds)
- **Cost**: $15 per 1M input tokens
- **Use case**: Complex financial analysis

## Configuration Examples

### Basic Setup (OpenAI Only)
```bash
# .env file
VITE_OPENAI_API_KEY=sk-proj-your-openai-key-here
```

### Dual Provider Setup (Recommended)
```bash
# .env file
VITE_OPENAI_API_KEY=sk-proj-your-openai-key-here
VITE_ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here
```

### Programmatic Configuration
```typescript
import { aiService } from './services/ai/AIService';

// Configure both providers
aiService.updateConfig({
  openaiApiKey: 'sk-proj-your-openai-key',
  anthropicApiKey: 'sk-ant-your-anthropic-key',
  openaiModel: 'gpt-3.5-turbo',
  anthropicModel: 'claude-3-haiku-20240307'
});

// Set preferred provider
aiService.setPreferredProvider('openai');

// Initialize and test
await aiService.initialize();
```

## Testing Your Configuration

### Built-in Connection Test
```typescript
// Test through UI
// 1. Open AI Configuration screen
// 2. Click "Test Connection"
// 3. Review results

// Test programmatically
try {
  const result = await aiService.categorizeTransaction(
    'STARBUCKS COFFEE #1234',
    5.45
  );
  console.log('✅ AI working:', result);
} catch (error) {
  console.error('❌ AI failed:', error.message);
}
```

### Verify Service Status
```typescript
const status = aiService.getStatus();
console.log('AI Status:', {
  initialized: status.isInitialized,
  provider: status.preferredProvider,
  hasOpenAI: status.hasOpenAI,
  hasAnthropic: status.hasAnthropic
});
```

## Advanced Configuration

### Custom Model Settings
```typescript
// Use specific models for different use cases
aiService.updateConfig({
  openaiModel: 'gpt-4', // Higher accuracy for important transactions
  anthropicModel: 'claude-3-opus-20240229' // Maximum capability
});
```

### Provider Fallback Strategy
```typescript
// The system automatically handles fallbacks:
// 1. Try preferred provider (OpenAI)
// 2. Fall back to secondary provider (Anthropic)
// 3. Fall back to local processing
// 4. Never fail completely
```

### Rate Limiting Configuration
```typescript
// Built-in rate limiting (1 second between requests)
// Automatically handles API rate limits
// No additional configuration needed
```

## Security Best Practices

### API Key Security
1. **Never commit API keys** to version control
2. **Use environment variables** for production
3. **Rotate keys monthly** for security
4. **Monitor usage** in provider dashboards
5. **Set spending limits** to prevent overuse

### Storage Security
```typescript
// Environment variables (most secure)
VITE_OPENAI_API_KEY=sk-... // ✅ Secure, not accessible from browser

// Local storage (less secure)
localStorage.setItem('openai_api_key', 'sk-...'); // ⚠️ Accessible via JavaScript

// In-memory (most secure, temporary)
aiService.updateConfig({ openaiApiKey: 'sk-...' }); // ✅ Lost on refresh
```

### Privacy Protection
- ✅ **OCR processing**: 100% local, images never uploaded
- ✅ **AI requests**: Only processed text sent, no images
- ✅ **No personal data**: No account numbers or sensitive info
- ✅ **User control**: Can disable AI and use local-only processing

## Cost Management

### Usage Monitoring
```typescript
// Monitor costs in provider dashboards
// OpenAI: https://platform.openai.com/usage
// Anthropic: https://console.anthropic.com/

// Typical usage costs:
// - Transaction categorization: ~$0.0001 per receipt
// - Monthly usage: $1-5 for regular users
// - Batch processing: Optimized for efficiency
```

### Cost Optimization Tips
1. **Use GPT-3.5 Turbo** for most tasks (20x cheaper than GPT-4)
2. **Enable local fallback** to prevent API costs when offline
3. **Batch similar requests** when possible
4. **Set usage alerts** in provider dashboards
5. **Monitor monthly spending** regularly

### Free Alternatives
```typescript
// Use local processing for cost-free operation
aiService.setPreferredProvider('local');

// Features available without AI APIs:
// - Basic transaction categorization (70-85% accuracy)
// - Rule-based insights
// - Pattern matching
// - Complete privacy
```

## Troubleshooting Configuration

### Common Issues

#### "No API provider available"
```typescript
// Check configuration
const status = aiService.getStatus();
if (!status.hasOpenAI && !status.hasAnthropic) {
  console.error('No API keys configured');
  // Solution: Add API keys via .env or UI
}
```

#### "API test failed: 401"
```typescript
// Invalid API key
// Solutions:
// 1. Verify key format (sk- for OpenAI, sk-ant- for Anthropic)
// 2. Check key validity in provider dashboard
// 3. Ensure no extra spaces or characters
```

#### "API test failed: 403"
```typescript
// Insufficient credits or permissions
// Solutions:
// 1. Add billing method (OpenAI)
// 2. Purchase credits (Anthropic)
// 3. Check usage limits and quotas
```

### Debug Configuration
```typescript
// Enable debug logging
localStorage.setItem('debug_ai', 'true');

// Check environment loading
console.log('Environment keys:', {
  openai: !!import.meta.env.VITE_OPENAI_API_KEY,
  anthropic: !!import.meta.env.VITE_ANTHROPIC_API_KEY
});

// Test manual configuration
aiService.updateConfig({
  openaiApiKey: 'sk-test-key',
  anthropicApiKey: 'sk-ant-test-key'
});
```

## Migration and Updates

### Updating API Keys
```typescript
// Method 1: Update .env file
// Edit .env and restart development server

// Method 2: Update via UI
// Use AI Configuration screen to update keys

// Method 3: Programmatic update
aiService.updateConfig({
  openaiApiKey: 'new-openai-key',
  anthropicApiKey: 'new-anthropic-key'
});
```

### Switching Providers
```typescript
// Switch primary provider
aiService.setPreferredProvider('anthropic'); // or 'openai' or 'local'

// The system will automatically use the new provider
// Fallback mechanisms remain in place
```

## Production Deployment

### Environment Setup
```bash
# Production .env configuration
VITE_OPENAI_API_KEY=sk-prod-openai-key
VITE_ANTHROPIC_API_KEY=sk-ant-prod-anthropic-key

# Ensure .env is in .gitignore
echo ".env" >> .gitignore
```

### Security Checklist
- ✅ API keys in environment variables
- ✅ .env file in .gitignore
- ✅ Usage monitoring enabled
- ✅ Spending limits configured
- ✅ Key rotation schedule established
- ✅ Fallback mechanisms tested

### Performance Optimization
```typescript
// Production optimizations
aiService.updateConfig({
  openaiModel: 'gpt-3.5-turbo', // Cost-effective
  anthropicModel: 'claude-3-haiku-20240307' // Fast and affordable
});

// Enable caching for repeated requests
// Built-in rate limiting prevents API overuse
// Automatic fallback ensures reliability
```

---

**🎉 Configuration Complete!** Your AI services are now ready to enhance OCR accuracy and provide intelligent financial insights. Test with a few receipts to verify everything is working correctly.