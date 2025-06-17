const { pool } = require("../config/db");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

exports.approveRequest = async (req, res) => {
  try {
    const E_id = req.params.E_id;
    await pool.query(`UPDATE Event SET ConfirmationStatus = 1 WHERE E_id = ?`, [E_id]);
    // const response = await pool.query(`SELECT E_type FROM Event WHERE E_id = ?`, [E_id]);
    // const E_type = response[0][0].E_type
    // console.log(E_type);
    // if(E_type == "Workshop"){
    //   await pool.query(`INSERT INTO Workshop (E_id) VALUES (?)`, [E_id]); 
    // }else if(E_type == "Meeting"){

    // }else if (E_type == "Conferences"){

    // }
    res.send("Approved");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.rejectRequest = async (req, res) => {
  try {
    const E_id = req.params.E_id;
    await pool.query('UPDATE Event SET ConfirmationStatus =2 WHERE E_id = ?',[E_id]);
    res.send("Rejected");
  }catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPendingEvents = async (req, res) => {
  try {
    const [events] = await pool.query(`
      SELECT 
        Event.E_id, E_title, E_type, Organizer, Date, Time, Duration, ConfirmationStatus, Venue.V_name 
      FROM Event 
      JOIN Venue ON Event.V_id = Venue.V_id
      WHERE ConfirmationStatus = false
    `);
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAdminInfo = async (req, res) => {
  try {
    const adminId = req.user.id; // Get admin ID from the authenticated user
    const [rows] = await pool.query(
      "SELECT A_id, A_name, A_email FROM Admin WHERE A_id = ?",
      [adminId]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const adminInfo = {
      A_id: rows[0].A_id,
      A_name: rows[0].A_name,
      A_email: rows[0].A_email,
      //A_role: rows[0].A_role
    };

    res.json(adminInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getParticipantsByEvent = async (req, res) => {
  const { eventId } = req.params;
  //console.log("Fetching participants for event ID:", eventId);

  try {
    // Fetch participants with joined student and faculty details
    const [rows] = await pool.query(`
      SELECT 
        P.Participant_id, P.user_role, 
        S.S_fname AS StudentName, S.S_email AS StudentEmail, S.S_rollno,
        F.F_fname, F.F_lname, F.F_email, F.F_id
      FROM Participant P
      LEFT JOIN Student S ON P.S_rollno = S.S_rollno
      LEFT JOIN Faculty F ON P.F_id = F.F_id
      WHERE P.E_id = ?
    `, [eventId]);

    const participants = rows.map(row => {
      if (row.user_role === "student") {
        return {
          role: "Student",
          name: row.StudentName,
          email: row.StudentEmail,
          id: row.S_rollno
        };
      } else if (row.user_role === "faculty") {
        return {
          role: "Faculty",
          name: `${row.F_fname} ${row.F_lname}`,
          email: row.F_email,
          id: row.F_id
        };
      }
      return null;
    }).filter(Boolean);

    res.json(participants);
  } catch (err) {
    console.error("Fetch Participants Error:", err.message);
    res.status(500).json({ error: "Failed to fetch participants" });
    console.log("Fetch Participants Error:", err.message);
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT E.*, V.V_name, F.F_fname, F.F_lname 
       FROM Event E 
       JOIN Venue V ON E.V_id = V.V_id 
       JOIN Faculty F ON E.F_id = F.F_id`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateEventStatus = async (req, res) => {
  const { status } = req.params;
  const { E_id } = req.body;

  try {
    let newStatus;
    if (status === "approve") newStatus = 1;
    else if (status === "reject") newStatus = 2;
    else return res.status(400).json({ error: "Invalid status" });

    await pool.query(
      `UPDATE Event SET ConfirmationStatus = ? WHERE E_id = ?`,
      [newStatus, E_id]
    );

    res.json({ message: `Event ${status}d successfully` });
  } catch (err) {
    console.error("Status update error:", err.message);
    res.status(500).json({ error: "Failed to update status" });
  }
};


