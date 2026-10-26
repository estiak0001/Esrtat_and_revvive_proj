import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import wordmarkDark from '../../assets/logo/ariska-wordmark-dark.png'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username, password)
      navigate('/admin')
    } catch {
      setError('Invalid username or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-teal-950 flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src={wordmarkDark} alt="ARISKA" className="h-7 mx-auto bg-white rounded px-3 py-2" />
          <p className="mt-4 text-white/60 text-sm">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-teal-950 mb-1.5">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              className="w-full rounded-lg border border-teal-900/15 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-teal-950 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-teal-900/15 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
            />
          </div>

          {error && <p className="text-sm text-rose-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-teal-950 font-semibold py-2.5 text-sm transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
