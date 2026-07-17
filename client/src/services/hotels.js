import api from './api';

// Get all hotels
export const getAllHotels = async (params) => {
  return api.get('/hotels', { params });
};

// Get hotel by ID
export const getHotelById = async (id) => {
  return api.get(`/hotels/${id}`);
};

// Create hotel (Admin)
export const createHotel = async (data) => {
  return api.post('/hotels', data);
};

// Update hotel (Admin)
export const updateHotel = async (id, data) => {
  return api.put(`/hotels/${id}`, data);
};

// Delete hotel (Admin)
export const deleteHotel = async (id) => {
  return api.delete(`/hotels/${id}`);
};

export default {
  getAllHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel
};
