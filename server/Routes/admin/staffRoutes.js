const express = require('express');
const router = express.Router();
const Staff = require('../../Models/admin/StaffModel');

// Add new staff
router.post('/add', async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.status(201).json({ message: 'Staff added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all staff
router.get('/all', async (req, res) => {
  try {
    const staffs = await Staff.find();
    res.status(200).json(staffs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single staff by ID
router.get('/:id', async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    res.status(200).json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update staff
router.put('/:id', async (req, res) => {
  try {
    await Staff.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Staff updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete staff
router.delete('/:id', async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.json({ message: 'Staff deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
