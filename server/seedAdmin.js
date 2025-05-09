const bcrypt = require("bcryptjs");
const { pool } = require("./config/db"); // adjust path if your db.js is elsewhere

const insertAdmin = async () => {
  const A_id = "adm101";
  const A_fname = "Sarat";
  const A_lname = "Saharia";
  const A_email = "adm101@tezu.ernet.in";
  const rawPassword = "SS@123"; // original password
  const F_id = "cs102";

  try {
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    await pool.query(
      "INSERT INTO Admin (A_id, A_fname, A_lname, A_email, A_password, F_id) VALUES (?, ?, ?, ?, ?, ?)",
      [A_id, A_fname, A_lname, A_email, hashedPassword, F_id]
    );

    console.log("✅ Admin inserted with hashed password.");
    process.exit();
  } catch (err) {
    console.error("❌ Error inserting admin:", err.message);
    process.exit(1);
  }
};

insertAdmin();
