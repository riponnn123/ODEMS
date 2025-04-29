const { pool } = require('../config/db');

// Get all participants for a specific event
exports.getEventParticipants = async (req, res) => {
  const { eventId } = req.params;
  try {
    const [participants] = await pool.query(`
      SELECT 
        p.P_id,
        s.S_name as student_name,
        s.S_email as student_email,
        s.S_department as student_department,
        p.P_registration_date
      FROM Participant p
      JOIN Student s ON p.S_id = s.S_id
      WHERE p.E_id = ?
    `, [eventId]);

    res.json(participants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Register a student for an event
exports.registerParticipant = async (req, res) => {
  const { eventId, studentId } = req.body;
  try {
    // Check if student is already registered
    const [existing] = await pool.query(
      'SELECT * FROM Participant WHERE E_id = ? AND S_id = ?',
      [eventId, studentId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Student is already registered for this event' });
    }

    // Register the student
    const [result] = await pool.query(
      'INSERT INTO Participant (E_id, S_id, P_registration_date) VALUES (?, ?, NOW())',
      [eventId, studentId]
    );

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all events a student is registered for
exports.getStudentEvents = async (req, res) => {
  const { studentId } = req.params;
  try {
    const [events] = await pool.query(`
      SELECT 
        e.E_id,
        e.E_title,
        e.E_type,
        e.E_date,
        e.E_venue,
        e.E_status,
        p.P_registration_date
      FROM Event e
      JOIN Participant p ON e.E_id = p.E_id
      WHERE p.S_id = ?
    `, [studentId]);

    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};