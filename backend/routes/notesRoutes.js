import express from "express";
import {
    getNotes,
    createNotes,
    updateNotes,
    deleteNotes,
    getNoteById
} from "../controllers/noteController.js";

import { protect } from "../middleware/authMiddleware.js";

//create a router
const router = express.Router();

//routes (protected)
router.get("/", protect, getNotes);
router.get("/:id", protect, getNoteById);
router.post("/", protect, createNotes);
router.put("/:id", protect, updateNotes);
router.delete("/:id", protect, deleteNotes);

//export the router
export default router;
