# Plaid Sandbox Setup Guide

This guide will help you set up the AI Finance Manager with Plaid Sandbox environment for safe testing.

## 🔐 Sandbox Configuration

- **Client ID**: `6749ef2ed74216001aa5b99d`
- **Sandbox Secret**: `466dd340e03567184f38d1b5899bd1`
- **Environment**: `sandbox`
- **Custom Users**: Available via [Plaid Sandbox Custom Users](https://github.com/plaid/sandbox-custom-users)

## 🚀 Quick Start

### 1. Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment variables are already configured:**
   ```env
   PLAID_CLIENT_ID=6749ef2ed74216001aa5b99d
   PLAID_SECRET=466dd340e03567184f38d1b5899bd1
   PLAID_ENV=sandbox
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   🚀 AI Finance Manager Backend running on port 7777
   📊 Environment: development
   🔗 Plaid Environment: sandbox
   ```

### 2. Frontend Setup

1. **Frontend is already configured for sandbox:**
   ```env
   VITE_PLAID_CLIENT_ID=6749ef2ed74216001aa5b99d
   VITE_PLAID_ENV=sandbox
   VITE_API_BASE_URL=http://localhost:7777/api
   ```

2. **Start the frontend:**
   ```bash
   npm run dev
   ```

## 🧪 Testing with Sandbox

### 1. Test Backend Health

Visit: http://localhost:7777/health

You should see:
```json
{
  "status": "OK",
  "timestamp": "2024-10-14T...",
  "environment": "development"
}
```

### 2. Test Plaid Connection

1. Open the frontend application
2. Navigate to "Add Account" or "Bank Connections"
3. Click "Connect Bank Account"
4. You should see the Plaid Link interface with sandbox institutions

### 3. Use Sandbox Test Accounts

The sandbox environment provides test institutions and accounts:

#### Test Institution: First Platypus Bank
- **Username**: `user_good`
- **Password**: `pass_good`
- **Accounts**: Checking, Savings, Credit Card

#### Test Institution: Tartan Bank
- **Username**: `user_good`
- **Password**: `pass_good`
- **Accounts**: Multiple account types with transaction history

#### Custom Users (Advanced Testing)
For more realistic testing scenarios, use the [Plaid Sandbox Custom Users](https://github.com/plaid/sandbox-custom-users):

- **Rich Transaction History**: Users with 2+ years of transactions
- **Multiple Account Types**: Checking, savings, credit, investment accounts
- **Realistic Data**: Real merchant names, categories, and spending patterns
- **Edge Cases**: Accounts with specific scenarios for testing

## 🏗️ Architecture Overview

```
Frontend (React)           Backend (Express)         Plaid Sandbox API
     │                          │                       │
     ├─ PlaidLinkButton ────────┼─ POST /link-token ────┼─ Create Link Token
     │                          │                       │
     ├─ usePlaidLink Hook ──────┼─ POST /exchange-token ┼─ Exchange Public Token
     │                          │                       │
     ├─ PlaidApiService ────────┼─ POST /accounts ──────┼─ Get Test Accounts
     │                          │                       │
     ├─ PlaidDashboard ─────────┼─ POST /transactions ──┼─ Get Test Transactions
     │                          │                       │
     └─ Account Management ─────┼─ POST /investments ───┼─ Get Test Investments
                                │                       │
                                └─ POST /remove-item ───┼─ Disconnect Account
```

## 🔒 Security Features

### Sandbox Safety
- ✅ No real financial data accessed
- ✅ Safe for development and testing
- ✅ No risk to actual bank accounts
- ✅ Unlimited API calls for testing

### Backend Security
- ✅ CORS protection configured
- ✅ Rate limiting (100 requests/15 minutes)
- ✅ Request validation middleware
- ✅ Secure error handling

### Frontend Security
- ✅ No sensitive credentials in client code
- ✅ Encrypted token storage
- ✅ Secure API communication
- ✅ Input validation with Zod schemas

## 📊 Available Test Data

With sandbox setup, you can test:

### Account Information
- Multiple account types (checking, savings, credit, investment)
- Realistic account balances
- Institution information
- Account metadata

### Transaction Data
- Rich transaction history (up to 2 years)
- Real merchant names and categories
- Various transaction types and amounts
- Pending vs. posted transactions
- Recurring transactions

### Investment Data
- Portfolio holdings with real securities
- Stock, ETF, and mutual fund data
- Current market values
- Performance metrics

## 🛠️ Development Features

### Sandbox Benefits
- **Instant Setup**: No bank account verification needed
- **Consistent Data**: Same test data every time
- **Edge Cases**: Test error scenarios safely
- **Unlimited Testing**: No API rate limits for development
- **Rich Data**: Realistic transaction patterns

### Custom User Scenarios
Using the custom users repository, you can test:
- High-net-worth individuals
- College students with limited income
- Families with multiple income sources
- Users with investment portfolios
- Edge cases like overdrafts and credit issues

## 🔄 Data Flow

1. **User clicks "Connect Account"**
2. **Frontend requests link token from backend**
3. **Backend creates sandbox link token**
4. **User selects test institution**
5. **User enters test credentials**
6. **Frontend receives public token**
7. **Backend exchanges for sandbox access token**
8. **Backend fetches test data from Plaid Sandbox**
9. **Test data is displayed in the UI**

## 🧪 Testing Scenarios

### Basic Flow Testing
1. Connect a test bank account
2. Sync transactions and accounts
3. Test categorization and insights
4. Test OCR receipt scanning
5. Test budget creation and tracking

### Advanced Testing
1. Test multiple account connections
2. Test investment portfolio sync
3. Test error handling scenarios
4. Test data export/import
5. Test AI-powered insights

### Error Scenario Testing
- Invalid credentials
- Network timeouts
- API rate limiting
- Malformed responses
- Account disconnection

## 📈 Monitoring & Development

### Health Checks
- Backend: `GET /health`
- Monitor API response times
- Track sandbox API usage

### Development Tools
- Plaid Sandbox Dashboard
- Browser developer tools
- Backend logging
- Frontend error boundaries

## 🆘 Troubleshooting

### Common Issues

1. **"Invalid credentials" error**
   - Use sandbox test credentials: `user_good` / `pass_good`
   - Ensure environment is set to `sandbox`

2. **No institutions showing**
   - Verify `PLAID_ENV=sandbox` in backend
   - Check network connectivity

3. **Backend connection issues**
   - Ensure backend is running on port 7777
   - Check `VITE_API_BASE_URL` in frontend .env

### Getting Help

1. **Plaid Sandbox Documentation**: https://plaid.com/docs/sandbox/
2. **Custom Users Repository**: https://github.com/plaid/sandbox-custom-users
3. **Plaid API Reference**: https://plaid.com/docs/api/

## ✅ Development Checklist

Before moving to production:

- [ ] All sandbox features working correctly
- [ ] Error handling tested thoroughly
- [ ] UI/UX flows validated
- [ ] Performance optimized
- [ ] Security measures implemented
- [ ] Code reviewed and tested
- [ ] Documentation updated
- [ ] Production credentials secured separately

## 🎉 Ready for Development!

Your AI Finance Manager is now configured with Plaid Sandbox for safe development and testing. You can connect test accounts, sync transaction data, and test all features without any risk to real financial data.

## 🚀 Next Steps

1. **Test Basic Functionality**: Connect a test account and sync data
2. **Explore Custom Users**: Try different user scenarios from the repository
3. **Test Edge Cases**: Verify error handling and edge scenarios
4. **Optimize Performance**: Test with large datasets
5. **Prepare for Production**: Plan production deployment strategy