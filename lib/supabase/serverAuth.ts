import { createClient as createSupabaseServerClient } from "@/lib/supabase/serverClient";
import type { User } from "@supabase/supabase-js";

/* ─────────────────────────────────────────────
 * Get current authenticated user (server-side)
 * ───────────────────────────────────────────── */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    // Optional: log for debugging / observability
    console.error("getCurrentUser error:", error.message);
    return null;
  }

  return user;
}

/* ─────────────────────────────────────────────
 * Require authenticated user (throws if not)
 * ───────────────────────────────────────────── */
export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}