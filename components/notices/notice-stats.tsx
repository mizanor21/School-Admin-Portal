import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, Eye, Calendar, AlertTriangle } from "lucide-react"

export function NoticeStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-manrope font-medium">Total Notices</CardTitle>
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-geist font-bold">47</div>
          <p className="text-xs text-muted-foreground font-manrope">+5 this week</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-manrope font-medium">Published</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-geist font-bold">32</div>
          <p className="text-xs text-muted-foreground font-manrope">Currently active</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-manrope font-medium">Upcoming Events</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-geist font-bold">8</div>
          <p className="text-xs text-muted-foreground font-manrope">Next 30 days</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-manrope font-medium">Urgent Notices</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-geist font-bold">3</div>
          <p className="text-xs text-muted-foreground font-manrope">Require attention</p>
        </CardContent>
      </Card>
    </div>
  )
}
