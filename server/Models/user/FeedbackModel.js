const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  college: { type: String, required: true },
  department: { type: String, required: true },
  query: { type: String, required: true },
  postedAt: { type: Date, default: Date.now },
  adminResponse: { type: String }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
