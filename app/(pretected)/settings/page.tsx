"use client";

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function SettingsPage() {
  const user = useCurrentUser();

  if (!user) return <p>Loading...</p>;

  console.log("MEU USARIOOOOOOOO", user);
  return (
    <div className="w-full flex flex-col gap-6 justify-center items-center">
      <h1>Settngs</h1>
      <UserInfo label="Servidor" user={user} />
    </div>
  );
}
