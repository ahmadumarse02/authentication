"use client";

import React from "react";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/dashboard/Header";
import Link from "next/link";

export default function StaffForm() {
  const form = useForm({});

  return (
    <>
      <Header title="New Staff" description="Create account for a new staff" />
      <Button variant="link" className="text-blue-500 text-xl mb-8">
        <Link href="/payroll" className="flex items-center gap-2">
          <ChevronLeft /> Back
        </Link>
      </Button>
      <div className="bg-white px-4 py-8 rounded-lg shadow-sm">
        <div className="">
          <h1 className="text-xl font-bold">Create New Salary Defination</h1>
        </div>
        <div className="flex">
          <div className="p-4 w-full mx-auto">
            <h1 className="text-2xl font-bold mb-6">Staff Information</h1>
            <Form {...form}>
              <form className="space-y-6">
                {/* First Name and Last Name */}
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="Title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Level</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Basics Salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Basics Salary</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter ammount of Naira"
                            {...field}
                          />
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Allowance</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the ammount of Naira"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Gross Salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gross Salary</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the ammount of Naira"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Deductions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deductions</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the ammount of Naira"
                            {...field}
                          />
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
                    name="Net salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Net Salary</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the ammount of Naira"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-80 bg-gradient-custom text-white">
                    Create
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
