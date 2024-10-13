import type { ReactNode } from "react";

type CardLoginSocialProps = {
  children: ReactNode;
};
export const CardLoginSocial = ({ children }: CardLoginSocialProps) => {
  return <div className="flex items-center w-full gap-x-2">{children}</div>;
};
