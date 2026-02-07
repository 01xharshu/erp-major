"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useTheme } from "next-themes"
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
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [pendingNav, setPendingNav] = useState(false)

  const { login, startDemo, isAuthenticated } = useAuth()
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  // Navigate AFTER auth state has propagated through React re-render
  useEffect(() => {
    if (pendingNav && isAuthenticated) {
      router.push("/dashboard")
      setPendingNav(false)
    }
  }, [pendingNav, isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const success = await login(email, password)
    if (success) {
      setPendingNav(true)
    } else {
      setError("Invalid credentials. Use one of the quick-access accounts below.")
    }
    setLoading(false)
  }

  const handleQuickLogin = async (loginEmail: string) => {
    setLoading(true)
    const success = await login(loginEmail, "demo")
    if (success) setPendingNav(true)
    setLoading(false)
  }

  const handleDemo = (role: Role) => {
    setLoading(true)
    startDemo(role)
    setPendingNav(true)
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
              "linear-gradient(hsl(var(--primary) / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* Network connector lines */}
        <NetworkLines />

        {/* Floating node cards */}
        {nodes.map((node, i) => (
          <div
            key={node.label}
            className={`absolute z-10 ${node.anim}`}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/70 px-4 py-3 shadow-lg shadow-black/[0.04] backdrop-blur-lg transition-transform duration-500 hover:scale-105 hover:shadow-xl hover:shadow-black/[0.06]">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <node.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground">{node.label}</p>
                <p className="text-sm font-bold tracking-tight text-foreground">{node.value}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Center hub */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
        >
          <div className="flex flex-col items-center gap-2.5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="rounded-full bg-card/60 px-3 py-1 text-[11px] font-semibold text-muted-foreground backdrop-blur-md">
              CampusFlow ERP
            </span>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="absolute bottom-8 left-0 right-0 z-10 text-center">
          <p className="text-xs text-muted-foreground/50">
            Unified platform for academics, attendance, examinations & finance
          </p>
        </div>
      </div>

      {/* ====== RIGHT: Login form ====== */}
      <div className="relative flex w-full flex-col lg:w-[460px] lg:min-w-[460px] lg:border-l lg:border-border/60">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-180" />
            Home
          </Link>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          </button>
        </div>

        {/* Form area */}
        <div className="flex flex-1 items-center justify-center px-8 pb-10">
          <div className="w-full max-w-[340px]">
            {/* Mobile logo */}
            <div className="mb-8 flex items-center gap-2.5 login-animate-1 lg:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/20">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">CampusFlow</span>
            </div>

            {/* Heading */}
            <div className="login-animate-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h1>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Sign in to your CampusFlow account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-4 login-animate-2">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@college.edu"
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm shadow-black/[0.03] placeholder:text-muted-foreground/50 transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 pr-10 text-sm text-foreground shadow-sm shadow-black/[0.03] placeholder:text-muted-foreground/50 transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 transition-colors hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2.5">
                  <p className="text-xs text-destructive">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 transition-all hover:brightness-110 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50"
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

            {/* Divider */}
            <div className="relative my-7 login-animate-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50">
                  Quick access
                </span>
              </div>
            </div>

            {/* Quick-login role buttons */}
            <div className="grid grid-cols-3 gap-2.5 login-animate-4">
              {([
                {
                  role: "admin" as Role,
                  email: "admin@campusflow.edu",
                  icon: Shield,
                  label: "Admin",
                  color: "text-primary",
                  hoverBg: "group-hover:bg-primary/10",
                },
                {
                  role: "teacher" as Role,
                  email: "teacher@campusflow.edu",
                  icon: BookOpen,
                  label: "Teacher",
                  color: "text-emerald-500",
                  hoverBg: "group-hover:bg-emerald-500/10",
                },
                {
                  role: "student" as Role,
                  email: "student@campusflow.edu",
                  icon: GraduationCap,
                  label: "Student",
                  color: "text-amber-500",
                  hoverBg: "group-hover:bg-amber-500/10",
                },
              ]).map((ql) => (
                <button
                  key={ql.role}
                  onClick={() => handleQuickLogin(ql.email)}
                  disabled={loading}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-border/80 hover:shadow-md disabled:opacity-50"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50 transition-colors ${ql.hoverBg}`}
                  >
                    <ql.icon className={`h-4.5 w-4.5 ${ql.color}`} />
                  </div>
                  <span className="text-xs font-semibold text-foreground">{ql.label}</span>
                </button>
              ))}
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
                      className="group flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card py-2 text-xs font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground hover:shadow-md"
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
