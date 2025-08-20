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
import { MoreHorizontal, Eye, Edit, Trash2, Calendar, Users, FileText, Download, Clock, Megaphone } from "lucide-react"
import { useNoticesData } from "@/app/data/DataFetch"
import { useState } from "react"
import { AddNoticeModal } from "./create-notice-dialog"

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
  __v?: number;
}

export function NoticesGrid() {
  const { data: notices = [], isLoading, mutate } = useNoticesData();
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <FileText className="h-3 w-3" />;
    if (type === 'application/pdf') return <FileText className="h-3 w-3" />;
    return <FileText className="h-3 w-3" />;
  };

  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this notice?")) {
      try {
        await fetch(`/api/notices/?id=${id}`, {
          method: 'DELETE',
        });
        mutate();
      } catch (error) {
        console.error("Error deleting notice:", error);
      }
    }
  };

  const handleDownload = (document: { url: string; name: string }) => {
    const link = document.createElement('a');
    link.href = document.url;
    link.download = document.name;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notices.map((notice: Notice) => (
          <Card key={notice._id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="font-geist text-lg mb-2 line-clamp-2">
                    {notice.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge 
                      variant={notice.isPublished ? "default" : "secondary"} 
                      className="font-manrope"
                    >
                      {notice.isPublished ? "Published" : "Draft"}
                    </Badge>
                    <Badge variant="outline" className="font-manrope">
                      <Megaphone className="h-3 w-3 mr-1" />
                      Notice
                    </Badge>
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
                    <DropdownMenuItem 
                      className="font-manrope"
                      onClick={() => handleEdit(notice)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Notice
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="font-manrope text-destructive"
                      onClick={() => handleDelete(notice._id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Notice
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground font-manrope mb-4 line-clamp-3">
                {notice.description}
              </p>

              {/* Documents section */}
              {notice.documents && notice.documents.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Attachments:</p>
                  <div className="space-y-1">
                    {notice.documents.map((doc, index) => (
                      <div
                        key={doc._id || index}
                        className="flex items-center justify-between p-2 border rounded-md bg-gray-50 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          {getFileIcon(doc.type)}
                          <span className="truncate max-w-[120px]">{doc.name}</span>
                          <span className="text-muted-foreground">({formatFileSize(doc.size)})</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => handleDownload(doc)}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs bg-blue-100">
                        {getInitials(notice.author || "Admin")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-manrope">
                      {notice.author || "Administrator"}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(notice.date).toLocaleDateString()}
                  </Badge>
                </div>

                <div className="flex items-center gap-1 text-xs text-muted-foreground font-manrope">
                  <Users className="h-3 w-3" />
                  <span>For: {notice.targetClass.join(", ")}</span>
                </div>

                {notice.documents && notice.documents.length > 0 && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground font-manrope">
                    <FileText className="h-3 w-3" />
                    <span>{notice.documents.length} attachment(s)</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingNotice && (
        <AddNoticeModal
          notice={editingNotice}
          mode="edit"
          onClose={() => setEditingNotice(null)}
        />
      )}
    </>
  );
}