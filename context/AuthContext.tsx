"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { apiRequest } from "@/lib/apiClient";

// -----------------------------
// Types
// -----------------------------

type Plan = "starter" | "basic" | "professional";

type SubscriptionStatus = "active" | "inactive" | "loading";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  plan: Plan;
  isPaid: boolean;
  assessmentsUsed: number;
  assessmentsLimit: number;
  nextBillingDate: string | null;
  subscriptionStatus: SubscriptionStatus;
  refreshSubscription: () => Promise<void>;
};

// -----------------------------
// Context
// -----------------------------

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// -----------------------------
// Provider
// -----------------------------

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionStatus>("loading");
  const [plan, setPlan] = useState<Plan>("starter");
  const [isPaid, setIsPaid] = useState(false);
  const [assessmentsUsed, setAssessmentsUsed] = useState(0);
  const [assessmentsLimit, setAssessmentsLimit] = useState(100);
  const [nextBillingDate, setNextBillingDate] = useState<string | null>(null);

  // -----------------------------
  // Fetch subscription + plan
  // -----------------------------
  const fetchSubscription = async () => {
    try {
      const res = await apiRequest<{
        plan: Plan;
        is_paid: boolean;
        assessments_used?: number;
        assessments_limit?: number;
        next_billing_date?: string | null;
      }>({
        path: "/payments/status",
        method: "GET",
      });

      setPlan(res.plan);
      setIsPaid(res.is_paid);
      setAssessmentsUsed(res.assessments_used ?? 0);
      setAssessmentsLimit(res.assessments_limit ?? 100);
      setNextBillingDate(res.next_billing_date ?? null);
      setSubscriptionStatus(res.is_paid ? "active" : "inactive");
    } catch (err) {
      console.error("Subscription fetch failed:", err);
      setPlan("starter");
      setIsPaid(false);
      setAssessmentsUsed(0);
      setAssessmentsLimit(100);
      setNextBillingDate(null);
      setSubscriptionStatus("inactive");
    }
  };

  const refreshSubscription = async () => {
    setSubscriptionStatus("loading");
    await fetchSubscription();
  };

  // -----------------------------
  // Init auth
  // -----------------------------
  useEffect(() => {
    const init = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
      }

      const currentSession = data.session;
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        await fetchSubscription();
      } else {
        setPlan("starter");
        setIsPaid(false);
        setNextBillingDate(null);
        setSubscriptionStatus("inactive");
      }

      setIsLoading(false);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (newSession?.user) {
        await fetchSubscription();
      } else {
        setPlan("starter");
        setIsPaid(false);
        setNextBillingDate(null);
        setSubscriptionStatus("inactive");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // -----------------------------
  // Loading guard
  // -----------------------------
  if (isLoading) return null;

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isLoading,
        plan,
        isPaid,
        assessmentsUsed,
        assessmentsLimit,
        nextBillingDate,
        subscriptionStatus,
        refreshSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// -----------------------------
// Hook
// -----------------------------
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}