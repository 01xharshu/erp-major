"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { DataTable } from "@/components/data-table"
import { StatusBadge } from "@/components/status-badge"
import { mockLibraryBooks, mockBookIssues } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import type { LibraryBook, BookIssue } from "@/types"

const bookColumns = [
  {
    key: "title",
    title: "Title",
    sortable: true,
    render: (item: LibraryBook) => (
      <div>
        <p className="font-medium text-foreground">{item.title}</p>
        <p className="text-xs text-muted-foreground">{item.author}</p>
      </div>
    ),
  },
  { key: "isbn", title: "ISBN", render: (item: LibraryBook) => <span className="font-mono text-xs">{item.isbn}</span> },
  { key: "category", title: "Category" },
  {
    key: "availableCopies",
    title: "Available",
    render: (item: LibraryBook) => (
      <span className={cn("font-medium", item.availableCopies === 0 ? "text-destructive" : "text-success")}>
        {item.availableCopies}/{item.totalCopies}
      </span>
    ),
  },
  { key: "status", title: "Status", render: (item: LibraryBook) => <StatusBadge status={item.status} /> },
]

const issueColumns = [
  {
    key: "bookTitle",
    title: "Book",
    sortable: true,
  },
  { key: "studentName", title: "Student" },
  { key: "issueDate", title: "Issued" },
  { key: "dueDate", title: "Due Date" },
  {
    key: "fine",
    title: "Fine",
    render: (item: BookIssue) => (
      <span className={item.fine > 0 ? "text-destructive font-medium" : "text-muted-foreground"}>
        {item.fine > 0 ? `Rs. ${item.fine}` : "-"}
      </span>
    ),
  },
  { key: "status", title: "Status", render: (item: BookIssue) => <StatusBadge status={item.status} /> },
]

export default function LibraryPage() {
  const [tab, setTab] = useState<"catalog" | "issues">("catalog")

  return (
    <div className="space-y-6">
      <PageHeader title="Library" description="Manage book catalog, issues, and returns." />

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-muted p-1 w-fit">
        {(["catalog", "issues"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors",
              tab === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t === "catalog" ? "Book Catalog" : "Issue/Return"}
          </button>
        ))}
      </div>

      {tab === "catalog" ? (
        <DataTable
          data={mockLibraryBooks as unknown as Record<string, unknown>[]}
          columns={bookColumns as { key: string; title: string; sortable?: boolean; render?: (item: Record<string, unknown>) => React.ReactNode; className?: string }[]}
          searchKey="title"
          searchPlaceholder="Search books by title..."
          emptyMessage="No books found."
        />
      ) : (
        <DataTable
          data={mockBookIssues as unknown as Record<string, unknown>[]}
          columns={issueColumns as { key: string; title: string; sortable?: boolean; render?: (item: Record<string, unknown>) => React.ReactNode; className?: string }[]}
          searchKey="bookTitle"
          searchPlaceholder="Search by book title..."
          emptyMessage="No issue records found."
        />
      )}
    </div>
  )
}
