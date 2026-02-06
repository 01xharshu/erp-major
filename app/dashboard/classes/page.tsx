"use client"

import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { useAuth } from "@/app/providers"
import { mockSubjects, mockStudents, mockTimetable } from "@/lib/mock-data"
import { Users, Clock, MapPin, BookOpen } from "lucide-react"

export default function ClassesPage() {
  const { user } = useAuth()

  // Get teacher's subjects
  const teacherSubjects = mockSubjects.filter(
    (s) => s.teacherName === user?.name || s.teacherId === "t1"
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Classes"
        description="Manage your assigned subjects and classes."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teacherSubjects.map((subject) => {
          const studentsInSubject = mockStudents.filter(
            (s) => s.courseId === subject.courseId && s.semester === subject.semester
          )
          const scheduleSlots = mockTimetable.filter(
            (t) => t.subjectId === subject.id
          )

          return (
            <div
              key={subject.id}
              className="rounded-lg border border-border bg-card p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <StatusBadge status="active" />
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-foreground">{subject.name}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {subject.code} &middot; Semester {subject.semester} &middot; {subject.credits} Credits
                </p>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  <span>{studentsInSubject.length} Students</span>
                </div>

                {scheduleSlots.slice(0, 3).map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <Clock className="h-3.5 w-3.5" />
                    <span className="capitalize">{slot.day.slice(0, 3)}</span>
                    <span>
                      {slot.startTime} - {slot.endTime}
                    </span>
                    <MapPin className="ml-auto h-3.5 w-3.5" />
                    <span>{slot.room}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                  View Details
                </button>
                <button className="flex-1 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent">
                  Attendance
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
