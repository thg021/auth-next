"use server";

import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema, type ResetSchemaProps } from "@/schema";
import { getUserByEmail } from "@/services/user";
import type { StatusForm } from "@/utils/statusForm.types";

export const resetActions = async (
  values: ResetSchemaProps
): Promise<StatusForm> => {
  try {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success)
      return { status: "error", message: "Campos inválidos" };

    const { email } = validatedFields.data;
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { status: "error", message: "Falha ao enviar reset de email!" };
    }

    const validationToken = await generatePasswordResetToken(
      existingUser.email
    );
    await sendPasswordResetEmail(validationToken.email, validationToken.token);

    return {
      status: "success",
      message: "Email de reset enviado com sucesso!",
    };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Falha ao enviar reset de email!" };
  }
};
