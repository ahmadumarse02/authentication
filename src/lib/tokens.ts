import { v4 as uuidv4 } from "uuid";

import { prisma } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { gerPasswordResetTokenByEmail } from "@/data/passwordResetToken";

//Reset Password Reset Token
export const generatePasswordToken = async (email: string) => {
  const token = uuidv4();

  const expires = new Date(new Date().getTime() + 3600 * 10000);

  const exitingToken = await gerPasswordResetTokenByEmail(email);

  if (exitingToken) {
    await prisma.passwordResetTokeen.delete({
      where: { id: exitingToken.id },
    });
  }

  const passwordResetToken = await prisma.passwordResetTokeen.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return passwordResetToken;
};

//Verification token
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const exitingToken = await getVerificationTokenByEmail(email);

  if (exitingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: exitingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
