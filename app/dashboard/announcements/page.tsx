"use client"

import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { useDataFetcher } from "@/hooks/use-data-fetcher"
import { formatDate } from "@/lib/utils"
import { Megaphone } from "lucide-react"
import type { Announcement } from "@/types"

export default function AnnouncementsPage() {
  const { data: announcements, loading } = useDataFetcher<Announcement>({ type: "announcements" })

  return (
    <div className="space-y-6">
      <PageHeader title="Announcements" description="View and manage institutional notices and updates." />
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/20">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
                  <Megaphone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{announcement.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{announcement.content}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span>By {announcement.author}</span>
                    <span>{formatDate(announcement.createdAt)}</span>
                    <div className="flex gap-1">
                      {announcement.targetRoles.map((role) => (
                        <span key={role} className="rounded bg-muted px-1.5 py-0.5 text-[10px] capitalize">{role}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <StatusBadge status={announcement.priority} />
            </div>
          </div>
        ))}
      </div>
      {loading && <p className="text-center text-muted-foreground">Loading announcements...</p>}
      {!loading && announcements.length === 0 && <p className="text-center text-muted-foreground">No announcements found.</p>}
    </div>
  )
}
