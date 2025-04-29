const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');

exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    let table, idField, emailField, passwordField;
    
    switch(role) {
      case 'admin':
        table = 'Admin';
        idField = 'A_id';
        emailField = 'A_email';
        passwordField = 'A_password';
        break;
      case 'faculty':
        table = 'Faculty';
        idField = 'F_id';
        emailField = 'F_email';
        passwordField = 'F_password';
        break;
      case 'student':
        table = 'Student';
        idField = 'S_id';
        emailField = 'S_email';
        passwordField = 'S_password';
        break;
      default:
        return res.status(400).json({ error: 'Invalid role' });
    }

    const [user] = await pool.query(`SELECT * FROM ${table} WHERE ${emailField} = ?`, [email]);
    if (user.length === 0) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user[0][passwordField]);
    if (!isMatch) return res.status(400).json({ error: 'Incorrect password' });

    const token = generateToken({ id: user[0][idField], role });
    res.json({ token, role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.register = async (req, res) => {
  const { name, email, password, role, department, studentId, facultyId } = req.body;
  try {
    let table, fields, values;
    
    switch(role) {
      case 'student':
        table = 'Student';
        fields = ['S_name', 'S_email', 'S_password', 'S_department', 'S_id'];
        values = [name, email, await bcrypt.hash(password, 10), department, studentId];
        break;
      case 'faculty':
        table = 'Faculty';
        fields = ['F_name', 'F_email', 'F_password', 'F_department', 'F_id'];
        values = [name, email, await bcrypt.hash(password, 10), department, facultyId];
        break;
      default:
        return res.status(400).json({ error: 'Invalid role' });
    }

    const [result] = await db.query(
      `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')})`,
      values
    );

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: err.message });
  }
};