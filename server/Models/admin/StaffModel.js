const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: String,
  staffId: String,
  course: String,
  experience: Number,
  availability: String,
});

module.exports = mongoose.model('Staff', staffSchema);
