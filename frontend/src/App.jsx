import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated on component mount
    const token = localStorage.getItem('token')
    if (token) {
      // Verify token validity with backend
      fetch('http://localhost:5000/api/protected', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem('token')
          setIsAuthenticated(false)
        }
      })
      .catch(() => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [])

  const setAuth = (token) => {
    if (token) {
      localStorage.setItem('token', token)
      setIsAuthenticated(true)
    } else {
      localStorage.removeItem('token')
      setIsAuthenticated(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setAuth={setAuth} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <Register setAuth={setAuth} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App