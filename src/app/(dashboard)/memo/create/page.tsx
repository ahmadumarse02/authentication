"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { memoSchema, MemoFormValues } from "@/schema/memoSchema";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createMemo } from "@/actions/memo/memo";
import { Card } from "@/components/ui/card";
import { ChevronLeft, CalendarIcon } from "lucide-react";
import Header from "@/components/dashboard/header";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

export default function MemoForm() {
  const form = useForm<MemoFormValues>({
    resolver: zodResolver(memoSchema),
    defaultValues: {
      title: "",
      sender: "",
      action: undefined,
      date: undefined,
      body: "",
      sentTo: undefined,
      hasVoucher: false,
      attachmentType: undefined,
    },
  });

  const onSubmit = async (data: MemoFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else if (typeof value === 'boolean') {
          formData.append(key, value.toString());
        } else {
          formData.append(key, value);
        }
      }
    });

    const result = await createMemo(formData);
    if (result.success) {
      form.reset();
    }
  };

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("attachment", file);
    }
  }

  return (
    <>
      <Header title="New Memo" description="Create a new memo" />
      <Button variant="link" className="text-blue-500 text-xl mb-8">
        <Link href="/memo" className="flex items-center gap-2">
          <ChevronLeft /> Back
        </Link>
      </Button>
      <div className="bg-white px-4 py-8 rounded-lg shadow-sm">
        <div className="">
          <h1 className="text-xl font-bold">Create New Memo</h1>
        </div>
        <div className="flex">
          <div className="flex flex-col items-center space-y-4 p-6">
            <Card className="max-w-[333px] w-full p-6 pt-14 flex flex-col items-center border border-gray-300 rounded-lg shadow-sm">
              <div className="w-[170px] h-[170px] flex items-center justify-center border border-dashed border-gray-400 rounded-full bg-gray-100">
                <label
                  className="text-sm text-gray-500 cursor-pointer"
                  htmlFor="attachment"
                >
                  Upload attachment
                </label>
                <Input
                  type="file"
                  id="attachment"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <p className="text-sm text-[#777777] mt-2 flex flex-col text-center">
                Allowed formats
                <span className="text-lg font-normal text-black">
                  PDF, DOC, JPG, PNG
                </span>
              </p>
              <p className="text-sm text-[#777777] mt-2 flex flex-col text-center">
                Max file size{" "}
                <span className="text-lg font-normal text-black">5MB</span>
              </p>
            </Card>
            <Button
              className="w-80 bg-gradient-custom text-white"
              onClick={form.handleSubmit(onSubmit)}
            >
              Send Memo
            </Button>
          </div>
          <div className="p-4 max-w-[670px] w-full mx-auto">
            <h1 className="text-2xl font-bold mb-6">Memo Details</h1>
            <Form {...form}>
              <form className="space-y-6">
                {/* Title and Sender */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Memo Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter memo title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sender</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter sender name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Action and Date */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="action"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Action</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select action" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="APPROVAL">Approval</SelectItem>
                            <SelectItem value="REVIEW">Review</SelectItem>
                            <SelectItem value="INFORMATION">Information</SelectItem>
                            <SelectItem value="OTHER">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Memo Body */}
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Memo Body</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter memo content"
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Sent To and Attachment Type */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="sentTo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sent To</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select recipient" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="FINANCE">Finance Department</SelectItem>
                            <SelectItem value="HR">HR Department</SelectItem>
                            <SelectItem value="MANAGEMENT">Management</SelectItem>
                            <SelectItem value="OTHER">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="attachmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Attachment Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="PDF">PDF</SelectItem>
                            <SelectItem value="IMAGE">Image</SelectItem>
                            <SelectItem value="DOCUMENT">Document</SelectItem>
                            <SelectItem value="SPREADSHEET">Spreadsheet</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Payment Voucher */}
                <FormField
                  control={form.control}
                  name="hasVoucher"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Attach Payment Voucher</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}