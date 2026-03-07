import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homepage from './Pages/Homepage'
import About from './Pages/About'

function App() {
  const [count, setCount] = useState(0)
  // Initialize state by checking if a token exists in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('ACCESS_TOKEN'));

  // Use an effect to keep the state in sync if you do manual changes
  useEffect(() => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    setIsLoggedIn(!!token);
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
