import type { Express } from "express";
import { type Server } from "http";
import { insertWaitlistSchema } from "@shared/schema";
import {
  getWaitlistEntries,
  getWaitlistEntryByEmail,
  insertWaitlistEntry,
  getWaitlistCount,
} from "./supabaseAdmin";

function requireAdmin(req: any, res: any, next: any) {
  if (req.session?.isAdmin) {
    return next();
  }
  return res.status(401).json({ error: "Unauthorized" });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;
      if (!password || password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: "Invalid password" });
      }
      req.session.isAdmin = true;
      return res.json({ success: true });
    } catch (_error) {
      return res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/admin/waitlist", requireAdmin, async (_req, res) => {
    try {
      const data = await getWaitlistEntries();

      const entries = data.map((entry: any) => ({
        id: entry.id,
        email: entry.email,
        createdAt: entry.created_at,
      }));

      return res.json({ entries });
    } catch (error) {
      console.error("Admin waitlist error:", error);
      return res.status(500).json({ error: "Failed to get waitlist" });
    }
  });

  app.post("/api/waitlist", async (req, res) => {
    try {
      const result = insertWaitlistSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          error: "Invalid email address",
          details: result.error.flatten(),
        });
      }

      let existingEntry;
      try {
        existingEntry = await getWaitlistEntryByEmail(result.data.email);
      } catch (err) {
        console.error("Waitlist lookup error:", err);
      }

      if (existingEntry) {
        return res.status(200).json({
          message: "Already on waitlist",
          entry: {
            id: existingEntry.id,
            email: existingEntry.email,
            createdAt: existingEntry.created_at,
          },
        });
      }

      let entry;
      try {
        entry = await insertWaitlistEntry(result.data.email);
      } catch (err: any) {
        if (err?.code === '23505') {
          const existing = await getWaitlistEntryByEmail(result.data.email);
          return res.status(200).json({
            message: "Already on waitlist",
            entry: existing ? {
              id: existing.id,
              email: existing.email,
              createdAt: existing.created_at,
            } : undefined,
          });
        }
        console.error("Waitlist insert error:", err);
        return res.status(500).json({ error: "Failed to join waitlist" });
      }

      if (!entry) {
        return res.status(500).json({ error: "Failed to join waitlist" });
      }

      return res.status(201).json({
        message: "Successfully added to waitlist",
        entry: {
          id: entry.id,
          email: entry.email,
          createdAt: entry.created_at,
        },
      });
    } catch (error) {
      console.error("Waitlist error:", error);
      return res.status(500).json({ error: "Failed to join waitlist" });
    }
  });

  app.get("/api/waitlist/count", async (_req, res) => {
    try {
      const count = await getWaitlistCount();
      return res.json({ count });
    } catch (error) {
      console.error("Waitlist count error:", error);
      return res.status(500).json({ error: "Failed to get waitlist count" });
    }
  });

  return httpServer;
}
