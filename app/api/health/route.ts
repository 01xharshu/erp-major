import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    await db.admin().ping()
    return Response.json({ success: true, message: "Connected to MongoDB" })
  } catch (error) {
    console.error("[v0] Health check error:", error)
    return Response.json(
      { success: false, error: "Failed to connect to MongoDB" },
      { status: 500 }
    )
  }
}

