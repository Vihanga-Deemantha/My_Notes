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

/* -------------------- MIDDLEWARE -------------------- */
// CORS (allow frontend in dev)
//this is for security reasons
//if the environment is production then it will not allow requests from different origins
//this is used to prevent the API from being overloaded
if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: "http://localhost:5173",
            credentials: true,
        })
    );
}

// Parse JSON body
//this is used to parse the request body
//it will convert the request body to json
//for example if we have a form then it will convert the form data to json
app.use(express.json());

// Rate limiter
//this is used to prevent the API from being overloaded
//it will limit the number of requests that can be made to the API in a certain amount of time
app.use(rateLimiter);

// Request logger (debugging)
//this is used to log the requests that are made to the API
//it will log the method and the URL of the request
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});

/* -------------------- DATABASE -------------------- */

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

/* -------------------- API ROUTES -------------------- */
//this is used to route the requests to the authRoutes
app.use("/api/auth", authRoutes);
//this is used to route the requests to the notesRoutes
app.use("/api/notes", notesRoutes);

/* -------------------- PRODUCTION FRONTEND -------------------- */
//this is used to serve the frontend files
//if the environment is production then it will serve the production files
//if the environment is development then it will not serve the production files
if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();

    // Serve React static files
    app.use(
        express.static(path.join(__dirname, "..", "frontend", "dist"))
    );

    // SPA routing (React Router)
    //this is used to route the requests to the frontend
    //if the environment is production then it will route the requests to the frontend
    //if the environment is development then it will not route the requests to the frontend
    app.get(/^(?!\/api\/).*/, (req, res) => {
        res.sendFile(
            path.join(__dirname, "..", "frontend", "dist", "index.html")
        );
    });
}

/* -------------------- SERVER -------------------- */
//this is used to start the server
//if the environment is production then it will start the server
//if the environment is development then it will not start the server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
