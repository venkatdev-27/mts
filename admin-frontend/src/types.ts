export interface Project {
    _id?: string;
    id: string;
    title: string;
    category: string;
    description: string;
    imageUrl: string;
    technologies: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface ContactMessage {
    _id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: 'unread' | 'read';
    createdAt: string;
    updatedAt: string;
}

export const PROJECT_CATEGORIES = [
    'Web Development',
    'App Development',
    'Full Stack',
    'AI & Machine Learning',
] as const;

export type ProjectCategory = typeof PROJECT_CATEGORIES[number];
