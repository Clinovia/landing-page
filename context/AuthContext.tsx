"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

import type { Session, User } from "@supabase/supabase-js";
import { supabase as supabaseClient } from "@/lib/supabase/browserClient";

// ----------------------------------
// Types
// ----------------------------------

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isProfileReady: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// ----------------------------------
// Context
// ----------------------------------

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ----------------------------------
// Profile creation
// ----------------------------------

/**
 * Ensures a public.users / public.institutions row exists for the
 * signed-in auth user. Safe to call on every SIGNED_IN event —
 * the backend's create_profile endpoint is idempotent (returns the
 * existing row if one is already present).
 */
async function ensureProfile(session: Session): Promise<boolean> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          institution_name: session.user.user_metadata?.institution_name,
          name: session.user.user_metadata?.full_name,
          email: session.user.email,
        }),
      }
    );

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      console.error("Profile creation failed:", body.detail ?? res.statusText);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Profile creation error:", err);
    return false;
  }
}

// ----------------------------------
// Provider
// ----------------------------------

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileReady, setIsProfileReady] = useState(false);

  // Prevents duplicate ensureProfile calls if SIGNED_IN fires more than
  // once for the same session (e.g. tab focus/refresh events).
  const profileCheckedForUserId = useRef<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const syncProfile = async (nextSession: Session | null) => {
      if (!nextSession) {
        profileCheckedForUserId.current = null;
        if (mounted) setIsProfileReady(false);
        return;
      }

      if (profileCheckedForUserId.current === nextSession.user.id) {
        return;
      }

      profileCheckedForUserId.current = nextSession.user.id;

      const ok = await ensureProfile(nextSession);

      if (mounted) setIsProfileReady(ok);
    };

    // 🔹 Initial session load
    const init = async () => {
      try {
        const {
          data: { session },
        } = await supabaseClient.auth.getSession();

        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (session) {
          await syncProfile(session);
        }
      } catch {
        if (!mounted) return;
        setSession(null);
        setUser(null);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    init();

    // 🔥 Real-time auth sync (Supabase v2 correct signature)
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, nextSession) => {
      if (!mounted) return;

      setSession(nextSession);
      setUser(nextSession?.user ?? null);

      // Covers both the immediate-session case (email confirmation off)
      // and the post-confirmation redirect case (SIGNED_IN fires once
      // the user clicks the confirmation link and lands with a session).
      if (event === "SIGNED_IN" && nextSession) {
        syncProfile(nextSession);
      }

      if (event === "SIGNED_OUT") {
        profileCheckedForUserId.current = null;
        setIsProfileReady(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // ----------------------------------
  // Actions
  // ----------------------------------

  const login = async (email: string, password: string) => {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isLoading,
        isProfileReady,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ----------------------------------
// Hook
// ----------------------------------

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}