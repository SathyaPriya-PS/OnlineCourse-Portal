const express = require('express');
const router = express.Router();
const Course = require('../../Models/admin/CourseModel'); // ✅ Correct path

// Add new course
router.post('/add', async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json({ message: 'Course added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all courses
router.get('/all', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete('/delete/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a course
router.put('/update/:id', async (req, res) => {
  try {
    await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Course updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
