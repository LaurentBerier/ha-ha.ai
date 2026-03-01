# Deployment (Vercel)

## Required Environment Variables

Set these in Vercel project settings:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SESSION_SECRET`
- `ADMIN_PASSWORD`

## Notes

- `VITE_*` variables are injected into the browser build.
- `SUPABASE_SERVICE_ROLE_KEY` is server-side only.
- Keep `SESSION_SECRET` unique per environment.

## Supabase Dashboard Auth Configuration

In Supabase Auth URL configuration:

- Site URL: `https://www.ha-ha.ai`
- Redirect URL: `https://www.ha-ha.ai/auth/callback`

If Apple sign-in is enabled:

- configure Apple provider credentials in Supabase
- include the same callback domain

## Deployment Checklist

1. SQL bootstrap already applied (`docs/supabase-setup.sql`).
2. Vercel env vars configured.
3. Deploy latest `main`.
4. Validate:
   - `/login` and `/signup` render
   - signup email callback works
   - onboarding writes to `profiles`
   - waitlist insert works
