const workshopModel = require('../models/workshopModel');

exports.createWorkshop = async (req, res) => {
  const { E_id } = req.body;
  try {
    await db.query('INSERT INTO Workshop (E_id) VALUES (?)', [E_id]);
    res.status(201).json({ message: 'Workshop created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addTopic = async (req, res) => {
  const { Workshop_id, Topic } = req.body;
  try {
    await db.query('INSERT INTO Workshop_Topics (Workshop_id, Topic) VALUES (?, ?)', [Workshop_id, Topic]);
    res.status(201).json({ message: 'Workshop topic added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addTrainer = async (req, res) => {
  const { Workshop_id, Trainer_Name } = req.body;
  try {
    await db.query('INSERT INTO Workshop_Trainers (Workshop_id, Trainer_Name) VALUES (?, ?)', [Workshop_id, Trainer_Name]);
    res.status(201).json({ message: 'Trainer added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addSession = async (req, res) => {
  const { Workshop_id, Session_Title } = req.body;
  try {
    await db.query('INSERT INTO Workshop_Sessions (Workshop_id, Session_Title) VALUES (?, ?)', [Workshop_id, Session_Title]);
    res.status(201).json({ message: 'Session added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
