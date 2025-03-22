// src/components/auth/userButton.tsx
"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { signIn } from "next-auth/react";

export const UserButton = () => {
  const { data: session } = useSession();

    const handleSignOut = () => {
        signOut();
    };

    function handleSignIn() {
        signIn();
    }

  return (
    <div>
      {session?.user ? (
        <div>
          <p>Welcome, {session.user.name}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={() => handleSignIn()}>Sign In</button>
      )}
    </div>
  );
};