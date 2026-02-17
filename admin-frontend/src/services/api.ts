import axios from 'axios';


const BASE_URL =
    import.meta.env.VITE_ADMIN_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    '/api';

if (!import.meta.env.VITE_ADMIN_API_BASE_URL && !import.meta.env.VITE_API_URL && import.meta.env.PROD) {
    console.warn('VITE_ADMIN_API_BASE_URL/VITE_API_URL is not set. Falling back to same-origin /api.');
}

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token
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

export const authAPI = {
    login: async (credentials: any) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },
};

// Project API calls (Admin)
export const projectAPI = {
    getAllProjects: async (category?: string, page?: number, limit?: number) => {
        const params: any = {};
        if (category && category !== 'All') params.category = category;
        if (page) params.page = page;
        if (limit) params.limit = limit;

        const response = await api.get('/projects', { params });
        return response.data;
    },

    getProjectById: async (id: string) => {
        const response = await api.get(`/projects/${id}`);
        return response.data;
    },

    createProject: async (projectData: any) => {
        const response = await api.post('/projects', projectData);
        return response.data;
    },

    updateProject: async (id: string, projectData: any) => {
        const response = await api.put(`/projects/${id}`, projectData);
        return response.data;
    },

    deleteProject: async (id: string) => {
        const response = await api.delete(`/projects/${id}`);
        return response.data;
    },
};

// Contact API calls (Admin)
export const contactAPI = {
    getAllMessages: async () => {
        const response = await api.get('/contact');
        return response.data;
    },

    markAsRead: async (id: string) => {
        const response = await api.patch(`/contact/${id}/read`, {});
        return response.data;
    },

    deleteMessage: async (id: string) => {
        const response = await api.delete(`/contact/${id}`);
        return response.data;
    },
};

export default api;
