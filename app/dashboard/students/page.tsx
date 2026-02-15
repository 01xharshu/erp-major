"use client"

import { PageHeader } from "@/components/page-header"
import { DataTable } from "@/components/data-table"
import { useAuth } from "@/app/providers"
import { useDataFetcher } from "@/hooks/use-data-fetcher"
import { studentColumns } from "@/lib/table-columns"
import type { Student } from "@/types"

export default function StudentsPage() {
  const { user } = useAuth()
  const { data: students, loading } = useDataFetcher<Student>({ type: "students" })
  const isAdmin = user?.role === "admin"

  return (
    <div className="space-y-6">
      <PageHeader
        title="Students"
        description={isAdmin ? "Manage all student records and academic profiles." : "View student records."}
      />
      <DataTable
        data={students as Record<string, unknown>[]}
        columns={studentColumns as any[]}
        searchKey="name"
        searchPlaceholder="Search students by name..."
        emptyMessage={loading ? "Loading..." : "No students found."}
      />
    </div>
  )
}
