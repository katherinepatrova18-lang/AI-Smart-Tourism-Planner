const express = require('express');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadImage, uploadMultipleImages } = require('../controllers/uploadController');

const router = express.Router();

// POST /api/uploads/single
router.post('/single', authenticateToken, authorizeAdmin, upload.single('image'), uploadImage);

// POST /api/uploads/multiple
router.post('/multiple', authenticateToken, authorizeAdmin, upload.array('images', 10), uploadMultipleImages);

module.exports = router;
