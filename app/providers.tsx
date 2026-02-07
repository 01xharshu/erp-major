"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"

// ── Types ────────────────────────────────────────────────────────────
export type Role = "admin" | "teacher" | "student"

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
  department?: string
}

// ── Mock users for demo ──────────────────────────────────────────────
const mockUsers: User[] = [
  {
    id: "admin-1",
    name: "Dr. Rajesh Kumar",
    email: "admin@campusflow.edu",
    role: "admin",
    avatar: "",
    department: "Administration",
  },
  {
    id: "teacher-1",
    name: "Prof. Ananya Sharma",
    email: "teacher@campusflow.edu",
    role: "teacher",
    avatar: "",
    department: "Computer Science",
  },
  {
    id: "student-1",
    name: "Harsh Upadhyay",
    email: "student@campusflow.edu",
    role: "student",
    avatar: "",
    department: "Computer Science",
  },
]

// ── Auth context ─────────────────────────────────────────────────────
interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  switchRole: (role: Role) => void
  isAuthenticated: boolean
  isDemo: boolean
  startDemo: (role: Role) => void
  exitDemo: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// ── Combined Providers ───────────────────────────────────────────────
export function Providers({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isDemo, setIsDemo] = useState(false)

  const login = useCallback(
    async (email: string, _password: string): Promise<boolean> => {
      try {
        // Try real database login first
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        })
        const data = await res.json()
        if (data.success && data.user) {
          setUser(data.user as User)
          setIsDemo(false)
          return true
        }
      } catch {
        // If API fails, fall back to mock users
        console.warn("DB login failed, using mock fallback")
      }
      // Fallback to mock users (offline / no DB)
      const foundUser = mockUsers.find((u) => u.email === email)
      if (foundUser) {
        setUser(foundUser)
        setIsDemo(false)
        return true
      }
      return false
    },
    []
  )

  const logout = useCallback(() => {
    setUser(null)
    setIsDemo(false)
  }, [])

  const switchRole = useCallback((role: Role) => {
    const roleUser = mockUsers.find((u) => u.role === role)
    if (roleUser) {
      setUser(roleUser)
    }
  }, [])

  const startDemo = useCallback((role: Role) => {
    const roleUser = mockUsers.find((u) => u.role === role)
    if (roleUser) {
      setUser(roleUser)
      setIsDemo(true)
    }
  }, [])

  const exitDemo = useCallback(() => {
    setUser(null)
    setIsDemo(false)
  }, [])

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <AuthContext.Provider
        value={{
          user,
          login,
          logout,
          switchRole,
          isAuthenticated: !!user,
          isDemo,
          startDemo,
          exitDemo,
        }}
      >
        {children}
      </AuthContext.Provider>
    </NextThemesProvider>
  )
}
