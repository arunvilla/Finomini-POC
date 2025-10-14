# AI Finance Manager Backend

Backend API server for the AI Finance Manager application with secure Plaid integration.

## Features

- 🔐 Secure Plaid API integration
- 🛡️ Production-ready security (CORS, rate limiting, helmet)
- 📊 Complete financial data endpoints (accounts, transactions, investments)
- ⚡ Fast and reliable API responses
- 🔄 Automatic error handling and validation

## Prerequisites

- Node.js 16+ 
- npm or yarn
- Plaid account with production credentials

## Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your actual values:
   ```env
   PLAID_CLIENT_ID=your_plaid_client_id
   PLAID_SECRET=your_plaid_secret
   PLAID_ENV=production
   PORT=3001
   JWT_SECRET=your_secure_jwt_secret
   ENCRYPTION_KEY=your_32_character_encryption_key
   ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
   ```

3. **Start the server:**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Plaid Integration

- `POST /api/plaid/link-token` - Create Plaid Link token
- `POST /api/plaid/exchange-token` - Exchange public token for access token
- `POST /api/plaid/accounts` - Get account information
- `POST /api/plaid/transactions` - Get transaction history
- `POST /api/plaid/investments` - Get investment holdings
- `POST /api/plaid/liabilities` - Get liability information
- `POST /api/plaid/remove-item` - Disconnect account
- `POST /api/plaid/item-status` - Get connection status
- `POST /api/plaid/refresh-transactions` - Force transaction refresh

### Health Check

- `GET /health` - Server health status

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configurable allowed origins
- **Helmet Security**: Security headers and protection
- **Input Validation**: Request validation middleware
- **Error Handling**: Secure error responses

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PLAID_CLIENT_ID` | Your Plaid Client ID | Yes |
| `PLAID_SECRET` | Your Plaid Secret Key | Yes |
| `PLAID_ENV` | Plaid environment (sandbox/development/production) | Yes |
| `PORT` | Server port (default: 3001) | No |
| `NODE_ENV` | Node environment (development/production) | No |
| `JWT_SECRET` | Secret for JWT tokens | Yes |
| `ENCRYPTION_KEY` | 32-character encryption key | Yes |
| `ALLOWED_ORIGINS` | Comma-separated allowed CORS origins | Yes |
| `PLAID_WEBHOOK_URL` | Webhook URL for Plaid events | No |

## Production Deployment

1. **Set environment to production:**
   ```env
   NODE_ENV=production
   PLAID_ENV=production
   ```

2. **Use a process manager:**
   ```bash
   # Using PM2
   npm install -g pm2
   pm2 start server.js --name "ai-finance-backend"
   
   # Using systemd (recommended for Linux servers)
   # Create a systemd service file
   ```

3. **Set up reverse proxy (nginx example):**
   ```nginx
   server {
       listen 80;
       server_name your-api-domain.com;
       
       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Enable HTTPS:**
   ```bash
   # Using Let's Encrypt
   sudo certbot --nginx -d your-api-domain.com
   ```

## Development

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Run tests
npm test

# Check for security vulnerabilities
npm audit
```

## Troubleshooting

### Common Issues

1. **Plaid API Errors:**
   - Verify your Client ID and Secret are correct
   - Check that your environment (sandbox/production) matches your credentials
   - Ensure your Plaid account has the required products enabled

2. **CORS Errors:**
   - Add your frontend URL to `ALLOWED_ORIGINS` in `.env`
   - Make sure the frontend is making requests to the correct backend URL

3. **Rate Limiting:**
   - Adjust rate limiting settings in `server.js` if needed
   - Consider implementing user-based rate limiting for production

### Logs

The server logs important information to the console:
- Server startup information
- API request/response details
- Error messages with stack traces (in development)

## Support

For issues related to:
- **Plaid Integration**: Check [Plaid Documentation](https://plaid.com/docs/)
- **API Issues**: Review the error logs and ensure proper request format
- **Security**: Follow security best practices and keep dependencies updated