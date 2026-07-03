"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/supabase/auth";
import { supabase } from "@/lib/supabase/browserClient";
import { useCheckout } from "@/features/payments/hooks/useCheckout";

export default function MinimalSignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startCheckout } = useCheckout();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePostSignup = (plan: string | null) => {
    if (plan && plan !== "starter") {
      startCheckout(plan);
    } else {
      router.replace("/mci-screening");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const { fullName, email, password, confirm } = formData;
    const plan = searchParams.get("plan");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 🔥 Signup directly via Supabase client (no legacy authApi)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      // ⚠️ Handle edge case: user already exists
      if (!data.session) {
        // fallback → try login
        await login(email, password);
      }

      handlePostSignup(plan);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Signup failed";

      // Handle "user already exists" more robustly
      if (message.toLowerCase().includes("already")) {
        try {
          await login(email, password);
          handlePostSignup(plan);
          return;
        } catch (loginErr: unknown) {
          setError(
            loginErr instanceof Error
              ? loginErr.message
              : "Login failed"
          );
          return;
        }
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto"
      noValidate
    >
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
          autoComplete="email"
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
          disabled={loading}
          autoComplete="new-password"
        />
      </div>

      <div>
        <Label htmlFor="confirm">Confirm Password</Label>
        <Input
          id="confirm"
          name="confirm"
          type="password"
          value={formData.confirm}
          onChange={handleChange}
          required
          minLength={6}
          disabled={loading}
          autoComplete="new-password"
        />
      </div>

      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
          {error}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Sign Up"}
      </Button>
    </form>
  );
}