import { supabase } from "@/lib/supabaseClient";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export interface SignUpPayload {
  email: string;
  password: string;
  full_name?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

/* ------------------------------------------------------------------ */
/* Sign Up                                                            */
/* ------------------------------------------------------------------ */

export async function signUp({
  email,
  password,
  full_name,
}: SignUpPayload) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
}

/* ------------------------------------------------------------------ */
/* Login                                                              */
/* ------------------------------------------------------------------ */

export async function login({
  email,
  password,
}: LoginPayload) {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
}

/* ------------------------------------------------------------------ */
/* Logout                                                             */
/* ------------------------------------------------------------------ */

export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

/* ------------------------------------------------------------------ */
/* Reset Password                                                     */
/* ------------------------------------------------------------------ */

export async function resetPassword(
  email: string,
  redirectTo: string
): Promise<void> {
  const { error } =
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

  if (error) {
    throw new Error(error.message);
  }
}

/* ------------------------------------------------------------------ */
/* Update Password                                                    */
/* ------------------------------------------------------------------ */

export async function updatePassword(
  newPassword: string
) {
  const { data, error } =
    await supabase.auth.updateUser({
      password: newPassword,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
}

/* ------------------------------------------------------------------ */
/* Get Current User                                                   */
/* ------------------------------------------------------------------ */

export async function getUser() {
  const { data, error } =
    await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
}
