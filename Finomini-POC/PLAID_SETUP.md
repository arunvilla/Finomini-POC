# Plaid Production Setup Guide

This guide will help you set up the AI Finance Manager with your production Plaid credentials.

## 🔐 Your Plaid Credentials

- **Client ID**: `6749ef2ed74216001aa5b99d`
- **Secret**: `bd79569200017e4b46fb3e0ee335d9`
- **Environment**: `production`

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

3. **Configure environment variables:**
   The `.env` file is already configured with your credentials:
   ```env
   PLAID_CLIENT_ID=6749ef2ed74216001aa5b99d
   PLAID_SECRET=bd79569200017e4b46fb3e0ee335d9
   PLAID_ENV=production
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   🚀 AI Finance Manager Backend running on port 3001
   📊 Environment: development
   🔗 Plaid Environment: production
   ```

### 2. Frontend Setup

1. **In the main project directory, the frontend is already configured:**
   ```env
   REACT_APP_PLAID_CLIENT_ID=6749ef2ed74216001aa5b99d
   REACT_APP_PLAID_ENV=production
   REACT_APP_API_BASE_URL=http://localhost:3001/api
   ```

2. **Start the frontend:**
   ```bash
   npm run dev
   ```

## 🔧 Testing the Integration

### 1. Test Backend Health

Visit: http://localhost:3001/health

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
4. You should see the Plaid Link interface with real bank options

### 3. Connect a Real Bank Account

⚠️ **Important**: Since you're using production credentials, you'll be connecting to real bank accounts. Make sure you:

1. Use your own bank account for testing
2. Understand that real transaction data will be accessed
3. Follow your organization's data handling policies

## 🏗️ Architecture Overview

```
Frontend (React)           Backend (Express)         Plaid API
     │                          │                       │
     ├─ PlaidLinkButton ────────┼─ POST /link-token ────┼─ Create Link Token
     │                          │                       │
     ├─ usePlaidLink Hook ──────┼─ POST /exchange-token ┼─ Exchange Public Token
     │                          │                       │
     ├─ PlaidApiService ────────┼─ POST /accounts ──────┼─ Get Accounts
     │                          │                       │
     ├─ PlaidDashboard ─────────┼─ POST /transactions ──┼─ Get Transactions
     │                          │                       │
     └─ Account Management ─────┼─ POST /investments ───┼─ Get Investments
                                │                       │
                                └─ POST /remove-item ───┼─ Disconnect Account
```

## 🔒 Security Features

### Backend Security
- ✅ Plaid credentials stored securely on server
- ✅ CORS protection configured
- ✅ Rate limiting (100 requests/15 minutes)
- ✅ Request validation middleware
- ✅ Secure error handling

### Frontend Security
- ✅ No sensitive credentials in client code
- ✅ Encrypted token storage
- ✅ Secure API communication
- ✅ Input validation with Zod schemas

## 📊 Available Data

With your production setup, you can access:

### Account Information
- Account balances (checking, savings, credit, investment)
- Account names and types
- Institution information
- Real-time balance updates

### Transaction Data
- Transaction history (up to 2 years)
- Merchant information
- Categories and subcategories
- Pending vs. posted transactions
- Transaction amounts and dates

### Investment Data
- Portfolio holdings
- Security information (stocks, ETFs, mutual funds)
- Current market values
- Performance metrics

## 🚨 Important Security Notes

1. **Never commit the `.env` files to version control**
2. **Rotate your Plaid secret regularly**
3. **Use HTTPS in production**
4. **Implement proper user authentication**
5. **Follow data retention policies**
6. **Monitor API usage and costs**

## 🔄 Data Flow

1. **User clicks "Connect Account"**
2. **Frontend requests link token from backend**
3. **Backend creates link token using Plaid API**
4. **User completes Plaid Link flow**
5. **Frontend receives public token**
6. **Frontend sends public token to backend**
7. **Backend exchanges for access token**
8. **Backend stores access token securely**
9. **Frontend syncs account data via backend**
10. **Data is displayed in the UI**

## 🛠️ Customization Options

### Plaid Products
Currently enabled:
- `transactions` - Transaction history
- `accounts` - Account information  
- `investments` - Investment holdings

### Additional Products Available
- `liabilities` - Loans and credit card debt
- `assets` - Asset verification
- `identity` - Account holder information
- `income` - Income verification

To enable additional products, update the `products` array in:
- `backend/services/plaidService.js`
- `src/hooks/usePlaidLink.ts`

## 📈 Monitoring & Maintenance

### Health Checks
- Backend: `GET /health`
- Monitor API response times
- Track error rates

### Plaid Dashboard
- Monitor API usage at https://dashboard.plaid.com
- Review webhook events
- Check for any API issues

### Logs
- Backend logs all API calls
- Frontend logs connection status
- Monitor for any error patterns

## 🆘 Troubleshooting

### Common Issues

1. **"Invalid credentials" error**
   - Verify Client ID and Secret are correct
   - Check environment matches credentials (production)

2. **CORS errors**
   - Ensure backend is running on port 3001
   - Check `ALLOWED_ORIGINS` in backend `.env`

3. **Connection timeouts**
   - Check network connectivity
   - Verify Plaid API status

4. **No institutions showing**
   - Confirm production environment is set
   - Check Plaid dashboard for account status

### Getting Help

1. **Plaid Documentation**: https://plaid.com/docs/
2. **Plaid Support**: Available through your dashboard
3. **API Status**: https://status.plaid.com/

## ✅ Production Checklist

Before deploying to production:

- [ ] Environment variables are secure
- [ ] HTTPS is enabled
- [ ] Rate limiting is appropriate
- [ ] Error handling is comprehensive
- [ ] Logging is configured
- [ ] Monitoring is set up
- [ ] Data backup strategy is in place
- [ ] Security audit is completed
- [ ] User authentication is implemented
- [ ] Data privacy compliance is verified

## 🎉 You're Ready!

Your AI Finance Manager is now configured with production Plaid integration. Users can connect their real bank accounts and access their financial data securely through your application.