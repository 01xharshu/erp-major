"use client"

import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { StatusBadge } from "@/components/status-badge"
import {
  mockStudents,
  mockTimetable,
  mockAssignments,
  mockAnnouncements,
  mockMarksEntries,
  mockFeePayments,
} from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import {
  ClipboardCheck,
  IndianRupee,
  FileEdit,
  Award,
  Clock,
  Calendar,
  AlertTriangle,
} from "lucide-react"

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday"] as const

export function StudentDashboard() {
  const { user } = useAuth()

  // Get current student data
  const student = mockStudents.find((s) => s.email === user?.email) || mockStudents[0]

  // Today's timetable for the student's course
  const today = DAYS[new Date().getDay() - 1] || "monday"
  const todayClasses = mockTimetable
    .filter((slot) => slot.day === today && slot.courseId === student.courseId)
    .sort((a, b) => a.startTime.localeCompare(b.startTime))

  // Pending assignments
  const pendingAssignments = mockAssignments.filter(
    (a) => a.status === "active" && new Date(a.deadline) > new Date()
  )

  // Recent results
  const myMarks = mockMarksEntries.filter((m) => m.studentId === student.id)

  // Fee status
  const myFees = mockFeePayments.filter((f) => f.studentId === student.id)
  const pendingFees = myFees.filter(
    (f) => f.status === "pending" || f.status === "overdue"
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome, ${student.name.split(" ")[0]}`}
        description={`${student.courseName} - Semester ${student.semester}, Section ${student.section}`}
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Attendance"
          value={`${student.attendancePercentage}%`}
          icon={ClipboardCheck}
          description={
            student.attendancePercentage < 75
              ? "Below minimum requirement"
              : "Good standing"
          }
          trend={
            student.attendancePercentage < 75
              ? { value: -(75 - student.attendancePercentage), label: "below 75%" }
              : undefined
          }
        />
        <StatCard
          title="CGPA"
          value={student.cgpa.toFixed(2)}
          icon={Award}
          description={`Batch ${student.batch}`}
        />
        <StatCard
          title="Fees Due"
          value={student.feesDue > 0 ? formatCurrency(student.feesDue) : "Nil"}
          icon={IndianRupee}
          description={student.feesDue > 0 ? "Payment pending" : "All fees cleared"}
        />
        <StatCard
          title="Pending Assignments"
          value={pendingAssignments.length}
          icon={FileEdit}
          description="Due this semester"
        />
      </div>

      {/* Alerts if low attendance or fees due */}
      {(student.attendancePercentage < 75 || student.feesDue > 0) && (
        <div className="space-y-2">
          {student.attendancePercentage < 75 && (
            <div className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3">
              <AlertTriangle className="h-4 w-4 shrink-0 text-destructive" />
              <div>
                <p className="text-sm font-medium text-destructive">Low Attendance Warning</p>
                <p className="text-xs text-muted-foreground">
                  Your attendance is {student.attendancePercentage}%, which is below the minimum 75% requirement. You may face debarment from exams.
                </p>
              </div>
            </div>
          )}
          {student.feesDue > 0 && (
            <div className="flex items-center gap-3 rounded-lg border border-warning/30 bg-warning/5 px-4 py-3">
              <IndianRupee className="h-4 w-4 shrink-0 text-warning" />
              <div>
                <p className="text-sm font-medium text-warning">Fee Payment Pending</p>
                <p className="text-xs text-muted-foreground">
                  You have {formatCurrency(student.feesDue)} in pending fees. Please clear before the deadline to avoid late charges.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Today's Schedule & Assignments */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Schedule */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Today&apos;s Classes</h3>
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
                      {slot.teacherName} &middot; Room {slot.room}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pending Assignments */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Upcoming Assignments</h3>
              <p className="text-xs text-muted-foreground">Due soon</p>
            </div>
            <FileEdit className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-4 space-y-3">
            {pendingAssignments.length === 0 ? (
              <p className="text-sm text-muted-foreground">No pending assignments.</p>
            ) : (
              pendingAssignments.map((assignment) => {
                const daysLeft = Math.ceil(
                  (new Date(assignment.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
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
                      <span className="text-xs font-medium text-foreground">
                        {assignment.totalMarks} marks
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {assignment.subjectName}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span
                        className={`text-xs font-medium ${
                          daysLeft <= 3 ? "text-destructive" : "text-muted-foreground"
                        }`}
                      >
                        {daysLeft > 0 ? `${daysLeft} days left` : "Due today"}
                      </span>
                      <button className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                        Submit
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      {/* Results & Announcements */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Results */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-foreground">Recent Results</h3>
          <p className="text-xs text-muted-foreground">Latest examination scores</p>
          <div className="mt-4 space-y-2">
            {myMarks.length === 0 ? (
              <p className="text-sm text-muted-foreground">No results available yet.</p>
            ) : (
              myMarks.map((mark) => (
                <div
                  key={mark.id}
                  className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">Internal Test 1 - DSA</p>
                    <p className="text-xs text-muted-foreground">
                      {mark.marksObtained}/{mark.totalMarks}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      {mark.grade}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Announcements */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-foreground">Announcements</h3>
          <p className="text-xs text-muted-foreground">Latest notices</p>
          <div className="mt-4 space-y-3">
            {mockAnnouncements
              .filter((a) => a.targetRoles.includes("student"))
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
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {announcement.content}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
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
