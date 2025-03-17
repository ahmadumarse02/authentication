import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type ExtenedUser = DefaultSession["user"] & {
  role: UserRole;
};

declare module "next-auth" {
  interface Session {
    user: ExtenedUser;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: "ADMIN" | "USER";
  }
}
