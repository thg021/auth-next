"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema, type LoginSchemaProps } from "@/schema";
import type { StatusForm } from "@/utils/statusForm.types";
import { AuthError } from "next-auth";

export const loginActions = async (
  values: LoginSchemaProps
): Promise<StatusForm> => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { status: "error", message: "Campos inválidos" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", message: "Credencias invalidas" };
        case "AccessDenied":
          return { status: "error", message: "Acesso negado" };
        default:
          return { status: "error", message: "Alguma coisa deu errada" };
      }
    }

    throw error;
  }
  return { status: "success", message: "Email enviado!" };
};
