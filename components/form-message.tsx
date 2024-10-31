import type { FormStatusProps } from "@/utils/formStatus.type";
import {
  ExclamationTriangleIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";

export const FormStatus = ({ message, status }: FormStatusProps) => {
  if (!message) return;

  return (
    <div
      data-status={status}
      className="data-[status=error]:bg-destructive/15 p-3 data-[status=success]:bg-emerald-500/15 data-[status=success]:text-emerald-500 rounded-md flex items-center gap-x-2 text-sm data-[status=error]:text-destructive"
    >
      {status === "success" ? (
        <CheckCircledIcon className="h-4 w-4" />
      ) : (
        <ExclamationTriangleIcon className="h-4 w-4" />
      )}

      <p>{message}</p>
    </div>
  );
};
