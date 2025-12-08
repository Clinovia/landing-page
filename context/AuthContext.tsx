"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { supabase } from "@/lib/supabase";

interface AuthContextType {
  user: any | null;
  isLoading: boolean;     // used during async calls
  authLoaded: boolean;    // initial Supabase session fully loaded
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  signup: (
    email: string,
    password: string
  ) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false); // NEW

  /** Load initial session */
  useEffect(() => {
    async function loadSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
      setAuthLoaded(true); // auth system fully initialized
    }

    loadSession();

    /** Listen for login/logout/signup events */
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setAuthLoaded(true); // ensure loaded after any event
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  /** LOGIN */
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsLoading(false);

    if (error) {
      return { error: error.message };
    }
    return { error: null };
  };

  /** SIGNUP */
  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    setIsLoading(false);

    if (error) {
      return { error: error.message };
    }
    return { error: null };
  };

  /** LOGOUT */
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  /** Memoized context value */
  const value = useMemo(
    () => ({
      user,
      isLoading,
      authLoaded,
      login,
      signup,
      logout,
    }),
    [user, isLoading, authLoaded]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
