"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth, type Role } from "@/app/providers"
import { AppSidebar } from "@/components/app-sidebar"
import { CommandPalette } from "@/components/command-palette"
import { Menu, X, Eye, ArrowRight, Shield, BookOpen, GraduationCap, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isDemo, startDemo, exitDemo } = useAuth()
  const router = useRouter()
  const [commandOpen, setCommandOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [ready, setReady] = useState(false)

  // Give auth state one render cycle to propagate before checking
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (ready && !isAuthenticated) {
      router.push("/login")
    }
  }, [ready, isAuthenticated, router])

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  const demoSwitchRoles: { role: Role; icon: React.ElementType; label: string }[] = [
    { role: "admin", icon: Shield, label: "Admin" },
    { role: "teacher", icon: BookOpen, label: "Teacher" },
    { role: "student", icon: GraduationCap, label: "Student" },
  ]

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Demo banner */}
      {isDemo && (
        <div className="relative z-50 flex items-center justify-between border-b border-amber-500/20 bg-amber-500/10 px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full bg-amber-500/20 px-2.5 py-1">
              <Eye className="h-3 w-3 text-amber-600 dark:text-amber-400" />
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">DEMO MODE</span>
            </div>
            <span className="hidden text-xs text-amber-700/80 dark:text-amber-300/80 sm:block">
              View-only with sample data. No changes are saved.
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Role switcher chips */}
            <div className="hidden items-center gap-1 sm:flex">
              {demoSwitchRoles.map((dr) => (
                <button
                  key={dr.role}
                  onClick={() => startDemo(dr.role)}
                  className={cn(
                    "flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-all",
                    user.role === dr.role
                      ? "bg-amber-600 text-amber-50 shadow-sm dark:bg-amber-500"
                      : "text-amber-700 hover:bg-amber-500/20 dark:text-amber-300"
                  )}
                >
                  <dr.icon className="h-3 w-3" />
                  {dr.label}
                </button>
              ))}
            </div>
            <div className="mx-1 hidden h-4 w-px bg-amber-500/30 sm:block" />
            <button
              onClick={() => { exitDemo(); router.push("/") }}
              className="flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-500/20 dark:text-amber-300"
            >
              <LogOut className="h-3 w-3" />
              <span className="hidden sm:inline">Exit Demo</span>
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <AppSidebar onCommandOpen={() => setCommandOpen(true)} />
        </div>

        {/* Mobile sidebar overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
            <div className="relative z-10 h-full w-64">
              <AppSidebar onCommandOpen={() => { setCommandOpen(true); setMobileOpen(false) }} />
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Mobile header */}
          <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4 lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                <span className="text-xs font-bold text-primary-foreground">CF</span>
              </div>
              <span className="text-sm font-semibold text-foreground">CampusFlow</span>
            </div>
            <div className="w-8" />
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  )
}
