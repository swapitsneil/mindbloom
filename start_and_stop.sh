#!/bin/bash

# Start Next.js development server
cd /mnt/s/hackathon/mindbloom
echo "Starting Next.js development server on localhost:3000..."
npm run dev &

# Store the PID of the npm process
NPM_PID=$!
echo "Server started with PID: $NPM_PID"

# Wait for 4 minutes (240 seconds)
sleep 240

# 1 minute warning
echo "1 minute remaining before server shutdown..."

# Wait for the final minute (60 seconds)
sleep 60

# Gracefully stop the server
echo "Stopping server..."
kill $NPM_PID

# Wait a moment for cleanup
sleep 2
echo "Server stopped. Port 3000 is now free."