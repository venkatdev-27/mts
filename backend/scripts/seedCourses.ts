import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "../models/Course";

dotenv.config();

const buildCourseImage = (title: string, index: number) => {
    const query = encodeURIComponent(`${title} programming course`);
    return `https://source.unsplash.com/1200x800/?${query}&sig=${index + 1}`;
};

const coursesData = [
    {
        title: "Master C Programming: From Zero to Hero",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 8000,
        discountedPrice: 4999,
        category: "Elite",
        level: "Beginner",
        author: "Dr. Dennis Ritchie",
        rating: 4.8,
        students: 1200,
        duration: "2 M",
    },
    {
        title: "Core Java Programming & OOPs Concepts",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 10000,
        discountedPrice: 5999,
        category: "Elite",
        level: "Intermediate",
        author: "James Gosling",
        rating: 4.9,
        students: 2500,
        duration: "3 M",
    },
    {
        title: "Python Programming: The Complete Guide",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 9000,
        discountedPrice: 5499,
        category: "Elite",
        level: "Beginner",
        author: "Guido van Rossum",
        rating: 4.9,
        students: 3000,
        duration: "2.5 M",
    },
    {
        title: "Modern JavaScript (ES6+) Mastery",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 8500,
        discountedPrice: 4999,
        category: "Elite",
        level: "Intermediate",
        author: "Brendan Eich",
        rating: 4.7,
        students: 2100,
        duration: "2 M",
    },
    {
        title: "SQL Bootcamp: Master Database Management",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 7500,
        discountedPrice: 3999,
        category: "Elite",
        level: "Beginner",
        author: "Donald D. Chamberlin",
        rating: 4.8,
        students: 1800,
        duration: "1.5 M",
    },
    {
        title: "Data Structures & Algorithms (DSA) in C++",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 12000,
        discountedPrice: 6999,
        category: "Elite",
        level: "Advanced",
        author: "Robert Sedgewick",
        rating: 4.9,
        students: 1500,
        duration: "4 M",
    },
    {
        title: "MERN Stack Developer Bootcamp",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 35000,
        discountedPrice: 18000,
        category: "Premium",
        level: "Advanced",
        author: "Brad Traversy",
        rating: 4.9,
        students: 3200,
        duration: "6 M",
    },
    {
        title: "MEAN Stack: MongoDB, Express, Angular, Node",
        image: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 35000,
        discountedPrice: 18000,
        category: "Premium",
        level: "Advanced",
        author: "Maximilian Schwarzmuller",
        rating: 4.7,
        students: 1400,
        duration: "6 M",
    },
    {
        title: "Python Full Stack Development",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 32000,
        discountedPrice: 16500,
        category: "Premium",
        level: "Advanced",
        author: "Jose Portilla",
        rating: 4.8,
        students: 2200,
        duration: "5 M",
    },
    {
        title: "Professional Web Developer Bootcamp",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 25000,
        discountedPrice: 12000,
        category: "Premium",
        level: "Beginner",
        author: "Angela Yu",
        rating: 4.9,
        students: 5000,
        duration: "6 M",
    },
    {
        title: "Data Analytics with Power BI & Tableau",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 28000,
        discountedPrice: 14000,
        category: "Premium",
        level: "Intermediate",
        author: "Kirill Eremenko",
        rating: 4.7,
        students: 1900,
        duration: "4 M",
    },
    {
        title: "Artificial Intelligence & Machine Learning A-Z",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 45000,
        discountedPrice: 25000,
        category: "Premium",
        level: "Advanced",
        author: "Andrew Ng",
        rating: 4.9,
        students: 2800,
        duration: "8 M",
    },
    {
        title: "Python for Data Science Bootcamp",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 30000,
        discountedPrice: 15000,
        category: "Premium",
        level: "Intermediate",
        author: "Jose Portilla",
        rating: 4.8,
        students: 2500,
        duration: "5 M",
    },
];

const seedCourses = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB Connected for course seeding...");

        await Course.deleteMany({});
        console.log("Cleared existing courses");

        const coursesWithOriginalImages = coursesData.map((course, index) => ({
            ...course,
            image: buildCourseImage(course.title, index),
        }));

        const inserted = await Course.insertMany(coursesWithOriginalImages);
        console.log(`Successfully seeded ${inserted.length} courses`);

        process.exit(0);
    } catch (error) {
        console.error("Error seeding courses:", error);
        process.exit(1);
    }
};

seedCourses();
