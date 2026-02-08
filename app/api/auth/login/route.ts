import { getDatabase } from "@/lib/mongodb"

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

    // Look up user by email in MongoDB
    const db = await getDatabase()
    const user = (await db.collection("users").findOne({ email })) as DbUser | null

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      )
    }

    return Response.json({
      success: true,
      user: {
        id: user._id?.toString() || "",
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || "",
        department: user.department || "",
      },
    })
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

