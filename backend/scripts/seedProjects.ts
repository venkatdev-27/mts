import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "../models/Project";

dotenv.config();

const STOP_WORDS = new Set([
    "the", "and", "for", "with", "from", "to", "of", "in", "on", "a", "an", "system", "app", "platform", "online"
]);

const categoryImageTags: Record<string, string[]> = {
    "Web Development": ["web", "coding", "laptop", "dashboard"],
    "App Development": ["mobile", "smartphone", "app", "developer"],
    "Full Stack": ["software", "team", "programming", "technology"],
    "AI & Machine Learning": ["ai", "data", "analytics", "computer"],
};

const buildProjectImage = (title: string, category: string, index: number) => {
    const titleTags = title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((word) => word.length > 2 && !STOP_WORDS.has(word))
        .slice(0, 3);

    const tags = [...titleTags, ...(categoryImageTags[category] || ["technology", "software"])]
        .map((tag) => tag.replace(/[^a-z0-9]/g, ""))
        .filter(Boolean)
        .slice(0, 6)
        .join(",");

    // Using LoremFlickr (non-Unsplash) with stable lock for predictable MongoDB seed output.
    return `https://loremflickr.com/1200/800/${tags || "technology,software"}?lock=${index + 100}`;
};

const buildProjectDescription = (
    title: string,
    category: string,
    technologies: string[],
    seedDescription: string
) => {
    const primaryTech = technologies[0] || "modern web tools";
    const secondaryTech = technologies[1] || "backend services";
    const tertiaryTech = technologies[2] || "data storage";

    return `${title} is a ${category.toLowerCase()} solution built to solve a real workflow used by students, faculty, or operations teams. ` +
        `${seedDescription} ` +
        `The system architecture is designed for reliability, with a clear separation between interface, business logic, and data handling layers. ` +
        `Core modules are implemented using ${primaryTech} and ${secondaryTech}, while ${tertiaryTech} supports secure processing and scalable performance under regular usage. ` +
        `The project includes practical features such as role-based access, validation, reporting, and progress tracking so it can be used beyond demo scenarios. ` +
        `Overall, this implementation demonstrates production-oriented engineering quality and provides a strong foundation for deployment, enhancement, and real user adoption.`;
};

const CATEGORY_TECH_STACKS: Record<string, string[]> = {
    'Web Development': ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT'],
    'App Development': ['React Native', 'TypeScript', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'Firebase Cloud Messaging'],
    'Full Stack': ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
    'AI & Machine Learning': ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'FastAPI', 'PostgreSQL', 'Docker'],
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
    category: string,
    existing: string[]
) => {
    const tech = new Set<string>(existing);

    for (const base of CATEGORY_TECH_STACKS[category] ?? []) {
        tech.add(base);
    }

    for (const hint of TITLE_TECH_HINTS) {
        if (hint.pattern.test(title)) {
            for (const t of hint.technologies) tech.add(t);
        }
    }

    const normalized = Array.from(tech);
    if (normalized.length < 6) {
        for (const fallback of CATEGORY_TECH_STACKS[category] ?? []) {
            normalized.push(fallback);
            if (new Set(normalized).size >= 6) break;
        }
    }

    let finalTech = Array.from(new Set(normalized));

    if (category === 'Web Development') {
        finalTech = finalTech.filter((t) => WEB_ALLOWED_TECHS.has(t));
        for (const fallback of CATEGORY_TECH_STACKS['Web Development'] ?? []) {
            if (!finalTech.includes(fallback)) finalTech.push(fallback);
            if (finalTech.length >= 5) break;
        }
        return finalTech.slice(0, 6);
    }

    if (category === 'Full Stack') {
        finalTech = finalTech.filter((t) => FULL_STACK_ALLOWED_TECHS.has(t));
        for (const fallback of CATEGORY_TECH_STACKS['Full Stack'] ?? []) {
            if (!finalTech.includes(fallback)) finalTech.push(fallback);
            if (finalTech.length >= 6) break;
        }
        return finalTech.slice(0, 7);
    }

    if (category === 'AI & Machine Learning') {
        finalTech = finalTech.filter((t) => AI_ML_ALLOWED_TECHS.has(t));
        for (const fallback of CATEGORY_TECH_STACKS['AI & Machine Learning'] ?? []) {
            if (!finalTech.includes(fallback)) finalTech.push(fallback);
            if (finalTech.length >= 6) break;
        }
        return finalTech.slice(0, 7);
    }

    if (category === 'App Development') {
        finalTech = finalTech.filter((t) => APP_DEV_ALLOWED_TECHS.has(t));
        for (const fallback of CATEGORY_TECH_STACKS['App Development'] ?? []) {
            if (!finalTech.includes(fallback)) finalTech.push(fallback);
            if (finalTech.length >= 6) break;
        }
        return finalTech.slice(0, 7);
    }

    return finalTech.slice(0, 7);
};

const projectsData = [
    // --- WEB DEVELOPMENT PROJECTS (10) ---
    {
        title: 'Smart College Management System',
        category: 'Web Development',
        description: 'A comprehensive web portal for managing students, faculty, attendance, and academic records efficiently.',
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
        technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    },
    {
        title: 'Online Examination Portal',
        category: 'Web Development',
        description: 'Secure platform for conducting online exams with auto-evaluation, timer features, and result generation.',
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
        technologies: ['React', 'Express', 'MongoDB'],
    },
    {
        title: 'Placement Management System',
        category: 'Web Development',
        description: 'Digital platform to streamline the campus recruitment process, connecting students with recruiters.',
        imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800',
        technologies: ['React', 'Node.js', 'MySQL'],
    },
    {
        title: 'Student Internship Tracking',
        category: 'Web Development',
        description: 'Portal for students to log internship activities and for faculty to monitor progress and approve reports.',
        imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
        technologies: ['React', 'Firebase', 'Tailwind'],
    },
    {
        title: 'E-Commerce Dashboard',
        category: 'Web Development',
        description: 'A feature-rich admin dashboard for managing products, orders, customers, and sales analytics.',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        technologies: ['React', 'Redux', 'Chart.js'],
    },
    {
        title: 'Online Certification Platform',
        category: 'Web Development',
        description: 'Educational platform offering courses and auto-generating certificates upon course completion.',
        imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
        technologies: ['React', 'Node.js', 'PDFKit'],
    },
    {
        title: 'Hospital Appointment Booking',
        category: 'Web Development',
        description: 'User-friendly system for patients to book appointments with doctors and view medical history.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
        technologies: ['React', 'Express', 'PostgreSQL'],
    },
    {
        title: 'Event Management Website',
        category: 'Web Development',
        description: 'Platform to organize college fests and events, handling registrations and scheduling.',
        imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800',
        technologies: ['React', 'Firebase', 'Stripe API'],
    },
    {
        title: 'Job Portal for Freshers',
        category: 'Web Development',
        description: 'Dedicated job board for fresh graduates to find entry-level opportunities and apply easily.',
        imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800',
        technologies: ['React', 'Node.js', 'MongoDB'],
    },
    {
        title: 'Online Feedback System',
        category: 'Web Development',
        description: 'Anonymous feedback and survey system for colleges to gather student opinions on facilities.',
        imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
        technologies: ['React', 'Chart.js', 'Firebase'],
    },

    // --- MOBILE APP DEVELOPMENT PROJECTS (8) ---
    {
        title: 'College Events App',
        category: 'App Development',
        description: 'Mobile application to notify students about upcoming college events, workshops, and holidays.',
        imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
        technologies: ['React Native', 'Firebase'],
    },
    {
        title: 'Student Expense Tracker',
        category: 'App Development',
        description: 'Personal finance management app designed for students to track daily spending and budget.',
        imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
        technologies: ['Flutter', 'SQLite'],
    },
    {
        title: 'QR-Based Attendance',
        category: 'App Development',
        description: 'Touchless attendance system using QR codes scanned via mobile devices for classrooms.',
        imageUrl: 'https://images.unsplash.com/photo-1595079676339-1534827d8c11?auto=format&fit=crop&q=80&w=800',
        technologies: ['React Native', 'Camera API', 'Node.js'],
    },
    {
        title: 'Online Learning App',
        category: 'App Development',
        description: 'Mobile learning platform with video lectures, quizzes, and study material access.',
        imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
        technologies: ['Flutter', 'Firebase', 'Video Player'],
    },
    {
        title: 'Campus Food Ordering',
        category: 'App Development',
        description: 'App for ordering food from the college canteen to avoid long queues during breaks.',
        imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
        technologies: ['React Native', 'Redux', 'Node.js'],
    },
    {
        title: 'Fitness & Health Tracker',
        category: 'App Development',
        description: 'Health monitoring app tracking steps, water intake, and exercise routines.',
        imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800',
        technologies: ['Flutter', 'Google Fit API'],
    },
    {
        title: 'Hostel Management App',
        category: 'App Development',
        description: 'App for hostel students to file complaints, apply for leave, and view mess menus.',
        imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800',
        technologies: ['React Native', 'Firebase'],
    },
    {
        title: 'Student Community Chat',
        category: 'App Development',
        description: 'Real-time messaging app for student groups and clubs to collaborate and discuss.',
        imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
        technologies: ['Flutter', 'Firebase Firestore'],
    },

    // --- FULL STACK PROJECTS (12) ---
    {
        title: 'MERN E-Commerce Platform',
        category: 'Full Stack',
        description: 'Complete online shopping solution with cart, payment gateway, and order management.',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800',
        technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
    },
    {
        title: 'Real-Time Chat Application',
        category: 'Full Stack',
        description: 'Instant messaging application supporting private and group chats using WebSockets.',
        imageUrl: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&q=80&w=800',
        technologies: ['Socket.io', 'React', 'Node.js'],
    },
    {
        title: 'Project Submission System',
        category: 'Full Stack',
        description: 'Portal for students to upload project files and mentors to review and grade them.',
        imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800',
        technologies: ['MERN Stack', 'AWS S3'],
    },
    {
        title: 'Learning Management System',
        category: 'Full Stack',
        description: 'Robust LMS for managing course content, student enrollment, and progress tracking.',
        imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800',
        technologies: ['Django', 'PostgreSQL', 'React'],
    },
    {
        title: 'Educational CRM System',
        category: 'Full Stack',
        description: 'Customer Relationship Management tool tailored for educational institutes to manage leads.',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
        technologies: ['Django', 'Rest Framework', 'React'],
    },
    {
        title: 'Task Management Tool',
        category: 'Full Stack',
        description: 'Kanban-style project management tool similar to Trello for team collaboration.',
        imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800',
        technologies: ['React', 'DnD', 'Node.js', 'MongoDB'],
    },
    {
        title: 'Online Voting System',
        category: 'Full Stack',
        description: 'Secure voting platform with multi-factor authentication for college elections.',
        imageUrl: 'https://images.unsplash.com/photo-1540910419868-474947ce571d?auto=format&fit=crop&q=80&w=800',
        technologies: ['MERN Stack', 'JWT'],
    },
    {
        title: 'Inventory Management',
        category: 'Full Stack',
        description: 'System to track stock levels, orders, and sales for college stores or labs.',
        imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
        technologies: ['React', 'Node.js', 'MySQL'],
    },
    {
        title: 'Online Banking App',
        category: 'Full Stack',
        description: 'Simulated banking application allowing fund transfers and transaction history views.',
        imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800',
        technologies: ['Django', 'Angular', 'Secure Auth'],
    },
    {
        title: 'SaaS Subscription Manager',
        category: 'Full Stack',
        description: 'Platform to manage user subscriptions, billing cycles, and access levels.',
        imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800',
        technologies: ['Next.js', 'Stripe', 'Supabase'],
    },
    {
        title: 'Resume Builder Web App',
        category: 'Full Stack',
        description: 'Interactive tool helping students create professional resumes with various templates.',
        imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800',
        technologies: ['React', 'Node.js', 'PDF Generation'],
    },
    {
        title: 'Blog Platform with CMS',
        category: 'Full Stack',
        description: 'Content management system for creating, editing, and publishing blog posts.',
        imageUrl: 'https://images.unsplash.com/photo-1499750310159-5254f4127278?auto=format&fit=crop&q=80&w=800',
        technologies: ['Django', 'PostgreSQL', 'Bootstrap'],
    },

    // --- AI & MACHINE LEARNING PROJECTS (10) ---
    {
        title: 'AI Resume Screening',
        category: 'AI & Machine Learning',
        description: 'Automated system using NLP to parse resumes and rank candidates based on job descriptions.',
        imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800',
        technologies: ['Python', 'NLP', 'Flask'],
    },
    {
        title: 'College Enquiry Chatbot',
        category: 'AI & Machine Learning',
        description: 'Intelligent chatbot capable of answering student queries about admissions and courses.',
        imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800',
        technologies: ['Python', 'TensorFlow', 'React'],
    },
    {
        title: 'Fake News Detection',
        category: 'AI & Machine Learning',
        description: 'Machine learning model trained to identify and flag misinformation in news articles.',
        imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800',
        technologies: ['Python', 'Scikit-learn', 'NLP'],
    },
    {
        title: 'Student Performance Prediction',
        category: 'AI & Machine Learning',
        description: 'Predictive analytics tool to forecast student grades based on historical performance data.',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        technologies: ['Python', 'Pandas', 'Matplotlib'],
    },
    {
        title: 'Face Recognition Attendance',
        category: 'AI & Machine Learning',
        description: 'Biometric attendance system recognizing student faces from a video feed.',
        imageUrl: 'https://images.unsplash.com/photo-1555449372-545219d0a3ac?auto=format&fit=crop&q=80&w=800',
        technologies: ['OpenCV', 'Python', 'Deep Learning'],
    },
    {
        title: 'AI Recommendation System',
        category: 'AI & Machine Learning',
        description: 'System suggesting relevant courses and job openings to students based on interests.',
        imageUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=800',
        technologies: ['Python', 'Collaborative Filtering'],
    },
    {
        title: 'Emotion Detection',
        category: 'AI & Machine Learning',
        description: 'Deep learning model analyzing facial expressions to determine emotional states.',
        imageUrl: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&q=80&w=800',
        technologies: ['Keras', 'CNN', 'Python'],
    },
    {
        title: 'AI Career Guidance',
        category: 'AI & Machine Learning',
        description: 'Expert system assisting students in choosing career paths based on skills and aptitude.',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
        technologies: ['Python', 'Expert Systems'],
    },
    {
        title: 'Fraud Detection System',
        category: 'AI & Machine Learning',
        description: 'Algorithm to detect anomalies and fraudulent transactions in financial datasets.',
        imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800',
        technologies: ['Python', 'Random Forest', 'Scikit-learn'],
    },
    {
        title: 'Voice Virtual Assistant',
        category: 'AI & Machine Learning',
        description: 'Voice-controlled assistant performing tasks like setting reminders and web search.',
        imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800',
        technologies: ['Python', 'SpeechRecognition', 'PyAudio'],
    },

    // --- ADVANCED PROJECTS (10) ---
    {
        title: 'Blockchain Certificate Verify',
        category: 'Full Stack',
        description: 'Decentralized application for issuing and verifying tamper-proof academic certificates.',
        imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800',
        technologies: ['Solidity', 'Ethereum', 'Web3.js'],
    },
    {
        title: 'Secure Online Voting (IEEE)',
        category: 'Full Stack',
        description: 'Cryptographically secure voting system ensuring anonymity and integrity of votes.',
        imageUrl: 'https://images.unsplash.com/photo-1540910419868-474947ce571d?auto=format&fit=crop&q=80&w=800',
        technologies: ['Blockchain', 'React', 'Node.js'],
    },
    {
        title: 'Smart Traffic Management',
        category: 'AI & Machine Learning',
        description: 'IoT system controlling traffic lights dynamically based on vehicle density.',
        imageUrl: 'https://images.unsplash.com/photo-1589938812613-2d2426372d3d?auto=format&fit=crop&q=80&w=800',
        technologies: ['IoT', 'Arduino', 'Python'],
    },
    {
        title: 'IoT Smart Home Automation',
        category: 'AI & Machine Learning',
        description: 'System to control home appliances remotely via mobile app using IoT sensors.',
        imageUrl: 'https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&q=80&w=800',
        technologies: ['IoT', 'ESP8266', 'Flutter'],
    },
    {
        title: 'Cloud File Storage System',
        category: 'Full Stack',
        description: 'Secure cloud storage solution with encryption and file sharing capabilities.',
        imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
        technologies: ['AWS', 'React', 'Node.js'],
    },
    {
        title: 'Intrusion Detection System',
        category: 'AI & Machine Learning',
        description: 'Network security system using machine learning to detect malicious activities.',
        imageUrl: 'https://images.unsplash.com/photo-1563206767-5b1d972e9fb9?auto=format&fit=crop&q=80&w=800',
        technologies: ['Python', 'Keras', 'Networking'],
    },
    {
        title: 'Smart Healthcare Monitoring',
        category: 'AI & Machine Learning',
        description: 'Remote patient monitoring system tracking vital signs using wearable sensors.',
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
        technologies: ['IoT', 'Cloud', 'Android'],
    },
    {
        title: 'Data Leakage Detection',
        category: 'AI & Machine Learning',
        description: 'Security framework to identify and prevent unauthorized data transmission.',
        imageUrl: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&q=80&w=800',
        technologies: ['Cybersecurity', 'Python', 'Java'],
    },
    {
        title: 'Smart Agriculture System',
        category: 'AI & Machine Learning',
        description: 'IoT solution for automated irrigation and soil moisture monitoring for farmers.',
        imageUrl: 'https://images.unsplash.com/photo-1625246333195-f8196812c854?auto=format&fit=crop&q=80&w=800',
        technologies: ['IoT', 'Sensors', 'Mobile App'],
    },
    {
        title: 'AI Online Proctoring',
        category: 'AI & Machine Learning',
        description: 'Automated proctoring system for online exams using webcam gaze tracking.',
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
        technologies: ['Computer Vision', 'Python', 'WebRTC'],
    },
];

const seedProjects = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB Connected for seeding...");

        // Clear existing projects
        await Project.deleteMany({});
        console.log("Cleared existing projects");

        // Add IDs to projects
        const projectsWithIds = projectsData.map((project, index) => {
            const technologies = getRealisticTechnologies(project.title, project.category, project.technologies);
            return {
                ...project,
                technologies,
                id: Math.random().toString(36).substring(2, 8).toUpperCase(),
                imageUrl: buildProjectImage(project.title, project.category, index),
                description: buildProjectDescription(
                    project.title,
                    project.category,
                    technologies,
                    project.description
                ),
            };
        });

        // Insert new projects
        await Project.insertMany(projectsWithIds);
        console.log(`Successfully seeded ${projectsWithIds.length} projects`);

        process.exit(0);
    } catch (error) {
        console.error("Error seeding projects:", error);
        process.exit(1);
    }
};

seedProjects();
