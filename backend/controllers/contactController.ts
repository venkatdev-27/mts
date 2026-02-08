import { Request, Response } from "express";
import ContactMessage from "../models/ContactMessage";

// Get all contact messages (Admin)
export const getAllMessages = async (req: Request, res: Response) => {
    try {
        const messages = await ContactMessage.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching messages", error: (error as Error).message });
    }
};

// Create new contact message
export const createMessage = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const contactMessage = new ContactMessage({
            name,
            email,
            phone,
            subject,
            message,
        });

        const savedMessage = await contactMessage.save();
        res.status(201).json({
            message: "Message sent successfully",
            data: savedMessage
        });
    } catch (error) {
        res.status(500).json({ message: "Error sending message", error: (error as Error).message });
    }
};

// Mark message as read
export const markAsRead = async (req: Request, res: Response) => {
    try {
        const message = await ContactMessage.findByIdAndUpdate(
            req.params.id,
            { status: "read" },
            { new: true }
        );

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Error updating message", error: (error as Error).message });
    }
};

// Delete message
export const deleteMessage = async (req: Request, res: Response) => {
    try {
        const message = await ContactMessage.findByIdAndDelete(req.params.id);

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting message", error: (error as Error).message });
    }
};
