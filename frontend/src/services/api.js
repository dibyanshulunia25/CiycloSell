import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong!';

    // Don't show toast for 401 errors (handled by auth context)
    if (error.response?.status !== 401) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
  addToWishlist: (bicycleId) => api.post(`/auth/wishlist/${bicycleId}`),
  removeFromWishlist: (bicycleId) => api.delete(`/auth/wishlist/${bicycleId}`),
};

// Bicycles API
export const bicyclesAPI = {
  getAllBicycles: (params = {}) => api.get('/bicycles', { params }),
  getBicycleById: (id) => api.get(`/bicycles/${id}`),
  createBicycle: (bicycleData) => api.post('/bicycles', bicycleData),
  updateBicycle: (id, bicycleData) => api.put(`/bicycles/${id}`, bicycleData),
  deleteBicycle: (id) => api.delete(`/bicycles/${id}`),
  getFeaturedBicycles: () => api.get('/bicycles/featured/list'),
  searchBicycles: (query) => api.get(`/bicycles?search=${query}`),
  filterBicycles: (filters) => api.get('/bicycles', { params: filters }),
};

export default api;