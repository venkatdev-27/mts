import mongoose, { Document, Schema } from "mongoose";

export interface IRegistration extends Document {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    course: string;
    createdAt: Date;
}

const registrationSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: [true, "Please provide your first name"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Please provide your last name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    mobile: {
        type: String,
        required: [true, "Please provide your mobile number"],
    },
    course: {
        type: String,
        required: [true, "Please select a course"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model<IRegistration>("Registration", registrationSchema);
