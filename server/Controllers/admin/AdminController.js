// ✅ Controllers/admin/AdminController.js
const Admin = require('../../Models/admin/AdminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ FIND BY EMAIL ONLY
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ✅ COMPARE HASHED PASSWORD
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ✅ GENERATE JWT TOKEN
    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
