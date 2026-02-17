import mongoose, { Document, Schema } from "mongoose";

export interface ICourse extends Document {
    title: string;
    image: string;
    price: number;
    discountedPrice: number;
    category: 'Elite' | 'Premium';
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    author: string;
    rating: number;
    students: number;
    duration: string;
    skills: string[];
    overviewParagraph: string;
}

const courseSchema: Schema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    category: {
        type: String,
        required: true,
        enum: ['Elite', 'Premium']
    },
    level: {
        type: String,
        required: true,
        enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    author: { type: String, required: true },
    rating: { type: Number, default: 0 },
    students: { type: Number, default: 0 },
    duration: { type: String, required: true },
    skills: {
        type: [String],
        default: [],
    },
    overviewParagraph: {
        type: String,
        default: "",
    },
}, { timestamps: true });

export default mongoose.model<ICourse>("Course", courseSchema);
