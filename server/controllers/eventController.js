const { pool } = require('../config/db');

exports.getAllEvents = async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM Event');
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // exports.createEvent = async (req, res) => {
  //   const { E_title, E_type, V_name, Date, Time, Duration, Organizer} = req.body;
  //   console.log(req.body);
  //   console.log(V_name);
  
  //   try {
  //     const { F_id } = req.user;
  //     const response = await pool.query(`SELECT V_id FROM Venue 
  //       WHERE V_name = ?`, [V_name]);;
  //       // console.log(response);
  //       const vid = response[0][0].V_id
  //       console.log(vid);
  //       await pool.query(
  //       'INSERT INTO Event (E_title, E_type, V_id, Date, Time, Duration, Organizer, ConfirmationStatus, F_id, A_id) VALUES (?, ?, ?, ?, ?, ?, ?, false, ?, ?)',
  //       [E_title, E_type, vid, Date, Time, Duration, Organizer, FID, AID]
  //     );
  //     if(E_type == "Workshop"){
  //       await pool.query(`INSERT INTO Workshop VALUES`)
  //     }else if(E_type == "Meeting"){
  //       await pool.query(`INSERT INTO Meeting VALUES`)
  //     }else if(E_type == "Conferences"){
  //       await pool.query(`INSERT INTO Conference VALUES`)
  //     }
  //     res.status(201).json({ message: 'Event created' });
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // };

  exports.createEvent = async (req, res) => {
  const { E_title, E_type, V_name, Date, Time, Duration, Organizer } = req.body;
  const { F_id } = req.user; // ✅ pulled from JWT payload

  try {
    const response = await pool.query(`SELECT V_id FROM Venue WHERE V_name = ?`, [V_name]);
      console.log(response);
      const vid = response[0][0].V_id

    const [eventResult] = await pool.query(
      `INSERT INTO Event (E_title, E_type, V_id, Date, Time, Duration, Organizer, ConfirmationStatus, F_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, false, ?)`,
      [E_title, E_type, vid, Date, Time, Duration, Organizer, F_id]
    );

    const insertedId = eventResult.insertId;

    if (E_type === "Workshop") {
      await pool.query("INSERT INTO Workshop (E_id) VALUES (?)", [insertedId]);
    } else if (E_type === "Meeting") {
      await pool.query("INSERT INTO Meeting (Agenda, E_id) VALUES (?, ?)", ["", insertedId]);
    } else if (E_type === "Conferences") {
      await pool.query("INSERT INTO Conference (Theme, E_id) VALUES (?, ?)", ["", insertedId]);
    }

    res.status(201).json({ message: "Event created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
