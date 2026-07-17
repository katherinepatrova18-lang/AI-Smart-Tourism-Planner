import api from './api';

// Get all foods
export const getAllFoods = async (params) => {
  return api.get('/foods', { params });
};

// Get food by ID
export const getFoodById = async (id) => {
  return api.get(`/foods/${id}`);
};

// Create food (Admin)
export const createFood = async (data) => {
  return api.post('/foods', data);
};

// Update food (Admin)
export const updateFood = async (id, data) => {
  return api.put(`/foods/${id}`, data);
};

// Delete food (Admin)
export const deleteFood = async (id) => {
  return api.delete(`/foods/${id}`);
};

export default {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
};
