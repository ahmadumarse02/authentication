"use server";

import * as z from "zod";
import { LoginSchema } from "@/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/router";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/lib/tokens";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/email";
import { getTwoFactorTokenByEmail } from "@/data/twoFactorToken";
import { prisma } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/twoFactorConfirmation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { errors: "Invaild Fileds" };
  }

  const { email, password, code } = validateFields.data;

  const exitingUser = await getUserByEmail(email);

  if (!exitingUser || !exitingUser.email || !exitingUser.password) {
    return { error: "Email does not exist" };
  }

  if (!exitingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      exitingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email sent successfully!" };
  }

  if (exitingUser.isTwoFactorEnabled && exitingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(exitingUser.email);
      if (!twoFactorToken) {
        return { error: "Invalid code!" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code expired!" };
      }

      await prisma.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const exitingConfirmation = await getTwoFactorConfirmationByUserId(
        exitingUser.id
      );

      if (exitingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: { id: exitingConfirmation.id },
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: exitingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(exitingUser.email);

      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Login successful!" };
  } catch (error) {
    if (error instanceof AuthError)
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong!" };
      }
    throw error;
  }
};
