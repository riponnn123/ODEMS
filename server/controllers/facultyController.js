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

// exports.getFacultyInfo = async (req, res) => {
//   try {
//     const temp = req.user; // Get faculty ID from the authenticated user
//     const {F_id} = temp;
//     const [rows] = await pool.query(
//       "SELECT F_id, F_fname, F_lname, F_email FROM Faculty WHERE F_id = ?",
//       [F_id]
//     );
//     console.log(rows);
//     if (rows.length === 0) {
//       // return res.status(404).json({ error: "Faculty not found" });
//       res.send("Faculty not found");
//     }
//     const facultyInfo = {
//       F_id: rows[0].F_id,
//       F_name: `${rows[0].F_fname} ${rows[0].F_lname}`,
//       F_email: rows[0].F_email,
//       //IF_department: rows[0].F_department
//     };

//     //  res.json({facultyInfo});
//     res.send(facultyInfo);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

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
