"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
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
  CheckCircle2,
  Users,
  Building2,
  Zap,
} from "lucide-react"

const features = [
  {
    icon: GraduationCap,
    title: "Student Management",
    description: "Complete student lifecycle from admission to graduation with academic tracking and performance analytics.",
    tag: "Core",
  },
  {
    icon: ClipboardCheck,
    title: "Smart Attendance",
    description: "Mobile-first attendance marking with real-time analytics, audit trails, and subject-wise tracking.",
    tag: "Mobile",
  },
  {
    icon: FileText,
    title: "Examinations & Grading",
    description: "End-to-end exam management with automated GPA/CGPA calculation, result publishing, and report cards.",
    tag: "Academic",
  },
  {
    icon: IndianRupee,
    title: "Fees & Finance",
    description: "Complete fee management with installment plans, payment tracking, receipts, and financial reporting.",
    tag: "Finance",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    description: "Data-driven insights across attendance, academics, and financial performance with exportable reports.",
    tag: "Analytics",
  },
  {
    icon: Calendar,
    title: "Timetable Management",
    description: "Dynamic scheduling with conflict detection, room allocation, and faculty-wise timetable views.",
    tag: "Planning",
  },
]

const roles = [
  {
    icon: Shield,
    title: "Administrator",
    description: "Full system oversight with analytics dashboards, user management, fee configuration, and institutional controls.",
    items: ["System analytics", "User management", "Fee configuration", "Academic oversight"],
    accent: "from-primary/20 to-primary/5",
  },
  {
    icon: BookOpen,
    title: "Teacher",
    description: "Class management, mobile attendance, marks entry, assignment creation, and student performance tracking.",
    items: ["Mobile attendance", "Marks entry", "Assignment management", "Class schedules"],
    accent: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    icon: GraduationCap,
    title: "Student",
    description: "Personal dashboard with grades, attendance records, fee status, assignments, and result downloads.",
    items: ["Academic results", "Attendance tracking", "Fee payments", "Assignment submissions"],
    accent: "from-amber-500/20 to-amber-500/5",
  },
]

const stats = [
  { value: "900+", label: "Students managed", icon: Users },
  { value: "69", label: "Faculty members", icon: BookOpen },
  { value: "5", label: "Departments", icon: Building2 },
  { value: "99.9%", label: "Uptime", icon: Zap },
]

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border/50 bg-background/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
              <GraduationCap className="h-4 w-4 text-background" />
            </div>
            <span className="text-base font-semibold tracking-tight text-foreground">CampusFlow</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {[
              { href: "#features", label: "Features" },
              { href: "#roles", label: "Roles" },
              { href: "#mobile", label: "Mobile" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="flex h-8 items-center rounded-lg bg-foreground px-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-1 px-4 py-3">
              {["Features", "Roles", "Mobile"].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </a>
              ))}
              <div className="my-2 h-px bg-border/50" />
              <Link href="/login" className="rounded-md px-3 py-2 text-sm text-muted-foreground">
                Sign in
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[600px] w-[600px] rounded-full bg-primary/[0.07] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-36 lg:px-6 lg:pt-44">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/50 px-3 py-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-muted-foreground">Now in production</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1] text-balance">
              The complete platform to run your college
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
              Streamline academics, attendance, examinations, fees, and analytics
              in one unified platform. Built for administrators, teachers, and students.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/login"
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90 sm:w-auto"
              >
                Start using CampusFlow
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href="#features"
                className="flex h-10 w-full items-center justify-center rounded-lg border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:w-auto"
              >
                Explore features
              </a>
            </div>
          </div>

          {/* Stats row */}
          <div className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 bg-card px-6 py-6">
                <stat.icon className="mb-2 h-4 w-4 text-muted-foreground/60" />
                <span className="text-2xl font-bold tracking-tight text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-24 lg:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-primary">Modules</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground text-balance">
              Everything you need to manage your institution
            </h2>
            <p className="mt-3 text-muted-foreground">
              A comprehensive suite of modules designed for modern educational institutions.
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative rounded-xl border border-border bg-card p-6 transition-all hover:border-border/80 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <feature.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-24 lg:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-primary">Role-based access</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground text-balance">
              Tailored for every role
            </h2>
            <p className="mt-3 text-muted-foreground">
              Each user gets a personalized dashboard with role-specific features and controls.
            </p>
          </div>

          <div className="mt-16 grid gap-4 lg:grid-cols-3">
            {roles.map((role) => (
              <div
                key={role.title}
                className="relative overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${role.accent} pointer-events-none`} />
                <div className="relative p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <role.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{role.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{role.description}</p>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {role.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
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

      {/* Mobile */}
      <section id="mobile" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-24 lg:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1">
                <Smartphone className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Mobile ready</span>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground text-balance">
                Mark attendance on the go
              </h2>
              <p className="mt-3 max-w-md text-muted-foreground leading-relaxed">
                Teachers can mark attendance directly from their phone with our responsive
                interface. Quick subject selection, bulk marking, and instant sync.
              </p>
              <ul className="mt-8 flex flex-col gap-3">
                {[
                  "One-tap attendance marking",
                  "Subject-wise quick selection",
                  "Real-time sync with dashboard",
                  "Works on any device",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className="mt-8 inline-flex h-9 items-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Try it now
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Phone mockup */}
            <div className="flex justify-center">
              <div className="relative w-[280px]">
                <div className="overflow-hidden rounded-[2rem] border-2 border-foreground/10 bg-card shadow-2xl shadow-black/10">
                  {/* Phone notch */}
                  <div className="flex items-center justify-center bg-foreground/5 py-2">
                    <div className="h-5 w-24 rounded-full bg-foreground/10" />
                  </div>
                  {/* Phone screen */}
                  <div className="p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Today</p>
                        <p className="text-sm font-semibold text-foreground">Mark Attendance</p>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <ClipboardCheck className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div className="mb-3 rounded-lg bg-muted p-3">
                      <p className="text-[11px] font-medium text-muted-foreground">Subject</p>
                      <p className="mt-0.5 text-xs font-semibold text-foreground">Data Structures</p>
                      <p className="text-[11px] text-muted-foreground">CS-301 &middot; Sem 3</p>
                    </div>
                    {["Aarav Sharma", "Priya Patel", "Rahul Kumar"].map((name, i) => (
                      <div key={name} className="flex items-center justify-between border-b border-border/50 py-2.5 last:border-0">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-foreground">
                            {name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <span className="text-xs text-foreground">{name}</span>
                        </div>
                        <div className={`h-5 w-10 rounded-full ${i < 2 ? "bg-emerald-500" : "bg-muted"} relative transition-colors`}>
                          <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-card shadow-sm transition-transform ${i < 2 ? "right-0.5" : "left-0.5"}`} />
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 rounded-lg bg-foreground py-2.5 text-center text-xs font-medium text-background">
                      Submit Attendance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-24 lg:px-6">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-transparent" />
            <div className="relative px-6 py-16 text-center sm:px-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance">
                Ready to modernize your institution?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Get started with CampusFlow today. Free to try, built to scale.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/login"
                  className="flex h-10 items-center gap-2 rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  Get Started
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href="#features"
                  className="flex h-10 items-center rounded-lg border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="flex flex-col items-center justify-between gap-6 py-8 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground">
                <GraduationCap className="h-3.5 w-3.5 text-background" />
              </div>
              <span className="text-sm font-medium text-foreground">CampusFlow</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#features" className="text-xs text-muted-foreground transition-colors hover:text-foreground">Features</a>
              <a href="#roles" className="text-xs text-muted-foreground transition-colors hover:text-foreground">Roles</a>
              <a href="#mobile" className="text-xs text-muted-foreground transition-colors hover:text-foreground">Mobile</a>
            </div>
            <p className="text-xs text-muted-foreground">
              Built with Next.js, TypeScript & Tailwind
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
