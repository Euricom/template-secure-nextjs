import { createAuthClient } from "better-auth/react";
// import { env } from '@/env';

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

export const { signIn, signOut, useSession } = authClient;
