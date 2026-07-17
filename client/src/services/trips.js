import api from './api';

// Create trip
export const createTrip = async (data) => {
  return api.post('/trips', data);
};

// Get user trips
export const getUserTrips = async (userId) => {
  return api.get(`/trips/user/${userId}`);
};

// Get trip by ID
export const getTripById = async (id) => {
  return api.get(`/trips/${id}`);
};

// Update trip
export const updateTrip = async (id, data) => {
  return api.put(`/trips/${id}`, data);
};

// Save trip
export const saveTrip = async (id) => {
  return api.put(`/trips/${id}/save`, {});
};

// Delete trip
export const deleteTrip = async (id) => {
  return api.delete(`/trips/${id}`);
};

export default {
  createTrip,
  getUserTrips,
  getTripById,
  updateTrip,
  saveTrip,
  deleteTrip
};
