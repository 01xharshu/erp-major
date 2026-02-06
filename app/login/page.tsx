"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import type { Role } from "@/types"

const quickLogins: { role: Role; email: string; label: string; description: string }[] = [
  { role: "admin", email: "admin@college.edu", label: "Admin", description: "Full system access" },
  { role: "teacher", email: "anita@college.edu", label: "Teacher", description: "Prof. Anita Sharma" },
  { role: "student", email: "rahul@college.edu", label: "Student", description: "Rahul Verma" },
]

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const success = await login(email, password)
    if (success) {
      router.push("/dashboard")
    } else {
      setError("Invalid credentials. Try one of the quick login options below.")
    }
    setLoading(false)
  }

  const handleQuickLogin = async (loginEmail: string) => {
    setLoading(true)
    const success = await login(loginEmail, "demo")
    if (success) {
      router.push("/dashboard")
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden flex-1 flex-col justify-between bg-primary p-12 lg:flex">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-foreground">
              <span className="text-sm font-bold text-primary">CF</span>
            </div>
            <span className="text-base font-semibold text-primary-foreground">CampusFlow</span>
          </Link>
        </div>
        <div>
          <h2 className="max-w-md text-3xl font-bold leading-tight text-primary-foreground text-balance">
            The modern ERP platform built for educational excellence
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/70">
            Manage academics, attendance, examinations, and fees from a single unified dashboard designed for the
            modern institution.
          </p>
        </div>
        <p className="text-xs text-primary-foreground/50">CampusFlow ERP - College Management System</p>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center bg-background p-8">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="mb-8 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <span className="text-sm font-bold text-primary-foreground">CF</span>
              </div>
              <span className="text-base font-semibold text-foreground">CampusFlow</span>
            </Link>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground">Sign in</h1>
            <p className="mt-1 text-sm text-muted-foreground">Enter your credentials to access the dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@college.edu"
                className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative mt-1.5">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter any password"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-3 text-xs text-muted-foreground">Quick login as</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {quickLogins.map((ql) => (
                <button
                  key={ql.role}
                  onClick={() => handleQuickLogin(ql.email)}
                  disabled={loading}
                  className="flex flex-col items-center gap-1 rounded-md border border-border bg-card p-3 text-center transition-colors hover:border-primary/30 hover:bg-accent disabled:opacity-50"
                >
                  <span className="text-xs font-semibold text-foreground">{ql.label}</span>
                  <span className="text-[10px] text-muted-foreground">{ql.description}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
