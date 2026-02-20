import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

if (!import.meta.env.VITE_API_URL && import.meta.env.PROD) {
    console.warn('VITE_API_URL is not set. Falling back to same-origin /api.');
}

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include auth token if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
