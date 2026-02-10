import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerUser(form);
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-base-200">
            <Navbar />

            <div className="max-w-md mx-auto mt-24 card bg-base-100/80 backdrop-blur shadow-2xl">
                <div className="card-body space-y-4">
                    <h2 className="text-2xl font-bold text-center text-primary">
                        Create Account
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            className="input input-bordered w-full"
                            placeholder="Username"
                            onChange={(e) =>
                                setForm({ ...form, username: e.target.value })
                            }
                        />

                        <input
                            className="input input-bordered w-full"
                            placeholder="Email"
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />

                        <input
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="Password"
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                        />

                        <button className="btn btn-primary w-full shadow-md">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
