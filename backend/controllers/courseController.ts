import { Request, Response } from "express";
import Course from "../models/Course";

// Get all courses
export const getCourses = async (req: Request, res: Response) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Create a new course
export const createCourse = async (req: Request, res: Response) => {
    try {
        const newCourse = await Course.create(req.body);
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).json({ message: "Invalid Data", error });
    }
};

// Update a course
export const updateCourse = async (req: Request, res: Response) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedCourse) return res.status(404).json({ message: "Course not found" });
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Delete a course
export const deleteCourse = async (req: Request, res: Response) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) return res.status(404).json({ message: "Course not found" });
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
