import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

export default async function ServerPage() {
  const user = await currentUser();
  return (
    <div className="mt-2">
      <UserInfo label="Servidor" user={user} />
    </div>
  );
}
