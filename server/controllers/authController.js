const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [user] = await db.query('SELECT * FROM Admin WHERE A_email = ?', [email]);
    if (user.length === 0) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user[0].A_password);
    if (!isMatch) return res.status(400).json({ error: 'Incorrect password' });

    const token = generateToken({ id: user[0].A_id });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};