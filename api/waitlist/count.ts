import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getCount } from "../_waitlistStore";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    return res.status(200).json({ count: getCount() });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
