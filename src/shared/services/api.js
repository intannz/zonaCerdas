import axios from 'axios';
import { getToken, removeToken } from './authStorage';


const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Ganti dengan URL backend kamu nanti
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response.data; 
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      removeToken();
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default api;