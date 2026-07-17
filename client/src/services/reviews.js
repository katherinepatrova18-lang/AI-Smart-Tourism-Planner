import api from './api';

// Create review
export const createReview = async (data) => {
  return api.post('/reviews', data);
};

// Get all reviews
export const getAllReviews = async (params) => {
  return api.get('/reviews', { params });
};

// Get review by ID
export const getReviewById = async (id) => {
  return api.get(`/reviews/${id}`);
};

// Update review
export const updateReview = async (id, data) => {
  return api.put(`/reviews/${id}`, data);
};

// Mark review as helpful
export const markHelpful = async (id) => {
  return api.put(`/reviews/${id}/helpful`, {});
};

// Delete review (Admin)
export const deleteReview = async (id) => {
  return api.delete(`/reviews/${id}`);
};

export default {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  markHelpful,
  deleteReview
};
