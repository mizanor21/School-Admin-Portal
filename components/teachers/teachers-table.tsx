"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash2, Mail, Phone, Star, Search, Filter, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useTeachersData } from '../../app/data/DataFetch'
import { toast } from "sonner"

interface Teacher {
  id: string
  name: string
  email: string
  phone: string
  department: string
  subjects: string[]
  experience: number
  status: "Active" | "On Leave" | "Inactive"
  rating: number
  classes: number
  avatar?: string
}

export function TeachersTable() {
  const router = useRouter()
  const { data: teachers = [], error, isLoading, mutate } = useTeachersData()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All")
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)

  // Filter teachers based on search and department
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "All" || teacher.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  // Get unique departments for filter
  const departments = ["All", ...new Set(teachers.map(teacher => teacher.department))]

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, "default" | "secondary" | "destructive"> = {
      "Active": "default",
      "On Leave": "secondary",
      "Inactive": "destructive"
    }

    return (
      <Badge variant={statusMap[status] || "default"} className="capitalize">
        {status}
      </Badge>
    )
  }

  const getRatingStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium text-sm">{rating?.toFixed(1)}</span>
      </div>
    )
  }

  const handleDelete = async (teacherId: string) => {
    try {
      const response = await fetch(`/api/teachers/${teacherId}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete teacher')

      toast.success("Teacher deleted successfully")
      mutate() // Refresh the data
    } catch (error) {
      toast.error("Failed to delete teacher")
      console.error("Delete error:", error)
    }
  }

  const handleEdit = (teacher: Teacher) => {
    setSelectedTeacher(teacher)
    setEditDialogOpen(true)
  }

  if (error) return <div className="text-red-500 p-4">Error loading teachers data</div>

  return (
    <>
      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-semibold">Teacher Directory</CardTitle>
              <CardDescription className="mt-1">
                Manage and view all teaching staff information
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teachers..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Filter className="h-4 w-4" />
                    {selectedDepartment}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel>Departments</DropdownMenuLabel>
                  {departments.map((dept) => (
                    <DropdownMenuItem
                      key={dept}
                      onClick={() => setSelectedDepartment(dept)}
                      className={dept === selectedDepartment ? "bg-accent" : ""}
                    >
                      {dept}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-[220px]">Teacher</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
                          <div className="space-y-2">
                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                          </div>
                        </div>
                      </TableCell>
                      {Array.from({ length: 7 }).map((_, j) => (
                        <TableCell key={j}>
                          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : filteredTeachers.length > 0 ? (
                  filteredTeachers.map((teacher) => (
                    <TableRow key={teacher.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={teacher.photo} alt={teacher.name} />
                            <AvatarFallback>
                              {teacher.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{teacher.name}</p>
                            <p className="text-sm text-muted-foreground">{teacher._id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="truncate max-w-[160px]">{teacher.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            {teacher.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {teacher.department}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span>{teacher?.subject}</span>
                      </TableCell>
                      <TableCell>{getStatusBadge(teacher.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => router.push(`/teachers/${teacher.id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(teacher)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDelete(teacher.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No teachers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredTeachers.length} of {teachers.length} teachers
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}