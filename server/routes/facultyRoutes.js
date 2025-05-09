const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');
const { verifyToken } = require('../utils/jwt');

router.get('/faculty-info', facultyController.getAllFaculty);
//router.post('/create-faculty', facultyController.createFaculty);
router.get('/see-all-req', facultyController.getAllRequests);
router.post('/faculty-login',facultyController.facultyLogin);
router.get('/info', verifyToken, facultyController.getFacultyInfo);


module.exports = router;