import { NextResponse } from "next/server"
import { mockTeachers } from "@/lib/mock-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const department = searchParams.get("department")
  const search = searchParams.get("search")?.toLowerCase()

  let filtered = [...mockTeachers]

  if (department) {
    filtered = filtered.filter((t) => t.departmentId === department)
  }
  if (search) {
    filtered = filtered.filter(
      (t) =>
        t.name.toLowerCase().includes(search) ||
        t.employeeId.toLowerCase().includes(search) ||
        t.email.toLowerCase().includes(search)
    )
  }

  return NextResponse.json({ data: filtered, total: filtered.length })
}
