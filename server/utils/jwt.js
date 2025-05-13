// utils/jwt.js
const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");
require("dotenv").config();

// Generate JWT Token
// exports.generateToken = (user) => {
//   return jwt.sign(
//     {
//       id: user.id,
//       role: user.role,
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "2h",
//     }
//   );
// };

exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Verify JWT Token (optional standalone use)
// exports.  verifyToken = async (req, res, next) => {
//   try {
//     const  token  = req.headers.authorization?.split(" ")[1] || req.cookies.token;
//     if (!token) {
//       throw new Error("Invalid Token");
//     }
//     const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
//     const { id } = decodedObj;
//     const response = await pool.query("SELECT * FROM Faculty WHERE F_id = ?", [
//       id,
//     ]);
//     const user = response[0][0];
//     req.user = user;
//     next();
//   } catch (err) {
//     res.status(401).json({ error: "Unauthorized" });
//   }
// };


exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log("Decoded JWT:", decoded); // Log the decoded JWT for debugging

    const userId = decoded.id;
    //console.log("User ID from JWT:", userId); // Log the user ID for debugging
    const role = decoded.role;

    if (role === "faculty") {
      const [result] = await pool.query("SELECT * FROM Faculty WHERE F_id = ?", [userId]);
      req.user = result[0];
    } else if (role === "student") {
      const [result] = await pool.query("SELECT * FROM Student WHERE S_rollno = ?", [userId]);
      req.user = result[0];
    } else if (role === "admin") {
      const [result] = await pool.query("SELECT * FROM Admin WHERE A_id = ?", [userId]);
      req.user = result[0];
    }

    next();
  } catch (err) {
    console.error("JWT verification failed", err.message);
    res.status(401).json({ error: "Unauthorized" });
  }
};
