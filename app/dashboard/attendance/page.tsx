"use client"

import { useState } from "react"
import { useAuth } from "@/app/providers"
import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { mockStudents, mockSubjects, mockAttendanceRecords } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Check, X, Clock, Minus } from "lucide-react"
import { toast } from "sonner"

type AttendanceStatus = "present" | "absent" | "late" | "excused"

export default function AttendancePage() {
  const { user } = useAuth()
  const isTeacher = user?.role === "teacher"
  const isStudent = user?.role === "student"
  const [selectedSubject, setSelectedSubject] = useState(mockSubjects[0]?.id || "")
  const [attendanceState, setAttendanceState] = useState<Record<string, AttendanceStatus>>({})
  const [saved, setSaved] = useState(false)

  const csStudents = mockStudents.filter((s) => s.courseId === "c1" && s.section === "A")
  const subjects = isTeacher ? mockSubjects.filter((s) => s.teacherId === "t1") : mockSubjects

  const toggleAttendance = (studentId: string) => {
    const current = attendanceState[studentId] || "present"
    const cycle: AttendanceStatus[] = ["present", "absent", "late", "excused"]
    const nextIdx = (cycle.indexOf(current) + 1) % cycle.length
    setAttendanceState({ ...attendanceState, [studentId]: cycle[nextIdx] })
    setSaved(false)
  }

  const markAll = (status: AttendanceStatus) => {
    const newState: Record<string, AttendanceStatus> = {}
    csStudents.forEach((s) => { newState[s.id] = status })
    setAttendanceState(newState)
    setSaved(false)
  }

  const handleSave = () => {
    toast.success("Attendance saved successfully")
    setSaved(true)
  }

  const statusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case "present": return <Check className="h-4 w-4" />
      case "absent": return <X className="h-4 w-4" />
      case "late": return <Clock className="h-4 w-4" />
      case "excused": return <Minus className="h-4 w-4" />
    }
  }

  // Student view - show their attendance records
  if (isStudent) {
    const studentRecords = mockAttendanceRecords.filter((r) => r.studentId === "st1")
    return (
      <div className="space-y-6">
        <PageHeader title="My Attendance" description="View your attendance records and statistics." />
        <div className="grid gap-4 sm:grid-cols-3">
          {mockSubjects.filter(s => s.courseId === "c1" && s.semester === 3).map((subject) => {
            const subjectRecords = mockAttendanceRecords.filter((r) => r.subjectId === subject.id && r.studentId === "st1")
            const presentCount = subjectRecords.filter((r) => r.status === "present" || r.status === "late").length
            const totalCount = subjectRecords.length || 1
            const percentage = Math.round((presentCount / totalCount) * 100)
            return (
              <div key={subject.id} className="rounded-lg border border-border bg-card p-4">
                <p className="text-sm font-medium text-foreground">{subject.name}</p>
                <p className="text-xs text-muted-foreground">{subject.code}</p>
                <div className="mt-3 flex items-end justify-between">
                  <span className={cn("text-2xl font-bold", percentage >= 75 ? "text-success" : "text-destructive")}>
                    {percentage}%
                  </span>
                  <span className="text-xs text-muted-foreground">{presentCount}/{totalCount} classes</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: percentage >= 75 ? "hsl(var(--success))" : "hsl(var(--destructive))",
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-foreground">Recent Attendance</h3>
          <div className="mt-4 space-y-2">
            {studentRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">{record.subjectName}</p>
                  <p className="text-xs text-muted-foreground">{record.date}</p>
                </div>
                <StatusBadge status={record.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Teacher/Admin view - mark attendance
  return (
    <div className="space-y-6">
      <PageHeader
        title="Mark Attendance"
        description={isTeacher ? "Mark attendance for your classes." : "Manage attendance records across all classes."}
      >
        <button
          onClick={handleSave}
          disabled={saved || Object.keys(attendanceState).length === 0}
          className="flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          Save Attendance
        </button>
      </PageHeader>

      {/* Subject selection */}
      <div className="flex flex-wrap gap-2">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => setSelectedSubject(subject.id)}
            className={cn(
              "rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
              selectedSubject === subject.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:bg-accent"
            )}
          >
            {subject.code} - {subject.name}
          </button>
        ))}
      </div>

      {/* Bulk actions */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Quick:</span>
        <button onClick={() => markAll("present")} className="rounded-md bg-success/10 px-2 py-1 text-xs font-medium text-success hover:bg-success/20">
          All Present
        </button>
        <button onClick={() => markAll("absent")} className="rounded-md bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive hover:bg-destructive/20">
          All Absent
        </button>
      </div>

      {/* Student list */}
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {csStudents.map((student) => {
          const status = attendanceState[student.id] || "present"
          return (
            <button
              key={student.id}
              onClick={() => toggleAttendance(student.id)}
              className={cn(
                "flex items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                status === "present" && "border-success/30 bg-success/5",
                status === "absent" && "border-destructive/30 bg-destructive/5",
                status === "late" && "border-warning/30 bg-warning/5",
                status === "excused" && "border-border bg-muted/50"
              )}
            >
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full",
                status === "present" && "bg-success/10 text-success",
                status === "absent" && "bg-destructive/10 text-destructive",
                status === "late" && "bg-warning/10 text-warning",
                status === "excused" && "bg-muted text-muted-foreground"
              )}>
                {statusIcon(status)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{student.name}</p>
                <p className="text-xs text-muted-foreground">{student.enrollmentNo}</p>
              </div>
              <StatusBadge status={status} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
