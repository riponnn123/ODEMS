const db = require('../config/db');

exports.getParticipantsByEvent = (E_id) => db.query('SELECT * FROM Participant WHERE E_id = ?', [E_id]);

exports.addParticipant = (data) => {
  const { Attended, S_id, Emp_id, E_id } = data;
  return db.query(
    'INSERT INTO Participant (Attended, S_id, Emp_id, E_id) VALUES (?, ?, ?, ?)',
    [Attended, S_id, Emp_id, E_id]
  );
};