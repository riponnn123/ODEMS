const { pool } = require("../config/db");
const { generateToken } = require("../utils/jwt");
const bcrypt = require("bcryptjs");

exports.adminLogin = async (req, res) => {
  const { A_email, A_password } = req.body;
  try {
    const [admins] = await pool.query('SELECT * FROM Admin WHERE A_email = ?', [A_email]);
    if (admins.length === 0) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    // const validPassword = await bcrypt.compare(A_password, admins[0].A_password);
    // if (!validPassword) {
    //   return res.status(400).json({ message: 'Invalid password' });
    // }

    const token = generateToken({ id: admins[0].A_id, role: 'admin' });
    res.cookie('token', token, { httpOnly: true, secure: false });
    res.json({ message: 'Admin login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.approveRequest = async (req, res) => {
  try {
    const E_id = req.params.E_id;
    await pool.query(`UPDATE Event SET ConfirmationStatus = true WHERE E_id = ?`, [E_id]);
    const response = await pool.query(`SELECT E_type FROM Event WHERE E_id = ?`, [E_id]);
    const E_type = response[0][0].E_type
    console.log(E_type);
    if(E_type == "Workshop"){
      await pool.query(`INSERT INTO Workshop (E_id) VALUES (?)`, [E_id]); 
    }else if(E_type == "Meeting"){

    }else if (E_type == "Conferences"){

    }
    res.send('HELL')
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.rejectRequest = async (req, res) => {
  try {
    const E_id = req.params.E_id;
    await pool.query('DELETE FROM Event WHERE E_id = ?',[E_id]);
    res.send("Delete Succesfully");
  }catch (err) {
    res.status(500).json({ error: err.message });
  }
};
