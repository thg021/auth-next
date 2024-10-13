import { CardContent } from "@/components/ui/card";
import type { ReactNode } from "react";

type CardLoginContentProps = {
  children: ReactNode;
};

export const CardLoginContent = ({ children }: CardLoginContentProps) => {
  return <CardContent>{children}</CardContent>;
};
