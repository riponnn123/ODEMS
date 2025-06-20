const {pool} = require("../config/db")


exports.getAllStudents = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Student");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
