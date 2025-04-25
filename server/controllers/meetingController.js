const meetingModel = require("../models/meetingModel");
const { pool } = require("../config/db");
exports.createMeeting = async (req, res, next) => {
  const { Agenda, E_id } = req.body;
  try {
    await db.query("INSERT INTO Meeting (Agenda, E_id) VALUES (?, ?)", [
      Agenda,
      E_id,
    ]);
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addMeetingMember = async (req, res, next) => {
  const { Meeting_id, Member_Name } = req.body;
  try {
    await db.query(
      "INSERT INTO Meeting_Members (Meeting_id, Member_Name) VALUES (?, ?)",
      [Meeting_id, Member_Name]
    );
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addMeetingPoint = async (req, res) => {
  const { Meeting_id, Point } = req.body;
  try {
    await db.query(
      "INSERT INTO Meeting_Points (Meeting_id, Point) VALUES (?, ?)",
      [Meeting_id, Point]
    );
    res.status(201).json({ message: "Meeting created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addMeetingMinute = async (req, res) => {
  const { Meeting_id, Minute } = req.body;
  try {
    await db.query(
      "INSERT INTO Meeting_Minutes (Meeting_id, Minute) VALUES (?, ?)",
      [Meeting_id, Minute]
    );
    //msg
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
