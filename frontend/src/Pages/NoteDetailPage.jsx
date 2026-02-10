import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNoteById, updateNote, deleteNote } from "../api/notesApi";
import Navbar from "../components/Navbar";

const NoteDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNote = async () => {
            const res = await getNoteById(id);
            setTitle(res.data.note.title);
            setContent(res.data.note.content);
            setLoading(false);
        };
        fetchNote();
    }, [id]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="min-h-screen bg-base-200">
            <Navbar />

            <div className="max-w-xl mx-auto p-6">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body space-y-4">
                        <input
                            className="input input-bordered text-lg font-semibold"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            className="textarea textarea-bordered h-48"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        <div className="flex gap-3">
                            <button
                                className="btn btn-primary flex-1 shadow-md"
                                onClick={() => updateNote(id, { title, content })}
                            >
                                Update
                            </button>
                            <button
                                className="btn btn-error flex-1 shadow-md"
                                onClick={() => {
                                    deleteNote(id);
                                    navigate("/home");
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteDetailPage;

