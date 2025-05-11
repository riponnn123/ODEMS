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

exports.adminLogin = async (req, res) => {
  const { A_email, A_password } = req.body;
  console.log("Admin login attempt:", A_email);

  try {
    const [admins] = await pool.query(
      "SELECT * FROM Admin WHERE A_email = ?",
      [A_email]
    );

    if (admins.length === 0) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const validPassword = await bcrypt.compare(
      A_password,
      admins[0].A_password
    );

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ Token includes admin ID and role
    const token = generateToken({ A_id: admins[0].A_id, role: "admin" });

    res.status(200).json({
      message: "Admin login successful",
      token,
      role: "admin"
    });

  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Server error during login" });
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
