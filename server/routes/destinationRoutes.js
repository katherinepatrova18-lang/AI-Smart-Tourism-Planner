const express = require('express');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
  getPopularDestinations
} = require('../controllers/destinationController');

const router = express.Router();

// GET /api/destinations
router.get('/', getAllDestinations);

// GET /api/destinations/popular
router.get('/popular', getPopularDestinations);

// GET /api/destinations/:id
router.get('/:id', getDestinationById);

// POST /api/destinations (Admin)
router.post('/', authenticateToken, authorizeAdmin, createDestination);

// PUT /api/destinations/:id (Admin)
router.put('/:id', authenticateToken, authorizeAdmin, updateDestination);

// DELETE /api/destinations/:id (Admin)
router.delete('/:id', authenticateToken, authorizeAdmin, deleteDestination);

module.exports = router;
