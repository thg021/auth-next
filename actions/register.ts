"use server";

import { RegisterSchema, type RegisterSchemaProps } from "@/schema";
import type { FormStatusProps } from "@/utils/formStatus.type";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/services/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { hashPassword } from "@/utils/hashPassword";
export const registerActions = async (
  values: RegisterSchemaProps
): Promise<FormStatusProps> => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { status: "error", message: "Campos inválidos" };
  }

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await hashPassword(password);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { status: "error", message: "Email já cadastrado" };
  }

  await db.user.create({
    data: { email, password: hashedPassword, name },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { status: "success", message: "Email de confirmação foi enviado." };
};
