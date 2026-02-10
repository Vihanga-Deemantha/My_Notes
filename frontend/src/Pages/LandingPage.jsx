import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300">
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-32 text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-primary mb-6">
                    Your thoughts deserve elegance
                </h1>

                <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto mb-12">
                    A secure, lightning-fast note-taking platform built for thinkers,
                    creators, and developers. Fully private. Fully yours.
                </p>

                <div className="flex justify-center gap-4">
                    <Link to="/register" className="btn btn-primary btn-lg shadow-lg">
                        Get Started
                    </Link>
                    <Link to="/login" className="btn btn-outline btn-primary btn-lg">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;


