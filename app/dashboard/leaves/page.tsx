"use client"

import { PageHeader } from "@/components/page-header"
import { DataTable } from "@/components/data-table"
import { StatusBadge } from "@/components/status-badge"
import { mockLeaveRequests } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"
import type { LeaveRequest } from "@/types"

const columns = [
  {
    key: "userName",
    title: "Name",
    sortable: true,
    render: (item: LeaveRequest) => (
      <div>
        <p className="font-medium text-foreground">{item.userName}</p>
        <p className="text-xs capitalize text-muted-foreground">{item.role}</p>
      </div>
    ),
  },
  {
    key: "type",
    title: "Leave Type",
    render: (item: LeaveRequest) => <span className="capitalize">{item.type}</span>,
  },
  {
    key: "startDate",
    title: "From",
    render: (item: LeaveRequest) => formatDate(item.startDate),
  },
  {
    key: "endDate",
    title: "To",
    render: (item: LeaveRequest) => formatDate(item.endDate),
  },
  {
    key: "reason",
    title: "Reason",
    render: (item: LeaveRequest) => <span className="text-xs">{item.reason}</span>,
  },
  {
    key: "status",
    title: "Status",
    render: (item: LeaveRequest) => <StatusBadge status={item.status} />,
  },
]

export default function LeavesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Leave Requests" description="Manage leave applications from staff and students." />
      <DataTable
        data={mockLeaveRequests as unknown as Record<string, unknown>[]}
        columns={columns as { key: string; title: string; sortable?: boolean; render?: (item: Record<string, unknown>) => React.ReactNode; className?: string }[]}
        searchKey="userName"
        searchPlaceholder="Search by name..."
        emptyMessage="No leave requests found."
      />
    </div>
  )
}
