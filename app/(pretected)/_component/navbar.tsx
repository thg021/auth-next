"use client";

import { logout } from "@/actions/logout";
import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { useCurrentRole } from "@/hooks/use-current-role";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathName = usePathname();
  const role = useCurrentRole();
  return (
    <nav className="bg-secondary flex justify-between items-center p-4 w-full">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathName === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">Configurações</Link>
        </Button>
        <Button
          asChild
          variant={pathName === "/server" ? "default" : "outline"}
        >
          <Link href="/server">Servidor</Link>
        </Button>
        {role === "ADMIN" && (
          <Button
            asChild
            variant={pathName === "/admin" ? "default" : "outline"}
          >
            <Link href="/admin">Admin</Link>
          </Button>
        )}
      </div>
      <div className="flex gap-x-2 items-center">
        <UserButton />
      </div>
    </nav>
  );
};
