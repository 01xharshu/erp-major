"use client"

import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { StatusBadge } from "@/components/status-badge"
import {
  mockTimetable,
  mockAssignments,
  mockStudents,
  mockSubjects,
  mockAnnouncements,
  mockAttendanceRecords,
} from "@/lib/mock-data"
import { useAuth } from "@/app/providers"
import {
  Users,
  BookOpen,
  ClipboardCheck,
  FileEdit,
  Clock,
  Calendar,
} from "lucide-react"

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday"] as const

export function TeacherDashboard() {
  const { user } = useAuth()

  // Get teacher's subjects
  const teacherSubjects = mockSubjects.filter(
    (s) => s.teacherName === user?.name || s.teacherId === "t1"
  )
  const subjectIds = teacherSubjects.map((s) => s.id)

  // Today's timetable
  const today = DAYS[new Date().getDay() - 1] || "monday"
  const todayClasses = mockTimetable
    .filter((slot) => slot.day === today && subjectIds.includes(slot.subjectId))
    .sort((a, b) => a.startTime.localeCompare(b.startTime))

  // Teacher's students (CS department)
  const myStudents = mockStudents.filter((s) => s.departmentId === "d1")

  // Active assignments by teacher
  const myAssignments = mockAssignments.filter(
    (a) => subjectIds.includes(a.subjectId) && a.status === "active"
  )

  // Today's attendance
  const todayAttendance = mockAttendanceRecords.filter(
    (a) => subjectIds.includes(a.subjectId) && a.date === "2026-02-07"
  )
  const presentCount = todayAttendance.filter(
    (a) => a.status === "present" || a.status === "late"
  ).length
  const totalMarked = todayAttendance.length

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome, ${user?.name?.split(" ").pop()}`}
        description="Here's an overview of your classes and activities today."
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="My Students"
          value={myStudents.length}
          icon={Users}
          description="Across all subjects"
        />
        <StatCard
          title="Subjects"
          value={teacherSubjects.length}
          icon={BookOpen}
          description="This semester"
        />
        <StatCard
          title="Today's Attendance"
          value={totalMarked > 0 ? `${presentCount}/${totalMarked}` : "Not marked"}
          icon={ClipboardCheck}
          description={totalMarked > 0 ? `${Math.round((presentCount / totalMarked) * 100)}% present` : "Mark attendance for today"}
        />
        <StatCard
          title="Active Assignments"
          value={myAssignments.length}
          icon={FileEdit}
          description="Pending submissions"
        />
      </div>

      {/* Today's Schedule & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Schedule */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Today&apos;s Schedule</h3>
              <p className="text-xs text-muted-foreground capitalize">{today}</p>
            </div>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-4 space-y-3">
            {todayClasses.length === 0 ? (
              <p className="text-sm text-muted-foreground">No classes scheduled for today.</p>
            ) : (
              todayClasses.map((slot) => (
                <div
                  key={slot.id}
                  className="flex items-center gap-4 rounded-md bg-muted/50 px-4 py-3"
                >
                  <div className="flex flex-col items-center">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="mt-1 text-xs font-medium text-foreground">
                      {slot.startTime}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{slot.endTime}</span>
                  </div>
                  <div className="h-10 w-px bg-border" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{slot.subjectName}</p>
                    <p className="text-xs text-muted-foreground">
                      Room {slot.room} &middot; Section {slot.section}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Assignment Status */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Assignment Status</h3>
              <p className="text-xs text-muted-foreground">Active assignments overview</p>
            </div>
            <FileEdit className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-4 space-y-3">
            {myAssignments.length === 0 ? (
              <p className="text-sm text-muted-foreground">No active assignments.</p>
            ) : (
              myAssignments.map((assignment) => {
                const progress = Math.round(
                  (assignment.submissions / assignment.totalStudents) * 100
                )
                return (
                  <div
                    key={assignment.id}
                    className="rounded-md bg-muted/50 px-4 py-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">
                        {assignment.title}
                      </p>
                      <StatusBadge status={assignment.status} />
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {assignment.subjectName} &middot; Due{" "}
                      {new Date(assignment.deadline).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1.5 flex-1 rounded-full bg-muted">
                        <div
                          className="h-1.5 rounded-full bg-primary"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {assignment.submissions}/{assignment.totalStudents}
                      </span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      {/* Low Attendance Students & Recent Announcements */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Low Attendance Students */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-foreground">Students Needing Attention</h3>
          <p className="text-xs text-muted-foreground">Below 80% attendance</p>
          <div className="mt-4 space-y-2">
            {myStudents
              .filter((s) => s.attendancePercentage < 80)
              .sort((a, b) => a.attendancePercentage - b.attendancePercentage)
              .slice(0, 5)
              .map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.enrollmentNo}</p>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      student.attendancePercentage < 75
                        ? "text-destructive"
                        : "text-warning"
                    }`}
                  >
                    {student.attendancePercentage}%
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Recent Announcements */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-foreground">Announcements</h3>
          <p className="text-xs text-muted-foreground">Latest notices</p>
          <div className="mt-4 space-y-3">
            {mockAnnouncements
              .filter((a) => a.targetRoles.includes("teacher"))
              .slice(0, 4)
              .map((announcement) => (
                <div
                  key={announcement.id}
                  className="flex flex-col gap-1 rounded-md bg-muted/50 px-3 py-2"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {announcement.title}
                    </p>
                    <StatusBadge status={announcement.priority} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(announcement.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
