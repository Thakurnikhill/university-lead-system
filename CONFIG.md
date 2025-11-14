# Configuration Guide

## 🎓 Adding More Universities

### 1. Add University Data to server.js

Edit the `universities` object in `server.js` to add a new university:

```javascript
const universities = {
  // ... existing universities
  
  your_university_id: {
    id: 'your-university-slug',
    name: 'Your University Name',
    overview: 'Brief description of the university...',
    location: 'City, State',
    established: 2000,
    courses: [
      { 
        id: 1, 
        name: 'B.Tech Computer Science', 
        duration: '4 years', 
        seats: 100 
      },
      { 
        id: 2, 
        name: 'B.Tech Mechanical Engineering', 
        duration: '4 years', 
        seats: 80 
      },
      // Add more courses as needed
    ],
    fees: {
      'B.Tech Computer Science': { 
        min: 500000, 
        max: 600000, 
        currency: 'INR', 
        perYear: true 
      },
      'B.Tech Mechanical Engineering': { 
        min: 450000, 
        max: 550000, 
        currency: 'INR', 
        perYear: true 
      },
      // Add fees for all courses
    },
    placements: {
      averagePackage: '12.5 LPA',
      highestPackage: '45 LPA',
      placementPercentage: 95,
      topRecruiters: [
        'Company1', 
        'Company2', 
        'Company3',
        'Company4',
        'Company5'
      ]
    },
    facilities: [
      'Facility 1',
      'Facility 2',
      'Facility 3',
      'Facility 4',
      'Facility 5',
      'Facility 6',
      'Facility 7'
    ],
    image: 'https://via.placeholder.com/600x400?text=University+Name'
  }
};
```

### 2. Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique slug (lowercase, hyphens only) - used in URL |
| `name` | string | Full university name |
| `overview` | string | 1-2 sentence description |
| `location` | string | City and state |
| `established` | number | Year founded |
| `courses` | array | Array of course objects |
| `fees` | object | Course name as key, fee details as value |
| `placements` | object | Placement statistics |
| `facilities` | array | List of campus facilities |
| `image` | string | Image URL |

### 3. Example: Complete University Entry

```javascript
vit_vellore: {
  id: 'vit-vellore',
  name: 'VIT Vellore',
  overview: 'Vellore Institute of Technology is known for world-class education and innovation in technology.',
  location: 'Vellore, Tamil Nadu',
  established: 1984,
  courses: [
    { id: 1, name: 'B.Tech Computer Science', duration: '4 years', seats: 150 },
    { id: 2, name: 'B.Tech Information Technology', duration: '4 years', seats: 140 },
    { id: 3, name: 'B.Tech Electronics and Communication', duration: '4 years', seats: 100 },
    { id: 4, name: 'B.Tech Mechanical Engineering', duration: '4 years', seats: 120 },
    { id: 5, name: 'B.Tech Civil Engineering', duration: '4 years', seats: 90 }
  ],
  fees: {
    'B.Tech Computer Science': { min: 700000, max: 800000, currency: 'INR', perYear: true },
    'B.Tech Information Technology': { min: 700000, max: 800000, currency: 'INR', perYear: true },
    'B.Tech Electronics and Communication': { min: 650000, max: 750000, currency: 'INR', perYear: true },
    'B.Tech Mechanical Engineering': { min: 600000, max: 700000, currency: 'INR', perYear: true },
    'B.Tech Civil Engineering': { min: 550000, max: 650000, currency: 'INR', perYear: true }
  },
  placements: {
    averagePackage: '11.8 LPA',
    highestPackage: '42 LPA',
    placementPercentage: 94,
    topRecruiters: ['TCS', 'Cognizant', 'Infosys', 'HCL', 'Accenture']
  },
  facilities: [
    'Modern Laboratories',
    'Hostel Facilities',
    'Sports Complex',
    'Library with Digital Resources',
    'Computer Centers',
    'Medical Center',
    'Food Court'
  ],
  image: 'https://via.placeholder.com/600x400?text=VIT+Vellore'
}
```

## 🎨 Customizing Styling

### Primary Color Theme

Find in `public/styles.css`:
```css
/* Primary purple gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Change to your preferred colors:
```css
/* Example: Blue theme */
background: linear-gradient(135deg, #0066ff 0%, #0051cc 100%);

/* Example: Green theme */
background: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%);
```

### Font Changes

```css
body {
  font-family: 'Your Font Name', sans-serif;
}
```

Recommended fonts:
- 'Poppins', sans-serif
- 'Inter', sans-serif
- 'Roboto', sans-serif

## 📋 States List for Form

The form includes all 28 Indian states and 8 union territories. To customize:

Edit in `public/index.html`:
```html
<select id="state" name="state" required>
  <option value="">Select State</option>
  <option value="Your State">Your State</option>
  <!-- Add more as needed -->
</select>
```

## 🔄 API Customization

### Add Custom Endpoint

In `server.js`:

```javascript
// Example: Add ratings API
app.get('/api/universities/:universityId/ratings', (req, res) => {
  const { universityId } = req.params;
  const key = Object.keys(universities).find(k => universities[k].id === universityId);
  
  if (!key) {
    return res.status(404).json({
      status: 'error',
      message: 'University not found'
    });
  }
  
  res.json({
    status: 'success',
    universityName: universities[key].name,
    ratings: {
      academics: 4.5,
      placements: 4.3,
      facilities: 4.2,
      studentLife: 4.4,
      overall: 4.35
    }
  });
});
```

### Add Query Parameters

```javascript
app.get('/api/universities', (req, res) => {
  const { sort, limit } = req.query;
  
  let universityList = Object.values(universities).map(u => ({
    id: u.id,
    name: u.name,
    location: u.location,
    established: u.established
  }));
  
  // Apply sorting
  if (sort === 'name') {
    universityList.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'established') {
    universityList.sort((a, b) => a.established - b.established);
  }
  
  // Apply limit
  if (limit) {
    universityList = universityList.slice(0, parseInt(limit));
  }
  
  res.json({
    status: 'success',
    data: universityList,
    count: universityList.length
  });
});
```

Usage: `GET /api/universities?sort=name&limit=5`

## 🔐 Security Enhancements

### Add Rate Limiting

```bash
npm install express-rate-limit
```

In `server.js`:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

### Add Input Sanitization

```bash
npm install express-validator
```

In `server.js`:
```javascript
const { body, validationResult } = require('express-validator');

app.post('/api/leads', [
  body('fullName').trim().isLength({ min: 2 }),
  body('email').isEmail(),
  body('phone').matches(/^\d{10}$/),
  body('consent').isBoolean()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Process lead
});
```

## 📊 Add Analytics

### Google Analytics

In `public/index.html`, add before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Replace `GA_MEASUREMENT_ID` with your tracking ID.

### Track Form Submissions

In `public/app.js`:
```javascript
function submitLeadForm(e) {
  // ... existing code
  
  // Track event
  gtag('event', 'lead_submitted', {
    'university': currentUniversityId,
    'course': formData.course
  });
}
```

## 🛡️ Environment Configuration

### Local Development
```
PORT=3000
NODE_ENV=development
PIPEDREAM_WEBHOOK_URL=
```

### Production
```
PORT=3000
NODE_ENV=production
PIPEDREAM_WEBHOOK_URL=your_webhook_url
```

## 📧 Email Configuration

To enable email notifications via Pipedream:

1. In Pipedream workflow, add "Send Email" action
2. Configure SMTP settings
3. Create email templates
4. Map form fields to email variables

## 🗄️ Database Configuration

### Using MongoDB

```bash
npm install mongoose
```

Create `models/Lead.js`:
```javascript
const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  state: String,
  course: String,
  intakeYear: String,
  university: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', leadSchema);
```

Update `server.js`:
```javascript
const mongoose = require('mongoose');
const Lead = require('./models/Lead');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Save lead to database
app.post('/api/leads', async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.json({ status: 'success', data: lead });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});
```

---

**Customize and deploy! 🚀**
