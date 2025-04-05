"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trainingFormSchema, TrainingFormValues } from "@/schema/trainingSchema";
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
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { createTraining } from "@/actions/training/createTraining";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Calendar1Icon } from "lucide-react";

const trainingTypes = [
  { value: "technical", label: "Technical Skills" },
  { value: "soft", label: "Soft Skills" },
  { value: "compliance", label: "Compliance" },
  { value: "leadership", label: "Leadership" },
];

const trainingModes = [
  { value: "online", label: "Online" },
  { value: "in-person", label: "In-Person" },
  { value: "hybrid", label: "Hybrid" },
];

const durations = [
  { value: "1-hour", label: "1 Hour" },
  { value: "half-day", label: "Half Day" },
  { value: "full-day", label: "Full Day" },
  { value: "multi-day", label: "Multiple Days" },
];

export function TrainingForm() {
  const [staffOptions, setStaffOptions] = useState<{ value: string, label: string }[]>([]);
  const [state, formAction] = useFormState(
    (state, formData: FormData) => createTraining(formData),
    null
  );
  const { pending } = useFormStatus();

  const form = useForm<TrainingFormValues>({
    resolver: zodResolver(trainingFormSchema),
    defaultValues: {
      description: "",
      staffIds: [],
    },
  });

  // Fetch staff members
  useEffect(() => {
    async function loadStaff() {
      const response = await fetch('/api/staff');
      const staff = await response.json();
      setStaffOptions(staff.map((s: { id: number; name: string }) => ({
        value: s.id.toString(),
        label: s.name,
      })));
    }
    loadStaff();
  }, []);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      form.reset();
    } else if (state?.success === false) {
      toast.error(state.message);
    }
  }, [state, form]);

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Training Request</h1>

      <h2 className="text-lg font-semibold">Training description</h2>
      <Form {...form}>
        <form action={formAction} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter description</FormLabel>
                  <FormControl>
                    <Input placeholder="Training description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="trainingDate"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Training date</FormLabel>
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
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />


            {/* Training Type and Mode */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select training type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {trainingTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Training mode</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select training mode" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {trainingModes.map((mode) => (
                        <SelectItem key={mode.value} value={mode.value}>
                          {mode.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Training Duration */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select option</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {durations.map((duration) => (
                        <SelectItem key={duration.value} value={duration.value}>
                          {duration.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Staff Selection */}
            <FormField
              control={form.control}
              name="staffIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select names</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={staffOptions}
                      selected={field.value}
                      onChange={field.onChange}
                      placeholder="Select staff members..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Form Submission */}
          <div className="flex gap-4">
            <Button type="button" variant="default" className="bg-gradient-custom">
              Save Draft
            </Button>
            <Button type="submit"  disabled={pending} variant="outline">
              {pending ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}