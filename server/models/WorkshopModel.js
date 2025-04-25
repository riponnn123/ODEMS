const db = require('../config/db');

exports.createWorkshop = ({ E_id }) => {
  return db.query('INSERT INTO Workshop (E_id) VALUES (?)', [E_id]);
};

exports.addTopic = ({ Workshop_id, Topic }) => {
  return db.query('INSERT INTO Workshop_Topics (Workshop_id, Topic) VALUES (?, ?)', [Workshop_id, Topic]);
};

exports.addTrainer = ({ Workshop_id, Trainer_Name }) => {
  return db.query('INSERT INTO Workshop_Trainers (Workshop_id, Trainer_Name) VALUES (?, ?)', [Workshop_id, Trainer_Name]);
};

exports.addSession = ({ Workshop_id, Session_Title }) => {
  return db.query('INSERT INTO Workshop_Sessions (Workshop_id, Session_Title) VALUES (?, ?)', [Workshop_id, Session_Title]);
};
