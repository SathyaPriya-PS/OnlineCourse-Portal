// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']; // expects "Bearer <token>"
  
  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  const actualToken = token.split(' ')[1]; // Remove "Bearer" if present

  try {
    const decoded = jwt.verify(actualToken, JWT_SECRET);
    req.admin = decoded; // attach decoded info
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;
