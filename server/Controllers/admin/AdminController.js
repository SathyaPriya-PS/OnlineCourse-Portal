const Admin = require('../../Models/admin/AdminModel');

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email, password });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', admin });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
