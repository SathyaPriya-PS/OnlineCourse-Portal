const mongoose = require('mongoose');

const RegisteredCourseSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: String,
  startDate: String,
  endDate: String,
  duration: String,
  amount: String,
});

module.exports = mongoose.model('RegisteredCourse', RegisteredCourseSchema);
