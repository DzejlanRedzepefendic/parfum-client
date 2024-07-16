import axios, { AxiosInstance } from 'axios';


// const isDevelopment = true;

// const URL = isDevelopment ? 'http://localhost:8222/api' : 'https://test-app-7vbq.onrender.com/api';
const API_URL = import.meta.env.VITE_APP_API_URL
console.log(API_URL,"api url")


const axiosInstance: AxiosInstance = axios.create({
  baseURL:  API_URL || "https://parfemi-app-production.up.railway.app/api",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;