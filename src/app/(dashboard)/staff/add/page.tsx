"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { staffFormSchema, StaffFormValues } from "@/schema/staffFormSchema";
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
import { Button } from "@/components/ui/button";
import { addStaff } from "@/actions/staff/staff";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/dashboard/header";
import Link from "next/link";

export default function StaffForm() {
  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: undefined,
      role: undefined,
      designation: undefined,
      staffId: "",
      officialEmail: "",
    },
  });

  const onSubmit = async (data: StaffFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    const result = await addStaff(formData);
    if (result.success) {
      form.reset();
    }
  };

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  }

  return (
    <>
      <Header title="New Staff" description="Create account for a new staff" />
      <Button variant="link" className="text-blue-500 text-xl mb-8">
        <Link href="/staff" className="flex items-center gap-2">
          <ChevronLeft /> Back
        </Link>
      </Button>
      <div className="bg-white px-4 py-8 rounded-lg shadow-sm">
        <div className="">
          <h1 className="text-xl font-bold">Add a New Staff</h1>
        </div>
        <div className="flex">
          <div className="flex flex-col items-center space-y-4 p-6">
            <Card className="max-w-[333px] w-full p-6 pt-14 flex flex-col items-center border border-gray-300 rounded-lg shadow-sm">
              <div className="w-[170px] h-[170px] flex items-center justify-center border border-dashed border-gray-400 rounded-full bg-gray-100">
                <label
                  className="text-sm text-gray-500 cursor-pointer"
                  htmlFor="html"
                >
                  Upload photo
                </label>
                <Input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  id="html"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <p className="text-sm text-[#777777] mt-2 flex flex-col text-center">
                Allowed format
                <span className="text-lg font-normal text-black">
                  JPG, JPEG, and PNG
                </span>
              </p>
              <p className="text-sm text-[#777777] mt-2 flex flex-col text-center">
                Max file size{" "}
                <span className="text-lg font-normal text-black">2MB</span>
              </p>
            </Card>
            <Button
              className="w-80 bg-gradient-custom text-white"
              onClick={form.handleSubmit(onSubmit)}
            >
              Add Staff
            </Button>
          </div>
          <div className="p-4 max-w-[670px] w-full mx-auto">
            <h1 className="text-2xl font-bold mb-6">Staff Information</h1>
            <Form {...form}>
              <form className="space-y-6">
                {/* First Name and Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email Address and Phone Number */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email address" {...field} />
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
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Gender and Role */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="staff">staff</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="manager">manager</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Designation and Staff ID */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="designation"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Designation</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select designation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Human Resource Dept.">
                              Human Resources Dept.
                            </SelectItem>
                            <SelectItem value="Management">
                              Management
                            </SelectItem>
                            <SelectItem value="HOD I.T">
                              Pepoles and Operations
                            </SelectItem>
                            <SelectItem value="HOD Accounts">
                              Accounts
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="staffId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Staff ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Staff ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Official Email */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="officialEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Official Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Official Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <p className="text-[#383838] text-center mt-20">
        Copyright © 2022 Relia Energy. All Rights Reserved
      </p>
    </>
  );
}
