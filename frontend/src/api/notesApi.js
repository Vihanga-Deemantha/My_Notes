import axios from "axios";

// Base URL depending on environment
//this is for deployment , if the mode is development then it will use localhost:5005, if the mode is production then it will use /api
//this is because when we deploy the frontend and backend separately then the frontend will not be able to access the backend
//so we need to use the /api prefix to route the requests to the backend
//for example if the request is for /api/auth then it will be routed to the authRoutes
//if the request is for /api/notes then it will be routed to the notesRoutes
const BASE_URL =
    import.meta.env.MODE === "development"
        ? "http://localhost:5005/api/notes"
        : "/api/notes";

// Axios instance
//this is used to make requests to the backend
//for example if the request is for /api/auth then it will be routed to the authRoutes
//if the request is for /api/notes then it will be routed to the notesRoutes
const API = axios.create({
    baseURL: BASE_URL,
});

// Attach token automatically
//this is used to attach the token to the requests
//for example if the request is for /api/auth then it will be routed to the authRoutes
//if the request is for /api/notes then it will be routed to the notesRoutes
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Notes API calls
//this is used to get all the notes
//for example if the request is for /api/auth then it will be routed to the authRoutes
//if the request is for /api/notes then it will be routed to the notesRoutes
export const getNotes = () => API.get("/");
export const getNoteById = (id) => API.get(`/${id}`);
export const createNote = (noteData) => API.post("/", noteData);
export const updateNote = (id, noteData) => API.put(`/${id}`, noteData);
export const deleteNote = (id) => API.delete(`/${id}`);
