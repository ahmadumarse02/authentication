// actions/circular/createCircular.ts
"use server";

import { prisma } from "@/lib/db";
import { circularFormSchema } from "@/schema/circularSchema";
import { revalidatePath } from "next/cache";

type CircularState = object;

export async function createCircular(prevState: CircularState, formData: FormData) {
  try {
    const rawData = {
      title: formData.get("title") as string,
      sender: formData.get("sender") as string,
      sentTo: formData.get("sentTo") as string,
      date: formData.get("date") ? new Date(formData.get("date") as string) : new Date(),
      body: formData.get("body") as string,
    };

    // Validate with Zod
    const result = circularFormSchema.safeParse(rawData);
    
    if (!result.success) {
      return { 
        success: false, 
        message: "Validation failed",
        issues: result.error.issues 
      };
    }

    // Create new circular
    await prisma.circular.create({
      data: result.data,
    });

    revalidatePath("/circulars");
    return { success: true, message: "Circular created successfully!" };
  } catch (error) {
    console.error("Error creating circular:", error);
    return { 
      success: false, 
      message: "Failed to create circular",
      issues: [] 
    };
  }
}