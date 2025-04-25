// const db = require("../config/db");
const pool = require("../config/db");
exports.getAllStudents = () => db.query("SELECT * FROM Student");

exports.createStudent = ({
  S_rollno,
  S_fname,
  S_lname,
  S_email,
  S_password,
}) => {
  return pool.query(
    "INSERT INTO Student (S_rollno, S_fname, S_lname, S_email, S_password) VALUES (?, ?, ?, ?, ?)",
    [S_rollno, S_fname, S_lname, S_email, S_password]
  );
};
