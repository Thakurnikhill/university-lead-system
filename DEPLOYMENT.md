# Project Setup Guide - Step by Step

## 📁 File Structure

Your project directory should look like this:

```
university-lead-system/
│
├── server.js                 # Main backend server
├── package.json             # Dependencies
├── .env                     # Environment variables
├── .gitignore              # Git ignore patterns
├── README.md               # Documentation
├── setup.sh                # Setup script
│
└── public/                 # Frontend directory
    ├── index.html          # Landing page (HTML)
    ├── styles.css          # Styling (CSS)
    └── app.js              # Frontend logic (JavaScript)
```

## 🛠️ Local Development Setup

### Step 1: Initialize Project

```bash
# Create project directory
mkdir university-lead-system
cd university-lead-system

# Initialize git
git init

# Initialize npm
npm init -y
```

### Step 2: Install Dependencies

```bash
npm install express cors dotenv
npm install --save-dev nodemon
```

### Step 3: Create Files

Create all files listed in the file structure above with the provided code.

### Step 4: Create Public Directory

```bash
mkdir -p public
```

### Step 5: Start Development Server

```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

### Step 6: Access Application

- Open browser: `http://localhost:3000`
- IIT Bombay: `http://localhost:3000?id=iit-bombay`
- BITS Pilani: `http://localhost:3000?id=bits-pilani`

## 🌐 Deploy to Vercel (Recommended)

### Prerequisites
- Vercel account (free at vercel.com)
- GitHub account

### Steps

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit - University Landing System"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/university-lead-system
git push -u origin main
```

2. **Deploy on Vercel**
   - Visit https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Select "Other" as framework
   - Click "Deploy"

3. **Configure Environment Variables**
   - In Vercel dashboard: Settings → Environment Variables
   - Add `PIPEDREAM_WEBHOOK_URL` = your webhook URL

4. **Update API URL for Production**
   - In `public/app.js`, change:
   ```javascript
   const API_BASE_URL = 'http://localhost:3000/api';
   ```
   - To:
   ```javascript
   const API_BASE_URL = 'https://YOUR-VERCEL-DOMAIN.vercel.app/api';
   ```

## 🔗 Setup Pipedream Integration

### Create Webhook

1. Visit https://pipedream.com and sign up
2. Create new workflow
3. Select HTTP/Webhook as trigger
4. Copy the webhook URL
5. Add to your .env file:
```
PIPEDREAM_WEBHOOK_URL=https://your-webhook-url
```

### Setup Actions in Pipedream

Example workflow:
1. HTTP trigger (already set)
2. Send email notification
3. Store data in Google Sheets
4. Send thank you email to applicant

## 📝 Environment Variables

### Development (.env)
```
PORT=3000
PIPEDREAM_WEBHOOK_URL=https://your-pipedream-webhook-url
NODE_ENV=development
```

### Production
Set the same variables in your hosting platform's dashboard.

## 🧪 Testing Locally

### Test API Endpoints

```bash
# Get universities
curl http://localhost:3000/api/universities

# Get IIT Bombay details
curl http://localhost:3000/api/universities/iit-bombay

# Get courses
curl http://localhost:3000/api/universities/iit-bombay/courses

# Get fees
curl http://localhost:3000/api/universities/iit-bombay/fees

# Get placements
curl http://localhost:3000/api/universities/iit-bombay/placements

# Get facilities
curl http://localhost:3000/api/universities/iit-bombay/facilities

# Submit a lead
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Rahul Sharma",
    "email": "rahul@example.com",
    "phone": "9876543210",
    "state": "Maharashtra",
    "course": "B.Tech Computer Science",
    "intakeYear": "2025",
    "consent": true
  }'
```

### Test Frontend

1. Navigate to http://localhost:3000
2. Verify all sections load:
   - Hero section with university name
   - Courses tab
   - Placements tab
   - Facilities tab
3. Test modals:
   - Click "Check Course-wise Fees" - fee table should appear
4. Test form:
   - Fill all fields
   - Submit form
   - Should see success message

## 🚀 Deploying Multiple Universities

### To add a new university:

1. **Edit `server.js`** - Add to `universities` object:
```javascript
const universities = {
  // ... existing universities
  delhi_university: {
    id: 'delhi-university',
    name: 'Delhi University',
    overview: 'Description here',
    // ... other fields
  }
};
```

2. **Test locally**: `http://localhost:3000?id=delhi-university`

3. **Redeploy** on Vercel

## 📊 Database Integration (Optional)

To store leads in a database:

1. **Using Firebase:**
   - Setup Firebase project
   - Add to server.js:
   ```javascript
   const admin = require('firebase-admin');
   // Initialize Firebase
   ```
   - Store leads in Firestore

2. **Using MongoDB:**
   - Get connection string
   - Install mongoose: `npm install mongoose`
   - Create Lead schema and save

3. **Using Supabase:**
   - Create Supabase project
   - Use PostgreSQL database
   - Create leads table

## ✅ Pre-Deployment Checklist

- [ ] All APIs tested and working
- [ ] Form validation working correctly
- [ ] Responsive design verified on mobile
- [ ] Pipedream webhook configured
- [ ] Environment variables set
- [ ] GitHub repository created
- [ ] Vercel project connected
- [ ] SSL certificate active
- [ ] Email notifications working
- [ ] Analytics setup (optional)

## 🐛 Common Issues & Fixes

### Port 3000 already in use
```bash
# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### CORS errors
- Ensure frontend API_BASE_URL matches backend domain
- Check CORS middleware is enabled in server.js

### Form not submitting
- Check browser console (F12)
- Verify all required fields filled
- Check network tab for API response

### API returns 404
- Verify university ID is correct (iit-bombay or bits-pilani)
- Check server is running on correct port

## 📱 Mobile Testing

```bash
# Get your local IP
ipconfig getifaddr en0  # Mac
ipconfig              # Windows

# Access from phone on same network
http://YOUR_IP:3000
```

## 🎯 Next Features to Add

1. Authentication & Login
2. Database for lead storage
3. Admin dashboard
4. Email notifications
5. SMS notifications
6. Payment integration
7. Analytics tracking
8. Lead nurturing sequences

---

**Ready to deploy! 🚀**
