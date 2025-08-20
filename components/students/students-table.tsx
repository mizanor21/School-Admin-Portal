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
import { MoreHorizontal, Eye, Edit, Trash2, Mail, Phone, User, BookOpen } from "lucide-react"
import { useStudentsData } from "@/app/data/DataFetch"
import { AddStudentModal } from "./add-student-dialog"

interface Student {
  _id: string;
  studentId: string;
  name: string;
  phone: string;
  photo: string;
  gender: string;
  dateOfBirth: string;
  guardian: {
    name: string;
    phone: string;
    _id?: string;
  };
  academicHistory: Array<{
    session: string;
    class: string;
    roll: number;
    result: string;
    _id?: string;
  }>;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export function StudentsTable() {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const { data: students = [], isLoading, mutate } = useStudentsData()

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getCurrentClass = (student: Student) => {
    if (student.academicHistory && student.academicHistory.length > 0) {
      // Get the most recent academic record (assuming they're ordered by date)
      const latestRecord = student.academicHistory[student.academicHistory.length - 1];
      return latestRecord.class;
    }
    return "N/A";
  };

  const getLatestResult = (student: Student) => {
    if (student.academicHistory && student.academicHistory.length > 0) {
      const latestRecord = student.academicHistory[student.academicHistory.length - 1];
      return latestRecord.result;
    }
    return "N/A";
  };

  const getStatusBadge = (student: Student) => {
    // Simple status logic based on academic history
    const hasAcademicRecords = student.academicHistory && student.academicHistory.length > 0;
    return (
      <Badge variant={hasAcademicRecords ? "default" : "secondary"} className="font-manrope">
        {hasAcademicRecords ? "Active" : "New"}
      </Badge>
    )
  }

  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this student?")) {
      console.log(`Deleting student with id: ${id}`);
      try {
        await fetch(`/api/students/?id=${id}`, {
          method: 'DELETE',
        });
        mutate();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
  };

  if (isLoading) {
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
                  <TableHead className="font-manrope font-medium">Class</TableHead>
                  <TableHead className="font-manrope font-medium">Status</TableHead>
                  <TableHead className="font-manrope font-medium">Age</TableHead>
                  <TableHead className="font-manrope font-medium">Latest Result</TableHead>
                  <TableHead className="font-manrope font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                        <div>
                          <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-16"></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded w-12"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-8 w-8 bg-gray-200 rounded"></div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
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
                  <TableHead className="font-manrope font-medium">Class</TableHead>
                  <TableHead className="font-manrope font-medium">Status</TableHead>
                  <TableHead className="font-manrope font-medium">Age</TableHead>
                  <TableHead className="font-manrope font-medium">Latest Result</TableHead>
                  <TableHead className="font-manrope font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student: Student) => (
                  <TableRow key={student._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={student.photo || "/placeholder.svg"} alt={student.name} />
                          <AvatarFallback className="font-manrope bg-blue-100">
                            {getInitials(student.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-manrope font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground font-manrope">{student.studentId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm font-manrope">
                          <Phone className="h-3 w-3" />
                          {student.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground font-manrope">
                          <User className="h-3 w-3" />
                          {student.guardian?.name || "No guardian"}
                        </div>
                        {student.guardian?.phone && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground font-manrope">
                            <Phone className="h-3 w-3" />
                            {student.guardian.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-manrope">
                        <p className="font-medium">{getCurrentClass(student)}</p>
                        {student.academicHistory && student.academicHistory.length > 0 && (
                          <p className="text-sm text-muted-foreground">
                            Roll: {student.academicHistory[student.academicHistory.length - 1].roll}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(student)}</TableCell>
                    <TableCell>
                      <span className="font-manrope font-medium">
                        {calculateAge(student.dateOfBirth)} yrs
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-manrope">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {getLatestResult(student)}
                      </Badge>
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
                          <DropdownMenuItem 
                            className="font-manrope"
                            onClick={() => handleEdit(student)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Student
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="font-manrope text-destructive"
                            onClick={() => handleDelete(student._id)}
                          >
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

      {editingStudent && (
        <AddStudentModal
          student={editingStudent}
          mode="edit"
          onClose={() => setEditingStudent(null)}
        />
      )}
    </>
  )
}