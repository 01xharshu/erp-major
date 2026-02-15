import { StatusBadge } from "@/components/status-badge"
import { formatCurrency } from "@/lib/utils"
import type { Student, Teacher, Department, Course, Announcement, Assignment, AttendanceRecord, FeePayment } from "@/types"

// Generic column definition type
export interface ColumnDef {
  key: string
  title: string
  sortable?: boolean
  render?: (item: Record<string, unknown>) => React.ReactNode
  className?: string
}

// Students table columns
export const studentColumns: ColumnDef[] = [
  {
    key: "enrollmentNo",
    title: "Enrollment No",
    sortable: true,
    render: (item) => <span className="font-mono text-xs">{(item as Student).enrollmentNo}</span>,
  },
  {
    key: "name",
    title: "Name",
    sortable: true,
    render: (item) => (
      <div>
        <p className="font-medium text-foreground">{(item as Student).name}</p>
        <p className="text-xs text-muted-foreground">{(item as Student).email}</p>
      </div>
    ),
  },
  {
    key: "courseName",
    title: "Course",
    render: (item) => (
      <div>
        <p className="text-foreground">{(item as Student).courseName}</p>
        <p className="text-xs text-muted-foreground">Sem {(item as Student).semester} - Sec {(item as Student).section}</p>
      </div>
    ),
  },
  {
    key: "attendancePercentage",
    title: "Attendance",
    sortable: true,
    render: (item) => (
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-16 rounded-full bg-muted">
          <div
            className="h-full rounded-full"
            style={{
              width: `${(item as Student).attendancePercentage}%`,
              backgroundColor: (item as Student).attendancePercentage >= 75 ? "hsl(var(--success))" : "hsl(var(--destructive))",
            }}
          />
        </div>
        <span className="text-xs">{(item as Student).attendancePercentage}%</span>
      </div>
    ),
  },
  {
    key: "cgpa",
    title: "CGPA",
    sortable: true,
    render: (item) => <span className="font-medium">{((item as Student).cgpa).toFixed(1)}</span>,
  },
  {
    key: "feesDue",
    title: "Fees Due",
    sortable: true,
    render: (item) => (
      <span className={(item as Student).feesDue > 0 ? "text-destructive" : "text-success"}>
        {(item as Student).feesDue > 0 ? formatCurrency((item as Student).feesDue) : "Paid"}
      </span>
    ),
  },
  {
    key: "status",
    title: "Status",
    render: (item) => <StatusBadge status={(item as Student).status} />,
  },
]

// Teachers table columns
export const teacherColumns: ColumnDef[] = [
  {
    key: "employeeId",
    title: "Employee ID",
    render: (item) => <span className="font-mono text-xs">{(item as Teacher).employeeId}</span>,
  },
  {
    key: "name",
    title: "Name",
    sortable: true,
    render: (item) => (
      <div>
        <p className="font-medium text-foreground">{(item as Teacher).name}</p>
        <p className="text-xs text-muted-foreground">{(item as Teacher).email}</p>
      </div>
    ),
  },
  {
    key: "departmentName",
    title: "Department",
    sortable: true,
  },
  {
    key: "designation",
    title: "Designation",
  },
  {
    key: "specialization",
    title: "Specialization",
    render: (item) => <span className="text-xs">{(item as Teacher).specialization}</span>,
  },
  {
    key: "subjects",
    title: "Subjects",
    render: (item) => (
      <div className="flex flex-wrap gap-1">
        {(item as Teacher).subjects.map((s) => (
          <span key={s} className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium">{s}</span>
        ))}
      </div>
    ),
  },
  {
    key: "status",
    title: "Status",
    render: (item) => <StatusBadge status={(item as Teacher).status} />,
  },
]

// Departments table columns
export const departmentColumns: ColumnDef[] = [
  {
    key: "name",
    title: "Department Name",
    sortable: true,
  },
  {
    key: "code",
    title: "Code",
    render: (item) => <span className="font-mono font-bold">{(item as Department).code}</span>,
  },
  {
    key: "studentsCount",
    title: "Students",
    sortable: true,
  },
  {
    key: "teachersCount",
    title: "Faculty",
    sortable: true,
  },
]

// Courses table columns
export const courseColumns: ColumnDef[] = [
  {
    key: "name",
    title: "Course Name",
    sortable: true,
  },
  {
    key: "code",
    title: "Code",
    render: (item) => <span className="font-mono font-bold">{(item as Course).code}</span>,
  },
  {
    key: "departmentName",
    title: "Department",
    sortable: true,
  },
  {
    key: "semesters",
    title: "Duration",
    render: (item) => <span>{(item as Course).semesters} Semesters</span>,
  },
  {
    key: "credits",
    title: "Credits",
  },
]

// Announcements table columns
export const announcementColumns: ColumnDef[] = [
  {
    key: "title",
    title: "Title",
    sortable: true,
  },
  {
    key: "content",
    title: "Message",
    render: (item) => <span className="line-clamp-2 text-sm">{(item as Announcement).content}</span>,
  },
  {
    key: "priority",
    title: "Priority",
    render: (item) => <StatusBadge status={(item as Announcement).priority} />,
  },
  {
    key: "createdAt",
    title: "Date",
    render: (item) => <span className="text-xs">{new Date((item as Announcement).createdAt).toLocaleDateString()}</span>,
  },
]

// Assignments table columns
export const assignmentColumns: ColumnDef[] = [
  {
    key: "title",
    title: "Title",
    sortable: true,
  },
  {
    key: "subjectName",
    title: "Subject",
  },
  {
    key: "dueDate",
    title: "Due Date",
    render: (item) => <span className="text-xs">{new Date((item as Assignment).dueDate).toLocaleDateString()}</span>,
  },
  {
    key: "status",
    title: "Status",
    render: (item) => <StatusBadge status={(item as Assignment).status} />,
  },
]

// Attendance table columns
export const attendanceColumns: ColumnDef[] = [
  {
    key: "studentName",
    title: "Student Name",
    sortable: true,
  },
  {
    key: "subjectName",
    title: "Subject",
  },
  {
    key: "date",
    title: "Date",
    render: (item) => <span className="text-xs">{new Date((item as AttendanceRecord).date).toLocaleDateString()}</span>,
  },
  {
    key: "status",
    title: "Status",
    render: (item) => <StatusBadge status={(item as AttendanceRecord).status} />,
  },
]

// Fees table columns
export const feesColumns: ColumnDef[] = [
  {
    key: "studentName",
    title: "Student Name",
    sortable: true,
  },
  {
    key: "enrollmentNo",
    title: "Enrollment No",
  },
  {
    key: "amount",
    title: "Amount",
    render: (item) => <span>{formatCurrency((item as FeePayment).amount)}</span>,
  },
  {
    key: "status",
    title: "Status",
    render: (item) => <StatusBadge status={(item as FeePayment).status} />,
  },
  {
    key: "dueDate",
    title: "Due Date",
    render: (item) => <span className="text-xs">{new Date((item as FeePayment).dueDate).toLocaleDateString()}</span>,
  },
]
