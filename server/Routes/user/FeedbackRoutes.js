const express = require('express');
const router = express.Router();
const Feedback = require('../../Models/user/FeedbackModel');

// POST: Add Feedback
router.post('/add/all', async (req, res) => {
  const { userEmail, college, department, query } = req.body;

  if (!userEmail || !college || !department || !query) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    const newFeedback = new Feedback({ userEmail, college, department, query });
    await newFeedback.save();
    res.status(201).json({ msg: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

// GET: Fetch All Feedback (for Admin)
router.get('/all', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ postedAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching feedback', error: err.message });
  }
});

module.exports = router;
