"use client"

import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { StatusBadge } from "@/components/status-badge"
import {
  mockAdminStats,
  attendanceChartData,
  feeCollectionChartData,
  departmentDistribution,
  mockAnnouncements,
  mockStudents,
} from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import {
  GraduationCap,
  Users,
  IndianRupee,
  ClipboardCheck,
  BookOpen,
  Building2,
  AlertTriangle,
  TrendingUp,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const CHART_COLORS = [
  "hsl(217, 91%, 55%)",
  "hsl(142, 71%, 45%)",
  "hsl(38, 92%, 50%)",
  "hsl(280, 67%, 55%)",
  "hsl(0, 72%, 51%)",
]

export function AdminDashboard() {
  const stats = mockAdminStats
  const lowAttendanceStudents = mockStudents.filter((s) => s.attendancePercentage < 75)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        description="Overview of your institution's performance and key metrics."
      />

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value={stats.totalStudents.toLocaleString()}
          icon={GraduationCap}
          trend={{ value: 5.2, label: "from last year" }}
        />
        <StatCard
          title="Total Teachers"
          value={stats.totalTeachers}
          icon={Users}
          trend={{ value: 2.1, label: "from last year" }}
        />
        <StatCard
          title="Fee Collected"
          value={formatCurrency(stats.feeCollected)}
          icon={IndianRupee}
          trend={{ value: 12.5, label: "this semester" }}
        />
        <StatCard
          title="Avg. Attendance"
          value={`${stats.averageAttendance}%`}
          icon={ClipboardCheck}
          trend={{ value: -1.5, label: "from last month" }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Attendance Trend */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Attendance Trend</h3>
              <p className="text-xs text-muted-foreground">Monthly average attendance percentage</p>
            </div>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Line type="monotone" dataKey="attendance" stroke="hsl(217, 91%, 55%)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Collection */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Fee Collection</h3>
              <p className="text-xs text-muted-foreground">Monthly collected vs pending</p>
            </div>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feeCollectionChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Bar dataKey="collected" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Department Distribution */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-foreground">Student Distribution</h3>
          <p className="text-xs text-muted-foreground">By department</p>
          <div className="mt-4 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  dataKey="students"
                  nameKey="name"
                >
                  {departmentDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-wrap gap-3">
            {departmentDistribution.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: CHART_COLORS[i] }} />
                <span className="text-xs text-muted-foreground">{d.name} ({d.students})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Low Attendance Alert */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <h3 className="text-sm font-semibold text-foreground">Low Attendance Alerts</h3>
          </div>
          <p className="text-xs text-muted-foreground">Students below 75% attendance</p>
          <div className="mt-4 space-y-3">
            {lowAttendanceStudents.length === 0 ? (
              <p className="text-sm text-muted-foreground">All students have adequate attendance.</p>
            ) : (
              lowAttendanceStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.enrollmentNo}</p>
                  </div>
                  <span className="text-sm font-medium text-destructive">{student.attendancePercentage}%</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Announcements */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-foreground">Recent Announcements</h3>
          <p className="text-xs text-muted-foreground">Latest notices and updates</p>
          <div className="mt-4 space-y-3">
            {mockAnnouncements.slice(0, 4).map((announcement) => (
              <div key={announcement.id} className="flex flex-col gap-1 rounded-md bg-muted/50 px-3 py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground line-clamp-1">{announcement.title}</p>
                  <StatusBadge status={announcement.priority} />
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(announcement.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
