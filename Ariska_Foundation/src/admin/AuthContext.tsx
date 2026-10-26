import { createContext, useContext, useState, type ReactNode } from 'react'
import { login as apiLogin } from './api'

type AuthContextValue = {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('admin_token'))

  const login = async (username: string, password: string) => {
    const res = await apiLogin(username, password)
    localStorage.setItem('admin_token', res.data.access_token)
    setToken(res.data.access_token)
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
