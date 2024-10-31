import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const { data } = useSession({ required: true });
  console.log("USECURRENTUSER", data);
  return data?.user;
};
