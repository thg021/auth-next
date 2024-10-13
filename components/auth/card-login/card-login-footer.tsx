import { CardFooter } from "@/components/ui/card";
import type { HTMLAttributes, ReactNode } from "react";

type CardLoginFooterProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};
export const CardLoginFooter = ({ children }: CardLoginFooterProps) => {
  return <CardFooter>{children}</CardFooter>;
};
