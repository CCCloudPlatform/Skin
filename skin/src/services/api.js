import axios from 'axios';

const API_URL = 'https://your-api-url.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add this function to handle token refresh
const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
  try {
    const response = await api.post('/refresh-token', { refreshToken });
    const { token, newRefreshToken } = response.data;
    if (localStorage.getItem('token')) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', newRefreshToken);
    } else {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('refreshToken', newRefreshToken);
    }
    return token;
  } catch (error) {
    throw error.response.data;
  }
};

// Add an interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, logout the user
        logout();
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (credentials, rememberMe) => {
  try {
    const response = await api.post('/login', credentials);
    const { token, refreshToken } = response.data;
    if (rememberMe) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('refreshToken', refreshToken);
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
  localStorage.removeItem('refreshToken');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('refreshToken');
};

export const isLoggedIn = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return !!token;
};

export const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

export default api;
