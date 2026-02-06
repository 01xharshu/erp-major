import { NextResponse } from "next/server"
import { mockStudents } from "@/lib/mock-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const department = searchParams.get("department")
  const semester = searchParams.get("semester")
  const search = searchParams.get("search")?.toLowerCase()
  const status = searchParams.get("status")

  let filtered = [...mockStudents]

  if (department) {
    filtered = filtered.filter((s) => s.departmentId === department)
  }
  if (semester) {
    filtered = filtered.filter((s) => s.semester === parseInt(semester))
  }
  if (status) {
    filtered = filtered.filter((s) => s.status === status)
  }
  if (search) {
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(search) ||
        s.enrollmentNo.toLowerCase().includes(search) ||
        s.email.toLowerCase().includes(search)
    )
  }

  return NextResponse.json({ data: filtered, total: filtered.length })
}
