"use client"

import { useAuth } from "@/app/providers"
import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { DataTable } from "@/components/data-table"
import { StatusBadge } from "@/components/status-badge"
import { mockFeePayments, mockFeeStructures, mockAdminStats } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { IndianRupee, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react"
import type { FeePayment } from "@/types"

const paymentColumns = [
  {
    key: "receiptNo",
    title: "Receipt",
    render: (item: FeePayment) => (
      <span className="font-mono text-xs">{item.receiptNo || "-"}</span>
    ),
  },
  {
    key: "studentName",
    title: "Student",
    sortable: true,
    render: (item: FeePayment) => (
      <div>
        <p className="font-medium text-foreground">{item.studentName}</p>
        <p className="text-xs text-muted-foreground">{item.enrollmentNo}</p>
      </div>
    ),
  },
  {
    key: "feeType",
    title: "Fee Type",
  },
  {
    key: "amount",
    title: "Amount",
    sortable: true,
    render: (item: FeePayment) => (
      <span className="font-medium">{formatCurrency(item.amount)}</span>
    ),
  },
  {
    key: "paymentMethod",
    title: "Method",
    render: (item: FeePayment) => (
      <span className="capitalize">{item.paymentMethod.replace("-", " ")}</span>
    ),
  },
  {
    key: "status",
    title: "Status",
    render: (item: FeePayment) => <StatusBadge status={item.status} />,
  },
]

export default function FeesPage() {
  const { user } = useAuth()
  const isStudent = user?.role === "student"

  if (isStudent) {
    const studentPayments = mockFeePayments.filter((p) => p.studentId === "st1")
    const totalPaid = studentPayments.filter((p) => p.status === "paid").reduce((a, b) => a + b.amount, 0)
    const totalPending = studentPayments.filter((p) => p.status !== "paid").reduce((a, b) => a + b.amount, 0)
    const feeStructure = mockFeeStructures[0]

    return (
      <div className="space-y-6">
        <PageHeader title="My Fees" description="View your fee details and payment history." />
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard title="Total Fee" value={formatCurrency(feeStructure?.totalFee || 0)} icon={IndianRupee} description="Semester 3" />
          <StatCard title="Amount Paid" value={formatCurrency(totalPaid)} icon={CheckCircle2} />
          <StatCard title="Pending" value={formatCurrency(totalPending)} icon={AlertTriangle} />
        </div>

        {/* Fee Breakdown */}
        {feeStructure && (
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-sm font-semibold text-foreground">Fee Breakdown - {feeStructure.courseName}</h3>
            <div className="mt-4 space-y-2">
              {[
                { label: "Tuition Fee", value: feeStructure.tuitionFee },
                { label: "Exam Fee", value: feeStructure.examFee },
                { label: "Library Fee", value: feeStructure.libraryFee },
                { label: "Lab Fee", value: feeStructure.labFee },
                { label: "Other Charges", value: feeStructure.otherFee },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between border-b border-border py-2 last:border-0">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm font-medium text-foreground">{formatCurrency(value)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-semibold text-foreground">Total</span>
                <span className="text-sm font-bold text-foreground">{formatCurrency(feeStructure.totalFee)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Payment History */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-foreground">Payment History</h3>
          <div className="mt-4 space-y-2">
            {studentPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">{payment.feeType}</p>
                  <p className="text-xs text-muted-foreground">{payment.paymentDate || "Not paid"}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{formatCurrency(payment.amount)}</span>
                  <StatusBadge status={payment.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Admin view
  const paid = mockFeePayments.filter((p) => p.status === "paid")
  const pending = mockFeePayments.filter((p) => p.status !== "paid")

  return (
    <div className="space-y-6">
      <PageHeader title="Fees & Finance" description="Manage fee structures, payments, and financial reports." />
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard title="Total Collected" value={formatCurrency(mockAdminStats.feeCollected)} icon={TrendingUp} trend={{ value: 12.5, label: "this sem" }} />
        <StatCard title="Pending Amount" value={formatCurrency(mockAdminStats.feePending)} icon={AlertTriangle} />
        <StatCard title="Paid Records" value={paid.length} icon={CheckCircle2} />
        <StatCard title="Pending Records" value={pending.length} icon={IndianRupee} />
      </div>
      <DataTable
        data={mockFeePayments as unknown as Record<string, unknown>[]}
        columns={paymentColumns as { key: string; title: string; sortable?: boolean; render?: (item: Record<string, unknown>) => React.ReactNode; className?: string }[]}
        searchKey="studentName"
        searchPlaceholder="Search by student name..."
        emptyMessage="No payment records found."
      />
    </div>
  )
}
