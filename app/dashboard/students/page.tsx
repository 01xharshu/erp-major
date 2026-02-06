"use client"

import { PageHeader } from "@/components/page-header"
import { DataTable } from "@/components/data-table"
import { StatusBadge } from "@/components/status-badge"
import { mockStudents } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import type { Student } from "@/types"

const columns = [
  {
    key: "enrollmentNo",
    title: "Enrollment No",
    sortable: true,
    render: (item: Student) => (
      <span className="font-mono text-xs">{item.enrollmentNo}</span>
    ),
  },
  {
    key: "name",
    title: "Name",
    sortable: true,
    render: (item: Student) => (
      <div>
        <p className="font-medium text-foreground">{item.name}</p>
        <p className="text-xs text-muted-foreground">{item.email}</p>
      </div>
    ),
  },
  {
    key: "courseName",
    title: "Course",
    render: (item: Student) => (
      <div>
        <p className="text-foreground">{item.courseName}</p>
        <p className="text-xs text-muted-foreground">Sem {item.semester} - Sec {item.section}</p>
      </div>
    ),
  },
  {
    key: "attendancePercentage",
    title: "Attendance",
    sortable: true,
    render: (item: Student) => (
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-16 rounded-full bg-muted">
          <div
            className="h-full rounded-full"
            style={{
              width: `${item.attendancePercentage}%`,
              backgroundColor: item.attendancePercentage >= 75 ? "hsl(var(--success))" : "hsl(var(--destructive))",
            }}
          />
        </div>
        <span className="text-xs">{item.attendancePercentage}%</span>
      </div>
    ),
  },
  {
    key: "cgpa",
    title: "CGPA",
    sortable: true,
    render: (item: Student) => <span className="font-medium">{item.cgpa.toFixed(1)}</span>,
  },
  {
    key: "feesDue",
    title: "Fees Due",
    sortable: true,
    render: (item: Student) => (
      <span className={item.feesDue > 0 ? "text-destructive" : "text-success"}>
        {item.feesDue > 0 ? formatCurrency(item.feesDue) : "Paid"}
      </span>
    ),
  },
  {
    key: "status",
    title: "Status",
    render: (item: Student) => <StatusBadge status={item.status} />,
  },
]

export default function StudentsPage() {
  const { user } = useAuth()
  const isAdmin = user?.role === "admin"

  return (
    <div className="space-y-6">
      <PageHeader
        title="Students"
        description={isAdmin ? "Manage all student records and academic profiles." : "View student records."}
      />
      <DataTable
        data={mockStudents as unknown as Record<string, unknown>[]}
        columns={columns as { key: string; title: string; sortable?: boolean; render?: (item: Record<string, unknown>) => React.ReactNode; className?: string }[]}
        searchKey="name"
        searchPlaceholder="Search students by name..."
        emptyMessage="No students found."
      />
    </div>
  )
}
