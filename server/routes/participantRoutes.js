const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');

router.get('/event/:eventId', participantController.getParticipantsByEvent);
router.post('/', participantController.addParticipant);

module.exports = router;