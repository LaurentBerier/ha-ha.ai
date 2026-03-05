# Deployment (Vercel)

## Required Environment Variables

Set these in Vercel project settings:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_HAHA_APP_WEB_URL`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SESSION_SECRET`
- `ADMIN_PASSWORD`

## Notes

- `VITE_*` variables are injected into the browser build.
- `VITE_HAHA_APP_WEB_URL` must point to the deployed Expo web app from `HAHA_app`.
- `SUPABASE_SERVICE_ROLE_KEY` is server-side only.
- Keep `SESSION_SECRET` unique per environment.

## Supabase Dashboard Auth Configuration

In Supabase Auth URL configuration:

- Site URL: `https://www.ha-ha.ai`
- Redirect URLs:
  - `https://www.ha-ha.ai/auth/callback`
  - `https://ha-ha.ai/auth/callback`
  - `hahaha://auth/callback` (mobile app deep link)

Password recovery:

- web flow should use `https://www.ha-ha.ai/auth/callback?flow=recovery`
- mobile flow should use `hahaha://auth/callback?flow=recovery`

If Apple sign-in is enabled:

- configure Apple provider credentials in Supabase
- include the same callback domain

## SMTP / Branded Emails (Resend)

If using branded sender (`info@ha-ha.ai`):

1. Verify domain DNS in Resend.
2. Configure Supabase custom SMTP:
   - host `smtp.resend.com`
   - port `465`
   - username `resend`
   - password `<resend-api-key>`
   - sender email `info@ha-ha.ai`
3. Keep `{{ .ConfirmationURL }}` in Supabase email templates.

## Deployment Checklist

1. SQL bootstrap already applied (`docs/supabase-setup.sql`).
2. Vercel env vars configured.
3. Deploy latest `main`.
4. Validate:
   - `/login` and `/signup` render
   - signup email callback works
   - onboarding writes to `profiles`
   - `/app` redirects to RN web app root
   - `/app/chat/cathy-gauthier` redirects to RN web app Cathy path
   - `/app/account` redirects to RN web app settings
   - waitlist insert works
