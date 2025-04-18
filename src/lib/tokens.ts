import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

import { prisma } from "@/lib/db";
import { gerPasswordResetTokenByEmail } from "@/data/PasswordResetToken";
import { getTwoFactorTokenByEmail } from "@/data/TwoFactorToken";

//Generate two Factor Token

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();

  const expires = new Date(new Date().getTime() + 3600 * 10000);

  const exitingToken = await getTwoFactorTokenByEmail(email);

  if (exitingToken) {
    await prisma.twoFactorToken.delete({
      where: { id: exitingToken.id },
    });
  }

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

//Reset Password Reset Token
export const generatePasswordToken = async (email: string) => {
  const token = uuidv4();

  const expires = new Date(new Date().getTime() + 3600 * 10000);

  const exitingToken = await gerPasswordResetTokenByEmail(email);

  if (exitingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: exitingToken.id },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return passwordResetToken;
};
