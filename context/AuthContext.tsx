// context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setIsLoading(false);

      // Optional: listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, newSession) => {
          setSession(newSession);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}