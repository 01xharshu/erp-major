"use client"

import { PageHeader } from "@/components/page-header"
import { useAuth } from "@/lib/auth-context"
import { getInitials } from "@/lib/utils"
import { User, Mail, Phone, Building2, Shield, Bell, Palette } from "lucide-react"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()

  if (!user) return null

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences."
      />

      {/* Profile Card */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-sm font-semibold text-foreground">Profile Information</h3>
        <p className="text-xs text-muted-foreground">Your personal details and role information.</p>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
            {getInitials(user.name)}
          </div>
          <div className="flex-1 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <User className="h-3.5 w-3.5" />
                  Full Name
                </label>
                <p className="mt-1 text-sm font-medium text-foreground">{user.name}</p>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </label>
                <p className="mt-1 text-sm font-medium text-foreground">{user.email}</p>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Shield className="h-3.5 w-3.5" />
                  Role
                </label>
                <p className="mt-1 text-sm font-medium text-foreground capitalize">{user.role}</p>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5" />
                  Department
                </label>
                <p className="mt-1 text-sm font-medium text-foreground">{user.department || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Appearance</h3>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Customize how the application looks.</p>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => setTheme("light")}
            className={`flex-1 rounded-lg border-2 px-4 py-3 text-center text-sm font-medium transition-colors ${
              theme === "light"
                ? "border-primary bg-primary/5 text-primary"
                : "border-border text-muted-foreground hover:border-ring"
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`flex-1 rounded-lg border-2 px-4 py-3 text-center text-sm font-medium transition-colors ${
              theme === "dark"
                ? "border-primary bg-primary/5 text-primary"
                : "border-border text-muted-foreground hover:border-ring"
            }`}
          >
            Dark
          </button>
          <button
            onClick={() => setTheme("system")}
            className={`flex-1 rounded-lg border-2 px-4 py-3 text-center text-sm font-medium transition-colors ${
              theme === "system"
                ? "border-primary bg-primary/5 text-primary"
                : "border-border text-muted-foreground hover:border-ring"
            }`}
          >
            System
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Configure your notification preferences.</p>

        <div className="mt-4 space-y-3">
          {[
            { label: "Email Notifications", desc: "Receive updates via email" },
            { label: "Assignment Reminders", desc: "Get notified about upcoming deadlines" },
            { label: "Attendance Alerts", desc: "Alert when attendance drops below threshold" },
            { label: "Announcement Updates", desc: "New announcements and notices" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-md bg-muted/50 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <button className="relative h-6 w-11 rounded-full bg-primary transition-colors">
                <span className="absolute left-0.5 top-0.5 h-5 w-5 translate-x-5 rounded-full bg-primary-foreground shadow-sm transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
