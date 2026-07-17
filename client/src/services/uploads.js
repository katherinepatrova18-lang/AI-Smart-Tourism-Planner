import api from './api';

// Upload single image
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return api.post('/uploads/single', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

// Upload multiple images
export const uploadMultipleImages = async (files) => {
  const formData = new FormData();
  files.forEach(file => formData.append('images', file));
  return api.post('/uploads/multiple', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export default {
  uploadImage,
  uploadMultipleImages
};
