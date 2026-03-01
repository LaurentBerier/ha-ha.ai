# ha-ha.ai (Website)

Landing site and web auth/onboarding frontend for Ha-Ha.ai.

## Stack

- React + TypeScript + Vite
- Wouter routing
- Tailwind + Radix UI
- Express server for local/dev API + SSR static serving
- Supabase for auth and database

## Features

- Bilingual landing page (`fr`/`en`)
- Supabase email/password login and signup
- Apple OAuth login (via Supabase OAuth redirect)
- Auth callback handling (`/auth/callback`)
- Onboarding flow persisted in `public.profiles`
- Auth-gated app route (`/app`)
- Waitlist API backed by `public.waitlist_entries`
- Admin waitlist page (`/admin`)

## Project Layout

- `client/` frontend app
- `server/` express server for local/dev
- `api/` Vercel serverless routes
- `shared/` shared types/schemas
- `docs/` SQL/bootstrap docs

## Prerequisites

- Node.js 20+
- npm 10+
- Supabase project with auth providers configured

## Environment Variables

Create `.env` from `.env.example`.

Client:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Server/API:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SESSION_SECRET`
- `ADMIN_PASSWORD`

## Supabase Bootstrap

Run once in Supabase SQL editor:

- `docs/supabase-setup.sql`

## Run Locally

```bash
npm install
npm run dev
```

Default port is `5000`. Override when needed:

```bash
PORT=5050 npm run dev
```

## Typecheck and Build

```bash
npm run check
npm run build
```

## Deploy (Vercel)

Ensure all env vars are set in Vercel project settings.

Important:

- `VITE_*` vars are required at build time for frontend auth pages.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only and must never be exposed client-side.

## Manual Verification Checklist

1. `/login` loads.
2. `/signup` creates user and sends confirmation email.
3. Email callback lands on `/auth/callback`.
4. New users are redirected to `/onboarding`.
5. Completing/skipping onboarding redirects to `/app`.
6. Landing waitlist form inserts into `waitlist_entries`.
