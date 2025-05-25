const { pool } = require("../config/db");
const nodemailer = require("nodemailer");

// Reuse this transporter to send confirmation emails
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   requireTLS: true,
// });

exports.registerParticipant = async (req, res) => {
  const { E_id } = req.body;
  const user = req.user;

  try {
    let checkQuery = "";
    let insertQuery = "";
    let values = [];
    let email = "";
    let name = "";
    let role = "";

    if (user.F_id) {
      checkQuery = "SELECT * FROM Participant WHERE E_id = ? AND F_id = ?";
      insertQuery = `INSERT INTO Participant (E_id, F_id, user_role) VALUES (?, ?, 'faculty')`;
      values = [E_id, user.F_id];
      email = user.F_email;
      name = `${user.F_fname} ${user.F_lname}`;
      role = "faculty";
    } else if (user.S_rollno) {
      checkQuery = "SELECT * FROM Participant WHERE E_id = ? AND S_rollno = ?";
      insertQuery = `INSERT INTO Participant (E_id, S_rollno, user_role) VALUES (?, ?, 'student')`;
      values = [E_id, user.S_rollno];
      email = user.S_email;
      name = user.S_fname;
      //console.log("Student Name:", name);
      role = "student";
    } else {
      return res.status(400).json({ error: "Invalid user role or missing ID" });
    }

    // Check for duplicate registration
    // const [existing] = await pool.query(checkQuery, values);
    // if (existing.length > 0) {
    //   return res
    //     .status(400)
    //     .json({ error: "You have already registered for this event." });
    // }

    // Insert into Participant table
    await pool.query(insertQuery, values);

    const [[event]] = await pool.query(
      `SELECT E.E_title, E.Date, E.Time, V.V_name 
   FROM Event E
   JOIN Venue V ON E.V_id = V.V_id
   WHERE E.E_id = ?`,
      [E_id]
    );

    // Send confirmation email
  //   await transporter.sendMail({
  // from: process.env.EMAIL_USER,
  // to: email,
  // subject: `Registration Confirmed for ${event.E_title}`,
  // html: `
  //   <h3>Hi ${name},</h3>
  //   <p>Thank you for registering for the event <strong>${event.E_title}</strong>.</p>
  //   <p><strong>Date:</strong> ${new Date(event.Date).toLocaleDateString("en-IN")}</p>
  //   <p><strong>Time:</strong> ${event.Time}</p>
  //   <p><strong>Venue:</strong> ${event.V_name}</p>
  //   <p>We look forward to your participation!</p>
  //   <br/>
  //   <p>– ODEMS Team</p>
  //`
//});


    res
      .status(201)
      .json({
        message: "Successfully registered and confirmation email sent.",
      });
  } catch (err) {
    console.error("Registration Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getRegisteredEventsForStudent = async (req, res) => {
  const { role, S_rollno, F_id } = req.user;

  try {
    const userCol = role === "student" ? "S_rollno" : "F_id";
    const userId = role === "student" ? S_rollno : F_id;

    const [rows] = await pool.query(
      `SELECT E.*, V.V_name FROM Participant P 
       JOIN Event E ON P.E_id = E.E_id 
       JOIN Venue V ON E.V_id = V.V_id 
       WHERE P.${userCol} = ?`,
      [userId]
    );

    res.status(200).json(rows);
  } catch (err) {
    console.error("Get Registered Events Error:", err.message);
    res.status(500).json({ error: "Failed to fetch registered events." });
  }
};


exports.getRegisteredEventsForFaculty = async (req, res) => {
  const { F_id } = req.user; // populated by verifyToken

  try {
    const [events] = await pool.query(
      `SELECT E.E_id, E.E_title, E.Date, E.Time, V.V_name
       FROM Participant P
       JOIN Event E ON P.E_id = E.E_id
       JOIN Venue V ON E.V_id = V.V_id
       WHERE P.F_id = ?`,
      [F_id]
    );
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
