const { pool } = require("../config/db");
const facultyModel = require("../models/facultyModel");
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
    const [faculties] = await pool.query('SELECT * FROM Faculty WHERE F_email = ?', [F_email]);
    if (faculties.length === 0) {
      return res.status(400).json({ message: 'Faculty not found' });
    }

    const validPassword = await bcrypt.compare(F_password, faculties[0].F_password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = generateToken({ id: faculties[0].F_id, role: 'faculty' });
    res.cookie('token', token, { httpOnly: true, secure: false });
    res.json({ message: 'Faculty login successful' });
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