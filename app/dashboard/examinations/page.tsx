"use client"

import { PageHeader } from "@/components/page-header"
import { DataTable } from "@/components/data-table"
import { StatusBadge } from "@/components/status-badge"
import { mockExams } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"
import type { Exam } from "@/types"

const columns = [
  {
    key: "name",
    title: "Exam Name",
    sortable: true,
    render: (item: Exam) => (
      <div>
        <p className="font-medium text-foreground">{item.name}</p>
        <p className="text-xs text-muted-foreground">{item.subjectName}</p>
      </div>
    ),
  },
  {
    key: "type",
    title: "Type",
    render: (item: Exam) => <span className="capitalize">{item.type}</span>,
  },
  {
    key: "date",
    title: "Date",
    sortable: true,
    render: (item: Exam) => formatDate(item.date),
  },
  {
    key: "totalMarks",
    title: "Total Marks",
  },
  {
    key: "passingMarks",
    title: "Passing",
  },
  {
    key: "status",
    title: "Status",
    render: (item: Exam) => <StatusBadge status={item.status} />,
  },
]

export default function ExaminationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Examinations" description="Manage exam schedules, results, and grading." />
      <DataTable
        data={mockExams as unknown as Record<string, unknown>[]}
        columns={columns as { key: string; title: string; sortable?: boolean; render?: (item: Record<string, unknown>) => React.ReactNode; className?: string }[]}
        searchKey="name"
        searchPlaceholder="Search exams..."
        emptyMessage="No examinations found."
      />
    </div>
  )
}
