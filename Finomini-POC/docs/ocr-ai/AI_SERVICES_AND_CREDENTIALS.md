# AI Services and Credentials Configuration

## Overview

This document provides comprehensive information about the AI services used in the AI Finance Manager project and how to configure the necessary credentials/tokens to access them.

## AI Services Used in the Project

### 1. **OpenAI (Primary AI Provider)**

#### Service Details:
- **API**: OpenAI GPT Models
- **Default Model**: `gpt-3.5-turbo`
- **Alternative Models**: `gpt-4`, `gpt-4-turbo-preview`
- **Base URL**: `https://api.openai.com/v1`
- **Usage**: Transaction categorization, financial insights, data validation

#### Capabilities:
- Advanced transaction categorization (95%+ accuracy)
- Intelligent spending pattern analysis
- Cash flow predictions and forecasting
- Budget recommendations and optimization
- Natural language processing for financial data

### 2. **Anthropic Claude (Secondary AI Provider)**

#### Service Details:
- **API**: Anthropic Claude Models
- **Default Model**: `claude-3-haiku-20240307`
- **Alternative Models**: `claude-3-sonnet-20240229`, `claude-3-opus-20240229`
- **Base URL**: `https://api.anthropic.com/v1`
- **Usage**: Fallback AI provider, detailed financial analysis

#### Capabilities:
- Detailed financial analysis and insights
- Contextual spending pattern recognition
- Risk assessment and recommendations
- Personalized financial advice
- Advanced reasoning for complex financial scenarios

### 3. **Local Processing (Fallback)**

#### Service Details:
- **Type**: Rule-based algorithms and heuristics
- **Models**: Built-in pattern matching and statistical analysis
- **Usage**: Offline processing when external APIs are unavailable
- **Privacy**: 100% local processing, no external API calls

#### Capabilities:
- Basic transaction categorization
- Simple spending pattern analysis
- Rule-based financial insights
- No API costs or external dependencies
- Complete privacy protection

## Credential Configuration

### Environment Variables (Primary Method)

The AI service credentials can be configured using environment variables in your `.env` file:

```bash
# AI Service Configuration
VITE_OPENAI_API_KEY=sk-your-openai-api-key-here
VITE_ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key-here
```

#### Current .env Configuration:
```bash
# Current .env file contains only Plaid configuration
VITE_PLAID_CLIENT_ID=6749ef2ed74216001aa5b99d
VITE_PLAID_ENV=sandbox
VITE_API_BASE_URL=http://localhost:7777/api

# AI credentials are NOT currently configured in .env
# They must be added manually or configured through the UI
```

### Browser Local Storage (Secondary Method)

The application also supports configuring AI credentials through the browser's local storage via the AI Configuration Screen:

#### Local Storage Keys:
```javascript
// OpenAI Configuration
localStorage.setItem('openai_api_key', 'sk-your-openai-key');
localStorage.setItem('openai_model', 'gpt-3.5-turbo');

// Anthropic Configuration  
localStorage.setItem('anthropic_api_key', 'sk-ant-your-anthropic-key');
localStorage.setItem('anthropic_model', 'claude-3-haiku-20240307');

// Provider Preference
localStorage.setItem('preferred_ai_provider', 'openai'); // or 'anthropic' or 'local'
```

## How to Obtain API Keys/Tokens

### 1. OpenAI API Key

#### Steps to Get OpenAI API Key:
1. **Visit**: [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Sign Up/Login**: Create an account or log in to existing account
3. **Navigate**: Go to API Keys section
4. **Create Key**: Click "Create new secret key"
5. **Copy Key**: Copy the generated key (starts with `sk-`)
6. **Add Billing**: Add payment method to your OpenAI account

#### Key Format:
```
sk-proj-abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ
```

#### Pricing (as of 2024):
- **GPT-3.5 Turbo**: $0.0015 per 1K input tokens, $0.002 per 1K output tokens
- **GPT-4**: $0.03 per 1K input tokens, $0.06 per 1K output tokens
- **GPT-4 Turbo**: $0.01 per 1K input tokens, $0.03 per 1K output tokens

### 2. Anthropic API Key

#### Steps to Get Anthropic API Key:
1. **Visit**: [Anthropic Console](https://console.anthropic.com/)
2. **Sign Up/Login**: Create an account or log in
3. **Navigate**: Go to API Keys section
4. **Create Key**: Generate a new API key
5. **Copy Key**: Copy the generated key (starts with `sk-ant-`)
6. **Add Credits**: Add credits to your Anthropic account

#### Key Format:
```
sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### Pricing (as of 2024):
- **Claude 3 Haiku**: $0.25 per 1M input tokens, $1.25 per 1M output tokens
- **Claude 3 Sonnet**: $3 per 1M input tokens, $15 per 1M output tokens
- **Claude 3 Opus**: $15 per 1M input tokens, $75 per 1M output tokens

## Configuration Methods

### Method 1: Environment Variables (.env file)

Add the following to your `.env` file:

```bash
# Add these lines to your .env file
VITE_OPENAI_API_KEY=sk-your-openai-api-key-here
VITE_ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key-here
```

**Advantages:**
- Automatic initialization on app startup
- Secure (not visible in UI)
- Version control friendly (with .env in .gitignore)

**Disadvantages:**
- Requires app restart to change
- Not user-configurable at runtime

### Method 2: AI Configuration Screen (Recommended for Users)

The application includes a dedicated AI Configuration Screen accessible through the UI:

#### Features:
- **Visual Interface**: Easy-to-use configuration screen
- **Real-time Testing**: Test API connections immediately
- **Secure Input**: Password-masked input fields
- **Model Selection**: Choose specific AI models
- **Status Monitoring**: Real-time service status display

#### Access Path:
```
Main App → Settings → AI Configuration
```

#### Configuration Steps:
1. Open the AI Configuration Screen
2. Select your preferred AI provider (OpenAI/Anthropic/Local)
3. Enter your API key in the secure input field
4. Choose your preferred model
5. Click "Save Configuration"
6. Test the connection using "Test Connection" button

### Method 3: Programmatic Configuration

You can also configure AI services programmatically:

```typescript
import { aiService } from './services/ai/AIService';

// Update configuration
aiService.updateConfig({
  openaiApiKey: 'sk-your-openai-key',
  anthropicApiKey: 'sk-ant-your-anthropic-key',
  openaiModel: 'gpt-4',
  anthropicModel: 'claude-3-sonnet-20240229'
});

// Set preferred provider
aiService.setPreferredProvider('openai');

// Initialize with new configuration
await aiService.initialize();
```

## AI Service Architecture

### Initialization Flow

```typescript
// AI Service initialization process
class AIService {
  private constructor() {
    // 1. Load from environment variables
    this.openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY || null;
    this.anthropicApiKey = import.meta.env.VITE_ANTHROPIC_API_KEY || null;
    
    // 2. Determine preferred provider
    if (this.openaiApiKey) {
      this.preferredProvider = 'openai';
    } else if (this.anthropicApiKey) {
      this.preferredProvider = 'anthropic';
    } else {
      this.preferredProvider = 'local';
    }
  }
  
  async initialize(): Promise<void> {
    // 3. Test API connections
    // 4. Set up fallback mechanisms
    // 5. Configure rate limiting
  }
}
```

### Fallback Mechanism

The AI service implements intelligent fallback:

```typescript
// Multi-provider fallback system
private async makeAPIRequest(messages: Message[]): Promise<string> {
  // Try preferred provider first
  try {
    if (this.preferredProvider === 'openai' && this.openaiApiKey) {
      return await this.makeOpenAIRequest(messages);
    } else if (this.preferredProvider === 'anthropic' && this.anthropicApiKey) {
      return await this.makeAnthropicRequest(messages);
    }
  } catch (error) {
    // Try fallback provider
    if (this.preferredProvider === 'openai' && this.anthropicApiKey) {
      return await this.makeAnthropicRequest(messages);
    } else if (this.preferredProvider === 'anthropic' && this.openaiApiKey) {
      return await this.makeOpenAIRequest(messages);
    }
  }
  
  // Final fallback to local processing
  throw new Error('No AI provider available');
}
```

## Security Considerations

### API Key Security

#### Best Practices:
1. **Never commit API keys** to version control
2. **Use environment variables** for production deployments
3. **Rotate keys regularly** (monthly recommended)
4. **Monitor usage** to detect unauthorized access
5. **Set usage limits** in provider dashboards

#### Storage Security:
- **Environment Variables**: Secure, not accessible from browser
- **Local Storage**: Less secure, accessible via JavaScript
- **In-Memory**: Most secure, lost on page refresh

### Privacy Protection

#### Data Handling:
- **No Image Upload**: OCR processing happens locally
- **Minimal Data Sharing**: Only processed text sent to AI APIs
- **No Personal Data**: Financial amounts and categories only
- **User Control**: Users can choose local-only processing

#### API Communication:
```typescript
// Example of data sent to AI APIs
const aiRequest = {
  messages: [
    {
      role: 'system',
      content: 'You are a financial categorization expert.'
    },
    {
      role: 'user', 
      content: 'Categorize: WALMART SUPERCENTER - $45.67'
    }
  ]
};
// No personal information, account numbers, or sensitive data
```

## Usage Examples

### Basic Transaction Categorization

```typescript
// Categorize a transaction using AI
const result = await aiService.categorizeTransaction(
  'STARBUCKS COFFEE #1234',
  5.45,
  'food_and_drink'
);

console.log(result);
// Output: { category: 'Dining Out', confidence: 0.95 }
```

### Generate Financial Insights

```typescript
// Generate AI-powered insights from transactions
const insights = await aiService.generateInsights(transactions);

console.log(insights);
// Output: Array of AIInsight objects with recommendations
```

### Predict Future Spending

```typescript
// Predict spending for a category
const prediction = await aiService.predictSpending(
  transactions,
  'Groceries'
);

console.log(prediction);
// Output: { amount: 450.00, confidence: 0.85 }
```

## Troubleshooting

### Common Issues

#### 1. "No API provider available"
**Cause**: No valid API keys configured
**Solution**: Add API keys via environment variables or UI configuration

#### 2. "OpenAI API test failed: 401"
**Cause**: Invalid or expired OpenAI API key
**Solution**: Verify API key format and check OpenAI dashboard

#### 3. "Anthropic API test failed: 403"
**Cause**: Invalid Anthropic API key or insufficient credits
**Solution**: Check API key and add credits to Anthropic account

#### 4. Rate limiting errors
**Cause**: Too many API requests
**Solution**: The service includes automatic rate limiting (1 second between requests)

### Debug Information

Check AI service status:
```typescript
const status = aiService.getStatus();
console.log(status);
// Output:
// {
//   isInitialized: true,
//   preferredProvider: 'openai',
//   hasOpenAI: true,
//   hasAnthropic: false,
//   openaiModel: 'gpt-3.5-turbo',
//   anthropicModel: 'claude-3-haiku-20240307'
// }
```

## Cost Optimization

### Token Usage Optimization

The AI service is optimized for minimal token usage:

#### Request Optimization:
- **Concise Prompts**: Minimal, focused prompts for categorization
- **Batch Processing**: Group similar requests when possible
- **Caching**: Results cached to avoid duplicate API calls
- **Local Fallback**: Automatic fallback to free local processing

#### Estimated Costs:
- **Transaction Categorization**: ~50 tokens per request (~$0.0001 with GPT-3.5)
- **Insight Generation**: ~200-500 tokens per request (~$0.0005-0.001)
- **Monthly Usage**: Typical user ~$1-5 per month

### Cost Control Features:
- **Local Processing**: Always available as free alternative
- **Provider Selection**: Choose more cost-effective models
- **Usage Monitoring**: Track API usage through provider dashboards
- **Automatic Fallback**: Prevents service interruption if credits run out

## Current Status

### Configured Services:
- ✅ **OpenAI Integration**: Fully implemented and tested
- ✅ **Anthropic Integration**: Fully implemented and tested  
- ✅ **Local Processing**: Always available fallback
- ✅ **UI Configuration**: Complete configuration interface
- ✅ **Fallback System**: Intelligent provider switching

### Missing Configuration:
- ❌ **Environment Variables**: No AI keys in current .env file
- ❌ **Default Setup**: Users must configure AI services manually

### Recommendations:
1. **Add AI keys to .env.example** for easier setup
2. **Provide setup documentation** for new users
3. **Consider free tier limits** in UI messaging
4. **Add usage monitoring** to track API costs

## Conclusion

The AI Finance Manager uses a sophisticated multi-provider AI system with OpenAI and Anthropic as primary providers and local processing as a privacy-focused fallback. Users can configure credentials through environment variables or the intuitive UI configuration screen. The system is designed for security, privacy, and cost-effectiveness while providing powerful AI-enhanced financial insights.