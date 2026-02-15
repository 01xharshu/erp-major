"use client"

import { PageHeader } from "@/components/page-header"
import { DataTable } from "@/components/data-table"
import { useDataFetcher } from "@/hooks/use-data-fetcher"
import { courseColumns } from "@/lib/table-columns"
import type { Course } from "@/types"

export default function CoursesPage() {
  const { data: courses, loading } = useDataFetcher<Course>({ type: "courses" })

  return (
    <div className="space-y-6">
      <PageHeader title="Courses" description="Manage all academic courses offered by the institution." />
      <DataTable
        data={courses as Record<string, unknown>[]}
        columns={courseColumns as any[]}
        searchKey="name"
        searchPlaceholder="Search courses..."
        emptyMessage={loading ? "Loading..." : "No courses found."}
      />
    </div>
  )
}
