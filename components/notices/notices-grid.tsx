"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash2, Calendar, Users, AlertTriangle, Megaphone, Clock } from "lucide-react"

// Mock notice data
const notices = [
  {
    id: "NOT001",
    title: "Parent-Teacher Meeting Schedule",
    content:
      "Annual parent-teacher meetings will be held from March 15-20. Please check your email for individual appointment times.",
    type: "announcement",
    priority: "high",
    status: "published",
    author: "Dr. Sarah Wilson",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    publishDate: "2024-03-10",
    targetAudience: "parents",
    views: 245,
  },
  {
    id: "NOT002",
    title: "Science Fair 2024",
    content:
      "The annual science fair will take place on April 5th in the main auditorium. Students can register their projects until March 25th.",
    type: "event",
    priority: "medium",
    status: "published",
    author: "Prof. Michael Chen",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    publishDate: "2024-03-08",
    targetAudience: "students",
    views: 189,
  },
  {
    id: "NOT003",
    title: "School Closure - Weather Alert",
    content:
      "Due to severe weather conditions, the school will remain closed tomorrow (March 12th). All classes are cancelled.",
    type: "alert",
    priority: "high",
    status: "published",
    author: "Admin Office",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    publishDate: "2024-03-11",
    targetAudience: "all",
    views: 567,
  },
  {
    id: "NOT004",
    title: "Library Book Return Reminder",
    content:
      "This is a friendly reminder that all library books are due by March 20th. Late fees will apply after this date.",
    type: "reminder",
    priority: "low",
    status: "published",
    author: "Ms. Emily Rodriguez",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    publishDate: "2024-03-09",
    targetAudience: "students",
    views: 123,
  },
  {
    id: "NOT005",
    title: "New Cafeteria Menu",
    content:
      "We're excited to introduce our new healthy meal options starting next week. Check out the updated menu on our website.",
    type: "announcement",
    priority: "medium",
    status: "draft",
    author: "Mr. David Thompson",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    publishDate: "2024-03-12",
    targetAudience: "all",
    views: 0,
  },
  {
    id: "NOT006",
    title: "Sports Day Registration",
    content:
      "Registration for the annual sports day is now open. Students can sign up for various events until March 30th.",
    type: "event",
    priority: "medium",
    status: "published",
    author: "Ms. Lisa Park",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    publishDate: "2024-03-07",
    targetAudience: "students",
    views: 298,
  },
]

export function NoticesGrid() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "announcement":
        return <Megaphone className="h-4 w-4" />
      case "event":
        return <Calendar className="h-4 w-4" />
      case "alert":
        return <AlertTriangle className="h-4 w-4" />
      case "reminder":
        return <Clock className="h-4 w-4" />
      default:
        return <Megaphone className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      announcement: "bg-blue-100 text-blue-800",
      event: "bg-green-100 text-green-800",
      alert: "bg-red-100 text-red-800",
      reminder: "bg-yellow-100 text-yellow-800",
    }
    return (
      <Badge className={`${colors[type as keyof typeof colors]} font-manrope`}>
        {getTypeIcon(type)}
        <span className="ml-1 capitalize">{type}</span>
      </Badge>
    )
  }

  const getPriorityBadge = (priority: string) => {
    let variant: "default" | "secondary" | "destructive" = "secondary"
    if (priority === "high") variant = "destructive"
    else if (priority === "medium") variant = "default"

    return (
      <Badge variant={variant} className="font-manrope capitalize">
        {priority}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    let variant: "default" | "secondary" | "destructive" = "default"
    if (status === "draft") variant = "secondary"
    else if (status === "archived") variant = "destructive"

    return (
      <Badge variant={variant} className="font-manrope capitalize">
        {status}
      </Badge>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notices.map((notice) => (
        <Card key={notice.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="font-geist text-lg mb-2 line-clamp-2">{notice.title}</CardTitle>
                <div className="flex items-center gap-2 mb-2">
                  {getTypeBadge(notice.type)}
                  {getPriorityBadge(notice.priority)}
                </div>
              </div>
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
                    View Notice
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-manrope">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Notice
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="font-manrope text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Notice
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground font-manrope mb-4 line-clamp-3">{notice.content}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={notice.authorAvatar || "/placeholder.svg"} alt={notice.author} />
                    <AvatarFallback className="text-xs">
                      {notice.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-manrope">{notice.author}</span>
                </div>
                {getStatusBadge(notice.status)}
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground font-manrope">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(notice.publishDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {notice.views} views
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground font-manrope">
                <Users className="h-3 w-3" />
                <span className="capitalize">Target: {notice.targetAudience}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
