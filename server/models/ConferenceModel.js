const db = require('../config/db');

exports.createConference = ({ Theme, E_id }) => {
  return db.query('INSERT INTO Conference (Theme, E_id) VALUES (?, ?)', [Theme, E_id]);
};

exports.addSpeaker = ({ Conference_id, Speaker_Name }) => {
  return db.query('INSERT INTO Conference_Speakers (Conference_id, Speaker_Name) VALUES (?, ?)', [Conference_id, Speaker_Name]);
};

exports.addPaper = ({ Conference_id, Paper_Title }) => {
  return db.query('INSERT INTO Conference_Papers (Conference_id, Paper_Title) VALUES (?, ?)', [Conference_id, Paper_Title]);
};