import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/admin/login', credentials),
  
  logout: () =>
    api.post('/auth/admin/logout'),
  
  getProfile: () =>
    api.get('/auth/admin/me'),
};

// Products API
export const productsAPI = {
  getAll: (params?: any) =>
    api.get('/products', { params }),
  
  getById: (id: string) =>
    api.get(`/products/${id}`),
  
  create: (productData: any) =>
    api.post('/products', productData),
  
  update: (id: string, productData: any) =>
    api.put(`/products/${id}`, productData),
  
  delete: (id: string) =>
    api.delete(`/products/${id}`),
};

// Orders API
export const ordersAPI = {
  getAll: (params?: any) =>
    api.get('/orders', { params }),
  
  getById: (id: string) =>
    api.get(`/orders/${id}`),
  
  updateStatus: (id: string, data: { status: string; notes?: string }) =>
    api.patch(`/orders/${id}/status`, data),
  
  getStats: () =>
    api.get('/orders/admin/stats'),
};

// Upload API
export const uploadAPI = {
  uploadProductFiles: (formData: FormData) =>
    api.post('/upload/product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};

// Admin API
export const adminAPI = {
  getDashboard: () =>
    api.get('/admin/dashboard'),
};

// Contact API
export const contactAPI = {
  submit: (contactData: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    inquiryType?: string;
  }) =>
    api.post('/contact/submit', contactData),
  
  getSubmissions: (params?: { page?: number; limit?: number }) =>
    api.get('/contact/submissions', { params }),
  
  getStats: () =>
    api.get('/contact/stats'),
  
  healthCheck: () =>
    api.get('/contact/health'),
};

export default api;
