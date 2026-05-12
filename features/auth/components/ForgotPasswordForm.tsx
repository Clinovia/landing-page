"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/lib/supabase/auth";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const redirectTo = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`;

      await resetPassword(email, redirectTo);

      setSubmitted(true);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to send reset link.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <p className="text-green-600 text-sm">
        Password reset link sent. Please check your email.
      </p>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div>
        <label className="font-medium">Email</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your@email.com"
          disabled={loading}
        />
      </div>

      {errorMsg && (
        <p className="text-red-600 text-sm">{errorMsg}</p>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send reset link"}
      </Button>
    </form>
  );
}