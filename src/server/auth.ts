import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { cache } from "react";
import { headers } from "next/headers";
import { env } from "@/env";
import { PrismaClient } from "@prisma/client";
import { prismaAdapter } from "better-auth/adapters/prisma";
import pkg from "../../package.json";

const prisma = new PrismaClient();
const isDev = process.env.NODE_ENV === "development";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  socialProviders: {
    microsoft: {
      clientId: env.MICROSOFT_CLIENT_ID,
      clientSecret: env.MICROSOFT_CLIENT_SECRET,
      tenantId: env.MICROSOFT_TENANT_ID,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  advanced: {
    cookiePrefix: pkg.name,
    useSecureCookies: false,
    defaultCookieAttributes: {
      // Ensures cookies are only sent over HTTPS
      secure: isDev ? false : true, 
      // Prevents JavaScript access to cookies
      httpOnly: true, 
      // Prevents CSRF attacks
      sameSite: "strict", 
    },
  },
  plugins: [nextCookies()],
});

export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});
