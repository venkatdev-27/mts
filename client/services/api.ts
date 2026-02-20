import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

if (!import.meta.env.VITE_API_URL && import.meta.env.PROD) {
    console.warn('VITE_API_URL is not set. Falling back to same-origin /api.');
}

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetriableError = (error: any) => {
    if (!error?.response) return true;
    const status = Number(error.response.status);
    return Number.isFinite(status) && status >= 500;
};

const withRetry = async <T>(request: () => Promise<T>, retries = 2): Promise<T> => {
    let lastError: any;

    for (let attempt = 0; attempt <= retries; attempt += 1) {
        try {
            return await request();
        } catch (error) {
            lastError = error;
            const shouldRetry = attempt < retries && isRetriableError(error);
            if (!shouldRetry) break;
            await sleep(1200 * (attempt + 1));
        }
    }

    throw lastError;
};

// Project API calls
export const projectAPI = {
    getAllProjects: async (category?: string, page?: number, limit?: number) => {
        const params: any = {};
        if (category && category !== 'All') params.category = category;
        if (page) params.page = page;
        if (limit) params.limit = limit;

        const response = await withRetry(() => api.get('/projects', { params }));
        return response.data;
    },

    getProjectById: async (id: string) => {
        const response = await withRetry(() => api.get(`/projects/${id}`));
        return response.data;
    },

    createProject: async (projectData: any) => {
        const response = await withRetry(() => api.post('/projects', projectData), 1);
        return response.data;
    },

    updateProject: async (id: string, projectData: any) => {
        const response = await withRetry(() => api.put(`/projects/${id}`, projectData), 1);
        return response.data;
    },

    deleteProject: async (id: string) => {
        const response = await withRetry(() => api.delete(`/projects/${id}`), 1);
        return response.data;
    },
};

// Course API calls
export const courseAPI = {
    getAllCourses: async () => {
        const response = await withRetry(() => api.get('/courses'));
        return response.data;
    },

    getCourseById: async (id: string) => {
        const response = await withRetry(() => api.get(`/courses/${id}`));
        return response.data;
    },
};

// Contact API calls
export const contactAPI = {
    getAllMessages: async () => {
        const response = await withRetry(() => api.get('/contact'));
        return response.data;
    },

    sendMessage: async (messageData: any) => {
        const response = await withRetry(() => api.post('/contact', messageData), 1);
        return response.data;
    },

    markAsRead: async (id: string) => {
        const response = await withRetry(() => api.patch(`/contact/${id}/read`), 1);
        return response.data;
    },

    deleteMessage: async (id: string) => {
        const response = await withRetry(() => api.delete(`/contact/${id}`), 1);
        return response.data;
    },
};

export default api;
