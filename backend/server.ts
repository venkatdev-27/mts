import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import connectDB from "./config/db";
import { seedAdmin } from "./scripts/adminSeeder";
import projectRoutes from "./routes/projects";
import contactRoutes from "./routes/contact";
import authRoutes from "./routes/auth";

dotenv.config();

// Connect to MongoDB
connectDB().then(() => {
    seedAdmin();
});

const app: Application = express();

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
,

];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) return callback(null, true);
            return callback(null, true); // allow all in prod
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(compression());
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
    res.send("Backend running successfully 🚀");
});

app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
