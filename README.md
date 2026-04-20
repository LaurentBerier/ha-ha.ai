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
- App-style top bar on landing (logo + hamburger account menu), while preserving full landing content
- Supabase email/password login and signup
- Password reset flow (`/forgot-password` -> email -> `/reset-password`)
- Apple OAuth login (via Supabase OAuth redirect)
- Auth callback handling (`/auth/callback`)
- Onboarding flow persisted in `public.profiles`
- Hamburger account menu behavior:
  - `Mon compte / My account`: open app, settings, edit profile, subscription
  - `Préférences / Preferences`: language switch (`fr`/`en`)
  - Auth action changes by state: sign in / sign up / sign out
  - Menu stays open until explicit close (outside click, Escape, or navigation)
- Auth-gated bridge routes to the real React Native web app (`HAHA_app` repo):
  - `/app` -> `<VITE_HAHA_APP_WEB_URL>/`
  - `/app/chat/cathy-gauthier` -> `<VITE_HAHA_APP_WEB_URL>/mode-select/cathy-gauthier`
  - `/app/account` -> `<VITE_HAHA_APP_WEB_URL>/settings`
  - `/app/account/edit-profile` -> `<VITE_HAHA_APP_WEB_URL>/settings/edit-profile`
  - `/app/account/subscription` -> `<VITE_HAHA_APP_WEB_URL>/settings/subscription`
- Landing CTA now points to account creation (`/signup`)
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

- `VITE_PUBLIC_SITE_URL` (recommended; set canonical origin, e.g. `https://www.ha-ha.ai`)
- `VITE_HAHA_APP_WEB_URL` (required; deployed URL of the web build from `HAHA_app`)
- `VITE_GA_MEASUREMENT_ID` (optional; GA4 measurement ID like `G-XXXXXXXXXX`)

Server/API:

- `SESSION_SECRET`
- `ADMIN_PASSWORD`

## Supabase Bootstrap

Run once in Supabase SQL editor:

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
- If using Google Analytics, set `VITE_GA_MEASUREMENT_ID` in Vercel so GA4 is injected in production.

## Manual Verification Checklist

1. `/` loads landing with app-style top bar.
2. Hamburger menu opens and stays open until explicit close.
3. Language switch in hamburger (`fr`/`en`) updates visible copy.
4. `/login` loads.
5. `/signup` creates user and sends confirmation email.
6. `/forgot-password` sends reset email.
7. Email callback lands on `/auth/callback`.
8. Recovery links route to `/reset-password`.
9. New users are redirected to `/onboarding`.
10. Completing/skipping onboarding redirects to `/app` then opens the real RN web app.
11. `/app/chat/cathy-gauthier` opens RN web app mode selection for Cathy.
12. `/app/account` opens RN web app settings page.
13. `/app/account/edit-profile` opens RN web app edit-profile settings page.
14. `/app/account/subscription` opens RN web app subscription settings page.
15. Landing CTA buttons route to `/signup` and `/login`.

## Bridge Notes

- If `VITE_HAHA_APP_WEB_URL` uses a different domain than `www.ha-ha.ai`, a fresh login on the web app domain can be expected.
- Ensure the `HAHA_app` web deployment uses the patched export pipeline (`npm run deploy:web`) to avoid white-screen bootstrap issues.
