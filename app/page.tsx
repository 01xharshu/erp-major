"use client"

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
} from "lucide-react"

const features = [
  {
    icon: GraduationCap,
    title: "Student Management",
    description: "Complete student lifecycle from admission to graduation with academic tracking.",
  },
  {
    icon: ClipboardCheck,
    title: "Smart Attendance",
    description: "Mobile-first attendance marking with real-time analytics and audit trails.",
  },
  {
    icon: FileText,
    title: "Examinations & Grading",
    description: "End-to-end exam management with automated GPA/CGPA calculation.",
  },
  {
    icon: IndianRupee,
    title: "Fees & Finance",
    description: "Complete fee management with installments, receipts, and financial reports.",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    description: "Data-driven insights across attendance, academics, and financial performance.",
  },
  {
    icon: Calendar,
    title: "Timetable Management",
    description: "Dynamic scheduling with conflict detection and room allocation.",
  },
]

const roles = [
  {
    icon: Shield,
    title: "Admin",
    description: "Full system oversight with analytics, user management, and configuration controls.",
  },
  {
    icon: BookOpen,
    title: "Teacher",
    description: "Class management, attendance marking, marks entry, and assignment tracking.",
  },
  {
    icon: GraduationCap,
    title: "Student",
    description: "Personal dashboard with grades, attendance, fees, and assignment submissions.",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <span className="text-sm font-bold text-primary-foreground">CF</span>
            </div>
            <span className="text-base font-semibold text-foreground">CampusFlow</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#roles" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Roles
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-24 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            Enterprise-grade College ERP
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            The modern ERP platform built for colleges
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Streamline your institution with a unified platform for academics, attendance, examinations, fees, and
            analytics. Built for administrators, teachers, and students.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/login"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
            >
              Start using CampusFlow
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#features"
              className="flex h-11 w-full items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent sm:w-auto"
            >
              Explore features
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-8">
          {[
            { value: "900+", label: "Students" },
            { value: "69", label: "Faculty" },
            { value: "5", label: "Departments" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance">
              Everything you need to manage your institution
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              A comprehensive suite of modules designed for modern educational institutions.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance">
              Tailored experiences for every role
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Each user gets a personalized dashboard and feature set based on their role.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {roles.map((role) => (
              <div key={role.title} className="rounded-lg border border-border bg-card p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <role.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{role.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{role.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile */}
      <section className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 lg:flex-row">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              <Smartphone className="h-3 w-3" />
              Mobile Ready
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground text-balance">
              Mark attendance on the go
            </h2>
            <p className="mt-3 max-w-lg text-muted-foreground leading-relaxed">
              Teachers can mark attendance directly from their mobile devices with our responsive interface. Quick
              subject selection, bulk marking, and instant sync ensure a seamless experience.
            </p>
            <ul className="mt-6 flex flex-col gap-3 text-sm text-foreground">
              {["One-tap attendance marking", "Subject-wise quick selection", "Real-time sync with dashboard", "Offline support coming soon"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex h-80 w-64 items-center justify-center rounded-2xl border border-border bg-card">
            <div className="flex flex-col items-center gap-3 text-center">
              <Smartphone className="h-12 w-12 text-muted-foreground/30" />
              <p className="text-xs text-muted-foreground">Mobile attendance preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance">
            Ready to modernize your institution?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Get started with CampusFlow today and experience the future of college management.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
                <span className="text-[10px] font-bold text-primary-foreground">CF</span>
              </div>
              <span className="text-sm text-muted-foreground">CampusFlow ERP</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Built with Next.js, TypeScript & TailwindCSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
