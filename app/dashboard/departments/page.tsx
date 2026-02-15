"use client"

import { PageHeader } from "@/components/page-header"
import { useDataFetcher } from "@/hooks/use-data-fetcher"
import { Building2, Users, GraduationCap } from "lucide-react"
import type { Department } from "@/types"

export default function DepartmentsPage() {
  const { data: departments, loading } = useDataFetcher<Department>({ type: "departments" })

  return (
    <div className="space-y-6">
      <PageHeader title="Departments" description="Manage academic departments and their faculty." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/30"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{dept.name}</h3>
                <p className="text-xs text-muted-foreground">Code: {dept.code}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-6">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm text-foreground">{dept.studentsCount}</span>
                <span className="text-xs text-muted-foreground">Students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm text-foreground">{dept.teachersCount}</span>
                <span className="text-xs text-muted-foreground">Faculty</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && <p className="text-center text-muted-foreground">Loading departments...</p>}
      {!loading && departments.length === 0 && <p className="text-center text-muted-foreground">No departments found.</p>}
    </div>
  )
}
