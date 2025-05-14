const { pool } = require("../config/db");
const nodemailer = require("nodemailer");


exports.registerParticipant = async (req, res) => {
  const { E_id } = req.body;
  const user = req.user;

  try {
    await pool.query(
      `INSERT INTO Participant (E_id, user_id, user_role) VALUES (?, ?, ?)`,
      [E_id, user.F_id || user.S_id, user.role]
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: user.F_email || user.S_email,
      subject: "Event Registration Confirmation",
      html: `<p>You have successfully registered for event <strong>${E_id}</strong>.</p>`,
    });

    res.status(200).json({ message: "Registration successful, email sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRegisteredEventsForStudent = async (req, res) => {
  const { S_id } = req.user;  // populated by verifyToken

  try {
    const [events] = await pool.query(
      `SELECT E.E_id, E.E_title, E.Date, E.Time, V.V_name
       FROM Participant P
       JOIN Event E ON P.E_id = E.E_id
       JOIN Venue V ON E.V_id = V.V_id
       WHERE P.S_id = ?`,
      [S_id]
    );
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRegisteredEventsForFaculty = async (req, res) => {
  const { F_id } = req.user;  // populated by verifyToken

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
