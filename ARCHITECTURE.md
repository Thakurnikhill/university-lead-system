# Project Architecture & Flow

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │            Frontend (HTML + CSS + JavaScript)            │   │
│  │                                                          │   │
│  │  • Landing Page (index.html)                            │   │
│  │  • Styling (styles.css)                                 │   │
│  │  • Logic (app.js)                                        │   │
│  │  • Responsive Design                                     │   │
│  │                                                          │   │
│  └─────────┬──────────────────────────────────────────────┘   │
│            │                                                     │
│            │ HTTP Requests (Fetch API)                         │
│            ↓                                                     │
└─────────────────────────────────────────────────────────────────┘
              │
              │
    ┌─────────┴─────────┐
    │                   │
    ↓                   ↓
  API Calls      Pipedream Webhook
    │                   │
    │                   │
┌───┴────────────────────┴──────────────────────────────┐
│                    BACKEND (Node.js)                  │
├────────────────────────────────────────────────────────┤
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │           Express.js Server                     │  │
│  │                                                 │  │
│  │  Routes:                                        │  │
│  │  • GET /api/universities                        │  │
│  │  • GET /api/universities/:id                    │  │
│  │  • GET /api/universities/:id/courses            │  │
│  │  • GET /api/universities/:id/fees               │  │
│  │  • GET /api/universities/:id/placements         │  │
│  │  • GET /api/universities/:id/facilities         │  │
│  │  • POST /api/leads                              │  │
│  │  • GET /api/health                              │  │
│  │                                                 │  │
│  └──────────┬──────────────────────────────────────┘  │
│             │                                         │
│  ┌──────────┴──────────────────────────────────────┐  │
│  │       University Data (In-Memory)               │  │
│  │                                                 │  │
│  │  • IIT Bombay                                   │  │
│  │    - Courses, Fees, Placements, Facilities     │  │
│  │                                                 │  │
│  │  • BITS Pilani                                  │  │
│  │    - Courses, Fees, Placements, Facilities     │  │
│  │                                                 │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow Diagram

### 1. Page Load Flow

```
User visits http://localhost:3000
         │
         ↓
Browser loads index.html
         │
         ↓
CSS (styles.css) is loaded → Styling applied
         │
         ↓
JavaScript (app.js) is loaded → DOMContentLoaded event
         │
         ↓
loadUniversityData() function called
         │
         ├─→ getUniversityIdFromURL() → Extract ?id=iit-bombay
         │
         ├─→ Fetch /api/universities/iit-bombay
         │
         ├─→ Populate hero section with university data
         │
         ├─→ Fetch /api/universities/iit-bombay/courses
         │
         ├─→ Fetch /api/universities/iit-bombay/placements
         │
         ├─→ Fetch /api/universities/iit-bombay/facilities
         │
         ↓
Page fully loaded with all data
```

### 2. Form Submission Flow

```
User fills lead form
         │
         ↓
User clicks "Submit Application"
         │
         ↓
Form validation triggered (validateForm())
         │
         ├─→ Check all required fields
         ├─→ Validate email format
         ├─→ Validate phone (10 digits)
         ├─→ Check consent checkbox
         │
         ├─→ If valid → Continue
         └─→ If invalid → Show error message → Exit
         │
         ↓
POST request to /api/leads with form data
         │
         ├─→ Server validates again
         ├─→ Server responds with success/error
         │
         ↓
If successful:
    ├─→ Show success notification
    ├─→ Reset form
    └─→ Try to send to Pipedream webhook
```

### 3. Fee Modal Flow

```
User clicks "Check Course-wise Fees"
         │
         ↓
openFeeModal() function called
         │
         ↓
Fetch /api/universities/:universityId/fees
         │
         ↓
Build HTML table with fee data
         │
         ↓
Display modal with table
         │
         ↓
User can view fees or close modal
         │
         ↓
Modal closes when user clicks X or outside
```

---

## 🔄 Component Interaction

```
┌─────────────────────────────────────────────────────┐
│            FRONTEND COMPONENTS                       │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────┐      ┌──────────────┐             │
│  │   Navbar     │      │   Hero Sec   │             │
│  └──────────────┘      └──────────────┘             │
│         │                      │                     │
│         ├─→ Navigation Links   └─→ 3 CTA Buttons    │
│                                   │                 │
│                                   ├─ Fee Modal      │
│                                   ├─ Brochure DL    │
│                                   └─ Apply Form     │
│                                                     │
│  ┌────────────────────────────────────────────┐    │
│  │         Tab Navigation                     │    │
│  ├────────────────────────────────────────────┤    │
│  │ • Courses      • Placements   • Facilities│    │
│  └────────────────────────────────────────────┘    │
│         │              │             │              │
│         ↓              ↓             ↓              │
│      Course        Placement     Facilities        │
│      Cards         Statistics    List               │
│                                                     │
│  ┌────────────────────────────────────────────┐    │
│  │         Lead Form                          │    │
│  ├────────────────────────────────────────────┤    │
│  │ • Full Name        • State                 │    │
│  │ • Email            • Course                │    │
│  │ • Phone            • Intake Year           │    │
│  │ • Consent Checkbox                         │    │
│  │ • Submit Button                            │    │
│  └────────────────────────────────────────────┘    │
│         │                                           │
│         ↓                                           │
│      Validation → API Call → Response → Message   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 📡 API Response Structure

### GET /api/universities (Simple JSON)
```
{
  "status": "success",
  "data": [
    {
      "id": "iit-bombay",
      "name": "IIT Bombay",
      "location": "Mumbai, Maharashtra",
      "established": 1958
    },
    {
      "id": "bits-pilani",
      "name": "BITS Pilani",
      "location": "Pilani, Rajasthan",
      "established": 1964
    }
  ],
  "count": 2
}
```

### GET /api/universities/:id (Nested JSON)
```
{
  "status": "success",
  "data": {
    "id": "iit-bombay",
    "name": "IIT Bombay",
    "overview": "...",
    "location": "Mumbai, Maharashtra",
    "courses": [
      {
        "id": 1,
        "name": "B.Tech Computer Science",
        "duration": "4 years",
        "seats": 80
      }
    ],
    "fees": {
      "B.Tech Computer Science": {
        "min": 200000,
        "max": 250000,
        "currency": "INR",
        "perYear": true
      }
    },
    "placements": {
      "averagePackage": "15.5 LPA",
      "highestPackage": "65 LPA",
      "placementPercentage": 98,
      "topRecruiters": ["Google", "Microsoft", ...]
    },
    "facilities": ["Modern Lab", "Hostel", ...]
  }
}
```

---

## 🔐 Validation Flow

### Form Validation Checklist

```
Input Validation
│
├─ Full Name
│  └─ Required, Length > 0
│
├─ Email
│  ├─ Required
│  └─ Must match /^[^\s@]+@[^\s@]+\.[^\s@]+$/
│
├─ Phone
│  ├─ Required
│  └─ Must match /^\d{10}$/ (exactly 10 digits)
│
├─ State
│  ├─ Required
│  └─ Must be from dropdown
│
├─ Course
│  ├─ Required
│  └─ Must be valid course for university
│
├─ Intake Year
│  ├─ Required
│  └─ Must be 2025, 2026, 2027, or 2028
│
└─ Consent
   ├─ Required
   └─ Checkbox must be checked
```

---

## 🚀 Deployment Flow

```
Local Development
      │
      ↓
   git init
   git add .
   git commit -m "msg"
   git push to GitHub
      │
      ↓
GitHub Repository
      │
      ↓
Connect to Vercel
   - Select repo
   - Configure settings
   - Add env variables
      │
      ↓
Vercel Deployment
   - Builds server.js
   - Serves public/ files
   - Generates URL
   - Assigns SSL cert
      │
      ↓
Live Application
   https://your-app.vercel.app
```

---

## 📱 Responsive Design Breakpoints

```
Mobile Layout          Tablet Layout         Desktop Layout
(< 768px)             (768px - 1024px)      (> 1024px)
│                     │                     │
├─ Stack all items    ├─ 2 columns          ├─ 3+ columns
├─ Full width forms   ├─ Moderate spacing   ├─ Maximum spacing
├─ Touch friendly     ├─ Balanced layout    ├─ Optimized layout
├─ Hamburger menu     ├─ Sidebar possible   ├─ Full navigation
└─ Hidden details     └─ Some details       └─ All details
```

---

## 🔗 External Integration

```
Frontend (Browser)
      │
      ├─→ Backend APIs
      │   └─→ Express Server (localhost:3000)
      │       └─→ University Data
      │
      └─→ Pipedream Webhook
          └─→ External Automation
              ├─→ Send Email
              ├─→ Save to Database
              ├─→ CRM Integration
              └─→ SMS Notification
```

---

## 🎯 Key Decision Points

```
User Action → Decision Tree

1. Page Load
   │
   ├─→ URL has ?id parameter?
   │   ├─ Yes → Load that university
   │   └─ No → Load default (iit-bombay)
   │
   ├─→ API responds successfully?
   │   ├─ Yes → Display data
   │   └─ No → Show error message

2. Form Submission
   │
   ├─→ All fields valid?
   │   ├─ Yes → Send to API
   │   └─ No → Show validation errors
   │
   ├─→ API accepts form?
   │   ├─ Yes → Show success, send to Pipedream
   │   └─ No → Show error

3. Modal Opening
   │
   ├─→ Click fee button?
   │   ├─ Yes → Fetch fees and open modal
   │   └─ No → Do nothing
   │
   ├─→ Modal open?
   │   ├─ Click X → Close modal
   │   ├─ Click outside → Close modal
   │   └─ Click inside → Keep modal open
```

---

**This diagram shows how all components work together to create a complete application.**
