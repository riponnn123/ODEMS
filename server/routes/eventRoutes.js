const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { verifyToken } = require('../utils/jwt');

//router.get('/', eventController.getAllEvents);
router.post('/create', verifyToken, eventController.createEvent);
router.get('/upcoming', verifyToken, eventController.getUpcomingEventsWithDetails);
router.get('/get-event/:E_id', eventController.getEventById);
router.get("/completed", verifyToken, eventController.getCompletedEvents);
router.get('/event-details/:E_id', verifyToken,eventController.getFullEventDetailsById);
router.post("/prefinalize/:E_id", verifyToken, eventController.preEventDetails);
router.post("/postfinalize/:E_id", verifyToken, eventController.postEventDetails);

module.exports = router;
