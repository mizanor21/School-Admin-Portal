"use client";

import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus, X, Pencil, Calendar } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

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
import { useNoticesData } from "@/app/data/DataFetch";

interface NoticeFormValues {
  title: string;
  description: string;
  date: Date;
  author: string;
  isPublished: boolean;
  targetClass: string[];
}

interface AddNoticeModalProps {
  notice?: NoticeFormValues & { _id?: string };
  mode?: "add" | "edit";
}

export function AddNoticeModal({ notice, mode = "add" }: AddNoticeModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
      });
    } else {
      form.reset({
        title: "",
        description: "",
        date: new Date(),
        author: "",
        isPublished: true,
        targetClass: [],
      });
    }
  }, [notice, mode, form]);

  const onSubmit = async (data: NoticeFormValues) => {
    try {
      setLoading(true);
      
      // Format the data for API
      const formattedData = {
        ...data,
        date: data.date.toISOString(),
      };
      
      if (mode === "edit" && notice?._id) {
        // PATCH request for update
        await axios.patch(`/api/notices/${notice._id}`, formattedData);
        toast.success("Notice updated successfully");
        mutate()
        form.reset();
      } else {
        // POST request for create
        await axios.post("/api/notices", formattedData);
        toast.success("Notice added successfully");
        mutate()
        form.reset();
      }
      
      mutate();
      setOpen(false);
    } catch (error) {
      console.error("Error saving notice:", error);
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
            Add Notice
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
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
                disabled={loading}
                onClick={() => setOpen(false)}
                className="hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
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