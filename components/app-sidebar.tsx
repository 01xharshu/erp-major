"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/app/providers"
import { navigationConfig } from "@/lib/navigation"
import { cn, getInitials } from "@/lib/utils"
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Building2,
  BookOpen,
  ClipboardCheck,
  FileText,
  IndianRupee,
  FileEdit,
  Calendar,
  Library,
  Megaphone,
  CalendarOff,
  BarChart3,
  LogOut,
  Moon,
  Sun,
  ChevronLeft,
  Search,
  type LucideIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  GraduationCap,
  Users,
  Building2,
  BookOpen,
  ClipboardCheck,
  FileText,
  IndianRupee,
  FileEdit,
  Calendar,
  Library,
  Megaphone,
  CalendarOff,
  BarChart3,
}

export function AppSidebar({ onCommandOpen }: { onCommandOpen?: () => void }) {
  const { user, logout, isDemo } = useAuth()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [collapsed, setCollapsed] = useState(false)

  if (!user) return null

  const navItems = navigationConfig[user.role]

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-border bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <span className="text-xs font-bold text-primary-foreground">CF</span>
            </div>
            <span className="text-sm font-semibold text-foreground">CampusFlow</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-3 py-2">
          <button
            onClick={onCommandOpen}
            className="flex w-full items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground hover:border-ring"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search...</span>
            <kbd className="ml-auto flex h-5 items-center rounded border border-border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
              {"K"}
            </kbd>
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <div className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard
            const isActive = item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  collapsed && "justify-center px-2"
                )}
                title={collapsed ? item.title : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.title}</span>}
                {!collapsed && item.badge && (
                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-medium text-primary-foreground">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-3">
        <div className={cn("flex items-center gap-2", collapsed && "flex-col")}>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
            title="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
          {!collapsed && (
            <div className="flex flex-1 items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {getInitials(user.name)}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-xs font-medium text-foreground">{user.name}</p>
                <p className="flex items-center gap-1 truncate text-[10px] text-muted-foreground capitalize">
                  {user.role}
                  {isDemo && (
                    <span className="rounded bg-amber-500/20 px-1 py-px text-[9px] font-semibold uppercase text-amber-600 dark:text-amber-400">demo</span>
                  )}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={logout}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
