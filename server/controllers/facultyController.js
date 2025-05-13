const { pool } = require("../config/db");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

exports.getAllFaculty = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Faculty");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.facultyLogin = async (req, res) => {
//   const { F_email, F_password } = req.body;
//   console.log("Faculty login request:", req.body);

//   try {
//     const [faculties] = await pool.query(
//       "SELECT * FROM Faculty WHERE F_email = ?",
//       [F_email]
//     );

//     if (faculties.length === 0) {
//       return res.status(400).json({ message: "Faculty not found" });
//     }

//     const validPassword = await bcrypt.compare(
//       F_password,
//       faculties[0].F_password
//     );

//     if (!validPassword) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     // ✅ Generate token and return in JSON
//     const token = generateToken({ F_id: faculties[0].F_id, role: "faculty" });

//     res.status(200).json({
//       message: "Faculty login successful",
//       token,
//       role: "faculty"
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.getAllRequests = async (req, res) => {
  try {
    const F_id = "CS101";
    const response = await pool.query(`SELECT * FROM Event WHERE F_id = ?`, [
      F_id,
    ]);
    const Data = response[0];

    res.json({ message: "fetched succesfully", data: Data });
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
};

exports.getFacultyInfo = async (req, res) => { 
  try {
    // console.log("REQ.USER from token middleware:", req.user);
    const { F_id } = req.user; // Auth middleware should populate req.user

    const [rows] = await pool.query(
      "SELECT F_id, F_fname, F_lname, F_email FROM Faculty WHERE F_id = ?",
      [F_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    const facultyInfo = {
      F_id: rows[0].F_id,
      F_email: rows[0].F_email,
      F_name: `${rows[0].F_fname} ${rows[0].F_lname}`
    };

    res.json(facultyInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getEventsWithStatus=async(req,res)=>{
  try {
    const facultyId = req.user.F_id;
    const [events] = await pool.query(
      "SELECT * FROM Event WHERE F_id = ? ",
      [facultyId]
    );
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch confirmed events" });
  }
};