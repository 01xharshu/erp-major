"use client"

import { useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/providers"
import { navigationConfig } from "@/lib/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
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
  Moon,
  Sun,
  LogOut,
  type LucideIcon,
} from "lucide-react"
import { useTheme } from "next-themes"

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

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        onOpenChange(!open)
      }
    },
    [open, onOpenChange]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  if (!user) return null

  const navItems = navigationConfig[user.role]

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard
            return (
              <CommandItem
                key={item.href}
                onSelect={() => {
                  router.push(item.href)
                  onOpenChange(false)
                }}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => {
              setTheme(theme === "dark" ? "light" : "dark")
              onOpenChange(false)
            }}
          >
            {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
            <span>Toggle theme</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              logout()
              onOpenChange(false)
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
