import { authClient } from "./client";

export const signinAzure = async () => {
  const data = await authClient.signIn.social({
    provider: "microsoft",
  });
  return data;
};
