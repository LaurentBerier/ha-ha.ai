import type { VercelRequest, VercelResponse } from "@vercel/node";

const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const secure = isProduction ? "; Secure" : "";
    res.setHeader(
      "Set-Cookie",
      `admin_token=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${secure}`
    );
    return res.json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
