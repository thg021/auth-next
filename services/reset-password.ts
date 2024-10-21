import { db } from "@/lib/db";

export const getResetPasswordByToken = async (token: string) => {
  try {
    const tokenPassword = await db.passwordResetToken.findUnique({
      where: { token },
    });

    return tokenPassword;
  } catch (err) {
    console.error("Error fetching reset password token by token", err);
    return null;
  }
};
