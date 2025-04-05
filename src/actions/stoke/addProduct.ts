"use server";
import path from "path";
import fs from "fs";
import { prisma } from "@/lib/db";
import { productFormSchema } from "@/schema/ProductSchema";

export async function addProduct(formData: FormData) {
  try {
    if (!prisma) {
      throw new Error("Prisma client not initialized");
    }

    const data = {
      name: formData.get("name")?.toString() || "",
      category: formData.get("category")?.toString() || "",
      unitPrice: Number(formData.get("unitPrice")) || 0,
      supplier: formData.get("supplier")?.toString() || "",
      productId: formData.get("productId")?.toString() || "",
      quantity: Number(formData.get("quantity")) || 0,
      image:
        formData.get("image") instanceof File ? formData.get("image") : null,
    };

    const result = productFormSchema.safeParse(data);
    if (!result.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: result.error.errors,
      };
    }
    const validatedData = result.data;

    let imageUrl = null;
    if (validatedData.image) {
      const image = validatedData.image;
      const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];
      const MAX_SIZE = 2 * 1024 * 1024; // 2MB

      if (!ALLOWED_TYPES.includes(image.type)) {
        return {
          success: false,
          message: "Only JPG, JPEG, and PNG files are allowed",
        };
      }

      if (image.size > MAX_SIZE) {
        return { success: false, message: "File size exceeds 2MB limit" };
      }

      const uploadDir = path.join(process.cwd(), "public", "product-images");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const timestamp = Date.now();
      const fileExt = path.extname(image.name);
      const fileName = `product-${timestamp}${fileExt}`;
      const filePath = path.join(uploadDir, fileName);

      const buffer = await image.arrayBuffer();
      fs.writeFileSync(filePath, Buffer.from(buffer));
      imageUrl = `/product-images/${fileName}`;
    }

    const totalAmount = validatedData.unitPrice * validatedData.quantity;

    const newProduct = await prisma.product.create({
      data: {
        name: validatedData.name,
        category: validatedData.category,
        unitPrice: validatedData.unitPrice,
        supplier: validatedData.supplier,
        productId: validatedData.productId,
        quantity: validatedData.quantity,
        totalAmount,
        imageUrl,
      },
    });

    if (!newProduct) {
      throw new Error("Failed to create product");
    }

    return { success: true, message: "Product added successfully!" };
  } catch (error) {
    console.error(
      "Detailed error:",
      error instanceof Error ? error.message : error
    );
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to add product",
    };
  }
}
