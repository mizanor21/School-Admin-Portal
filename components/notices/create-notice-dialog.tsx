"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Plus, Pencil, Upload, X, FileText, ImageIcon, File } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "../ui/date-picker";
import { Progress } from "../ui/progress";
import { useNoticesData } from "@/app/data/DataFetch";

interface Document {
  url: string;
  name: string;
  type: string;
  size: number;
}

interface NoticeFormValues {
  title: string;
  description: string;
  date: Date;
  author: string;
  isPublished: boolean;
  targetClass: string[];
  documents: Document[];
}

interface AddNoticeModalProps {
  notice?: NoticeFormValues & { _id?: string };
  mode?: "add" | "edit";
}

export function AddNoticeModal({ notice, mode = "add" }: AddNoticeModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { mutate } = useNoticesData();

  // Available classes
  const availableClasses = [
    "Students", "Teachers", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"
  ];

  const form = useForm<NoticeFormValues>({
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      author: "",
      isPublished: true,
      targetClass: [],
      documents: [],
    },
  });

  useEffect(() => {
    if (notice && mode === "edit") {
      form.reset({
        title: notice.title,
        description: notice.description,
        date: new Date(notice.date),
        author: notice.author || "",
        isPublished: notice.isPublished,
        targetClass: notice.targetClass || [],
        documents: notice.documents || [],
      });
    } else {
      form.reset({
        title: "",
        description: "",
        date: new Date(),
        author: "",
        isPublished: true,
        targetClass: [],
        documents: [],
      });
    }
  }, [notice, mode, form]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const uploadedDocuments: Document[] = [];
      
      for (const file of acceptedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "habson");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dov6k7xdk/auto/upload",
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total || 100)
              );
              setUploadProgress(percentCompleted);
            },
          }
        );

        uploadedDocuments.push({
          url: response.data.secure_url,
          name: file.name,
          type: file.type,
          size: file.size
        });
      }

      const currentDocuments = form.getValues("documents") || [];
      form.setValue("documents", [...currentDocuments, ...uploadedDocuments]);
      toast.success(`Uploaded ${uploadedDocuments.length} file(s) successfully`);
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload files");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }, [form]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/plain': ['.txt']
    },
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024, // 10MB per file
  });

  const removeDocument = (index: number) => {
    const currentDocuments = form.getValues("documents") || [];
    const newDocuments = currentDocuments.filter((_, i) => i !== index);
    form.setValue("documents", newDocuments);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="h-4 w-4" />;
    if (type === 'application/pdf') return <FileText className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const onSubmit = async (data: NoticeFormValues) => {
    try {
      setLoading(true);
      
      // Format the data for API
      const formattedData = {
        ...data,
        date: data.date?.toISOString(),
      };
      
      if (mode === "edit" && notice?._id) {
        // PATCH request for update
        await axios.patch(`/api/notices/${notice._id}`, formattedData);
        toast.success("Notice updated successfully");
      } else {
        // POST request for create
        await axios.post("/api/notices", formattedData);
        toast.success("Notice added successfully");
      }
      
      mutate();
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error saving notice:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const documents = form.watch("documents") || [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "edit" ? (
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="font-manrope">
            <Plus className="h-4 w-4 mr-2" />
            Add Notice
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {mode === "edit" ? "Edit Notice" : "Add New Notice"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Title *</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter notice title"
                      required
                      className="focus:ring-2 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Enter notice description"
                      required
                      rows={4}
                      className="focus:ring-2 focus:ring-blue-500 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Date *</FormLabel>
                    <FormControl>
                      <DatePicker
                        disabled={loading}
                        date={field.value}
                        setDate={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Author</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Author name (optional)"
                        className="focus:ring-2 focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Documents Upload Section */}
            <div className="space-y-2">
              <FormLabel className="text-gray-700">Attachments</FormLabel>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Upload className="h-8 w-8 text-gray-500" />
                  <p className="text-sm text-gray-600">
                    {isDragActive
                      ? "Drop the files here"
                      : "Drag & drop files here, or click to select"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Images, PDF, DOC, XLS, TXT (Max 10MB each, max 5 files)
                  </p>
                </div>
              </div>
              
              {uploading && (
                <div className="space-y-1">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-xs text-gray-500 text-right">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}

              {/* Uploaded Documents List */}
              {documents.length > 0 && (
                <div className="space-y-2 mt-4">
                  <p className="text-sm text-gray-600">Attached files:</p>
                  <div className="space-y-2">
                    {documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-md bg-gray-50"
                      >
                        <div className="flex items-center space-x-2">
                          {getFileIcon(doc.type)}
                          <div className="flex flex-col">
                            <span className="text-sm font-medium truncate max-w-xs">
                              {doc.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatFileSize(doc.size)}
                            </span>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDocument(index)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <FormLabel className="text-gray-700">Target Classes *</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3 border rounded-md">
                {availableClasses.map((className) => (
                  <FormField
                    key={className}
                    control={form.control}
                    name="targetClass"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={className}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(className)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, className])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== className
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            {className}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </div>

            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Publish immediately</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      The notice will be visible to selected classes when published.
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                type="button"
                disabled={loading || uploading}
                onClick={() => setOpen(false)}
                className="hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || uploading}
                className="bg-blue-600 hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                {loading 
                  ? (mode === "edit" ? "Updating..." : "Adding...") 
                  : (mode === "edit" ? "Update Notice" : "Add Notice")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}