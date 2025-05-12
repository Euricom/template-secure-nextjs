# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 project bootstrapped with `create-next-app`. It uses:

- React 19 with TypeScript
- The App Router architecture
- TailwindCSS with shadcn/ui components
- PNPM as package manager

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
```

## Code Architecture

### Directory Structure

- `/src/app`: Contains Next.js App Router pages and layouts
- `/src/components`: React components, including UI components from shadcn/ui
- `/src/lib`: Utility functions and shared logic
- `/public`: Static assets like images and fonts

### Key Components

- The project uses shadcn/ui with components configured via `components.json`
- UI components are styled with TailwindCSS v4
- `src/lib/utils.ts` provides utility functions including `cn()` for merging Tailwind classes

### Styling

The project uses TailwindCSS v4 with CSS variables for theming:
- Geist Sans and Geist Mono fonts are used throughout the application
- The shadcn/ui components follow the "new-york" style
- UI components support both light and dark modes

## Security Features

The project is set up as a template for secure Next.js applications (as implied by the repository name). When working with this codebase, ensure all security best practices are followed:

### Content Security Policy (CSP)

This project implements Content Security Policy using the `csp-header` package:

- CSP is implemented via a middleware (`src/middleware.ts`) that generates a unique nonce for each request
- The middleware sets appropriate CSP directives to protect against XSS and other attacks
- A utility function (`src/lib/csp.ts`) is provided to access the nonce value in components
- To use the nonce in inline scripts, import the `getNonce()` function from `@/lib/csp`

### Security Headers

The following security headers are implemented in `next.config.ts`:

- X-Content-Type-Options: Prevents MIME type sniffing
- X-Frame-Options: Prevents clickjacking by prohibiting embedding in frames
- X-XSS-Protection: Provides basic XSS protection (though CSP is the primary defense)
- Referrer-Policy: Controls the information sent in the Referer header
- Permissions-Policy: Restricts access to browser features (camera, microphone, geolocation)

### Additional Security Best Practices

- Ensure all API routes validate input properly
- Follow secure authentication and authorization patterns
- Keep dependencies updated to avoid security vulnerabilities