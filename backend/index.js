import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import rateLimiter from "./middleware/rateLimiter.js";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";

//load environment variables from .env file
dotenv.config();
//create express app,that is used to create a server.
//express is a framework that is used to create a server.
//app is the instance of express.
const app = express();

//cors use for security,that allow requests from different origins
app.use(cors());
//middleware to parse json
//express.json() is used to parse the request body
//it will convert the request body to json
//for example if we have a form then it will convert the form data to json
app.use(express.json());
app.use(rateLimiter);

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB:', err);
        //exit the process,1 is for error 0 is for success.
        process.exit(1);
    });

//middleware to log requests
//this middleware will log the request method and the URL
//next() is used to pass the control to the next middleware
//for example if we have multiple middleware then it will execute in the order they are defined
//that means first middleware will execute then second middleware will execute and so on
//if we don't call next() then the request will be blocked

app.use((req, res, next) => {
    console.log(`Request method is ${req.method} and the URL is ${req.url}`);
    next();
})


//auth routes
app.use('/api/auth', authRoutes);

//use the notesRoutes
app.use('/api/notes', notesRoutes);

//listen to the port
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});