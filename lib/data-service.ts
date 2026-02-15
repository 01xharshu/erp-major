import { getDatabase } from "@/lib/mongodb"
import { mockStudents, mockTeachers, mockDepartments, mockCourses, mockAttendanceRecords, mockFees, mockAnnouncements, mockAssignments } from "@/lib/mock-data"
import type { Student, Teacher, Department, Course, AttendanceRecord, FeePayment, Announcement, Assignment } from "@/types"

type DataType = "students" | "teachers" | "departments" | "courses" | "attendance" | "fees" | "announcements" | "assignments"

// Mock data map
const mockDataMap = {
  students: mockStudents,
  teachers: mockTeachers,
  departments: mockDepartments,
  courses: mockCourses,
  attendance: mockAttendanceRecords,
  fees: mockFees,
  announcements: mockAnnouncements,
  assignments: mockAssignments,
}

// Generic fetch function that handles demo vs real data
export async function fetchData<T>(
  type: DataType,
  options: {
    isDemo?: boolean
    filter?: Record<string, unknown>
    sort?: { field: string; order: "asc" | "desc" }
    limit?: number
  } = {}
): Promise<T[]> {
  const { isDemo = false, filter, sort, limit } = options

  if (isDemo) {
    // Return mock data
    let data = (mockDataMap[type] as T[]) || []
    
    // Apply filter
    if (filter) {
      data = data.filter((item) => {
        return Object.entries(filter).every(([key, value]) => {
          return (item as Record<string, unknown>)[key] === value
        })
      })
    }

    // Apply sort
    if (sort) {
      data = data.sort((a, b) => {
        const aVal = (a as Record<string, unknown>)[sort.field]
        const bVal = (b as Record<string, unknown>)[sort.field]
        const result = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
        return sort.order === "asc" ? result : -result
      })
    }

    // Apply limit
    if (limit) {
      data = data.slice(0, limit)
    }

    return data
  }

  // Fetch from database
  try {
    const db = await getDatabase()
    const collection = db.collection(type)
    let query = collection.find(filter || {})
    
    if (sort) {
      query = query.sort({ [sort.field]: sort.order === "asc" ? 1 : -1 })
    }
    
    if (limit) {
      query = query.limit(limit)
    }

    return (await query.toArray()) as T[]
  } catch (error) {
    console.error(`[v0] Failed to fetch ${type}:`, error)
    // Fallback to mock data on error
    return mockDataMap[type] as T[]
  }
}

// Specialized fetch functions for each data type
export const dataService = {
  students: (isDemo?: boolean, filter?: Record<string, unknown>) =>
    fetchData<Student>("students", { isDemo, filter }),
  
  teachers: (isDemo?: boolean, filter?: Record<string, unknown>) =>
    fetchData<Teacher>("teachers", { isDemo, filter }),
  
  departments: (isDemo?: boolean, filter?: Record<string, unknown>) =>
    fetchData<Department>("departments", { isDemo, filter }),
  
  courses: (isDemo?: boolean, filter?: Record<string, unknown>) =>
    fetchData<Course>("courses", { isDemo, filter }),
  
  attendance: (isDemo?: boolean, filter?: Record<string, unknown>) =>
    fetchData<AttendanceRecord>("attendance", { isDemo, filter }),
  
  fees: (isDemo?: boolean, filter?: Record<string, unknown>) =>
    fetchData<FeePayment>("fees", { isDemo, filter }),
  
  announcements: (isDemo?: boolean, filter?: Record<string, unknown>) =>
    fetchData<Announcement>("announcements", { isDemo, filter }),
  
  assignments: (isDemo?: boolean, filter?: Record<string, unknown>) =>
    fetchData<Assignment>("assignments", { isDemo, filter }),
}
