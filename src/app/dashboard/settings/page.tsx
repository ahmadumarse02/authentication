import React from "react";
import { auth } from "@/auth";

async function settings() {
  const session = await auth();
  return (
    <div className="max-w-full text-sm text-orange-600">
      {JSON.stringify(session)}
    </div>
  );
}

export default settings;
