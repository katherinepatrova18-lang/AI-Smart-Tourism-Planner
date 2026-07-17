const express = require('express');
const { getPlatformStats, getAdminDashboardStats } = require('../controllers/statsController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/stats
router.get('/', getPlatformStats);

// GET /api/stats/admin (Admin)
router.get('/admin/dashboard', authenticateToken, authorizeAdmin, getAdminDashboardStats);

module.exports = router;
