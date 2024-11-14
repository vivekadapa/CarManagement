import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token)
        if (token) {
            const fetchUser = async () => {
                try {
                    const response = await axios.request({
                        url: `${import.meta.env.VITE_BACKEND_URL}/api/user`,
                        method: "get",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    console.log(response)
                    if (response.ok) {
                        setUser(response.data)
                    }
                } catch (error) {
                    console.error("Failed to fetch user data:", err);
                }
            }
            fetchUser()
        }


    }, [navigate]);
    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
}
