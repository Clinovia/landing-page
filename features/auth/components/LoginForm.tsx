"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/api/authApi";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const { email, password } = formData;

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await login({ email, password });

      // No backend sync here anymore
      router.replace("/protected");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Invalid email or password.";
      setError(message);
    } finally {
      setLoading(false);
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
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
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
          value={formData.password}
          onChange={handleChange}
          required
          disabled={loading}
          autoComplete="current-password"
        />
      </div>

      {error &&
