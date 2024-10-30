"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "../ui/button";
import { logout } from "@/actions/logout";
export const UserButton = () => {
  const user = useCurrentUser();
  const onClick = async () => {
    await logout();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback className="bg-slate-200">
            <FaUser className="text-slate-400" />
          </AvatarFallback>
          <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end" alignOffset={2}>
        <DropdownMenuItem>Configurações</DropdownMenuItem>
        <DropdownMenuItem>Servidor</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button variant="link" onClick={onClick}>
            Sair
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
