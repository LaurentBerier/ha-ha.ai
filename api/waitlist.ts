import type { VercelRequest, VercelResponse } from "@vercel/node";
import { addEntry, findEntryByEmail } from "./_waitlistStore";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
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
      const existing = findEntryByEmail(normalizedEmail);

      if (existing) {
        return res.status(200).json({
          message: "Already on waitlist",
          entry: existing,
        });
      }

      const entry = addEntry(normalizedEmail);
      return res.status(201).json({
        message: "Successfully added to waitlist",
        entry,
      });
    } catch (error) {
      console.error("Waitlist error:", error);
      return res.status(500).json({ error: "Failed to join waitlist" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
