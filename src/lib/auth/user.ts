import { auth } from "@/server/auth";
import { headers } from "next/headers";

export const userProfile = async () => {
  const userSession = await auth.api.getSession({
    headers: await headers(),
  });
  return userSession;
};
