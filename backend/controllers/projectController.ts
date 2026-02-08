import { Request, Response } from "express";
import Project from "../models/Project";

// Get all projects
export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const { category, page, limit } = req.query;
        let query: any = {};

        if (category && category !== 'All') {
            query.category = category;
        }

        if (page && limit) {
            const pageNum = parseInt(page as string);
            const limitNum = parseInt(limit as string);
            const skip = (pageNum - 1) * limitNum;

            const total = await Project.countDocuments(query);
            const projects = await Project.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNum);

            return res.json({
                projects,
                total,
                currentPage: pageNum,
                totalPages: Math.ceil(total / limitNum)
            });
        }

        const projects = await Project.find(query).sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects", error: (error as Error).message });
    }
};

// Get single project by ID
export const getProjectById = async (req: Request, res: Response) => {
    try {
        const project = await Project.findOne({ id: req.params.id });
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: "Error fetching project", error: (error as Error).message });
    }
};

// Create new project
export const createProject = async (req: Request, res: Response) => {
    try {
        const { id, title, category, description, imageUrl, technologies } = req.body;

        // Validate required fields
        if (!id || !title || !category || !description || !imageUrl || !technologies) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const project = new Project({
            id,
            title,
            category,
            description,
            imageUrl,
            technologies,
        });

        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (error) {
        if ((error as any).code === 11000) {
            return res.status(400).json({ message: "Project ID already exists" });
        }
        res.status(500).json({ message: "Error creating project", error: (error as Error).message });
    }
};

// Update project
export const updateProject = async (req: Request, res: Response) => {
    try {
        const { title, category, description, imageUrl, technologies } = req.body;

        const project = await Project.findOneAndUpdate(
            { id: req.params.id },
            { title, category, description, imageUrl, technologies },
            { new: true, runValidators: true }
        );

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: "Error updating project", error: (error as Error).message });
    }
};

// Delete project
export const deleteProject = async (req: Request, res: Response) => {
    try {
        const project = await Project.findOneAndDelete({ id: req.params.id });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting project", error: (error as Error).message });
    }
};
