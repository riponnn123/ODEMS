const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { verifyToken } = require('../utils/jwt');

router.get('/', eventController.getAllEvents);
router.get('/:E_id', eventController.getEventById);
router.post('/create', verifyToken, eventController.createEvent);
router.post("/prefinalize/:E_id", verifyToken, eventController.preEventDetails);
router.post("/postfinalize/:E_id", verifyToken, eventController.postEventDetails);
router.get('/upcoming', verifyToken,eventController.getUpcomingEventsWithDetails);



module.exports = router;
