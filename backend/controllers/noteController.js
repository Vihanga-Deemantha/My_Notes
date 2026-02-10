/*import Notes from "../models/Notes.js";

//async function means it will take some time to execute,waiting for the response and then continue.
//try catch block is used to handle errors
//we can use _ to req if we don't need it
export async function getNotes(req, res) {
    try {
        //find() is used to fetch all the notes
        //const notes is used to store the notes
        //sort notes by createdAt in descending order that means latest notes will be first
        const notes = await Notes.find().sort({ createdAt: -1 });
        //send response to the client
        res.status(200).json({ message: "Notes fetched successfully", notes });
    } catch (error) {
        //console.error is used to log the error
        console.error("Error in getNotes controller", error);
        //send response to the client
        res.status(500).json({ message: error.message });
    }
}

export async function createNotes(req, res) {
    try {
        //destructuring the body,that is extracting the title and content from the body
        const { title, content } = req.body;
        //create a new note
        const note = new Notes({ title, content });
        //save the note
        await note.save();
        //send response to the client
        res.status(201).json({ message: "Note created successfully", note });
    } catch (error) {
        //console.error is used to log the error
        console.error("Error in createNotes controller", error);
        //send response to the client
        res.status(500).json({ message: error.message });
    }
}

export async function updateNotes(req, res) {
    try {
        //findByIdAndUpdate is used to update the note and return the updated note,new: true is used to return the updated note
        const note = await Notes.findByIdAndUpdate(req.params.id, req.body, { new: true });
        //send response to the client
        res.status(200).json({ message: "Note updated successfully", note });
    } catch (error) {
        //console.error is used to log the error
        console.error("Error in updateNotes controller", error);
        //send response to the client
        res.status(500).json({ message: error.message });
    }
}

export async function deleteNotes(req, res) {
    try {
        //findByIdAndDelete is used to delete the note and return the deleted note
        const note = await Notes.findByIdAndDelete(req.params.id);
        //send response to the client
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully", note });
    } catch (error) {
        //console.error is used to log the error
        console.error("Error in deleteNotes controller", error);
        //send response to the client
        res.status(500).json({ message: error.message });
    }
}

export async function getNoteById(req, res) {
    try {
        //findById is used to find the note by id
        const note = await Notes.findById(req.params.id);
        //send response to the client   
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note fetched successfully", note });
    } catch (error) {
        //console.error is used to log the error
        console.error("Error in getNoteById controller", error);
        //send response to the client
        res.status(500).json({ message: error.message });
    }
}*/

import Notes from "../models/Notes.js";

//get notes of logged in user only
export async function getNotes(req, res) {
    try {
        //find notes created by logged in user
        const notes = await Notes.find({ user: req.user })
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Notes fetched successfully",
            notes
        });
    } catch (error) {
        console.error("Error in getNotes controller", error);
        res.status(500).json({ message: error.message });
    }
}

//create note for logged in user
export async function createNotes(req, res) {
    try {
        const { title, content } = req.body;

        const note = new Notes({
            title,
            content,
            user: req.user //attach user id
        });

        await note.save();

        res.status(201).json({
            message: "Note created successfully",
            note
        });
    } catch (error) {
        console.error("Error in createNotes controller", error);
        res.status(500).json({ message: error.message });
    }
}

//update only user's own note
export async function updateNotes(req, res) {
    try {
        const note = await Notes.findOneAndUpdate(
            { _id: req.params.id, user: req.user },
            req.body,
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ message: "Note not found or unauthorized" });
        }

        res.status(200).json({
            message: "Note updated successfully",
            note
        });
    } catch (error) {
        console.error("Error in updateNotes controller", error);
        res.status(500).json({ message: error.message });
    }
}

//delete only user's own note
export async function deleteNotes(req, res) {
    try {
        const note = await Notes.findOneAndDelete({
            _id: req.params.id,
            user: req.user
        });

        if (!note) {
            return res.status(404).json({ message: "Note not found or unauthorized" });
        }

        res.status(200).json({
            message: "Note deleted successfully",
            note
        });
    } catch (error) {
        console.error("Error in deleteNotes controller", error);
        res.status(500).json({ message: error.message });
    }
}

//get single note by id (user protected)
export async function getNoteById(req, res) {
    try {
        const note = await Notes.findOne({
            _id: req.params.id,
            user: req.user
        });

        if (!note) {
            return res.status(404).json({ message: "Note not found or unauthorized" });
        }

        res.status(200).json({
            message: "Note fetched successfully",
            note
        });
    } catch (error) {
        console.error("Error in getNoteById controller", error);
        res.status(500).json({ message: error.message });
    }
}
