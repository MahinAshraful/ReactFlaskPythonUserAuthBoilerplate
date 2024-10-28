import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard({ setAuth }) {
  const [message, setMessage] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/protected', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await response.json()
        if (response.ok) {
          setMessage(data.message)
          setUserInfo(data)
        } else {
          setAuth(null)
          navigate('/login')
        }
      } catch (err) {
        console.error('Error fetching protected data:', err)
      }
    }

    fetchProtectedData()
  }, [])

  const handleLogout = () => {
    setAuth(null)
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">Dashboard</h2>
        <div className="space-y-4">
          <p className="text-center text-gray-700">{message}</p>
          {userInfo && (
            <p className="text-center text-gray-600">
              Member since: {userInfo.user_since}
            </p>
          )}
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard