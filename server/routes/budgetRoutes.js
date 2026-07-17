const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  createBudget,
  getUserBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget
} = require('../controllers/budgetController');

const router = express.Router();

// POST /api/budgets
router.post('/', authenticateToken, createBudget);

// GET /api/budgets/user/:userId
router.get('/user/:userId', authenticateToken, getUserBudgets);

// GET /api/budgets/:id
router.get('/:id', authenticateToken, getBudgetById);

// PUT /api/budgets/:id
router.put('/:id', authenticateToken, updateBudget);

// DELETE /api/budgets/:id
router.delete('/:id', authenticateToken, deleteBudget);

module.exports = router;
