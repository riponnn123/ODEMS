const db = require('../config/db');

exports.createMeeting = ({ Agenda, E_id }) => {
  return db.query('INSERT INTO Meeting (Agenda, E_id) VALUES (?, ?)', [Agenda, E_id]);
};

exports.addMeetingMember = ({ Meeting_id, Member_Name }) => {
  return db.query('INSERT INTO Meeting_Members (Meeting_id, Member_Name) VALUES (?, ?)', [Meeting_id, Member_Name]);
};

exports.addMeetingPoint = ({ Meeting_id, Point }) => {
  return db.query('INSERT INTO Meeting_Points (Meeting_id, Point) VALUES (?, ?)', [Meeting_id, Point]);
};

exports.addMeetingMinute = ({ Meeting_id, Minute }) => {
  return db.query('INSERT INTO Meeting_Minutes (Meeting_id, Minute) VALUES (?, ?)', [Meeting_id, Minute]);
};