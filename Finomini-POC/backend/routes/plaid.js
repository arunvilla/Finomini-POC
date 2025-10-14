// Plaid API Routes
const express = require('express');
const router = express.Router();
const plaidService = require('../services/plaidService');
const { asyncHandler } = require('../middleware/asyncHandler');
const { validateRequest } = require('../middleware/validation');

// Create link token
router.post('/link-token', asyncHandler(async (req, res) => {
  const { user_id } = req.body;
  
  const result = await plaidService.createLinkToken(user_id);
  
  res.json({
    success: true,
    data: result,
  });
}));

// Exchange public token for access token
router.post('/exchange-token', 
  validateRequest(['public_token']),
  asyncHandler(async (req, res) => {
    const { public_token } = req.body;
    
    const result = await plaidService.exchangePublicToken(public_token);
    
    res.json({
      success: true,
      data: result,
    });
  })
);

// Get accounts
router.post('/accounts',
  validateRequest(['access_token']),
  asyncHandler(async (req, res) => {
    const { access_token } = req.body;
    
    const result = await plaidService.getAccounts(access_token);
    
    res.json({
      success: true,
      data: result,
    });
  })
);

// Get transactions
router.post('/transactions',
  validateRequest(['access_token', 'start_date', 'end_date']),
  asyncHandler(async (req, res) => {
    const { access_token, start_date, end_date, count, offset } = req.body;
    
    const result = await plaidService.getTransactions(
      access_token, 
      start_date, 
      end_date, 
      { count, offset }
    );
    
    res.json({
      success: true,
      data: result,
    });
  })
);

// Get investments
router.post('/investments',
  validateRequest(['access_token']),
  asyncHandler(async (req, res) => {
    const { access_token } = req.body;
    
    const result = await plaidService.getInvestments(access_token);
    
    res.json({
      success: true,
      data: result,
    });
  })
);

// Get liabilities
router.post('/liabilities',
  validateRequest(['access_token']),
  asyncHandler(async (req, res) => {
    const { access_token } = req.body;
    
    const result = await plaidService.getLiabilities(access_token);
    
    res.json({
      success: true,
      data: result,
    });
  })
);

// Remove item (disconnect account)
router.post('/remove-item',
  validateRequest(['access_token']),
  asyncHandler(async (req, res) => {
    const { access_token } = req.body;
    
    const result = await plaidService.removeItem(access_token);
    
    res.json({
      success: true,
      data: result,
    });
  })
);

// Get item status
router.post('/item-status',
  validateRequest(['access_token']),
  asyncHandler(async (req, res) => {
    const { access_token } = req.body;
    
    const result = await plaidService.getItemStatus(access_token);
    
    res.json({
      success: true,
      data: result,
    });
  })
);

// Refresh transactions
router.post('/refresh-transactions',
  validateRequest(['access_token']),
  asyncHandler(async (req, res) => {
    const { access_token } = req.body;
    
    const result = await plaidService.refreshTransactions(access_token);
    
    res.json({
      success: true,
      data: result,
    });
  })
);

module.exports = router;