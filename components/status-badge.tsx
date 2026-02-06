import { cn } from "@/lib/utils"

const statusStyles: Record<string, string> = {
  active: "bg-success/10 text-success",
  present: "bg-success/10 text-success",
  paid: "bg-success/10 text-success",
  approved: "bg-success/10 text-success",
  available: "bg-success/10 text-success",
  returned: "bg-success/10 text-success",
  completed: "bg-success/10 text-success",
  "results-published": "bg-success/10 text-success",
  graduated: "bg-primary/10 text-primary",
  pending: "bg-warning/10 text-warning",
  upcoming: "bg-primary/10 text-primary",
  ongoing: "bg-primary/10 text-primary",
  issued: "bg-primary/10 text-primary",
  partial: "bg-warning/10 text-warning",
  late: "bg-warning/10 text-warning",
  "on-leave": "bg-warning/10 text-warning",
  absent: "bg-destructive/10 text-destructive",
  overdue: "bg-destructive/10 text-destructive",
  suspended: "bg-destructive/10 text-destructive",
  dropped: "bg-destructive/10 text-destructive",
  rejected: "bg-destructive/10 text-destructive",
  resigned: "bg-destructive/10 text-destructive",
  closed: "bg-muted text-muted-foreground",
  draft: "bg-muted text-muted-foreground",
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = statusStyles[status] || "bg-muted text-muted-foreground"
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize",
        style,
        className
      )}
    >
      {status.replace(/-/g, " ")}
    </span>
  )
}
