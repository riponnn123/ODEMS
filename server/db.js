const mysql = require('mysql2/promise');
require('dotenv').config();
async function connectDB() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password:process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('Connected to MySQL database!');

    const [rows] = await connection.execute('SELECT * FROM Venue');
    console.log( rows);

    await connection.end();
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
  }
}

module.exports ={ connectDB };
