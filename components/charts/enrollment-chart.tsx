"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const enrollmentData = [
  { grade: "K", students: 45 },
  { grade: "1", students: 52 },
  { grade: "2", students: 48 },
  { grade: "3", students: 51 },
  { grade: "4", students: 49 },
  { grade: "5", students: 47 },
  { grade: "6", students: 53 },
  { grade: "7", students: 46 },
  { grade: "8", students: 50 },
  { grade: "9", students: 55 },
  { grade: "10", students: 48 },
  { grade: "11", students: 44 },
  { grade: "12", students: 42 },
]

export function EnrollmentChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-geist">Enrollment by Grade</CardTitle>
        <CardDescription className="font-manrope">Current student distribution across grades</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            students: {
              label: "Students",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grade" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="students" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
