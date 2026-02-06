"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { User, Role } from "@/types"
import { mockUsers } from "@/lib/mock-data"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  switchRole: (role: Role) => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    const foundUser = mockUsers.find((u) => u.email === email)
    if (foundUser) {
      setUser(foundUser)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const switchRole = useCallback((role: Role) => {
    const roleUser = mockUsers.find((u) => u.role === role)
    if (roleUser) {
      setUser(roleUser)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
