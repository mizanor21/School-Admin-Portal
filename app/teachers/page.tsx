import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { TeachersTable } from "@/components/teachers/teachers-table"
import { TeacherFilters } from "@/components/teachers/teacher-filters"
import { TeacherStats } from "@/components/teachers/teacher-stats"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function TeachersPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <Header />

        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-geist text-3xl font-bold text-foreground mb-2">Teachers</h1>
              <p className="font-manrope text-muted-foreground">Manage teacher profiles, subjects, and schedules</p>
            </div>
            <Button className="font-manrope">
              <Plus className="h-4 w-4 mr-2" />
              Add Teacher
            </Button>
          </div>

          <div className="space-y-6">
            <TeacherStats />
            <TeacherFilters />
            <TeachersTable />
          </div>
        </main>
      </div>
    </div>
  )
}
