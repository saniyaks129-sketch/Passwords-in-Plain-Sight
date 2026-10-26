import axios from 'axios';

// 1. Create Axios Instance using Environment Variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor: Attach Auth Token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor: Centralized Error Handling (401, 403, 5xx)
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        console.warn('Global 401 Unauthorized - redirecting to login...');
        // Handle auth cleanup if necessary
      } else if (status === 403) {
        console.error('Global 403 Forbidden action');
      } else if (status >= 500) {
        console.error('Global Server Error');
      }
    }
    return Promise.reject(error);
  }
);

// 4. Exported Service Functions
export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const getCart = (userId = 1) => api.get(`/carts/user/${userId}`);
export const addToCart = (cartData) => api.post('/carts', cartData);
export const deleteCartItem = (cartId) => api.delete(`/carts/${cartId}`);
export const getUserProfile = (userId = 1) => api.get(`/users/${userId}`);
export const updateUserProfile = (userId, userData) => api.put(`/users/${userId}`, userData);

export default api;