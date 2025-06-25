// /Routes/admin/adminQueries.js
const express = require('express');
const router = express.Router();
const Feedback = require('../../Models/user/FeedbackModel');

// GET: Fetch All Feedback (Admin)
router.get('/all', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ postedAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching feedback', error: err.message });
  }
});
// POST: Add Response to Feedback
router.post('/respond/:id', async (req, res) => {
  const { response } = req.body;

  try {
    const updated = await Feedback.findByIdAndUpdate(
      req.params.id,
      { adminResponse: response },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to respond', error: err.message });
  }
});
// PUT: Admin responds to a feedback
router.put('/respond/:id', async (req, res) => {
  try {
    const { response } = req.body;
    const updated = await Feedback.findByIdAndUpdate(
      req.params.id,
      { adminResponse: response },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update response', error: err.message });
  }
});


module.exports = router;
