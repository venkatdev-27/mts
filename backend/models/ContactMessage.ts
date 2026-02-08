import mongoose, { Schema, Document } from "mongoose";

export interface IContactMessage extends Document {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: "unread" | "read";
    createdAt: Date;
    updatedAt: Date;
}

const ContactMessageSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        subject: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["unread", "read"],
            default: "unread",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IContactMessage>(
    "ContactMessage",
    ContactMessageSchema
);
