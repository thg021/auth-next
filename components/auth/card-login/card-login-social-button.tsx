import { Button } from "@/components/ui/button";
import type { ElementType } from "react";

type CardLoginSocialButtonProps = {
  icon: ElementType;
  text?: string;
};
export const CardLoginSocialButton = ({
  text,
  icon: Icon,
}: CardLoginSocialButtonProps) => {
  return (
    <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
      <Icon className="h-5 w-5" />
      <span>{text}</span>
    </Button>
  );
};
