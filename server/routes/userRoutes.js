const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  getUserProfile,
  updateUserProfile,
  getUserFavorites,
  getUserSavedTrips,
  getUserBookings
} = require('../controllers/userController');

const router = express.Router();

// GET /api/users/profile
router.get('/profile', authenticateToken, getUserProfile);

// PUT /api/users/profile
router.put('/profile', authenticateToken, updateUserProfile);

// GET /api/users/favorites
router.get('/favorites', authenticateToken, getUserFavorites);

// GET /api/users/saved-trips
router.get('/saved-trips', authenticateToken, getUserSavedTrips);

// GET /api/users/bookings
router.get('/bookings', authenticateToken, getUserBookings);

module.exports = router;
