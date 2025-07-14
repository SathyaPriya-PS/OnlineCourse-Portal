const express = require('express');
const router = express.Router();
const adminController = require('../../Controllers/admin/AdminController'); // ✅ CORRECT path
const verifyToken = require('../../Middleware/authMiddleware'); // ✅ CORRECT path

// ✅ Login route (no auth)
router.post('/login', adminController.loginAdmin);

// ✅ Example protected route
exports.getCourses = async (req, res) => {
  try {
    res.status(200).json({ message: 'Courses list fetched' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = router;
