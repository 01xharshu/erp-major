import type {
  User,
  Department,
  Course,
  Subject,
  Student,
  Teacher,
  AttendanceRecord,
  Exam,
  MarksEntry,
  FeePayment,
  Assignment,
  Announcement,
  TimetableSlot,
  LeaveRequest,
  LibraryBook,
  BookIssue,
  FeeStructure,
  DashboardStats,
} from "@/types"

// ============ USERS ============
export const mockUsers: User[] = [
  { id: "u1", name: "Dr. Rajesh Kumar", email: "admin@college.edu", role: "admin", department: "Administration" },
  { id: "u2", name: "Prof. Anita Sharma", email: "anita@college.edu", role: "teacher", department: "Computer Science" },
  { id: "u3", name: "Rahul Verma", email: "rahul@college.edu", role: "student", department: "Computer Science" },
  { id: "u4", name: "Prof. Vikram Singh", email: "vikram@college.edu", role: "teacher", department: "Mechanical Engineering" },
  { id: "u5", name: "Priya Patel", email: "priya@college.edu", role: "student", department: "Computer Science" },
]

// ============ DEPARTMENTS ============
export const mockDepartments: Department[] = [
  { id: "d1", name: "Computer Science", code: "CS", hodId: "t1", studentsCount: 240, teachersCount: 18 },
  { id: "d2", name: "Mechanical Engineering", code: "ME", hodId: "t4", studentsCount: 180, teachersCount: 14 },
  { id: "d3", name: "Electronics & Communication", code: "EC", hodId: "t6", studentsCount: 160, teachersCount: 12 },
  { id: "d4", name: "Civil Engineering", code: "CE", studentsCount: 120, teachersCount: 10 },
  { id: "d5", name: "Business Administration", code: "BA", studentsCount: 200, teachersCount: 15 },
]

// ============ COURSES ============
export const mockCourses: Course[] = [
  { id: "c1", name: "B.Tech Computer Science", code: "BTCS", departmentId: "d1", departmentName: "Computer Science", semesters: 8, credits: 180 },
  { id: "c2", name: "B.Tech Mechanical", code: "BTME", departmentId: "d2", departmentName: "Mechanical Engineering", semesters: 8, credits: 180 },
  { id: "c3", name: "B.Tech ECE", code: "BTEC", departmentId: "d3", departmentName: "Electronics & Communication", semesters: 8, credits: 180 },
  { id: "c4", name: "B.Tech Civil", code: "BTCE", departmentId: "d4", departmentName: "Civil Engineering", semesters: 8, credits: 180 },
  { id: "c5", name: "BBA", code: "BBA", departmentId: "d5", departmentName: "Business Administration", semesters: 6, credits: 140 },
]

// ============ SUBJECTS ============
export const mockSubjects: Subject[] = [
  { id: "s1", name: "Data Structures & Algorithms", code: "CS301", courseId: "c1", semester: 3, credits: 4, teacherId: "t1", teacherName: "Prof. Anita Sharma" },
  { id: "s2", name: "Database Management Systems", code: "CS302", courseId: "c1", semester: 3, credits: 4, teacherId: "t2", teacherName: "Prof. Suresh Gupta" },
  { id: "s3", name: "Operating Systems", code: "CS303", courseId: "c1", semester: 3, credits: 3, teacherId: "t3", teacherName: "Prof. Meena Joshi" },
  { id: "s4", name: "Computer Networks", code: "CS304", courseId: "c1", semester: 4, credits: 4, teacherId: "t1", teacherName: "Prof. Anita Sharma" },
  { id: "s5", name: "Thermodynamics", code: "ME201", courseId: "c2", semester: 3, credits: 4, teacherId: "t4", teacherName: "Prof. Vikram Singh" },
  { id: "s6", name: "Digital Electronics", code: "EC201", courseId: "c3", semester: 3, credits: 3, teacherId: "t6", teacherName: "Prof. Deepa Rao" },
]

// ============ STUDENTS ============
export const mockStudents: Student[] = [
  { id: "st1", userId: "u3", name: "Rahul Verma", email: "rahul@college.edu", enrollmentNo: "2023CS001", departmentId: "d1", departmentName: "Computer Science", courseId: "c1", courseName: "B.Tech Computer Science", semester: 3, section: "A", batch: "2023-27", status: "active", attendancePercentage: 87, cgpa: 8.4, feesDue: 15000, phone: "9876543210", guardianName: "Suresh Verma", guardianPhone: "9876543211", admissionDate: "2023-08-01" },
  { id: "st2", userId: "u5", name: "Priya Patel", email: "priya@college.edu", enrollmentNo: "2023CS002", departmentId: "d1", departmentName: "Computer Science", courseId: "c1", courseName: "B.Tech Computer Science", semester: 3, section: "A", batch: "2023-27", status: "active", attendancePercentage: 92, cgpa: 9.1, feesDue: 0, phone: "9876543212", guardianName: "Amit Patel", guardianPhone: "9876543213", admissionDate: "2023-08-01" },
  { id: "st3", userId: "u6", name: "Arun Kumar", email: "arun@college.edu", enrollmentNo: "2023CS003", departmentId: "d1", departmentName: "Computer Science", courseId: "c1", courseName: "B.Tech Computer Science", semester: 3, section: "B", batch: "2023-27", status: "active", attendancePercentage: 73, cgpa: 7.2, feesDue: 45000, phone: "9876543214", guardianName: "Ramesh Kumar", guardianPhone: "9876543215", admissionDate: "2023-08-01" },
  { id: "st4", userId: "u7", name: "Sneha Reddy", email: "sneha@college.edu", enrollmentNo: "2023CS004", departmentId: "d1", departmentName: "Computer Science", courseId: "c1", courseName: "B.Tech Computer Science", semester: 3, section: "B", batch: "2023-27", status: "active", attendancePercentage: 95, cgpa: 9.5, feesDue: 0, phone: "9876543216", guardianName: "Venkat Reddy", guardianPhone: "9876543217", admissionDate: "2023-08-01" },
  { id: "st5", userId: "u8", name: "Karan Malhotra", email: "karan@college.edu", enrollmentNo: "2023ME001", departmentId: "d2", departmentName: "Mechanical Engineering", courseId: "c2", courseName: "B.Tech Mechanical", semester: 3, section: "A", batch: "2023-27", status: "active", attendancePercentage: 81, cgpa: 7.8, feesDue: 25000, phone: "9876543218", guardianName: "Raj Malhotra", guardianPhone: "9876543219", admissionDate: "2023-08-01" },
  { id: "st6", userId: "u9", name: "Nisha Jain", email: "nisha@college.edu", enrollmentNo: "2023EC001", departmentId: "d3", departmentName: "Electronics & Communication", courseId: "c3", courseName: "B.Tech ECE", semester: 3, section: "A", batch: "2023-27", status: "active", attendancePercentage: 89, cgpa: 8.7, feesDue: 0, phone: "9876543220", guardianName: "Praveen Jain", guardianPhone: "9876543221", admissionDate: "2023-08-01" },
]

// ============ TEACHERS ============
export const mockTeachers: Teacher[] = [
  { id: "t1", userId: "u2", name: "Prof. Anita Sharma", email: "anita@college.edu", employeeId: "EMP001", departmentId: "d1", departmentName: "Computer Science", designation: "Associate Professor", specialization: "Algorithms & Data Structures", subjects: ["CS301", "CS304"], phone: "9876543230", joiningDate: "2015-07-01", status: "active" },
  { id: "t2", userId: "u10", name: "Prof. Suresh Gupta", email: "suresh@college.edu", employeeId: "EMP002", departmentId: "d1", departmentName: "Computer Science", designation: "Assistant Professor", specialization: "Database Systems", subjects: ["CS302"], phone: "9876543231", joiningDate: "2018-01-15", status: "active" },
  { id: "t3", userId: "u11", name: "Prof. Meena Joshi", email: "meena@college.edu", employeeId: "EMP003", departmentId: "d1", departmentName: "Computer Science", designation: "Professor", specialization: "Operating Systems", subjects: ["CS303"], phone: "9876543232", joiningDate: "2010-08-01", status: "active" },
  { id: "t4", userId: "u4", name: "Prof. Vikram Singh", email: "vikram@college.edu", employeeId: "EMP004", departmentId: "d2", departmentName: "Mechanical Engineering", designation: "Professor & HOD", specialization: "Thermodynamics", subjects: ["ME201"], phone: "9876543233", joiningDate: "2008-07-01", status: "active" },
  { id: "t5", userId: "u12", name: "Prof. Kavita Nair", email: "kavita@college.edu", employeeId: "EMP005", departmentId: "d2", departmentName: "Mechanical Engineering", designation: "Assistant Professor", specialization: "Fluid Mechanics", subjects: ["ME202"], phone: "9876543234", joiningDate: "2019-06-01", status: "active" },
  { id: "t6", userId: "u13", name: "Prof. Deepa Rao", email: "deepa@college.edu", employeeId: "EMP006", departmentId: "d3", departmentName: "Electronics & Communication", designation: "Associate Professor & HOD", specialization: "VLSI Design", subjects: ["EC201"], phone: "9876543235", joiningDate: "2012-01-10", status: "active" },
]

// ============ ATTENDANCE ============
export const mockAttendanceRecords: AttendanceRecord[] = [
  { id: "a1", studentId: "st1", studentName: "Rahul Verma", enrollmentNo: "2023CS001", subjectId: "s1", subjectName: "Data Structures & Algorithms", date: "2026-02-07", status: "present", markedBy: "t1", markedAt: "2026-02-07T09:15:00" },
  { id: "a2", studentId: "st2", studentName: "Priya Patel", enrollmentNo: "2023CS002", subjectId: "s1", subjectName: "Data Structures & Algorithms", date: "2026-02-07", status: "present", markedBy: "t1", markedAt: "2026-02-07T09:15:00" },
  { id: "a3", studentId: "st3", studentName: "Arun Kumar", enrollmentNo: "2023CS003", subjectId: "s1", subjectName: "Data Structures & Algorithms", date: "2026-02-07", status: "absent", markedBy: "t1", markedAt: "2026-02-07T09:15:00" },
  { id: "a4", studentId: "st4", studentName: "Sneha Reddy", enrollmentNo: "2023CS004", subjectId: "s1", subjectName: "Data Structures & Algorithms", date: "2026-02-07", status: "present", markedBy: "t1", markedAt: "2026-02-07T09:15:00" },
  { id: "a5", studentId: "st1", studentName: "Rahul Verma", enrollmentNo: "2023CS001", subjectId: "s2", subjectName: "Database Management Systems", date: "2026-02-07", status: "late", markedBy: "t2", markedAt: "2026-02-07T11:05:00" },
  { id: "a6", studentId: "st2", studentName: "Priya Patel", enrollmentNo: "2023CS002", subjectId: "s2", subjectName: "Database Management Systems", date: "2026-02-07", status: "present", markedBy: "t2", markedAt: "2026-02-07T11:05:00" },
]

// ============ EXAMS ============
export const mockExams: Exam[] = [
  { id: "e1", name: "Mid-Semester Exam - DSA", type: "midterm", subjectId: "s1", subjectName: "Data Structures & Algorithms", courseId: "c1", semester: 3, date: "2026-03-15", totalMarks: 50, passingMarks: 20, status: "upcoming" },
  { id: "e2", name: "Internal Test 1 - DBMS", type: "internal", subjectId: "s2", subjectName: "Database Management Systems", courseId: "c1", semester: 3, date: "2026-02-20", totalMarks: 25, passingMarks: 10, status: "upcoming" },
  { id: "e3", name: "End Semester - OS", type: "final", subjectId: "s3", subjectName: "Operating Systems", courseId: "c1", semester: 3, date: "2026-05-10", totalMarks: 100, passingMarks: 40, status: "upcoming" },
  { id: "e4", name: "Internal Test 1 - DSA", type: "internal", subjectId: "s1", subjectName: "Data Structures & Algorithms", courseId: "c1", semester: 3, date: "2026-01-25", totalMarks: 25, passingMarks: 10, status: "results-published" },
]

// ============ MARKS ============
export const mockMarksEntries: MarksEntry[] = [
  { id: "m1", examId: "e4", studentId: "st1", studentName: "Rahul Verma", enrollmentNo: "2023CS001", marksObtained: 20, totalMarks: 25, grade: "A", remarks: "Good" },
  { id: "m2", examId: "e4", studentId: "st2", studentName: "Priya Patel", enrollmentNo: "2023CS002", marksObtained: 23, totalMarks: 25, grade: "A+", remarks: "Excellent" },
  { id: "m3", examId: "e4", studentId: "st3", studentName: "Arun Kumar", enrollmentNo: "2023CS003", marksObtained: 14, totalMarks: 25, grade: "B", remarks: "Can improve" },
  { id: "m4", examId: "e4", studentId: "st4", studentName: "Sneha Reddy", enrollmentNo: "2023CS004", marksObtained: 24, totalMarks: 25, grade: "A+", remarks: "Outstanding" },
]

// ============ FEE STRUCTURES ============
export const mockFeeStructures: FeeStructure[] = [
  { id: "fs1", courseId: "c1", courseName: "B.Tech Computer Science", semester: 3, tuitionFee: 50000, examFee: 3000, libraryFee: 2000, labFee: 5000, otherFee: 5000, totalFee: 65000 },
  { id: "fs2", courseId: "c2", courseName: "B.Tech Mechanical", semester: 3, tuitionFee: 45000, examFee: 3000, libraryFee: 2000, labFee: 8000, otherFee: 5000, totalFee: 63000 },
  { id: "fs3", courseId: "c3", courseName: "B.Tech ECE", semester: 3, tuitionFee: 48000, examFee: 3000, libraryFee: 2000, labFee: 7000, otherFee: 5000, totalFee: 65000 },
]

// ============ FEE PAYMENTS ============
export const mockFeePayments: FeePayment[] = [
  { id: "fp1", studentId: "st1", studentName: "Rahul Verma", enrollmentNo: "2023CS001", amount: 50000, feeType: "Tuition Fee", semester: 3, paymentDate: "2026-01-15", paymentMethod: "upi", transactionId: "TXN001", status: "paid", receiptNo: "RCP-2026-001" },
  { id: "fp2", studentId: "st1", studentName: "Rahul Verma", enrollmentNo: "2023CS001", amount: 15000, feeType: "Lab & Other Fee", semester: 3, paymentDate: "", paymentMethod: "upi", status: "pending", receiptNo: "" },
  { id: "fp3", studentId: "st2", studentName: "Priya Patel", enrollmentNo: "2023CS002", amount: 65000, feeType: "Full Semester Fee", semester: 3, paymentDate: "2026-01-10", paymentMethod: "bank-transfer", transactionId: "TXN002", status: "paid", receiptNo: "RCP-2026-002" },
  { id: "fp4", studentId: "st3", studentName: "Arun Kumar", enrollmentNo: "2023CS003", amount: 45000, feeType: "Partial Payment", semester: 3, paymentDate: "2026-01-20", paymentMethod: "card", transactionId: "TXN003", status: "partial", receiptNo: "RCP-2026-003" },
  { id: "fp5", studentId: "st5", studentName: "Karan Malhotra", enrollmentNo: "2023ME001", amount: 63000, feeType: "Full Semester Fee", semester: 3, paymentDate: "", paymentMethod: "upi", status: "overdue", receiptNo: "" },
]

// ============ ASSIGNMENTS ============
export const mockAssignments: Assignment[] = [
  { id: "as1", title: "Implement Binary Search Tree", description: "Write a complete BST implementation with insert, delete, and traversal operations.", subjectId: "s1", subjectName: "Data Structures & Algorithms", teacherId: "t1", teacherName: "Prof. Anita Sharma", deadline: "2026-02-15", totalMarks: 20, submissions: 28, totalStudents: 45, status: "active" },
  { id: "as2", title: "ER Diagram for Library System", description: "Design an ER diagram for a complete library management system.", subjectId: "s2", subjectName: "Database Management Systems", teacherId: "t2", teacherName: "Prof. Suresh Gupta", deadline: "2026-02-10", totalMarks: 15, submissions: 42, totalStudents: 45, status: "active" },
  { id: "as3", title: "Process Scheduling Simulation", description: "Simulate FCFS, SJF, and Round Robin scheduling algorithms.", subjectId: "s3", subjectName: "Operating Systems", teacherId: "t3", teacherName: "Prof. Meena Joshi", deadline: "2026-02-25", totalMarks: 25, submissions: 10, totalStudents: 45, status: "active" },
  { id: "as4", title: "SQL Queries Assignment", description: "Write SQL queries for given scenarios using joins, subqueries, and aggregations.", subjectId: "s2", subjectName: "Database Management Systems", teacherId: "t2", teacherName: "Prof. Suresh Gupta", deadline: "2026-01-30", totalMarks: 10, submissions: 45, totalStudents: 45, status: "closed" },
]

// ============ ANNOUNCEMENTS ============
export const mockAnnouncements: Announcement[] = [
  { id: "an1", title: "Mid-Semester Exam Schedule Released", content: "The mid-semester examination schedule for all departments has been published. Please check the exam portal for detailed timetable.", author: "Dr. Rajesh Kumar", authorRole: "admin", targetRoles: ["student", "teacher", "admin"], priority: "high", createdAt: "2026-02-05T10:00:00" },
  { id: "an2", title: "Annual Sports Day - Registration Open", content: "Register for the annual sports day events by Feb 20. Events include cricket, football, athletics, and indoor games.", author: "Dr. Rajesh Kumar", authorRole: "admin", targetRoles: ["student", "teacher"], priority: "normal", createdAt: "2026-02-04T14:00:00" },
  { id: "an3", title: "Library Working Hours Extended", content: "The central library will remain open until 10 PM during the exam period starting from March 1.", author: "Dr. Rajesh Kumar", authorRole: "admin", targetRoles: ["student", "teacher"], priority: "normal", createdAt: "2026-02-03T09:00:00" },
  { id: "an4", title: "Fee Payment Reminder", content: "Students with pending fees are requested to clear their dues before February 28 to avoid late fee charges.", author: "Dr. Rajesh Kumar", authorRole: "admin", targetRoles: ["student"], priority: "urgent", createdAt: "2026-02-06T11:00:00" },
]

// ============ TIMETABLE ============
export const mockTimetable: TimetableSlot[] = [
  { id: "tt1", day: "monday", startTime: "09:00", endTime: "10:00", subjectId: "s1", subjectName: "Data Structures & Algorithms", teacherId: "t1", teacherName: "Prof. Anita Sharma", room: "CS-101", section: "A", courseId: "c1" },
  { id: "tt2", day: "monday", startTime: "10:00", endTime: "11:00", subjectId: "s2", subjectName: "Database Management Systems", teacherId: "t2", teacherName: "Prof. Suresh Gupta", room: "CS-102", section: "A", courseId: "c1" },
  { id: "tt3", day: "monday", startTime: "11:30", endTime: "12:30", subjectId: "s3", subjectName: "Operating Systems", teacherId: "t3", teacherName: "Prof. Meena Joshi", room: "CS-103", section: "A", courseId: "c1" },
  { id: "tt4", day: "tuesday", startTime: "09:00", endTime: "10:00", subjectId: "s3", subjectName: "Operating Systems", teacherId: "t3", teacherName: "Prof. Meena Joshi", room: "CS-103", section: "A", courseId: "c1" },
  { id: "tt5", day: "tuesday", startTime: "10:00", endTime: "11:00", subjectId: "s1", subjectName: "Data Structures & Algorithms", teacherId: "t1", teacherName: "Prof. Anita Sharma", room: "CS-101", section: "A", courseId: "c1" },
  { id: "tt6", day: "tuesday", startTime: "11:30", endTime: "13:30", subjectId: "s1", subjectName: "DSA Lab", teacherId: "t1", teacherName: "Prof. Anita Sharma", room: "Lab-1", section: "A", courseId: "c1" },
  { id: "tt7", day: "wednesday", startTime: "09:00", endTime: "10:00", subjectId: "s2", subjectName: "Database Management Systems", teacherId: "t2", teacherName: "Prof. Suresh Gupta", room: "CS-102", section: "A", courseId: "c1" },
  { id: "tt8", day: "wednesday", startTime: "10:00", endTime: "11:00", subjectId: "s3", subjectName: "Operating Systems", teacherId: "t3", teacherName: "Prof. Meena Joshi", room: "CS-103", section: "A", courseId: "c1" },
  { id: "tt9", day: "thursday", startTime: "09:00", endTime: "10:00", subjectId: "s1", subjectName: "Data Structures & Algorithms", teacherId: "t1", teacherName: "Prof. Anita Sharma", room: "CS-101", section: "A", courseId: "c1" },
  { id: "tt10", day: "thursday", startTime: "10:00", endTime: "12:00", subjectId: "s2", subjectName: "DBMS Lab", teacherId: "t2", teacherName: "Prof. Suresh Gupta", room: "Lab-2", section: "A", courseId: "c1" },
  { id: "tt11", day: "friday", startTime: "09:00", endTime: "10:00", subjectId: "s2", subjectName: "Database Management Systems", teacherId: "t2", teacherName: "Prof. Suresh Gupta", room: "CS-102", section: "A", courseId: "c1" },
  { id: "tt12", day: "friday", startTime: "10:00", endTime: "11:00", subjectId: "s1", subjectName: "Data Structures & Algorithms", teacherId: "t1", teacherName: "Prof. Anita Sharma", room: "CS-101", section: "A", courseId: "c1" },
]

// ============ LEAVE REQUESTS ============
export const mockLeaveRequests: LeaveRequest[] = [
  { id: "lr1", userId: "u2", userName: "Prof. Anita Sharma", role: "teacher", type: "casual", startDate: "2026-02-10", endDate: "2026-02-11", reason: "Personal work", status: "pending", appliedAt: "2026-02-06T08:00:00" },
  { id: "lr2", userId: "u3", userName: "Rahul Verma", role: "student", type: "medical", startDate: "2026-02-03", endDate: "2026-02-05", reason: "Medical appointment", status: "approved", appliedAt: "2026-02-02T10:00:00", reviewedBy: "Dr. Rajesh Kumar", reviewedAt: "2026-02-02T14:00:00" },
]

// ============ LIBRARY ============
export const mockLibraryBooks: LibraryBook[] = [
  { id: "lb1", title: "Introduction to Algorithms", author: "Thomas H. Cormen", isbn: "978-0262033848", category: "Computer Science", totalCopies: 10, availableCopies: 6, status: "available" },
  { id: "lb2", title: "Database System Concepts", author: "Abraham Silberschatz", isbn: "978-0078022159", category: "Computer Science", totalCopies: 8, availableCopies: 3, status: "available" },
  { id: "lb3", title: "Operating System Concepts", author: "Abraham Silberschatz", isbn: "978-1119800361", category: "Computer Science", totalCopies: 6, availableCopies: 0, status: "issued" },
  { id: "lb4", title: "Engineering Mechanics", author: "R.C. Hibbeler", isbn: "978-0133918922", category: "Mechanical", totalCopies: 5, availableCopies: 2, status: "available" },
  { id: "lb5", title: "Digital Design", author: "M. Morris Mano", isbn: "978-0134549897", category: "Electronics", totalCopies: 7, availableCopies: 4, status: "available" },
]

export const mockBookIssues: BookIssue[] = [
  { id: "bi1", bookId: "lb1", bookTitle: "Introduction to Algorithms", studentId: "st1", studentName: "Rahul Verma", issueDate: "2026-01-20", dueDate: "2026-02-20", fine: 0, status: "issued" },
  { id: "bi2", bookId: "lb3", bookTitle: "Operating System Concepts", studentId: "st2", studentName: "Priya Patel", issueDate: "2026-01-15", dueDate: "2026-02-15", fine: 0, status: "issued" },
  { id: "bi3", bookId: "lb2", bookTitle: "Database System Concepts", studentId: "st3", studentName: "Arun Kumar", issueDate: "2025-12-20", dueDate: "2026-01-20", returnDate: "2026-01-25", fine: 50, status: "returned" },
]

// ============ DASHBOARD STATS ============
export const mockAdminStats: DashboardStats = {
  totalStudents: 900,
  totalTeachers: 69,
  totalCourses: 5,
  totalDepartments: 5,
  feeCollected: 28500000,
  feePending: 4200000,
  averageAttendance: 84,
  activeAssignments: 12,
}

// ============ ATTENDANCE CHART DATA ============
export const attendanceChartData = [
  { month: "Sep", attendance: 89 },
  { month: "Oct", attendance: 85 },
  { month: "Nov", attendance: 82 },
  { month: "Dec", attendance: 78 },
  { month: "Jan", attendance: 84 },
  { month: "Feb", attendance: 87 },
]

// ============ FEE COLLECTION CHART DATA ============
export const feeCollectionChartData = [
  { month: "Sep", collected: 4800000, pending: 800000 },
  { month: "Oct", collected: 5200000, pending: 650000 },
  { month: "Nov", collected: 4600000, pending: 900000 },
  { month: "Dec", collected: 5100000, pending: 700000 },
  { month: "Jan", collected: 4900000, pending: 750000 },
  { month: "Feb", collected: 3900000, pending: 400000 },
]

// ============ DEPARTMENT STUDENT DISTRIBUTION ============
export const departmentDistribution = [
  { name: "CS", students: 240, fill: "hsl(var(--chart-1))" },
  { name: "ME", students: 180, fill: "hsl(var(--chart-2))" },
  { name: "EC", students: 160, fill: "hsl(var(--chart-3))" },
  { name: "CE", students: 120, fill: "hsl(var(--chart-4))" },
  { name: "BA", students: 200, fill: "hsl(var(--chart-5))" },
]
