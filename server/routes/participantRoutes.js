const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');

// Get all participants for a specific event
router.get('/event/:eventId', participantController.getEventParticipants);

// Register a student for an event
router.post('/register', participantController.registerParticipant);

// Get all events a student is registered for
router.get('/student/:studentId', participantController.getStudentEvents);

module.exports = router;