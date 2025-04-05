"use server";

import { prisma } from "@/lib/db";
import { budgetFormSchema } from "@/schema/BudgetSchema";
import { revalidatePath } from "next/cache";

export async function createBudget(formData: FormData) {
  try {
    const rawData = {
      budgetNumber: formData.get("budgetNumber") as string,
      date: new Date(formData.get("date") as string),
      description: formData.get("description") as string,
      receivingOffice: formData.get("receivingOffice") as string,
      amount: parseFloat(formData.get("amount") as string),
    };

    const validatedData = budgetFormSchema.parse(rawData);

    const existingBudget = await prisma.budget.findUnique({
      where: { budgetNumber: validatedData.budgetNumber },
    });

    if (existingBudget) {
      return { success: false, message: "Budget number already exists" };
    }

    await prisma.budget.create({
      data: {
        budgetNumber: validatedData.budgetNumber,
        date: validatedData.date,
        description: validatedData.description,
        receivingOffice: validatedData.receivingOffice,
        amount: parseFloat(validatedData.amount),
      },
    });

    revalidatePath("/budgets");
    return { success: true, message: "Budget created successfully!" };
  } catch (error) {
    console.error("Error creating budget:", error);
    return { success: false, message: "Failed to create budget" };
  }
}
