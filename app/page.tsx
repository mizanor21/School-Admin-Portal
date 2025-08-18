import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, ClipboardList, TrendingUp, Calendar, BookOpen, Award, AlertCircle } from "lucide-react"
import { AttendanceChart } from "@/components/charts/attendance-chart"
import { EnrollmentChart } from "@/components/charts/enrollment-chart"
import { PerformanceChart } from "@/components/charts/performance-chart"

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <Header />

        <main className="p-6 space-y-8">
          <div className="mb-8">
            <h1 className="font-geist text-3xl font-bold text-foreground mb-2">Welcome back, Admin</h1>
            <p className="font-manrope text-muted-foreground">Here's what's happening at your school today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-manrope font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-geist font-bold">1,234</div>
                <p className="text-xs text-muted-foreground font-manrope">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-manrope font-medium">Total Teachers</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-geist font-bold">89</div>
                <p className="text-xs text-muted-foreground font-manrope">+3 new this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-manrope font-medium">Active Classes</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-geist font-bold">42</div>
                <p className="text-xs text-muted-foreground font-manrope">Across 12 grades</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-manrope font-medium">Attendance Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-geist font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground font-manrope">+2.1% from yesterday</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-manrope font-medium">Active Notices</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-geist font-bold">15</div>
                <p className="text-xs text-muted-foreground font-manrope">5 published today</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-manrope font-medium">Upcoming Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-geist font-bold">8</div>
                <p className="text-xs text-muted-foreground font-manrope">This week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-manrope font-medium">Average Grade</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-geist font-bold">B+</div>
                <p className="text-xs text-muted-foreground font-manrope">85.4% overall</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-manrope font-medium">Pending Issues</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-geist font-bold">3</div>
                <p className="text-xs text-muted-foreground font-manrope">Require attention</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AttendanceChart />
            <EnrollmentChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PerformanceChart />
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-geist">Recent Activities</CardTitle>
                <CardDescription className="font-manrope">Latest updates from your school</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-manrope font-medium">New student John Doe enrolled</p>
                      <p className="text-xs text-muted-foreground">Grade 10 - Mathematics Track</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-manrope font-medium">Curriculum updated</p>
                      <p className="text-xs text-muted-foreground">Sarah Wilson - Math Department</p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-manrope font-medium">Notice published</p>
                      <p className="text-xs text-muted-foreground">Parent-Teacher Meeting Schedule</p>
                      <p className="text-xs text-muted-foreground">6 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="w-2 h-2 bg-chart-4 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-manrope font-medium">Attendance report generated</p>
                      <p className="text-xs text-muted-foreground">Monthly summary available</p>
                      <p className="text-xs text-muted-foreground">8 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-geist">Quick Actions</CardTitle>
              <CardDescription className="font-manrope">Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left group">
                  <Users className="h-6 w-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-manrope font-medium text-sm">Add Student</p>
                  <p className="text-xs text-muted-foreground">Enroll new student</p>
                </button>
                <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left group">
                  <GraduationCap className="h-6 w-6 text-secondary mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-manrope font-medium text-sm">Add Teacher</p>
                  <p className="text-xs text-muted-foreground">Register new staff</p>
                </button>
                <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left group">
                  <ClipboardList className="h-6 w-6 text-accent mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-manrope font-medium text-sm">New Notice</p>
                  <p className="text-xs text-muted-foreground">Publish announcement</p>
                </button>
                <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left group">
                  <TrendingUp className="h-6 w-6 text-chart-4 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-manrope font-medium text-sm">View Reports</p>
                  <p className="text-xs text-muted-foreground">Analytics dashboard</p>
                </button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
