import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { getNotes, deleteNote } from "../api/notesApi";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRateLimited, setIsRateLimited] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await getNotes();
                setNotes(res.data.notes);
            } catch (error) {
                if (error.response?.status === 429) {
                    setIsRateLimited(true);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this note?")) return;

        try {
            await deleteNote(id);
            setNotes(notes.filter(note => note._id !== id));
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete note");
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
            <Navbar />
            {isRateLimited && <RateLimitedUI />}

            <div className="max-w-7xl mx-auto px-6 py-10">
                {loading ? (
                    <p className="text-center opacity-60">Loading notes...</p>
                ) : notes.length === 0 ? (
                    <p className="text-center text-base-content/60">
                        No notes yet. Create your first one ✍️
                    </p>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <div
                                key={note._id}
                                className="group card bg-gradient-to-br from-base-100 via-base-200 to-base-100 shadow-md hover:shadow-xl transition-all border-l-4 border-primary"
                            >
                                <div className="card-body">
                                    <h2 className="card-title group-hover:text-primary transition">
                                        {note.title}
                                    </h2>
                                    <p className="text-sm text-base-content/70 line-clamp-3 mb-2">
                                        {note.content}
                                    </p>
                                    <p className="text-xs text-base-content/50 mb-3">
                                        Created at: {new Date(note.createdAt).toLocaleDateString()}{" "}
                                        {new Date(note.createdAt).toLocaleTimeString()}
                                    </p>

                                    <div className="flex justify-between mt-auto gap-2">
                                        <button
                                            onClick={() => navigate(`/notes/${note._id}`)}
                                            className="btn btn-sm btn-outline btn-primary flex-1"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(note._id)}
                                            className="btn btn-sm btn-error flex-1"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;

