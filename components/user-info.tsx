import type { ExtendedUser } from "@/types/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type UserInfoProps = {
  user?: ExtendedUser;
  label: string;
};

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-sm">
      <CardHeader>
        <p>{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm ">
          <p className="text-xs font-bold uppercase">id</p>
          <p className="truncate text-xs max-w-[180ox] font-mono py-1 px-3 bg-slate-100 rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm ">
          <p className="text-xs font-bold uppercase">name</p>
          <p className="truncate text-xs max-w-[180ox] font-mono py-1 px-3 bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm ">
          <p className="text-xs font-bold uppercase">email</p>
          <p className="truncate text-xs max-w-[180ox] font-mono py-1 px-3 bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm ">
          <p className="text-xs font-bold uppercase">Acesso</p>
          <p className="truncate text-xs max-w-[180ox] font-mono py-1 px-3 bg-slate-100 rounded-md">
            {user?.role}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm ">
          <p className="text-xs font-bold uppercase">2AF</p>
          <Badge variant={user?.isTwoFactorEnabled ? "default" : "destructive"}>
            {user?.isTwoFactorEnabled ? "Sim" : "Não"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
