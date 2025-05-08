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

exports.createFaculty = async (req, res) => {
  const { F_id, F_fname, F_lname, F_email, F_password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(F_password, 10);
    await pool.query(
      "INSERT INTO Faculty (F_id, F_fname, F_lname, F_email, F_password) VALUES (?, ?, ?, ?, ?)",
      [F_id, F_fname, F_lname, F_email, hashedPassword]
    );
    res.status(201).json({ message: "Faculty created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.facultyLogin = async (req, res) => {
  const { F_email, F_password } = req.body;
  try {
    const [faculties] = await pool.query(
      "SELECT * FROM Faculty WHERE F_email = ?",
      [F_email]
    );
    if (faculties.length === 0) {
      return res.status(400).json({ message: "Faculty not found" });
    }

    const validPassword = await bcrypt.compare(
      F_password,
      faculties[0].F_password
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken({ id: faculties[0].F_id, role: "faculty" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    console.log(token);
    res.json({ message: "Faculty login successful" });
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
      F_fname: rows[0].F_fname,
      F_lname: rows[0].F_lname,
      F_email: rows[0].F_email,
      F_name: `${rows[0].F_fname} ${rows[0].F_lname}`
    };

    res.json(facultyInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
