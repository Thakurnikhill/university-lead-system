# University Lead Generation System

A complete full-stack web application for university landing pages with integrated lead capture, APIs, and Pipedream workflow automation.

## 📋 Project Structure

```
project-root/
├── server.js              # Express backend with API endpoints
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── public/               # Frontend files
│   ├── index.html        # Main landing page
│   ├── styles.css        # Styling
│   └── app.js            # Frontend logic
└── README.md             # This file
```

## 🚀 Features

### Frontend
- **Responsive Design**: Mobile and desktop compatible
- **Dynamic Content**: Loads university data from APIs
- **Tab Navigation**: Courses, Placements, Facilities sections
- **Lead Form**: Complete form with validation
- **Modal**: Fee structure in popup modal
- **Notifications**: Success/error messages

### Backend
- **REST APIs**: Multiple endpoints for data retrieval
- **JSON Responses**: Simple and nested JSON structures
- **Form Validation**: Server-side validation for leads
- **CORS Support**: Cross-origin requests enabled

### APIs Available

#### Get All Universities
```
GET /api/universities
```

#### Get University Details (Nested JSON)
```
GET /api/universities/:universityId
```

#### Get Courses
```
GET /api/universities/:universityId/courses
```

#### Get Fee Structure
```
GET /api/universities/:universityId/fees
```

#### Get Placement Stats
```
GET /api/universities/:universityId/placements
```

#### Get Facilities
```
GET /api/universities/:universityId/facilities
```

#### Submit Lead Form
```
POST /api/leads
Body: {
  fullName: string,
  email: string,
  phone: string (10 digits),
  state: string,
  course: string,
  intakeYear: string,
  consent: boolean
}
```

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Git

### Local Development

1. **Clone or create project directory**
```bash
mkdir university-lead-system
cd university-lead-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file** (already included as .env)
```bash
PORT=3000
PIPEDREAM_WEBHOOK_URL=https://your-pipedream-webhook-url
```

4. **Start the development server**
```bash
npm run dev
# or
npm start
```

5. **Access the application**
- Open browser and go to `http://localhost:3000`
- Landing page will load automatically

## 🌐 Deployment

### Deploy to Vercel (Recommended for free hosting)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/university-lead-system
git push -u origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure settings:
     - Framework: Other
     - Root Directory: ./
     - Build Command: `npm install`
     - Output Directory: `public`

3. **Add Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add `PIPEDREAM_WEBHOOK_URL`

4. **Deploy**
   - Click Deploy
   - Your app will be live with SSL certificate

### Deploy to Render

1. **Push to GitHub** (as above)

2. **Create Render service**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect GitHub repository

3. **Configure**
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Deploy** and access via Render URL

## 🔗 Pipedream Integration

### Setup Webhook

1. **Create Pipedream Account**
   - Go to [pipedream.com](https://pipedream.com)
   - Sign up free

2. **Create Workflow**
   - Click "Create Workflow"
   - Select "HTTP" trigger
   - Copy the webhook URL

3. **Update .env**
```
PIPEDREAM_WEBHOOK_URL=your_webhook_url_here
```

4. **Configure Actions**
   - Add action to send email notification
   - Add action to store data in database
   - Add action to trigger email to applicant

## 🧪 Testing APIs

### Using cURL

```bash
# Get all universities
curl http://localhost:3000/api/universities

# Get specific university
curl http://localhost:3000/api/universities/iit-bombay

# Submit lead
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "state": "Maharashtra",
    "course": "B.Tech Computer Science",
    "intakeYear": "2025",
    "consent": true
  }'
```

### Using Postman

1. Import collection from Postman
2. Set base URL: `http://localhost:3000/api`
3. Test each endpoint

## 🎨 Customization

### Update University Data

Edit `server.js` universities object:
```javascript
const universities = {
  your_university: {
    id: 'your-university',
    name: 'Your University Name',
    // ... other fields
  }
};
```

### Change Styling

Modify `public/styles.css`:
- Color scheme (currently using #667eea as primary)
- Typography
- Spacing
- Responsive breakpoints

### Change Form Fields

Edit in `public/index.html`:
- Add/remove form fields
- Update validation in `public/app.js`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ✅ Deployment Checklist

- [ ] All APIs tested locally
- [ ] Form validation working
- [ ] Responsive design verified on mobile/desktop
- [ ] Pipedream webhook configured
- [ ] Environment variables set
- [ ] SSL certificate verified on deployment
- [ ] Database/storage configured for leads
- [ ] Email notifications setup
- [ ] Contact emails added to brochure download

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Mac/Linux: Find and kill process
lsof -ti:3000 | xargs kill -9

# Windows: Use a different port
PORT=3001 npm start
```

### CORS errors
- Ensure CORS middleware is enabled in server.js
- Check API_BASE_URL in app.js matches your deployment URL

### Form not submitting
- Check browser console for errors
- Verify all required fields are filled
- Check network tab for API response

## 📄 University Details

### IIT Bombay
- **ID**: iit-bombay
- **Courses**: 4 programs
- **Fees**: ₹1,60,000 - ₹2,50,000/year

### BITS Pilani
- **ID**: bits-pilani
- **Courses**: 4 programs
- **Fees**: ₹8,00,000 - ₹10,00,000/year

## 📚 Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **API Format**: RESTful with JSON
- **Hosting**: Vercel/Render
- **Automation**: Pipedream
- **Version Control**: Git

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Check server logs for API issues

## 📄 License

MIT License - feel free to use for your project

## 🎯 Next Steps

1. Deploy to Vercel/Render
2. Setup Pipedream workflow
3. Add database for lead storage
4. Configure email notifications
5. Add more universities
6. Setup analytics tracking
7. Create admin dashboard
8. Add payment integration (if needed)

---

**Happy Coding! 🚀**
