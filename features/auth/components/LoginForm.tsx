'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const syncUserToBackend = async (uid: string, email: string) => {
    try {
      await fetch('/api/v1/users/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, email }),
      });
    } catch (err) {
      console.error('Failed to sync user to backend:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) throw authError;
      if (!data.session) throw new Error("No session returned from Supabase.");

      // Sync user to backend DB
      if (data.user) {
        await syncUserToBackend(data.user.id, email);
      }

      router.replace("/protected");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          autoComplete="email"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          autoComplete="current-password"
        />
      </div>

      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-2 rounded-md">
          {error}
        </div>
      )}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Logging in…" : "Login"}
      </Button>
    </form>
  );
}
