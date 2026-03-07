import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast'

const Register = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '' // Laravel looks for this for validation
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Send data to Laravel API
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData, {headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }});
      
      // 2. If successful, save the token and notify caller
      console.log('User registered:', response.data);
      const token = response.data.token
      localStorage.setItem('ACCESS_TOKEN', token);
      if (onSuccess) onSuccess({ token, user: response.data.user ?? null })
      if (onClose) onClose()
      else navigate('/'); 
      try { if (typeof login === 'function') login(token) } catch (e) {}
      toast.success('Registered successfully')
    } catch (err) {
      // 3. Handle validation errors from Laravel
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-[#0f172a] rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Create NexusTask Account</h2>
      
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;