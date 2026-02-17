import axios from 'axios';

const API_URL =
    import.meta.env.VITE_ADMIN_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    '/api';

if (!import.meta.env.VITE_ADMIN_API_BASE_URL && !import.meta.env.VITE_API_URL && import.meta.env.PROD) {
    console.warn('VITE_ADMIN_API_BASE_URL/VITE_API_URL is not set. Falling back to same-origin /api.');
}

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

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

export default api;
