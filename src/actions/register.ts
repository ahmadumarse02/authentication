"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schema";
import { prisma } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log(values);

  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { errors: "Invalid Fields" };
  }

  const { name, email, password } = validateFields.data;
  const hashedpassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { errors: "User already exists" };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedpassword,
    },
  });

  return { success: "Email is sent" };
};
