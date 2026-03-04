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
- Password reset flow (`/forgot-password` -> email -> `/reset-password`)
- Apple OAuth login (via Supabase OAuth redirect)
- Auth callback handling (`/auth/callback`)
- Onboarding flow persisted in `public.profiles`
- Auth-gated app route (`/app`)
- Landing CTA now points to account creation (`/signup`)
- Legacy waitlist APIs backed by `public.waitlist_entries` (still available for admin/backoffice)
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
- `VITE_PUBLIC_SITE_URL` (recommended; set canonical origin, e.g. `https://www.ha-ha.ai`)

Server/API:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SESSION_SECRET`
- `ADMIN_PASSWORD`

## Supabase Bootstrap

Run once in Supabase SQL editor:

- `docs/supabase-setup.sql`
- `docs/phase2-status.md` (current execution status)

## Supabase Auth URL Configuration

Recommended settings:

- Site URL: `https://www.ha-ha.ai`
- Redirect URLs:
  - `https://www.ha-ha.ai/auth/callback`
  - `https://ha-ha.ai/auth/callback`
  - `hahaha://auth/callback` (mobile app deep link)

For password recovery links on web, callback should include `?flow=recovery` and land on `/auth/callback`.

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
3. `/forgot-password` sends reset email.
4. Email callback lands on `/auth/callback`.
5. Recovery links route to `/reset-password`.
6. New users are redirected to `/onboarding`.
7. Completing/skipping onboarding redirects to `/app`.
8. Landing CTA buttons route to `/signup` and `/login`.
9. (Optional) `POST /api/waitlist` still inserts into `waitlist_entries`.
