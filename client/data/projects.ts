import { Project, ProjectCategory } from '../types';

const baseProjects: Project[] = [
  // --- WEB DEVELOPMENT PROJECTS (10) ---
  {
    id: 'web-1',
    title: 'Smart College Management System',
    category: ProjectCategory.WEB_DEV,
    description: 'A comprehensive web portal for managing students, faculty, attendance, and academic records efficiently.',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
  },
  {
    id: 'web-2',
    title: 'Online Examination Portal',
    category: ProjectCategory.WEB_DEV,
    description: 'Secure platform for conducting online exams with auto-evaluation, timer features, and result generation.',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'Express', 'MongoDB'],
  },
  {
    id: 'web-3',
    title: 'Placement Management System',
    category: ProjectCategory.WEB_DEV,
    description: 'Digital platform to streamline the campus recruitment process, connecting students with recruiters.',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'Node.js', 'MySQL'],
  },
  {
    id: 'web-4',
    title: 'Student Internship Tracking',
    category: ProjectCategory.WEB_DEV,
    description: 'Portal for students to log internship activities and for faculty to monitor progress and approve reports.',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'Firebase', 'Tailwind'],
  },
  {
    id: 'web-5',
    title: 'E-Commerce Dashboard',
    category: ProjectCategory.WEB_DEV,
    description: 'A feature-rich admin dashboard for managing products, orders, customers, and sales analytics.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'Redux', 'Chart.js'],
  },
  {
    id: 'web-6',
    title: 'Online Certification Platform',
    category: ProjectCategory.WEB_DEV,
    description: 'Educational platform offering courses and auto-generating certificates upon course completion.',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'Node.js', 'PDFKit'],
  },
  {
    id: 'web-7',
    title: 'Hospital Appointment Booking',
    category: ProjectCategory.WEB_DEV,
    description: 'User-friendly system for patients to book appointments with doctors and view medical history.',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'Express', 'PostgreSQL'],
  },
  {
    id: 'web-8',
    title: 'Event Management Website',
    category: ProjectCategory.WEB_DEV,
    description: 'Platform to organize college fests and events, handling registrations and scheduling.',
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'Firebase', 'Stripe API'],
  },
  {
    id: 'web-9',
    title: 'Job Portal for Freshers',
    category: ProjectCategory.WEB_DEV,
    description: 'Dedicated job board for fresh graduates to find entry-level opportunities and apply easily.',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 'web-10',
    title: 'Online Feedback System',
    category: ProjectCategory.WEB_DEV,
    description: 'Anonymous feedback and survey system for colleges to gather student opinions on facilities.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'Chart.js', 'Firebase'],
  },

  // --- MOBILE APP DEVELOPMENT PROJECTS (8) ---
  {
    id: 'app-1',
    title: 'College Events App',
    category: ProjectCategory.APP_DEV,
    description: 'Mobile application to notify students about upcoming college events, workshops, and holidays.',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    technologies: ['React Native', 'Firebase'],
  },
  {
    id: 'app-2',
    title: 'Student Expense Tracker',
    category: ProjectCategory.APP_DEV,
    description: 'Personal finance management app designed for students to track daily spending and budget.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
    technologies: ['Flutter', 'SQLite'],
  },
  {
    id: 'app-3',
    title: 'QR-Based Attendance',
    category: ProjectCategory.APP_DEV,
    description: 'Touchless attendance system using QR codes scanned via mobile devices for classrooms.',
    imageUrl: 'https://images.unsplash.com/photo-1595079676339-1534827d8c11?auto=format&fit=crop&q=80&w=800',
    technologies: ['React Native', 'Camera API', 'Node.js'],
  },
  {
    id: 'app-4',
    title: 'Online Learning App',
    category: ProjectCategory.APP_DEV,
    description: 'Mobile learning platform with video lectures, quizzes, and study material access.',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
    technologies: ['Flutter', 'Firebase', 'Video Player'],
  },
  {
    id: 'app-5',
    title: 'Campus Food Ordering',
    category: ProjectCategory.APP_DEV,
    description: 'App for ordering food from the college canteen to avoid long queues during breaks.',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
    technologies: ['React Native', 'Redux', 'Node.js'],
  },
  {
    id: 'app-6',
    title: 'Fitness & Health Tracker',
    category: ProjectCategory.APP_DEV,
    description: 'Health monitoring app tracking steps, water intake, and exercise routines.',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800',
    technologies: ['Flutter', 'Google Fit API'],
  },
  {
    id: 'app-7',
    title: 'Hostel Management App',
    category: ProjectCategory.APP_DEV,
    description: 'App for hostel students to file complaints, apply for leave, and view mess menus.',
    imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800',
    technologies: ['React Native', 'Firebase'],
  },
  {
    id: 'app-8',
    title: 'Student Community Chat',
    category: ProjectCategory.APP_DEV,
    description: 'Real-time messaging app for student groups and clubs to collaborate and discuss.',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
    technologies: ['Flutter', 'Firebase Firestore'],
  },

  // --- FULL STACK PROJECTS (12) ---
  {
    id: 'fs-1',
    title: 'MERN E-Commerce Platform',
    category: ProjectCategory.FULL_STACK,
    description: 'Complete online shopping solution with cart, payment gateway, and order management.',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
  },
  {
    id: 'fs-2',
    title: 'Real-Time Chat Application',
    category: ProjectCategory.FULL_STACK,
    description: 'Instant messaging application supporting private and group chats using WebSockets.',
    imageUrl: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&q=80&w=800',
    technologies: ['Socket.io', 'React', 'Node.js'],
  },
  {
    id: 'fs-3',
    title: 'Project Submission System',
    category: ProjectCategory.FULL_STACK,
    description: 'Portal for students to upload project files and mentors to review and grade them.',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800',
    technologies: ['MERN Stack', 'AWS S3'],
  },
  {
    id: 'fs-4',
    title: 'Learning Management System',
    category: ProjectCategory.FULL_STACK,
    description: 'Robust LMS for managing course content, student enrollment, and progress tracking.',
    imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800',
    technologies: ['Django', 'PostgreSQL', 'React'],
  },
  {
    id: 'fs-5',
    title: 'Educational CRM System',
    category: ProjectCategory.FULL_STACK,
    description: 'Customer Relationship Management tool tailored for educational institutes to manage leads.',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    technologies: ['Django', 'Rest Framework', 'React'],
  },
  {
    id: 'fs-6',
    title: 'Task Management Tool',
    category: ProjectCategory.FULL_STACK,
    description: 'Kanban-style project management tool similar to Trello for team collaboration.',
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'DnD', 'Node.js', 'MongoDB'],
  },
  {
    id: 'fs-7',
    title: 'Online Voting System',
    category: ProjectCategory.FULL_STACK,
    description: 'Secure voting platform with multi-factor authentication for college elections.',
    imageUrl: 'https://images.unsplash.com/photo-1540910419868-474947ce571d?auto=format&fit=crop&q=80&w=800',
    technologies: ['MERN Stack', 'JWT'],
  },
  {
    id: 'fs-8',
    title: 'Inventory Management',
    category: ProjectCategory.FULL_STACK,
    description: 'System to track stock levels, orders, and sales for college stores or labs.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'Node.js', 'MySQL'],
  },
  {
    id: 'fs-9',
    title: 'Online Banking App',
    category: ProjectCategory.FULL_STACK,
    description: 'Simulated banking application allowing fund transfers and transaction history views.',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800',
    technologies: ['Django', 'Angular', 'Secure Auth'],
  },
  {
    id: 'fs-10',
    title: 'SaaS Subscription Manager',
    category: ProjectCategory.FULL_STACK,
    description: 'Platform to manage user subscriptions, billing cycles, and access levels.',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800',
    technologies: ['Next.js', 'Stripe', 'Supabase'],
  },
  {
    id: 'fs-11',
    title: 'Resume Builder Web App',
    category: ProjectCategory.FULL_STACK,
    description: 'Interactive tool helping students create professional resumes with various templates.',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'Node.js', 'PDF Generation'],
  },
  {
    id: 'fs-12',
    title: 'Blog Platform with CMS',
    category: ProjectCategory.FULL_STACK,
    description: 'Content management system for creating, editing, and publishing blog posts.',
    imageUrl: 'https://images.unsplash.com/photo-1499750310159-5254f4127278?auto=format&fit=crop&q=80&w=800',
    technologies: ['Django', 'PostgreSQL', 'Bootstrap'],
  },

  // --- AI & MACHINE LEARNING PROJECTS (10) ---
  {
    id: 'ai-1',
    title: 'AI Resume Screening',
    category: ProjectCategory.AI_ML,
    description: 'Automated system using NLP to parse resumes and rank candidates based on job descriptions.',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800',
    technologies: ['Python', 'NLP', 'Flask'],
  },
  {
    id: 'ai-2',
    title: 'College Enquiry Chatbot',
    category: ProjectCategory.AI_ML,
    description: 'Intelligent chatbot capable of answering student queries about admissions and courses.',
    imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800',
    technologies: ['Python', 'TensorFlow', 'React'],
  },
  {
    id: 'ai-3',
    title: 'Fake News Detection',
    category: ProjectCategory.AI_ML,
    description: 'Machine learning model trained to identify and flag misinformation in news articles.',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800',
    technologies: ['Python', 'Scikit-learn', 'NLP'],
  },
  {
    id: 'ai-4',
    title: 'Student Performance Prediction',
    category: ProjectCategory.AI_ML,
    description: 'Predictive analytics tool to forecast student grades based on historical performance data.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    technologies: ['Python', 'Pandas', 'Matplotlib'],
  },
  {
    id: 'ai-5',
    title: 'Face Recognition Attendance',
    category: ProjectCategory.AI_ML,
    description: 'Biometric attendance system recognizing student faces from a video feed.',
    imageUrl: 'https://images.unsplash.com/photo-1555449372-545219d0a3ac?auto=format&fit=crop&q=80&w=800',
    technologies: ['OpenCV', 'Python', 'Deep Learning'],
  },
  {
    id: 'ai-6',
    title: 'AI Recommendation System',
    category: ProjectCategory.AI_ML,
    description: 'System suggesting relevant courses and job openings to students based on interests.',
    imageUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=800',
    technologies: ['Python', 'Collaborative Filtering'],
  },
  {
    id: 'ai-7',
    title: 'Emotion Detection',
    category: ProjectCategory.AI_ML,
    description: 'Deep learning model analyzing facial expressions to determine emotional states.',
    imageUrl: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&q=80&w=800',
    technologies: ['Keras', 'CNN', 'Python'],
  },
  {
    id: 'ai-8',
    title: 'AI Career Guidance',
    category: ProjectCategory.AI_ML,
    description: 'Expert system assisting students in choosing career paths based on skills and aptitude.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    technologies: ['Python', 'Expert Systems'],
  },
  {
    id: 'ai-9',
    title: 'Fraud Detection System',
    category: ProjectCategory.AI_ML,
    description: 'Algorithm to detect anomalies and fraudulent transactions in financial datasets.',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800',
    technologies: ['Python', 'Random Forest', 'Scikit-learn'],
  },
  {
    id: 'ai-10',
    title: 'Voice Virtual Assistant',
    category: ProjectCategory.AI_ML,
    description: 'Voice-controlled assistant performing tasks like setting reminders and web search.',
    imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800',
    technologies: ['Python', 'SpeechRecognition', 'PyAudio'],
  },

  // --- ADVANCED PROJECTS (10) ---
  {
    id: 'ieee-1',
    title: 'Blockchain Certificate Verify',
    category: ProjectCategory.FULL_STACK,
    description: 'Decentralized application for issuing and verifying tamper-proof academic certificates.',
    imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800',
    technologies: ['Solidity', 'Ethereum', 'Web3.js'],
  },
  {
    id: 'ieee-2',
    title: 'Secure Online Voting (IEEE)',
    category: ProjectCategory.FULL_STACK,
    description: 'Cryptographically secure voting system ensuring anonymity and integrity of votes.',
    imageUrl: 'https://images.unsplash.com/photo-1540910419868-474947ce571d?auto=format&fit=crop&q=80&w=800',
    technologies: ['Blockchain', 'React', 'Node.js'],
  },
  {
    id: 'fy-1',
    title: 'Smart Traffic Management',
    category: ProjectCategory.AI_ML,
    description: 'IoT system controlling traffic lights dynamically based on vehicle density.',
    imageUrl: 'https://images.unsplash.com/photo-1589938812613-2d2426372d3d?auto=format&fit=crop&q=80&w=800',
    technologies: ['IoT', 'Arduino', 'Python'],
  },
  {
    id: 'fy-2',
    title: 'IoT Smart Home Automation',
    category: ProjectCategory.AI_ML,
    description: 'System to control home appliances remotely via mobile app using IoT sensors.',
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&q=80&w=800',
    technologies: ['IoT', 'ESP8266', 'Flutter'],
  },
  {
    id: 'fy-3',
    title: 'Cloud File Storage System',
    category: ProjectCategory.FULL_STACK,
    description: 'Secure cloud storage solution with encryption and file sharing capabilities.',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
    technologies: ['AWS', 'React', 'Node.js'],
  },
  {
    id: 'ieee-3',
    title: 'Intrusion Detection System',
    category: ProjectCategory.AI_ML,
    description: 'Network security system using machine learning to detect malicious activities.',
    imageUrl: 'https://images.unsplash.com/photo-1563206767-5b1d972e9fb9?auto=format&fit=crop&q=80&w=800',
    technologies: ['Python', 'Keras', 'Networking'],
  },
  {
    id: 'fy-4',
    title: 'Smart Healthcare Monitoring',
    category: ProjectCategory.AI_ML,
    description: 'Remote patient monitoring system tracking vital signs using wearable sensors.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    technologies: ['IoT', 'Cloud', 'Android'],
  },
  {
    id: 'ieee-4',
    title: 'Data Leakage Detection',
    category: ProjectCategory.AI_ML,
    description: 'Security framework to identify and prevent unauthorized data transmission.',
    imageUrl: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&q=80&w=800',
    technologies: ['Cybersecurity', 'Python', 'Java'],
  },
  {
    id: 'fy-5',
    title: 'Smart Agriculture System',
    category: ProjectCategory.AI_ML,
    description: 'IoT solution for automated irrigation and soil moisture monitoring for farmers.',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-f8196812c854?auto=format&fit=crop&q=80&w=800',
    technologies: ['IoT', 'Sensors', 'Mobile App'],
  },
  {
    id: 'fy-6',
    title: 'AI Online Proctoring',
    category: ProjectCategory.AI_ML,
    description: 'Automated proctoring system for online exams using webcam gaze tracking.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
    technologies: ['Computer Vision', 'Python', 'WebRTC'],
  },
];

const CATEGORY_TECH_STACKS: Record<ProjectCategory, string[]> = {
  [ProjectCategory.WEB_DEV]: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT'],
  [ProjectCategory.APP_DEV]: ['React Native', 'TypeScript', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'Firebase Cloud Messaging'],
  [ProjectCategory.FULL_STACK]: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
  [ProjectCategory.AI_ML]: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'FastAPI', 'PostgreSQL', 'Docker'],
};

const WEB_ALLOWED_TECHS = new Set<string>([
  'React',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Express',
  'MongoDB',
  'MySQL',
  'PostgreSQL',
  'Tailwind CSS',
  'Bootstrap',
  'Redux',
  'Redux Toolkit',
  'JWT',
  'Firebase',
  'Chart.js',
  'Stripe API',
  'Razorpay',
  'REST API',
  'AWS S3',
  'Cloudinary',
  'PDFKit',
  'Socket.IO',
  'WebRTC',
  'Nginx',
  'Docker',
  'Git',
]);

const FULL_STACK_ALLOWED_TECHS = new Set<string>([
  'React',
  'TypeScript',
  'JavaScript',
  'Next.js',
  'Node.js',
  'Express',
  'MongoDB',
  'PostgreSQL',
  'MySQL',
  'Redis',
  'Docker',
  'JWT',
  'REST API',
  'GraphQL',
  'AWS S3',
  'Stripe',
  'Razorpay',
  'Socket.IO',
  'Nginx',
  'Prisma',
  'Supabase',
  'Django',
  'Django REST Framework',
]);

const AI_ML_ALLOWED_TECHS = new Set<string>([
  'Python',
  'Pandas',
  'NumPy',
  'scikit-learn',
  'TensorFlow',
  'PyTorch',
  'Keras',
  'OpenCV',
  'NLP',
  'spaCy',
  'NLTK',
  'Transformers',
  'FastAPI',
  'Flask',
  'Jupyter',
  'Matplotlib',
  'Seaborn',
  'XGBoost',
  'LightGBM',
  'MLflow',
  'Docker',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Computer Vision',
  'Deep Learning',
  'SpeechRecognition',
  'PyAudio',
  'FaceNet',
  'LangChain',
]);

const APP_DEV_ALLOWED_TECHS = new Set<string>([
  'React Native',
  'Flutter',
  'Dart',
  'TypeScript',
  'JavaScript',
  'Kotlin',
  'Swift',
  'Redux Toolkit',
  'Firebase',
  'Firebase Firestore',
  'Firebase Cloud Messaging',
  'SQLite',
  'Room Database',
  'Node.js',
  'Express',
  'MongoDB',
  'PostgreSQL',
  'REST API',
  'GraphQL',
  'JWT',
  'Camera API',
  'Google Fit API',
  'Video Player',
  'Push Notifications',
  'WebSockets',
  'Socket.IO',
]);

const TITLE_TECH_HINTS: Array<{ pattern: RegExp; technologies: string[] }> = [
  { pattern: /exam|proctor/i, technologies: ['WebRTC', 'OpenCV', 'JWT', 'Role-Based Access Control'] },
  { pattern: /attendance|recognition/i, technologies: ['OpenCV', 'FaceNet', 'WebRTC', 'Firebase'] },
  { pattern: /chat|chatbot|assistant/i, technologies: ['Socket.IO', 'LangChain', 'OpenAI API', 'Redis'] },
  { pattern: /e-?commerce|order|subscription/i, technologies: ['Stripe', 'Razorpay', 'Redis', 'Cloudinary'] },
  { pattern: /voting|security|intrusion|leakage|fraud/i, technologies: ['JWT', 'AES Encryption', 'OWASP Security', 'Audit Logging'] },
  { pattern: /lms|learning|course|certification/i, technologies: ['PostgreSQL', 'AWS S3', 'PDFKit', 'Role-Based Access Control'] },
  { pattern: /health|hospital|fitness/i, technologies: ['FastAPI', 'PostgreSQL', 'Firebase Cloud Messaging', 'Twilio'] },
  { pattern: /iot|smart|traffic|agriculture|home automation/i, technologies: ['MQTT', 'ESP32', 'ThingsBoard', 'InfluxDB'] },
  { pattern: /resume|placement|job|career/i, technologies: ['NLP', 'spaCy', 'Elasticsearch', 'PostgreSQL'] },
  { pattern: /bank|payment|crm|management|inventory/i, technologies: ['PostgreSQL', 'Redis', 'Docker', 'Chart.js'] },
];

const getRealisticTechnologies = (
  title: string,
  category: ProjectCategory,
  existing: string[]
): string[] => {
  const tech = new Set<string>(existing);

  for (const base of CATEGORY_TECH_STACKS[category] ?? []) {
    tech.add(base);
  }

  for (const hint of TITLE_TECH_HINTS) {
    if (hint.pattern.test(title)) {
      for (const t of hint.technologies) tech.add(t);
    }
  }

  const prioritized = Array.from(tech);
  if (prioritized.length < 6) {
    for (const fallback of CATEGORY_TECH_STACKS[category] ?? []) {
      prioritized.push(fallback);
      if (new Set(prioritized).size >= 6) break;
    }
  }

  let finalTech = Array.from(new Set(prioritized));

  if (category === ProjectCategory.WEB_DEV) {
    finalTech = finalTech.filter((t) => WEB_ALLOWED_TECHS.has(t));
    for (const fallback of CATEGORY_TECH_STACKS[ProjectCategory.WEB_DEV]) {
      if (!finalTech.includes(fallback)) finalTech.push(fallback);
      if (finalTech.length >= 5) break;
    }
    return finalTech.slice(0, 6);
  }

  if (category === ProjectCategory.FULL_STACK) {
    finalTech = finalTech.filter((t) => FULL_STACK_ALLOWED_TECHS.has(t));
    for (const fallback of CATEGORY_TECH_STACKS[ProjectCategory.FULL_STACK]) {
      if (!finalTech.includes(fallback)) finalTech.push(fallback);
      if (finalTech.length >= 6) break;
    }
    return finalTech.slice(0, 7);
  }

  if (category === ProjectCategory.AI_ML) {
    finalTech = finalTech.filter((t) => AI_ML_ALLOWED_TECHS.has(t));
    for (const fallback of CATEGORY_TECH_STACKS[ProjectCategory.AI_ML]) {
      if (!finalTech.includes(fallback)) finalTech.push(fallback);
      if (finalTech.length >= 6) break;
    }
    return finalTech.slice(0, 7);
  }

  if (category === ProjectCategory.APP_DEV) {
    finalTech = finalTech.filter((t) => APP_DEV_ALLOWED_TECHS.has(t));
    for (const fallback of CATEGORY_TECH_STACKS[ProjectCategory.APP_DEV]) {
      if (!finalTech.includes(fallback)) finalTech.push(fallback);
      if (finalTech.length >= 6) break;
    }
    return finalTech.slice(0, 7);
  }

  return finalTech.slice(0, 7);
};

export const projects: Project[] = baseProjects.map((project) => ({
  ...project,
  technologies: getRealisticTechnologies(project.title, project.category, project.technologies),
}));
