const eventModel = require('../models/eventModel');

exports.getAllEvents = async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM Event');
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.createEvent = async (req, res) => {
    const {
      E_title,
      E_type,
      V_id,
      Date,
      Time,
      Duration,
      Organizer,
      ConfirmationStatus,
      F_id,
      A_id
    } = req.body;
  
    try {
      await db.query(
        'INSERT INTO Event (E_title, E_type, V_id, Date, Time, Duration, Organizer, ConfirmationStatus, F_id, A_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [E_title, E_type, V_id, Date, Time, Duration, Organizer, ConfirmationStatus, F_id, A_id]
      );
      res.status(201).json({ message: 'Event created' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };