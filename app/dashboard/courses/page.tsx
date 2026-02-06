"use client"

import { PageHeader } from "@/components/page-header"
import { DataTable } from "@/components/data-table"
import { mockCourses } from "@/lib/mock-data"
import type { Course } from "@/types"

const columns = [
  {
    key: "code",
    title: "Code",
    render: (item: Course) => <span className="font-mono text-xs">{item.code}</span>,
  },
  {
    key: "name",
    title: "Course Name",
    sortable: true,
  },
  {
    key: "departmentName",
    title: "Department",
    sortable: true,
  },
  {
    key: "semesters",
    title: "Semesters",
    render: (item: Course) => <span>{item.semesters}</span>,
  },
  {
    key: "credits",
    title: "Total Credits",
    render: (item: Course) => <span>{item.credits}</span>,
  },
]

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Courses" description="Manage all academic courses offered by the institution." />
      <DataTable
        data={mockCourses as unknown as Record<string, unknown>[]}
        columns={columns as { key: string; title: string; sortable?: boolean; render?: (item: Record<string, unknown>) => React.ReactNode; className?: string }[]}
        searchKey="name"
        searchPlaceholder="Search courses..."
        emptyMessage="No courses found."
      />
    </div>
  )
}
