#!/bin/bash

echo "🚀 Starting AI Finance Manager on Replit..."

# Start backend in background
echo "📡 Starting backend server..."
cd backend
npm install
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

# Start frontend
echo "🎨 Starting frontend..."
cd ..
npm run dev &
FRONTEND_PID=$!

# Keep script running
echo "✅ Both servers started!"
echo "📡 Backend PID: $BACKEND_PID"
echo "🎨 Frontend PID: $FRONTEND_PID"
echo "🌐 Frontend URL: https://your-replit-url.replit.dev"
echo "📊 Backend URL: https://your-replit-url.replit.dev:3001"

# Wait for processes
wait $BACKEND_PID $FRONTEND_PID