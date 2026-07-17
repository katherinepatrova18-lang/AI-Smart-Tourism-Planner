import api from './api';

// Get all destinations
export const getAllDestinations = async (params) => {
  return api.get('/destinations', { params });
};

// Get destination by ID
export const getDestinationById = async (id) => {
  return api.get(`/destinations/${id}`);
};

// Get popular destinations
export const getPopularDestinations = async () => {
  return api.get('/destinations/popular');
};

// Create destination (Admin)
export const createDestination = async (data) => {
  return api.post('/destinations', data);
};

// Update destination (Admin)
export const updateDestination = async (id, data) => {
  return api.put(`/destinations/${id}`, data);
};

// Delete destination (Admin)
export const deleteDestination = async (id) => {
  return api.delete(`/destinations/${id}`);
};

export default {
  getAllDestinations,
  getDestinationById,
  getPopularDestinations,
  createDestination,
  updateDestination,
  deleteDestination
};
