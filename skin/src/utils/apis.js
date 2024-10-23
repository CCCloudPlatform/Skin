import axios from 'axios';

const API_URL = 'https://your-api-url.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (credentials, rememberMe) => {
  try {
    const response = await api.post('/login', credentials);
    const { token } = response.data;
    if (rememberMe) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const checkIdDuplicate = async (id) => {
  try {
    const response = await api.get(`/check-id/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
};

export const isLoggedIn = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return !!token; // Returns true if token exists, false otherwise
};

export const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

export default api;