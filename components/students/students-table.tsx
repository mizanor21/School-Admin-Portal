"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash2, Mail, Phone } from "lucide-react"

// Mock student data
const students = [
  {
    id: "STU001",
    name: "Alice Johnson",
    email: "alice.johnson@school.edu",
    phone: "+1 (555) 123-4567",
    grade: "10",
    class: "A",
    status: "Active",
    attendance: 95,
    gpa: 3.8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "STU002",
    name: "Bob Smith",
    email: "bob.smith@school.edu",
    phone: "+1 (555) 234-5678",
    grade: "11",
    class: "B",
    status: "Active",
    attendance: 88,
    gpa: 3.2,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "STU003",
    name: "Carol Davis",
    email: "carol.davis@school.edu",
    phone: "+1 (555) 345-6789",
    grade: "9",
    class: "A",
    status: "Active",
    attendance: 92,
    gpa: 3.9,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "STU004",
    name: "David Wilson",
    email: "david.wilson@school.edu",
    phone: "+1 (555) 456-7890",
    grade: "12",
    class: "C",
    status: "Inactive",
    attendance: 78,
    gpa: 2.8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "STU005",
    name: "Emma Brown",
    email: "emma.brown@school.edu",
    phone: "+1 (555) 567-8901",
    grade: "10",
    class: "B",
    status: "Active",
    attendance: 97,
    gpa: 4.0,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function StudentsTable() {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === "Active" ? "default" : "secondary"} className="font-manrope">
        {status}
      </Badge>
    )
  }

  const getAttendanceBadge = (attendance: number) => {
    let variant: "default" | "secondary" | "destructive" = "default"
    if (attendance < 80) variant = "destructive"
    else if (attendance < 90) variant = "secondary"

    return (
      <Badge variant={variant} className="font-manrope">
        {attendance}%
      </Badge>
    )
  }

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.5) return "text-green-600"
    if (gpa >= 3.0) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-geist">Student Records</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-manrope font-medium">Student</TableHead>
                <TableHead className="font-manrope font-medium">Contact</TableHead>
                <TableHead className="font-manrope font-medium">Grade/Class</TableHead>
                <TableHead className="font-manrope font-medium">Status</TableHead>
                <TableHead className="font-manrope font-medium">Attendance</TableHead>
                <TableHead className="font-manrope font-medium">GPA</TableHead>
                <TableHead className="font-manrope font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback className="font-manrope">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-manrope font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground font-manrope">{student.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm font-manrope">
                        <Mail className="h-3 w-3" />
                        {student.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground font-manrope">
                        <Phone className="h-3 w-3" />
                        {student.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-manrope">
                      <p className="font-medium">Grade {student.grade}</p>
                      <p className="text-sm text-muted-foreground">Class {student.class}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(student.status)}</TableCell>
                  <TableCell>{getAttendanceBadge(student.attendance)}</TableCell>
                  <TableCell>
                    <span className={`font-manrope font-medium ${getGPAColor(student.gpa)}`}>
                      {student.gpa.toFixed(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel className="font-manrope">Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="font-manrope">
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="font-manrope">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Student
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="font-manrope text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Student
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground font-manrope">
            Showing {students.length} of {students.length} students
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled className="font-manrope bg-transparent">
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled className="font-manrope bg-transparent">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
