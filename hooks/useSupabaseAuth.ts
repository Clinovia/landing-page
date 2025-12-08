// landing-page/hooks/useSupabaseAuth.ts
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useSupabaseAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Initialize user session and listen for auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  /** Signup with email, password, and full name */
  async function signup(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) return { error: error.message };
    return { user: data.user };
  }

  /** Login with email and password */
  async function login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { error: error.message };
    return { user: data.user };
  }

  /** Logout */
  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  /** Send password reset email */
  async function resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
    });

    if (error) return { error: error.message };
    return { success: true };
  }

  return { user, loading, signup, login, logout, resetPassword };
}
