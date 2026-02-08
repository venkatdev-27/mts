import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
    id: string;
    title: string;
    category: string;
    description: string;
    imageUrl: string;
    technologies: string[];
    createdAt: Date;
    updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            enum: [
                "Web Development",
                "App Development",
                "Full Stack",
                "AI & Machine Learning",
                "IEEE Standards",
                "Final Year Major",
            ],
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        technologies: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IProject>("Project", ProjectSchema);
