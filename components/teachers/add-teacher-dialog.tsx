"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, GraduationCap } from "lucide-react"

export function AddTeacherDialog() {
  const [open, setOpen] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedClasses, setSelectedClasses] = useState<string[]>([])
  const [experienceHistory, setExperienceHistory] = useState([{ school: "", years: "" }])
  const [teacherId, setTeacherId] = useState(() => {
    const year = new Date().getFullYear()
    const randomNum = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    return `TCH-${year}-${randomNum}`
  })

  const handleSubjectChange = (subject: string, checked: boolean) => {
    if (checked) {
      setSelectedSubjects([...selectedSubjects, subject])
    } else {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject))
    }
  }

  const handleClassChange = (className: string, checked: boolean) => {
    if (checked) {
      setSelectedClasses([...selectedClasses, className])
    } else {
      setSelectedClasses(selectedClasses.filter((c) => c !== className))
    }
  }

  const addExperienceEntry = () => {
    setExperienceHistory([...experienceHistory, { school: "", years: "" }])
  }

  const removeExperienceEntry = (index: number) => {
    if (experienceHistory.length > 1) {
      setExperienceHistory(experienceHistory.filter((_, i) => i !== index))
    }
  }

  const updateExperienceEntry = (index: number, field: string, value: string) => {
    const updated = experienceHistory.map((entry, i) => (i === index ? { ...entry, [field]: value } : entry))
    setExperienceHistory(updated)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-6 border border-border rounded-xl hover:bg-muted hover:shadow-lg transition-all duration-300 text-left group bg-gradient-to-br from-secondary/5 to-transparent">
          <GraduationCap className="h-8 w-8 text-secondary mb-3 group-hover:scale-110 transition-transform duration-300" />
          <p className="font-manrope font-semibold text-base mb-1">Add Teacher</p>
          <p className="text-sm text-muted-foreground">Register new staff</p>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-geist">Add New Teacher</DialogTitle>
          <DialogDescription className="font-manrope">
            Enter comprehensive teacher information including qualifications, experience, and salary details.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-geist">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-manrope">
                    Full Name
                  </Label>
                  <Input id="name" placeholder="Enter full name" className="font-manrope" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender" className="font-manrope">
                    Gender
                  </Label>
                  <Select>
                    <SelectTrigger className="font-manrope">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="font-manrope">
                    Date of Birth
                  </Label>
                  <Input id="dateOfBirth" type="date" className="font-manrope" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacherId" className="font-manrope">
                    Teacher ID
                  </Label>
                  <Input
                    id="teacherId"
                    value={teacherId}
                    onChange={(e) => setTeacherId(e.target.value)}
                    className="font-manrope"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-manrope">
                    Email
                  </Label>
                  <Input id="email" type="email" placeholder="teacher@school.edu" className="font-manrope" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-manrope">
                    Phone
                  </Label>
                  <Input id="phone" placeholder="+8801XXXXXXXXX" className="font-manrope" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="font-manrope">
                  Address
                </Label>
                <Textarea id="address" placeholder="Enter full address" className="font-manrope" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-geist">Academic Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="font-manrope">Subjects Taught</Label>
                <div className="grid grid-cols-3 gap-2">
                  {["Math", "Science", "English", "History", "Geography", "Physics", "Chemistry", "Biology"].map(
                    (subject) => (
                      <div key={subject} className="flex items-center space-x-2">
                        <Checkbox
                          id={subject}
                          checked={selectedSubjects.includes(subject)}
                          onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                        />
                        <Label htmlFor={subject} className="text-sm font-manrope">
                          {subject}
                        </Label>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-manrope">Classes Assigned</Label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    "Class 1",
                    "Class 2",
                    "Class 3",
                    "Class 4",
                    "Class 5",
                    "Class 6",
                    "Class 7",
                    "Class 8",
                    "Class 9",
                    "Class 10",
                  ].map((className) => (
                    <div key={className} className="flex items-center space-x-2">
                      <Checkbox
                        id={className}
                        checked={selectedClasses.includes(className)}
                        onCheckedChange={(checked) => handleClassChange(className, checked as boolean)}
                      />
                      <Label htmlFor={className} className="text-sm font-manrope">
                        {className}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-geist">Qualification & Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="qualification" className="font-manrope">
                    Highest Qualification
                  </Label>
                  <Input id="qualification" placeholder="B.Sc in Mathematics" className="font-manrope" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joiningDate" className="font-manrope">
                    Joining Date
                  </Label>
                  <Input id="joiningDate" type="date" className="font-manrope" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="font-manrope">Experience History</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addExperienceEntry}
                    className="font-manrope bg-transparent"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Experience
                  </Button>
                </div>
                {experienceHistory.map((entry, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 items-end">
                    <div className="space-y-2">
                      <Label className="font-manrope">School/Institution</Label>
                      <Input
                        placeholder="ABC School"
                        value={entry.school}
                        onChange={(e) => updateExperienceEntry(index, "school", e.target.value)}
                        className="font-manrope"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-manrope">Years</Label>
                      <Input
                        type="number"
                        placeholder="3"
                        value={entry.years}
                        onChange={(e) => updateExperienceEntry(index, "years", e.target.value)}
                        className="font-manrope"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeExperienceEntry(index)}
                      disabled={experienceHistory.length === 1}
                      className="h-10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-geist">Salary Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="basicSalary" className="font-manrope">
                    Basic Salary
                  </Label>
                  <Input id="basicSalary" type="number" placeholder="25000" className="font-manrope" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allowance" className="font-manrope">
                    Allowance
                  </Label>
                  <Input id="allowance" type="number" placeholder="5000" className="font-manrope" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankAccount" className="font-manrope">
                    Bank Account
                  </Label>
                  <Input id="bankAccount" placeholder="0123456789" className="font-manrope" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="font-manrope">
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)} className="font-manrope">
            Add Teacher
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
