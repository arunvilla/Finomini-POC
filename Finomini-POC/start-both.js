#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting AI Finance Manager (Frontend + Backend)...\n');

// Start backend server first
console.log('📡 Starting backend server on port 3001...');
const backend = spawn('npm', ['start'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: true
});

backend.stdout.on('data', (data) => {
  console.log(`[Backend] ${data.toString().trim()}`);
});

backend.stderr.on('data', (data) => {
  console.error(`[Backend Error] ${data.toString().trim()}`);
});

// Wait for backend to start, then start frontend
setTimeout(() => {
  console.log('🎨 Starting frontend development server on port 3000...');
  const frontend = spawn('npm', ['run', 'dev'], {
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: true,
    env: { ...process.env, PORT: '3000' }
  });

  frontend.stdout.on('data', (data) => {
    console.log(`[Frontend] ${data.toString().trim()}`);
  });

  frontend.stderr.on('data', (data) => {
    console.error(`[Frontend Error] ${data.toString().trim()}`);
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down servers...');
    backend.kill('SIGINT');
    frontend.kill('SIGINT');
    process.exit(0);
  });

  frontend.on('close', (code) => {
    console.log(`Frontend process exited with code ${code}`);
    backend.kill('SIGINT');
  });

  backend.on('close', (code) => {
    console.log(`Backend process exited with code ${code}`);
    frontend.kill('SIGINT');
  });

}, 3000); // Wait 3 seconds for backend to start

backend.on('close', (code) => {
  if (code !== 0) {
    console.error(`Backend process exited with code ${code}`);
  }
});