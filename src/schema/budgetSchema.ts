import { z } from "zod";

export const budgetFormSchema = z.object({
  budgetNumber: z.string().min(1, "Budget number is required"),
  date: z.date({
    required_error: "Date is required",
    invalid_type_error: "Invalid date format",
  }),
  description: z.string().min(1, "Description is required"),
  receivingOffice: z.string().min(1, "Receiving office is required"),
  amount: z.string().min(1, "Amount must be greater than 0"),
});

export type BudgetFormValues = z.infer<typeof budgetFormSchema>;
