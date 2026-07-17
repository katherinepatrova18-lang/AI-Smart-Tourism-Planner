const express = require('express');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const {
  getAllHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel
} = require('../controllers/hotelController');

const router = express.Router();

// GET /api/hotels
router.get('/', getAllHotels);

// GET /api/hotels/:id
router.get('/:id', getHotelById);

// POST /api/hotels (Admin)
router.post('/', authenticateToken, authorizeAdmin, createHotel);

// PUT /api/hotels/:id (Admin)
router.put('/:id', authenticateToken, authorizeAdmin, updateHotel);

// DELETE /api/hotels/:id (Admin)
router.delete('/:id', authenticateToken, authorizeAdmin, deleteHotel);

module.exports = router;
