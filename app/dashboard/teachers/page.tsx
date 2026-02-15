"use client"

import { PageHeader } from "@/components/page-header"
import { DataTable } from "@/components/data-table"
import { useDataFetcher } from "@/hooks/use-data-fetcher"
import { teacherColumns } from "@/lib/table-columns"
import type { Teacher } from "@/types"

export default function TeachersPage() {
  const { data: teachers, loading } = useDataFetcher<Teacher>({ type: "teachers" })

  return (
    <div className="space-y-6">
      <PageHeader title="Teachers" description="Manage faculty records, assignments, and workload." />
      <DataTable
        data={teachers as Record<string, unknown>[]}
        columns={teacherColumns as any[]}
        searchKey="name"
        searchPlaceholder="Search teachers by name..."
        emptyMessage={loading ? "Loading..." : "No teachers found."}
      />
    </div>
  )
}
