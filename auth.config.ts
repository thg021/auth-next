import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/schema";
import { getUserByEmail } from "./services/user";

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validateField = LoginSchema.safeParse(credentials);

        if (validateField.error) return null;

        const { email, password } = validateField.data;

        const user = await getUserByEmail(email);
        if (!user || !user.password) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) return null;

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
