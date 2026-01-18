#!/bin/bash

# Gestiune Persoane - Full Stack Setup Script
# This script automates the setup process

echo "========================================"
echo "Gestiune Persoane - Setup Script"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd gestiune-persoane-backend || exit 1
npm install
echo "✅ Backend dependencies installed"
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../gestiune-persoane || exit 1
npm install
echo "✅ Frontend dependencies installed"
echo ""

# Create .env files if they don't exist
if [ ! -f "../gestiune-persoane-backend/.env" ]; then
    echo "📝 Creating backend .env file..."
    cat > ../gestiune-persoane-backend/.env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gestiune-persoane
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=development
EOF
    echo "✅ Backend .env created"
fi

if [ ! -f "./.env" ]; then
    echo "📝 Creating frontend .env file..."
    cat > ./.env << EOF
REACT_APP_API_URL=http://localhost:5000/api
EOF
    echo "✅ Frontend .env created"
fi

echo ""
echo "========================================"
echo "✅ Setup Complete!"
echo "========================================"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Ensure MongoDB is running:"
echo "   mongod"
echo ""
echo "2. Start the backend (in another terminal):"
echo "   cd gestiune-persoane-backend"
echo "   npm start"
echo ""
echo "3. Start the frontend:"
echo "   cd gestiune-persoane"
echo "   npm start"
echo ""
echo "4. Open browser and go to: http://localhost:3000"
echo ""
echo "📖 For more info, see QUICKSTART.md or README.md"
echo ""
