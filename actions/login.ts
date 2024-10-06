"use server";

import { LoginSchema, type LoginSchemaProps } from "@/schema";
import type { StatusForm } from "@/utils/statusForm.types";

export const loginActions = async (
  values: LoginSchemaProps
): Promise<StatusForm> => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields) {
    return { status: "error", message: "Campos inválidos" };
  }

  return { status: "success", message: "Email enviado!" };
};
