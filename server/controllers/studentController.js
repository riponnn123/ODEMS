const studentModel = require("../models/studentModel");
const { validationResult } = require("express-validator");
const {pool} = require("../config/db")

const bcrypt = require("bcryptjs");
exports.getAllStudents = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Student");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createStudent = async (req, res) => {
  const { S_rollno, S_fname, S_lname, S_email, S_password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(S_password, 10);
     await pool.query(
      "INSERT INTO Student (S_rollno, S_fname, S_lname, S_email, S_password) VALUES (?, ?, ?, ?, ?)",
      [S_rollno, S_fname, S_lname, S_email, hashedPassword]
    );
    res.status(201).json({ message: "Student created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
