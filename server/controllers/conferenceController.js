const {pool} = require("../config/db");

exports.createConference = async (req, res, next) => {
  const { Theme, E_id } = req.body;
  try {
    const[result] = await pool.query('INSERT INTO Conference (Theme, E_id) VALUES (?, ?)', [Theme, E_id]);
    //res.status(201).json({ message: 'Conference created' });
    req.body.Conference_id = result.insertId;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addSpeaker = async (req, res) => {
  const { Conference_id, Speakers } = req.body;
  try {
    Speakers.forEach(async (name) => {
      await pool.query('INSERT INTO Conference_Speakers (Conference_id, Speaker_Name) VALUES (?, ?)', 
        [Conference_id, name]);
    });
    
    res.status(201).json({ message: 'Conference Created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addPaper = async (req, res) => {
  const { Conference_id, Paper_Title } = req.body;
  try {
    await pool.query('INSERT INTO Conference_Papers (Conference_id, Paper_Title) VALUES (?, ?)', [Conference_id, Paper_Title]);
    res.status(201).json({ message: 'Paper added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};