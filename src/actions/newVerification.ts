"use server";

import { prisma } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificationToken";

export const newVerification = async (token: string) => {
  const exitingToken = await getVerificationTokenByToken(token);

  if (!exitingToken) {
    return { error: "Token does not exits!" };
  }

  const hasExpired = new Date(exitingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const exitingUser = await getUserByEmail(exitingToken.email);

  if (!exitingUser) {
    return { error: "Email does not exist!" };
  }

  await prisma.user.update({
    where: { id: exitingUser.id },
    data: {
      emailVerified: new Date(),
      email: exitingUser.email,
    },
  });

  await prisma.verificationToken.delete({
    where: { id: exitingUser.id },
  });

  return { success: "Email verified!" };
};
