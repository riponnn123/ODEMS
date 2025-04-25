const db = require('../config/db');

exports.getAllAdmins = () => db.query('SELECT * FROM Admin');

exports.createAdmin = ({ A_id, A_fname, A_lname, A_email, A_password, F_id }) => {
  return db.query(
    'INSERT INTO Admin (A_id, A_fname, A_lname, A_email, A_password, F_id) VALUES (?, ?, ?, ?, ?, ?)',
    [A_id, A_fname, A_lname, A_email, A_password, F_id]
  );
};