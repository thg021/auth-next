"use server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/services/user";
import type { FormStatusProps } from "@/utils/formStatus.type";

type ChangePasswordProps = {
  email: string;
  password: string;
};

export const changePassword = async ({
  email,
  password,
}: ChangePasswordProps): Promise<FormStatusProps> => {
  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { status: "error", message: "Não foi possível alterar sua senha" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });
    return { status: "success", message: "Senha alterada com sucesso." };
  } catch (err) {
    console.error(err);
    return { status: "error", message: "Não foi possível alterar sua senha" };
  }
};
