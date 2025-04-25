const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');

router.get('/faculty-info', facultyController.getAllFaculty);
router.post('/create-faculty', facultyController.createFaculty);

module.exports = router;