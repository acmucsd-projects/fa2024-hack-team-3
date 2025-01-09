#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Installing frontend dependencies..."
cd frontend
npm install

echo "Installing backend dependencies..."
cd ../backend
npm install

echo "Installing 'concurrently' in the root directory..."
cd ..
npm install concurrently

echo "Starting frontend and backend concurrently..."
npx concurrently "npm run server" "npm run client"
