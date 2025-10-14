// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Plaid specific errors
  if (err.response && err.response.data) {
    const plaidError = err.response.data;
    return res.status(400).json({
      success: false,
      error: {
        type: 'plaid_error',
        code: plaidError.error_code,
        message: plaidError.error_message,
        display_message: plaidError.display_message,
      },
    });
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: {
        type: 'validation_error',
        message: err.message,
        details: err.details,
      },
    });
  }

  // Default error
  res.status(500).json({
    success: false,
    error: {
      type: 'server_error',
      message: process.env.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : err.message,
    },
  });
};

module.exports = { errorHandler };