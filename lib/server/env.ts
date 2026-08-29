/**
 * Server-only configuration surface.
 * AI keys and the Supabase service role must never reach the client.
 */
export function getAiConfig() {
  return {
    hasKey: Boolean(process.env.AI_API_KEY),
    provider: process.env.AI_PROVIDER ?? "unset",
  };
}

export function getPublicSupabaseConfig() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  };
}

export function assertServerSecretsPresent() {
  return {
    hasServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    hasAiKey: Boolean(process.env.AI_API_KEY),
    provider: process.env.AI_PROVIDER ?? "unset",
  };
}
