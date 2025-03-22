import { getUserById } from "@/data/user";
import NextAuth from "next-auth";
import { prisma } from "@/lib/db";
import authConfig from "@/auth.config";
import { getTwoFactorConfirmationByUserId } from "@/data/twoFactorConfirmation";

export const { auth, handlers, signIn, signOut } = NextAuth({
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },

  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user }) {
      const exitingUser = await getUserById(user.id);

      if (!exitingUser?.emailVerified) return false;

      //2FA Code

      if (exitingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          exitingUser.id
        );

        console.log(twoFactorConfirmation);

        if (!twoFactorConfirmation) return false;

        await prisma.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const exitingUser = await getUserById(token.sub);

      if (!exitingUser) return token;

      return token;
    },
  },
});
