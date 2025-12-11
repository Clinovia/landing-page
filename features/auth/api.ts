// features/auth/api.ts
import { supabase } from "@/lib/supabaseClient";

export async function login(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signup(email: string, password: string) {
  return supabase.auth.signUp({ email, password });
}

export async function resetPassword(email: string) {
  return supabase.auth.resetPasswordForEmail(email);
}