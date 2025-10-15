# Testing Guide - Plaid Integration

## Overview

This guide covers testing strategies and procedures for the Plaid integration in the AI Finance Manager application.

## Test Environment Setup

### Prerequisites

1. **Backend Server Running**
   ```bash
   cd backend
   npm start
   ```
   Server should be running on `http://localhost:7777`

2. **Environment Configuration**
   - Ensure `.env` and `backend/.env` are properly configured
   - Verify Plaid sandbox credentials are set

3. **Dependencies Installed**
   ```bash
   npm install
   cd backend && npm install
   ```

## Testing Levels

### 1. Unit Tests

**Location**: `src/services/plaid/PlaidService.test.ts`

**Run Tests**:
```bash
npm test src/services/plaid/PlaidService.test.ts
```

**Test Coverage**:
- ✅ Plaid Link initialization
- ✅ Token creation and exchange
- ✅ Transaction synchronization
- ✅ Account fetching
- ✅ Investment data retrieval
- ✅ Liability tracking
- ✅ Error handling and retry logic
- ✅ Data transformation
- ✅ Token management

### 2. Integration Tests

**Backend Health Check**:
```bash
curl http://localhost:7777/health
```

**Expected Response**:
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development"
}
```

### 3. End-to-End Testing

#### Manual Testing with Plaid Link

1. **Start the Application**
   ```bash
   npm run dev
   ```

2. **Navigate to Plaid Test Component**
   - Open browser to `http://localhost:3000`
   - Navigate to Plaid testing interface

3. **Test Account Connection**
   - Click "Connect Account" button
   - Select "First Platypus Bank" (sandbox institution)
   - Use test credentials:
     - Username: `user_good`
     - Password: `pass_good`

4. **Verify Data Sync**
   - Check that accounts are loaded
   - Verify transactions are synced
   - Test investment data (if available)
   - Check liability information

## Test Scenarios

### Scenario 1: Successful Account Connection

**Steps**:
1. Initialize Plaid Link
2. Complete bank connection flow
3. Exchange public token for access token
4. Fetch account data

**Expected Results**:
- Link token created successfully
- User completes authentication
- Access token received and stored
- Account data retrieved and displayed

### Scenario 2: Transaction Synchronization

**Steps**:
1. Connect account (from Scenario 1)
2. Trigger transaction sync
3. Verify data transformation
4. Check deduplication logic

**Expected Results**:
- Transactions fetched from Plaid API
- Data properly transformed to app format
- Duplicate transactions handled correctly
- Transaction history displayed

### Scenario 3: Error Handling

**Steps**:
1. Test with invalid credentials
2. Test network failures
3. Test rate limiting scenarios
4. Test token expiration

**Expected Results**:
- User-friendly error messages displayed
- Retry logic activated when appropriate
- Graceful degradation of functionality
- Proper error logging

### Scenario 4: Investment and Liability Data

**Steps**:
1. Connect investment account
2. Fetch investment holdings
3. Retrieve liability information
4. Calculate net worth

**Expected Results**:
- Investment data properly retrieved
- Securities information included
- Liability balances calculated correctly
- Net worth computation accurate

## Test Data

### Sandbox Test Institutions

| Institution | ID | Features |
|-------------|----|---------| 
| First Platypus Bank | `ins_109508` | Full feature support |
| Tartan Bank | `ins_109509` | Basic accounts |
| Houndstooth Bank | `ins_109510` | Investment accounts |

### Test Credentials

| Scenario | Username | Password | Result |
|----------|----------|----------|--------|
| Success | `user_good` | `pass_good` | Successful connection |
| Invalid Credentials | `user_bad` | `pass_bad` | Authentication error |
| MFA Required | `user_good` | `pass_good` | Multi-factor auth flow |

### Expected Test Data

**Accounts**:
- Primary Checking: ~$2,500
- Savings Account: ~$15,000
- Credit Card: ~$1,250 balance
- Investment Account: ~$25,000

**Transactions**:
- 30-90 days of transaction history
- Mix of income and expenses
- Various categories (food, shopping, etc.)

## Automated Testing

### Running All Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test PlaidService.test.ts
```

### Continuous Integration

The test suite should be run on:
- Every pull request
- Before deployment
- Nightly builds

### Test Configuration

**Vitest Configuration** (`vitest.config.ts`):
```typescript
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'src/test/']
    }
  }
});
```

## Performance Testing

### Load Testing

Test the system under various loads:

1. **Concurrent Connections**
   - Multiple users connecting accounts simultaneously
   - Measure response times and error rates

2. **Data Sync Performance**
   - Large transaction datasets
   - Multiple account synchronization
   - Memory usage monitoring

3. **API Rate Limits**
   - Test Plaid API rate limiting
   - Verify retry logic effectiveness
   - Monitor queue performance

### Benchmarks

Target performance metrics:
- Link token creation: < 2 seconds
- Account connection: < 5 seconds
- Transaction sync (90 days): < 10 seconds
- Error recovery: < 3 retry attempts

## Security Testing

### Authentication Testing

1. **Token Security**
   - Verify tokens are properly encrypted
   - Test token expiration handling
   - Check for token leakage in logs

2. **API Security**
   - Verify HTTPS usage
   - Test CORS configuration
   - Check for sensitive data exposure

3. **Input Validation**
   - Test malformed requests
   - Verify parameter sanitization
   - Check for injection vulnerabilities

## Debugging and Troubleshooting

### Common Test Failures

1. **Backend Connection Issues**
   ```bash
   # Check if backend is running
   curl http://localhost:7777/health
   
   # Check backend logs
   cd backend && npm run dev
   ```

2. **Environment Configuration**
   ```bash
   # Verify environment variables
   echo $VITE_PLAID_CLIENT_ID
   echo $VITE_PLAID_ENV
   ```

3. **Test Data Issues**
   - Clear browser storage
   - Reset test database
   - Verify sandbox credentials

### Debug Tools

1. **Browser Developer Tools**
   - Network tab for API calls
   - Console for error messages
   - Application tab for stored data

2. **Backend Logging**
   ```javascript
   // Enable debug logging
   process.env.DEBUG = 'plaid:*'
   ```

3. **Plaid Dashboard**
   - Monitor API usage
   - Check error rates
   - Review webhook logs

## Test Maintenance

### Regular Updates

1. **Dependency Updates**
   - Keep Plaid SDK updated
   - Update test frameworks
   - Review security patches

2. **Test Data Refresh**
   - Update sandbox credentials if needed
   - Refresh test scenarios
   - Add new test cases for features

3. **Documentation Updates**
   - Keep test procedures current
   - Update expected results
   - Document new test scenarios

### Quality Metrics

Track these metrics:
- Test coverage percentage (target: >80%)
- Test execution time
- Flaky test identification
- Bug detection rate

## Reporting

### Test Reports

Generate reports for:
- Test execution results
- Coverage analysis
- Performance benchmarks
- Security scan results

### Monitoring

Set up monitoring for:
- Test suite execution times
- Failure rates by test category
- API response times
- Error frequency

This comprehensive testing approach ensures the Plaid integration is robust, secure, and performs well under various conditions.