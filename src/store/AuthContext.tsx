import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { login as apiLogin } from '@/api/auth'
import type { LoginResponse } from '@/types'

const STORAGE_KEY = 'cashback_arena_user'

interface User {
  userId: string
  displayName: string
}

interface AuthContextValue {
  user: User | null
  login: (displayName: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

function loadStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as LoginResponse
    if (parsed?.userId && parsed?.displayName) {
      return { userId: parsed.userId, displayName: parsed.displayName }
    }
  } catch {
    // ignore
  }
  return null
}

function saveUser(user: User | null) {
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(STORAGE_KEY)
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadStoredUser)

  const login = useCallback(async (displayName: string) => {
    const res = await apiLogin(displayName)
    const u = { userId: res.userId, displayName: res.displayName }
    setUser(u)
    saveUser(u)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    saveUser(null)
  }, [])

  useEffect(() => {
    saveUser(user)
  }, [user])

  const value: AuthContextValue = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
