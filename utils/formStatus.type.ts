export type FormStatusProps = {
  status: "error" | "success" | null;
  message?: string;
  twoFactor?: boolean;
};
