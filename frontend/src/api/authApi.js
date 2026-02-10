import axios from "axios";
//this is for deployment , if the mode is development then it will use localhost:5005, if the mode is production then it will use /api
//this is because when we deploy the frontend and backend separately then the frontend will not be able to access the backend
//so we need to use the /api prefix to route the requests to the backend
//for example if the request is for /api/auth then it will be routed to the authRoutes
//if the request is for /api/notes then it will be routed to the notesRoutes
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5005/api" : "/api";
//create a axios instance
//this is used to make requests to the backend
//for example if the request is for /api/auth then it will be routed to the authRoutes
//if the request is for /api/notes then it will be routed to the notesRoutes
const API = axios.create({
    baseURL: BASE_URL,
});

export const loginUser = (data) => API.post("/login", data);
export const registerUser = (data) => API.post("/register", data);
