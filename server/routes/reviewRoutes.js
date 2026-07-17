const express = require('express');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  markHelpful
} = require('../controllers/reviewController');

const router = express.Router();

// POST /api/reviews
router.post('/', authenticateToken, createReview);

// GET /api/reviews
router.get('/', getAllReviews);

// GET /api/reviews/:id
router.get('/:id', getReviewById);

// PUT /api/reviews/:id
router.put('/:id', authenticateToken, updateReview);

// PUT /api/reviews/:id/helpful
router.put('/:id/helpful', markHelpful);

// DELETE /api/reviews/:id (Admin)
router.delete('/:id', authenticateToken, authorizeAdmin, deleteReview);

module.exports = router;
