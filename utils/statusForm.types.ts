export type StatusForm = {
  status: "error" | "success" | null;
  message?: string;
  twoFactor?: boolean;
};
