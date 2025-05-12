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

- Verify that proper CORS, CSP, and other security headers are implemented
- Ensure all API routes validate input properly
- Follow secure authentication and authorization patterns
- Keep dependencies updated to avoid security vulnerabilities