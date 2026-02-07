import pool from "@/lib/db"
import { readFileSync } from "fs"
import { join } from "path"
import { NextResponse } from "next/server"

export async function POST() {
  const client = await pool.connect()

  try {
    // Read SQL files
    const migrateSql = readFileSync(
      join(process.cwd(), "scripts/migrate.sql"),
      "utf-8"
    )
    const seedSql = readFileSync(
      join(process.cwd(), "scripts/seed.sql"),
      "utf-8"
    )

    // Run migration
    await client.query("BEGIN")
    await client.query(migrateSql)
    await client.query("COMMIT")

    // Run seed
    await client.query("BEGIN")
    await client.query(seedSql)
    await client.query("COMMIT")

    return NextResponse.json({
      success: true,
      message: "Database schema created and seeded successfully!",
    })
  } catch (error) {
    await client.query("ROLLBACK")
    console.error("Setup error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Database setup failed",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  } finally {
    client.release()
  }
}

// Also handle GET for easy browser testing
export async function GET() {
  return NextResponse.json({
    message:
      "Send a POST request to this endpoint to initialize the database schema and seed data.",
  })
}
