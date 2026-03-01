import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSupabaseAdmin } from "../_supabase";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    try {
      const supabaseAdmin = getSupabaseAdmin();
      const { count, error } = await supabaseAdmin
        .from("waitlist_entries")
        .select("id", { count: "exact", head: true });

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json({ count: count ?? 0 });
    } catch (error) {
      console.error("Waitlist count error:", error);
      return res.status(500).json({ error: "Failed to get waitlist count" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
