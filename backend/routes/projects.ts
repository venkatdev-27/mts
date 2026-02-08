import express from "express";
import {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
} from "../controllers/projectController";
import { protect, admin } from "../middleware/authMiddleware";

const router = express.Router();

// Public routes
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

// Admin routes (Protected)
router.post("/", protect, admin, createProject);
router.put("/:id", protect, admin, updateProject);
router.delete("/:id", protect, admin, deleteProject);

export default router;
