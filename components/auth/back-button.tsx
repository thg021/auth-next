import { Button } from "@/components/ui/button";
import Link from "next/link";

type BackButtonProps = {
  label: string;
  href: string;
};

export const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <Button className="font-normal w-full" asChild variant="link" size="sm">
      <Link href={href}>{label}</Link>
    </Button>
  );
};
