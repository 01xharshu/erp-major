"use client"

import { useAuth } from "@/lib/auth-context"
import { AdminDashboard } from "@/features/admin/admin-dashboard"
import { TeacherDashboard } from "@/features/teacher/teacher-dashboard"
import { StudentDashboard } from "@/features/student/student-dashboard"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) return null

  switch (user.role) {
    case "admin":
      return <AdminDashboard />
    case "teacher":
      return <TeacherDashboard />
    case "student":
      return <StudentDashboard />
    default:
      return null
  }
}
