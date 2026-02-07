import pool from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const result = await pool.query("SELECT NOW() as time, current_database() as db")
    return NextResponse.json({
      status: "connected",
      database: result.rows[0].db,
      serverTime: result.rows[0].time,
      message: "Successfully connected to Aiven PostgreSQL!",
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to connect to database",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
