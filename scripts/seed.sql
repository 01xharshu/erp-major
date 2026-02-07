-- CampusFlow ERP Seed Data
-- Populates all tables with sample data matching the mock data

-- ============ USERS ============
-- password_hash is bcrypt hash of "password123" for demo
INSERT INTO users (id, name, email, password_hash, role, avatar, department) VALUES
  ('u1', 'Dr. Rajesh Kumar', 'admin@campusflow.edu', '$2b$10$demoHashAdmin000000000000000000000000000000000', 'admin', '', 'Administration'),
  ('u2', 'Prof. Anita Sharma', 'teacher@campusflow.edu', '$2b$10$demoHashTeacher00000000000000000000000000000000', 'teacher', '', 'Computer Science'),
  ('u3', 'Harsh Upadhyay', 'student@campusflow.edu', '$2b$10$demoHashStudent00000000000000000000000000000000', 'student', '', 'Computer Science'),
  ('u4', 'Prof. Vikram Singh', 'vikram@college.edu', '$2b$10$demoHashTeacher20000000000000000000000000000000', 'teacher', '', 'Mechanical Engineering'),
  ('u5', 'Priya Patel', 'priya@college.edu', '$2b$10$demoHashStudent20000000000000000000000000000000', 'student', '', 'Computer Science'),
  ('u10', 'Prof. Suresh Gupta', 'suresh@college.edu', '$2b$10$demoHashTeacher30000000000000000000000000000000', 'teacher', '', 'Computer Science'),
  ('u11', 'Prof. Meena Joshi', 'meena@college.edu', '$2b$10$demoHashTeacher40000000000000000000000000000000', 'teacher', '', 'Computer Science'),
  ('u12', 'Prof. Kavita Nair', 'kavita@college.edu', '$2b$10$demoHashTeacher50000000000000000000000000000000', 'teacher', '', 'Mechanical Engineering'),
  ('u13', 'Prof. Deepa Rao', 'deepa@college.edu', '$2b$10$demoHashTeacher60000000000000000000000000000000', 'teacher', '', 'Electronics & Communication')
ON CONFLICT (id) DO NOTHING;

-- ============ DEPARTMENTS ============
INSERT INTO departments (id, name, code, hod_id, students_count, teachers_count) VALUES
  ('d1', 'Computer Science', 'CS', 't1', 240, 18),
  ('d2', 'Mechanical Engineering', 'ME', 't4', 180, 14),
  ('d3', 'Electronics & Communication', 'EC', 't6', 160, 12),
  ('d4', 'Civil Engineering', 'CE', NULL, 120, 10),
  ('d5', 'Business Administration', 'BA', NULL, 200, 15)
ON CONFLICT (id) DO NOTHING;

-- ============ COURSES ============
INSERT INTO courses (id, name, code, department_id, department_name, semesters, credits) VALUES
  ('c1', 'B.Tech Computer Science', 'BTCS', 'd1', 'Computer Science', 8, 180),
  ('c2', 'B.Tech Mechanical', 'BTME', 'd2', 'Mechanical Engineering', 8, 180),
  ('c3', 'B.Tech ECE', 'BTEC', 'd3', 'Electronics & Communication', 8, 180),
  ('c4', 'B.Tech Civil', 'BTCE', 'd4', 'Civil Engineering', 8, 180),
  ('c5', 'BBA', 'BBA', 'd5', 'Business Administration', 6, 140)
ON CONFLICT (id) DO NOTHING;

-- ============ SUBJECTS ============
INSERT INTO subjects (id, name, code, course_id, semester, credits, teacher_id, teacher_name) VALUES
  ('s1', 'Data Structures & Algorithms', 'CS301', 'c1', 3, 4, 't1', 'Prof. Anita Sharma'),
  ('s2', 'Database Management Systems', 'CS302', 'c1', 3, 4, 't2', 'Prof. Suresh Gupta'),
  ('s3', 'Operating Systems', 'CS303', 'c1', 3, 3, 't3', 'Prof. Meena Joshi'),
  ('s4', 'Computer Networks', 'CS304', 'c1', 4, 4, 't1', 'Prof. Anita Sharma'),
  ('s5', 'Thermodynamics', 'ME201', 'c2', 3, 4, 't4', 'Prof. Vikram Singh'),
  ('s6', 'Digital Electronics', 'EC201', 'c3', 3, 3, 't6', 'Prof. Deepa Rao')
ON CONFLICT (id) DO NOTHING;

-- ============ STUDENTS ============
INSERT INTO students (id, user_id, name, email, enrollment_no, department_id, department_name, course_id, course_name, semester, section, batch, status, attendance_percentage, cgpa, fees_due, phone, guardian_name, guardian_phone, admission_date) VALUES
  ('st1', 'u3', 'Harsh Upadhyay', 'student@campusflow.edu', '2023CS001', 'd1', 'Computer Science', 'c1', 'B.Tech Computer Science', 3, 'A', '2023-27', 'active', 87, 8.4, 15000, '9876543210', 'Suresh Verma', '9876543211', '2023-08-01'),
  ('st2', 'u5', 'Priya Patel', 'priya@college.edu', '2023CS002', 'd1', 'Computer Science', 'c1', 'B.Tech Computer Science', 3, 'A', '2023-27', 'active', 92, 9.1, 0, '9876543212', 'Amit Patel', '9876543213', '2023-08-01'),
  ('st3', 'u6', 'Arun Kumar', 'arun@college.edu', '2023CS003', 'd1', 'Computer Science', 'c1', 'B.Tech Computer Science', 3, 'B', '2023-27', 'active', 73, 7.2, 45000, '9876543214', 'Ramesh Kumar', '9876543215', '2023-08-01'),
  ('st4', 'u7', 'Sneha Reddy', 'sneha@college.edu', '2023CS004', 'd1', 'Computer Science', 'c1', 'B.Tech Computer Science', 3, 'B', '2023-27', 'active', 95, 9.5, 0, '9876543216', 'Venkat Reddy', '9876543217', '2023-08-01'),
  ('st5', 'u8', 'Karan Malhotra', 'karan@college.edu', '2023ME001', 'd2', 'Mechanical Engineering', 'c2', 'B.Tech Mechanical', 3, 'A', '2023-27', 'active', 81, 7.8, 25000, '9876543218', 'Raj Malhotra', '9876543219', '2023-08-01'),
  ('st6', 'u9', 'Nisha Jain', 'nisha@college.edu', '2023EC001', 'd3', 'Electronics & Communication', 'c3', 'B.Tech ECE', 3, 'A', '2023-27', 'active', 89, 8.7, 0, '9876543220', 'Praveen Jain', '9876543221', '2023-08-01')
ON CONFLICT (id) DO NOTHING;

-- ============ TEACHERS ============
INSERT INTO teachers (id, user_id, name, email, employee_id, department_id, department_name, designation, specialization, subjects, phone, joining_date, status) VALUES
  ('t1', 'u2', 'Prof. Anita Sharma', 'teacher@campusflow.edu', 'EMP001', 'd1', 'Computer Science', 'Associate Professor', 'Algorithms & Data Structures', ARRAY['CS301', 'CS304'], '9876543230', '2015-07-01', 'active'),
  ('t2', 'u10', 'Prof. Suresh Gupta', 'suresh@college.edu', 'EMP002', 'd1', 'Computer Science', 'Assistant Professor', 'Database Systems', ARRAY['CS302'], '9876543231', '2018-01-15', 'active'),
  ('t3', 'u11', 'Prof. Meena Joshi', 'meena@college.edu', 'EMP003', 'd1', 'Computer Science', 'Professor', 'Operating Systems', ARRAY['CS303'], '9876543232', '2010-08-01', 'active'),
  ('t4', 'u4', 'Prof. Vikram Singh', 'vikram@college.edu', 'EMP004', 'd2', 'Mechanical Engineering', 'Professor & HOD', 'Thermodynamics', ARRAY['ME201'], '9876543233', '2008-07-01', 'active'),
  ('t5', 'u12', 'Prof. Kavita Nair', 'kavita@college.edu', 'EMP005', 'd2', 'Mechanical Engineering', 'Assistant Professor', 'Fluid Mechanics', ARRAY['ME202'], '9876543234', '2019-06-01', 'active'),
  ('t6', 'u13', 'Prof. Deepa Rao', 'deepa@college.edu', 'EMP006', 'd3', 'Electronics & Communication', 'Associate Professor & HOD', 'VLSI Design', ARRAY['EC201'], '9876543235', '2012-01-10', 'active')
ON CONFLICT (id) DO NOTHING;

-- ============ ATTENDANCE ============
INSERT INTO attendance (id, student_id, student_name, enrollment_no, subject_id, subject_name, date, status, marked_by, marked_at) VALUES
  ('a1', 'st1', 'Harsh Upadhyay', '2023CS001', 's1', 'Data Structures & Algorithms', '2026-02-07', 'present', 't1', '2026-02-07T09:15:00Z'),
  ('a2', 'st2', 'Priya Patel', '2023CS002', 's1', 'Data Structures & Algorithms', '2026-02-07', 'present', 't1', '2026-02-07T09:15:00Z'),
  ('a3', 'st3', 'Arun Kumar', '2023CS003', 's1', 'Data Structures & Algorithms', '2026-02-07', 'absent', 't1', '2026-02-07T09:15:00Z'),
  ('a4', 'st4', 'Sneha Reddy', '2023CS004', 's1', 'Data Structures & Algorithms', '2026-02-07', 'present', 't1', '2026-02-07T09:15:00Z'),
  ('a5', 'st1', 'Harsh Upadhyay', '2023CS001', 's2', 'Database Management Systems', '2026-02-07', 'late', 't2', '2026-02-07T11:05:00Z'),
  ('a6', 'st2', 'Priya Patel', '2023CS002', 's2', 'Database Management Systems', '2026-02-07', 'present', 't2', '2026-02-07T11:05:00Z')
ON CONFLICT (id) DO NOTHING;

-- ============ EXAMS ============
INSERT INTO exams (id, name, type, subject_id, subject_name, course_id, semester, date, total_marks, passing_marks, status) VALUES
  ('e1', 'Mid-Semester Exam - DSA', 'midterm', 's1', 'Data Structures & Algorithms', 'c1', 3, '2026-03-15', 50, 20, 'upcoming'),
  ('e2', 'Internal Test 1 - DBMS', 'internal', 's2', 'Database Management Systems', 'c1', 3, '2026-02-20', 25, 10, 'upcoming'),
  ('e3', 'End Semester - OS', 'final', 's3', 'Operating Systems', 'c1', 3, '2026-05-10', 100, 40, 'upcoming'),
  ('e4', 'Internal Test 1 - DSA', 'internal', 's1', 'Data Structures & Algorithms', 'c1', 3, '2026-01-25', 25, 10, 'results-published')
ON CONFLICT (id) DO NOTHING;

-- ============ MARKS ============
INSERT INTO marks (id, exam_id, student_id, student_name, enrollment_no, marks_obtained, total_marks, grade, remarks) VALUES
  ('m1', 'e4', 'st1', 'Harsh Upadhyay', '2023CS001', 20, 25, 'A', 'Good'),
  ('m2', 'e4', 'st2', 'Priya Patel', '2023CS002', 23, 25, 'A+', 'Excellent'),
  ('m3', 'e4', 'st3', 'Arun Kumar', '2023CS003', 14, 25, 'B', 'Can improve'),
  ('m4', 'e4', 'st4', 'Sneha Reddy', '2023CS004', 24, 25, 'A+', 'Outstanding')
ON CONFLICT (id) DO NOTHING;

-- ============ FEE STRUCTURES ============
INSERT INTO fee_structures (id, course_id, course_name, semester, tuition_fee, exam_fee, library_fee, lab_fee, other_fee, total_fee) VALUES
  ('fs1', 'c1', 'B.Tech Computer Science', 3, 50000, 3000, 2000, 5000, 5000, 65000),
  ('fs2', 'c2', 'B.Tech Mechanical', 3, 45000, 3000, 2000, 8000, 5000, 63000),
  ('fs3', 'c3', 'B.Tech ECE', 3, 48000, 3000, 2000, 7000, 5000, 65000)
ON CONFLICT (id) DO NOTHING;

-- ============ FEE PAYMENTS ============
INSERT INTO fee_payments (id, student_id, student_name, enrollment_no, amount, fee_type, semester, payment_date, payment_method, transaction_id, status, receipt_no) VALUES
  ('fp1', 'st1', 'Harsh Upadhyay', '2023CS001', 50000, 'Tuition Fee', 3, '2026-01-15', 'upi', 'TXN001', 'paid', 'RCP-2026-001'),
  ('fp2', 'st1', 'Harsh Upadhyay', '2023CS001', 15000, 'Lab & Other Fee', 3, '', 'upi', '', 'pending', ''),
  ('fp3', 'st2', 'Priya Patel', '2023CS002', 65000, 'Full Semester Fee', 3, '2026-01-10', 'bank-transfer', 'TXN002', 'paid', 'RCP-2026-002'),
  ('fp4', 'st3', 'Arun Kumar', '2023CS003', 45000, 'Partial Payment', 3, '2026-01-20', 'card', 'TXN003', 'partial', 'RCP-2026-003'),
  ('fp5', 'st5', 'Karan Malhotra', '2023ME001', 63000, 'Full Semester Fee', 3, '', 'upi', '', 'overdue', '')
ON CONFLICT (id) DO NOTHING;

-- ============ ASSIGNMENTS ============
INSERT INTO assignments (id, title, description, subject_id, subject_name, teacher_id, teacher_name, deadline, total_marks, submissions, total_students, status) VALUES
  ('as1', 'Implement Binary Search Tree', 'Write a complete BST implementation with insert, delete, and traversal operations.', 's1', 'Data Structures & Algorithms', 't1', 'Prof. Anita Sharma', '2026-02-15', 20, 28, 45, 'active'),
  ('as2', 'ER Diagram for Library System', 'Design an ER diagram for a complete library management system.', 's2', 'Database Management Systems', 't2', 'Prof. Suresh Gupta', '2026-02-10', 15, 42, 45, 'active'),
  ('as3', 'Process Scheduling Simulation', 'Simulate FCFS, SJF, and Round Robin scheduling algorithms.', 's3', 'Operating Systems', 't3', 'Prof. Meena Joshi', '2026-02-25', 25, 10, 45, 'active'),
  ('as4', 'SQL Queries Assignment', 'Write SQL queries for given scenarios using joins, subqueries, and aggregations.', 's2', 'Database Management Systems', 't2', 'Prof. Suresh Gupta', '2026-01-30', 10, 45, 45, 'closed')
ON CONFLICT (id) DO NOTHING;

-- ============ ANNOUNCEMENTS ============
INSERT INTO announcements (id, title, content, author, author_role, target_roles, department, priority, created_at) VALUES
  ('an1', 'Mid-Semester Exam Schedule Released', 'The mid-semester examination schedule for all departments has been published. Please check the exam portal for detailed timetable.', 'Dr. Rajesh Kumar', 'admin', ARRAY['student', 'teacher', 'admin'], '', 'high', '2026-02-05T10:00:00Z'),
  ('an2', 'Annual Sports Day - Registration Open', 'Register for the annual sports day events by Feb 20. Events include cricket, football, athletics, and indoor games.', 'Dr. Rajesh Kumar', 'admin', ARRAY['student', 'teacher'], '', 'normal', '2026-02-04T14:00:00Z'),
  ('an3', 'Library Working Hours Extended', 'The central library will remain open until 10 PM during the exam period starting from March 1.', 'Dr. Rajesh Kumar', 'admin', ARRAY['student', 'teacher'], '', 'normal', '2026-02-03T09:00:00Z'),
  ('an4', 'Fee Payment Reminder', 'Students with pending fees are requested to clear their dues before February 28 to avoid late fee charges.', 'Dr. Rajesh Kumar', 'admin', ARRAY['student'], '', 'urgent', '2026-02-06T11:00:00Z')
ON CONFLICT (id) DO NOTHING;

-- ============ TIMETABLE ============
INSERT INTO timetable (id, day, start_time, end_time, subject_id, subject_name, teacher_id, teacher_name, room, section, course_id) VALUES
  ('tt1', 'monday', '09:00', '10:00', 's1', 'Data Structures & Algorithms', 't1', 'Prof. Anita Sharma', 'CS-101', 'A', 'c1'),
  ('tt2', 'monday', '10:00', '11:00', 's2', 'Database Management Systems', 't2', 'Prof. Suresh Gupta', 'CS-102', 'A', 'c1'),
  ('tt3', 'monday', '11:30', '12:30', 's3', 'Operating Systems', 't3', 'Prof. Meena Joshi', 'CS-103', 'A', 'c1'),
  ('tt4', 'tuesday', '09:00', '10:00', 's3', 'Operating Systems', 't3', 'Prof. Meena Joshi', 'CS-103', 'A', 'c1'),
  ('tt5', 'tuesday', '10:00', '11:00', 's1', 'Data Structures & Algorithms', 't1', 'Prof. Anita Sharma', 'CS-101', 'A', 'c1'),
  ('tt6', 'tuesday', '11:30', '13:30', 's1', 'DSA Lab', 't1', 'Prof. Anita Sharma', 'Lab-1', 'A', 'c1'),
  ('tt7', 'wednesday', '09:00', '10:00', 's2', 'Database Management Systems', 't2', 'Prof. Suresh Gupta', 'CS-102', 'A', 'c1'),
  ('tt8', 'wednesday', '10:00', '11:00', 's3', 'Operating Systems', 't3', 'Prof. Meena Joshi', 'CS-103', 'A', 'c1'),
  ('tt9', 'thursday', '09:00', '10:00', 's1', 'Data Structures & Algorithms', 't1', 'Prof. Anita Sharma', 'CS-101', 'A', 'c1'),
  ('tt10', 'thursday', '10:00', '12:00', 's2', 'DBMS Lab', 't2', 'Prof. Suresh Gupta', 'Lab-2', 'A', 'c1'),
  ('tt11', 'friday', '09:00', '10:00', 's2', 'Database Management Systems', 't2', 'Prof. Suresh Gupta', 'CS-102', 'A', 'c1'),
  ('tt12', 'friday', '10:00', '11:00', 's1', 'Data Structures & Algorithms', 't1', 'Prof. Anita Sharma', 'CS-101', 'A', 'c1')
ON CONFLICT (id) DO NOTHING;

-- ============ LEAVE REQUESTS ============
INSERT INTO leave_requests (id, user_id, user_name, role, type, start_date, end_date, reason, status, applied_at, reviewed_by, reviewed_at) VALUES
  ('lr1', 'u2', 'Prof. Anita Sharma', 'teacher', 'casual', '2026-02-10', '2026-02-11', 'Personal work', 'pending', '2026-02-06T08:00:00Z', '', NULL),
  ('lr2', 'u3', 'Harsh Upadhyay', 'student', 'medical', '2026-02-03', '2026-02-05', 'Medical appointment', 'approved', '2026-02-02T10:00:00Z', 'Dr. Rajesh Kumar', '2026-02-02T14:00:00Z')
ON CONFLICT (id) DO NOTHING;

-- ============ LIBRARY BOOKS ============
INSERT INTO library_books (id, title, author, isbn, category, total_copies, available_copies, status) VALUES
  ('lb1', 'Introduction to Algorithms', 'Thomas H. Cormen', '978-0262033848', 'Computer Science', 10, 6, 'available'),
  ('lb2', 'Database System Concepts', 'Abraham Silberschatz', '978-0078022159', 'Computer Science', 8, 3, 'available'),
  ('lb3', 'Operating System Concepts', 'Abraham Silberschatz', '978-1119800361', 'Computer Science', 6, 0, 'issued'),
  ('lb4', 'Engineering Mechanics', 'R.C. Hibbeler', '978-0133918922', 'Mechanical', 5, 2, 'available'),
  ('lb5', 'Digital Design', 'M. Morris Mano', '978-0134549897', 'Electronics', 7, 4, 'available')
ON CONFLICT (id) DO NOTHING;

-- ============ BOOK ISSUES ============
INSERT INTO book_issues (id, book_id, book_title, student_id, student_name, issue_date, due_date, return_date, fine, status) VALUES
  ('bi1', 'lb1', 'Introduction to Algorithms', 'st1', 'Harsh Upadhyay', '2026-01-20', '2026-02-20', NULL, 0, 'issued'),
  ('bi2', 'lb3', 'Operating System Concepts', 'st2', 'Priya Patel', '2026-01-15', '2026-02-15', NULL, 0, 'issued'),
  ('bi3', 'lb2', 'Database System Concepts', 'st3', 'Arun Kumar', '2025-12-20', '2026-01-20', '2026-01-25', 50, 'returned')
ON CONFLICT (id) DO NOTHING;
