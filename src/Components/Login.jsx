import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'

const Login = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData, {
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      })

      const token = response.data.token
      // persist under ACCESS_TOKEN so app-wide checks match
      localStorage.setItem('ACCESS_TOKEN', token)
      if (onSuccess) onSuccess({ token, user: response.data.user ?? null })
      // update global auth context if available
      try { if (typeof login === 'function') login(token) } catch (e) {}
      toast.success('Signed in successfully')
      if (onClose) onClose()
      else navigate('/')
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-[#0f172a] rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Sign in to NexusTasks</h2>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}

export default Login
