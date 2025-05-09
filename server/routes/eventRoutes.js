const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { verifyToken } = require('../utils/jwt');

router.get('/', eventController.getAllEvents);
router.post('/create', verifyToken, eventController.createEvent);

module.exports = router;
