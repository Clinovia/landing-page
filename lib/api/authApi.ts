'use client';

import { supabase } from '@/lib/supabaseClient';

export interface SignUpPayload {
  email: string;
  password: string;
  full_name?: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export const authApi = {
  /** Create user account */
  async signUp(payload: SignUpPayload) {
    const { email, password, full_name } = payload;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name },
      },
    });

    if (error) throw new Error(error.message);
    return data;
  },

  /** Login user */
  async signIn(payload: SignInPayload) {
    const { email, password } = payload;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    return data;
  },

  /** Logout */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    return true;
  },

  /** Send password reset email */
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw new Error(error.message);
    return true;
  },

  /** Update password */
  async updatePassword(newPassword: string) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw new Error(error.message);
    return data;
  },

  /** Get current user */
  async getUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);
    return data.user;
  },

  /** Sync Supabase user to backend DB */
  async syncUser() {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.access_token) {
      console.warn("syncUser: No Supabase session");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("syncUser backend error:", text);
      throw new Error(`Backend sync failed: ${text}`);
    }

    return true;
  },
};
