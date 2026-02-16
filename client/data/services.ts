import { Service } from '../types';

export const services: Service[] = [
  {
    id: '1',
    title: 'Course Roadmap Training',
    description: 'Structured training aligned to each course level with mentor-led sessions, practical assignments, and weekly progress tracking.',
    iconName: 'BookOpen',
  },
  {
    id: '2',
    title: 'Hands-On Tech Labs',
    description: 'Skill-focused labs in React, Node.js, Python, Java, cloud, and databases so students can convert theory into implementation.',
    iconName: 'Code',
  },
  {
    id: '3',
    title: 'Project Build Support',
    description: 'End-to-end project execution support from planning to final delivery, including architecture guidance, coding reviews, and testing.',
    iconName: 'CheckCircle',
  },
  {
    id: '4',
    title: 'Portfolio and Placement Prep',
    description: 'Resume, GitHub, deployment, and interview preparation support to present completed course projects confidently for placements.',
    iconName: 'FileText',
  },
];
