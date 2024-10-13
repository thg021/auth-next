import { CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type CardLoginHeaderProps = HTMLAttributes<HTMLDivElement> & {
  title: ReactNode;
  subText?: string;
};

export const CardLoginHeader = ({
  title,
  subText,
  ...rest
}: CardLoginHeaderProps) => {
  return (
    <CardHeader>
      <div className="w-full flex flex-col gap-y-4 items-center" {...rest}>
        <h1 className={cn("text-3xl font-semibold")}>{title}</h1>
        <p className="text-muted-foreground">{subText}</p>
      </div>
    </CardHeader>
  );
};
