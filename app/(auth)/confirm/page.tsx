"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/browserClient";
import { useAuth } from "@/context/AuthContext";

export default function ConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { session, isLoading, isProfileReady } = useAuth();

  const [status, setStatus] = useState<"pending" | "error">("pending");
  const [exchangeAttempted, setExchangeAttempted] = useState(false);

  // Step 1: consume the link's params and establish a real session.
  useEffect(() => {
    if (exchangeAttempted) return;
    setExchangeAttempted(true);

    const tokenHash = searchParams.get("token_hash");
    const type = searchParams.get("type");
    const code = searchParams.get("code");

    async function exchange() {
      try {
        if (tokenHash && type) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: type as "signup" | "email",
          });
          if (error) throw error;
        } else if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else {
          // No usable params at all — link is malformed or already consumed.
          setStatus("error");
        }
      } catch (err) {
        console.error("Confirmation exchange failed:", err);
        setStatus("error");
      }
    }

    exchange();
  }, [searchParams, exchangeAttempted]);

  // Step 2: once a real session exists (via onAuthStateChange → AuthContext),
  // wait for profile creation, then proceed — same as before.
  useEffect(() => {
    if (isLoading) return;
    if (!exchangeAttempted) return;

    if (!session) {
      setStatus("error");
      return;
    }

    if (!isProfileReady) return;

    router.replace("/risk-assessment");
  }, [isLoading, session, isProfileReady, router, exchangeAttempted]);

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-2xl font-semibold">
            This link didn't work
          </h1>

          <p className="text-gray-600">
            Your confirmation link may have expired or already been used.
            Try signing up again, or log in if you've already confirmed
            your account.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="/signup"
              className="px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium"
            >
              Sign up again
            </a>

            <a
              href="/login"
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium"
            >
              Log in
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-3">
        <h1 className="text-2xl font-semibold">
          Confirming your account
        </h1>

        <p className="text-gray-600">
          Just a moment — setting things up.
        </p>
      </div>
    </div>
  );
}