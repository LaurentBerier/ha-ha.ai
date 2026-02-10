import type { VercelRequest, VercelResponse } from "@vercel/node";
import { clearAdminCookie } from "../_auth";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    clearAdminCookie(res);
    return res.json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
