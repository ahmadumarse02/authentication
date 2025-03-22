import { z } from "zod";

export const staffFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.enum(["male", "female", "other"]),
  role: z.enum(["admin", "manager", "staff"]),
  designation: z.enum([
    "Human Resource Dept.",
    "Management",
    "HOD I.T",
    "HOD Accounts",
  ]),
  staffId: z.string().optional(),
  officialEmail: z.string().email("Invalid official email").optional(),
  image: z.instanceof(File).optional(),
});

export type StaffFormValues = z.infer<typeof staffFormSchema>;
