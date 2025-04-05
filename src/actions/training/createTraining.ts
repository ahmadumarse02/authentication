"use server";

import { prisma } from "@/lib/db";
import { trainingFormSchema } from "@/schema/trainingSchema";
import { revalidatePath } from "next/cache";

export async function createTraining(formData: FormData) {
  try {
    const rawData = {
      description: formData.get("description") as string,
      trainingDate: new Date(formData.get("trainingDate") as string),
      type: formData.get("type") as string,
      mode: formData.get("mode") as string,
      duration: formData.get("duration") as string,
      staffIds: JSON.parse(formData.get("staffIds") as string) as string[],
    };

    // Validate with Zod
    const validatedData = trainingFormSchema.parse(rawData);

    // Create training in database
    await prisma.training.create({
      data: {
        description: validatedData.description,
        trainingDate: validatedData.trainingDate,
        type: validatedData.type,
        mode: validatedData.mode,
        duration: validatedData.duration,
        staffIds: validatedData.staffIds.join(","),
        status: "pending",
      },
    });

    revalidatePath("/trainings");
    return { success: true, message: "Training request submitted successfully!" };
  } catch (error) {
    console.error("Error creating training:", error);
    return { success: false, message: "Failed to submit training request" };
  }
}