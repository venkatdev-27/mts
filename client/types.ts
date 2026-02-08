export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  imageUrl: string;
  technologies: string[];
}

export enum ProjectCategory {
  WEB_DEV = 'Web Development',
  APP_DEV = 'App Development',
  FULL_STACK = 'Full Stack',
  AI_ML = 'AI & Machine Learning',
  IEEE = 'IEEE Standards',
  FINAL_YEAR = 'Final Year Major'
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface CarouselSlide {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
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