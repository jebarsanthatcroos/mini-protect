<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project-specific instructions

This repository is a Next.js mini-project with TypeScript and Tailwind CSS.

## Working conventions

- Use the App Router under `src/app` for page and layout code.
- Keep reusable domain logic in `src/models` and keep typings explicit.
- Prefer small, focused changes and avoid broad refactors unless required.
- Match the existing project conventions and keep code readable and production-safe.

## Verification

- Run `npm run lint` before finalizing changes when code is modified.
- Use the existing test setup if adding or updating behavior.
- Prefer real runtime verification and fix the root cause rather than patching symptoms.

## Stack expectations

The project already includes support for authentication, MongoDB, Redis, Stripe, email, and SMS integrations. When extending features, keep those responsibilities separated and avoid introducing unnecessary coupling between layers.
