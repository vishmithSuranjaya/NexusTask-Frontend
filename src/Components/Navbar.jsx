import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import Modal from './Modal';
import Register from './Register';
import { AuthContext } from '../context/AuthContext';
import Login from './Login';

const Navbar = ({ isLoggedIn: propLoggedIn, onLogin, onSignUp, onLogout }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);

  const linkClass = (path) =>
    `pb-1 transition duration-150 border-b-2 border-transparent hover:border-[#fab13a] hover:text-[#fab13a] ${
      location.pathname === path ? 'text-[#fab13a] border-[#fab13a]' : ''
    }`;

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogin = () => {
    // open login modal if no external handler
    if (onLogin) onLogin();
    else setShowLogin(true);
  };

  const handleSignUp = () => {
    // show register modal if no external handler provided
    if (onSignUp) onSignUp();
    else setShowRegister(true);
  };

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const onRegisterSuccess = (data) => {
    setShowRegister(false);
    if (onLogin) onLogin(data);
  };

  const onLoginSuccess = (data) => {
    setShowLogin(false);
    if (onLogin) onLogin(data);
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
    else logout();
  };

  return (
    <nav className="w-full bg-[#0f172a] text-white font-sans font-bold ">
      <div className="flex justify-between items-center px-8 py-4">

        <div>
            <h1 className="text-2xl font-bold">NexusTasks</h1>
        </div>

        {/*HAMBURGER (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/*NAV LINKS (Desktop) */}
        <div className="hidden md:flex items-center space-x-8 text-xl">
          <div className="flex items-center space-x-8">
            <Link to="/" className={linkClass('/')}>Home</Link>
            <Link to="/about" className={linkClass('/about')}>About</Link>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="border bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-400">Logout</button>
            ) : (
              <>
                <button onClick={handleLogin} className="border border-yellow-400 text-yellow-400 px-4 py-2 rounded-md hover:bg-[#fab13a] hover:text-white">Login</button>
                <button onClick={handleSignUp} className="border border-yellow-400 text-yellow-400 px-4 py-2 rounded-md hover:bg-[#fab13a] hover:text-white">Sign Up</button>
              </>
            )}
          </div>
        </div>
      </div>

      {/*MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-8 space-y-6 text-lg flex flex-col items-center bg-[#0f172a]">
          <Link to="/" onClick={closeMenu} className={linkClass('/')}>Home</Link>
          <Link to="/projects" onClick={closeMenu} className={linkClass('/projects')}>Projects</Link>

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
              className="w-full text-center bg-[#0f172a] text-white py-2 px-4 rounded-md border border:[#fab12a] hover:bg-[#fab13a] hover:text-white"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  handleLogin();
                  closeMenu();
                }}
                className="w-full text-center bg-white text-yellow-400 py-2 px-4 rounded-md"
              >
                Login
              </button>
              <button
                onClick={() => {
                  handleSignUp();
                  closeMenu();
                }}
                className="w-full text-center bg-yellow-400 text-white py-2 px-4 rounded-md"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      )}

      {showRegister && (
        <Modal onClose={() => setShowRegister(false)}>
          <Register onClose={() => setShowRegister(false)} onSuccess={onRegisterSuccess} />
        </Modal>
      )}
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <Login onClose={() => setShowLogin(false)} onSuccess={onLoginSuccess} />
        </Modal>
      )}
    </nav>
  );
};

export default Navbar;
