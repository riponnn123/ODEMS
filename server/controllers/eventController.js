const { pool } = require("../config/db");

exports.getAllEvents = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Event");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createEvent = async (req, res) => {
  const { E_title, E_type, V_name, Date, Time, Duration, Organizer } = req.body;
  const { F_id } = req.user; // ✅ pulled from JWT payload

  try {
    const response = await pool.query(
      `SELECT V_id FROM Venue WHERE V_name = ?`,
      [V_name]
    );
    console.log(response);
    const vid = response[0][0].V_id;

    const [eventResult] = await pool.query(
      `INSERT INTO Event (E_title, E_type, V_id, Date, Time, Duration, Organizer, ConfirmationStatus, F_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, false, ?)`,
      [E_title, E_type, vid, Date, Time, Duration, Organizer, F_id]
    );

    const insertedId = eventResult.insertId;

    if (E_type === "Workshop") {
      await pool.query("INSERT INTO Workshop (E_id) VALUES (?)", [insertedId]);
    } else if (E_type === "Meeting") {
      await pool.query("INSERT INTO Meeting (Agenda, E_id) VALUES (?, ?)", [
        "",
        insertedId,
      ]);
    } else if (E_type === "Conferences") {
      await pool.query("INSERT INTO Conference (Theme, E_id) VALUES (?, ?)", [
        "",
        insertedId,
      ]);
    }

    res.status(201).json({ message: "Event created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEventById = async (req, res) => {
  const { E_id } = req.params;
  //console.log("Event ID:", E_id); // ✅ log event ID
  try {
    const [rows] = await pool.query("SELECT * FROM Event WHERE E_id = ?", [
      E_id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.preEventDetails = async (req, res) => {
  const { E_id } = req.params;
  const { Agenda, Members, Points, Topics, Trainers, Theme, Speakers } =
    req.body;

  try {
    const [[eventRow]] = await pool.query(
      "SELECT * FROM Event WHERE E_id = ? AND ConfirmationStatus = 1",
      [E_id]
    );

    if (!eventRow) {
      return res.status(404).json({ message: "Approved event not found" });
    }

    const type = eventRow.E_type;

    if (type === "Meeting") {
      const [meetingResult] = await pool.query(
        "INSERT INTO Meeting (Agenda, E_id) VALUES (?, ?)",
        [Agenda, E_id]
      );
      const Meeting_id = meetingResult.insertId;

      const memberArr = Members?.split(",").map((m) => m.trim()) || [];
      const pointArr = Points?.split(",").map((p) => p.trim()) || [];

      for (const m of memberArr) {
        await pool.query(
          "INSERT INTO Meeting_Members (Meeting_id, Member_Name) VALUES (?, ?)",
          [Meeting_id, m]
        );
      }

      for (const p of pointArr) {
        await pool.query(
          "INSERT INTO Meeting_Points (Meeting_id, Point) VALUES (?, ?)",
          [Meeting_id, p]
        );
      }
    } else if (type === "Workshop") {
      const [workshopResult] = await pool.query(
        "INSERT INTO Workshop (E_id) VALUES (?)",
        [E_id]
      );
      const Workshop_id = workshopResult.insertId;

      const topicArr = Topics?.split(",").map((t) => t.trim()) || [];
      const trainerArr = Trainers?.split(",").map((t) => t.trim()) || [];

      for (const t of topicArr) {
        await pool.query(
          "INSERT INTO Workshop_Topics (Workshop_id, Topic) VALUES (?, ?)",
          [Workshop_id, t]
        );
      }

      for (const t of trainerArr) {
        await pool.query(
          "INSERT INTO Workshop_Trainers (Workshop_id, Trainer_Name) VALUES (?, ?)",
          [Workshop_id, t]
        );
      }
    } else if (type === "Conferences") {
      const [confResult] = await pool.query(
        "INSERT INTO Conference (Theme, E_id) VALUES (?, ?)",
        [Theme, E_id]
      );
      const Conference_id = confResult.insertId;

      const speakerArr = Speakers?.split(",").map((s) => s.trim()) || [];

      for (const s of speakerArr) {
        await pool.query(
          "INSERT INTO Conference_Speakers (Conference_id, Speaker_Name) VALUES (?, ?)",
          [Conference_id, s]
        );
      }
    }

    res.status(200).json({ message: `${type} details saved successfully.` });
  } catch (err) {
    console.error("Finalize error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.postEventDetails = async (req, res) => {
  const { E_id } = req.params;
  const { Minutes, Sessions, Papers } = req.body;
  try {
    const [[event]] = await pool.query("SELECT * FROM Event WHERE E_id = ?", [
      E_id,
    ]);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const type = event.E_type;

    if (type === "Meeting" && Minutes) {
      const [[meeting]] = await pool.query(
        "SELECT Meeting_id FROM Meeting WHERE E_id = ?",
        [E_id]
      );
      const Meeting_id = meeting?.Meeting_id;

      const minuteArr = Minutes.split(",").map((m) => m.trim());
      for (const m of minuteArr) {
        await pool.query(
          "INSERT INTO Meeting_Minutes (Meeting_id, Minute) VALUES (?, ?)",
          [Meeting_id, m]
        );
      }
    } else if (type === "Workshop" && Sessions) {
      const [[workshop]] = await pool.query(
        "SELECT Workshop_id FROM Workshop WHERE E_id = ?",
        [E_id]
      );
      const Workshop_id = workshop?.Workshop_id;

      const sessionArr = Sessions.split(",").map((s) => s.trim());
      for (const s of sessionArr) {
        await pool.query(
          "INSERT INTO Workshop_Sessions (Workshop_id, Session_Title) VALUES (?, ?)",
          [Workshop_id, s]
        );
      }
    } else if (type === "Conferences" && Papers) {
      const [[conference]] = await pool.query(
        "SELECT Conference_id FROM Conference WHERE E_id = ?",
        [E_id]
      );
      const Conference_id = conference?.Conference_id;

      const paperArr = Papers.split(",").map((p) => p.trim());
      for (const p of paperArr) {
        await pool.query(
          "INSERT INTO Conference_Papers (Conference_id, Paper_Title) VALUES (?, ?)",
          [Conference_id, p]
        );
      }
    }

    res.status(200).json({ message: `${type} post-event data saved.` });
  } catch (err) {
    console.error("Post-finalization error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getCompletedEvents = async (req, res) => {
  try {
    const facultyId = req.user.F_id;
    const [events] = await pool.query(
      `SELECT E.*, V.V_name 
       FROM Event E
       JOIN Venue V ON E.V_id = V.V_id
       WHERE E.F_id = ? AND E.Date < CURDATE() AND E.ConfirmationStatus = 1`,
      [facultyId]
    );
    //console.log("Total completed events:", events.length);
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUpcomingEventsWithDetails = async (req, res) => {
  //console.log("LEAVME")
  try {
    const [events] = await pool.query(
      `SELECT E.*, V.V_name FROM Event E
       JOIN Venue V ON E.V_id = V.V_id
       WHERE E.ConfirmationStatus = 1 AND E.Date >= CURDATE()`
    );
    //console.log("Total upcoming confirmed events:", events.length);
    //events.forEach(ev => console.log(`Event: ${ev.E_title}, Date: ${ev.Date}, Confirmed: ${ev.ConfirmationStatus}`));



    //console.log("✅ Events fetched:", events); // ✅ log event data
    // ✅ Return empty list if no events
    if (events.length === 0) {
      return res.status(200).json([]);
    }

    const detailedEvents = await Promise.all(
      events.map(async (event) => {
        let details = {};

        if (event.E_type === "Meeting") {
          const [[meeting]] = await pool.query(
            "SELECT Agenda FROM Meeting WHERE E_id = ?",
            [event.E_id]
          );
          details = meeting || {};
        } else if (event.E_type === "Workshop") {
          const [[workshop]] = await pool.query(
            "SELECT Workshop_id FROM Workshop WHERE E_id = ?",
            [event.E_id]
          );
          if (workshop) {
            const [topics] = await pool.query(
              "SELECT Topic FROM Workshop_Topics WHERE Workshop_id = ?",
              [workshop.Workshop_id]
            );
            const [trainers] = await pool.query(
              "SELECT Trainer_Name FROM Workshop_Trainers WHERE Workshop_id = ?",
              [workshop.Workshop_id]
            );
            details = {
              Topics: topics.map((t) => t.Topic),
              Trainers: trainers.map((t) => t.Trainer_Name),
            };
          }
        } else if (event.E_type === "Conferences") {
          const [[conference]] = await pool.query(
            "SELECT Conference_id, Theme FROM Conference WHERE E_id = ?",
            [event.E_id]
          );
          if (conference) {
            const [speakers] = await pool.query(
              "SELECT Speaker_Name FROM Conference_Speakers WHERE Conference_id = ?",
              [conference.Conference_id]
            );
            details = {
              Theme: conference.Theme,
              Speakers: speakers.map((s) => s.Speaker_Name),
            };
          }
        }

        return { ...event, ...details };
      })
    );

    res.status(200).json(detailedEvents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFullEventDetailsById = async (req, res) => {
  const { E_id } = req.params;

  try {
    // Get base event details
    const [[event]] = await pool.query(
      `
      SELECT E.*, V.V_name 
      FROM Event E
      JOIN Venue V ON E.V_id = V.V_id
      WHERE E.E_id = ?
    `,
      [E_id]
    );

    if (!event) return res.status(404).json({ message: "Event not found" });

    const fullEvent = { ...event };

    // Append pre-final details based on event type
    if (event.E_type === "Meeting") {
      const [meetingResults] = await pool.query(
        `SELECT Agenda FROM Meeting WHERE E_id = ?`,
        [E_id]
      );
      const meeting = meetingResults[1] || {};
      //console.log("dfhf",meetingResults);
      const [members] = await pool.query(
        `SELECT Member_Name FROM Meeting_Members WHERE Meeting_id IN (SELECT Meeting_id FROM Meeting WHERE E_id = ?)`,
        [E_id]
      );
      const [points] = await pool.query(
        `SELECT Point FROM Meeting_Points WHERE Meeting_id IN (SELECT Meeting_id FROM Meeting WHERE E_id = ?)`,
        [E_id]
      );

      fullEvent.Agenda = meeting.Agenda || "No agenda available.";
      fullEvent.Members = members.map((m) => m.Member_Name);
      fullEvent.Points = points.map((p) => p.Point);
    } else if (event.E_type === "Workshop") {
      const [[workshop]] = await pool.query(
        `SELECT Workshop_id FROM Workshop WHERE E_id = ?`,
        [E_id]
      );

      const [topics] = await pool.query(
        `SELECT Topic FROM Workshop_Topics WHERE Workshop_id IN (SELECT Workshop_id FROM Workshop WHERE E_id = ?)`,
        [E_id]
      );

      const [trainers] = await pool.query(
        `SELECT Trainer_Name FROM Workshop_Trainers WHERE Workshop_id IN (SELECT Workshop_id FROM Workshop WHERE E_id = ?)`,
        [E_id]
      );

      fullEvent.Topics = topics.map((t) => t.Topic);
      fullEvent.Trainers = trainers.map((t) => t.Trainer_Name);
    } else if (event.E_type === "Conferences") {
      const [confResults] = await pool.query(
       `SELECT Theme FROM Conference WHERE Conference_id IN (SELECT Conference_id FROM Conference WHERE E_id = ?)`,
        [E_id]
      );
      const conference = confResults[1] || {};

      const [speakers] = await pool.query(
        `SELECT Speaker_Name FROM Conference_Speakers WHERE Conference_id IN (SELECT Conference_id FROM Conference WHERE E_id = ?)`,
        [E_id]
      );

      fullEvent.Theme = conference.Theme || "No theme specified.";
      fullEvent.Speakers = speakers.map((s) => s.Speaker_Name);
    }

    res.status(200).json(fullEvent);
  } catch (err) {
    console.error("Get Event by ID Error:", err);
    res.status(500).json({ error: err.message });
  }
};
