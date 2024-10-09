"use server";

import { RegisterSchema, type RegisterSchemaProps } from "@/schema";
import type { StatusForm } from "@/utils/statusForm.types";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/services/user";
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

  return { status: "success", message: "Usuário criado com sucesso!" };
};
