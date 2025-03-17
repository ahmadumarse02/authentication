import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";

const dashboard = () => {
  return (
    <>
      <div className="text-orange-500 font-bold text-2xl">dashboard page!</div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">SignOut</Button>
      </form>
    </>
  );
};

export default dashboard;
