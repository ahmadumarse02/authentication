import { z } from "zod";

export const circularFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  sender: z.string().min(1, "Sender is required"),
  sentTo: z.string().min(1, "Recipient is required"),
  date: z.date({
    required_error: "Date is required",
    invalid_type_error: "Invalid date format",
  }),
  body: z.string().min(10, "Message must be at least 10 characters"),
});

export type CircularFormValues = z.infer<typeof circularFormSchema>;
