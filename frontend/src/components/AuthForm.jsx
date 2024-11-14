import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, signup } from '../utils/index'

export function AuthForm({ isSignup, onSubmit }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignup) {
                await signup(email, password);
                alert("Sign Up successful! Please log in.");
                onSubmit(false); // Redirect to login
            } else {
                const { data } = await login(email, password);
                onSubmit(data); // Login user in context
            }
        } catch (error) {
            console.error(error);
            alert("Authentication failed. Try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold">{isSignup ? "Sign Up" : "Login"}</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input" />
            <button type="submit" className="btn">{isSignup ? "Sign Up" : "Login"}</button>
        </form>
    );
}
