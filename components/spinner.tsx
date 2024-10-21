import { cn } from "@/lib/utils";
import { CgSpinner } from "react-icons/cg";

type SpinnerProps = {
  text?: string;
  className?: string;
};

export const Spinner = ({ text, className }: SpinnerProps) => {
  return (
    <>
      <CgSpinner className={cn("animate-spin h-5 w-5 mr-3", className)} />
      {text}
    </>
  );
};
