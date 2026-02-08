import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Project API calls
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

// Contact API calls
export const contactAPI = {
    getAllMessages: async () => {
        const response = await api.get('/contact');
        return response.data;
    },

    sendMessage: async (messageData: any) => {
        const response = await api.post('/contact', messageData);
        return response.data;
    },

    markAsRead: async (id: string) => {
        const response = await api.patch(`/contact/${id}/read`);
        return response.data;
    },

    deleteMessage: async (id: string) => {
        const response = await api.delete(`/contact/${id}`);
        return response.data;
    },
};

export default api;
