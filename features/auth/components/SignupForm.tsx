'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUp, login } from '@/lib/api/authApi';

export default function MinimalSignupForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirm: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

    const { fullName, email, password, confirm } = formData;

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data, error: signupError } = await signUp({
        email,
        password,
        full_name: fullName,
      });

      // Case 1: User already exists → log in
      if (
        signupError?.message &&
        signupError.message.toLowerCase().includes('already')
      ) {
        const loginData = await login({ email, password });
        if (loginData?.user) {
          await syncUserToBackend(loginData.user.id, email);
          router.push('/protected');
        }
        return;
      }

      // Case 2: Other signup error
      if (signupError) {
        throw new Error(signupError.message);
      }

      // Case 3: Email confirmation required (no active session)
      if (!data?.session) {
        setError('Account created. Please check your email to verify your account.');
        return;
      }

      // Case 4: Successful signup with active session
      if (data?.user) {
        await syncUserToBackend(data.user.id, email);
      }

      router.push('/protected');
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'An unexpected error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
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
        />
      </div>

      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
          {error}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Creating account...' : 'Sign Up'}
      </Button>
    </form>
  );
}
