// Simple test to verify backend dependencies
console.log('🔍 Testing backend dependencies...');

try {
  require('express');
  console.log('✅ Express: OK');
} catch (e) {
  console.log('❌ Express: Missing');
}

try {
  require('cors');
  console.log('✅ CORS: OK');
} catch (e) {
  console.log('❌ CORS: Missing');
}

try {
  require('dotenv');
  console.log('✅ Dotenv: OK');
} catch (e) {
  console.log('❌ Dotenv: Missing');
}

try {
  require('plaid');
  console.log('✅ Plaid SDK: OK');
} catch (e) {
  console.log('❌ Plaid SDK: Missing');
}

console.log('🚀 Starting server...');

// Add timeout to prevent hanging
const startTimeout = setTimeout(() => {
  console.error('❌ Server startup timeout (30 seconds)');
  process.exit(1);
}, 30000);

try {
  require('./server.js');
  clearTimeout(startTimeout);
} catch (error) {
  clearTimeout(startTimeout);
  console.error('❌ Failed to start server:', error.message);
  process.exit(1);
}