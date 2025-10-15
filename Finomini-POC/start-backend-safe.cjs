#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting AI Finance Manager Backend (Safe Mode)...\n');

// Function to check if port is available
const checkPort = (port) => {
  return new Promise((resolve) => {
    const net = require('net');
    const server = net.createServer();
    
    server.listen(port, () => {
      server.once('close', () => resolve(true));
      server.close();
    });
    
    server.on('error', () => resolve(false));
  });
};

// Function to find available port
const findAvailablePort = async (startPort = 7777) => {
  for (let port = startPort; port < startPort + 100; port++) {
    if (await checkPort(port)) {
      return port;
    }
  }
  throw new Error('No available ports found');
};

const startBackend = async () => {
  try {
    // Find available port
    const availablePort = await findAvailablePort();
    console.log(`📡 Using port: ${availablePort}`);
    
    // Start backend with timeout
    const backend = spawn('node', ['test-server.js'], {
      cwd: path.join(__dirname, 'backend'),
      stdio: 'inherit',
      env: {
        ...process.env,
        PORT: availablePort.toString(),
        NODE_ENV: 'development'
      }
    });

    // Handle startup timeout
    const startupTimeout = setTimeout(() => {
      console.error('❌ Backend startup timeout (60 seconds)');
      backend.kill('SIGKILL');
      process.exit(1);
    }, 60000);

    backend.on('spawn', () => {
      clearTimeout(startupTimeout);
      console.log(`✅ Backend started successfully on port ${availablePort}`);
    });

    backend.on('error', (error) => {
      clearTimeout(startupTimeout);
      console.error('❌ Failed to start backend:', error.message);
      process.exit(1);
    });

    backend.on('close', (code) => {
      clearTimeout(startupTimeout);
      console.log(`Backend process exited with code ${code}`);
      if (code !== 0) {
        process.exit(code);
      }
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down backend...');
      clearTimeout(startupTimeout);
      backend.kill('SIGINT');
      setTimeout(() => {
        backend.kill('SIGKILL');
        process.exit(0);
      }, 5000);
    });

    process.on('SIGTERM', () => {
      clearTimeout(startupTimeout);
      backend.kill('SIGTERM');
      setTimeout(() => {
        backend.kill('SIGKILL');
        process.exit(0);
      }, 5000);
    });

  } catch (error) {
    console.error('❌ Error starting backend:', error.message);
    process.exit(1);
  }
};

startBackend();