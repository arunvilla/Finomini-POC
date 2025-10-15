# API Reference - Plaid Integration

## Overview

This document provides detailed API reference for the Plaid integration endpoints in the AI Finance Manager application.

## Base URLs

- **Frontend to Backend**: `http://localhost:7777/api`
- **Backend to Plaid**: `https://sandbox.plaid.com` (sandbox) / `https://production.plaid.com` (production)

## Authentication

All backend API calls require proper authentication headers and valid Plaid credentials.

### Headers

```http
Content-Type: application/json
PLAID-CLIENT-ID: {client_id}
PLAID-SECRET: {secret_key}
```

## Frontend API Endpoints

### 1. Create Link Token

Creates a link token for initializing Plaid Link.

**Endpoint**: `POST /api/plaid/link-token`

**Request Body**:
```json
{
  "user_id": "string" // Optional user identifier
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "link_token": "link-sandbox-12345...",
    "expiration": "2024-01-15T12:00:00Z",
    "request_id": "req_12345"
  }
}
```

**Error Response**:
```json
{
  "success": false,
  "error": {
    "type": "server_error",
    "message": "Link token creation failed: Request failed with status code 400"
  }
}
```

### 2. Exchange Public Token

Exchanges a public token for an access token.

**Endpoint**: `POST /api/plaid/exchange-token`

**Request Body**:
```json
{
  "public_token": "public-sandbox-12345..."
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "access_token": "access-sandbox-12345...",
    "item_id": "item_12345",
    "request_id": "req_12345"
  }
}
```

### 3. Get Accounts

Retrieves account information for a connected item.

**Endpoint**: `POST /api/plaid/accounts`

**Request Body**:
```json
{
  "access_token": "access-sandbox-12345..."
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "accounts": [
      {
        "account_id": "acc_12345",
        "name": "Primary Checking",
        "type": "depository",
        "subtype": "checking",
        "balances": {
          "available": 2500.50,
          "current": 2500.50,
          "limit": null,
          "iso_currency_code": "USD"
        },
        "mask": "0000",
        "official_name": "Primary Checking Account",
        "persistent_account_id": "persistent_acc_12345"
      }
    ],
    "item": {
      "item_id": "item_12345",
      "institution_id": "ins_109508",
      "webhook": null,
      "error": null,
      "available_products": ["transactions", "accounts"],
      "billed_products": ["transactions"]
    },
    "request_id": "req_12345"
  }
}
```

### 4. Get Transactions

Retrieves transaction data for specified date range.

**Endpoint**: `POST /api/plaid/transactions`

**Request Body**:
```json
{
  "access_token": "access-sandbox-12345...",
  "start_date": "2024-01-01",
  "end_date": "2024-01-31",
  "count": 500,
  "offset": 0
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "transaction_id": "tx_12345",
        "account_id": "acc_12345",
        "amount": 25.50,
        "date": "2024-01-15",
        "name": "Starbucks Coffee",
        "merchant_name": "Starbucks",
        "category": ["Food and Drink", "Restaurants", "Coffee Shop"],
        "category_id": "13005043",
        "pending": false,
        "account_owner": null,
        "location": {
          "address": "123 Main St",
          "city": "Anytown",
          "region": "CA",
          "postal_code": "12345",
          "country": "US",
          "lat": 37.7749,
          "lon": -122.4194,
          "store_number": "1234"
        },
        "payment_meta": {
          "reference_number": null,
          "ppd_id": null,
          "payee": null,
          "by_order_of": null,
          "payer": null,
          "payment_method": null,
          "payment_processor": null,
          "reason": null
        },
        "authorized_date": "2024-01-15",
        "authorized_datetime": "2024-01-15T10:30:00Z",
        "datetime": "2024-01-15T10:30:00Z",
        "transaction_code": null,
        "personal_finance_category": {
          "primary": "FOOD_AND_DRINK",
          "detailed": "FOOD_AND_DRINK_COFFEE"
        }
      }
    ],
    "accounts": [...], // Same format as accounts endpoint
    "total_transactions": 150,
    "request_id": "req_12345"
  }
}
```

### 5. Get Investments

Retrieves investment holdings and securities data.

**Endpoint**: `POST /api/plaid/investments`

**Request Body**:
```json
{
  "access_token": "access-sandbox-12345..."
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "accounts": [
      {
        "account_id": "acc_investment_12345",
        "name": "Investment Account",
        "type": "investment",
        "subtype": "brokerage",
        "balances": {
          "available": null,
          "current": 25680.75,
          "limit": null,
          "iso_currency_code": "USD"
        }
      }
    ],
    "holdings": [
      {
        "account_id": "acc_investment_12345",
        "security_id": "sec_12345",
        "institution_price": 150.25,
        "institution_price_as_of": "2024-01-15",
        "institution_value": 1502.50,
        "cost_basis": 1400.00,
        "quantity": 10,
        "iso_currency_code": "USD",
        "unofficial_currency_code": null
      }
    ],
    "securities": [
      {
        "security_id": "sec_12345",
        "isin": "US0378331005",
        "cusip": "037833100",
        "sedol": null,
        "institution_security_id": "AAPL",
        "institution_id": "ins_109508",
        "proxy_security_id": null,
        "name": "Apple Inc.",
        "ticker_symbol": "AAPL",
        "is_cash_equivalent": false,
        "type": "equity",
        "close_price": 150.25,
        "close_price_as_of": "2024-01-15",
        "iso_currency_code": "USD",
        "unofficial_currency_code": null,
        "update_datetime": "2024-01-15T16:00:00Z"
      }
    ],
    "request_id": "req_12345"
  }
}
```

### 6. Get Liabilities

Retrieves liability information (credit cards, mortgages, loans).

**Endpoint**: `POST /api/plaid/liabilities`

**Request Body**:
```json
{
  "access_token": "access-sandbox-12345..."
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "accounts": [...], // Account information
    "liabilities": {
      "credit": [
        {
          "account_id": "acc_credit_12345",
          "balances": {
            "available": 4500.00,
            "current": -1250.45,
            "limit": 5000.00,
            "iso_currency_code": "USD"
          },
          "aprs": [
            {
              "apr_percentage": 18.99,
              "apr_type": "purchase_apr",
              "balance_subject_to_apr": 1250.45,
              "interest_charge_amount": 25.50
            }
          ],
          "is_overdue": false,
          "last_payment_amount": 150.00,
          "last_payment_date": "2024-01-10",
          "last_statement_balance": 1100.45,
          "last_statement_issue_date": "2024-01-01",
          "minimum_payment_amount": 35.00,
          "next_payment_due_date": "2024-02-15"
        }
      ],
      "mortgage": [
        {
          "account_id": "acc_mortgage_12345",
          "current_balance": 285000.00,
          "interest_rate": {
            "percentage": 4.25,
            "type": "fixed"
          },
          "last_payment_amount": 1850.00,
          "last_payment_date": "2024-01-01",
          "loan_type_description": "conventional",
          "maturity_date": "2054-01-01",
          "next_monthly_payment": 1850.00,
          "next_payment_due_date": "2024-02-01",
          "origination_date": "2024-01-01",
          "origination_principal_amount": 300000.00,
          "past_due_amount": 0.00,
          "property_address": {
            "city": "Anytown",
            "country": "US",
            "postal_code": "12345",
            "region": "CA",
            "street": "123 Main St"
          },
          "ytd_interest_paid": 125.50,
          "ytd_principal_paid": 1724.50
        }
      ],
      "student": [
        {
          "account_id": "acc_student_12345",
          "balance": 15750.00,
          "guarantor": "DEPT OF ED",
          "interest_rate_percentage": 5.50,
          "is_overdue": false,
          "last_payment_amount": 175.00,
          "last_payment_date": "2024-01-10",
          "last_statement_balance": 15925.00,
          "last_statement_issue_date": "2024-01-01",
          "loan_name": "Federal Student Loan",
          "loan_status": {
            "type": "in_repayment",
            "end_date": null
          },
          "minimum_payment_amount": 175.00,
          "next_payment_due_date": "2024-02-10",
          "origination_date": "2020-09-01",
          "origination_principal_amount": 20000.00,
          "outstanding_interest_amount": 125.50,
          "payment_reference_number": "12345",
          "pslf_status": {
            "estimated_eligibility_date": null,
            "payments_made": 0,
            "payments_remaining": null
          },
          "repayment_plan": {
            "description": "Standard Repayment",
            "type": "standard"
          },
          "sequence_number": "1",
          "servicer_address": {
            "city": "Servicer City",
            "country": "US",
            "postal_code": "54321",
            "region": "NY",
            "street": "456 Servicer St"
          },
          "ytd_interest_paid": 550.00,
          "ytd_principal_paid": 1200.00
        }
      ]
    },
    "request_id": "req_12345"
  }
}
```

### 7. Remove Item

Disconnects/removes a connected account.

**Endpoint**: `POST /api/plaid/remove-item`

**Request Body**:
```json
{
  "access_token": "access-sandbox-12345..."
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "removed": true,
    "request_id": "req_12345"
  }
}
```

### 8. Get Item Status

Retrieves the status of a connected item.

**Endpoint**: `POST /api/plaid/item-status`

**Request Body**:
```json
{
  "access_token": "access-sandbox-12345..."
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "item": {
      "item_id": "item_12345",
      "institution_id": "ins_109508",
      "webhook": "https://example.com/webhook",
      "error": null,
      "available_products": ["transactions", "accounts", "investments"],
      "billed_products": ["transactions"],
      "consent_expiration_time": null,
      "update_type": "background"
    },
    "status": {
      "investments": {
        "last_successful_update": "2024-01-15T10:00:00Z",
        "last_failed_update": null
      },
      "transactions": {
        "last_successful_update": "2024-01-15T10:00:00Z",
        "last_failed_update": null
      },
      "last_webhook": {
        "sent_at": "2024-01-15T10:00:00Z",
        "code_sent": "DEFAULT_UPDATE"
      }
    },
    "request_id": "req_12345"
  }
}
```

### 9. Refresh Transactions

Forces a refresh of transaction data.

**Endpoint**: `POST /api/plaid/refresh-transactions`

**Request Body**:
```json
{
  "access_token": "access-sandbox-12345..."
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "request_id": "req_12345"
  }
}
```

## Error Responses

### Standard Error Format

```json
{
  "success": false,
  "error": {
    "type": "error_type",
    "message": "Human readable error message",
    "details": {
      "error_code": "PLAID_ERROR_CODE",
      "error_type": "PLAID_ERROR_TYPE",
      "error_message": "Detailed error message",
      "display_message": "User-friendly message",
      "request_id": "req_12345"
    }
  }
}
```

### Common Error Types

| Error Type | Description | Resolution |
|------------|-------------|------------|
| `INVALID_REQUEST` | Malformed request | Check request format |
| `INVALID_CREDENTIALS` | Wrong login credentials | Re-authenticate user |
| `INVALID_ACCESS_TOKEN` | Token expired/invalid | Reconnect account |
| `ITEM_LOGIN_REQUIRED` | Re-authentication needed | Use Link update mode |
| `RATE_LIMIT_EXCEEDED` | Too many requests | Implement backoff |
| `API_ERROR` | Plaid API error | Retry request |
| `INSTITUTION_ERROR` | Bank unavailable | Try again later |

## Rate Limits

### Plaid API Limits

- **Sandbox**: 100 requests per minute
- **Development**: 100 requests per minute  
- **Production**: Varies by plan

### Best Practices

1. **Implement Exponential Backoff**: Retry failed requests with increasing delays
2. **Cache Responses**: Store frequently accessed data
3. **Batch Requests**: Combine multiple operations when possible
4. **Monitor Usage**: Track API usage to avoid limits

## Webhooks

### Webhook Types

| Type | Code | Description |
|------|------|-------------|
| `TRANSACTIONS` | `DEFAULT_UPDATE` | New transaction data available |
| `TRANSACTIONS` | `INITIAL_UPDATE` | Initial transaction data ready |
| `TRANSACTIONS` | `HISTORICAL_UPDATE` | Historical data updated |
| `TRANSACTIONS` | `TRANSACTIONS_REMOVED` | Transactions removed |
| `ITEM` | `ERROR` | Item error occurred |
| `ITEM` | `PENDING_EXPIRATION` | Item will expire soon |

### Webhook Payload Example

```json
{
  "webhook_type": "TRANSACTIONS",
  "webhook_code": "DEFAULT_UPDATE",
  "item_id": "item_12345",
  "error": null,
  "new_transactions": 5,
  "removed_transactions": [],
  "environment": "sandbox"
}
```

## SDK Integration

### Frontend (React)

```typescript
import { usePlaidLink } from 'react-plaid-link';

const config = {
  token: linkToken,
  onSuccess: (public_token, metadata) => {
    // Handle successful connection
  },
  onExit: (err, metadata) => {
    // Handle exit/error
  },
  onEvent: (eventName, metadata) => {
    // Handle events
  }
};

const { open, ready } = usePlaidLink(config);
```

### Backend (Node.js)

```javascript
const { PlaidApi, Configuration, PlaidEnvironments } = require('plaid');

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const client = new PlaidApi(configuration);
```

This API reference provides comprehensive documentation for integrating with the Plaid service in the AI Finance Manager application.