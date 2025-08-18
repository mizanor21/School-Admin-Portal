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
            <Card className="glass-card glass-hover border-0 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 rounded-full -translate-y-10 translate-x-10 blur-xl"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-manrope font-medium text-foreground/90">Total Students</CardTitle>
                <div className="p-2 glass rounded-lg">
                  <Users className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-geist font-bold text-primary">1,234</div>
                <p className="text-xs text-muted-foreground font-manrope">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="glass-card glass-hover border-0 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-secondary/20 rounded-full -translate-y-10 translate-x-10 blur-xl"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-manrope font-medium text-foreground/90">Total Teachers</CardTitle>
                <div className="p-2 glass rounded-lg">
                  <GraduationCap className="h-4 w-4 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-geist font-bold text-secondary">89</div>
                <p className="text-xs text-muted-foreground font-manrope">+3 new this month</p>
              </CardContent>
            </Card>

            <Card className="glass-card glass-hover border-0 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent/20 rounded-full -translate-y-10 translate-x-10 blur-xl"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-manrope font-medium text-foreground/90">Active Classes</CardTitle>
                <div className="p-2 glass rounded-lg">
                  <BookOpen className="h-4 w-4 text-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-geist font-bold text-accent">42</div>
                <p className="text-xs text-muted-foreground font-manrope">Across 12 grades</p>
              </CardContent>
            </Card>

            <Card className="glass-card glass-hover border-0 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-chart-4/20 rounded-full -translate-y-10 translate-x-10 blur-xl"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-manrope font-medium text-foreground/90">Attendance Rate</CardTitle>
                <div className="p-2 glass rounded-lg">
                  <TrendingUp className="h-4 w-4 text-chart-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-geist font-bold text-chart-4">94.2%</div>
                <p className="text-xs text-muted-foreground font-manrope">+2.1% from yesterday</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card glass-hover border-l-4 border-l-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-manrope font-medium text-foreground/90">Active Notices</CardTitle>
                <ClipboardList className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-geist font-bold text-foreground">15</div>
                <p className="text-xs text-muted-foreground font-manrope">5 published today</p>
              </CardContent>
            </Card>

            <Card className="glass-card glass-hover border-l-4 border-l-secondary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-manrope font-medium text-foreground/90">Upcoming Events</CardTitle>
                <Calendar className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-geist font-bold text-foreground">8</div>
                <p className="text-xs text-muted-foreground font-manrope">This week</p>
              </CardContent>
            </Card>

            <Card className="glass-card glass-hover border-l-4 border-l-accent">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-manrope font-medium text-foreground/90">Average Grade</CardTitle>
                <Award className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-geist font-bold text-foreground">B+</div>
                <p className="text-xs text-muted-foreground font-manrope">85.4% overall</p>
              </CardContent>
            </Card>

            <Card className="glass-card glass-hover border-l-4 border-l-destructive">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-manrope font-medium text-foreground/90">Pending Issues</CardTitle>
                <AlertCircle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-geist font-bold text-foreground">3</div>
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

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-geist text-foreground">Recent Activities</CardTitle>
                <CardDescription className="font-manrope text-muted-foreground">
                  Latest updates from your school
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-3 rounded-lg glass">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-manrope font-medium text-foreground">New student John Doe enrolled</p>
                      <p className="text-xs text-muted-foreground">Grade 10 - Mathematics Track</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-3 rounded-lg glass">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-manrope font-medium text-foreground">Curriculum updated</p>
                      <p className="text-xs text-muted-foreground">Sarah Wilson - Math Department</p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-3 rounded-lg glass">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-manrope font-medium text-foreground">Notice published</p>
                      <p className="text-xs text-muted-foreground">Parent-Teacher Meeting Schedule</p>
                      <p className="text-xs text-muted-foreground">6 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-3 rounded-lg glass">
                    <div className="w-2 h-2 bg-chart-4 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-manrope font-medium text-foreground">Attendance report generated</p>
                      <p className="text-xs text-muted-foreground">Monthly summary available</p>
                      <p className="text-xs text-muted-foreground">8 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}