import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const fallbackUrl = "https://placeholder.supabase.co";
const fallbackAnonKey = "placeholder-anon-key";

export const isSupabaseConfigured = Boolean(supabaseUrl) && Boolean(supabaseAnonKey);
export const supabaseConfigError =
  "Configuration Supabase manquante côté frontend (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).";

export const supabase = createBrowserClient(
  isSupabaseConfigured ? supabaseUrl : fallbackUrl,
  isSupabaseConfigured ? supabaseAnonKey : fallbackAnonKey,
);
