const { pool } = require('../config/db');
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
    const { E_title, E_type, V_name, Date, Time, Duration, Organizer} = req.body;
    console.log(req.body);
    console.log(V_name);
  
    try {
      const FID = "CS101"
      const AID = "adm101"
      const response = await pool.query(`SELECT V_id FROM Venue 
        WHERE V_name = ?`, [V_name]);;
        // console.log(response);
        const vid = response[0][0].V_id
        console.log(vid);
        await pool.query(
        'INSERT INTO Event (E_title, E_type, V_id, Date, Time, Duration, Organizer, ConfirmationStatus, F_id, A_id) VALUES (?, ?, ?, ?, ?, ?, ?, false, ?, ?)',
        [E_title, E_type, vid, Date, Time, Duration, Organizer, FID, AID]
      );
      if(E_type == "Workshop"){
        await pool.query(`INSERT INTO Workshop VALUES`)
      }else if(E_type == "Meeting"){

      }else if(E_type == "Conferences"){

      }
      res.status(201).json({ message: 'Event created' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };