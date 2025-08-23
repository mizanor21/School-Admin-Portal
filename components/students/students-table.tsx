"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MoreHorizontal, Eye, Edit, Trash2, Mail, Phone, User, BookOpen, Search, Filter, X, Calendar } from "lucide-react"
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

interface Filters {
  search: string;
  class: string;
  session: string;
  status: string;
  result: string;
  gender: string;
}

export function StudentsTable() {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    search: "",
    class: "all",
    session: "all",
    status: "all",
    result: "all",
    gender: "all"
  })
  const { data: students = [], isLoading, mutate } = useStudentsData()

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    const classes = new Set<string>();
    const sessions = new Set<string>();
    const results = new Set<string>();
    const genders = new Set<string>();

    students.forEach(student => {
      genders.add(student.gender);
      if (student.academicHistory && student.academicHistory.length > 0) {
        student.academicHistory.forEach(record => {
          classes.add(record.class);
          sessions.add(record.session);
          results.add(record.result);
        });
      }
    });

    return {
      classes: Array.from(classes).sort(),
      sessions: Array.from(sessions).sort((a, b) => b.localeCompare(a)), // Sort sessions descending (newest first)
      results: Array.from(results).sort(),
      genders: Array.from(genders).sort()
    };
  }, [students]);

  // Filter students based on current filters
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      // Search filter (name, studentId, phone, guardian name)
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch =
          student.name.toLowerCase().includes(searchTerm) ||
          student.studentId.toLowerCase().includes(searchTerm) ||
          student.phone.toLowerCase().includes(searchTerm) ||
          (student.guardian?.name && student.guardian.name.toLowerCase().includes(searchTerm));
        if (!matchesSearch) return false;
      }

      // Class filter
      if (filters.class !== "all") {
        const hasMatchingClass = student.academicHistory?.some(
          record => record.class === filters.class
        );
        if (!hasMatchingClass) return false;
      }

      // Session filter
      if (filters.session !== "all") {
        const hasMatchingSession = student.academicHistory?.some(
          record => record.session === filters.session
        );
        if (!hasMatchingSession) return false;
      }

      // Status filter
      if (filters.status !== "all") {
        const hasAcademicRecords = student.academicHistory && student.academicHistory.length > 0;
        if (filters.status === "active" && !hasAcademicRecords) return false;
        if (filters.status === "new" && hasAcademicRecords) return false;
      }

      // Result filter
      if (filters.result !== "all") {
        const hasMatchingResult = student.academicHistory?.some(
          record => record.result === filters.result
        );
        if (!hasMatchingResult) return false;
      }

      // Gender filter
      if (filters.gender !== "all" && student.gender !== filters.gender) {
        return false;
      }

      return true;
    });
  }, [students, filters]);

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
      const latestRecord = student.academicHistory[student.academicHistory.length - 1];
      return latestRecord.class;
    }
    return "N/A";
  };

  const getCurrentSession = (student: Student) => {
    if (student.academicHistory && student.academicHistory.length > 0) {
      const latestRecord = student.academicHistory[student.academicHistory.length - 1];
      return latestRecord.session;
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

  const clearFilters = () => {
    setFilters({
      search: "",
      class: "all",
      session: "all",
      status: "all",
      result: "all",
      gender: "all"
    });
  };

  const hasActiveFilters = filters.search ||
    filters.class !== "all" ||
    filters.session !== "all" ||
    filters.status !== "all" ||
    filters.result !== "all" ||
    filters.gender !== "all";

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
                  <TableHead className="font-manrope font-medium">Session</TableHead>
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
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
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
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="font-geist">Student Records</CardTitle>
          <div className="flex items-center gap-2">
            {editingStudent && (
              <AddStudentModal
                student={editingStudent}
                mode="edit"
                onClose={() => setEditingStudent(null)}
              />
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-1">
                  Active
                </Badge>
              )}
            </Button>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground"
              >
                <X className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </CardHeader>

        {/* Filter Section */}
        {showFilters && (
          <CardContent className="border-b pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Search Input */}
              {/* <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="pl-9"
                />
              </div> */}

              {/* Session Filter */}
              <Select
                value={filters.session}
                onValueChange={(value) => setFilters({ ...filters, session: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by session" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sessions</SelectItem>
                  {filterOptions.sessions.map((session) => (
                    <SelectItem key={session} value={session}>
                      {session}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Class Filter */}
              <Select
                value={filters.class}
                onValueChange={(value) => setFilters({ ...filters, class: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {filterOptions.classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select
                value={filters.status}
                onValueChange={(value) => setFilters({ ...filters, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                </SelectContent>
              </Select>

              {/* Result Filter */}
              <Select
                value={filters.result}
                onValueChange={(value) => setFilters({ ...filters, result: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by result" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Results</SelectItem>
                  {filterOptions.results.map((result) => (
                    <SelectItem key={result} value={result}>
                      {result}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Gender Filter */}
              <Select
                value={filters.gender}
                onValueChange={(value) => setFilters({ ...filters, gender: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  {filterOptions.genders.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        )}

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-manrope font-medium">Student</TableHead>
                  <TableHead className="font-manrope font-medium">Contact</TableHead>
                  <TableHead className="font-manrope font-medium">Class</TableHead>
                  <TableHead className="font-manrope font-medium">Session</TableHead>
                  <TableHead className="font-manrope font-medium">Status</TableHead>
                  <TableHead className="font-manrope font-medium">Age</TableHead>
                  <TableHead className="font-manrope font-medium">Latest Result</TableHead>
                  <TableHead className="font-manrope font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student: Student) => (
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
                    <TableCell>
                      <div className="font-manrope">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">{getCurrentSession(student)}</span>
                        </div>
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

          {filteredStudents.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p className="font-manrope">No students found matching your filters.</p>
              {hasActiveFilters && (
                <Button variant="link" onClick={clearFilters} className="mt-2">
                  Clear all filters
                </Button>
              )}
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground font-manrope">
              Showing {filteredStudents.length} of {students.length} students
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
    </>
  )
}