"use client";

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function SettingsPage() {
  const user = useCurrentUser();
  console.log("MEU USARIOOOOOOOO", user);
  return (
    <div className="mt-2">
      <h1>Settngs</h1>
      <UserInfo label="Servidor" user={user} />
    </div>
  );
}
