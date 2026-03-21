import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { credentialsSchema } from "@/lib/schema/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const rows = await db
          .select()
          .from(users)
          .where(eq(users.login, parsed.data.login))
          .limit(1);

        const row = rows[0];
        if (!row) return null;

        const valid = await compare(parsed.data.password, row.password);
        if (!valid) return null;

        return { id: row.id, login: row.login };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user && "id" in user && "login" in user) {
        token.id = user.id as number;
        token.login = user.login;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
          return {
              user: {
                  name: token.name || null,
                  image: token.picture || null,
                  email: token.email || null,
              },
              expires: session.expires
          }
      }
      return session;
    },
    redirect({ url, baseUrl }) {
      const resolved = url.startsWith("/") ? `${baseUrl}${url}` : url;
      if (resolved === baseUrl || resolved === `${baseUrl}/`) {
        return `${baseUrl}/books`;
      }
      return resolved;
    },
  },
};