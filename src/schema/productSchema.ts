import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  unitPrice: z.number().min(0.01, "Unit price must be positive"),
  supplier: z.string().min(1, "Supplier is required"),
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  image: z.instanceof(File).optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;