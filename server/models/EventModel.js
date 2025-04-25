const db = require('../config/db');

exports.getAllEvents = () => db.query('SELECT * FROM Event');

exports.createEvent = ({
  E_title,
  E_type,
  V_id,
  Date,
  Time,
  Duration,
  Organizer,
  ConfirmationStatus,
  S_rollno,
  F_id,
  A_id
}) => {
  return db.query(
    'INSERT INTO Event (E_title, E_type, V_id, Date, Time, Duration, Organizer, ConfirmationStatus, S_rollno, F_id, A_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [E_title, E_type, V_id, Date, Time, Duration, Organizer, ConfirmationStatus, S_rollno, F_id, A_id]
  );
};