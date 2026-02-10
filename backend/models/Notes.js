import mongoose from "mongoose";

//schema is used to define the structure of the data
//new mongoose.Schema is used to create a new schema
//timestamps is used to add createdAt and updatedAt fields
//{ timestamps: true } is used to add createdAt and updatedAt fields
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    //this field links the note to the logged in user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true }//createdAt and updatedAt will be added automatically
);

//model is used to create a model
//mongoose.model is used to create a model
//"Note" is the name of the model
//noteSchema is the schema of the model
const Note = mongoose.model("Note", noteSchema);

//export the model
export default Note;

