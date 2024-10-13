import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type CardLoginRootProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const CardLoginRoot = ({
  children,
  className,
  ...rest
}: CardLoginRootProps) => {
  return (
    <Card className={cn("w-[400px] shadow-md mx-4", className)} {...rest}>
      {children}
    </Card>
  );
};
