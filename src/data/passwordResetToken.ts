import { prisma } from "@/lib/db";

export const gerPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordToken = await prisma.passwordResetTokeen.findUnique({
      where: { token },
    });

    return passwordToken;
  } catch {
    return null;
  }
};

export const gerPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordToken = await prisma.passwordResetTokeen.findFirst({
      where: { email },
    });

    return passwordToken;
  } catch {
    return null;
  }
};
