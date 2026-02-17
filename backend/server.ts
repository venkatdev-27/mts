import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db";
import { seedAdmin } from "./scripts/adminSeeder";
import projectRoutes from "./routes/projects";
import contactRoutes from "./routes/contact";
import authRoutes from "./routes/auth";
import registrationRoutes from "./routes/registrationRoutes";
import courseRoutes from "./routes/courseRoutes";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];
const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);

if (missingEnvVars.length > 0) {
    console.error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
    process.exit(1);
}

connectDB().then(() => {
    seedAdmin();
});

const app: Application = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);

const normalizeOrigin = (value: string) => {
    try {
        const url = new URL(value);
        return url.origin;
    } catch {
        return value.trim().replace(/\/+$/, "");
    }
};

const envOrigins = [
    process.env.FRONTEND_URL,
    process.env.ADMIN_FRONTEND_URL,
    ...(process.env.CORS_ORIGINS?.split(",") || []),
]
    .filter(Boolean)
    .map((origin) => normalizeOrigin(origin as string));

const localOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
];

const defaultProductionOrigins = [
    "https://maruthitechsolutions.onrender.com",
    "https://mts-admin-frontend.onrender.com",
    "https://mts-client.onrender.com",
    "https://mts-admin.onrender.com",
].map((origin) => normalizeOrigin(origin));

const allowedOrigins = Array.from(new Set([
    ...(isProduction ? defaultProductionOrigins : localOrigins),
    ...envOrigins,
]));

if (isProduction && allowedOrigins.length === 0) {
    console.error("No CORS origins configured for production.");
    process.exit(1);
}

const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin) return callback(null, true);
        const normalizedOrigin = normalizeOrigin(origin);
        if (allowedOrigins.includes(normalizedOrigin)) return callback(null, true);
        console.warn(`CORS blocked origin: ${normalizedOrigin}`);
        return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
};

app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
}));

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(compression());
app.use(express.json({ limit: "10mb" }));

app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({ message: "Backend running successfully", environment: process.env.NODE_ENV || "development" });
});

app.get("/healthz", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
});

app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/register", registrationRoutes);
app.use("/api/courses", courseRoutes);

const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
