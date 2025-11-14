#!/bin/bash

# Installation Guide for University Lead Generation System

echo "🚀 Starting Setup..."

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14+ from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js found: $(node -v)"

# Check npm installation
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✅ npm found: $(npm -v)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create .env if not exists
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file..."
    cp .env .env.backup
    echo "✅ .env file created (backup saved as .env.backup)"
fi

# Display startup instructions
echo ""
echo "=================================================="
echo "✨ Setup Complete!"
echo "=================================================="
echo ""
echo "🚀 To start the server:"
echo "   npm start         (production mode)"
echo "   npm run dev       (development mode with auto-reload)"
echo ""
echo "🌐 Then open: http://localhost:3000"
echo ""
echo "📋 Universities available:"
echo "   • IIT Bombay     (?id=iit-bombay)"
echo "   • BITS Pilani    (?id=bits-pilani)"
echo ""
echo "🔧 Configuration:"
echo "   • Edit .env to add Pipedream webhook URL"
echo "   • Edit server.js to add more universities"
echo ""
echo "📚 API Documentation:"
echo "   • See README.md for detailed API documentation"
echo ""
echo "=================================================="
