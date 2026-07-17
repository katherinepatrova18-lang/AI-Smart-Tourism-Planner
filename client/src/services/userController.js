import api from './api';

// Get user profile
export const getUserProfile = async () => {
  return api.get('/users/profile');
};

// Update user profile
export const updateUserProfile = async (data) => {
  return api.put('/users/profile', data);
};

// Get user favorites
export const getUserFavorites = async () => {
  return api.get('/users/favorites');
};

// Get user saved trips
export const getUserSavedTrips = async () => {
  return api.get('/users/saved-trips');
};

// Get user bookings
export const getUserBookings = async () => {
  return api.get('/users/bookings');
};

export default {
  getUserProfile,
  updateUserProfile,
  getUserFavorites,
  getUserSavedTrips,
  getUserBookings
};
