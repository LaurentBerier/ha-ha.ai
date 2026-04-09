# Ha-Ha.ai Website Notes

## Current Status (April 2026)

Bilingual (FR/EN) landing page for Ha-Ha.ai with:

- Email waitlist form (direct PostgreSQL, `pg` driver)
- Password-protected admin page for viewing waitlist entries
- Dark theme with red/blue accents
- Auth pages (login/signup/onboarding) present but require Supabase credentials to function

## Architecture

- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Backend**: Express server with `pg` for PostgreSQL
- **Database**: PostgreSQL via `DATABASE_URL` (Replit built-in) or `NEON_DATABASE_URL`
- **Vercel API**: Serverless functions in `api/` directory (also use `pg`)
- **Routing**: `wouter` for client-side routing

## Database

The `waitlist_entries` table:
```sql
CREATE TABLE waitlist_entries (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);
```

## App Routes

Public:

- `/` landing page (with waitlist email form)
- `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/auth/callback` (require Supabase config)
- `/admin` (password-gated waitlist viewer)

Protected (require Supabase auth):

- `/onboarding`, `/app`, `/app/chat/cathy-gauthier`, `/app/account/*`

## API Endpoints

- `POST /api/waitlist` - Add email to waitlist (201 new, 200 existing)
- `GET /api/waitlist/count` - Get waitlist count
- `POST /api/admin/login` - Admin login with ADMIN_PASSWORD
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/waitlist` - Get all waitlist entries (requires admin session)

## Environment Variables

Required:

- `DATABASE_URL` or `NEON_DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Express session secret
- `ADMIN_PASSWORD` - Password for admin page

Optional (for auth features):

- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` - Frontend Supabase client
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` - Server Supabase client

## Key Files

- `server/supabaseAdmin.ts` - Database helper (pg Pool)
- `server/routes.ts` - Express API routes
- `client/src/components/SignupSection.tsx` - Waitlist email form
- `client/src/lib/i18n.ts` - FR/EN translations
- `api/` - Vercel serverless functions (mirror Express routes)

## Local Development

```bash
npm run dev
```

Server runs on port 5000 (Express + Vite dev server).
