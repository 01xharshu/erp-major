import { setupDatabase } from "@/lib/db-setup"

export async function POST() {
  try {
    const result = await setupDatabase()
    return Response.json(result)
  } catch (error) {
    console.error("[v0] Setup error:", error)
    return Response.json(
      {
        success: false,
        message: "Database setup failed",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return Response.json({
    message: "Send a POST request to initialize MongoDB collections and seed data.",
  })
}

