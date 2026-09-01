import { AIResponse } from "./types";

interface CacheEntry {
  response: AIResponse;
  expiresAt: number;
}

/**
 * In-memory response cache with TTL (Time-To-Live).
 * Avoids duplicate external model calls for identical patient queries.
 */
class AIResponseCache {
  private cache = new Map<string, CacheEntry>();
  private maxEntries = 200;
  private defaultTtlMs = 1000 * 60 * 30; // 30 minutes

  private normalizeKey(prompt: string, taskHint?: string): string {
    return `${taskHint || "none"}:${prompt.trim().toLowerCase().replace(/\s+/g, " ")}`;
  }

  get(prompt: string, taskHint?: string): AIResponse | null {
    const key = this.normalizeKey(prompt, taskHint);
    const entry = this.cache.get(key);

    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return {
      ...entry.response,
      cached: true,
    };
  }

  set(prompt: string, response: AIResponse, taskHint?: string, ttlMs?: number): void {
    if (this.cache.size >= this.maxEntries) {
      // Evict oldest entry
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }

    const key = this.normalizeKey(prompt, taskHint);
    this.cache.set(key, {
      response,
      expiresAt: Date.now() + (ttlMs || this.defaultTtlMs),
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

export const aiResponseCache = new AIResponseCache();
