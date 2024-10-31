import { signOut } from "next-auth/react";

export const useLogoutUser = async () => {
  return await signOut({ redirectTo: "/auth/login" });
};
