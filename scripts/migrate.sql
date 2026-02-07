-- CampusFlow ERP Database Schema
-- Run this on your Aiven PostgreSQL to create all tables

-- ============ USERS ============
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL DEFAULT '$2b$10$placeholder',
  role TEXT NOT NULL CHECK (role IN ('admin', 'teacher', 'student')),
  avatar TEXT DEFAULT '',
  department TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============ DEPARTMENTS ============
CREATE TABLE IF NOT EXISTS departments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  hod_id TEXT,
  students_count INTEGER DEFAULT 0,
  teachers_count INTEGER DEFAULT 0
);

-- ============ COURSES ============
CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  department_id TEXT REFERENCES departments(id),
  department_name TEXT NOT NULL,
  semesters INTEGER NOT NULL,
  credits INTEGER NOT NULL
);

-- ============ SUBJECTS ============
CREATE TABLE IF NOT EXISTS subjects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  course_id TEXT REFERENCES courses(id),
  semester INTEGER NOT NULL,
  credits INTEGER NOT NULL,
  teacher_id TEXT,
  teacher_name TEXT DEFAULT ''
);

-- ============ STUDENTS ============
CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  enrollment_no TEXT UNIQUE NOT NULL,
  department_id TEXT REFERENCES departments(id),
  department_name TEXT NOT NULL,
  course_id TEXT REFERENCES courses(id),
  course_name TEXT NOT NULL,
  semester INTEGER NOT NULL,
  section TEXT DEFAULT 'A',
  batch TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'graduated', 'suspended', 'dropped')),
  attendance_percentage NUMERIC DEFAULT 0,
  cgpa NUMERIC DEFAULT 0,
  fees_due NUMERIC DEFAULT 0,
  phone TEXT DEFAULT '',
  guardian_name TEXT DEFAULT '',
  guardian_phone TEXT DEFAULT '',
  address TEXT DEFAULT '',
  date_of_birth TEXT DEFAULT '',
  admission_date TEXT NOT NULL
);

-- ============ TEACHERS ============
CREATE TABLE IF NOT EXISTS teachers (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  employee_id TEXT UNIQUE NOT NULL,
  department_id TEXT REFERENCES departments(id),
  department_name TEXT NOT NULL,
  designation TEXT NOT NULL,
  specialization TEXT DEFAULT '',
  subjects TEXT[] DEFAULT '{}',
  phone TEXT DEFAULT '',
  joining_date TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'on-leave', 'resigned'))
);

-- ============ ATTENDANCE ============
CREATE TABLE IF NOT EXISTS attendance (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES students(id),
  student_name TEXT NOT NULL,
  enrollment_no TEXT NOT NULL,
  subject_id TEXT REFERENCES subjects(id),
  subject_name TEXT NOT NULL,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused')),
  marked_by TEXT NOT NULL,
  marked_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============ EXAMS ============
CREATE TABLE IF NOT EXISTS exams (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('internal', 'external', 'midterm', 'final')),
  subject_id TEXT REFERENCES subjects(id),
  subject_name TEXT NOT NULL,
  course_id TEXT REFERENCES courses(id),
  semester INTEGER NOT NULL,
  date DATE NOT NULL,
  total_marks INTEGER NOT NULL,
  passing_marks INTEGER NOT NULL,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'results-published'))
);

-- ============ MARKS ============
CREATE TABLE IF NOT EXISTS marks (
  id TEXT PRIMARY KEY,
  exam_id TEXT REFERENCES exams(id),
  student_id TEXT REFERENCES students(id),
  student_name TEXT NOT NULL,
  enrollment_no TEXT NOT NULL,
  marks_obtained NUMERIC NOT NULL,
  total_marks INTEGER NOT NULL,
  grade TEXT DEFAULT '',
  remarks TEXT DEFAULT ''
);

-- ============ FEE STRUCTURES ============
CREATE TABLE IF NOT EXISTS fee_structures (
  id TEXT PRIMARY KEY,
  course_id TEXT REFERENCES courses(id),
  course_name TEXT NOT NULL,
  semester INTEGER NOT NULL,
  tuition_fee NUMERIC DEFAULT 0,
  exam_fee NUMERIC DEFAULT 0,
  library_fee NUMERIC DEFAULT 0,
  lab_fee NUMERIC DEFAULT 0,
  other_fee NUMERIC DEFAULT 0,
  total_fee NUMERIC DEFAULT 0
);

-- ============ FEE PAYMENTS ============
CREATE TABLE IF NOT EXISTS fee_payments (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES students(id),
  student_name TEXT NOT NULL,
  enrollment_no TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  fee_type TEXT NOT NULL,
  semester INTEGER NOT NULL,
  payment_date TEXT DEFAULT '',
  payment_method TEXT DEFAULT 'upi' CHECK (payment_method IN ('cash', 'upi', 'bank-transfer', 'card')),
  transaction_id TEXT DEFAULT '',
  status TEXT DEFAULT 'pending' CHECK (status IN ('paid', 'pending', 'overdue', 'partial')),
  receipt_no TEXT DEFAULT ''
);

-- ============ ASSIGNMENTS ============
CREATE TABLE IF NOT EXISTS assignments (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  subject_id TEXT REFERENCES subjects(id),
  subject_name TEXT NOT NULL,
  teacher_id TEXT,
  teacher_name TEXT NOT NULL,
  deadline DATE NOT NULL,
  total_marks INTEGER DEFAULT 0,
  submissions INTEGER DEFAULT 0,
  total_students INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'draft'))
);

-- ============ ANNOUNCEMENTS ============
CREATE TABLE IF NOT EXISTS announcements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  author_role TEXT NOT NULL,
  target_roles TEXT[] DEFAULT '{}',
  department TEXT DEFAULT '',
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

-- ============ TIMETABLE ============
CREATE TABLE IF NOT EXISTS timetable (
  id TEXT PRIMARY KEY,
  day TEXT NOT NULL CHECK (day IN ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday')),
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  subject_id TEXT REFERENCES subjects(id),
  subject_name TEXT NOT NULL,
  teacher_id TEXT,
  teacher_name TEXT NOT NULL,
  room TEXT NOT NULL,
  section TEXT DEFAULT 'A',
  course_id TEXT REFERENCES courses(id)
);

-- ============ LEAVE REQUESTS ============
CREATE TABLE IF NOT EXISTS leave_requests (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  user_name TEXT NOT NULL,
  role TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('casual', 'medical', 'earned', 'duty')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_by TEXT DEFAULT '',
  reviewed_at TIMESTAMPTZ
);

-- ============ LIBRARY BOOKS ============
CREATE TABLE IF NOT EXISTS library_books (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  isbn TEXT UNIQUE NOT NULL,
  category TEXT DEFAULT '',
  total_copies INTEGER DEFAULT 0,
  available_copies INTEGER DEFAULT 0,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'issued', 'reserved'))
);

-- ============ BOOK ISSUES ============
CREATE TABLE IF NOT EXISTS book_issues (
  id TEXT PRIMARY KEY,
  book_id TEXT REFERENCES library_books(id),
  book_title TEXT NOT NULL,
  student_id TEXT REFERENCES students(id),
  student_name TEXT NOT NULL,
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  return_date DATE,
  fine NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'issued' CHECK (status IN ('issued', 'returned', 'overdue'))
);

-- ============ INDEXES ============
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_students_department ON students(department_id);
CREATE INDEX IF NOT EXISTS idx_students_course ON students(course_id);
CREATE INDEX IF NOT EXISTS idx_teachers_department ON teachers(department_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);
CREATE INDEX IF NOT EXISTS idx_marks_exam ON marks(exam_id);
CREATE INDEX IF NOT EXISTS idx_fee_payments_student ON fee_payments(student_id);
CREATE INDEX IF NOT EXISTS idx_timetable_day ON timetable(day);
