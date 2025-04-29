const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken } = require('../utils/jwt');

// router.get('/', adminController.getAllAdmins);
router.post('/admin-login', adminController.adminLogin);
router.post('/approveRequest/:E_id', adminController.approveRequest);
router.post('/rejectRequest/:E_id', adminController.rejectRequest);
router.get('/info', verifyToken, adminController.getAdminInfo);

module.exports = router;