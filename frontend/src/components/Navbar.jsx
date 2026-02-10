import { Link, useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-50 bg-base-200/70 backdrop-blur-xl border-b border-base-300">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link
                    to="/home"
                    className="text-2xl font-extrabold tracking-tight text-primary hover:opacity-80 transition"
                >
                    ✨ My Notes
                </Link>

                <div className="flex items-center gap-3">
                    {token && (
                        <Link
                            to="/create"
                            className="btn btn-primary btn-sm gap-2 shadow-md"
                        >
                            <PlusIcon className="w-5 h-5" />
                            New Note
                        </Link>
                    )}

                    {!token ? (
                        <>
                            <Link className="btn btn-ghost btn-sm" to="/login">
                                Login
                            </Link>
                            <Link className="btn btn-primary btn-sm shadow-md" to="/register">
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="btn btn-error btn-sm shadow-md"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
