const { pool } = require("../config/db");

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
