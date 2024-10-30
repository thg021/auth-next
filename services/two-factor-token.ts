import { db } from "@/lib/db";

export const getTwoFactorToken = async (token: string) => {
  try {
    const verificationToken = await db.twoFactorToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch (err) {
    console.error("Error fetching verificationToken by token", err);
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.twoFactorToken.findFirst({
      where: { email },
      orderBy: { expires: "desc" },
    });
    return verificationToken;
  } catch (err) {
    console.error("Error fetching verificationToken by token", err);
    return null;
  }
};
