"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { budgetFormSchema, BudgetFormValues } from "@/schema/budgetSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createBudget } from "@/actions/budget/createBudget";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar1Icon, ChevronLeft } from "lucide-react";
import Header from "@/components/dashboard/Header";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";

export default function BudgetForm() {
  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: {
      budgetNumber: "",
      description: "",
      receivingOffice: "",
      amount: "",
    },
  });

  const onSubmit = async (data: BudgetFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value.toString());
    });

    const result = await createBudget(formData);
    if (result.success) {
      form.reset();
    }
  };

  return (
    <>
      <Header title="New Staff" description="Create account for a new staff" />
      <Button variant="link" className="text-blue-500 text-xl mb-8">
        <Link href="/office-budget" className="flex items-center gap-2">
          <ChevronLeft /> Back
        </Link>
      </Button>
      <div className="bg-white px-4 py-8 rounded-lg shadow-sm">
        <div className="">
          <h1 className="text-xl font-bold">Add a New Staff</h1>
        </div>
        <div className="flex">
          <div className="p-4 w-full mx-auto">
            <h1 className="text-2xl font-bold mb-6">Staff Information</h1>
            <Form {...form}>
              <form className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="budgetNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter items" {...field} />
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
                        <FormLabel>Budget description</FormLabel>
                        <FormControl>
                          <Input placeholder="budget description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget amount</FormLabel>
                        <FormControl>
                          <Input placeholder="amount" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="mt-4">
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
                                <Calendar1Icon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="receivingOffice"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Receiving office</FormLabel>
                        <FormControl>
                          <Input placeholder="Select office" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  className="w-80 bg-gradient-custom text-white"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Add Staff
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
