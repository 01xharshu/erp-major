"use client"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp, Search } from "lucide-react"

interface Column<T> {
  key: string
  title: string
  render?: (item: T) => React.ReactNode
  sortable?: boolean
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchKey?: string
  searchPlaceholder?: string
  onRowClick?: (item: T) => void
  emptyMessage?: string
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  searchKey,
  searchPlaceholder = "Search...",
  onRowClick,
  emptyMessage = "No records found.",
}: DataTableProps<T>) {
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")

  const filteredData = useMemo(() => {
    let result = [...data]
    if (search && searchKey) {
      result = result.filter((item) => {
        const val = item[searchKey]
        return typeof val === "string" && val.toLowerCase().includes(search.toLowerCase())
      })
    }
    if (sortKey) {
      result.sort((a, b) => {
        const aVal = a[sortKey]
        const bVal = b[sortKey]
        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
        }
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDir === "asc" ? aVal - bVal : bVal - aVal
        }
        return 0
      })
    }
    return result
  }, [data, search, searchKey, sortKey, sortDir])

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  return (
    <div className="space-y-4">
      {searchKey && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring sm:w-72"
          />
        </div>
      )}
      <div className="overflow-hidden rounded-lg border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground",
                      col.sortable && "cursor-pointer select-none hover:text-foreground",
                      col.className
                    )}
                    onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  >
                    <div className="flex items-center gap-1">
                      {col.title}
                      {col.sortable && sortKey === col.key && (
                        sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-muted-foreground">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                filteredData.map((item, idx) => (
                  <tr
                    key={idx}
                    className={cn(
                      "border-b border-border last:border-0 transition-colors",
                      onRowClick && "cursor-pointer hover:bg-muted/50"
                    )}
                    onClick={onRowClick ? () => onRowClick(item) : undefined}
                  >
                    {columns.map((col) => (
                      <td key={col.key} className={cn("px-4 py-3 text-sm text-foreground", col.className)}>
                        {col.render ? col.render(item) : (item[col.key] as React.ReactNode)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Showing {filteredData.length} of {data.length} records</span>
      </div>
    </div>
  )
}
