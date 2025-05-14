const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');
const { verifyToken } = require('../utils/jwt');

//router.get('/events/details/:E_id', verifyToken, getEventDetails);
router.post('/register', verifyToken, participantController.registerParticipant);
router.get('/student', verifyToken, participantController.getRegisteredEventsForStudent);
router.get('/faculty', verifyToken, participantController.getRegisteredEventsForFaculty);

module.exports = router;

