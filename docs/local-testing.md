# Local Testing

## 1) Install + env

```bash
npm install
cp .env.example .env
```

Fill `.env` with real Supabase values.

## 2) Start server

```bash
npm run dev
```

If `5000` is already in use:

```bash
PORT=5050 npm run dev
```

## 3) Quick API checks

```bash
curl -i http://127.0.0.1:5000/api/waitlist/count
curl -i -X POST http://127.0.0.1:5000/api/waitlist \
  -H "content-type: application/json" \
  -d '{"email":"local-test@example.com"}'
```

## 4) Browser checks

Open:

- `/`
- `/login`
- `/signup`
- `/forgot-password`
- `/reset-password`
- `/auth/callback`
- `/onboarding`
- `/app`
- `/app/chat/cathy-gauthier`
- `/app/account`
- `/app/account/edit-profile`
- `/app/account/subscription`

Expected:

- `/` keeps landing content and shows app-style top bar
- hamburger menu opens without immediate close
- unauthenticated users are redirected away from protected routes
- authenticated users without onboarding are forced to onboarding
- after onboarding complete/skip, `/app` redirects to RN web app root
- `/app/chat/cathy-gauthier` redirects to RN web app Cathy mode path
- `/app/account` redirects to RN web app settings path
- `/app/account/edit-profile` redirects to RN web app edit-profile settings path
- `/app/account/subscription` redirects to RN web app subscription settings path
- recovery callback (`/auth/callback?flow=recovery`) routes to `/reset-password`
- if app-web runs on another domain, expect a separate login on first redirect

## 5) Common failures

- `SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set`
  - Server env is missing.
- `Could not find table 'public.waitlist_entries'`
  - Run `docs/supabase-setup.sql` in Supabase.
- Callback returns with no session
  - Check Supabase Auth URL config and redirect URLs include both `www` and non-`www` callback domains.
- PKCE code verifier missing
  - Open the email link in the same browser and same domain (`www` vs non-`www`) used during signup.
- white page on bridged app-web URL
  - redeploy `HAHA_app` web with `npm run deploy:web` (patched module script export)
