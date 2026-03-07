import React from 'react'
import Navbar from '../Components/Navbar'

const About = () => {
  return (
    <div>
        <Navbar />
        <h1 className="text-3xl font-bold text-center mt-8">About Us</h1>
        <p className="text-center mt-4 text-gray-600">
            Welcome to Nexus, your go-to platform for seamless task management and collaboration. Our mission is to empower individuals and teams to achieve their goals efficiently and effectively. With a user-friendly interface and powerful features, Nexus helps you stay organized, prioritize tasks, and collaborate with ease. Whether you're managing personal projects or working with a team, Nexus is designed to adapt to your needs and enhance your productivity. Join us on this journey to transform the way you work and connect with others.
        </p>
    </div>
  )
}

export default About