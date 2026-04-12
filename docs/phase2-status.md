# Phase 2 Status (Website)

Last updated: **2026-03-06**

## Scope

Phase 2 objective for website is to replace early-access behavior with real account onboarding, aligned with mobile auth and Supabase backend.

Core targets:

- Supabase auth on web
- profile onboarding persistence
- callback reliability for signup/recovery
- consistent cross-platform account identity

## Delivered

- Supabase browser auth client
- pages implemented:
  - `/` (landing with app-style top bar + hamburger)
  - `/login`
  - `/signup`
  - `/forgot-password`
  - `/reset-password`
  - `/auth/callback`
  - `/onboarding`
  - `/app` (bridge to RN web app root)
  - `/app/chat/cathy-gauthier` (bridge to RN web app Cathy mode path)
  - `/app/account` (bridge to RN web app settings)
  - `/app/account/edit-profile` (bridge to RN web app edit-profile settings path)
  - `/app/account/subscription` (bridge to RN web app subscription settings path)
- route guards:
  - protected session routes
  - onboarding gate before `/app` protected subtree
- bridge behavior:
  - website landing/auth stays in this repo
  - authenticated `/app*` flow redirects to the deployed web build from `HAHA_app`
  - domain switch may require a new sign-in on app-web origin
- callback handling:
  - PKCE exchange path
  - `verifyOtp` fallback path
  - recovery flow routing to `/reset-password`
- landing CTA now routes to account creation/login
- top bar aligned with app UX:
  - left logo returns to landing root
  - right hamburger opens account + preferences + auth actions
  - language switch (`fr`/`en`) moved under menu preferences
  - menu closes only on explicit dismiss (outside click, Escape, or navigation)
- Supabase waitlist storage retained for admin/backoffice use

## In Progress

- production email deliverability tuning (SMTP/branding rollout)
- callback hardening around domain consistency (`www` vs non-`www`)
- final cleanup of legacy wording from old waitlist era
- optional custom-domain alignment between site and app-web to reduce re-login friction

## Planned Next

- production pass of all auth edge cases:
  - expired token links
  - cross-browser callback handling
  - rate-limit handling UX
- broaden test coverage for auth callback and onboarding gating
- keep API docs and deployment docs synced with Supabase dashboard settings

## Verification Baseline

```bash
npm run check
npm run build
```

Manual checks:

1. Signup sends confirmation email and callback lands on `/auth/callback`.
2. Confirmed user is redirected to `/onboarding` when profile not completed.
3. Forgot password sends recovery email and resets password via `/reset-password`.
4. Completed onboarding unlocks `/app` and redirects to the RN web app.
5. `/app` redirects to the RN web app root URL.
6. `/app/chat/cathy-gauthier`, `/app/account`, `/app/account/edit-profile`, and `/app/account/subscription` redirect to mapped RN web app routes.
7. Unauthenticated access to `/app*` bridge routes redirects to `/login`.
8. Hamburger menu on `/` opens reliably and remains visible until explicit dismiss.

## Required Configuration

Client env:

- `VITE_PUBLIC_SITE_URL`
- `VITE_HAHA_APP_WEB_URL`

Server env:

- `SESSION_SECRET`
- `ADMIN_PASSWORD`

Supabase Auth URL configuration:

- Site URL: `https://www.ha-ha.ai`
- Redirect URLs:
  - `https://www.ha-ha.ai/auth/callback`
  - `https://ha-ha.ai/auth/callback`
  - `hahaha://auth/callback`
