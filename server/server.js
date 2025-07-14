require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('./Database/db');

const AdminRoutes = require('./Routes/admin/AdminRoutes');
const courseRoutes = require('./Routes/admin/courseRoutes');
const staffRoutes = require('./Routes/admin/staffRoutes');
const userRoutes = require('./Routes/user/userRoutes');
const RegisteredCourses= require('./Routes/user/RegisteredCourses');
const FeedbackRoutes = require('./Routes/user/FeedbackRoutes');
const adminQueryRoutes = require('./Routes/admin/adminQueries');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin', AdminRoutes);
app.use('/api/admin/courses', courseRoutes);
app.use('/api/admin/staffs', staffRoutes);
app.use("/api/user", userRoutes);
app.use('/api/user/registered-courses', RegisteredCourses);
app.use('/api/user/post-feedback', FeedbackRoutes);
app.use('/api/admin/queries', adminQueryRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/online-course-portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
