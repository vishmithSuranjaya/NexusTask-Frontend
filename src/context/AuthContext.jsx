import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext({
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
})

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('ACCESS_TOKEN')
    setIsLoggedIn(!!token)
  }, [])

  const login = (token) => {
    if (token) localStorage.setItem('ACCESS_TOKEN', token)
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('ACCESS_TOKEN')
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
