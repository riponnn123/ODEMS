const participantModel = require('../models/ParticipantModel');

exports.getParticipantsByEvent = async (req, res) => {
  try {
    const [rows] = await participantModel.getParticipantsByEvent(req.params.eventId);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addParticipant = async (req, res) => {
  try {
    await participantModel.addParticipant(req.body);
    res.status(201).json({ message: 'Participant added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};