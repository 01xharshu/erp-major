"use client"

import { useAuth } from "@/lib/auth-context"
import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { mockAssignments } from "@/lib/mock-data"
import { formatDate, calculatePercentage } from "@/lib/utils"
import { FileEdit, Calendar, Users } from "lucide-react"

export default function AssignmentsPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assignments"
        description={
          user?.role === "student"
            ? "View your pending and submitted assignments."
            : "Manage and track assignment submissions."
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockAssignments.map((assignment) => {
          const submitPercent = calculatePercentage(assignment.submissions, assignment.totalStudents)
          return (
            <div key={assignment.id} className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/30">
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                  <FileEdit className="h-4 w-4 text-primary" />
                </div>
                <StatusBadge status={assignment.status} />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-foreground line-clamp-1">{assignment.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{assignment.description}</p>
              <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Due: {formatDate(assignment.deadline)}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {assignment.submissions}/{assignment.totalStudents}
                </span>
              </div>
              {/* Submission progress */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Submissions</span>
                  <span className="font-medium text-foreground">{submitPercent}%</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${submitPercent}%` }}
                  />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{assignment.subjectName}</span>
                <span className="text-xs font-medium text-foreground">{assignment.totalMarks} marks</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
