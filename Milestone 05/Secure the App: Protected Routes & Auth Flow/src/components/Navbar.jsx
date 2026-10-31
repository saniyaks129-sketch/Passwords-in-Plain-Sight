import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow">
      <Link to="/" className="font-bold text-xl">VaultApp</Link>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <span className="text-gray-600 text-sm">Hi, {user?.name || 'User'}</span>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/settings">Settings</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  )
}