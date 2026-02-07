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
  Play,
  Monitor,
  Check,
  X,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Demo role data                                                     */
/* ------------------------------------------------------------------ */
const demoRoles: {
  role: Role
  icon: React.ElementType
  label: string
  desc: string
  color: string
  bg: string
}[] = [
  {
    role: "admin",
    icon: Shield,
    label: "Administrator",
    desc: "Full system access, analytics & user management",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    role: "teacher",
    icon: BookOpen,
    label: "Teacher",
    desc: "Classes, attendance, marks & assignments",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    role: "student",
    icon: GraduationCap,
    label: "Student",
    desc: "Grades, attendance, fees & timetable",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
]

/* ------------------------------------------------------------------ */
/*  Floating cards for the illustration panel                          */
/* ------------------------------------------------------------------ */
const floatingCards: {
  icon: React.ElementType
  label: string
  value: string
  pos: string
  delay: string
  anim: string
}[] = [
  {
    icon: Users,
    label: "Students",
    value: "2,847",
    pos: "top-[12%] left-[8%]",
    delay: "animation-delay: 0s",
    anim: "animate-float-slow",
  },
  {
    icon: ClipboardCheck,
    label: "Attendance",
    value: "94.2%",
    pos: "top-[8%] right-[12%]",
    delay: "animation-delay: 1s",
    anim: "animate-float-medium",
  },
  {
    icon: BarChart3,
    label: "Pass Rate",
    value: "89.7%",
    pos: "top-[42%] left-[4%]",
    delay: "animation-delay: 0.5s",
    anim: "animate-float-fast",
  },
  {
    icon: IndianRupee,
    label: "Collected",
    value: "98.1%",
    pos: "top-[38%] right-[6%]",
    delay: "animation-delay: 1.5s",
    anim: "animate-float-slow",
  },
  {
    icon: Calendar,
    label: "Lectures",
    value: "1,204",
    pos: "bottom-[22%] left-[14%]",
    delay: "animation-delay: 0.8s",
    anim: "animate-float-medium",
  },
  {
    icon: GraduationCap,
    label: "Faculty",
    value: "186",
    pos: "bottom-[18%] right-[10%]",
    delay: "animation-delay: 2s",
    anim: "animate-float-fast",
  },
]

/* ------------------------------------------------------------------ */
/*  SVG connector lines between cards                                  */
/* ------------------------------------------------------------------ */
function ConnectorLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full animate-pulse-line"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="22%" y1="22%" x2="50%" y2="50%" stroke="currentColor" className="text-primary/20" strokeWidth="1" strokeDasharray="6 4" />
      <line x1="78%" y1="18%" x2="50%" y2="50%" stroke="currentColor" className="text-primary/20" strokeWidth="1" strokeDasharray="6 4" />
      <line x1="14%" y1="52%" x2="50%" y2="50%" stroke="currentColor" className="text-primary/20" strokeWidth="1" strokeDasharray="6 4" />
      <line x1="84%" y1="48%" x2="50%" y2="50%" stroke="currentColor" className="text-primary/20" strokeWidth="1" strokeDasharray="6 4" />
      <line x1="26%" y1="74%" x2="50%" y2="50%" stroke="currentColor" className="text-primary/20" strokeWidth="1" strokeDasharray="6 4" />
      <line x1="80%" y1="78%" x2="50%" y2="50%" stroke="currentColor" className="text-primary/20" strokeWidth="1" strokeDasharray="6 4" />
      {/* Center hub */}
      <circle cx="50%" cy="50%" r="4" className="fill-primary/30" />
      <circle cx="50%" cy="50%" r="8" className="fill-primary/10" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [demoPicker, setDemoPicker] = useState(false)

  const { login, startDemo } = useAuth()
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const success = await login(email, password)
    if (success) {
      router.push("/dashboard")
    } else {
      setError("Invalid credentials. Use one of the quick-login options or try demo mode.")
    }
    setLoading(false)
  }

  const handleQuickLogin = async (loginEmail: string) => {
    setLoading(true)
    const success = await login(loginEmail, "demo")
    if (success) router.push("/dashboard")
    setLoading(false)
  }

  const handleStartDemo = (role: Role) => {
    startDemo(role)
    setDemoPicker(false)
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* ====== LEFT : Illustration panel ====== */}
      <div className="relative hidden flex-1 overflow-hidden lg:flex">
        {/* Background layers */}
        <div className="absolute inset-0 bg-primary/[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_70%)]" />
        <div
          className="absolute inset-0 animate-grid-fade"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary) / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Connector lines */}
        <ConnectorLines />

        {/* Floating stat cards */}
        {floatingCards.map((card, i) => (
          <div
            key={card.label}
            className={`absolute ${card.pos} ${card.anim} z-10`}
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/80 px-4 py-3 shadow-lg shadow-black/5 backdrop-blur-md">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <card.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground">{card.label}</p>
                <p className="text-sm font-bold text-foreground">{card.value}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Center hub label */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-xs font-semibold text-muted-foreground">CampusFlow ERP</span>
          </div>
        </div>

        {/* Bottom attribution */}
        <div className="absolute bottom-8 left-8 right-8 z-10">
          <p className="text-center text-xs text-muted-foreground/60">
            Unified platform for academics, attendance, examinations & finance
          </p>
        </div>
      </div>

      {/* ====== RIGHT : Login form ====== */}
      <div className="relative flex w-full flex-col lg:w-[480px] lg:min-w-[480px]">
        {/* Top bar : back + theme toggle */}
        <div className="flex items-center justify-between p-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-180" />
            Back
          </Link>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          </button>
        </div>

        {/* Form area */}
        <div className="flex flex-1 items-center justify-center px-8 pb-8">
          <div className="w-full max-w-sm">
            {/* Mobile logo */}
            <div className="mb-8 flex items-center gap-2.5 lg:hidden login-animate-1">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/25">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">CampusFlow</span>
            </div>

            {/* Heading */}
            <div className="login-animate-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h1>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Sign in to your account to continue
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-7 space-y-4 login-animate-2">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@college.edu"
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm shadow-black/[0.04] placeholder:text-muted-foreground/60 transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
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
                    placeholder="Enter any password"
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 pr-10 text-sm text-foreground shadow-sm shadow-black/[0.04] placeholder:text-muted-foreground/60 transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
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
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 transition-all hover:brightness-110 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50"
              >
                {loading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6 login-animate-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                  Quick access
                </span>
              </div>
            </div>

            {/* Quick login buttons */}
            <div className="grid grid-cols-3 gap-2 login-animate-4">
              {[
                { role: "admin" as Role, email: "admin@campusflow.edu", icon: Shield, label: "Admin", color: "text-primary", bg: "group-hover:bg-primary/10" },
                { role: "teacher" as Role, email: "teacher@campusflow.edu", icon: BookOpen, label: "Teacher", color: "text-emerald-500", bg: "group-hover:bg-emerald-500/10" },
                { role: "student" as Role, email: "student@campusflow.edu", icon: GraduationCap, label: "Student", color: "text-amber-500", bg: "group-hover:bg-amber-500/10" },
              ].map((ql) => (
                <button
                  key={ql.role}
                  onClick={() => handleQuickLogin(ql.email)}
                  disabled={loading}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-3.5 transition-all hover:-translate-y-0.5 hover:border-border/80 hover:shadow-md disabled:opacity-50"
                >
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-muted/50 transition-colors ${ql.bg}`}>
                    <ql.icon className={`h-4 w-4 ${ql.color}`} />
                  </div>
                  <span className="text-xs font-semibold text-foreground">{ql.label}</span>
                </button>
              ))}
            </div>

            {/* Demo mode CTA */}
            <div className="login-animate-5">
              <button
                onClick={() => setDemoPicker(true)}
                className="group mt-4 flex w-full items-center gap-3 rounded-xl border border-dashed border-primary/30 bg-primary/[0.03] p-3.5 transition-all hover:border-primary/50 hover:bg-primary/[0.06]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Play className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-foreground">Explore Demo Mode</p>
                  <p className="text-[11px] text-muted-foreground">
                    View-only access with sample data
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ====== DEMO PICKER MODAL ====== */}
      {demoPicker && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDemoPicker(false)}
          />

          <div className="relative w-full max-w-lg animate-in fade-in zoom-in-95 duration-200 rounded-2xl border border-border bg-card shadow-2xl">
            <button
              onClick={() => setDemoPicker(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-6 pb-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Monitor className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Demo Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore all features with sample data
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 pt-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
                Choose a role
              </p>
              <div className="flex flex-col gap-2.5">
                {demoRoles.map((dr) => (
                  <button
                    key={dr.role}
                    onClick={() => handleStartDemo(dr.role)}
                    className="group flex items-center gap-4 rounded-xl border border-border bg-background p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${dr.bg} ${dr.color} transition-transform duration-200 group-hover:scale-110`}
                    >
                      <dr.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">{dr.label}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{dr.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-5 flex items-start gap-2.5 rounded-lg bg-muted/50 p-3">
                <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-2.5 w-2.5 text-primary" />
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Demo mode is read-only with sample data. No changes are saved and you can switch roles or exit at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
