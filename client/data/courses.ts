export interface Course {
    id: number;
    title: string;
    image: string;
    price: number;
    discountedPrice: number;
    category: 'Elite' | 'Premium';
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    author: string;
    rating: number;
    students: number;
    durationMonths: number;
    totalHours: number;
    placementAssistance: boolean;
    summary: string;
    skills: string[];
    overviewParagraph: string;
}

type BaseCourse = Omit<Course, 'image' | 'totalHours'> & { imageSeed: string };

const buildCourseImage = (seed: string, id: number) => {
    const query = encodeURIComponent(`${seed} software training classroom`);
    return `https://source.unsplash.com/1200x800/?${query}&sig=${id}`;
};

const hoursFromMonths = (months: number) => months * 4 * 15;

const courseCatalog: BaseCourse[] = [
    {
        id: 1,
        title: 'Master C Programming: From Zero to Hero',
        imageSeed: 'c language coding',
        price: 8000,
        discountedPrice: 4999,
        category: 'Elite',
        level: 'Beginner',
        author: 'Dr. Dennis Ritchie',
        rating: 4.8,
        students: 1200,
        durationMonths: 2,
        placementAssistance: false,
        summary: 'Foundational C course focused on logic building, memory control, and practical command-line development.',
        skills: ['C Fundamentals', 'Pointers', 'Memory Management', 'File Handling', 'Debugging'],
        overviewParagraph: 'This C Programming course starts from core syntax and quickly moves into how real programs use memory, pointers, arrays, and functions. You will write small utilities every week so theory is always practiced in code. The module on pointer arithmetic is handled with visual dry-runs to make low-level concepts easy to understand. We cover file handling and structured data so you can build practical console applications instead of only textbook examples. You will also learn how to debug segmentation faults, compiler warnings, and runtime errors with a step-by-step method. Assignments are designed to improve coding speed and accuracy for interviews. By the second month, you build modular projects using headers and reusable source files. The training includes algorithmic practice in C so your logic remains strong for advanced tracks like DSA and systems programming. This course is ideal for students who want a serious programming base before moving to full-stack technologies. The final project combines data structures, file operations, and clean coding standards in one complete implementation.'
    },
    {
        id: 2,
        title: 'Core Java Programming & OOPs Concepts',
        imageSeed: 'java software development',
        price: 10000,
        discountedPrice: 5999,
        category: 'Elite',
        level: 'Intermediate',
        author: 'James Gosling',
        rating: 4.9,
        students: 2500,
        durationMonths: 3,
        placementAssistance: false,
        summary: 'Complete Java and OOP training with clean architecture, collections, and enterprise coding standards.',
        skills: ['OOP', 'Collections', 'Exception Handling', 'JVM Basics', 'Multithreading'],
        overviewParagraph: 'This Java course is built for learners who want to write professional object-oriented code and understand why design decisions matter. We begin with class design, encapsulation, inheritance, and polymorphism using realistic scenarios instead of abstract examples. You will work deeply with collections, generics, and exception handling to build robust applications. The OOP section is followed by modules on multithreading and JVM behavior so you understand performance basics as well. Practical tasks include creating reusable services, validating inputs, and structuring packages cleanly. We also cover Java I/O and JDBC integration to connect applications with relational databases. Every sprint includes problem-solving exercises that mirror interview expectations for Java roles. Code review sessions focus on readability, maintainability, and SOLID-friendly structure. By the end of three months, you will be capable of building backend-ready Java modules with strong fundamentals. The capstone emphasizes architecture, testing, and clean exception flow in a complete mini application.'
    },
    {
        id: 3,
        title: 'Python Programming: The Complete Guide',
        imageSeed: 'python programming laptop',
        price: 9000,
        discountedPrice: 5499,
        category: 'Elite',
        level: 'Beginner',
        author: 'Guido van Rossum',
        rating: 4.9,
        students: 3000,
        durationMonths: 2,
        placementAssistance: false,
        summary: 'Python course covering scripting, APIs, automation, and clean project-style coding practice.',
        skills: ['Python Basics', 'Automation', 'APIs', 'OOP in Python', 'Data Processing'],
        overviewParagraph: 'This Python course is designed to make you productive quickly while still giving strong core fundamentals. We cover Python syntax, control flow, functions, and modules with daily coding practice. You will automate practical tasks such as file processing, report generation, and data cleanup scripts. API integration is taught with real request handling, response parsing, and error management. The curriculum includes object-oriented Python so you can structure larger projects confidently. You will learn to manage environments and dependencies to avoid setup issues in real projects. Debugging sessions show how to identify logic bugs and handle exceptions gracefully. Weekly mini assignments gradually move from beginner tasks to intermediate applications. In two months, you gain enough confidence to build complete scripts and utility tools independently. The final assessment includes a project that combines automation, APIs, and clean code organization.'
    },
    {
        id: 4,
        title: 'Modern JavaScript (ES6+) Mastery',
        imageSeed: 'javascript web coding',
        price: 8500,
        discountedPrice: 4999,
        category: 'Elite',
        level: 'Intermediate',
        author: 'Brendan Eich',
        rating: 4.7,
        students: 2100,
        durationMonths: 3,
        placementAssistance: false,
        summary: 'Advanced JavaScript track with ES6+, async programming, DOM architecture, and performance-focused coding.',
        skills: ['ES6+', 'Async Programming', 'DOM', 'Functional JS', 'Optimization'],
        overviewParagraph: 'This JavaScript mastery program focuses on writing clean, modern code that works reliably in production. We start with ES6+ syntax and immediately connect each concept to practical front-end use cases. You will deeply understand closures, scope, this binding, and event flow through guided code tracing. Async programming is taught with promises and async/await in realistic API-driven examples. We cover DOM design patterns, event delegation, and browser storage strategies for maintainable interfaces. Special sessions are included on performance optimization and avoiding expensive rendering patterns. You also learn modular architecture so multi-file projects remain readable as they grow. Interview-style coding challenges are integrated throughout the course to improve confidence and speed. Over three months, you build solid problem-solving skills and production-quality JavaScript habits. The final project requires building a full interactive web module using modern JavaScript standards end to end.'
    },
    {
        id: 5,
        title: 'SQL Bootcamp: Master Database Management',
        imageSeed: 'sql database analyst',
        price: 7500,
        discountedPrice: 3999,
        category: 'Elite',
        level: 'Beginner',
        author: 'Donald D. Chamberlin',
        rating: 4.8,
        students: 1800,
        durationMonths: 2,
        placementAssistance: false,
        summary: 'Hands-on SQL bootcamp for schema design, query optimization, and practical reporting workflows.',
        skills: ['SQL Queries', 'Joins', 'Indexes', 'Normalization', 'Transactions'],
        overviewParagraph: 'This SQL bootcamp gives you a strong command of relational databases from structure to advanced querying. You begin with schema design and normalization so your database models stay clean and scalable. Query writing is practiced intensively with joins, subqueries, aggregations, and filtering logic. We explain indexing and execution behavior so you can improve slow queries with confidence. Transactions and ACID concepts are taught using practical data integrity scenarios. You will create reports that combine multiple tables and business-driven metrics. Sessions also cover constraints, views, and stored logic for reusable query design. Assignments simulate real backend requirements such as pagination, search, and transactional updates. In two months, you will be able to write reliable SQL used in production apps and analytics workflows. The final project includes complete schema design plus reporting queries for a realistic business module.'
    },
    {
        id: 6,
        title: 'Data Structures & Algorithms (DSA) in C++',
        imageSeed: 'data structures algorithms coding',
        price: 12000,
        discountedPrice: 6999,
        category: 'Elite',
        level: 'Advanced',
        author: 'Robert Sedgewick',
        rating: 4.9,
        students: 1500,
        durationMonths: 3,
        placementAssistance: false,
        summary: 'Interview-centered DSA program in C++ with advanced problem-solving and complexity mastery.',
        skills: ['Data Structures', 'Dynamic Programming', 'Graph Algorithms', 'STL', 'Complexity Analysis'],
        overviewParagraph: 'This DSA program is built for learners targeting strong interview performance and deeper algorithmic thinking. We begin with arrays, linked lists, stacks, and queues before moving to trees and graphs. Every topic is taught with complexity comparison so you know why one approach is better than another. You will solve curated problems on recursion, dynamic programming, greedy strategies, and graph traversal. STL is used throughout to improve coding speed without losing conceptual clarity. Weekly assessments focus on pattern recognition and optimized implementation. Mentored sessions teach how to break difficult problems into tractable steps under time pressure. We include mock interview drills to improve explanation and solution communication. Over three months, your coding discipline, edge-case handling, and performance intuition improve significantly. The final stage includes a challenge set modeled after top product-company interview difficulty.'
    },
    {
        id: 7,
        title: 'MERN Stack Developer Bootcamp',
        imageSeed: 'mern stack development',
        price: 35000,
        discountedPrice: 18000,
        category: 'Premium',
        level: 'Advanced',
        author: 'Brad Traversy',
        rating: 4.9,
        students: 3200,
        durationMonths: 5,
        placementAssistance: true,
        summary: 'Complete MERN full-stack program with deployment workflows and placement-oriented project mentoring.',
        skills: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
        overviewParagraph: 'The MERN bootcamp is a five-month full-stack program focused on building job-ready web products from scratch. You will develop frontend architecture in React and backend APIs with Node and Express using clean service patterns. MongoDB schema design and data modeling are taught with real application requirements and query optimization practices. Authentication, authorization, validation, and security are handled as core mandatory modules. You will implement reusable components, API integrations, and deployment pipelines in staged milestones. Real-world projects include dashboard systems, role-based access, and production-style error handling. Mentor reviews ensure your code quality, Git workflow, and architecture decisions align with company expectations. This premium track includes dedicated placement assistance such as resume guidance, mock interviews, and project presentation training. Weekly coding checkpoints are aligned with hiring standards for MERN developer roles. By program completion, you graduate with multiple deployable projects and a strong interview-ready portfolio.'
    },
    {
        id: 8,
        title: 'MEAN Stack: MongoDB, Express, Angular, Node',
        imageSeed: 'angular mean stack project',
        price: 35000,
        discountedPrice: 18000,
        category: 'Premium',
        level: 'Advanced',
        author: 'Maximilian Schwarzmuller',
        rating: 4.7,
        students: 1400,
        durationMonths: 5,
        placementAssistance: true,
        summary: 'Enterprise-focused MEAN stack training with Angular architecture, API design, and placement support.',
        skills: ['Angular', 'RxJS', 'Node.js', 'MongoDB', 'Auth Guards'],
        overviewParagraph: 'This five-month MEAN program is designed for learners who want strong enterprise web application skills. Angular modules, routing, reactive forms, and component communication are taught in depth with scalable design patterns. On the backend, you build Express and Node services with structured middleware and robust validation flow. MongoDB integration includes schema strategy, indexing awareness, and practical data retrieval optimization. You will implement authentication and route guards for secure multi-role application behavior. Real project tasks include dashboard creation, report modules, and API-driven UI states using RxJS principles. The curriculum balances coding, architecture, and debugging across full-stack layers. Premium learners receive placement assistance including profile reviews, technical mock interviews, and referral preparation. All capstone work is reviewed against industry code quality and deployment readiness benchmarks. By course end, you can confidently deliver full MEAN applications for real client or product use.'
    },
    {
        id: 9,
        title: 'Python Full Stack Development',
        imageSeed: 'python full stack web app',
        price: 32000,
        discountedPrice: 16500,
        category: 'Premium',
        level: 'Advanced',
        author: 'Jose Portilla',
        rating: 4.8,
        students: 2200,
        durationMonths: 5,
        placementAssistance: true,
        summary: 'Five-month Python full-stack course with backend engineering, frontend integration, and placement mentoring.',
        skills: ['Python Backend', 'Database ORM', 'API Design', 'Testing', 'Deployment'],
        overviewParagraph: 'This Python full-stack course delivers complete web product development skills over a five-month guided roadmap. You learn backend architecture, API design, and business-logic structuring using Python best practices. Database integration is covered through ORM workflows, migrations, and query optimization for real use cases. Frontend integration modules teach how to connect APIs, handle states, and build consistent user flows. Security, validation, and error handling are treated as core engineering requirements throughout the program. You will build end-to-end projects that include authentication, role control, and dashboard-level features. Deployment and environment management sessions prepare you for production releases and team workflows. Premium placement assistance includes resume optimization, project walkthrough coaching, and interview preparation rounds. Weekly technical assessments ensure steady progress across backend and full-stack competencies. The final portfolio output is designed to meet hiring expectations for Python web developer roles.'
    },
    {
        id: 10,
        title: 'Professional Web Developer Bootcamp',
        imageSeed: 'professional web developer',
        price: 25000,
        discountedPrice: 12000,
        category: 'Premium',
        level: 'Beginner',
        author: 'Angela Yu',
        rating: 4.9,
        students: 5000,
        durationMonths: 5,
        placementAssistance: true,
        summary: 'Career-focused web development bootcamp with strong fundamentals, projects, and placement support.',
        skills: ['HTML/CSS', 'JavaScript', 'Responsive Design', 'Git', 'Web Deployment'],
        overviewParagraph: 'This professional web bootcamp is a five-month beginner-friendly track that builds real industry readiness. You start with semantic HTML and modern CSS, then progress into JavaScript-driven interactive interfaces. Responsive design principles are applied from day one so your layouts work across mobile and desktop environments. We include practical UI building exercises, form workflows, and API integration fundamentals. Version control and team collaboration practices are taught using Git-based assignment flow. Students complete multiple guided projects to build confidence in full web page construction and behavior logic. Design-to-code sessions improve your ability to translate requirements into clean implementation quickly. Premium placement assistance covers resume building, portfolio polishing, and mock technical plus HR interviews. The course is paced to help beginners become professionally productive without rushing core concepts. By completion, you have deployable projects and strong fundamentals for junior web developer opportunities.'
    },
    {
        id: 11,
        title: 'Data Analytics with Power BI & Tableau',
        imageSeed: 'power bi tableau analytics dashboard',
        price: 28000,
        discountedPrice: 14000,
        category: 'Premium',
        level: 'Intermediate',
        author: 'Kirill Eremenko',
        rating: 4.7,
        students: 1900,
        durationMonths: 5,
        placementAssistance: true,
        summary: 'Business analytics training with dashboards, KPI storytelling, and placement-assisted career transition.',
        skills: ['Power BI', 'Tableau', 'DAX', 'Data Modeling', 'Business Reporting'],
        overviewParagraph: 'This five-month analytics track focuses on turning raw data into actionable business decisions. You learn data modeling, cleaning, and transformation before moving into dashboard design best practices. Power BI modules cover DAX measures, calculated columns, and report interactivity for real executive use. Tableau sessions focus on storytelling, drill-down analysis, and visually clear trend presentation. We emphasize metric definition and KPI accuracy so reports remain meaningful for decision makers. You work on practical cases across sales, operations, and performance monitoring contexts. Delivery sessions teach how to explain insights confidently to non-technical stakeholders. Premium placement assistance includes analytics profile positioning, interview question prep, and portfolio project review. Assignments are designed around realistic datasets instead of simplified classroom-only data. By course completion, you can build polished dashboard solutions ready for analyst and BI roles.'
    },
    {
        id: 12,
        title: 'Artificial Intelligence & Machine Learning A-Z',
        imageSeed: 'machine learning ai model',
        price: 45000,
        discountedPrice: 25000,
        category: 'Premium',
        level: 'Advanced',
        author: 'Andrew Ng',
        rating: 4.9,
        students: 2800,
        durationMonths: 5,
        placementAssistance: true,
        summary: 'Advanced AI/ML program with model engineering, evaluation, deployment, and placement-focused mentoring.',
        skills: ['Machine Learning', 'Deep Learning', 'NLP', 'Model Evaluation', 'MLOps Basics'],
        overviewParagraph: 'This premium AI and ML course spans five months and is structured for serious technical growth. You begin with supervised and unsupervised learning foundations, then move into model tuning and validation strategy. Deep learning modules cover neural network intuition, training behavior, and practical experimentation workflows. We teach feature engineering and evaluation metrics so your models are both accurate and interpretable. NLP and computer vision introductions are included to expose you to broader AI application areas. Real datasets are used throughout so model behavior is analyzed in realistic constraints and noisy conditions. Deployment sessions explain how to expose models through APIs and monitor predictions in production contexts. Premium placement assistance includes targeted project mentorship, resume tailoring for AI roles, and technical interview simulations. Weekly checkpoints ensure progress in both math-backed understanding and implementation quality. The final capstone demonstrates full model lifecycle execution from data preparation to deployable inference service.'
    },
    {
        id: 13,
        title: 'Python for Data Science Bootcamp',
        imageSeed: 'python data science analysis',
        price: 30000,
        discountedPrice: 15000,
        category: 'Premium',
        level: 'Intermediate',
        author: 'Jose Portilla',
        rating: 4.8,
        students: 2500,
        durationMonths: 5,
        placementAssistance: true,
        summary: 'Data science Python track with analytics workflows, model basics, and placement assistance.',
        skills: ['NumPy', 'Pandas', 'Visualization', 'EDA', 'Scikit-learn'],
        overviewParagraph: 'This five-month Python for Data Science bootcamp is designed to build strong analytical problem-solving skills. You learn NumPy and pandas deeply for efficient transformation, cleaning, and dataset handling. Visualization modules use Matplotlib and Seaborn to present insights with clarity and business relevance. Exploratory data analysis is practiced through structured real-world case studies and reporting tasks. Statistical reasoning is introduced in a practical way to support decision-making and model selection. We cover baseline machine learning with scikit-learn for classification and regression workflows. Feature preparation and validation practices are included so your model outputs remain dependable. Premium placement assistance supports profile development, project presentation, and data science interview readiness. Mentored reviews help you improve notebook quality, storytelling flow, and analytical interpretation. By completion, you can execute full data analysis pipelines and present findings as industry-ready portfolio work.'
    },
];

export const courses: Course[] = courseCatalog.map((course) => ({
    ...course,
    students: 650 + ((course.id * 137) % 1300),
    image: buildCourseImage(course.imageSeed, course.id),
    totalHours: hoursFromMonths(course.durationMonths),
}));
