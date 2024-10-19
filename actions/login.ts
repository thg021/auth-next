"use server";

import { signIn } from "@/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema, type LoginSchemaProps } from "@/schema";
import { getUserByEmail } from "@/services/user";
import type { StatusForm } from "@/utils/statusForm.types";
import { AuthError } from "next-auth";

export const loginActions = async (
  values: LoginSchemaProps
): Promise<StatusForm> => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success)
    return { status: "error", message: "Campos inválidos" };
  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser && !existingUser.emailVerified) {
    const validationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(validationToken.email, validationToken.token);

    return { status: "success", message: "Email enviado para verificação!" };
  }
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
