import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "@/services/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
  debug: true,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      console.log("Event", user);
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // const oauthProviders = ["github", "google"];
      const isOAuthProvider =
        account && ["github", "google"].includes(account.provider);
      if (isOAuthProvider) return false;

      const existingUser = await getUserById(user.id!);

      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token }) {
      console.log(token);
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      return token;
    },
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),
  ...authConfig,
});
