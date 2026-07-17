const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBooking,
  cancelBooking
} = require('../controllers/bookingController');

const router = express.Router();

// POST /api/bookings
router.post('/', authenticateToken, createBooking);

// GET /api/bookings/user/:userId
router.get('/user/:userId', authenticateToken, getUserBookings);

// GET /api/bookings/:id
router.get('/:id', authenticateToken, getBookingById);

// PUT /api/bookings/:id
router.put('/:id', authenticateToken, updateBooking);

// DELETE /api/bookings/:id/cancel
router.delete('/:id/cancel', authenticateToken, cancelBooking);

module.exports = router;
