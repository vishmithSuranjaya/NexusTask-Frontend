import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Tasks from '../Components/Tasks';
import ProjectDetails from '../Components/ProjectDetails'; // Create this component

const Homepage = () => {
    // Check if token exists on initial load
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('ACCESS_TOKEN'));

    // Optional: Listen for storage changes (if user logs out in another tab)
    useEffect(() => {
        const checkAuth = () => {
            setIsLoggedIn(!!localStorage.getItem('ACCESS_TOKEN'));
        };
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    return (
        <div className="min-h-screen bg-[#0f172a] text-white">
            <Navbar isLoggedIn={isLoggedIn} />
            
            <main className="container mx-auto px-6 py-10">
                {isLoggedIn ? (
                    /* Show the Task Management App if logged in */
                    <Tasks />
                ) : (
                    /* Show Project Information if not logged in */
                    <ProjectDetails />
                )}
            </main>
        </div>
    );
};

export default Homepage;