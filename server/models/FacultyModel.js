const db = require('../config/db');

exports.getAllFaculty = () => db.query('SELECT * FROM Faculty');

exports.createFaculty = ({ F_id, F_fname, F_lname, F_email, F_password }) => {
  return db.query(
    'INSERT INTO Faculty (F_id, F_fname, F_lname, F_email, F_password) VALUES (?, ?, ?, ?, ?)',
    [F_id, F_fname, F_lname, F_email, F_password]
  );
};