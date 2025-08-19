import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { StudentsTable } from "@/components/students/students-table"
import { StudentFilters } from "@/components/students/student-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function StudentsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <Header />

        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-geist text-3xl font-bold text-foreground mb-2">Students</h1>
              <p className="font-manrope text-muted-foreground">Manage student records and information</p>
            </div>
              <Button className="font-manrope">
                <Plus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
          </div>

          <div className="space-y-6">
            <StudentFilters />
            <StudentsTable />
          </div>
        </main>
      </div>
    </div>
  )
}