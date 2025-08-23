"use client";

import { useState, useCallback, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { useStudentsData } from "@/app/data/DataFetch";

interface Guardian {
  fName: string;
  mName: string;
}

interface AcademicHistory {
  session: string;
  class: string;
  roll: number;
  result: string;
}

interface StudentFormValues {
  name: string;
  name_bn: string;
  phone: string;
  photo: string;
  birthCertificate?: string;
  gender: "Male" | "Female" | "Other";
  dateOfBirth: Date;
  status: "active" | "inactive" | "new-admission";
  guardian: Guardian;
  academicHistory: AcademicHistory[];
}

interface AddStudentModalProps {
  student?: StudentFormValues & { _id?: string };
  mode?: "add" | "edit";
}

export function AddStudentModal({ student, mode = "add" }: AddStudentModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const { mutate } = useStudentsData();

  const form = useForm<StudentFormValues>({
    defaultValues: {
      name: "",
      name_bn: "",
      phone: "",
      photo: "",
      gender: "Male",
      dateOfBirth: new Date(),
      birthCertificate: "",
      status: "active",
      guardian: {
        fName: "",
        mName: ""
      },
      academicHistory: []
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "academicHistory"
  });

  useEffect(() => {
    if (student && mode === "edit") {
      form.reset({
        name: student.name,
        name_bn: student.name_bn || "",
        phone: student.phone,
        photo: student.photo,
        gender: student.gender,
        birthCertificate: student.birthCertificate || "",
        dateOfBirth: new Date(student.dateOfBirth),
        status: student.status || "active",
        guardian: student.guardian || { fName: "", mName: "" },
        academicHistory: student.academicHistory || []
      });
      if (student.photo) {
        setPreview(student.photo);
      }
    } else {
      form.reset({
        name: "",
        name_bn: "",
        phone: "",
        photo: "",
        gender: "Male",
        birthCertificate: "",
        dateOfBirth: new Date(),
        status: "active",
        guardian: {
          fName: "",
          mName: ""
        },
        academicHistory: []
      });
      setPreview(null);
    }
  }, [student, mode, form]);

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

  const onSubmit = async (data: StudentFormValues) => {
    try {
      setLoading(true);

      // Format date for MongoDB
      const formattedData = {
        ...data,
        dateOfBirth: data.dateOfBirth.toISOString(),
        academicHistory: data.academicHistory.map(history => ({
          ...history,
          roll: Number(history.roll) // Ensure roll is a number
        }))
      };

      if (mode === "edit" && student?._id) {
        // PATCH request for update
        await axios.patch(`/api/students/${student._id}`, formattedData);
        toast.success("Student updated successfully");
      } else {
        // POST request for create
        await axios.post("/api/students", formattedData);
        toast.success("Student added successfully");
      }

      mutate();
      form.reset();
      setPreview(null);
      setOpen(false);
    } catch (error) {
      console.error("Error saving student:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const addAcademicRecord = () => {
    append({
      session: "",
      class: "",
      roll: 0,
      result: ""
    });
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
            Add Student
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {mode === "edit" ? "Edit Student" : "Add New Student"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Name (English)*</FormLabel>
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
                name="name_bn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Name (Bangla)*</FormLabel>
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
                    <FormLabel className="text-gray-700">Gender *</FormLabel>
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
                    <FormLabel className="text-gray-700">Date of Birth *</FormLabel>
                    <FormControl>
                      <Input
                      type="date"
                      disabled={loading}
                      {...field}
                      value={field.value.toISOString().split('T')[0]}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                      className="focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthCertificate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Birth Certificate *</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Birth Certificate Number"
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
                    <FormLabel className="text-gray-700">Phone Number *</FormLabel>
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

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Status *</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="new-admission">New Admission</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
            </div>

            {/* Photo Upload */}
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
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragActive
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

            {/* Guardian Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Guardian Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="guardian.fName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Fathers Name *</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Father's full name"
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
                  name="guardian.mName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Mother's Name *</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Guardian's phone number"
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
            </div>

            {/* Academic History */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Academic History</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAcademicRecord}
                  disabled={loading}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Record
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Record {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      disabled={loading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`academicHistory.${index}.session`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Session *</FormLabel>
                          <Select
                            disabled={loading}
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Select session" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from({ length: 26 }, (_, i) => {
                                const startYear = 2024 + i;
                                const endYear = startYear + 1;
                                const session = `${startYear}-${endYear}`;
                                return (
                                  <SelectItem key={session} value={session}>
                                    {session}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`academicHistory.${index}.class`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Class *</FormLabel>
                          <Select
                            disabled={loading}
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Select class" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Class 6">Class 6</SelectItem>
                              <SelectItem value="Class 7">Class 7</SelectItem>
                              <SelectItem value="Class 8">Class 8</SelectItem>
                              <SelectItem value="Class 9">Class 9</SelectItem>
                              <SelectItem value="Class 10">Class 10</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`academicHistory.${index}.roll`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Roll Number</FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              type="number"
                              placeholder="1"
                              className="focus:ring-2 focus:ring-blue-500"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`academicHistory.${index}.result`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Result</FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="A+"
                              className="focus:ring-2 focus:ring-blue-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>

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
                  : (mode === "edit" ? "Update Student" : "Add Student")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}