import { NextResponse, type NextRequest } from "next/server";
import { getCSP, SELF, UNSAFE_INLINE, NONE, DATA, BLOB } from "csp-header";
import { env } from "@/env";

export function middleware(request: NextRequest) {
  // Generate a unique nonce value for this request
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const nonceValue = `'nonce-${nonce}'`;

  // Define CSP directives with the generated nonce
  const cspDirectives = {
    directives: {
      "default-src": [SELF],
      "script-src": [SELF, nonceValue],
      "style-src": [SELF, UNSAFE_INLINE],
      "img-src": [SELF, DATA, BLOB],
      "font-src": [SELF],
      "connect-src": [SELF],
      "frame-src": [SELF],
      "object-src": [NONE],
      "base-uri": [SELF],
      "form-action": [SELF],
      "frame-ancestors": [SELF],
      "upgrade-insecure-requests": true,
    },
    reportUri: env.CSP_REPORT_URI,
  };

  // Create the CSP header value
  const cspHeader = getCSP(cspDirectives);

  // Get the response
  const response = NextResponse.next();

  // --- Set 'returning_user' cookie for first-time and returning users ---
  const returningUserCookie = request.cookies.get("returning_user");
  if (!returningUserCookie) {
    // First ever visit: set to 'new'
    response.cookies.set("returning_user", "new", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
    });
  } else if (returningUserCookie.value === "new") {
    // Second visit: upgrade to 'true'
    response.cookies.set("returning_user", "true", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
    });
  }
  // --- End cookie logic ---

  // Enable CSP if not disabled
  if (env.CSP_MODE !== "disabled") {
    // Add the CSP header
    const cspHeaderName =
      env.CSP_MODE === "report-only"
        ? "content-security-policy-report-only"
        : "content-security-policy";
    response.headers.set(cspHeaderName, cspHeader);

    // Store the nonce in a header so it can be accessed in components
    response.headers.set("x-nonce", nonce);
  }

  return response;
}

// Specify which paths this middleware will run on
export const config = {
  matcher: [
    // Apply to all routes except for specific paths
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
  // runtime: 'nodejs',
};
