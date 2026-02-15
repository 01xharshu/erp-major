import { getDatabase } from "@/lib/mongodb"

// Mock users as fallback
const mockUsers = [
  { _id: "admin-1", name: "Dr. Rajesh Kumar", email: "admin@college.edu", role: "admin", avatar: "", department: "Administration" },
  { _id: "teacher-1", name: "Prof. Ananya Sharma", email: "teacher@college.edu", role: "teacher", avatar: "", department: "Computer Science" },
  { _id: "student-1", name: "Harsh Upadhyay", email: "student@college.edu", role: "student", avatar: "", department: "Computer Science" },
]

interface DbUser {
  _id?: string
  name: string
  email: string
  role: string
  avatar?: string
  department?: string
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return Response.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      )
    }

    console.log("[v0] Login attempt with email:", email)

    // Try to find user in MongoDB
    try {
      const db = await getDatabase()
      const dbUser = (await db.collection("users").findOne({ email })) as DbUser | null
      if (dbUser) {
        console.log("[v0] Found user in MongoDB:", dbUser.email)
        return Response.json({
          success: true,
          user: {
            id: dbUser._id?.toString() || "",
            name: dbUser.name,
            email: dbUser.email,
            role: dbUser.role,
            avatar: dbUser.avatar || "",
            department: dbUser.department || "",
          },
        })
      }
    } catch (dbError) {
      console.warn("[v0] MongoDB lookup failed, trying mock data:", dbError)
    }

    // Fallback to mock users
    const mockUser = mockUsers.find((u) => u.email === email)
    if (mockUser) {
      console.log("[v0] Found user in mock data:", mockUser.email)
      return Response.json({
        success: true,
        user: {
          id: mockUser._id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role,
          avatar: mockUser.avatar || "",
          department: mockUser.department || "",
        },
      })
    }

    return Response.json(
      { success: false, message: "User not found" },
      { status: 404 }
    )
  } catch (error) {
    console.error("[v0] Login error:", error)
    return Response.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}


