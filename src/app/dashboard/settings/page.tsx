"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";


function Settings() {
  const user = useCurrentUser()
  return (
    <div className="max-w-full text-sm text-white">
      {JSON.stringify(user)}
    </div>
  );
}

export default Settings;
