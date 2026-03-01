import { supabase } from "@/lib/supabaseClient";

export async function login(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signup(
  email: string,
  password: string,
  fullName?: string
) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
}

export async function resetPassword(email: string) {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/update-password`,
  });
}

export async function logout() {
  return supabase.auth.signOut();
}