import { type User, type InsertUser, type WaitlistEntry, type InsertWaitlistEntry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getWaitlistEntries(): Promise<WaitlistEntry[]>;
  getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined>;
  createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private waitlistEntries: Map<string, WaitlistEntry>;

  constructor() {
    this.users = new Map();
    this.waitlistEntries = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getWaitlistEntries(): Promise<WaitlistEntry[]> {
    return Array.from(this.waitlistEntries.values());
  }

  async getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined> {
    return Array.from(this.waitlistEntries.values()).find(
      (entry) => entry.email.toLowerCase() === email.toLowerCase(),
    );
  }

  async createWaitlistEntry(insertEntry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    const id = randomUUID();
    const entry: WaitlistEntry = {
      id,
      email: insertEntry.email,
      createdAt: new Date(),
    };
    this.waitlistEntries.set(id, entry);
    return entry;
  }
}

export const storage = new MemStorage();
