"use client"

import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import {
  mockAdminStats,
  attendanceChartData,
  feeCollectionChartData,
  departmentDistribution,
} from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { GraduationCap, Users, IndianRupee, ClipboardCheck, TrendingUp, BarChart3 } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reports & Analytics" description="Comprehensive analytics across all modules." />

      {/* Summary stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Students" value={mockAdminStats.totalStudents.toLocaleString()} icon={GraduationCap} trend={{ value: 5.2, label: "YoY" }} />
        <StatCard title="Total Teachers" value={mockAdminStats.totalTeachers} icon={Users} trend={{ value: 2.1, label: "YoY" }} />
        <StatCard title="Fee Collection Rate" value="87%" icon={IndianRupee} trend={{ value: 3.1, label: "vs last sem" }} />
        <StatCard title="Avg Attendance" value={`${mockAdminStats.averageAttendance}%`} icon={ClipboardCheck} trend={{ value: -1.5, label: "MoM" }} />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Attendance trend */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Attendance Trend</h3>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
                />
                <Area type="monotone" dataKey="attendance" stroke="hsl(217, 91%, 55%)" fill="hsl(217, 91%, 55%)" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee collection */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Fee Collection vs Pending</h3>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feeCollectionChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Bar dataKey="collected" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Department wise stats */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-sm font-semibold text-foreground">Department-wise Student Distribution</h3>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentDistribution} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} width={40} />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
              />
              <Bar dataKey="students" fill="hsl(217, 91%, 55%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
