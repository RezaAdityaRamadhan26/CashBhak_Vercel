import { findUserByEmail } from "@/lib/action";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;

        // cari user berdasarkan email
        const user = await findUserByEmail(email);

        if (!user) return null;

        // bandingkan password biasa
        if (user.password !== password) return null;

        // return data user ke session
        return {
          id: user.id, // di DB kamu namanya id
          email: user.email,
          name: user.username,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.id;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
