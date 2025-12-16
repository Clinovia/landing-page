// lib/api/authApi.ts
import { supabase } from '@/lib/supabaseClient';

// Debug
console.log('=== authApi loaded ===');
console.log('Supabase client exists:', !!supabase);

export interface SignUpPayload {
  email: string;
  password: string;
  full_name?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

/* --------------------------------------------------------------------------------
 *  SIGN UP
 * -------------------------------------------------------------------------------*/
export async function signUp({ email, password, full_name }: SignUpPayload) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name },
    },
  });

  return { data, error };
}

/* --------------------------------------------------------------------------------
 *  LOGIN
 * -------------------------------------------------------------------------------*/
export async function login({ email, password }: LoginPayload) {
  console.log('=== login called ===');
  console.log('Email:', email);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log('Supabase login response:', { data, error });

  if (error) {
    throw new Error(error.message);
  }

  // 🔑 No backend sync, Supabase is source of truth
  return data;
}

/* --------------------------------------------------------------------------------
 *  LOGOUT
 * -------------------------------------------------------------------------------*/
export async function logout() {
  console.log('=== logout called ===');

  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);

  return true;
}

/* --------------------------------------------------------------------------------
 *  RESET PASSWORD EMAIL
 * -------------------------------------------------------------------------------*/
export async function resetPassword(email: string) {
  console.log('=== resetPassword called ===');
  console.log('Email:', email);

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });

  if (error) throw new Error(error.message);
  return true;
}

/* --------------------------------------------------------------------------------
 *  UPDATE PASSWORD
 * -------------------------------------------------------------------------------*/
export async function updatePassword(newPassword: string) {
  console.log('=== updatePassword called ===');

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw new Error(error.message);
  return data;
}

/* --------------------------------------------------------------------------------
 *  GET CURRENT USER
 * -------------------------------------------------------------------------------*/
export async function getUser() {
  console.log('=== getUser called ===');

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data.user;
}
