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
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Upload, X } from "lucide-react"

export function CreateNoticeDialog() {
  const [open, setOpen] = useState(false)
  const [schedulePublish, setSchedulePublish] = useState(false)
  const [noticeId, setNoticeId] = useState(() => {
    const year = new Date().getFullYear()
    const randomNum = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    return `NOC-${year}-${randomNum}`
  })
  const [targetAudience, setTargetAudience] = useState<string[]>([])
  const [attachments, setAttachments] = useState<string[]>([])

  const handleAudienceChange = (audience: string, checked: boolean) => {
    if (checked) {
      setTargetAudience([...targetAudience, audience])
    } else {
      setTargetAudience(targetAudience.filter((a) => a !== audience))
    }
  }

  const addAttachment = () => {
    setAttachments([...attachments, ""])
  }

  const updateAttachment = (index: number, url: string) => {
    const updated = attachments.map((att, i) => (i === index ? url : att))
    setAttachments(updated)
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-manrope">
          <Plus className="h-4 w-4 mr-2" />
          Create Notice
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-geist">Create New Notice</DialogTitle>
          <DialogDescription className="font-manrope">
            Create and publish a comprehensive notice with smart targeting and scheduling options.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-geist">Notice Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="noticeId" className="font-manrope">
                    Notice ID
                  </Label>
                  <Input
                    id="noticeId"
                    value={noticeId}
                    onChange={(e) => setNoticeId(e.target.value)}
                    className="font-manrope"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="font-manrope">
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger className="font-manrope">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Academic">Academic</SelectItem>
                      <SelectItem value="Administrative">Administrative</SelectItem>
                      <SelectItem value="Event">Event</SelectItem>
                      <SelectItem value="Holiday">Holiday</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="font-manrope">
                  Notice Title
                </Label>
                <Input id="title" placeholder="Enter notice title" className="font-manrope" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-manrope">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Write detailed notice description here..."
                  className="min-h-[120px] font-manrope"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-geist">Targeting & Priority</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="font-manrope">Target Audience</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "All Students",
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
                    "Teachers",
                    "Parents",
                    "Staff",
                  ].map((audience) => (
                    <div key={audience} className="flex items-center space-x-2">
                      <Checkbox
                        id={audience}
                        checked={targetAudience.includes(audience)}
                        onCheckedChange={(checked) => handleAudienceChange(audience, checked as boolean)}
                      />
                      <Label htmlFor={audience} className="text-sm font-manrope">
                        {audience}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority" className="font-manrope">
                    Priority
                  </Label>
                  <Select>
                    <SelectTrigger className="font-manrope">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status" className="font-manrope">
                    Status
                  </Label>
                  <Select defaultValue="Active">
                    <SelectTrigger className="font-manrope">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-geist">Scheduling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfIssue" className="font-manrope">
                    Date of Issue
                  </Label>
                  <Input
                    id="dateOfIssue"
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    className="font-manrope"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validUntil" className="font-manrope">
                    Valid Until
                  </Label>
                  <Input id="validUntil" type="date" className="font-manrope" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="schedule" checked={schedulePublish} onCheckedChange={setSchedulePublish} />
                <Label htmlFor="schedule" className="font-manrope">
                  Schedule for later publication
                </Label>
              </div>

              {schedulePublish && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="publishDate" className="font-manrope">
                      Publish Date
                    </Label>
                    <Input id="publishDate" type="date" className="font-manrope" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publishTime" className="font-manrope">
                      Publish Time
                    </Label>
                    <Input id="publishTime" type="time" className="font-manrope" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-geist">Attachments</CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addAttachment}
                className="font-manrope bg-transparent"
              >
                <Upload className="h-4 w-4 mr-1" />
                Add Attachment
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {attachments.map((attachment, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    placeholder="Enter attachment URL or file path"
                    value={attachment}
                    onChange={(e) => updateAttachment(index, e.target.value)}
                    className="font-manrope flex-1"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={() => removeAttachment(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {attachments.length === 0 && (
                <p className="text-sm text-muted-foreground font-manrope">No attachments added yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} className="font-manrope">
            Save as Draft
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)} className="font-manrope">
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)} className="font-manrope">
            Publish Notice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
