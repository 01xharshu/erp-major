import { NextResponse } from "next/server"
import { mockAttendanceRecords } from "@/lib/mock-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const subjectId = searchParams.get("subjectId")
  const date = searchParams.get("date")
  const studentId = searchParams.get("studentId")

  let filtered = [...mockAttendanceRecords]

  if (subjectId) {
    filtered = filtered.filter((a) => a.subjectId === subjectId)
  }
  if (date) {
    filtered = filtered.filter((a) => a.date === date)
  }
  if (studentId) {
    filtered = filtered.filter((a) => a.studentId === studentId)
  }

  return NextResponse.json({ data: filtered, total: filtered.length })
}

export async function POST(request: Request) {
  const body = await request.json()
  // In a real app, this would save to the database
  return NextResponse.json({ success: true, message: "Attendance marked successfully", data: body })
}
