// lib/supabase/auth.ts

import { supabase } from "./browserClient";
import type { Session, User, AuthChangeEvent } from "@supabase/supabase-js";

// ----------------------------------
// Types
// ----------------------------------

export type AuthSession = Session | null;

// ----------------------------------
// Session
// ----------------------------------

export async function fetchSession(): Promise<AuthSession> {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(`fetchSession failed: ${error.message}`);
  }

  return data.session;
}

// 🔥 Future-proof (SSR + verification)
export async function fetchUser(): Promise<User | null> {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(`fetchUser failed: ${error.message}`);
  }

  return data.user;
}

// ----------------------------------
// Auth Actions
// ----------------------------------

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(`login failed: ${error.message}`);
  }

  return data;
}

export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(`logout failed: ${error.message}`);
  }
}

export async function resetPassword(email: string, redirectTo: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  if (error) {
    throw new Error(`resetPassword failed: ${error.message}`);
  }
}

// ----------------------------------
// Listener (CRITICAL)
// ----------------------------------

export function onAuthStateChange(
  callback: (
    event: AuthChangeEvent,
    session: AuthSession,
    user: User | null
  ) => void
) {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session, session?.user ?? null);
  });

  return () => subscription.unsubscribe();
}