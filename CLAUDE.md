# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 project bootstrapped with `create-next-app`. It uses:

- React 19 with TypeScript
- The App Router architecture
- TailwindCSS v4 with shadcn/ui components
- PNPM as package manager
- Prisma ORM with SQLite database (configurable for PostgreSQL)
- `better-auth` for secure authentication

## Common Commands

### Development

```bash
# Start development server with Turbopack
pnpm dev

# Build the application
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint

# Type check the application
pnpm typecheck

# Generate Prisma client
pnpm prisma:generate

# Push database schema changes
pnpm prisma:push

# Open Prisma Studio (database UI)
pnpm prisma:studio

# Format code with Prettier
pnpm format
```

## Code Architecture

### Directory Structure

- `/src/app`: Contains Next.js App Router pages and layouts
  - `(auth)`: Authentication flows (login, signup, reset-password)
  - `api`: API routes
  - `admin`: Admin dashboard (planned)
  - `marketing`: Public-facing pages (planned)
  - `organization`: Organization management (planned)
  - `products`: Product management (planned)
- `/src/components`: React components, including UI components from shadcn/ui
- `/src/lib`: Utility functions and shared logic
- `/src/server`: Server-only code and utilities
- `/public`: Static assets like images and fonts
- `/prisma`: Database schema and SQLite database file

### Key Components

- The project uses shadcn/ui with components configured via `components.json`
- UI components are styled with TailwindCSS v4
- `src/lib/utils.ts` provides utility functions including `cn()` for merging Tailwind classes
- `src/server/auth.ts` configures the authentication system

### Styling

The project uses TailwindCSS v4 with CSS variables for theming:

- Geist Sans and Geist Mono fonts are used throughout the application
- The shadcn/ui components follow the "new-york" style
- UI components support both light and dark modes

## Security Features

The project is set up as a template for secure Next.js applications. When working with this codebase, ensure all security best practices are followed:

### Authentication

- Uses `better-auth` for secure authentication with multiple strategies:
  - Email/password authentication
  - OAuth providers (Google and Microsoft implemented)
  - Session-based authentication with secure tokens
- Future implementations planned (2FA, magic links, passkeys)
- Authentication components in `/src/app/(auth)`
- Sessions managed by `getSession()` from `/src/server/auth.ts`

### Environment Variables

- Environment variables are validated using Zod in `src/env.ts`
- Use the `.env.example` file as a template for required environment variables
- Always access environment variables through the `env` object imported from `@/env.ts` rather than directly from `process.env`
- Required auth-related env variables include:
  - `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`
  - OAuth provider credentials (`GOOGLE_CLIENT_ID`, etc.)

### Content Security Policy (CSP)

This project implements Content Security Policy using the `csp-header` package:

- CSP is implemented via a middleware (`src/middleware.ts`) that generates a unique nonce for each request
- The middleware sets appropriate CSP directives to protect against XSS and other attacks
- A utility function (`src/lib/csp.ts`) is provided to access the nonce value in components
- To use the nonce in inline scripts, import the `getNonce()` function from `@/lib/csp`
- CSP modes configurable through the `CSP_MODE` env variable:
  - `enforce`: Enforce CSP rules
  - `report-only`: Monitor violations without enforcement
  - `disabled`: Disable CSP

### Security Headers

The following security headers are implemented in `next.config.ts`:

- X-Content-Type-Options: Prevents MIME type sniffing
- X-Frame-Options: Prevents clickjacking by prohibiting embedding in frames
- X-XSS-Protection: Provides basic XSP protection (though CSP is the primary defense)
- Referrer-Policy: Controls the information sent in the Referer header
- Permissions-Policy: Restricts access to browser features (camera, microphone, geolocation)

### Cookie Security

- Secure cookie settings with proper attributes:
  - `secure: true` in production (cookies only sent over HTTPS)
  - `httpOnly: true` (prevents JavaScript access to cookies)
  - `sameSite: "strict"` (prevents CSRF attacks)
- User tracking cookie (`returning_user`) implemented in the middleware

### Additional Security Best Practices

- Ensure all API routes validate input properly
- Follow secure authentication and authorization patterns
- Keep dependencies updated to avoid security vulnerabilities
- Planned features include CSRF protection, rate limiting, and more according to OWASP ASVS checklist

## Feature Roadmap

The project has several planned security features:

- Additional authentication methods (2FA, magic links, passkeys)
- User account protection (account lifecycle management, admin controls)
- Organization security (multi-organization support, role-based permissions)
- Data protection enhancements (input validation, XSS protection)
- Advanced security features (rate limiting, CSRF protection, honeypot techniques)