import { Request, Response } from "express";
import Registration from "../models/Registration";

export const createRegistration = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, mobile, course } = req.body;

        const registration = await Registration.create({
            firstName,
            lastName,
            email,
            mobile,
            course,
        });

        res.status(201).json({
            success: true,
            data: registration,
            message: "Registration successful!",
        });
    } catch (error: any) {
        console.error("Registration Error:", error);
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((val: any) => val.message);
            return res.status(400).json({
                success: false,
                error: messages,
            });
        }
        res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// Get all registrations (Admin)
export const getRegistrations = async (req: Request, res: Response) => {
    try {
        const registrations = await Registration.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: registrations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Server Error"
        });
    }
};
