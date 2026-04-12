# Ha-Ha.ai Website Notes

## Current Status (March 2026)

This repository now uses **Supabase** as the single backend for:

- user authentication (email/password + Apple OAuth)
- onboarding profile storage (`profiles`)

Legacy Neon/Drizzle files were removed.

## App Routes

Public:

- `/` landing page
- `/login`
- `/signup`
- `/forgot-password`
- `/reset-password`
- `/auth/callback`

Protected:

- `/onboarding` (requires authenticated session)
- `/app` (requires authenticated session + onboarding complete/skip)
- `/app/chat/cathy-gauthier`
- `/app/account`
- `/app/account/edit-profile`
- `/app/account/subscription`

Behavior in protected app area:

- `/app*` routes are bridge routes that redirect to the real RN web app (`HAHA_app`)
- `/app` -> `<VITE_HAHA_APP_WEB_URL>/`
- `/app/chat/cathy-gauthier` -> `<VITE_HAHA_APP_WEB_URL>/mode-select/cathy-gauthier`
- `/app/account` -> `<VITE_HAHA_APP_WEB_URL>/settings`
- `/app/account/edit-profile` -> `<VITE_HAHA_APP_WEB_URL>/settings/edit-profile`
- `/app/account/subscription` -> `<VITE_HAHA_APP_WEB_URL>/settings/subscription`
- if domains differ, user may need to authenticate again on app-web domain

Landing header behavior:

- top bar uses app visual style (logo left, hamburger right)
- hamburger opens account/preference/auth menu
- language switch (`fr`/`en`) is in the hamburger menu
- menu closes on outside click, Escape, or navigation

Admin:

- `/admin` (session-password gated page for waitlist export)

## Supabase Requirements

Run SQL bootstrap once in Supabase:


This creates:

- `public.profiles` + signup trigger
- RLS policies for profile and waitlist

## Environment Variables

Client (Vite):

- `VITE_HAHA_APP_WEB_URL`

Server / API:

- `SESSION_SECRET`
- `ADMIN_PASSWORD`

See `.env.example`.

## Local Development

```bash
npm install
npm run dev
```

If port `5000` is already used:

```bash
PORT=5050 npm run dev
```

## Validation

```bash
npm run check
npm run build
```

Manual flow:

1. `GET /login` and `GET /signup` load.
2. Sign up user, confirm via email callback.
3. Trigger password recovery from `/forgot-password` and complete reset on `/reset-password`.
4. User is redirected to onboarding after confirmed signup.
5. Complete or skip onboarding and land on `/app`.
6. Verify `/app`, `/app/chat/cathy-gauthier`, `/app/account`, `/app/account/edit-profile`, and `/app/account/subscription` each redirect to RN web app.
