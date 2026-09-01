interface RateLimitRecord {
  timestamps: number[];
}

/**
 * In-memory sliding-window rate limiter.
 * Protects AI endpoints from runaway loops and burst abuse.
 */
class AIRateLimiter {
  private records = new Map<string, RateLimitRecord>();
  private windowMs = 60 * 1000; // 1 minute
  private maxRequestsPerWindow = 25; // 25 requests per minute

  check(identifier: string): { allowed: boolean; remaining: number; resetSeconds: number } {
    const now = Date.now();
    const cleanId = identifier || "anonymous";

    let record = this.records.get(cleanId);
    if (!record) {
      record = { timestamps: [] };
      this.records.set(cleanId, record);
    }

    // Filter out timestamps outside current sliding window
    record.timestamps = record.timestamps.filter((time) => now - time < this.windowMs);

    if (record.timestamps.length >= this.maxRequestsPerWindow) {
      const oldest = record.timestamps[0];
      const resetSeconds = Math.ceil((oldest + this.windowMs - now) / 1000);
      return {
        allowed: false,
        remaining: 0,
        resetSeconds: Math.max(1, resetSeconds),
      };
    }

    // Record this request timestamp
    record.timestamps.push(now);

    return {
      allowed: true,
      remaining: this.maxRequestsPerWindow - record.timestamps.length,
      resetSeconds: 60,
    };
  }

  // Periodic cleanup of stale client records
  cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.records.entries()) {
      record.timestamps = record.timestamps.filter((time) => now - time < this.windowMs);
      if (record.timestamps.length === 0) {
        this.records.delete(key);
      }
    }
  }
}

export const aiRateLimiter = new AIRateLimiter();
