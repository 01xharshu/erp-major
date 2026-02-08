import { getDatabase } from "@/lib/mongodb"
import { mockUsers, mockStudents, mockTeachers, mockDepartments, mockCourses } from "@/lib/mock-data"

export async function setupDatabase() {
  const db = await getDatabase()

  try {
    // Drop existing collections
    const collections = await db.listCollections().toArray()
    for (const collection of collections) {
      await db.collection(collection.name).drop()
    }
    console.log("[v0] Dropped existing collections")

    // Create users collection with index
    await db.createCollection("users")
    await db.collection("users").createIndex({ email: 1 }, { unique: true })
    await db.collection("users").insertMany(mockUsers as any)
    console.log("[v0] Created users collection with", mockUsers.length, "users")

    // Create students collection
    await db.createCollection("students")
    await db.collection("students").insertMany(mockStudents as any)
    console.log("[v0] Created students collection with", mockStudents.length, "students")

    // Create teachers collection
    await db.createCollection("teachers")
    await db.collection("teachers").insertMany(mockTeachers as any)
    console.log("[v0] Created teachers collection with", mockTeachers.length, "teachers")

    // Create departments collection
    await db.createCollection("departments")
    await db.collection("departments").insertMany(mockDepartments as any)
    console.log("[v0] Created departments collection with", mockDepartments.length, "departments")

    // Create courses collection
    await db.createCollection("courses")
    await db.collection("courses").insertMany(mockCourses as any)
    console.log("[v0] Created courses collection with", mockCourses.length, "courses")

    return {
      success: true,
      message: "Database setup complete",
      collections: ["users", "students", "teachers", "departments", "courses"],
    }
  } catch (error) {
    console.error("[v0] Database setup error:", error)
    throw error
  }
}
