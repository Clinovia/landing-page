"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { supabase } from "@/lib/supabase/browserClient";
import { ROUTES } from "@/config/routes";

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    institution: "",
    fullName: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    const { institution, fullName, email, password, confirm } = formData;

    // Retained for when checkout/plan selection is wired back in — not
    // used in the redirect while email confirmation is disabled, since
    // there's no confirmation link to carry it through anymore.
    const plan = searchParams.get("plan");
    void plan;

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,

        options: {
          data: {
            full_name: fullName,
            institution_name: institution,
          },
          // emailRedirectTo intentionally omitted — no confirmation
          // email is sent while email confirmation is disabled in
          // Supabase. Re-add this (pointing at /confirm, with the plan
          // param if present) when confirmation is re-enabled before
          // real pilot users sign up.
        },
      });

      if (error) {
        // Supabase returns a message containing "already" for existing accounts.
        if (error.message.toLowerCase().includes("already")) {
          setError(
            "An account with this email already exists. Try logging in instead."
          );
          return;
        }

        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error("Signup failed. Please try again.");
      }

      // Email confirmation is disabled — signUp() returns an active
      // session immediately. AuthContext's onAuthStateChange listener
      // fires SIGNED_IN as soon as this resolves and kicks off
      // ensureProfile() in the background; /confirm just waits for
      // isProfileReady before sending the user on to risk-assessment.
      router.replace(ROUTES.AUTH.CONFIRM);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Signup failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full Name</Label>

        <Input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          disabled={loading}
          autoComplete="name"
        />
      </div>

      <div>
        <Label htmlFor="institution">Institution</Label>

        <Input
          id="institution"
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          required
          disabled={loading}
          placeholder="Clinic or organization name"
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