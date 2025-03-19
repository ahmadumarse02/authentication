"use server";

import { gerPasswordResetTokenByToken } from "@/data/passwordResetToken";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schema";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token" };
  }

  const validateFields = NewPasswordSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validateFields.data;

  const exitingToken = await gerPasswordResetTokenByToken(token);
  if (!exitingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(exitingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const exitingUser = await getUserByEmail(exitingToken.email);
  if (!exitingUser) {
    return { error: "Email does not exist" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: exitingUser.id },
    data: { password: hashedPassword },
  });

  return { success: "Password updated successfully!" };
};
