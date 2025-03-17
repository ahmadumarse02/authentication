"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/router";

export const Social = () => {
  const onclick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex w-full gap-4">
      <Button
        className="flex-1 cursor-pointer"
        variant="outline"
        aria-label="Sign in with Google"
        onClick={() => onclick("google")}
      >
        <FcGoogle className="h-6 w-6" />
      </Button>
      <Button
        className="flex-1 cursor-pointer"
        variant="outline"
        aria-label="Sign in with GitHub"
        onClick={() => onclick("github")}
      >
        <FaGithub className="h-6 w-6" />
      </Button>
    </div>
  );
};
