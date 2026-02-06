"use client"

import { PageHeader } from "@/components/page-header"
import { mockTimetable } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const days = ["monday", "tuesday", "wednesday", "thursday", "friday"] as const
const dayLabels = { monday: "Mon", tuesday: "Tue", wednesday: "Wed", thursday: "Thu", friday: "Fri" }

export default function TimetablePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Timetable" description="Weekly class schedule and room allocation." />

      {/* Desktop timetable grid */}
      <div className="hidden overflow-hidden rounded-lg border border-border lg:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground w-20">Day</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">09:00 - 10:00</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">10:00 - 11:00</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">11:30 - 12:30</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">12:30+</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => {
              const daySlots = mockTimetable.filter((s) => s.day === day)
              return (
                <tr key={day} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{dayLabels[day]}</td>
                  {["09:00", "10:00", "11:30", "12:30"].map((time) => {
                    const slot = daySlots.find((s) => s.startTime === time)
                    return (
                      <td key={time} className="px-2 py-2">
                        {slot ? (
                          <div className="rounded-md bg-primary/10 p-2">
                            <p className="text-xs font-medium text-primary">{slot.subjectName}</p>
                            <p className="text-[10px] text-muted-foreground">{slot.teacherName}</p>
                            <p className="text-[10px] text-muted-foreground">Room: {slot.room}</p>
                          </div>
                        ) : (
                          <div className="rounded-md bg-muted/30 p-2 text-center">
                            <span className="text-[10px] text-muted-foreground">Free</span>
                          </div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-4 lg:hidden">
        {days.map((day) => {
          const daySlots = mockTimetable.filter((s) => s.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime))
          return (
            <div key={day} className="rounded-lg border border-border bg-card">
              <div className="border-b border-border px-4 py-2.5">
                <h3 className="text-sm font-semibold capitalize text-foreground">{day}</h3>
              </div>
              <div className="divide-y divide-border">
                {daySlots.length === 0 ? (
                  <div className="px-4 py-3">
                    <p className="text-sm text-muted-foreground">No classes scheduled</p>
                  </div>
                ) : (
                  daySlots.map((slot) => (
                    <div key={slot.id} className="flex items-center gap-3 px-4 py-3">
                      <div className="text-center">
                        <p className="text-xs font-medium text-foreground">{slot.startTime}</p>
                        <p className="text-[10px] text-muted-foreground">{slot.endTime}</p>
                      </div>
                      <div className="h-8 w-px bg-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{slot.subjectName}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{slot.teacherName}</span>
                          <span>|</span>
                          <span>{slot.room}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
