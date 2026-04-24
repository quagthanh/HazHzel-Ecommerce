import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {
  InactiveAccountError,
  InvalidEmailPasswordError,
  SystemError,
} from "./utils/error";
import { IUser } from "./types/next-auth";
import { loginDTO } from "./types/backend";
import { handleLogin } from "./services/auth.api";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const login = {
          username: credentials.username,
          password: credentials.password,
        } as loginDTO;
        const res = await handleLogin(login);
        if (res?.statusCode === 201) {
          return {
            ...res?.data?.user,
            access_token: res?.data?.access_token,
          } as IUser;
        } else if (res?.statusCode === 401) {
          throw new InvalidEmailPasswordError();
        } else if (res?.statusCode === 400) {
          throw new InactiveAccountError();
        } else {
          throw new SystemError();
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.access_token = (user as IUser).access_token;
        token.user = user as IUser;
      }
      return token;
    },
    session({ session, token }) {
      (session.user as IUser) = token.user;
      session.access_token = token.access_token;
      return session;
    },
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth;
      const pathname = nextUrl.pathname;

      const isInternalPage = pathname.startsWith("/admin");
      const isCustomerProtectedPage = [
        "/profile",
        "/checkout",
        "/orders",
        "/settings",
      ].some((path) => pathname.startsWith(path));

      if (isInternalPage) {
        const isAdmin = (auth?.user as any)?.role === "ADMIN";
        return isLoggedIn && isAdmin;
      }

      if (isCustomerProtectedPage) {
        return isLoggedIn;
      }

      return true;
    },
  },
});
