import { headers } from "next/headers";

/**
 * Gets the CSP nonce value from the request headers
 * @returns The nonce value for the current request, or an empty string if not available
 */
export async function getNonce(): Promise<string> {
  const headersList = await headers();
  return headersList.get("x-nonce") || "";
}