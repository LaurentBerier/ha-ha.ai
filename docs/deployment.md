# Deployment (Vercel)

## Required Environment Variables

Set these in Vercel project settings:

- `VITE_HAHA_APP_WEB_URL`
- `SESSION_SECRET`
- `ADMIN_PASSWORD`

## Notes

- `VITE_*` variables are injected into the browser build.
- `VITE_HAHA_APP_WEB_URL` must point to the deployed Expo web app from `HAHA_app`.
- deploy `HAHA_app` web with `npm run deploy:web` to ensure module-script patch is applied.
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

2. Deploy `HAHA_app` web (`npm run deploy:web`) and collect production URL.
3. Set `VITE_HAHA_APP_WEB_URL` in this project with that URL.
4. Vercel env vars configured.
5. Deploy latest `main`.
6. Validate:
   - `/` renders landing with app-style top bar
   - hamburger opens/closes correctly (no immediate close)
   - `/login` and `/signup` render
   - signup email callback works
   - onboarding writes to `profiles`
   - `/app` redirects to RN web app root
   - `/app/chat/cathy-gauthier` redirects to RN web app Cathy path
   - `/app/account` redirects to RN web app settings
   - `/app/account/edit-profile` redirects to RN web app edit-profile settings
   - `/app/account/subscription` redirects to RN web app subscription settings
   - waitlist insert works
   - no white page on app-web URL (login or home renders)

## Cross-Domain Session Note

If `VITE_HAHA_APP_WEB_URL` is on a different domain than `www.ha-ha.ai`, browser session storage is origin-scoped. A second login on app-web domain can be expected.
