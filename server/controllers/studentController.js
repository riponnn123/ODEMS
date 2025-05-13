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

// exports.studentLogin = async (req, res) => {
//   console.log("Student login request:", req.body);
//   const { S_email, S_password } = req.body;
//   try {
//     const [students] = await pool.query('SELECT * FROM Student WHERE S_email = ?', [S_email]);
//     if (students.length === 0) {
//       return res.status(400).json({ message: 'Student not found' });
//     }

//     const validPassword = await bcrypt.compare(S_password, students[0].S_password);
//     if (!validPassword) {
//       return res.status(400).json({ message: 'Invalid password' });
//     }

//     const token = generateToken({ S_rollno: students[0].S_rollno, role: 'student' });
//     console.log("Generated token during login:", token); // Log the generated token for debugging
//     //res.cookie('token', token, { httpOnly: true, secure: false });
//     res.status(200).json({
//       message: "Student login successful",
//       token,
//       role: "student"
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.getStudentInfo = async (req, res) => {
  try {
    //console.log("Requesting student info for user:", req.user); // Log the user object for debugging
    const id = req.user.S_rollno; // Get student ID from the authenticated user
    //console.log("Student ID from JWT:", id); // Log the student ID for debugging
    const [rows] = await pool.query(
      "SELECT S_rollno, S_fname, S_lname, S_email FROM Student WHERE S_rollno = ?",
      [id]
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
    //console.log("Student info:", studentInfo); // Log the student info for debugging

    res.json(studentInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
