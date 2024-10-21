import { CardContent } from "@/components/ui/card";
import type { HTMLAttributes, ReactNode } from "react";

type CardLoginContentProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const CardLoginContent = ({
  children,
  ...rest
}: CardLoginContentProps) => {
  return <CardContent {...rest}>{children}</CardContent>;
};
