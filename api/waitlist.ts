import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSupabaseAdmin } from "./_supabase";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      const { email } = req.body;

      if (!email || typeof email !== "string") {
        return res.status(400).json({ error: "Email is required" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      const normalizedEmail = email.toLowerCase().trim();
      const supabaseAdmin = getSupabaseAdmin();

      const { data: existing, error: existingError } = await supabaseAdmin
        .from("waitlist_entries")
        .select("id,email,created_at")
        .eq("email", normalizedEmail)
        .maybeSingle();

      if (existingError) {
        return res.status(500).json({ error: existingError.message });
      }

      if (existing) {
        return res.status(200).json({
          message: "Already on waitlist",
          entry: {
            id: existing.id,
            email: existing.email,
            createdAt: existing.created_at,
          },
        });
      }

      const { data: result, error: insertError } = await supabaseAdmin
        .from("waitlist_entries")
        .insert({ email: normalizedEmail })
        .select("id,email,created_at")
        .single();

      if (insertError || !result) {
        return res.status(500).json({ error: insertError?.message ?? "Failed to join waitlist" });
      }

      return res.status(201).json({
        message: "Successfully added to waitlist",
        entry: {
          id: result.id,
          email: result.email,
          createdAt: result.created_at,
        },
      });
    } catch (error) {
      console.error("Waitlist error:", error);
      return res.status(500).json({ error: "Failed to join waitlist" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
