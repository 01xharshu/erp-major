"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { useAuth, type Role } from "@/app/providers"
import {
  Eye,
  EyeOff,
  ArrowRight,
  Moon,
  Sun,
  GraduationCap,
  Shield,
  BookOpen,
  Users,
  ClipboardCheck,
  BarChart3,
  IndianRupee,
  Calendar,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Node-graph floating cards                                          */
/* ------------------------------------------------------------------ */
const nodes = [
  { icon: Users,          label: "Students",   value: "2,847",  x: 12, y: 14, anim: "animate-float-slow"   },
  { icon: ClipboardCheck, label: "Attendance",  value: "94.2%",  x: 72, y: 10, anim: "animate-float-medium" },
  { icon: BarChart3,      label: "Pass Rate",   value: "89.7%",  x: 6,  y: 46, anim: "animate-float-fast"   },
  { icon: IndianRupee,    label: "Collected",    value: "98.1%",  x: 76, y: 44, anim: "animate-float-slow"   },
  { icon: Calendar,       label: "Lectures",     value: "1,204",  x: 16, y: 76, anim: "animate-float-medium" },
  { icon: GraduationCap,  label: "Faculty",      value: "186",    x: 68, y: 78, anim: "animate-float-fast"   },
]

/* Center hub coordinates */
const HUB = { x: 44, y: 48 }

/* ------------------------------------------------------------------ */
/*  Network lines SVG                                                  */
/* ------------------------------------------------------------------ */
function NetworkLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow behind hub */}
      <circle cx={`${HUB.x}%`} cy={`${HUB.y}%`} r="60" fill="url(#hub-glow)" />

      {/* Connector lines */}
      {nodes.map((n) => (
        <line
          key={n.label}
          x1={`${n.x + 6}%`}
          y1={`${n.y + 2}%`}
          x2={`${HUB.x}%`}
          y2={`${HUB.y}%`}
          stroke="hsl(var(--primary))"
          strokeOpacity="0.12"
          strokeWidth="1"
          strokeDasharray="5 5"
          className="animate-pulse-line"
        />
      ))}

      {/* Secondary cross-links for a richer network feel */}
      <line x1={`${nodes[0].x + 6}%`} y1={`${nodes[0].y + 2}%`} x2={`${nodes[1].x + 6}%`} y2={`${nodes[1].y + 2}%`} stroke="hsl(var(--primary))" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="3 6" />
      <line x1={`${nodes[2].x + 6}%`} y1={`${nodes[2].y + 2}%`} x2={`${nodes[4].x + 6}%`} y2={`${nodes[4].y + 2}%`} stroke="hsl(var(--primary))" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="3 6" />
      <line x1={`${nodes[3].x + 6}%`} y1={`${nodes[3].y + 2}%`} x2={`${nodes[5].x + 6}%`} y2={`${nodes[5].y + 2}%`} stroke="hsl(var(--primary))" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="3 6" />

      {/* Hub rings */}
      <circle cx={`${HUB.x}%`} cy={`${HUB.y}%`} r="5"  fill="hsl(var(--primary))" fillOpacity="0.2" />
      <circle cx={`${HUB.x}%`} cy={`${HUB.y}%`} r="12" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.1" strokeWidth="1" />
      <circle cx={`${HUB.x}%`} cy={`${HUB.y}%`} r="20" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.05" strokeWidth="1" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Main login component                                               */
/* ------------------------------------------------------------------ */
export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  const { login, startDemo, isAuthenticated } = useAuth()
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect if already authenticated - single source of navigation
  useEffect(() => {
    if (mounted && isAuthenticated) {
      router.replace("/dashboard")
    }
  }, [mounted, isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error("Please enter your email")
      return
    }
    
    setLoading(true)
    const success = await login(email, password)
    if (!success) {
      toast.error("Invalid email. Try: admin@college.edu")
      setLoading(false)
    } else {
      toast.success("Login successful!")
      // If success, isAuthenticated becomes true -> useEffect handles redirect
    }
  }

  const handleQuickLogin = async (loginEmail: string) => {
    setLoading(true)
    const success = await login(loginEmail, "demo")
    if (!success) {
      toast.error("Login failed")
      setLoading(false)
    } else {
      toast.success(`Logged in as ${loginEmail.split("@")[0]}`)
      // If success, isAuthenticated becomes true -> useEffect handles redirect
    }
  }

  const handleDemo = (role: Role) => {
    setLoading(true)
    toast.success(`Entering ${role} demo mode`)
    startDemo(role)
    // isAuthenticated becomes true -> useEffect handles redirect
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* ====== LEFT: Node-graph illustration panel ====== */}
      <div className="relative hidden flex-1 overflow-hidden lg:flex">
        {/* Background layers */}
        <div className="absolute inset-0 bg-primary/[0.02]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_48%,hsl(var(--primary)/0.06),transparent_65%)]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 animate-grid-fade"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(var(--primary) / 0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Network lines */}
        <NetworkLines />

        {/* Floating stat cards */}
        {nodes.map((node, i) => (
          <div
            key={node.label}
            className={`absolute ${node.anim}`}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            <div className="group flex items-center gap-2.5 rounded-xl border border-border/60 bg-card/90 px-3.5 py-2.5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <node.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-medium text-muted-foreground">
                  {node.label}
                </p>
                <p className="text-sm font-bold text-foreground">{node.value}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Central hub label */}
        <div
          className="absolute flex flex-col items-center gap-1"
          style={{ left: `${HUB.x - 4}%`, top: `${HUB.y - 1}%` }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-[10px] font-semibold text-foreground/70">
            CampusFlow
          </span>
        </div>
      </div>

      {/* ====== RIGHT: Login form ====== */}
      <div className="relative flex w-full flex-col lg:w-[480px] lg:border-l lg:border-border/40">
        {/* Theme toggle */}
        <div className="absolute right-4 top-4 z-10">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Centered form */}
        <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-sm">
            {/* Logo */}
            <div className="mb-8 login-animate-1">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/25">
                  <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-lg font-bold text-foreground">CampusFlow</span>
                  <p className="text-[11px] text-muted-foreground">College ERP Platform</p>
                </div>
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-6 login-animate-2">
              <h1 className="text-xl font-bold text-foreground">Welcome back</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Sign in to your account to continue
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 login-animate-3">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@campusflow.edu"
                  className="flex h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="flex h-10 w-full rounded-lg border border-border bg-card px-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            {/* Quick access */}
            <div className="mt-8 login-animate-4">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50">
                Quick access
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { email: "admin@campusflow.edu", label: "Admin", icon: Shield, color: "text-primary", bg: "bg-primary/10" },
                  { email: "teacher@campusflow.edu", label: "Teacher", icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                  { email: "student@campusflow.edu", label: "Student", icon: GraduationCap, color: "text-amber-500", bg: "bg-amber-500/10" },
                ].map((item) => (
                  <button
                    key={item.email}
                    onClick={() => handleQuickLogin(item.email)}
                    disabled={loading}
                    className="group flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.bg}`}>
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Demo mode section */}
            <div className="mt-7 login-animate-5">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-background px-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50">
                    or explore as guest
                  </span>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-dashed border-primary/30 bg-primary/[0.03] p-4">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                    <Eye className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Demo Mode</p>
                    <p className="text-[11px] text-muted-foreground">View-only access with sample data</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { role: "admin" as Role, icon: Shield, label: "Admin", color: "text-primary" },
                    { role: "teacher" as Role, icon: BookOpen, label: "Teacher", color: "text-emerald-500" },
                    { role: "student" as Role, icon: GraduationCap, label: "Student", color: "text-amber-500" },
                  ]).map((d) => (
                    <button
                      key={d.role}
                      onClick={() => handleDemo(d.role)}
                      disabled={loading}
                      className="group flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card py-2 text-xs font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <d.icon className={`h-3.5 w-3.5 ${d.color}`} />
                      {d.label}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-center text-[10px] text-muted-foreground/50">
                  No login required. No data is saved or modified.
                </p>
              </div>
            </div>

            {/* Footer note */}
            <p className="mt-5 text-center text-[11px] leading-relaxed text-muted-foreground/50">
              All data shown is for demonstration purposes only.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
