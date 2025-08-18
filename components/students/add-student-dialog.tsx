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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Users } from "lucide-react"

export function AddStudentDialog() {
  const [open, setOpen] = useState(false)
  const [academicHistory, setAcademicHistory] = useState([{ session: "", class: "", roll: "", result: "Running" }])
  const [studentId, setStudentId] = useState(() => {
    const year = new Date().getFullYear()
    const randomNum = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    return `STU-${year}-${randomNum}`
  })

  const addAcademicEntry = () => {
    setAcademicHistory([...academicHistory, { session: "", class: "", roll: "", result: "Running" }])
  }

  const removeAcademicEntry = (index: number) => {
    if (academicHistory.length > 1) {
      setAcademicHistory(academicHistory.filter((_, i) => i !== index))
    }
  }

  const updateAcademicEntry = (index: number, field: string, value: string) => {
    const updated = academicHistory.map((entry, i) => (i === index ? { ...entry, [field]: value } : entry))
    setAcademicHistory(updated)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-6 border border-border rounded-xl hover:bg-muted hover:shadow-lg transition-all duration-300 text-left group bg-gradient-to-br from-primary/5 to-transparent">
          <Users className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform duration-300" />
          <p className="font-manrope font-semibold text-base mb-1">Add Student</p>
          <p className="text-sm text-muted-foreground">Enroll new student</p>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-geist">Add New Student</DialogTitle>
          <DialogDescription className="font-manrope">
            Enter comprehensive student information including academic history and guardian details.
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
                  <Label htmlFor="studentId" className="font-manrope">
                    Student ID
                  </Label>
                  <Input
                    id="studentId"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="font-manrope"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-geist">Guardian Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guardianName" className="font-manrope">
                    Guardian Name
                  </Label>
                  <Input id="guardianName" placeholder="Enter guardian name" className="font-manrope" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guardianPhone" className="font-manrope">
                    Guardian Phone
                  </Label>
                  <Input id="guardianPhone" placeholder="+8801XXXXXXXXX" className="font-manrope" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-geist">Academic History</CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addAcademicEntry}
                className="font-manrope bg-transparent"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Entry
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {academicHistory.map((entry, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 items-end">
                  <div className="space-y-2">
                    <Label className="font-manrope">Session</Label>
                    <Input
                      placeholder="2025"
                      value={entry.session}
                      onChange={(e) => updateAcademicEntry(index, "session", e.target.value)}
                      className="font-manrope"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-manrope">Class</Label>
                    <Select value={entry.class} onValueChange={(value) => updateAcademicEntry(index, "class", value)}>
                      <SelectTrigger className="font-manrope">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Class 1">Class 1</SelectItem>
                        <SelectItem value="Class 2">Class 2</SelectItem>
                        <SelectItem value="Class 3">Class 3</SelectItem>
                        <SelectItem value="Class 4">Class 4</SelectItem>
                        <SelectItem value="Class 5">Class 5</SelectItem>
                        <SelectItem value="Class 6">Class 6</SelectItem>
                        <SelectItem value="Class 7">Class 7</SelectItem>
                        <SelectItem value="Class 8">Class 8</SelectItem>
                        <SelectItem value="Class 9">Class 9</SelectItem>
                        <SelectItem value="Class 10">Class 10</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-manrope">Roll</Label>
                    <Input
                      type="number"
                      placeholder="Roll"
                      value={entry.roll}
                      onChange={(e) => updateAcademicEntry(index, "roll", e.target.value)}
                      className="font-manrope"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-manrope">Result</Label>
                    <Select value={entry.result} onValueChange={(value) => updateAcademicEntry(index, "result", value)}>
                      <SelectTrigger className="font-manrope">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Running">Running</SelectItem>
                        <SelectItem value="Passed">Passed</SelectItem>
                        <SelectItem value="Failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeAcademicEntry(index)}
                    disabled={academicHistory.length === 1}
                    className="h-10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-geist">Fee Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalFee" className="font-manrope">
                    Total Fee (Current Session)
                  </Label>
                  <Input id="totalFee" type="number" placeholder="16000" className="font-manrope" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paidFee" className="font-manrope">
                    Paid Amount
                  </Label>
                  <Input id="paidFee" type="number" placeholder="8000" className="font-manrope" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueFee" className="font-manrope">
                    Due Amount
                  </Label>
                  <Input id="dueFee" type="number" placeholder="8000" className="font-manrope" readOnly />
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
            Add Student
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
