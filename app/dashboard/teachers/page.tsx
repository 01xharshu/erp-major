"use client"

import { PageHeader } from "@/components/page-header"
import { DataTable } from "@/components/data-table"
import { StatusBadge } from "@/components/status-badge"
import { mockTeachers } from "@/lib/mock-data"
import type { Teacher } from "@/types"

const columns = [
  {
    key: "employeeId",
    title: "Employee ID",
    render: (item: Teacher) => <span className="font-mono text-xs">{item.employeeId}</span>,
  },
  {
    key: "name",
    title: "Name",
    sortable: true,
    render: (item: Teacher) => (
      <div>
        <p className="font-medium text-foreground">{item.name}</p>
        <p className="text-xs text-muted-foreground">{item.email}</p>
      </div>
    ),
  },
  {
    key: "departmentName",
    title: "Department",
    sortable: true,
  },
  {
    key: "designation",
    title: "Designation",
  },
  {
    key: "specialization",
    title: "Specialization",
    render: (item: Teacher) => <span className="text-xs">{item.specialization}</span>,
  },
  {
    key: "subjects",
    title: "Subjects",
    render: (item: Teacher) => (
      <div className="flex flex-wrap gap-1">
        {item.subjects.map((s) => (
          <span key={s} className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium">{s}</span>
        ))}
      </div>
    ),
  },
  {
    key: "status",
    title: "Status",
    render: (item: Teacher) => <StatusBadge status={item.status} />,
  },
]

export default function TeachersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Teachers" description="Manage faculty records, assignments, and workload." />
      <DataTable
        data={mockTeachers as unknown as Record<string, unknown>[]}
        columns={columns as { key: string; title: string; sortable?: boolean; render?: (item: Record<string, unknown>) => React.ReactNode; className?: string }[]}
        searchKey="name"
        searchPlaceholder="Search teachers by name..."
        emptyMessage="No teachers found."
      />
    </div>
  )
}
