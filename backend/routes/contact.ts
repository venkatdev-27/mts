import express from "express";
import {
    getAllMessages,
    createMessage,
    markAsRead,
    deleteMessage,
} from "../controllers/contactController";
import { protect, admin } from "../middleware/authMiddleware";

const router = express.Router();

// Public route (Client Form Submission)
router.post("/", createMessage);

// Admin routes (Protected)
router.get("/", protect, admin, getAllMessages);
router.patch("/:id/read", protect, admin, markAsRead);
router.delete("/:id", protect, admin, deleteMessage);

export default router;
