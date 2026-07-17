const express = require('express');
const { getAllFoods, getFoodById, createFood, updateFood, deleteFood } = require('../controllers/foodController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/foods
router.get('/', getAllFoods);

// GET /api/foods/:id
router.get('/:id', getFoodById);

// POST /api/foods (Admin)
router.post('/', authenticateToken, authorizeAdmin, createFood);

// PUT /api/foods/:id (Admin)
router.put('/:id', authenticateToken, authorizeAdmin, updateFood);

// DELETE /api/foods/:id (Admin)
router.delete('/:id', authenticateToken, authorizeAdmin, deleteFood);

module.exports = router;
