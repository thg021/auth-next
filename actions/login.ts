"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema, type LoginSchemaProps } from "@/schema";
import { getTwoFactorConfirmationByUserId } from "@/services/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/services/two-factor-token";
import { getUserByEmail } from "@/services/user";
import type { FormStatusProps } from "@/utils/formStatus.type";
import { AuthError } from "next-auth";

export const loginActions = async (
  values: LoginSchemaProps
): Promise<FormStatusProps> => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success)
    return { status: "error", message: "Campos inválidos" };
  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser && !existingUser.emailVerified) {
    const validationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(validationToken.email, validationToken.token);

    return { status: "success", message: "Email enviado para verificação!" };
  }

  if (existingUser?.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      //TODO: validar código
      const twoFactorCode = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorCode) {
        return { status: "error", message: "Código inválido" };
      }

      if (twoFactorCode.token !== code) {
        return { status: "error", message: "Código diferente" };
      }

      const hasExpired = new Date(twoFactorCode.expires) < new Date();
      if (hasExpired) {
        return { status: "error", message: "Código expirado" };
      }

      // await db.twoFactorToken.delete({
      //   where: { id: twoFactorCode.id },
      // });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { userId: existingConfirmation.userId },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { status: "success", twoFactor: true };
    }
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
