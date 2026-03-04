# Ha-Ha.ai Website Notes

## Current Status (March 2026)

This repository now uses **Supabase** as the single backend for:

- user authentication (email/password + Apple OAuth)
- onboarding profile storage (`profiles`)
- waitlist storage (`waitlist_entries`)

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

Admin:

- `/admin` (session-password gated page for waitlist export)

## Supabase Requirements

Run SQL bootstrap once in Supabase:

- `docs/supabase-setup.sql`

This creates:

- `public.profiles` + signup trigger
- `public.waitlist_entries`
- RLS policies for profile and waitlist

## Environment Variables

Client (Vite):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Server / API:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
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
