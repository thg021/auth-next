"use server";

import { db } from "@/lib/db";
import { getResetPasswordByToken } from "@/services/reset-password";
import { getUserByEmail } from "@/services/user";

type ValidationTokenPasswordResponse = {
  status: "valid" | "invalid" | "expired";
  email?: string;
};

export const validationTokenPassword = async (token: string) => {
  const result: ValidationTokenPasswordResponse = {
    status: "invalid",
  };
  try {
    const existingToken = await getResetPasswordByToken(token);

    if (!existingToken) {
      return result;
    }

    const hasExpired = new Date(existingToken.expires) > new Date();
    if (!hasExpired) {
      result.status = "expired";
      return result;
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
      return result;
    }

    result.email = existingUser.email;
    result.status = "valid";

    // await db.passwordResetToken.delete({
    //   where: { id: existingToken.id },
    // });

    return result;
  } catch (err) {
    console.error(err);
    return result;
  }
};
