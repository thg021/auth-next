"use server";

import { RegisterSchema, type RegisterSchemaProps } from "@/schema";
import type { StatusForm } from "@/utils/statusForm.types";

export const registerActions = async (
  values: RegisterSchemaProps
): Promise<StatusForm> => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields) {
    return { status: "error", message: "Campos inválidos" };
  }

  return { status: "success", message: "Email enviado!" };
};
