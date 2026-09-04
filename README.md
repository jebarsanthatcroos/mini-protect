# Mini Project

A Next.js application scaffolded with TypeScript and Tailwind CSS for a small product or service project.

## Overview

This project uses the App Router and includes a modern stack for building a full-featured web app, including:

- Next.js 16 with App Router
- React 19 and TypeScript
- Tailwind CSS
- ESLint and Prettier
- Jest and Testing Library
- Authentication and user model support
- Stripe, MongoDB, Redis, mail, and SMS integrations ready for extension

## Prerequisites

- Node.js 20 or newer
- npm

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000 in your browser.

## Useful Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  models/
    User.ts
```

## Notes

- The main app entry points live under `src/app`.
- Shared data models live under `src/models`.
- The generated Next.js agent guidance lives in `AGENTS.md` and should be preserved.

### Rendering

Page routes use static generation through the root and authentication layouts. The
authentication and other API routes remain server-backed because they require
sessions, database access, and request-time mutations. Run this project with the
Next.js server rather than as a static HTML export.

## Development Guidance

- Prefer the App Router patterns that come with Next.js.
- Keep TypeScript types explicit when working with data models.
- Run linting before finishing work on the project.


