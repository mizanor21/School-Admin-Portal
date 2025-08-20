'use client'
import { useNoticesData } from "@/app/data/DataFetch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, Eye, Calendar, AlertTriangle, Clock } from "lucide-react"
import { useState, useEffect } from "react";

interface Notice {
  _id: string;
  title: string;
  description: string;
  date: string;
  author: string;
  isPublished: boolean;
  targetClass: string[];
  documents: Array<{
    url: string;
    name: string;
    type: string;
    size: number;
    _id?: string;
  }>;
}

export function NoticeStats() {
  const { data: notices = [], isLoading } = useNoticesData();
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    upcoming: 0,
    recent: 0
  });

  useEffect(() => {
    if (notices.length > 0) {
      const now = new Date();
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(now.getDate() + 30);
      
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 7);

      const total = notices.length;
      const published = notices.filter(notice => notice.isPublished).length;
      
      const upcoming = notices.filter(notice => {
        const noticeDate = new Date(notice.date);
        return noticeDate > now && noticeDate <= thirtyDaysFromNow;
      }).length;

      const recent = notices.filter(notice => {
        const noticeDate = new Date(notice.date);
        return noticeDate >= sevenDaysAgo && noticeDate <= now;
      }).length;

      setStats({ total, published, upcoming, recent });
    }
  }, [notices]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-manrope font-medium">Total Notices</CardTitle>
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-geist font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground font-manrope">
            {stats.recent > 0 ? `+${stats.recent} this week` : 'No new notices this week'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-manrope font-medium">Published</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-geist font-bold">{stats.published}</div>
          <p className="text-xs text-muted-foreground font-manrope">
            {stats.published > 0 ? 'Currently active' : 'No published notices'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-manrope font-medium">Upcoming</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-geist font-bold">{stats.upcoming}</div>
          <p className="text-xs text-muted-foreground font-manrope">
            Next 30 days
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-manrope font-medium">Draft Notices</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-geist font-bold">{stats.total - stats.published}</div>
          <p className="text-xs text-muted-foreground font-manrope">
            Waiting to publish
          </p>
        </CardContent>
      </Card>
    </div>
  );
}