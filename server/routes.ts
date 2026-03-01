import type { Express } from "express";
import { createServer, type Server } from "http";
import { insertWaitlistSchema } from "@shared/schema";
import { supabaseAdmin } from "./supabaseAdmin";

function requireAdmin(req: any, res: any, next: any) {
  if (req.session?.isAdmin) {
    return next();
  }
  return res.status(401).json({ error: "Unauthorized" });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;
      if (!password || password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: "Invalid password" });
      }
      req.session.isAdmin = true;
      return res.json({ success: true });
    } catch (error) {
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
      const { data, error } = await supabaseAdmin
        .from("waitlist_entries")
        .select("id,email,created_at")
        .order("created_at", { ascending: false });

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      const entries = (data ?? []).map((entry) => ({
        id: entry.id,
        email: entry.email,
        createdAt: entry.created_at,
      }));

      return res.json({ entries });
    } catch (error) {
      return res.status(500).json({ error: "Failed to get waitlist" });
    }
  });

  app.post("/api/waitlist", async (req, res) => {
    try {
      const result = insertWaitlistSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid email address",
          details: result.error.flatten() 
        });
      }

      const { data: existingEntry, error: existingError } = await supabaseAdmin
        .from("waitlist_entries")
        .select("id,email,created_at")
        .eq("email", result.data.email)
        .maybeSingle();

      if (existingError) {
        return res.status(500).json({ error: existingError.message });
      }

      if (existingEntry) {
        return res.status(200).json({ 
          message: "Already on waitlist",
          entry: {
            id: existingEntry.id,
            email: existingEntry.email,
            createdAt: existingEntry.created_at,
          }
        });
      }

      const { data: entry, error: insertError } = await supabaseAdmin
        .from("waitlist_entries")
        .insert({ email: result.data.email })
        .select("id,email,created_at")
        .single();

      if (insertError || !entry) {
        return res.status(500).json({ error: insertError?.message ?? "Failed to join waitlist" });
      }

      return res.status(201).json({ 
        message: "Successfully added to waitlist",
        entry: {
          id: entry.id,
          email: entry.email,
          createdAt: entry.created_at,
        }
      });
    } catch (error) {
      console.error("Waitlist error:", error);
      return res.status(500).json({ error: "Failed to join waitlist" });
    }
  });

  app.get("/api/waitlist/count", async (_req, res) => {
    try {
      const { count, error } = await supabaseAdmin
        .from("waitlist_entries")
        .select("id", { count: "exact", head: true });

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.json({ count: count ?? 0 });
    } catch (error) {
      console.error("Waitlist count error:", error);
      return res.status(500).json({ error: "Failed to get waitlist count" });
    }
  });

  return httpServer;
}
