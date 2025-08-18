"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const attendanceData = [
  { day: "Mon", rate: 92 },
  { day: "Tue", rate: 94 },
  { day: "Wed", rate: 89 },
  { day: "Thu", rate: 96 },
  { day: "Fri", rate: 91 },
  { day: "Sat", rate: 88 },
  { day: "Sun", rate: 0 },
]

export function AttendanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-geist">Weekly Attendance</CardTitle>
        <CardDescription className="font-manrope">Student attendance rates for this week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            rate: {
              label: "Attendance Rate",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[0, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="var(--color-chart-1)"
                strokeWidth={2}
                dot={{ fill: "var(--color-chart-1)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
