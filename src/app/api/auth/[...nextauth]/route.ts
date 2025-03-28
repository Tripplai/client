import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode";
import { authApi } from "@/services/api";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'email',
      name: 'email',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const res = await authApi.login(credentials)
        if (res.code !== "SU") return null;
        const accessToken = jwtDecode(res.accessToken)
        const sub = JSON.parse(accessToken.sub as string)
        return {
          id: sub.email,
          email: sub.email,
          name: sub.nickname,
          image: sub.url,
          accessToken: res.accessToken
        }
      }
    }),
    CredentialsProvider({
      id: "oauth",
      name: "oauth",
      credentials: {
        accessToken: { label: "Access Token", type: "text" }
      },
      async authorize(credentials) {
        const accessToken = jwtDecode(credentials?.accessToken as string)
        const sub = JSON.parse(accessToken.sub as string)
        return {
          id: sub.email,
          email: sub.email,
          name: sub.nickname,
          image: sub.url,
          accessToken: credentials?.accessToken
        }
      }
    }),
  ],
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async jwt({ token, user }) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
});

export { handler as GET, handler as POST }; 