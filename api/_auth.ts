import crypto from "crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000;

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET must be set");
  return secret;
}

export function createAdminToken(): string {
  const payload = JSON.stringify({
    admin: true,
    exp: Date.now() + TOKEN_EXPIRY_MS,
  });
  const hmac = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
  const payloadEncoded = Buffer.from(payload).toString("base64url");
  return payloadEncoded + "." + hmac;
}

export function verifyAdminToken(token: string): boolean {
  try {
    const dotIndex = token.indexOf(".");
    if (dotIndex === -1) return false;

    const payloadB64 = token.slice(0, dotIndex);
    const hmac = token.slice(dotIndex + 1);
    if (!payloadB64 || !hmac) return false;

    const payload = Buffer.from(payloadB64, "base64url").toString("utf-8");
    const expectedHmac = crypto
      .createHmac("sha256", getSecret())
      .update(payload)
      .digest("hex");

    if (!crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expectedHmac))) {
      return false;
    }

    const data = JSON.parse(payload);
    if (!data.admin || Date.now() > data.exp) return false;

    return true;
  } catch {
    return false;
  }
}

const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

export function setAdminCookie(res: VercelResponse, token: string) {
  const secure = isProduction ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `admin_token=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=86400${secure}`
  );
}

export function clearAdminCookie(res: VercelResponse) {
  const secure = isProduction ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `admin_token=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${secure}`
  );
}

export function getAdminToken(req: VercelRequest): string | null {
  const cookies = req.headers.cookie || "";
  const match = cookies.match(/admin_token=([^;]+)/);
  return match ? match[1] : null;
}

export function isAdmin(req: VercelRequest): boolean {
  const token = getAdminToken(req);
  if (!token) return false;
  return verifyAdminToken(token);
}
