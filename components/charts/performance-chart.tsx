"use client"

import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const performanceData = [
  { month: "Jan", math: 78, science: 82, english: 85, history: 79 },
  { month: "Feb", math: 80, science: 84, english: 87, history: 81 },
  { month: "Mar", math: 82, science: 86, english: 89, history: 83 },
  { month: "Apr", math: 85, science: 88, english: 91, history: 86 },
  { month: "May", math: 87, science: 90, english: 93, history: 88 },
  { month: "Jun", math: 89, science: 92, english: 95, history: 90 },
]

export function PerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-geist">Academic Performance Trends</CardTitle>
        <CardDescription className="font-manrope">Average scores by subject over the past 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            math: {
              label: "Mathematics",
              color: "hsl(var(--chart-1))",
            },
            science: {
              label: "Science",
              color: "hsl(var(--chart-2))",
            },
            english: {
              label: "English",
              color: "hsl(var(--chart-3))",
            },
            history: {
              label: "History",
              color: "hsl(var(--chart-4))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[70, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="math"
                stackId="1"
                stroke="var(--color-chart-1)"
                fill="var(--color-chart-1)"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="science"
                stackId="2"
                stroke="var(--color-chart-2)"
                fill="var(--color-chart-2)"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="english"
                stackId="3"
                stroke="var(--color-chart-3)"
                fill="var(--color-chart-3)"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="history"
                stackId="4"
                stroke="var(--color-chart-4)"
                fill="var(--color-chart-4)"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
