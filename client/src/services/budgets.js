import api from './api';

// Create budget
export const createBudget = async (data) => {
  return api.post('/budgets', data);
};

// Get user budgets
export const getUserBudgets = async (userId) => {
  return api.get(`/budgets/user/${userId}`);
};

// Get budget by ID
export const getBudgetById = async (id) => {
  return api.get(`/budgets/${id}`);
};

// Update budget
export const updateBudget = async (id, data) => {
  return api.put(`/budgets/${id}`, data);
};

// Delete budget
export const deleteBudget = async (id) => {
  return api.delete(`/budgets/${id}`);
};

export default {
  createBudget,
  getUserBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget
};
