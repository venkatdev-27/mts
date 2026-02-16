import { Request, Response } from "express";
import Project from "../models/Project";
import mongoose from "mongoose";

const getProjectLookupQuery = (projectId: string) => {
    if (mongoose.Types.ObjectId.isValid(projectId)) {
        return { $or: [{ id: projectId }, { _id: projectId }] };
    }
    return { id: projectId };
};

const normalizeProjectIdParam = (idParam: string | string[]) => {
    return Array.isArray(idParam) ? idParam[0] : idParam;
};

const IMAGE_STOP_WORDS = new Set([
    "the", "and", "for", "with", "from", "to", "of", "in", "on", "a", "an", "system", "app", "platform", "online"
]);

const categoryImageTags: Record<string, string[]> = {
    "Web Development": ["web", "coding", "laptop", "dashboard"],
    "App Development": ["mobile", "smartphone", "app", "developer"],
    "Full Stack": ["software", "team", "programming", "technology"],
    "AI & Machine Learning": ["ai", "data", "analytics", "computer"],
};

const buildProjectImageFromTitle = (title: string, category: string, index: number) => {
    const titleTags = title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((word) => word.length > 2 && !IMAGE_STOP_WORDS.has(word))
        .slice(0, 3);

    const tags = [...titleTags, ...(categoryImageTags[category] || ["technology", "software"])]
        .map((tag) => tag.replace(/[^a-z0-9]/g, ""))
        .filter(Boolean)
        .slice(0, 6)
        .join(",");

    return `https://loremflickr.com/1200/800/${tags || "technology,software"}?lock=${index + 100}`;
};

const isUnsplashUrl = (imageUrl?: string) => {
    if (!imageUrl) return true;
    return /unsplash\.com/i.test(imageUrl);
};

const normalizeImageUrl = (rawUrl: string) => {
    const value = (rawUrl || "").trim();
    if (!value) return value;
    if (value.startsWith("//")) return `https:${value}`;
    if (/^www\./i.test(value)) return `https://${value}`;
    return value;
};

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

            const migrated = await Promise.all(
                projects.map(async (project, index) => {
                    if (!isUnsplashUrl(project.imageUrl)) return project;
                    const migratedImage = buildProjectImageFromTitle(project.title, project.category, index);
                    await Project.updateOne({ _id: project._id }, { $set: { imageUrl: migratedImage } });
                    project.imageUrl = migratedImage;
                    return project;
                })
            );

            return res.json({
                projects: migrated,
                total,
                currentPage: pageNum,
                totalPages: Math.ceil(total / limitNum)
            });
        }

        const projects = await Project.find(query).sort({ createdAt: -1 });
        const migrated = await Promise.all(
            projects.map(async (project, index) => {
                if (!isUnsplashUrl(project.imageUrl)) return project;
                const migratedImage = buildProjectImageFromTitle(project.title, project.category, index);
                await Project.updateOne({ _id: project._id }, { $set: { imageUrl: migratedImage } });
                project.imageUrl = migratedImage;
                return project;
            })
        );
        res.json(migrated);
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects", error: (error as Error).message });
    }
};

// Get single project by ID
export const getProjectById = async (req: Request, res: Response) => {
    try {
        const projectId = normalizeProjectIdParam(req.params.id);
        const project = await Project.findOne(getProjectLookupQuery(projectId));
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        if (isUnsplashUrl(project.imageUrl)) {
            const migratedImage = buildProjectImageFromTitle(project.title, project.category, 0);
            project.imageUrl = migratedImage;
            await project.save();
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
        const normalizedImageUrl = normalizeImageUrl(imageUrl);

        // Validate required fields
        if (!id || !title || !category || !description || !normalizedImageUrl || !technologies) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const project = new Project({
            id,
            title,
            category,
            description,
            imageUrl: normalizedImageUrl,
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
        const projectId = normalizeProjectIdParam(req.params.id);
        const { title, category, description, imageUrl, technologies } = req.body;
        const normalizedImageUrl = normalizeImageUrl(imageUrl);

        const project = await Project.findOneAndUpdate(
            getProjectLookupQuery(projectId),
            { title, category, description, imageUrl: normalizedImageUrl, technologies },
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
        const projectId = normalizeProjectIdParam(req.params.id);
        const project = await Project.findOneAndDelete(getProjectLookupQuery(projectId));

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting project", error: (error as Error).message });
    }
};
