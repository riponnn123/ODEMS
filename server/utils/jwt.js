// utils/jwt.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generate JWT Token
exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '2h'
    }
  );
};

// Verify JWT Token (optional standalone use)
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};
