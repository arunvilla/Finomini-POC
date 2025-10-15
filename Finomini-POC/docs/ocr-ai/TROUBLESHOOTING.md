# Troubleshooting Guide

## Common Issues and Solutions

This guide helps you diagnose and resolve common issues with the OCR and AI systems.

## OCR Issues

### 🔴 OCR Processing Fails

#### Symptoms:
- Error messages during image upload
- No text extracted from clear receipts
- App crashes during OCR processing

#### Diagnosis:
```typescript
// Check OCR service status
const status = ocrService.getStatus();
console.log(status);
// Expected: { isInitialized: true, isReady: true, workerStatus: 'active' }
```

#### Solutions:
1. **Check Image Format**:
   ```typescript
   // Supported formats
   const supportedFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp'];
   if (!supportedFormats.includes(file.type)) {
     console.error('Unsupported image format');
   }
   ```

2. **Verify File Size**:
   ```typescript
   const maxSize = 10 * 1024 * 1024; // 10MB
   if (file.size > maxSize) {
     console.error('File too large');
   }
   ```

3. **Restart OCR Service**:
   ```typescript
   await ocrService.terminate();
   await ocrService.initialize();
   ```

### 🔴 Poor OCR Accuracy

#### Symptoms:
- Incorrect text extraction
- Missing merchant names or amounts
- Garbled or incomplete data

#### Diagnosis:
```typescript
// Check confidence scores
const result = await ocrService.extractText(imageFile);
console.log('Confidence:', result.confidence);
// Low confidence (< 0.7) indicates poor image quality
```

#### Solutions:
1. **Improve Image Quality**:
   - Use well-lit, clear images
   - Ensure receipt is flat and straight
   - Avoid blurry or low-resolution images
   - Try different lighting conditions

2. **Adjust Processing Options**:
   ```typescript
   const options = {
     enhanceContrast: true,
     sharpen: true,
     grayscale: true,
     removeNoise: false // Keep false for receipts
   };
   const result = await ocrService.extractText(imageFile, options);
   ```

3. **Try Different Image Formats**:
   - Convert to PNG for better quality
   - Resize image to optimal dimensions (800x600)
   - Increase image resolution if too small

### 🔴 OCR Worker Initialization Fails

#### Symptoms:
- "OCR initialization failed" error
- Worker not starting
- Tesseract.js errors in console

#### Diagnosis:
```typescript
// Check browser compatibility
if (!window.Worker) {
  console.error('Web Workers not supported');
}
if (!document.createElement('canvas').getContext) {
  console.error('Canvas API not supported');
}
```

#### Solutions:
1. **Update Browser**: Ensure modern browser with Web Worker support
2. **Clear Browser Cache**: Remove cached Tesseract.js files
3. **Check Network**: Ensure Tesseract.js can download required files
4. **Try Different Browser**: Test in Chrome, Firefox, or Edge

## AI Issues

### 🔴 "No API Provider Available" Error

#### Symptoms:
- AI features not working
- Categorization falls back to local processing
- API connection test fails

#### Diagnosis:
```typescript
// Check AI service status
const status = aiService.getStatus();
console.log(status);
// Check: hasOpenAI, hasAnthropic, preferredProvider
```

#### Solutions:
1. **Verify API Keys**:
   ```bash
   # Check .env file
   VITE_OPENAI_API_KEY=sk-... # Should start with 'sk-'
   VITE_ANTHROPIC_API_KEY=sk-ant-... # Should start with 'sk-ant-'
   ```

2. **Test API Keys**:
   - OpenAI: Visit [platform.openai.com](https://platform.openai.com/api-keys)
   - Anthropic: Visit [console.anthropic.com](https://console.anthropic.com/)
   - Verify keys are active and have credits

3. **Configure via UI**:
   - Open AI Configuration screen
   - Enter API keys manually
   - Test connection immediately

### 🔴 AI API Calls Failing

#### Symptoms:
- "OpenAI API test failed: 401" errors
- "Anthropic API test failed: 403" errors
- Intermittent AI failures

#### Diagnosis:
```typescript
// Test API connection manually
try {
  const result = await aiService.categorizeTransaction('Test Store', 10.00);
  console.log('AI working:', result);
} catch (error) {
  console.error('AI error:', error.message);
}
```

#### Solutions:
1. **Check API Key Format**:
   - OpenAI: Must start with `sk-` (not `sk-proj-` for older keys)
   - Anthropic: Must start with `sk-ant-`
   - No extra spaces or characters

2. **Verify Billing/Credits**:
   - OpenAI: Check billing setup and usage limits
   - Anthropic: Ensure sufficient credits available
   - Monitor usage in provider dashboards

3. **Rate Limiting**:
   ```typescript
   // The service includes automatic rate limiting
   // Wait between requests if hitting limits
   await new Promise(resolve => setTimeout(resolve, 1000));
   ```

### 🔴 Poor AI Categorization Accuracy

#### Symptoms:
- Wrong transaction categories
- Low confidence scores
- Inconsistent results

#### Diagnosis:
```typescript
// Check categorization details
const result = await aiService.categorizeTransaction(
  'WALMART SUPERCENTER',
  45.67
);
console.log('Category:', result.category, 'Confidence:', result.confidence);
```

#### Solutions:
1. **Improve Input Data**:
   - Ensure clear merchant names from OCR
   - Verify amounts are reasonable
   - Check for OCR errors in merchant text

2. **Try Different Models**:
   ```typescript
   // Switch to more powerful model
   aiService.updateConfig({
     openaiModel: 'gpt-4', // Instead of gpt-3.5-turbo
     anthropicModel: 'claude-3-sonnet-20240229' // Instead of haiku
   });
   ```

3. **Use Local Processing**:
   ```typescript
   // Fallback to local categorization
   aiService.setPreferredProvider('local');
   ```

## Performance Issues

### 🔴 Slow Processing

#### Symptoms:
- Long wait times for OCR processing
- UI freezing during processing
- Timeout errors

#### Diagnosis:
```typescript
// Measure processing time
const startTime = Date.now();
const result = await ocrService.processReceipt(imageFile);
const processingTime = Date.now() - startTime;
console.log('Processing took:', processingTime, 'ms');
```

#### Solutions:
1. **Optimize Images**:
   ```typescript
   // Resize large images
   const options = {
     resize: { width: 800, height: 600 },
     grayscale: true
   };
   ```

2. **Use Batch Processing**:
   ```typescript
   // Process multiple receipts efficiently
   const results = await ocrService.processReceiptBatch(imageFiles);
   ```

3. **Monitor Memory Usage**:
   - Close other browser tabs
   - Restart browser if memory issues
   - Use smaller image files

### 🔴 Memory Issues

#### Symptoms:
- Browser crashes
- "Out of memory" errors
- Slow performance over time

#### Solutions:
1. **Cleanup Resources**:
   ```typescript
   // Properly cleanup after processing
   await ocrService.cleanup();
   ```

2. **Process Smaller Batches**:
   ```typescript
   // Limit concurrent processing
   const batchSize = 5;
   for (let i = 0; i < files.length; i += batchSize) {
     const batch = files.slice(i, i + batchSize);
     await ocrService.processReceiptBatch(batch);
   }
   ```

3. **Optimize Images**:
   - Compress images before processing
   - Use appropriate image formats
   - Limit image dimensions

## Configuration Issues

### 🔴 Environment Variables Not Working

#### Symptoms:
- API keys not loading from .env
- Local storage configuration required
- Environment variables ignored

#### Diagnosis:
```typescript
// Check environment variable loading
console.log('OpenAI Key:', import.meta.env.VITE_OPENAI_API_KEY ? 'Set' : 'Not set');
console.log('Anthropic Key:', import.meta.env.VITE_ANTHROPIC_API_KEY ? 'Set' : 'Not set');
```

#### Solutions:
1. **Check .env File Location**:
   ```bash
   # .env file must be in project root
   project-root/
   ├── .env                 # ✅ Correct location
   ├── src/
   │   └── .env            # ❌ Wrong location
   ```

2. **Verify Variable Names**:
   ```bash
   # Must use VITE_ prefix for Vite
   VITE_OPENAI_API_KEY=sk-...     # ✅ Correct
   OPENAI_API_KEY=sk-...          # ❌ Wrong (missing VITE_)
   ```

3. **Restart Development Server**:
   ```bash
   # Environment changes require restart
   npm run dev
   ```

### 🔴 Local Storage Issues

#### Symptoms:
- Configuration not persisting
- API keys lost on refresh
- Settings reset unexpectedly

#### Diagnosis:
```typescript
// Check local storage
console.log('OpenAI Key in storage:', localStorage.getItem('openai_api_key'));
console.log('Preferred provider:', localStorage.getItem('preferred_ai_provider'));
```

#### Solutions:
1. **Check Browser Settings**:
   - Ensure local storage enabled
   - Check privacy/security settings
   - Disable incognito mode

2. **Clear and Reset**:
   ```typescript
   // Clear corrupted storage
   localStorage.removeItem('openai_api_key');
   localStorage.removeItem('anthropic_api_key');
   localStorage.removeItem('preferred_ai_provider');
   ```

3. **Use Environment Variables**:
   - More reliable than local storage
   - Automatic loading on app start
   - Version control friendly

## Browser Compatibility Issues

### 🔴 Features Not Working in Specific Browsers

#### Symptoms:
- OCR fails in Safari
- AI features not working in older browsers
- Canvas API errors

#### Solutions:
1. **Update Browser**: Ensure latest version
2. **Enable Required Features**:
   - Web Workers
   - Canvas API
   - File API
   - Local Storage

3. **Try Different Browser**:
   - Chrome (recommended)
   - Firefox
   - Edge
   - Safari (latest version)

### 🔴 Mobile Browser Issues

#### Symptoms:
- Poor performance on mobile
- Memory issues on phones
- Touch interface problems

#### Solutions:
1. **Optimize for Mobile**:
   - Use smaller images
   - Reduce batch sizes
   - Enable mobile-specific optimizations

2. **Use Desktop Browser**: For best performance and full features

## Network Issues

### 🔴 AI API Connection Problems

#### Symptoms:
- Intermittent AI failures
- Timeout errors
- Network connectivity issues

#### Solutions:
1. **Check Internet Connection**: Ensure stable connection
2. **Verify API Endpoints**:
   - OpenAI: `https://api.openai.com/v1`
   - Anthropic: `https://api.anthropic.com/v1`

3. **Use Local Processing**: As fallback when network unavailable

## Debugging Tools

### Enable Debug Logging
```typescript
// Enable detailed logging
localStorage.setItem('debug', 'true');

// Check service status
console.log('OCR Status:', ocrService.getStatus());
console.log('AI Status:', aiService.getStatus());
```

### Test with Sample Data
```typescript
// Use provided test receipts
const sampleReceipts = [
  'src/test/assets/sample-receipt-1.txt',
  'src/test/assets/sample-receipt-2.txt',
  'src/test/assets/sample-receipt-3.txt'
];
```

### Run Test Suite
```bash
# Run comprehensive tests
npm test src/services/ocr/OCRService.test.ts
npm test src/services/ai/AIService.test.ts
```

## Getting Additional Help

### 1. Check Documentation
- [OCR Implementation Guide](./OCR_IMPLEMENTATION.md)
- [AI Services Guide](./AI_SERVICES_AND_CREDENTIALS.md)
- [FAQ](./FAQ.md)

### 2. Review Test Results
- [OCR Test Summary](./OCR_TEST_SUMMARY.md)
- Check test logs for similar issues

### 3. Examine Code Examples
- Look at test cases for working examples
- Review service implementations
- Check configuration patterns

### 4. Verify System Requirements
- Modern browser with required APIs
- Stable internet connection (for AI features)
- Sufficient device memory and processing power

---

**Still having issues?** Review the [FAQ](./FAQ.md) or check the comprehensive documentation in this folder for additional guidance.