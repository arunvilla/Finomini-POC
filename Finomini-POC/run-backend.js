// Simple script to run backend on Replit
const { spawn } = require('child_process');

console.log('🚀 Starting AI Finance Manager Backend...\n');

// Start backend server
const backend = spawn('node', ['server.js'], {
  cwd: './backend',
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: '8080',
    NODE_ENV: 'development'
  }
});

backend.on('error', (error) => {
  console.error('Failed to start backend:', error);
});

backend.on('close', (code) => {
  console.log(`Backend process exited with code ${code}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down backend...');
  backend.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  backend.kill('SIGTERM');
  process.exit(0);
});