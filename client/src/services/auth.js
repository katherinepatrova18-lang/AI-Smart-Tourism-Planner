import api from './api';

// Signup
export const signup = async (data) => {
  return api.post('/auth/signup', data);
};

// Login
export const login = async (email, password) => {
  return api.post('/auth/login', { email, password });
};

export default {
  signup,
  login
};
