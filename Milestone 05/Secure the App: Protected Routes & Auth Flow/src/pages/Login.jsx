import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('demo@vault.app')
  const [password, setPassword] = useState('password123')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulated auth token and user
    const mockUser = { name: 'Demo User', email }
    const mockToken = 'mock-jwt-token-12345'

    login(mockUser, mockToken)
    navigate('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-lg w-96 space-y-4">
        <h2 className="text-2xl font-bold">Sign in to VaultApp</h2>
        <div>
          <label className="block text-sm font-medium">Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded mt-1" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded mt-1" 
            required 
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Sign In
        </button>
      </form>
    </div>
  )
}