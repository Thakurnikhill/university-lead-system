const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));


// University Data
const universities = {
  'iit-bombay': {
    id: 'iit-bombay',
    name: 'IIT Bombay',
    overview: 'Indian Institute of Technology Bombay is one of India\'s premier engineering institutions, established in 1958.',
    location: 'Mumbai, Maharashtra',
    established: 1958,
    courses: [
      { id: 1, name: 'B.Tech Computer Science', duration: '4 years', seats: 80 },
      { id: 2, name: 'B.Tech Mechanical Engineering', duration: '4 years', seats: 60 },
      { id: 3, name: 'B.Tech Electrical Engineering', duration: '4 years', seats: 50 },
      { id: 4, name: 'B.Tech Civil Engineering', duration: '4 years', seats: 45 }
    ],
    fees: {
      'B.Tech Computer Science': { min: 200000, max: 250000, currency: 'INR', perYear: true },
      'B.Tech Mechanical Engineering': { min: 180000, max: 220000, currency: 'INR', perYear: true },
      'B.Tech Electrical Engineering': { min: 180000, max: 220000, currency: 'INR', perYear: true },
      'B.Tech Civil Engineering': { min: 160000, max: 200000, currency: 'INR', perYear: true }
    },
    placements: {
      averagePackage: '15.5 LPA',
      highestPackage: '65 LPA',
      placementPercentage: 98,
      topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'McKinsey']
    },
    facilities: [
      'Modern Laboratory Equipment',
      'Advanced Computer Centers',
      'Sports Complex',
      'Hostel Accommodation',
      'Library with 100,000+ Books',
      'Cafeteria and Dining',
      'Medical Center'
    ]
  },
  'bits-pilani': {
    id: 'bits-pilani',
    name: 'BITS Pilani',
    overview: 'BITS Pilani is a private research-driven university established in 1964.',
    location: 'Pilani, Rajasthan',
    established: 1964,
    courses: [
      { id: 1, name: 'B.E Computer Science', duration: '4 years', seats: 100 },
      { id: 2, name: 'B.E Mechanical Engineering', duration: '4 years', seats: 80 },
      { id: 3, name: 'B.E Electronics and Communication', duration: '4 years', seats: 70 },
      { id: 4, name: 'B.E Chemical Engineering', duration: '4 years', seats: 60 }
    ],
    fees: {
      'B.E Computer Science': { min: 900000, max: 1000000, currency: 'INR', perYear: true },
      'B.E Mechanical Engineering': { min: 800000, max: 900000, currency: 'INR', perYear: true },
      'B.E Electronics and Communication': { min: 800000, max: 900000, currency: 'INR', perYear: true },
      'B.E Chemical Engineering': { min: 800000, max: 900000, currency: 'INR', perYear: true }
    },
    placements: {
      averagePackage: '13.2 LPA',
      highestPackage: '52 LPA',
      placementPercentage: 96,
      topRecruiters: ['Apple', 'Google', 'Cisco', 'Intel', 'Uber']
    },
    facilities: [
      'State-of-the-art Labs',
      'Dual Degree Program',
      'Entrepreneurship Cell',
      'Hostel with WiFi',
      'Central Library',
      'Food Court',
      'Gym and Recreation'
    ]
  }
};

// HOMEPAGE - When user visits http://localhost:3000
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// LANDING PAGES - When user visits with ?id parameter
// This serves the index.html which handles the university-specific content
app.get('/university', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes
app.get('/api/universities', (req, res) => {
  const universityList = Object.values(universities).map(u => ({
    id: u.id,
    name: u.name,
    location: u.location,
    established: u.established
  }));
  res.json({
    status: 'success',
    data: universityList,
    count: universityList.length
  });
});

app.get('/api/universities/:universityId', (req, res) => {
  const { universityId } = req.params;
  const university = universities[universityId];
  
  if (!university) {
    return res.status(404).json({
      status: 'error',
      message: 'University not found'
    });
  }
  
  res.json({
    status: 'success',
    data: university
  });
});

app.get('/api/universities/:universityId/courses', (req, res) => {
  const { universityId } = req.params;
  const university = universities[universityId];
  
  if (!university) {
    return res.status(404).json({
      status: 'error',
      message: 'University not found'
    });
  }
  
  res.json({
    status: 'success',
    universityName: university.name,
    courses: university.courses
  });
});

app.get('/api/universities/:universityId/fees', (req, res) => {
  const { universityId } = req.params;
  const university = universities[universityId];
  
  if (!university) {
    return res.status(404).json({
      status: 'error',
      message: 'University not found'
    });
  }
  
  res.json({
    status: 'success',
    universityName: university.name,
    currency: 'INR',
    period: 'Per Year',
    feeStructure: university.fees
  });
});

app.get('/api/universities/:universityId/placements', (req, res) => {
  const { universityId } = req.params;
  const university = universities[universityId];
  
  if (!university) {
    return res.status(404).json({
      status: 'error',
      message: 'University not found'
    });
  }
  
  res.json({
    status: 'success',
    universityName: university.name,
    placements: university.placements
  });
});

app.get('/api/universities/:universityId/facilities', (req, res) => {
  const { universityId } = req.params;
  const university = universities[universityId];
  
  if (!university) {
    return res.status(404).json({
      status: 'error',
      message: 'University not found'
    });
  }
  
  res.json({
    status: 'success',
    universityName: university.name,
    facilities: university.facilities
  });
});

app.post('/api/leads', (req, res) => {
  const { fullName, email, phone, state, course, intakeYear, consent } = req.body;
  
  if (!fullName || !email || !phone || !state || !course || !intakeYear || !consent) {
    return res.status(400).json({
      status: 'error',
      message: 'All fields are required'
    });
  }
  
  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({
      status: 'error',
      message: 'Phone number must be 10 digits'
    });
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid email address'
    });
  }
  
  console.log('Lead received:', { fullName, email, phone, state, course, intakeYear });
  
  res.json({
    status: 'success',
    message: 'Lead submitted successfully',
    data: {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      ...req.body
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Server is running'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Home page: http://localhost:${PORT}`);
  console.log(`IIT Bombay: http://localhost:${PORT}?id=iit-bombay`);
  console.log(`BITS Pilani: http://localhost:${PORT}?id=bits-pilani`);
  console.log(`API: http://localhost:${PORT}/api/health`);
});
