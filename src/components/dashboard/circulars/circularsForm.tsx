"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { circularFormSchema, CircularFormValues } from "@/schema/circularSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createCircular } from "@/actions/circular/createCircular";
import { useEffect } from "react";
import { toast } from "sonner";
import Header from "../Header";

export function CircularsForm() {
  const [state, formAction, isPending] = useActionState(createCircular, null);

  const form = useForm<CircularFormValues>({
    resolver: zodResolver(circularFormSchema),
    defaultValues: {
      title: "",
      sender: "",
      sentTo: "Admin, HR",
      body: "",
      date: new Date(),
    },
  });

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      form.reset();
    } else if (state?.success === false) {
      // Handle Zod validation errors
      if (state?.issues) {
        state.issues.forEach((issue) => {
          form.setError(issue.path[0] as keyof CircularFormValues, {
            type: "manual",
            message: issue.message,
          });
        });
      } else {
        toast.error(state.message);
      }
    }
  }, [state, form]);

  return (
    <>
      <Header title="New Circular" description="Create a new circular" />
      <Button variant="link" className="text-blue-500 text-xl mb-8">
        <Link href="/circulars" className="flex items-center gap-2">
          <ChevronLeft /> Back
        </Link>
      </Button>
      <div className="bg-white px-4 py-8 rounded-lg shadow-sm">
        <div className="">
          <h1 className="text-xl font-bold">Create New Circular</h1>
        </div>
        <div className="p-4 w-full mx-auto">
          <h1 className="text-2xl font-bold mb-6">Circular Information</h1>
          <Form {...form}>
            <form 
              action={formAction} 
              className="space-y-6"
              onSubmit={form.handleSubmit(() => {})} // Enable client-side validation
            >
              {/* Title, Sender, and Recipient */}
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Circular title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter title" {...field} />
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
                      <FormLabel>Sent from</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sentTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sent to</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                        defaultValue="Admin, HR" // Ensure default value
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select recipient" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Admin, HR">Admin, HR</SelectItem>
                          <SelectItem value="Management">Management</SelectItem>
                          <SelectItem value="All Staff">All Staff</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Date and Message */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field}
                          value={field.value ? field.value.toISOString().split('T')[0] : ''}
                          onChange={(e) => field.onChange(new Date(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Circular message (min 10 characters)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter detailed message..."
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isPending || !form.formState.isValid}
              >
                {isPending ? "Creating..." : "Create Circular"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}