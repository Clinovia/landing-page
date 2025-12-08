"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { login, user, isLoading, authLoaded } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  /** Wait for Supabase session to load first */
  useEffect(() => {
    if (!authLoaded) return; // 👈 prevent early redirects

    if (user) {
      router.push("/protected");
    }
  }, [authLoaded, user, router]);

  /** Pre-fill email if provided in URL */
  useEffect(() => {
    if (!authLoaded) return;

    const emailParam = searchParams.get("email");

    if (emailParam && /^\S+@\S+\.\S+$/.test(emailParam)) {
      setEmail(emailParam);
      passwordInputRef.current?.focus();
      toast.info("Welcome back! Please enter your password.");
    } else {
      emailInputRef.current?.focus();
    }
  }, [authLoaded, searchParams]);

  /** Handle Login Submit */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }

    const { error } = await login(email, password);

    if (error) {
      toast.error(error);
      setPassword("");
      passwordInputRef.current?.focus();
      return;
    }

    toast.success("Login successful!");
    router.push("/protected");
  };

  /** Prevent rendering form until authLoaded */
  if (!authLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-600">Loading authentication...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                ref={emailInputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                ref={passwordInputRef}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
