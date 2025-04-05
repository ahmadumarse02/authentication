import { z } from "zod";

export const trainingFormSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters"),
  trainingDate: z.date({
    required_error: "Training date is required",
  }),
  type: z.string().min(1, "Please select a training type"),
  mode: z.string().min(1, "Please select a training mode"),
  duration: z.string().min(1, "Please select duration"),
  staffIds: z.array(z.string()).min(1, "Select at least one staff member"),
});

export type TrainingFormValues = z.infer<typeof trainingFormSchema>;
