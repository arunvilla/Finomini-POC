// Request validation middleware
const validateRequest = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = [];
    
    for (const field of requiredFields) {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    }
    
    if (missingFields.length > 0) {
      const error = new Error(`Missing required fields: ${missingFields.join(', ')}`);
      error.name = 'ValidationError';
      error.details = { missingFields };
      return next(error);
    }
    
    next();
  };
};

module.exports = { validateRequest };