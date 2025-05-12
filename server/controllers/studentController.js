const {pool} = require("../config/db")
const bcrypt = require("bcryptjs");
const {generateToken} = require("../utils/jwt");

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

exports.studentLogin = async (req, res) => {
  const { S_email, S_password } = req.body;
  try {
    const [students] = await pool.query('SELECT * FROM Student WHERE S_email = ?', [S_email]);
    if (students.length === 0) {
      return res.status(400).json({ message: 'Student not found' });
    }

    const validPassword = await bcrypt.compare(S_password, students[0].S_password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = generateToken({ id: students[0].S_rollno, role: 'student' });
    res.cookie('token', token, { httpOnly: true, secure: false });
    res.json({ message: 'Student login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentInfo = async (req, res) => {
  try {
    const {S_rollno} = req.user; // Get student ID from the authenticated user
    const [rows] = await pool.query(
      "SELECT S_rollno, S_fname, S_lname, S_email FROM Student WHERE S_rollno = ?",
      [S_rollno]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    const studentInfo = {
      S_id: rows[0].S_rollno,
      S_name: `${rows[0].S_fname} ${rows[0].S_lname}`,
      S_email: rows[0].S_email,
     // S_department: rows[0].S_department
    };

    res.json(studentInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
