export type Role = "admin" | "teacher" | "student"

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
  department?: string
}

export interface Department {
  id: string
  name: string
  code: string
  hodId?: string
  studentsCount: number
  teachersCount: number
}

export interface Course {
  id: string
  name: string
  code: string
  departmentId: string
  departmentName: string
  semesters: number
  credits: number
}

export interface Subject {
  id: string
  name: string
  code: string
  courseId: string
  semester: number
  credits: number
  teacherId?: string
  teacherName?: string
}

export interface Student {
  id: string
  userId: string
  name: string
  email: string
  enrollmentNo: string
  departmentId: string
  departmentName: string
  courseId: string
  courseName: string
  semester: number
  section: string
  batch: string
  status: "active" | "graduated" | "suspended" | "dropped"
  attendancePercentage: number
  cgpa: number
  feesDue: number
  avatar?: string
  phone?: string
  guardianName?: string
  guardianPhone?: string
  address?: string
  dateOfBirth?: string
  admissionDate: string
}

export interface Teacher {
  id: string
  userId: string
  name: string
  email: string
  employeeId: string
  departmentId: string
  departmentName: string
  designation: string
  specialization: string
  subjects: string[]
  phone?: string
  avatar?: string
  joiningDate: string
  status: "active" | "on-leave" | "resigned"
}

export interface AttendanceRecord {
  id: string
  studentId: string
  studentName: string
  enrollmentNo: string
  subjectId: string
  subjectName: string
  date: string
  status: "present" | "absent" | "late" | "excused"
  markedBy: string
  markedAt: string
}

export interface Exam {
  id: string
  name: string
  type: "internal" | "external" | "midterm" | "final"
  subjectId: string
  subjectName: string
  courseId: string
  semester: number
  date: string
  totalMarks: number
  passingMarks: number
  status: "upcoming" | "ongoing" | "completed" | "results-published"
}

export interface MarksEntry {
  id: string
  examId: string
  studentId: string
  studentName: string
  enrollmentNo: string
  marksObtained: number
  totalMarks: number
  grade: string
  remarks?: string
}

export interface FeeStructure {
  id: string
  courseId: string
  courseName: string
  semester: number
  tuitionFee: number
  examFee: number
  libraryFee: number
  labFee: number
  otherFee: number
  totalFee: number
}

export interface FeePayment {
  id: string
  studentId: string
  studentName: string
  enrollmentNo: string
  amount: number
  feeType: string
  semester: number
  paymentDate: string
  paymentMethod: "cash" | "upi" | "bank-transfer" | "card"
  transactionId?: string
  status: "paid" | "pending" | "overdue" | "partial"
  receiptNo: string
}

export interface Assignment {
  id: string
  title: string
  description: string
  subjectId: string
  subjectName: string
  teacherId: string
  teacherName: string
  deadline: string
  totalMarks: number
  submissions: number
  totalStudents: number
  status: "active" | "closed" | "draft"
}

export interface Announcement {
  id: string
  title: string
  content: string
  author: string
  authorRole: Role
  targetRoles: Role[]
  department?: string
  priority: "low" | "normal" | "high" | "urgent"
  createdAt: string
  expiresAt?: string
}

export interface TimetableSlot {
  id: string
  day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday"
  startTime: string
  endTime: string
  subjectId: string
  subjectName: string
  teacherId: string
  teacherName: string
  room: string
  section: string
  courseId: string
}

export interface LeaveRequest {
  id: string
  userId: string
  userName: string
  role: Role
  type: "casual" | "medical" | "earned" | "duty"
  startDate: string
  endDate: string
  reason: string
  status: "pending" | "approved" | "rejected"
  appliedAt: string
  reviewedBy?: string
  reviewedAt?: string
}

export interface LibraryBook {
  id: string
  title: string
  author: string
  isbn: string
  category: string
  totalCopies: number
  availableCopies: number
  status: "available" | "issued" | "reserved"
}

export interface BookIssue {
  id: string
  bookId: string
  bookTitle: string
  studentId: string
  studentName: string
  issueDate: string
  dueDate: string
  returnDate?: string
  fine: number
  status: "issued" | "returned" | "overdue"
}

export interface DashboardStats {
  totalStudents: number
  totalTeachers: number
  totalCourses: number
  totalDepartments: number
  feeCollected: number
  feePending: number
  averageAttendance: number
  activeAssignments: number
}

export interface NavItem {
  title: string
  href: string
  icon: string
  badge?: string | number
  children?: NavItem[]
}
