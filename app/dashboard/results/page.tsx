"use client"

import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { useAuth } from "@/lib/auth-context"
import { mockStudents, mockMarksEntries, mockExams } from "@/lib/mock-data"
import { Award, FileText, TrendingUp, BookOpen } from "lucide-react"

export default function ResultsPage() {
  const { user } = useAuth()
  const student = mockStudents.find((s) => s.email === user?.email) || mockStudents[0]
  const myMarks = mockMarksEntries.filter((m) => m.studentId === student.id)

  // Calculate totals
  const totalMarksObtained = myMarks.reduce((sum, m) => sum + m.marksObtained, 0)
  const totalMaxMarks = myMarks.reduce((sum, m) => sum + m.totalMarks, 0)
  const percentage = totalMaxMarks > 0 ? Math.round((totalMarksObtained / totalMaxMarks) * 100) : 0

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Results"
        description="View your examination scores and academic performance."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Current CGPA"
          value={student.cgpa.toFixed(2)}
          icon={Award}
          description={`Batch ${student.batch}`}
        />
        <StatCard
          title="Total Exams"
          value={myMarks.length}
          icon={FileText}
          description="Results published"
        />
        <StatCard
          title="Average Score"
          value={`${percentage}%`}
          icon={TrendingUp}
          description="Across all exams"
        />
        <StatCard
          title="Semester"
          value={student.semester}
          icon={BookOpen}
          description={student.courseName}
        />
      </div>

      {/* Results Table */}
      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h3 className="text-sm font-semibold text-foreground">Examination Results</h3>
          <p className="text-xs text-muted-foreground">Published results for your semester</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Exam</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Subject</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground">Marks</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground">Total</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground">Percentage</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {myMarks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm text-muted-foreground">
                    No results available yet.
                  </td>
                </tr>
              ) : (
                myMarks.map((mark) => {
                  const exam = mockExams.find((e) => e.id === mark.examId)
                  const pct = Math.round((mark.marksObtained / mark.totalMarks) * 100)
                  return (
                    <tr key={mark.id} className="border-b border-border last:border-0">
                      <td className="px-6 py-3 text-sm font-medium text-foreground">
                        {exam?.name || "Exam"}
                      </td>
                      <td className="px-6 py-3 text-sm text-muted-foreground">
                        {exam?.subjectName || "-"}
                      </td>
                      <td className="px-6 py-3 text-center text-sm font-medium text-foreground">
                        {mark.marksObtained}
                      </td>
                      <td className="px-6 py-3 text-center text-sm text-muted-foreground">
                        {mark.totalMarks}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <span
                          className={`text-sm font-medium ${
                            pct >= 80
                              ? "text-success"
                              : pct >= 60
                              ? "text-foreground"
                              : pct >= 40
                              ? "text-warning"
                              : "text-destructive"
                          }`}
                        >
                          {pct}%
                        </span>
                      </td>
                      <td className="px-6 py-3 text-center">
                        <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                          {mark.grade}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm text-muted-foreground">
                        {mark.remarks || "-"}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Exams */}
      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h3 className="text-sm font-semibold text-foreground">Upcoming Examinations</h3>
          <p className="text-xs text-muted-foreground">Scheduled exams for your semester</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Exam Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Subject</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground">Type</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground">Date</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground">Total Marks</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockExams
                .filter((e) => e.courseId === student.courseId && e.status === "upcoming")
                .map((exam) => (
                  <tr key={exam.id} className="border-b border-border last:border-0">
                    <td className="px-6 py-3 text-sm font-medium text-foreground">{exam.name}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{exam.subjectName}</td>
                    <td className="px-6 py-3 text-center">
                      <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground capitalize">
                        {exam.type}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center text-sm text-muted-foreground">
                      {new Date(exam.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-3 text-center text-sm text-muted-foreground">
                      {exam.totalMarks}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        Upcoming
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
