const { pool } = require("../config/db");

exports.createWorkshop = async (req, res,next) => {
  const { E_id } = req.body;
  try {
    const[result] = 
    await pool.query('INSERT INTO Workshop (E_id) VALUES (?)', [E_id]);
    //res.status(201).json({ message: 'Workshop created' });
    req.body.Workshop_id = result.insertId;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addTopic = async (req, res, next) => {
  const { Workshop_id, Topics } = req.body;
  try {
    Topics.forEach( async(name) => {
      await pool.query('INSERT INTO Workshop_Topics (Workshop_id, Topic) VALUES (?, ?)',
         [Workshop_id, name]);
    //res.status(201).json({ message: 'Workshop topic added' });
    next();
    }); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addTrainer = async (req, res) => {
  const { Workshop_id, Trainers } = req.body;
  try {
    Trainers.forEach(async(names)=>{
      await pool.query('INSERT INTO Workshop_Trainers (Workshop_id, Trainer_Name) VALUES (?, ?)',
         [Workshop_id, names]);
    })
    
    res.status(201).json({ message: 'Workshop Created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addSession = async (req, res) => {
  const { Workshop_id, Session_Title } = req.body;
  try {
    await pool.query('INSERT INTO Workshop_Sessions (Workshop_id, Session_Title) VALUES (?, ?)', [Workshop_id, Session_Title]);
    res.status(201).json({ message: 'Session added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
