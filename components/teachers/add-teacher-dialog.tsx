// components/teachers/add-teacher-modal.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus, Upload, X, Pencil } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "../ui/date-picker";
import { Progress } from "../ui/progress";
import { useTeachersData } from "@/app/data/DataFetch";

interface TeacherFormValues {
  teacherId: string;
  name: string;
  gender: "Male" | "Female" | "Other";
  dateOfBirth: Date;
  photo?: string;
  phone: string;
  email: string;
  subject: string;
  address: string;
}

interface AddTeacherModalProps {
  teacher?: TeacherFormValues & { id?: string };
  mode?: "add" | "edit";
}

export function AddTeacherModal({ teacher, mode = "add" }: AddTeacherModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const { mutate } = useTeachersData();

  const form = useForm<TeacherFormValues>({
    defaultValues: {
      teacherId: "",
      name: "",
      gender: "Male",
      dateOfBirth: new Date(),
      photo: "",
      phone: "",
      email: "",
      subject: "",
      address: "",
    },
  });

  useEffect(() => {
    if (teacher && mode === "edit") {
      form.reset({
        teacherId: teacher.teacherId,
        name: teacher.name,
        gender: teacher.gender,
        dateOfBirth: new Date(teacher.dateOfBirth),
        photo: teacher.photo,
        phone: teacher.phone,
        email: teacher.email,
        subject: teacher.subject,
        address: teacher.address,
      });
      if (teacher.photo) {
        setPreview(teacher.photo);
      }
    } else {
      form.reset({
        teacherId: "",
        name: "",
        gender: "Male",
        dateOfBirth: new Date(),
        photo: "",
        phone: "",
        email: "",
        subject: "",
        address: "",
      });
      setPreview(null);
    }
  }, [teacher, mode, form]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "habson");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dov6k7xdk/image/upload",
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

      form.setValue("photo", response.data.secure_url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload image");
      setPreview(null);
    } finally {
      setUploading(false);
    }
  }, [form]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const removeImage = () => {
    setPreview(null);
    form.setValue("photo", "");
  };

  const onSubmit = async (data: TeacherFormValues) => {
    try {
      setLoading(true);
      
      if (mode === "edit" && teacher?._id) {
        // PATCH request for update
        await axios.patch(`/api/teachers/${teacher._id}`, data);
        toast.success("Teacher updated successfully");
      } else {
        // POST request for create
        await axios.post("/api/teachers", data);
        toast.success("Teacher added successfully");
      }
      
      mutate();
      form.reset();
      setPreview(null);
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
            Add Teacher
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {mode === "edit" ? "Edit Teacher" : "Add New Teacher"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="teacherId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Teacher ID</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading || mode === "edit"}
                        placeholder="T-001"
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="John Doe"
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
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Gender</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Date of Birth</FormLabel>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="john@example.com"
                        type="email"
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Phone</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="+1234567890"
                        type="tel"
                        required
                        className="focus:ring-2 focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Image Upload Section */}
            <div className="space-y-2">
              <FormLabel className="text-gray-700">Profile Photo</FormLabel>
              {preview ? (
                <div className="relative group">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-32 w-32 rounded-lg object-cover border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="h-8 w-8 text-gray-500" />
                    <p className="text-sm text-gray-600">
                      {isDragActive
                        ? "Drop the image here"
                        : "Drag & drop an image here, or click to select"}
                    </p>
                    <p className="text-xs text-gray-500">
                      JPEG, PNG, WEBP (Max 5MB)
                    </p>
                  </div>
                </div>
              )}
              {uploading && (
                <div className="space-y-1">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-xs text-gray-500 text-right">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Subject</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Mathematics"
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="123 Main St, City"
                      required
                      className="focus:ring-2 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                type="button"
                disabled={loading}
                onClick={() => {
                  setOpen(false);
                  setPreview(null);
                }}
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
                  : (mode === "edit" ? "Update Teacher" : "Add Teacher")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}