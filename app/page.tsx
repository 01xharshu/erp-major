"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
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
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Demo role picker data                                              */
/* ------------------------------------------------------------------ */

const demoRoles: { role: Role; icon: React.ElementType; label: string; description: string; color: string; bg: string }[] = [
  { role: "admin", icon: Shield, label: "Administrator", description: "Full system access with analytics, user management, and fee configuration.", color: "text-primary", bg: "bg-primary/10" },
  { role: "teacher", icon: BookOpen, label: "Teacher", description: "Class management, attendance marking, marks entry, and assignments.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { role: "student", icon: GraduationCap, label: "Student", description: "View grades, attendance, fees, timetable, and submit assignments.", color: "text-amber-500", bg: "bg-amber-500/10" },
]

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const features = [
  {
    icon: GraduationCap,
    title: "Student Management",
    description:
      "Complete student lifecycle from admission to graduation with academic tracking.",
    tag: "Core",
  },
  {
    icon: ClipboardCheck,
    title: "Smart Attendance",
    description:
      "Mobile-first attendance marking with real-time analytics and audit trails.",
    tag: "Mobile",
  },
  {
    icon: FileText,
    title: "Examinations & Grading",
    description:
      "End-to-end exam management with automated GPA/CGPA calculation.",
    tag: "Academic",
  },
  {
    icon: IndianRupee,
    title: "Fees & Finance",
    description:
      "Fee management with installment plans, payment tracking, and receipts.",
    tag: "Finance",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    description:
      "Data-driven insights across attendance, academics, and finance.",
    tag: "Analytics",
  },
  {
    icon: Calendar,
    title: "Timetable & Scheduling",
    description:
      "Dynamic scheduling with conflict detection and room allocation.",
    tag: "Planning",
  },
  {
    icon: Library,
    title: "Library Management",
    description:
      "Digital catalog, issue/return tracking, and overdue notifications.",
    tag: "Resources",
  },
  {
    icon: Megaphone,
    title: "Announcements",
    description:
      "Broadcast notices to the entire institution or targeted groups instantly.",
    tag: "Communication",
  },
]

const roles = [
  {
    icon: Shield,
    title: "Administrator",
    description:
      "Full system oversight with analytics dashboards, user management, fee configuration, and institutional controls.",
    items: [
      "System-wide analytics",
      "User & role management",
      "Fee configuration",
      "Academic oversight",
    ],
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: BookOpen,
    title: "Teacher",
    description:
      "Class management, mobile attendance, marks entry, assignment creation, and student performance tracking.",
    items: [
      "Mobile attendance",
      "Marks & grade entry",
      "Assignment management",
      "Class schedules",
    ],
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: GraduationCap,
    title: "Student",
    description:
      "Personal dashboard with grades, attendance records, fee status, assignments, and result downloads.",
    items: [
      "Academic results",
      "Attendance tracking",
      "Fee payments",
      "Assignment submissions",
    ],
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
]

const stats = [
  { value: "900+", label: "Students", icon: Users },
  { value: "69", label: "Faculty", icon: BookOpen },
  { value: "5", label: "Departments", icon: Building2 },
  { value: "99.9%", label: "Uptime", icon: Zap },
]

/* ------------------------------------------------------------------ */
/*  Intersection Observer hook                                         */
/* ------------------------------------------------------------------ */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view")
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    )

    const targets = el.querySelectorAll(
      ".animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale"
    )
    targets.forEach((t) => observer.observe(t))

    return () => observer.disconnect()
  }, [])

  return ref
}

/* ------------------------------------------------------------------ */
/*  Counter animation                                                  */
/* ------------------------------------------------------------------ */

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

            if (target % 1 === 0) {
              setDisplay(Math.round(current).toString() + suffix)
            } else {
              setDisplay(current.toFixed(1) + suffix)
            }

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
      <span className="text-3xl font-bold tracking-tight text-foreground tabular-nums">
        {display}
      </span>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Landing Page                                                       */
/* ------------------------------------------------------------------ */

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [demoPickerOpen, setDemoPickerOpen] = useState(false)
  const scrollRef = useScrollReveal()
  const { startDemo } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleStartDemo = (role: Role) => {
    startDemo(role)
    setDemoPickerOpen(false)
    router.push("/dashboard")
  }

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
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary transition-transform duration-300 group-hover:scale-105">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-base font-bold tracking-tight text-foreground">
              CampusFlow
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {["Features", "Roles", "Mobile"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="relative rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={() => setDemoPickerOpen(true)}
              className="group flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card/50 px-3.5 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-accent"
            >
              <Play className="h-3.5 w-3.5 text-primary" />
              Try Demo
            </button>
            <Link
              href="/login"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="group flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 hover:brightness-110"
            >
              Get Started
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-accent md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-border/40 bg-background/95 backdrop-blur-2xl md:hidden">
            <div className="flex flex-col gap-1 px-4 py-3">
              {["Features", "Roles", "Mobile"].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {label}
                </a>
              ))}
              <div className="my-2 h-px bg-border/50" />
              <button
                onClick={() => { setMobileOpen(false); setDemoPickerOpen(true) }}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                <Play className="h-3.5 w-3.5 text-primary" />
                Try Demo
              </button>
              <Link
                href="/login"
                className="rounded-md px-3 py-2.5 text-sm text-muted-foreground"
              >
                Sign in
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
              >
                Get Started
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden">
        {/* Animated background glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-glow-pulse h-[500px] w-[500px] rounded-full bg-primary/[0.07] blur-[100px]" />
        </div>

        {/* Subtle grid pattern */}
        <div
          className="animate-grid-fade pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--border) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.3) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-36 lg:px-6 lg:pt-44">
          <div className="mx-auto max-w-3xl text-center">
            {/* Pill badge */}
            <div className="hero-animate-1 mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-1.5 shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                Now live in production
              </span>
            </div>

            {/* Heading */}
            <h1 className="hero-animate-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.08] text-balance">
              The modern platform{" "}
              <span className="text-primary">to run your college</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-animate-3 mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              Streamline academics, attendance, examinations, and fees in one
              unified platform built for every stakeholder.
            </p>

            {/* CTA Buttons */}
            <div className="hero-animate-4 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/login"
                className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:brightness-110 sm:w-auto"
              >
                Start using CampusFlow
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <button
                onClick={() => setDemoPickerOpen(true)}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-card/50 px-6 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-accent sm:w-auto"
              >
                <Play className="h-4 w-4 text-primary" />
                Try Demo
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="hero-animate-5 mx-auto mt-24 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border/50 shadow-sm sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card">
                <AnimatedStat {...stat} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section id="features" className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-28 lg:px-6">
          <div className="animate-on-scroll mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Modules
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Everything your institution needs
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              A comprehensive suite of modules designed for modern educational
              institutions, all working together seamlessly.
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
                <h3 className="mt-4 text-sm font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ROLES ========== */}
      <section id="roles" className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-28 lg:px-6">
          <div className="animate-on-scroll mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Role-based access
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Built for every stakeholder
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Each user gets a personalized dashboard with role-specific
              features, controls, and insights.
            </p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {roles.map((role, i) => (
              <div
                key={role.title}
                className="animate-on-scroll group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="p-6 pb-2">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${role.bg} ${role.color} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <role.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {role.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {role.description}
                  </p>
                </div>
                <div className="border-t border-border/60 bg-muted/30 p-6">
                  <ul className="flex flex-col gap-3">
                    {role.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 text-sm text-foreground"
                      >
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-full ${role.bg}`}
                        >
                          <Check className={`h-3 w-3 ${role.color}`} />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MOBILE ========== */}
      <section id="mobile" className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-28 lg:px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left content */}
            <div className="animate-on-scroll-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Smartphone className="h-3 w-3" />
                Mobile ready
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                Mark attendance from anywhere
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
                Teachers can mark attendance directly from their phone with our
                responsive interface. Quick subject selection, bulk marking, and
                instant sync.
              </p>
              <ul className="mt-8 flex flex-col gap-4">
                {[
                  "One-tap attendance marking",
                  "Subject-wise quick selection",
                  "Real-time sync with dashboard",
                  "Works on any device",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-foreground"
                  >
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

            {/* Phone mockup */}
            <div className="animate-on-scroll-right flex justify-center">
              <div className="animate-float relative w-[280px]">
                {/* Phone glow */}
                <div className="pointer-events-none absolute -inset-8 rounded-full bg-primary/[0.06] blur-3xl" />

                <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-2xl shadow-black/10">
                  {/* Notch */}
                  <div className="flex items-center justify-center bg-muted/50 py-3">
                    <div className="h-5 w-28 rounded-full bg-foreground/10" />
                  </div>

                  {/* Screen */}
                  <div className="p-5">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-muted-foreground">
                          Today
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          Mark Attendance
                        </p>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                        <ClipboardCheck className="h-4 w-4 text-primary" />
                      </div>
                    </div>

                    <div className="mb-4 rounded-xl bg-muted/50 p-3.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Subject
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        Data Structures
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {"CS-301 \u00B7 Semester 3"}
                      </p>
                    </div>

                    {[
                      { name: "Aarav Sharma", present: true },
                      { name: "Priya Patel", present: true },
                      { name: "Rahul Kumar", present: false },
                    ].map((student) => (
                      <div
                        key={student.name}
                        className="flex items-center justify-between border-b border-border/40 py-3 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-[11px] font-bold text-foreground">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span className="text-xs font-medium text-foreground">
                            {student.name}
                          </span>
                        </div>
                        <div
                          className={`h-6 w-11 rounded-full transition-colors ${
                            student.present ? "bg-emerald-500" : "bg-muted"
                          } relative`}
                        >
                          <div
                            className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow-sm transition-transform ${
                              student.present ? "right-0.5" : "left-0.5"
                            }`}
                          />
                        </div>
                      </div>
                    ))}

                    <button className="mt-5 w-full rounded-xl bg-primary py-3 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/20">
                      Submit Attendance
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-28 lg:px-6">
          <div className="animate-on-scroll-scale relative overflow-hidden rounded-3xl border border-border bg-card">
            {/* Decorative glows */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/[0.08] blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-primary/[0.05] blur-[80px]" />

            <div className="relative px-6 py-20 text-center sm:px-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                Ready to modernize your institution?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-muted-foreground leading-relaxed">
                Get started with CampusFlow today. Free to explore, built to
                scale with your growing institution.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/login"
                  className="group flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:brightness-110"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="#features"
                  className="flex h-11 items-center rounded-xl border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  Learn more
                </a>
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
              <span className="text-sm font-semibold text-foreground">
                CampusFlow
              </span>
            </div>
            <div className="flex items-center gap-6">
              {["Features", "Roles", "Mobile"].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {"Built with Next.js, TypeScript & Tailwind"}
            </p>
          </div>
        </div>
      </footer>

      {/* ========== DEMO ROLE PICKER MODAL ========== */}
      {demoPickerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDemoPickerOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-lg animate-in fade-in zoom-in-95 duration-200 rounded-2xl border border-border bg-card shadow-2xl">
            {/* Close button */}
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
                  <h3 className="text-lg font-semibold text-foreground">
                    Try Demo Mode
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Explore every feature with view-only sample data
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 pt-4">
              <p className="mb-4 text-xs font-medium text-muted-foreground">
                Select a role to explore
              </p>
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
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {dr.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-5 flex items-start gap-2 rounded-lg bg-muted/50 p-3">
                <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-2.5 w-2.5 text-primary" />
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Demo mode uses sample data only. No real data is affected and all actions are simulated. You can switch roles or exit at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
