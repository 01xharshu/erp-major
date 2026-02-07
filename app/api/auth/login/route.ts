import { query } from "@/lib/db"
import { NextResponse } from "next/server"

interface DbUser {
  id: string
  name: string
  email: string
  role: string
  avatar: string
  department: string
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      )
    }

    // Look up user by email
    const users = await query<DbUser>(
      "SELECT id, name, email, role, avatar, department FROM users WHERE email = $1 LIMIT 1",
      [email]
    )

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      )
    }

    const user = users[0]

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || "",
        department: user.department || "",
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
