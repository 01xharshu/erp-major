import { NextResponse } from "next/server"
import { mockFeePayments, mockFeeStructures } from "@/lib/mock-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const studentId = searchParams.get("studentId")
  const status = searchParams.get("status")
  const type = searchParams.get("type") // "payments" or "structures"

  if (type === "structures") {
    return NextResponse.json({ data: mockFeeStructures })
  }

  let filtered = [...mockFeePayments]

  if (studentId) {
    filtered = filtered.filter((f) => f.studentId === studentId)
  }
  if (status) {
    filtered = filtered.filter((f) => f.status === status)
  }

  return NextResponse.json({ data: filtered, total: filtered.length })
}
