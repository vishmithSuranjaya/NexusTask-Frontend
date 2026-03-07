import React, { useContext } from 'react'
import Navbar from '../Components/Navbar';
import Tasks from '../Components/Tasks';
import ProjectDescription from '../Components/ProjectDescription'
import { AuthContext } from '../context/AuthContext'

const Homepage = () => {
    const { isLoggedIn } = useContext(AuthContext)
    return(
        <div className="min-h-screen bg-[#0f172a] text-white">
            <Navbar />
            {isLoggedIn ? <Tasks /> : <ProjectDescription />}
        </div>
    )
}

export default Homepage;