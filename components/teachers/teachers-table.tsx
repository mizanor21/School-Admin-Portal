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
import { MoreHorizontal, Eye, Edit, Trash2, Mail, Phone, Star } from "lucide-react"

// Mock teacher data
const teachers = [
  {
    id: "TCH001",
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@school.edu",
    phone: "+1 (555) 123-4567",
    department: "Mathematics",
    subjects: ["Algebra", "Geometry"],
    experience: 12,
    status: "Active",
    rating: 4.8,
    classes: 6,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "TCH002",
    name: "Prof. Michael Chen",
    email: "michael.chen@school.edu",
    phone: "+1 (555) 234-5678",
    department: "Science",
    subjects: ["Biology", "Chemistry"],
    experience: 8,
    status: "Active",
    rating: 4.6,
    classes: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "TCH003",
    name: "Ms. Emily Rodriguez",
    email: "emily.rodriguez@school.edu",
    phone: "+1 (555) 345-6789",
    department: "English",
    subjects: ["Literature", "Writing"],
    experience: 6,
    status: "Active",
    rating: 4.9,
    classes: 4,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "TCH004",
    name: "Mr. David Thompson",
    email: "david.thompson@school.edu",
    phone: "+1 (555) 456-7890",
    department: "History",
    subjects: ["World History", "Geography"],
    experience: 15,
    status: "On Leave",
    rating: 4.4,
    classes: 0,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "TCH005",
    name: "Ms. Lisa Park",
    email: "lisa.park@school.edu",
    phone: "+1 (555) 567-8901",
    department: "Arts",
    subjects: ["Visual Arts", "Music"],
    experience: 4,
    status: "Active",
    rating: 4.7,
    classes: 3,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function TeachersTable() {
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])

  const getStatusBadge = (status: string) => {
    let variant: "default" | "secondary" | "destructive" = "default"
    if (status === "On Leave") variant = "secondary"
    else if (status === "Inactive") variant = "destructive"

    return (
      <Badge variant={variant} className="font-manrope">
        {status}
      </Badge>
    )
  }

  const getRatingStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="font-manrope font-medium text-sm">{rating}</span>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-geist">Teacher Directory</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-manrope font-medium">Teacher</TableHead>
                <TableHead className="font-manrope font-medium">Contact</TableHead>
                <TableHead className="font-manrope font-medium">Department</TableHead>
                <TableHead className="font-manrope font-medium">Subjects</TableHead>
                <TableHead className="font-manrope font-medium">Experience</TableHead>
                <TableHead className="font-manrope font-medium">Status</TableHead>
                <TableHead className="font-manrope font-medium">Rating</TableHead>
                <TableHead className="font-manrope font-medium">Classes</TableHead>
                <TableHead className="font-manrope font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} />
                        <AvatarFallback className="font-manrope">
                          {teacher.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-manrope font-medium">{teacher.name}</p>
                        <p className="text-sm text-muted-foreground font-manrope">{teacher.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm font-manrope">
                        <Mail className="h-3 w-3" />
                        {teacher.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground font-manrope">
                        <Phone className="h-3 w-3" />
                        {teacher.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-manrope">
                      {teacher.department}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects.map((subject) => (
                        <Badge key={subject} variant="secondary" className="text-xs font-manrope">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-manrope">{teacher.experience} years</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(teacher.status)}</TableCell>
                  <TableCell>{getRatingStars(teacher.rating)}</TableCell>
                  <TableCell>
                    <span className="font-manrope font-medium">{teacher.classes}</span>
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
                          Edit Teacher
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="font-manrope text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove Teacher
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
            Showing {teachers.length} of {teachers.length} teachers
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
