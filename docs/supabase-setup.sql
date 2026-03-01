-- Run this in Supabase SQL editor for ha-ha.ai website auth + onboarding.

-- Profiles table linked to auth users.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  age int check (age >= 13 and age <= 120),
  sex text check (sex in ('male','female','non_binary','prefer_not_to_say')),
  relationship_status text check (relationship_status in (
    'single','in_relationship','married','complicated','prefer_not_to_say'
  )),
  horoscope_sign text check (horoscope_sign in (
    'aries','taurus','gemini','cancer','leo','virgo',
    'libra','scorpio','sagittarius','capricorn','aquarius','pisces'
  )),
  interests text[] not null default '{}',
  onboarding_completed boolean not null default false,
  onboarding_skipped boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-create profile row on signup.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Waitlist table used by /api/waitlist endpoints.
create table if not exists public.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

-- Enable RLS.
alter table public.profiles enable row level security;
alter table public.waitlist_entries enable row level security;

drop policy if exists "profiles own read" on public.profiles;
drop policy if exists "profiles own update" on public.profiles;
drop policy if exists "waitlist public insert" on public.waitlist_entries;

create policy "profiles own read"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "profiles own update"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Server APIs use service_role; this allows optional client-side waitlist insert if needed.
create policy "waitlist public insert"
  on public.waitlist_entries
  for insert
  with check (true);
