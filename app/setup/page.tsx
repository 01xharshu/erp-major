"use client"

import { useState } from "react"
import Link from "next/link"
import {
  GraduationCap,
  Database,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowRight,
  RefreshCw,
} from "lucide-react"

export default function SetupPage() {
  const [status, setStatus] = useState<"idle" | "testing" | "migrating" | "done" | "error">("idle")
  const [healthResult, setHealthResult] = useState<Record<string, string> | null>(null)
  const [setupResult, setSetupResult] = useState<Record<string, string> | null>(null)
  const [errorMsg, setErrorMsg] = useState("")

  const testConnection = async () => {
    setStatus("testing")
    setErrorMsg("")
    try {
      const res = await fetch("/api/health")
      const data = await res.json()
      setHealthResult(data)
      if (data.status === "connected") {
        setStatus("idle")
      } else {
        setStatus("error")
        setErrorMsg(data.message || "Connection failed")
      }
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "Network error")
    }
  }

  const runSetup = async () => {
    setStatus("migrating")
    setErrorMsg("")
    try {
      const res = await fetch("/api/setup", { method: "POST" })
      const data = await res.json()
      setSetupResult(data)
      if (data.success) {
        setStatus("done")
      } else {
        setStatus("error")
        setErrorMsg(data.error || data.message || "Setup failed")
      }
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "Network error")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <GraduationCap className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">CampusFlow Database Setup</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Connect and initialize your Aiven PostgreSQL database
          </p>
        </div>

        <div className="space-y-4">
          {/* Step 1: Test Connection */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                  1
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Test Connection</p>
                  <p className="text-xs text-muted-foreground">Verify your DATABASE_URL works</p>
                </div>
              </div>
              <button
                onClick={testConnection}
                disabled={status === "testing"}
                className="flex items-center gap-1.5 rounded-lg bg-card border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-50"
              >
                {status === "testing" ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Database className="h-3.5 w-3.5" />
                )}
                Test
              </button>
            </div>
            {healthResult && (
              <div className="mt-3 rounded-lg bg-muted/50 p-3">
                {healthResult.status === "connected" ? (
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-xs font-medium">Connected to {healthResult.database}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-destructive">
                    <XCircle className="h-4 w-4" />
                    <span className="text-xs font-medium">{healthResult.message}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Step 2: Run Migration & Seed */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                  2
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Create Tables & Seed Data</p>
                  <p className="text-xs text-muted-foreground">Set up schema and sample data</p>
                </div>
              </div>
              <button
                onClick={runSetup}
                disabled={status === "migrating" || status === "done"}
                className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {status === "migrating" ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : status === "done" ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <RefreshCw className="h-3.5 w-3.5" />
                )}
                {status === "done" ? "Done" : status === "migrating" ? "Running..." : "Initialize"}
              </button>
            </div>
            {setupResult && (
              <div className="mt-3 rounded-lg bg-muted/50 p-3">
                {setupResult.success === "true" || setupResult.success ? (
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-xs font-medium">{setupResult.message}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-destructive">
                    <XCircle className="h-4 w-4" />
                    <span className="text-xs font-medium">{setupResult.message}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Error display */}
          {status === "error" && errorMsg && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
              <div className="flex items-start gap-2">
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <div>
                  <p className="text-xs font-medium text-destructive">Error</p>
                  <p className="mt-1 text-xs text-destructive/80 break-all">{errorMsg}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success - Go to Login */}
          {status === "done" && (
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
            >
              Setup Complete - Go to Login
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          This creates 14 tables with sample data for users, students, teachers, departments, courses, attendance, exams, fees, and more.
        </p>
      </div>
    </div>
  )
}
