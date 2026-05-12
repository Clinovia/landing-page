"use client";

import {
  createContext,
  useContext,
  useEffect,
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

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// ----------------------------------
// Context
// ----------------------------------

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ----------------------------------
// Provider
// ----------------------------------

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // 🔹 Initial session load
    const init = async () => {
      try {
        const {
          data: { session },
        } = await supabaseClient.auth.getSession();

        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);
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
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      setSession(session);
      setUser(session?.user ?? null);
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