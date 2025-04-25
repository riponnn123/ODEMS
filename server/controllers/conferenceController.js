const conferenceModel = require('../models/conferenceModel');

exports.createConference = async (req, res) => {
  const { Theme, E_id } = req.body;
  try {
    await db.query('INSERT INTO Conference (Theme, E_id) VALUES (?, ?)', [Theme, E_id]);
    res.status(201).json({ message: 'Conference created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addSpeaker = async (req, res) => {
  const { Conference_id, Speaker_Name } = req.body;
  try {
    await db.query('INSERT INTO Conference_Speakers (Conference_id, Speaker_Name) VALUES (?, ?)', [Conference_id, Speaker_Name]);
    res.status(201).json({ message: 'Speaker added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addPaper = async (req, res) => {
  const { Conference_id, Paper_Title } = req.body;
  try {
    await db.query('INSERT INTO Conference_Papers (Conference_id, Paper_Title) VALUES (?, ?)', [Conference_id, Paper_Title]);
    res.status(201).json({ message: 'Paper added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};