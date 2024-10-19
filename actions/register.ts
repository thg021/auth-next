"use server";

import { RegisterSchema, type RegisterSchemaProps } from "@/schema";
import type { StatusForm } from "@/utils/statusForm.types";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/services/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
export const registerActions = async (
  values: RegisterSchemaProps
): Promise<StatusForm> => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { status: "error", message: "Campos inválidos" };
  }

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

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
