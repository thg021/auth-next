"use client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const role = useCurrentRole();
  const router = useRouter();
  if (role !== "ADMIN") {
    router.push("/settings");
    return;
  }
  return <div className="mt-2">Admin - {role}</div>;
}
