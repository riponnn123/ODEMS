const { pool } = require('../config/db');
const facultyModel = require('../models/facultyModel');
const bcrypt = require("bcryptjs");

exports.getAllFaculty = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Faculty');
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
      'INSERT INTO Faculty (F_id, F_fname, F_lname, F_email, F_password) VALUES (?, ?, ?, ?, ?)',
      [F_id, F_fname, F_lname, F_email, hashedPassword]
    );
    res.status(201).json({ message: 'Faculty created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRequests = async (req, res)=>{
  try{
    const F_id = "CS101";
    const response = await pool.query(`SELECT * FROM Event WHERE F_id = ?`, [F_id]);
    const Data = response[0];

    res.json({message: "fetched succesfully", data: Data})
  }catch(err){
    res.status(400).send("ERROR " +err.message )
  }
}