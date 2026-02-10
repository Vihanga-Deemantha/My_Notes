import { useState } from "react";
import { createNote } from "../api/notesApi.js";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";


const CreatePage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createNote({ title, content });
            navigate("/home");
        } catch (error) {
            alert("Failed to create note");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
            <Navbar />

            <div className="max-w-xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Create Note</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        className="input input-bordered w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <textarea
                        placeholder="Content"
                        className="textarea textarea-bordered w-full h-40"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />

                    <button className="btn btn-primary w-full">
                        Save Note
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePage;
