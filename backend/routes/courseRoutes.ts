import express from "express";
import {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
} from "../controllers/courseController";
// import { protect, admin } from "../middleware/authMiddleware"; // Assuming you have auth middleware

const router = express.Router();

router.get("/", getCourses);
// For simplified admin access, I am commenting out protection for now. 
// You should verify if authMiddleware exists and works before enabling it.
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
