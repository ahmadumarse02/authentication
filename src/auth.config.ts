import Credentials from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schema";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

// Extend the User type to include isTwoFactorVerified
declare module "next-auth" {
  interface User {
    isTwoFactorVerified?: boolean;
  }

  interface Session {
    user: User & {
      isTwoFactorVerified?: boolean;
    };
  }
}

export default {
  adapter: PrismaAdapter(prisma), // Use Prisma adapter
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedField = LoginSchema.safeParse(credentials);

        if (validatedField.success) {
          const { email, password } = validatedField.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            return {
              ...user,
              isTwoFactorVerified: user.isTwoFactorVerified || false,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      // Include isTwoFactorVerified in the session
      if (session.user) {
        session.user.id = token.sub || user.id;
        session.user.isTwoFactorVerified =
          typeof token.isTwoFactorVerified === "boolean"
            ? token.isTwoFactorVerified
            : false;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Include isTwoFactorVerified in the JWT token
      if (user) {
        token.sub = user.id;
        token.isTwoFactorVerified = user.isTwoFactorVerified || false;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt", // Use JWT strategy for session management
  },
  pages: {
    signIn: "/login", // Custom sign-in page
  },
} satisfies NextAuthConfig;
