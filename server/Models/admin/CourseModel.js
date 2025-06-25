// server/Models/CourseModel.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  startDate: String,
  endDate: String,
  duration: String,
  amount: Number,
  jobAvailability: String,
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
