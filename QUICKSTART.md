# 🚀 Quick Start Guide

## 5-Minute Setup

### 1. Clone/Download Project
```bash
git clone https://github.com/YOUR_USERNAME/university-lead-system.git
cd university-lead-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Server
```bash
npm start
```

### 4. Open Browser
Visit `http://localhost:3000`

**That's it! Your application is running.** 🎉

---

## 📂 Project Files Overview

| File | Purpose |
|------|---------|
| `server.js` | Backend API server (Node.js + Express) |
| `public/index.html` | Main landing page (HTML) |
| `public/styles.css` | Styling (CSS) |
| `public/app.js` | Frontend logic (JavaScript) |
| `package.json` | Dependencies |
| `.env` | Configuration variables |
| `README.md` | Full documentation |
| `DEPLOYMENT.md` | Deployment instructions |
| `CONFIG.md` | Configuration & customization |

---

## 🎯 Key Features

✅ **Two university landing pages** (IIT Bombay, BITS Pilani)  
✅ **Dynamic content** loaded from APIs  
✅ **Lead generation form** with validation  
✅ **Fee modal** popup with dynamic data  
✅ **Responsive design** (mobile & desktop)  
✅ **Pipedream integration** for automation  
✅ **Simple & nested JSON APIs**  

---

## 🌐 Test Universities

### IIT Bombay
```
URL: http://localhost:3000?id=iit-bombay
API: GET /api/universities/iit-bombay
```

### BITS Pilani
```
URL: http://localhost:3000?id=bits-pilani
API: GET /api/universities/bits-pilani
```

---

## 🧪 Test API Endpoints

```bash
# Get all universities
curl http://localhost:3000/api/universities

# Get specific university
curl http://localhost:3000/api/universities/iit-bombay

# Get courses
curl http://localhost:3000/api/universities/iit-bombay/courses

# Get fees
curl http://localhost:3000/api/universities/iit-bombay/fees

# Get placements
curl http://localhost:3000/api/universities/iit-bombay/placements

# Get facilities
curl http://localhost:3000/api/universities/iit-bombay/facilities

# Submit lead (POST)
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

---

## 📱 Test Responsive Design

### Mobile (375px width)
1. Press F12 in browser
2. Click mobile device icon
3. Select "iPhone 12"
4. Refresh page

### Tablet (768px width)
1. Press F12 in browser
2. Click mobile device icon
3. Select "iPad"
4. Refresh page

---

## 🔗 Setup Pipedream (5 steps)

### Step 1: Create Account
Visit https://pipedream.com and sign up

### Step 2: Create Workflow
- Click "Create Workflow"
- Select "HTTP" as trigger

### Step 3: Copy Webhook
- Copy the HTTP URL shown

### Step 4: Update .env
```
PIPEDREAM_WEBHOOK_URL=https://your-webhook-url
```

### Step 5: Test
Submit form → Check Pipedream dashboard for data

---

## 📦 Deploy to Vercel (3 steps)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Import on Vercel
1. Visit vercel.com
2. Click "Import Project"
3. Select GitHub repo

### Step 3: Deploy
Click "Deploy" → Wait for deployment → Get live URL

---

## 🛠️ Common Commands

```bash
# Start development server
npm run dev

# Start production server
npm start

# Install new package
npm install package-name

# Update environment variables
nano .env

# Stop server
Ctrl + C

# View logs
npm start 2>&1 | tee app.log
```

---

## ✅ Testing Checklist

- [ ] Server starts without errors
- [ ] Landing page loads at http://localhost:3000
- [ ] Courses tab shows courses
- [ ] Placements tab shows statistics
- [ ] Facilities tab shows list
- [ ] "Check Fees" button opens modal with fee table
- [ ] Form validates empty fields
- [ ] Form validates phone (10 digits)
- [ ] Form validates email format
- [ ] Form submits successfully
- [ ] Success message appears
- [ ] Page is responsive on mobile
- [ ] Page is responsive on desktop

---

## 🐛 Troubleshooting

### Server won't start
```bash
# Check if port is in use
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm start
```

### Cannot find module 'express'
```bash
npm install
```

### API returns 404
```
✓ Check university ID is correct (iit-bombay or bits-pilani)
✓ Check URL format
✓ Check server is running
```

### Form not submitting
```
✓ Check all fields are filled
✓ Check phone is 10 digits
✓ Check console for errors (F12)
✓ Check network tab for API response
```

---

## 📚 Next Steps

1. **Add more universities** - Edit `server.js`
2. **Customize styling** - Edit `public/styles.css`
3. **Deploy to production** - Follow DEPLOYMENT.md
4. **Setup database** - Follow CONFIG.md
5. **Add authentication** - Install passport.js
6. **Add email notifications** - Configure Pipedream

---

## 💡 Tips

- Use VS Code for editing
- Use Postman to test APIs
- Use Chrome DevTools (F12) for debugging
- Use Git for version control
- Keep .env file secret (add to .gitignore)
- Test on real mobile device before deploying

---

## 📞 Need Help?

1. Check README.md for full documentation
2. Check DEPLOYMENT.md for deployment issues
3. Check CONFIG.md for customization
4. Search error message on Google
5. Check browser console (F12) for errors

---

**Ready to build? Let's go! 🚀**

For detailed documentation, see:
- 📖 README.md - Full project documentation
- 🚀 DEPLOYMENT.md - Deployment & hosting guide
- ⚙️ CONFIG.md - Customization & configuration
