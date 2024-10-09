import { CgSpinner } from "react-icons/cg";

type SpinnerProps = {
  text?: string;
};

export const Spinner = ({ text }: SpinnerProps) => {
  return (
    <>
      <CgSpinner className="animate-spin h-5 w-5 mr-3" />
      {text}
    </>
  );
};
