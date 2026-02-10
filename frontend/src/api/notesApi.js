import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5005/api/notes",
});

//attach token automatically
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Get all notes
export const getNotes = () => API.get("/");

// Get note by ID
export const getNoteById = (id) => API.get(`/${id}`);

// Create note
export const createNote = (noteData) => API.post("/", noteData);

// Update note
export const updateNote = (id, noteData) => API.put(`/${id}`, noteData);

// Delete note
export const deleteNote = (id) => API.delete(`/${id}`);
