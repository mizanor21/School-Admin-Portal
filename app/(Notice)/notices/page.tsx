import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { NoticesGrid } from "@/components/notices/notices-grid"
import { NoticeFilters } from "@/components/notices/notice-filters"
import { NoticeStats } from "@/components/notices/notice-stats"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function NoticesPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <Header />

        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-geist text-3xl font-bold text-foreground mb-2">Notice Board</h1>
              <p className="font-manrope text-muted-foreground">Create and manage school announcements and notices</p>
            </div>
            <Button className="font-manrope">
              <Plus className="h-4 w-4 mr-2" />
              Create Notice
            </Button>
          </div>

          <div className="space-y-6">
            <NoticeStats />
            <NoticeFilters />
            <NoticesGrid />
          </div>
        </main>
      </div>
    </div>
  )
}
