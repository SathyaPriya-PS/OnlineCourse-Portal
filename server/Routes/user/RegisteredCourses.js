const express = require('express');
const router = express.Router();
const RegisteredCourse = require('../../Models/user/RegisteredCourseModel');
const Course = require('../../Models/admin/CourseModel'); // assuming this is your course model

// POST: Register a course
router.post('/register', async (req, res) => {
  const { userEmail, courseId, title, startDate, endDate, duration, amount } = req.body;

  try {
    if (!userEmail || !courseId) {
      return res.status(400).json({ msg: "Missing userEmail or courseId" });
    }

    const existing = await RegisteredCourse.findOne({ userEmail, courseId });
    if (existing) return res.status(400).json({ msg: "Already registered" });

    const newReg = new RegisteredCourse({ userEmail, courseId, title, startDate, endDate, duration, amount });
    await newReg.save();

    res.status(201).json({ msg: "Course registered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// GET: Fetch all registered courses for a user
router.get('/registered/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const courses = await RegisteredCourse.find({ userEmail: email });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching courses" });
  }
});

// PUT: Admin updates a course and it reflects in registered courses too
router.put('/update-course/:id', async (req, res) => {
  const { title, startDate, endDate, duration, amount, jobAvailability } = req.body;

  try {
    // 1. Update main course
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { title, startDate, endDate, duration, amount, jobAvailability },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ msg: "Course not found" });
    }

    // 2. Sync to RegisteredCourse
    await RegisteredCourse.updateMany(
      { courseId: req.params.id },
      {
        $set: {
          title,
          startDate,
          endDate,
          duration,
          amount
        }
      }
    );

    res.status(200).json({ msg: "Course and registrations updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
