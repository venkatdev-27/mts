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

console.log("Loading projects router...");
console.log("getAllProjects type:", typeof getAllProjects);

if (!getAllProjects) {
    console.error("CRITICAL ERROR: getAllProjects is undefined!");
}

// Public routes
router.get("/", (req, res, next) => {
    console.log("GET /api/projects hit!");
    getAllProjects(req, res).catch(next);
});
router.get("/:id", getProjectById);

// Admin routes (Protected)
router.post("/", protect, admin, createProject);
router.put("/:id", protect, admin, updateProject);
router.delete("/:id", protect, admin, deleteProject);

export default router;
