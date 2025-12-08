'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

/** ---------- Types ---------- **/

export type SupabaseUser = {
  id: string;
  email: string;
  [key: string]: any;
};

export type AuthResponse = {
  user?: SupabaseUser | null;
  error?: string | null;
};

export type UseAuthReturn = {
  user: SupabaseUser | null;
  loading: boolean;
  signup: (email: string, password: string, fullName: string) => Promise<AuthResponse>;
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success?: true; error?: string }>;
};

/** ---------- Hook Implementation ---------- **/

export function useSupabaseAuth(): UseAuthReturn {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Load session on mount + subscribe to changes
  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      const currentUser = data.session?.user ?? null;

      setUser(currentUser as SupabaseUser | null);
      setLoading(false);
    }

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser((session?.user as SupabaseUser | null) ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  /** Signup with email, password, and full name */
  async function signup(email: string, password: string, fullName: string): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      return { error: error.message };
    }

    return { user: data.user as SupabaseUser | null };
  }

  /** Login */
  async function login(email: string, password: string): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    return { user: data.user as SupabaseUser | null };
  }

  /** Logout */
  async function logout(): Promise<void> {
    await supabase.auth.signOut();
    setUser(null);
  }

  /** Send password reset email */
  async function resetPassword(email: string): Promise<{ success?: true; error?: string }> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
    });

    if (error) return { error: error.message };
    return { success: true };
  }

  /** Final Typed Return */
  return {
    user,
    loading,
    signup,
    login,
    logout,
    resetPassword,
  };
}
