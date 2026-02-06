"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { mockExams, mockMarksEntries, mockStudents } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function MarksEntryPage() {
  const publishedExams = mockExams.filter((e) => e.status === "results-published")
  const upcomingExams = mockExams.filter((e) => e.status !== "results-published")
  const [selectedExam, setSelectedExam] = useState(publishedExams[0]?.id || "")
  const [marksState, setMarksState] = useState<Record<string, number>>({})

  const currentExam = mockExams.find((e) => e.id === selectedExam)
  const existingMarks = mockMarksEntries.filter((m) => m.examId === selectedExam)
  const csStudents = mockStudents.filter((s) => s.courseId === "c1" && s.section === "A")

  const handleMarksChange = (studentId: string, marks: number) => {
    setMarksState({ ...marksState, [studentId]: marks })
  }

  const handleSave = () => {
    toast.success("Marks saved successfully")
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Marks Entry" description="Enter and manage examination marks for your subjects.">
        <button
          onClick={handleSave}
          disabled={Object.keys(marksState).length === 0}
          className="flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          Save Marks
        </button>
      </PageHeader>

      {/* Exam selection */}
      <div>
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Select Exam</h3>
        <div className="flex flex-wrap gap-2">
          {[...publishedExams, ...upcomingExams].map((exam) => (
            <button
              key={exam.id}
              onClick={() => setSelectedExam(exam.id)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                selectedExam === exam.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-accent"
              )}
            >
              {exam.name}
            </button>
          ))}
        </div>
      </div>

      {currentExam && (
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border px-4 py-3">
            <h3 className="text-sm font-semibold text-foreground">{currentExam.name}</h3>
            <p className="text-xs text-muted-foreground">
              Total: {currentExam.totalMarks} | Passing: {currentExam.passingMarks}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase text-muted-foreground">Enrollment</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase text-muted-foreground">Student</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase text-muted-foreground">Marks</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase text-muted-foreground">Grade</th>
                </tr>
              </thead>
              <tbody>
                {csStudents.map((student) => {
                  const existing = existingMarks.find((m) => m.studentId === student.id)
                  const currentMarks = marksState[student.id] ?? existing?.marksObtained ?? 0
                  const isPassing = currentMarks >= currentExam.passingMarks

                  return (
                    <tr key={student.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-2 font-mono text-xs">{student.enrollmentNo}</td>
                      <td className="px-4 py-2 text-sm font-medium text-foreground">{student.name}</td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          min={0}
                          max={currentExam.totalMarks}
                          value={currentMarks}
                          onChange={(e) => handleMarksChange(student.id, parseInt(e.target.value) || 0)}
                          className="h-8 w-20 rounded-md border border-input bg-background px-2 text-center text-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                        />
                        <span className="ml-1 text-xs text-muted-foreground">/ {currentExam.totalMarks}</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className={cn(
                          "text-xs font-medium",
                          isPassing ? "text-success" : "text-destructive"
                        )}>
                          {existing?.grade || (isPassing ? "Pass" : "Fail")}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
