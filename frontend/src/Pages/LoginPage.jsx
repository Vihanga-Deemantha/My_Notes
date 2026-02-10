import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await loginUser({ email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/home");
        } catch {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
            <Navbar />

            <div className="max-w-md mx-auto mt-24 card bg-base-100/80 backdrop-blur shadow-2xl">
                <div className="card-body space-y-4">
                    <h2 className="text-2xl font-bold text-center text-primary">
                        Welcome Back
                    </h2>

                    {error && <p className="text-error text-center">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            className="input input-bordered w-full"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className="btn btn-primary w-full shadow-md">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;


