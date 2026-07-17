const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  createTrip,
  getUserTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  saveTrip
} = require('../controllers/tripController');

const router = express.Router();

// POST /api/trips
router.post('/', authenticateToken, createTrip);

// GET /api/trips/user/:userId
router.get('/user/:userId', authenticateToken, getUserTrips);

// GET /api/trips/:id
router.get('/:id', authenticateToken, getTripById);

// PUT /api/trips/:id
router.put('/:id', authenticateToken, updateTrip);

// PUT /api/trips/:id/save
router.put('/:id/save', authenticateToken, saveTrip);

// DELETE /api/trips/:id
router.delete('/:id', authenticateToken, deleteTrip);

module.exports = router;
