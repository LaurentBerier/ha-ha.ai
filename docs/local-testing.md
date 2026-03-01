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

- `/login`
- `/signup`
- `/auth/callback`
- `/onboarding`
- `/app`

Expected:

- unauthenticated users are redirected away from protected routes
- authenticated users without onboarding are forced to onboarding
- after onboarding complete/skip, `/app` is accessible

## 5) Common failures

- `SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set`
  - Server env is missing.
- `Could not find table 'public.waitlist_entries'`
  - Run `docs/supabase-setup.sql` in Supabase.
- Callback returns with no session
  - Check Supabase Auth URL config and redirect URL includes `/auth/callback`.
