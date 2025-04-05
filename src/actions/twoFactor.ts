"use server";

import { getTwoFactorTokenByEmail } from "@/data/twoFactorToken";
import { getUserByEmail } from "@/data/user";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export const verifyTwoFactorToken = async (code: string, email: string) => {
  const twoFactorToken = await getTwoFactorTokenByEmail(email);

  if (!twoFactorToken || twoFactorToken.token !== code) {
    return { error: "Invalid code!" };
  }

  const hasExpired = new Date(twoFactorToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Code expired!" };
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return { error: "User not found" };
  }

  await prisma.twoFactorToken.delete({
    where: { id: twoFactorToken.id },
  });

  // Delete existing confirmation if it exists
  await prisma.twoFactorConfirmation.deleteMany({
    where: { userId: user.id },
  });

  // Create a new confirmation
  await prisma.twoFactorConfirmation.create({
    data: {
      userId: user.id,
    },
  });

  // Update the session to mark the user as authenticated
  const session = await auth();
  if (session) {
    if (session.user) {
      session.user.isTwoFactorVerified = true;
    }
  }

  return { success: "2FA verification successful!" };
};
