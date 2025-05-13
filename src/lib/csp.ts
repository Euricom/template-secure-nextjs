import { headers } from "next/headers";
import { SELF, UNSAFE_INLINE, NONE, DATA, BLOB } from "csp-header";

/**
 * Gets the CSP nonce value from the request headers
 * @returns The nonce value for the current request, or an empty string if not available
 */
export function getNonce(): string {
  const headersList = headers();
  return headersList.get("x-nonce") || "";
}
