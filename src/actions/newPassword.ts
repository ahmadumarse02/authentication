"use server";

import { getTwoFactorTokenByEmail } from "@/data/twoFactorToken";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schema/auth";
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

  const twoFactorToken = await getTwoFactorTokenByEmail(token);
  if (!twoFactorToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(twoFactorToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(twoFactorToken.email);
  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  return { success: "Password updated successfully!" };
};
