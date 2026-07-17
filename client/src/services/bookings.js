import api from './api';

// Create booking
export const createBooking = async (data) => {
  return api.post('/bookings', data);
};

// Get user bookings
export const getUserBookings = async (userId) => {
  return api.get(`/bookings/user/${userId}`);
};

// Get booking by ID
export const getBookingById = async (id) => {
  return api.get(`/bookings/${id}`);
};

// Update booking
export const updateBooking = async (id, data) => {
  return api.put(`/bookings/${id}`, data);
};

// Cancel booking
export const cancelBooking = async (id) => {
  return api.delete(`/bookings/${id}/cancel`);
};

export default {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBooking,
  cancelBooking
};
