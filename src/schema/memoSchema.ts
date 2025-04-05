import { z } from "zod";

export const memoSchema = z.object({
    title: z.string().min(1, "Title is required"),
    sender: z.string().min(1, "Sender is required"),
    action: z.enum(["APPROVAL", "REVIEW", "INFORMATION", "OTHER"]),
    date: z.date({
      required_error: "Date is required",
      invalid_type_error: "Invalid date format",
    }),
    body: z.string().min(1, "Memo body is required"),
    sentTo: z.enum(["FINANCE", "HR", "MANAGEMENT", "OTHER"]),
    hasVoucher: z.boolean().default(false),
    attachmentType: z.enum(["PDF", "IMAGE", "DOCUMENT", "SPREADSHEET"]).optional(),
    attachment: z.instanceof(File).optional(),
});

export type MemoFormValues = z.infer<typeof memoSchema>;
