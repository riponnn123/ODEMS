require('dotenv').config();
const db = require('../config/db');

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access forbidden: insufficient role privileges' });
    }
    next();
  };
};

