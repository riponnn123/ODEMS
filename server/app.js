// const express = require('express');
// const {connectDB}=require ('./db');
// const app = express();

// express.json()
// connectDB();

// index.js (acts like app.js)
// index.js (acts like app.js)
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { errorHandler } = require('./middlewares/errorHandler');

const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const eventRoutes = require('./routes/eventRoutes');
const participantRoutes = require('./routes/participantRoutes');
const meetingRoutes = require('./routes/meetingRoutes');
const conferenceRoutes = require('./routes/conferenceRoutes');
const workshopRoutes = require('./routes/workshopRoutes');
const adminRoutes = require("./routes/adminRoutes");

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/faculties', facultyRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/participants', participantRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/conferences', conferenceRoutes);
app.use('/api/workshops', workshopRoutes);
app.use('/api/admin', adminRoutes);

// Fallback route for unknown paths
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 7777;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

