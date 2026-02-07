"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth, type Role } from "@/app/providers"
import {
  GraduationCap,
  ClipboardCheck,
  FileText,
  IndianRupee,
  BarChart3,
  Calendar,
  ArrowRight,
  BookOpen,
  Shield,
  Smartphone,
  Menu,
  X,
  Check,
  Users,
  Building2,
  Zap,
  ChevronRight,
  Library,
  Megaphone,
  Play,
  Monitor,
  Sparkles,
  Lock,
  FlaskConical,
} from "lucide-react"

/* ================================================================== */
/*  DATA                                                               */
/* ================================================================== */

const features = [
  { icon: GraduationCap, title: "Student Management", description: "Complete student lifecycle from admission to graduation with academic tracking.", tag: "Core" },
  { icon: ClipboardCheck, title: "Smart Attendance", description: "Mobile-first attendance marking with real-time analytics and audit trails.", tag: "Mobile" },
  { icon: FileText, title: "Examinations & Grading", description: "End-to-end exam management with automated GPA/CGPA calculation.", tag: "Academic" },
  { icon: IndianRupee, title: "Fees & Finance", description: "Fee management with installment plans, payment tracking, and receipts.", tag: "Finance" },
  { icon: BarChart3, title: "Reports & Analytics", description: "Data-driven insights across attendance, academics, and finance.", tag: "Analytics" },
  { icon: Calendar, title: "Timetable & Scheduling", description: "Dynamic scheduling with conflict detection and room allocation.", tag: "Planning" },
  { icon: Library, title: "Library Management", description: "Digital catalog, issue/return tracking, and overdue notifications.", tag: "Resources" },
  { icon: Megaphone, title: "Announcements", description: "Broadcast notices to the entire institution or targeted groups instantly.", tag: "Communication" },
]

const roles = [
  { icon: Shield, title: "Administrator", description: "Full system oversight with analytics dashboards, user management, fee configuration, and institutional controls.", items: ["System-wide analytics", "User & role management", "Fee configuration", "Academic oversight"], color: "text-primary", bg: "bg-primary/10" },
  { icon: BookOpen, title: "Teacher", description: "Class management, mobile attendance, marks entry, assignment creation, and student performance tracking.", items: ["Mobile attendance", "Marks & grade entry", "Assignment management", "Class schedules"], color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: GraduationCap, title: "Student", description: "Personal dashboard with grades, attendance records, fee status, assignments, and result downloads.", items: ["Academic results", "Attendance tracking", "Fee payments", "Assignment submissions"], color: "text-amber-500", bg: "bg-amber-500/10" },
]

const stats = [
  { value: "900+", label: "Students", icon: Users },
  { value: "69", label: "Faculty", icon: BookOpen },
  { value: "5", label: "Departments", icon: Building2 },
  { value: "99.9%", label: "Uptime", icon: Zap },
]

const demoRoles: { role: Role; icon: React.ElementType; label: string; description: string; color: string; bg: string }[] = [
  { role: "admin", icon: Shield, label: "Administrator", description: "Full system access with analytics, user management, and fee configuration.", color: "text-primary", bg: "bg-primary/10" },
  { role: "teacher", icon: BookOpen, label: "Teacher", description: "Class management, attendance marking, marks entry, and assignments.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { role: "student", icon: GraduationCap, label: "Student", description: "View grades, attendance, fees, timetable, and submit assignments.", color: "text-amber-500", bg: "bg-amber-500/10" },
]

/* Node orbit card data */
const orbitNodes = [
  { icon: GraduationCap, label: "Students", value: "900+", delay: "0s", speed: "28s", radius: 130, color: "bg-primary/10 text-primary" },
  { icon: BookOpen, label: "Teachers", value: "69", delay: "-7s", speed: "28s", radius: 130, color: "bg-emerald-500/10 text-emerald-500" },
  { icon: Building2, label: "Depts", value: "5", delay: "-14s", speed: "28s", radius: 130, color: "bg-amber-500/10 text-amber-500" },
  { icon: Calendar, label: "Schedule", value: "Live", delay: "-21s", speed: "28s", radius: 130, color: "bg-violet-500/10 text-violet-500" },
  { icon: ClipboardCheck, label: "Attendance", value: "98%", delay: "0s", speed: "36s", radius: 200, color: "bg-emerald-500/10 text-emerald-500" },
  { icon: BarChart3, label: "Analytics", value: "Real-time", delay: "-9s", speed: "36s", radius: 200, color: "bg-primary/10 text-primary" },
  { icon: IndianRupee, label: "Fees", value: "Tracked", delay: "-18s", speed: "36s", radius: 200, color: "bg-amber-500/10 text-amber-500" },
  { icon: FileText, label: "Exams", value: "Auto GPA", delay: "-27s", speed: "36s", radius: 200, color: "bg-rose-500/10 text-rose-500" },
]

/* ================================================================== */
/*  HOOKS                                                              */
/* ================================================================== */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in-view") }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    )
    el.querySelectorAll(".animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale")
      .forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])
  return ref
}

/* ================================================================== */
/*  COMPONENTS                                                         */
/* ================================================================== */

function AnimatedStat({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  const [display, setDisplay] = useState("0")
  const ref = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const numericPart = value.replace(/[^0-9.]/g, "")
          const suffix = value.replace(/[0-9.]/g, "")
          const target = parseFloat(numericPart)
          const duration = 1200
          const start = performance.now()
          const step = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = target * eased
            setDisplay((target % 1 === 0 ? Math.round(current).toString() : current.toFixed(1)) + suffix)
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="flex flex-col items-center gap-1.5 py-8">
      <Icon className="mb-1 h-4 w-4 text-primary/60" />
      <span className="text-3xl font-bold tracking-tight text-foreground tabular-nums">{display}</span>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  )
}

/* Floating node network visualization */
function NodeNetwork() {
  const [hovered, setHovered] = useState<number | null>(null)
  return (
    <div className="relative mx-auto h-[420px] w-[420px]" aria-hidden="true">
      {/* Orbit rings */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 420 420">
        <circle cx="210" cy="210" r="130" fill="none" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="6 4" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" from="0 210 210" to="360 210 210" dur="90s" repeatCount="indefinite" />
        </circle>
        <circle cx="210" cy="210" r="200" fill="none" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="6 4" opacity="0.3">
          <animateTransform attributeName="transform" type="rotate" from="360 210 210" to="0 210 210" dur="120s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Center hub */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25" style={{ animation: "node-pulse 3s ease-in-out infinite" }}>
          <GraduationCap className="h-7 w-7 text-primary-foreground" />
        </div>
      </div>

      {/* Orbiting nodes */}
      {orbitNodes.map((node, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 -ml-[26px] -mt-[26px]"
          style={{
            ["--orbit-r" as string]: `${node.radius}px`,
            animation: `${i < 4 ? "orbit" : "orbit-reverse"} ${node.speed} linear infinite`,
            animationDelay: node.delay,
          }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className={`flex h-[52px] items-center gap-2 rounded-xl border border-border bg-card px-3 shadow-md transition-all duration-300 ${hovered === i ? "scale-110 border-primary/40 shadow-lg shadow-primary/10" : ""}`}>
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${node.color}`}>
              <node.icon className="h-4 w-4" />
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${hovered === i ? "w-[70px] opacity-100" : "w-0 opacity-0"}`}>
              <p className="whitespace-nowrap text-[10px] font-semibold text-foreground">{node.label}</p>
              <p className="whitespace-nowrap text-[9px] text-muted-foreground">{node.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* Interactive attendance toggles for the phone mockup */
function InteractiveAttendance() {
  const [attendance, setAttendance] = useState([
    { name: "Aarav Sharma", present: true },
    { name: "Priya Patel", present: true },
    { name: "Rahul Kumar", present: false },
    { name: "Meera Reddy", present: true },
  ])
  const [submitted, setSubmitted] = useState(false)
  const [count, setCount] = useState(0)

  const toggle = (idx: number) => {
    if (submitted) return
    setAttendance((prev) => prev.map((s, i) => i === idx ? { ...s, present: !s.present } : s))
  }

  const presentCount = attendance.filter((s) => s.present).length

  return (
    <div className="p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[11px] text-muted-foreground">Today</p>
          <p className="text-sm font-semibold text-foreground">Mark Attendance</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <ClipboardCheck className="h-4 w-4 text-primary" />
        </div>
      </div>

      <div className="mb-4 rounded-xl bg-muted/50 p-3.5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Subject</p>
        <p className="mt-1 text-sm font-semibold text-foreground">Data Structures</p>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-[11px] text-muted-foreground">{"CS-301 \u00B7 Semester 3"}</p>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary tabular-nums">{presentCount}/{attendance.length}</span>
        </div>
      </div>

      {attendance.map((student, i) => (
        <button
          key={student.name}
          onClick={() => toggle(i)}
          className="flex w-full items-center justify-between border-b border-border/40 py-3 last:border-0 transition-colors hover:bg-muted/30"
        >
          <div className="flex items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold transition-colors ${student.present ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-foreground"}`}>
              {student.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <span className="text-xs font-medium text-foreground">{student.name}</span>
          </div>
          <div className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${student.present ? "bg-emerald-500" : "bg-muted"}`}>
            <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow-sm transition-all duration-200 ${student.present ? "right-0.5" : "left-0.5"}`} />
          </div>
        </button>
      ))}

      <button
        onClick={() => { setSubmitted(true); setCount(presentCount) }}
        disabled={submitted}
        className={`mt-5 w-full rounded-xl py-3 text-xs font-semibold shadow-md transition-all ${submitted ? "bg-emerald-500 text-emerald-50 shadow-emerald-500/20" : "bg-primary text-primary-foreground shadow-primary/20 hover:brightness-110 active:scale-[0.98]"}`}
      >
        {submitted ? `Submitted - ${count}/${attendance.length} Present` : "Submit Attendance"}
      </button>
      {submitted && (
        <button onClick={() => setSubmitted(false)} className="mt-2 w-full text-center text-[11px] text-muted-foreground hover:text-foreground transition-colors">
          Reset demo
        </button>
      )}
    </div>
  )
}

/* ================================================================== */
/*  MAIN PAGE                                                          */
/* ================================================================== */

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [demoPickerOpen, setDemoPickerOpen] = useState(false)
  const [easterClicks, setEasterClicks] = useState(0)
  const [easterUnlocked, setEasterUnlocked] = useState(false)
  const [logoWiggle, setLogoWiggle] = useState(false)
  const scrollRef = useScrollReveal()
  const { startDemo } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const handleStartDemo = (role: Role) => {
    startDemo(role)
    setDemoPickerOpen(false)
    router.push("/dashboard")
  }

  // Easter egg: click logo 7 times to unlock
  const handleLogoClick = () => {
    const next = easterClicks + 1
    setEasterClicks(next)
    setLogoWiggle(true)
    setTimeout(() => setLogoWiggle(false), 400)
    if (next >= 7 && !easterUnlocked) {
      setEasterUnlocked(true)
    }
  }

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#roles", label: "Roles" },
    { href: "#mobile", label: "Mobile" },
    ...(easterUnlocked ? [{ href: "#labs", label: "Labs" }] : []),
  ]

  return (
    <div ref={scrollRef} className="min-h-screen bg-background">
      {/* ========== NAVBAR ========== */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-border/40 bg-background/70 shadow-sm backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-6">
          {/* Logo - clickable for easter egg */}
          <button onClick={handleLogoClick} className={`group flex items-center gap-2.5 ${logoWiggle ? "easter-wiggle" : ""}`}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary transition-transform duration-300 group-hover:scale-105">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-base font-bold tracking-tight text-foreground">CampusFlow</span>
            {easterUnlocked && (
              <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                <Sparkles className="h-2.5 w-2.5" />
                Labs
              </span>
            )}
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-md px-3 py-1.5 text-sm transition-colors hover:text-foreground ${
                  link.label === "Labs" ? "text-amber-500 hover:text-amber-400" : "text-muted-foreground"
                }`}
              >
                {link.label === "Labs" && <Sparkles className="mr-1 inline h-3 w-3" />}
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA - single login button */}
          <div className="hidden md:flex">
            <Link
              href="/login"
              className="group flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 hover:brightness-110"
            >
              Login
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-accent md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* ========== MOBILE SIDEBAR ========== */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />

          {/* Sidebar panel */}
          <aside className="sidebar-enter relative z-10 flex h-full w-72 flex-col border-r border-border bg-card shadow-2xl">
            {/* Header */}
            <div className="flex h-16 items-center justify-between border-b border-border px-5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <GraduationCap className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-base font-bold text-foreground">CampusFlow</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-3 py-4">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent ${
                      link.label === "Labs" ? "text-amber-500" : "text-foreground"
                    }`}
                  >
                    {link.label === "Labs" && <Sparkles className="h-4 w-4" />}
                    {link.label !== "Labs" && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>

            {/* Bottom CTA */}
            <div className="border-t border-border p-4">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground shadow-md shadow-primary/20"
              >
                Login
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-glow-pulse h-[500px] w-[500px] rounded-full bg-primary/[0.07] blur-[100px]" />
        </div>
        <div
          className="animate-grid-fade pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--border) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.3) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-36 lg:px-6 lg:pt-44">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: text */}
            <div>
              <div className="hero-animate-1 mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-1.5 shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-medium text-muted-foreground">Now live in production</span>
              </div>

              <h1 className="hero-animate-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1] text-balance">
                The modern platform{" "}
                <span className="text-primary">to run your college</span>
              </h1>

              <p className="hero-animate-3 mt-6 max-w-lg text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
                Streamline academics, attendance, examinations, and fees in one
                unified platform built for every stakeholder.
              </p>

              <div className="hero-animate-4 mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/login"
                  className="group flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:brightness-110"
                >
                  Start using CampusFlow
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="#features"
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card/50 px-6 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-accent"
                >
                  Explore features
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                </a>
              </div>
            </div>

            {/* Right: interactive node network */}
            <div className="hero-animate-5 hidden lg:flex lg:justify-center">
              <NodeNetwork />
            </div>
          </div>

          {/* Stats */}
          <div className="hero-animate-5 mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border/50 shadow-sm sm:grid-cols-4 lg:mt-12">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card">
                <AnimatedStat {...stat} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== DASHBOARD PREVIEW IMAGE ========== */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-20 lg:px-6">
          <div className="animate-on-scroll-scale relative overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/10">
            <Image
              src="/images/dashboard-preview.jpg"
              alt="CampusFlow dashboard showing analytics, student data, and attendance charts"
              width={1200}
              height={675}
              className="w-full"
              priority
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
          </div>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section id="features" className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-28 lg:px-6">
          <div className="animate-on-scroll mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Modules</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Everything your institution needs
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              A comprehensive suite of modules designed for modern educational institutions, all working together seamlessly.
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="animate-on-scroll group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ROLES with campus image ========== */}
      <section id="roles" className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-28 lg:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Image */}
            <div className="animate-on-scroll-left relative overflow-hidden rounded-2xl">
              <Image
                src="/images/classroom.jpg"
                alt="Students in a modern university classroom"
                width={600}
                height={400}
                className="w-full rounded-2xl object-cover"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/10" />
            </div>

            {/* Content */}
            <div className="animate-on-scroll-right">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Role-based access</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                Built for every stakeholder
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Each user gets a personalized dashboard with role-specific features, controls, and insights.
              </p>
              <div className="mt-8 flex flex-col gap-4">
                {roles.map((role) => (
                  <div key={role.title} className="group flex gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${role.bg} ${role.color} transition-transform group-hover:scale-110`}>
                      <role.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{role.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{role.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== MOBILE - Interactive attendance ========== */}
      <section id="mobile" className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-28 lg:px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="animate-on-scroll-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Smartphone className="h-3 w-3" />
                Mobile ready
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                Mark attendance from anywhere
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
                Teachers can mark attendance directly from their phone. Try it out -- the phone mockup is fully interactive!
              </p>
              <ul className="mt-8 flex flex-col gap-4">
                {["Toggle students on/off to mark attendance", "Subject-wise quick selection", "Real-time sync with dashboard", "Works on any device"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className="group mt-10 inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 hover:brightness-110"
              >
                Try it now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Interactive phone mockup */}
            <div className="animate-on-scroll-right flex justify-center">
              <div className="relative w-[280px]">
                <div className="pointer-events-none absolute -inset-8 rounded-full bg-primary/[0.06] blur-3xl" />
                <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-2xl shadow-black/10">
                  <div className="flex items-center justify-center bg-muted/50 py-3">
                    <div className="h-5 w-28 rounded-full bg-foreground/10" />
                  </div>
                  <InteractiveAttendance />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== EASTER EGG: LABS SECTION ========== */}
      {easterUnlocked && (
        <section id="labs" className="border-t border-amber-500/20 bg-amber-500/[0.03]">
          <div className="mx-auto max-w-6xl px-4 py-28 lg:px-6">
            <div className="animate-on-scroll mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                <FlaskConical className="h-3 w-3" />
                Secret Labs
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                You found the secret section!
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                These experimental features are coming soon to CampusFlow. You discovered them by clicking the logo 7 times.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Sparkles, label: "AI Grading", desc: "Automated essay scoring and feedback generation powered by AI.", status: "In Research" },
                { icon: Lock, label: "Blockchain Certs", desc: "Tamper-proof digital certificates issued on a blockchain ledger.", status: "Prototype" },
                { icon: Zap, label: "Real-time Collab", desc: "Live collaborative document editing for group assignments.", status: "Alpha" },
              ].map((lab) => (
                <div key={lab.label} className="group rounded-xl border border-amber-500/20 bg-card p-5 transition-all hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/5">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 transition-transform group-hover:scale-110">
                      <lab.icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">{lab.status}</span>
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-foreground">{lab.label}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{lab.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========== CTA ========== */}
      <section className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-28 lg:px-6">
          <div className="animate-on-scroll-scale relative overflow-hidden rounded-3xl border border-border bg-card">
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/[0.08] blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-primary/[0.05] blur-[80px]" />

            <div className="relative grid items-center gap-8 px-6 py-16 sm:px-16 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                  Ready to modernize your institution?
                </h2>
                <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
                  Get started with CampusFlow today. Free to explore, built to scale with your growing institution.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/login"
                    className="group flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:brightness-110"
                  >
                    Get Started Free
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href="#features"
                    className="flex h-11 items-center justify-center rounded-xl border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    Learn more
                  </a>
                </div>
              </div>

              {/* Campus image in CTA */}
              <div className="hidden overflow-hidden rounded-2xl lg:block">
                <Image
                  src="/images/campus-hero.jpg"
                  alt="Modern university campus"
                  width={500}
                  height={300}
                  className="h-64 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold text-foreground">CampusFlow</span>
            </div>
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                  {link.label === "Labs" && <Sparkles className="mr-1 inline h-2.5 w-2.5" />}
                  {link.label}
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">{"Built with Next.js, TypeScript & Tailwind"}</p>
          </div>
        </div>
      </footer>

      {/* ========== DEMO ROLE PICKER MODAL ========== */}
      {demoPickerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDemoPickerOpen(false)} />
          <div className="relative w-full max-w-lg animate-in fade-in zoom-in-95 duration-200 rounded-2xl border border-border bg-card shadow-2xl">
            <button
              onClick={() => setDemoPickerOpen(false)}
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
                  <h3 className="text-lg font-semibold text-foreground">Try Demo Mode</h3>
                  <p className="text-sm text-muted-foreground">Explore every feature with view-only sample data</p>
                </div>
              </div>
            </div>
            <div className="p-6 pt-4">
              <p className="mb-4 text-xs font-medium text-muted-foreground">Select a role to explore</p>
              <div className="flex flex-col gap-3">
                {demoRoles.map((dr) => (
                  <button
                    key={dr.role}
                    onClick={() => handleStartDemo(dr.role)}
                    className="group flex items-start gap-4 rounded-xl border border-border bg-background p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${dr.bg} ${dr.color} transition-transform duration-200 group-hover:scale-110`}>
                      <dr.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">{dr.label}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{dr.description}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-5 flex items-start gap-2 rounded-lg bg-muted/50 p-3">
                <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-2.5 w-2.5 text-primary" />
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Demo mode uses sample data only. No real data is affected and all actions are simulated.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
