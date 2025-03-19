"use server";

import * as z from "zod";
import { ResetSchema } from "@/schema";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/email";
import { generatePasswordToken } from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedField = ResetSchema.safeParse(values);

  if (!validatedField.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedField.data;

  const exitingUser = await getUserByEmail(email);

  if (!exitingUser) {
    return { error: "Email is not found!" };
  }

  const passwordResetToken = await generatePasswordToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent!" };
};
