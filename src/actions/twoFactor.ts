"use server";

import { getTwoFactorTokenByEmail } from "@/data/twoFactorToken";
import { getUserByEmail } from "@/data/User";
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

  await prisma.twoFactorConfirmation.deleteMany({
    where: { userId: user.id },
  });

  await prisma.twoFactorConfirmation.create({
    data: {
      userId: user.id,
    },
  });

  const session = await auth();
  if (session) {
    if (session.user) {
      session.user.isTwoFactorVerified = true;
    }
  }

  return { success: "2FA verification successful!" };
};
