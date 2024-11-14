import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate("/"); // Redirect to login page after successful signup
            } else {
                setError(data.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            setLoading(false);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded"
                    disabled={loading}
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </form>
        </div>
    );
};

export default SignupPage;
