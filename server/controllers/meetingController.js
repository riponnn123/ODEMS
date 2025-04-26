const { pool } = require("../config/db");

exports.createMeeting = async (req, res, next) => {
  const { Agenda, EventId } = req.body;
  try {
    const [result] = await pool.query("INSERT INTO Meeting (Agenda,E_id) VALUES (?,?)", [Agenda,EventId]);
    //console.log("Data",result.insertId);
    req.body.Meeting_id = result.insertId;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addMeetingMember = async (req, res, next) => {
  const { Meeting_id, Members } = req.body;
  try {
    Members.forEach(async (name)=>{
      await pool.query(
        "INSERT INTO Meeting_Members (Meeting_id, Member_Name) VALUES (?, ?)",
        [Meeting_id, name]
      );
    })
    //res.status(200).json({message:"Entered Members"});
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addMeetingPoint = async (req, res) => {
  const { Meeting_id, Points } = req.body;
  try {
    Points.forEach(async(points)=>{
       await pool.query(
      "INSERT INTO Meeting_Points (Meeting_id, Point) VALUES (?, ?)",
      [Meeting_id, points]
      );
  })
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
