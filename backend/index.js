import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import rateLimiter from "./middleware/rateLimiter.js";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import path from "path";

// Load environment variables
dotenv.config();

const app = express();

// CORS
//this is for security reasons
//if the environment is production then it will not allow requests from different origins
if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: "http://localhost:5173", // frontend dev server
        })
    );
}

// Middleware to parse JSON
//express.json() is used to parse the request body
//it will convert the request body to json
//for example if we have a form then it will convert the form data to json
app.use(express.json());

// Apply rate limiter globally
//this is used to prevent the API from being overloaded
//it will limit the number of requests that can be made to the API in a certain amount of time
app.use(rateLimiter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    });

// Middleware to log requests
//this is used to log the requests that are made to the API
//it will log the method and the URL of the request
app.use((req, res, next) => {
    console.log(`Request: [${req.method}] ${req.url}`);
    next();
});

// API Routes
//this is used to route the requests to the appropriate routes
//for example if the request is for /api/auth then it will be routed to the authRoutes
//if the request is for /api/notes then it will be routed to the notesRoutes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// Serve frontend in production
//this is used to serve the frontend in production
//if the environment is production then it will serve the frontend
if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();

    // Serve static files
    //this is used to serve the static files
    //for example if we have a form then it will convert the form data to json
    app.use(express.static(path.join(__dirname, "frontend", "dist")));

    // SPA routing: send index.html for any unknown route
    //this is used to route the requests to the appropriate routes
    //for example if the request is for /api/auth then it will be routed to the authRoutes
    //if the request is for /api/notes then it will be routed to the notesRoutes
    app.get(/^(?!\/api\/).*/, (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
}

// Fallback for non-production (optional)
//this is used to serve the frontend in production
//if the environment is production then it will serve the frontend
/*app.get("/", (req, res) => {
    res.send("API is running...");
});*/

// Listen to the port
//this is used to listen to the port
//if the environment is production then it will listen to the port
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
