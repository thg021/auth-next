"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/services/user";
import { getVerificationTokenByToken } from "@/services/verification-token";

export const newVerification = async (token: string) => {
  try {
    console.log("token new verification", token);
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
      //redirect("/auth/login?isTokenVerified=invalid");
      return "invalid";
    }

    const hasExpired = new Date(existingToken.expires) > new Date();
    if (!hasExpired) {
      return "expired";
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
      return "invalid";
    }

    await db.user.update({
      where: { id: existingUser.id },
      data: { emailVerified: new Date() },
    });

    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });

    return "valid";
  } catch (err) {
    console.error(err);
    return "error";
  }
};
